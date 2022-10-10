from rest_framework import serializers
from .models import Frappe, Menu, Extras, Base, Milk
class FrappeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Frappe
        fields = "__all__"

class MenuSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Menu
        fields = '__all__'
        
class ExtraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extras
        fields = '__all__'
        
