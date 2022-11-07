from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.permissions import SAFE_METHODS


class UserPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_admin:
            return True

        if view.action == "list":
            return hasattr(request.user, "employee") and (
                request.user.employee.is_cashier
            )

        elif view.action == "create":
            return True

        # These values are handled below
        elif view.action in ["retrieve", "update", "partial_update", "destroy"]:
            return True

        else:
            return False

    def has_object_permission(self, request, view, obj):
        if not request.user.is_authenticated():
            return False

        if view.action in ["retrieve", "update", "partial_update", "destroy"]:
            return obj == request.user or request.user.is_admin

        return False


class IsManager(permissions.BasePermission):
    def has_permission(self, request, view):
        if hasattr(request.user, "employee"):
            return request.user.employee.is_manager
        return False


class IsManagerOrReadOnly(IsManager):
    def has_permission(self, request, view):
        is_manager = super(IsManager, self).has_permission(request, view)
        return request.method in SAFE_METHODS or is_manager


class IsCashier(permissions.BasePermission):
    def has_permission(self, request, view):
        if hasattr(request.user, "employee"):
            return request.user.employee.is_cashier or request.user.employee.is_manager
        return False


class IsEmployee(permissions.BasePermission):
    def has_permission(self, request, view):
        if hasattr(request.user, "employee"):
            return True
        return False


class UserUpdatePermission(permissions.BasePermission):
    """
    Permission class to check that a user can update his own resource only
    """

    def has_permission(self, request, view):
        # check that its an update request and user is modifying his resource only
        if view.action == "update" and view.kwargs["id"] != request.user.id:
            return False  # not grant access
        return True  # grant access otherwise
