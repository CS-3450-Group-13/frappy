from collections import OrderedDict
from rest_framework import serializers
from .models import Frappe, Menu, Extras, ExtraDetail, Milk, Base
from users.models import User


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
    frappe = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ExtraDetail
        fields = ["amount", "extras", "frappe"]


class FrappeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.email")
    milk = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Milk.objects.all()
    )
    base = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Base.objects.all()
    )
    extras = ExtraDetailSerializer(source="extradetail_set", many=True, required=False)
    price = serializers.SerializerMethodField()
    final_price = serializers.ReadOnlyField()
    menu_key = serializers.PrimaryKeyRelatedField(
        required=True, queryset=Menu.objects.all()
    )
    # Add on the fly price calulcations
    def get_price(self, obj):
        if type(obj) == OrderedDict:
            total = 0
            extras = obj.get("extradetail_set")

            for ex in extras:
                print(ex["extras"])
                total += ex["amount"] * ex["extras"].price_per_unit

            total += obj["milk"].price_per_unit * obj["size"]
            total += obj["base"].price_per_unit * obj["size"]
            total += obj["menu_key"].markup
            return total
        else:
            return Frappe.objects.get(id=obj.id).price()

    class Meta:
        model = Frappe
        exclude = ["creator"]

    def create(self, validated_data):
        print(validated_data)
        extras = validated_data.pop("extradetail_set")
        frappe = Frappe.objects.create(**validated_data)
        for extra_data in extras:
            ExtraDetail.objects.create(frappe=frappe, **extra_data)
        return frappe


class UserPKRF(serializers.PrimaryKeyRelatedField):
    def display_value(self, instance):
        return instance.email


class CashierFrappeSerializer(FrappeSerializer):
    creator = serializers.ReadOnlyField(source="creator.email")
    user = UserPKRF(required=True, queryset=User.objects.all())

    class Meta:
        model = Frappe
        exclude = []


class MenuSerializer(serializers.ModelSerializer):
    prices = serializers.ReadOnlyField()
    frappe = FrappeSerializer()

    class Meta:
        model = Menu
        fields = ["name", "frappe", "photo", "prices"]
        detail = 1
