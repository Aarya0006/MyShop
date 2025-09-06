# ecommerce-backend/api/permissions.py

from rest_framework import permissions
from .models import Profile

class IsVendor(permissions.BasePermission):
    """
    Custom permission to only allow users with the 'vendor' role to create items.
    """
    def has_permission(self, request, view):
        print("--- Running IsVendor Permission Check ---")

        if request.method in permissions.SAFE_METHODS:
            print("Request is a safe method (GET), allowing permission.")
            return True

        if not request.user or not request.user.is_authenticated:
            print("User is not authenticated. Denying permission.")
            return False

        print(f"User '{request.user.username}' is authenticated. Checking profile...")

        try:
            profile = Profile.objects.get(user=request.user)
            print(f"Found profile for user. Role is: '{profile.role}'")

            if profile.role == 'vendor':
                print("Role is 'vendor'. Granting permission.")
                return True
            else:
                print("Role is NOT 'vendor'. Denying permission.")
                return False
        except Profile.DoesNotExist:
            print("Profile does not exist for this user. Denying permission.")
            return False
        
        
class IsOwnerOrReadOnly(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
     
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.vendor == request.user