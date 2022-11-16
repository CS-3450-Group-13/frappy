from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import status

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import *
from .models import *
from users.permissions import IsManagerOrReadOnly, IsCashier, IsEmployee
from users.models import User, Employee


class UserFrappeViewSet(ModelViewSet):
    serializer_class = FrappeSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    # Check if sufficient balance is in place
    def create(self, request, *args, **kwargs):
        serial: FrappeSerializer = self.get_serializer(data=request.data)
        serial.is_valid(raise_exception=True)

        # Get profile data
        user: User = self.request.user
        manager: User = Employee.objects.get(is_manager=True).user

        # Check against stock
        details = serial.validated_data.get("extradetail_set")

        if details:
            for e in details:
                amount = e["amount"]
                extra = e["extras"]

                # Fail if stock is invalid
                if extra.stock < amount:
                    return Response(
                        {
                            "error": f"{e} has insufficient stock",
                        }
                    )

        # Check against balance
        cost = serial.get_price(serial.validated_data)
        if cost < user.balance:
            # Update stock
            if details:
                for e in details:
                    amount = e["amount"]
                    extra = e["extras"]

                    extra.stock -= amount
                    extra.save()

            serial.is_valid()
            self.perform_create(serial, cost)
            user.balance -= cost
            user.save()

            # Fixes some atomic transaction stuff
            if user != manager:
                manager.balance += cost
                manager.save()

            return Response(
                {"user_balance": request.user.balance, "cost": cost},
                status=status.HTTP_201_CREATED,
            )

        else:
            return Response(
                {
                    "error": "User does not have enough balance",
                    "user_balance": request.user.balance,
                    "cost": cost,
                },
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

    def perform_create(self, serializer: FrappeSerializer, cost):

        serializer.save(
            creator=self.request.user, user=self.request.user, final_price=cost
        )

    def get_queryset(self):
        user = self.request.user

        return Frappe.objects.filter(user=user).order_by("-create_date")

    @action(detail=False)
    def recent_frappes(self, request):
        recent_frappes = Frappe.objects.filter(user=self.request.user).order_by(
            "-create_date"
        )

        page = self.paginate_queryset(recent_frappes)
        if page is not None:
            s = self.get_serializer(page, many=True)
            return self.get_paginated_response(s.data)

        serializers = self.get_serializer(recent_frappes, many=True)
        return Response(serializers.data)

    @action(detail=False)
    def price_check(self, request):
        serial: FrappeSerializer = self.get_serializer(data=request.data)
        serial.is_valid(raise_exception=True)
        cost = serial.get_price(serial.validated_data)
        return Response({"Cost": cost})


class CashierFrappeViewSet(UserFrappeViewSet):
    permission_classes = [IsCashier | IsEmployee]
    serializer_class = CashierFrappeSerializer
    queryset = Frappe.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status"]

    def perform_create(self, serializer, cost):
        serializer.save(
            creator=self.request.user,
            user=serializer.validated_data["user"],
            final_price=cost,
        )

    @action(detail=True, methods=["get", "post"])
    def status(self, request: Request, pk=None):
        frappe: Frappe = Frappe.objects.get(pk=pk)

        # Only update on post request
        if request.method == "POST":
            frappe.status = not frappe.status
            frappe.save()

        return Response({"status": frappe.active})


class MenuViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    permission_classes = [IsManagerOrReadOnly]
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["active"]

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user, user=self.request.user)
        return super().perform_create(serializer)

    @action(detail=True, methods=["get", "post"])
    def activate(self, request: Request, pk=None):
        menu_item: Menu = Menu.objects.get(pk=pk)

        # Only update on post request
        if request.method == "POST":
            # 1 and 2
            if menu_item.active == 1:
                menu_item.active = 2
            else:
                menu_item.active = 1

            menu_item.save()

        return Response({"status": menu_item.active})


# Abstract class only
class IngredientViewSet(ModelViewSet):
    @action(detail=True, methods=["POST"])
    def buy(self, request: Request, pk=None):
        manager: User = Employee.objects.get(is_manager=True).user
        serial: BuyOrderserializer = BuyOrderserializer(data=request.data)

        # Return error if insufficient balance for manager
        if serial.is_valid():
            item: Base = Base.objects.get(id=pk)
            cost = serial.validated_data["amount"] * item.price_per_unit

            if cost > manager.balance:
                return Response(
                    {
                        "error": "manager has insuficcient balance",
                        "orderCost": cost,
                        "current_balance": manager.balance,
                    }
                )

            # Update inventory
            manager.balance -= cost
            manager.save()

            item.stock += serial.validated_data["amount"]
            item.save()
            return Response(
                {
                    "success": "Stock updated",
                    "orderCost": cost,
                    "stock": item.stock,
                    "current_balance": manager.balance,
                }
            )
        else:
            return Response(serial.errors, status=status.HTTP_400_BAD_REQUEST)


class ExtrasViewSet(IngredientViewSet):
    serializer_class = ExtraSerializer
    queryset = Extras.objects.all()


class MilkViewSet(IngredientViewSet):
    serializer_class = MilkSerializer
    queryset = Milk.objects.all()


class BaseViewSet(IngredientViewSet):
    serializer_class = BaseSerializer
    queryset = Base.objects.all()


class ExtraDetailViewSet(GenericViewSet, mixins.CreateModelMixin):
    serializer_class = ExtraDetailSerializer
    queryset = ExtraDetail.objects.all()
