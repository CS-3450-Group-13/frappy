from rest_framework.decorators import action
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.request import Request
from .serializers import EmployeeSerializer, LoginSerializer, UserSerializer
from .permissions import IsManager
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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == "pay_all":
            permission_classes = [IsManager]
        else:
            permission_classes = [IsAdminUser, IsManager]
        return [permission() for permission in permission_classes]

    pass


class EmployeeUserViewSet(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

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
