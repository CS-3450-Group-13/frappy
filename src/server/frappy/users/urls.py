from .views import EmployeeUserViewSet, UserViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"employees", EmployeeUserViewSet)
router.register(r"users", UserViewSet)
urlpatterns = router.urls
