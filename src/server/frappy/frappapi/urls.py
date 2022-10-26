from rest_framework.routers import DefaultRouter
from frappapi import views

router = DefaultRouter()
router.register(r"frappes", views.UserFrappeViewSet, basename="user_frappe")
router.register(r"cashier", views.CashierFrappeViewSet, basename="cashier_frappe")
router.register(r"menu", views.MenuViewSet)
router.register(r"extras", views.ExtrasViewSet, "extras")
router.register(r"milks", views.MilkViewSet)
router.register(r"bases", views.BaseViewSet)
router.register(r"extra_ingredients", views.ExtraDetailViewSet)
urlpatterns = router.urls
