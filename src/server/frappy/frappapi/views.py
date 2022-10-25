from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
from users.permissions import IsManager, IsManagerOrReadOnly, IsCashier
from users.models import User
from django.db import transaction


class UserFrappeViewSet(ModelViewSet):
    serializer_class = FrappeSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Check if sufficient balance is in place

    def create(self, request, *args, **kwargs):
        serial: FrappeSerializer = self.get_serializer(data=request.data)
        serial.is_valid(raise_exception=True)

        user: User = self.request.user
        cost = serial.data["price"]

        if cost < user.balance:

            self.perform_create(serial)
            user.balance -= cost
            user.save()
        else:
            return Response(
                {
                    "error": "User does not have enough balance",
                    "user_balance": request.user.balance,
                    "cost": cost,
                },
                status=status.HTTP_406_NOT_ACCEPTABLE,
            )

        return Response(
            serial.data + {"user_balance": request.user.balance, "cost": cost},
            status=status.HTTP_201_CREATED,
        )

    def perform_create(self, serializer: FrappeSerializer):
        serializer.save(
            creator=self.request.user,
            user=self.request.user,
            final_price=serializer.price,
        )

    def get_queryset(self):
        user = self.request.user
        return Frappe.objects.filter(user=user)

    @action(detail=False)
    def recent_frappes(self, request):
        recent_frappes = Frappe.objects.all().order_by("-create_date")[:10]

        page = self.paginate_queryset(recent_frappes)
        if page is not None:
            s = self.get_serializer(page, many=True)
            return self.get_paginated_response(s.data)

        serializers = self.get_serializer(recent_frappes, many=True)
        return Response(serializers.data)


class CashierFrappeViewSet(ModelViewSet):
    permission_classes = [IsCashier]
    serializer_class = CashierFrappeSerializer
    queryset = Frappe.objects.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    pass


class MenuViewSet(ModelViewSet):
    permission_classes = [IsManagerOrReadOnly]
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class ExtrasViewSet(ModelViewSet):
    serializer_class = ExtraSerializer
    queryset = Extras.objects.all()


class MilkViewSet(ModelViewSet):
    serializer_class = MilkSerializer
    queryset = Milk.objects.all()


class BaseViewSet(ModelViewSet):
    serializer_class = BaseSerializer
    queryset = Base.objects.all()


class ExtraDetailViewSet(GenericViewSet, mixins.CreateModelMixin):
    serializer_class = ExtraDetailSerializer
    queryset = ExtraDetail.objects.all()
