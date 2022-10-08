from rest_framework import serializers
from .models import Frappe


class FrappeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Frappe
        fields = "__all__"
