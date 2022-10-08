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
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Frappe.objects.all()

    @action(detail=True, methods=["post"])
    def menu_toggle(self, request: Request, pk=None):
        frap: Frappe = self.get_object()
        frap.on_menu = not frap.on_menu
        frap.save()
        return Response({"status": str(frap.on_menu)})

    @action(detail=False)
    def menu(self, request):
        menu_items = Frappe.objects.filter(on_menu=True)
        page = self.paginate_queryset(menu_items)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(menu_items, many=True)
        return Response(serializer.data)