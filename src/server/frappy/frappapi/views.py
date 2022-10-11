from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import *
from .models import *

# Create your views here.


class FrappeViewSet(ModelViewSet):
    serializer_class = FrappeSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Frappe.objects.all()

    @action(detail=True, methods=["post"])
    def menu_toggle(self, request: Request, pk=None):
        frap: Frappe = self.get_object()
        frap.on_menu = not frap.on_menu
        frap.save()
        return Response({"status": str(frap.on_menu)})


class MenuViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class ExtrasViewSet(ModelViewSet):
    serializer_class = ExtraSerializer
    queryset = Extras.objects.all()
