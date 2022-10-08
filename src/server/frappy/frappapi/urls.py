from rest_framework.routers import DefaultRouter
from frappapi import views

router = DefaultRouter()
router.register(r'menu', views.FrappeViewSet)
urlpatterns = router.urls
