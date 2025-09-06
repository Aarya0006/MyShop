from django.shortcuts import render


from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Item, CartItem
from .serializers import UserSerializer, ItemSerializer, CartItemSerializer, ProfileSerializer
from .permissions import IsVendor, IsOwnerOrReadOnly


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny] 

class ItemList(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    permission_classes = [IsVendor]

    def get_queryset(self):
        queryset = Item.objects.all()
        user = self.request.user
        
        # This new block handles fetching items for the vendor dashboard
        my_items = self.request.query_params.get('my_items')
        if user.is_authenticated and my_items == 'true':
            return queryset.filter(vendor=user)

        # This is the existing public filtering logic
        category = self.request.query_params.get('category')
        max_price = self.request.query_params.get('price_lte')

        if category:
            queryset = queryset.filter(category__icontains=category)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(vendor=self.request.user)


class CartItemView(generics.ListCreateAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated] 

    def get_queryset(self):

        return CartItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):

        item_id = self.request.data.get('item')
        quantity = self.request.data.get('quantity', 1)
        item = Item.objects.get(id=item_id)
        
        
        cart_item, created = CartItem.objects.get_or_create(
            user=self.request.user, 
            item=item,
            defaults={'quantity': quantity}
        )
        

        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()


class CartItemDetailView(generics.DestroyAPIView):
    serializer_class = CartItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(user=self.request.user)
    
class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user
    
    
class ItemDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [IsOwnerOrReadOnly]