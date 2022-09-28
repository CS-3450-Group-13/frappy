from django.db import models
from django.utils import timezone


class Ingredient(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True, primary_key=True)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    stock_amnt = models.IntegerField()
    creator = models.ForeignKey(
        "users.User", related_name="drinks", on_delete=models.CASCADE
    )


class Frappe(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True, primary_key=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    photo = models.ImageField()
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(null=True)
    active = models.BooleanField(default=True)
    ingredients = models.ManyToManyField(Ingredient)
