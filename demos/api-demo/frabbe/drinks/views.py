from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.decorators import action
from .models import *
from .serializers import *

# Create your views here.
class IngredientsViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)


class FrappeViewSet(viewsets.ModelViewSet):
    queryset = Frappe.objects.all()
    serializer_class = FrappeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
