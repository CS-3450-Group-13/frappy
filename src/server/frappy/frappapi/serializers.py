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
    class Meta:
        model = ExtraDetail


class FrappeSerializer(serializers.ModelSerializer):
    extras = ExtraDetailSerializer(many=True)

    class Meta:
        model = Frappe
        fields = "__all__"

    def validate_extras(self, value):
        print(value)
        pass
