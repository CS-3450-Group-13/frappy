from urllib import request
from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    pass

class ManagerUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsManager]
    
class User(request):
    username = request.POST
