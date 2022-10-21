from tkinter.tix import Tree
from rest_framework import serializers
from .models import Frappe, Menu, Extras, ExtraDetail, Milk, Base


class ReadMenuSerializer(serializers.ModelSerializer):
    price = serializers.Field()

    class Meta:
        model = Menu
        fields = ["name", "frappe", "photo", "price"]


class AddMenuSerializer(serializers.ModelSerializer):
    price = serializers.Field()

    class Meta:
        model = Menu
        fields = "__all__"


class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extras
        fields = "__all__"


class MilkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milk
        fields = "__all__"


class BaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Base
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
    creator = serializers.ReadOnlyField(source="creator.username")
    milk = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Milk.objects.all()
    )
    base = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Base.objects.all()
    )

    class Meta:
        model = Frappe
        fields = "__all__"
