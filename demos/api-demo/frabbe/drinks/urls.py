from importlib.resources import path
from rest_framework import routers
from .views import IngredientsViewSet, FrappeViewSet
from django.urls import include, path

router = routers.DefaultRouter()
router.register(r"drinks", FrappeViewSet)
router.register(r"ingredients", IngredientsViewSet)
urlpatterns = router.urls
