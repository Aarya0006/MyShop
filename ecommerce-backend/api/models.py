from django.db import models



from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    ROLE_CHOICES = (
        ('customer', 'Customer'),
        ('vendor', 'Vendor'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')

    def __str__(self):
        return f'{self.user.username} - {self.get_role_display()}'


class Item(models.Model):
    vendor = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=50, blank=True, null=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} (by {self.vendor.username})"


class CartItem(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} x {self.item.name} for {self.user.username}"