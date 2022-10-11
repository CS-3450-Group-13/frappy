from rest_framework import serializers
from .models import Frappe, Menu, Extras, ExtraDetail


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = "__all__"


class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extras
        fields = "__all__"


class ExtraDetailSerializer(serializers.ModelSerializer):
    extras = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Extras.objects.all()
    )
    frappe = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Frappe.objects.all()
    )

    class Meta:
        model = ExtraDetail
        fields = ["amount", "extras", "frappe"]


class FrappeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Frappe
        fields = "__all__"
        depth = 3
