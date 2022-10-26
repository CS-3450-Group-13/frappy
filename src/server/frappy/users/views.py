from rest_framework.decorators import action
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.request import Request
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from .serializers import (
    BalanceSerializer,
    EmployeeSerializer,
    LoginSerializer,
    UserSerializer,
)
from .permissions import IsCashier, IsManager
from .models import User, Employee
from django.contrib.auth import login

# Create your views here.
class LoginViewSet(viewsets.ViewSet):
    # This view should be accessible also for unauthenticated users.
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = LoginSerializer(
            data=self.request.data, context={"request": self.request}
        )
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response(None, status=status.HTTP_202_ACCEPTED)


class UserViewSet(
    viewsets.GenericViewSet, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ["current_user", "add_balance"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAdminUser, IsManager, IsCashier]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        if self.action == "update":
            return User.objects.get(user=self.request.user)
        else:
            return User.objects.all()

    @action(detail=False, methods=["GET"])
    def add_balance(self, request: Request, pk=None):
        user = User.objects.get(id=pk)
        if "balance" in request.query_params.dict():
            try:
                user.balance += int(request.query_params["balance"])
                user.save()
                return Response(
                    {
                        "success": "balaced added successfully",
                        "new_balance": user.balance,
                    }
                )
            except ValueError as e:
                print(e, type(e))
                return Response({"Value Error": "not a proper literal"})
        else:
            return Response({"Error": "Unable to process request"})

    @action(detail=False, methods=["GET"])
    def current_user(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class EmployeeUserViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()
    permission_classes = [IsAdminUser, IsManager]

    @action(detail=False)
    def pay_all(self, request: Request):
        manager: User = request.user
        cost = 0
        employees = Employee.objects.all()

        for e in employees:
            cost += e.hours * e.wage

        if cost < manager.balance:
            # Pay employees
            for e in employees:
                pay = e.hours * e.wage
                e.user.balance += pay
                manager.balance -= pay

            return Response(
                {
                    "success": "Balance paid successfully",
                    "wages_total": cost,
                    "remainging_balance": manager.balance,
                }
            )
        else:
            return Response(
                {
                    "fail": "Insuficcient Balance, employees are not paid.",
                    "wages_total": cost,
                    "remainging_balance": manager.balance,
                }
            )

    # Users must be a manager to pay employees, however admins still have access
    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "pay_all":
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAdminUser, IsManager]
        return [permission() for permission in permission_classes]
