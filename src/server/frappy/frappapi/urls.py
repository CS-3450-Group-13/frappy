from rest_framework.routers import DefaultRouter
from frappapi import views

router = DefaultRouter()
router.register(r"frappe", views.FrappeViewSet)
router.register(r"menu", views.MenuViewSet)
urlpatterns = router.urls
