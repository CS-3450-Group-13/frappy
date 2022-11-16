from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from frappapi.models import Frappe, Menu, ExtraDetail, Extras
from frappapi.views import UserFrappeViewSet
from users.models import User, Employee


class PriceCheck(APITestCase):

    fixtures = [
        "frappapi/fixtures/testing.json",
    ]

    def setUp(self) -> None:
        self.factory = APIRequestFactory()
        self.customer = User(email="user@user.com", password="user", balance=100)
        self.customer.save()

    def test_drink_no_extras(self):
        view = UserFrappeViewSet.as_view({"post": "price_check"})
        request = self.factory.post(
            "/frappes/price_check/",
            {"base": 1, "milk": 1, "menu_key": 1, "size": 1},
        )
        self.client.login(email="admin@admin.com", password="admin")
        force_authenticate(request, user=User.objects.get(email="admin@admin.com"))
        response: Response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(float(response.data["Cost"]), 5.55)

    def test_price_paid_equality(self):
        view1 = UserFrappeViewSet.as_view({"post": "price_check"})
        view2 = UserFrappeViewSet.as_view({"post": "create"})
        request = self.factory.post(
            "/frappes/price_check/",
            {"base": 1, "milk": 1, "menu_key": 1, "size": 1},
        )
        request2 = self.factory.post(
            "/frappes/",
            {"base": 1, "milk": 1, "menu_key": 1, "size": 1},
        )

        force_authenticate(request, user=User.objects.get(email="user@user.com"))
        force_authenticate(request2, user=User.objects.get(email="user@user.com"))

        response: Response = view1(request)
        response2: Response = view2(request2)

        balance = self.customer.balance

        # Make sure requests are completed correctly
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(float(response.data["Cost"]), 5.55)
        self.assertEqual(response2.status_code, status.HTTP_201_CREATED)

        # Check to determine if price is different than what is paid
        newbal = User.objects.get(pk=self.customer.pk).balance
        self.assertEqual(float(response.data["Cost"]), float(balance - newbal))
