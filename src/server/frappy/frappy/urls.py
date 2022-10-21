"""frappy URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from dj_rest_auth.views import PasswordResetConfirmView

API_TITLE = "Frappy order and customize"
API_DESC = "Order, update, and view the menu for our simple frappe shop."

urlpatterns = [
    path("admin/", admin.site.urls),
    path(r"frappapi/", include("frappapi.urls")),
    path("users/", include("users.urls")),
    path("auth-endpoint/", include("dj_rest_auth.urls")),
    path("auth-endpoint/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "auth-endpoint/password/reset/confirm/<str:uidb64>/<str:token>",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
