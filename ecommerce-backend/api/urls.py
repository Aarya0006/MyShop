from django.urls import path
from .views import UserCreate, ItemList, CartItemView, CartItemDetailView, ProfileView, ItemDetailView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Auth endpoints
    path('auth/signup/', UserCreate.as_view(), name='signup'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/profile/', ProfileView.as_view(), name='profile'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Item endpoints
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetailView.as_view(), name='item-detail'),

    # Cart endpoints
    path('cart/', CartItemView.as_view(), name='cart-item-list'),
    path('cart/remove/<int:pk>/', CartItemDetailView.as_view(), name='cart-item-detail'),
]
