from rest_framework import permissions
from rest_framework.request import Request


class UserPermission(permissions.BasePermission):
    def has_object_permission(self, request: Request, view, obj):
        if view.action == "list":
            return request.user
        return super().has_object_permission(request, view, obj)

    def has_permission(self, request, view):
        return super().has_permission(request, view)

class IsManager(permissions.BasePermission):
    def has_permission(self, request: Request, view):
        return request.user.has_perm('frappapi._')