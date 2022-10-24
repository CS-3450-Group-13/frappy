from rest_framework.viewsets import ModelViewSet, GenericViewSet, ReadOnlyModelViewSet
from rest_framework import permissions
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import *
from .models import *
from users.permissions import IsManager, IsManagerOrReadOnly


class FrappeViewSet(ModelViewSet):
    serializer_class = FrappeSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Frappe.objects.all()

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    @action(detail=False)
    def recent_frappes(self, request):
        recent_frappes = Frappe.objects.all().order_by("-create_date")[:10]

        page = self.paginate_queryset(recent_frappes)
        if page is not None:
            s = self.get_serializer(page, many=True)
            return self.get_paginated_response(s.data)

        serializers = self.get_serializer(recent_frappes, many=True)
        return Response(serializers.data)


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
