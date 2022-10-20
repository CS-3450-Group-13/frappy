from .views import LoginViewSet, EmployeeUserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"login", LoginViewSet, basename="login")
router.register(r"employees", EmployeeUserViewSet)
urlpatterns = router.urls
