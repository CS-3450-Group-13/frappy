from tkinter.tix import Tree
from rest_framework import serializers
from .models import Frappe, Menu, Extras, ExtraDetail, Milk, Base


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
    # TODO: Create method to prevent duplicate submittal
    extras = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Extras.objects.all()
    )
    frappe = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Frappe.objects.all()
    )

    class Meta:
        model = ExtraDetail
        fields = ["amount", "extras", "frappe"]
        depth = 1


class FrappeSerializer(serializers.ModelSerializer):
    creator = serializers.ReadOnlyField(source="creator.email")
    milk = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Milk.objects.all()
    )
    base = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Base.objects.all()
    )
    extras = ExtraDetailSerializer(source="extradetail_set", many=True, required=False)

    class Meta:
        model = Frappe
        exclude = []


class MenuSerializer(serializers.ModelSerializer):
    price = serializers.ReadOnlyField()
    frappe = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Frappe.objects.all()
    )

    class Meta:
        model = Menu
        fields = ["name", "frappe", "photo", "price"]
