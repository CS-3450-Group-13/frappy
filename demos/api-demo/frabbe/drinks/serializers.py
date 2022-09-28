from rest_framework import serializers
from .models import Frappe, Ingredient


class FrappeSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source="creator.email")

    class Meta:
        model = Frappe
        fields = [
            "name",
            "price",
            "photo",
            "start_date",
            "end_date",
            "active",
            "creator",
            "ingredients",
        ]


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"
