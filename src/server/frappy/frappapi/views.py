from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework import permissions
from rest_framework import mixins
from .serializers import *
from .models import *


class FrappeViewSet(ModelViewSet):
    serializer_class = FrappeSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Frappe.objects.all()


class MenuViewSet(ModelViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class ExtrasViewSet(ModelViewSet):
    serializer_class = ExtraSerializer
    queryset = Extras.objects.all()


class ExtraDetailViewSet(GenericViewSet, mixins.CreateModelMixin):
    serializer_class = ExtraDetailSerializer
    queryset = ExtraDetail.objects.all()