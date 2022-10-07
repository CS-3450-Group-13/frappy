from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=50)
    stock = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=20, decimal_places=2)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Base(Ingredient):
    decaf = models.BinaryField()


class Milk(Ingredient):
    non_dairy = models.BinaryField()


class Extras(Ingredient):
    decaf = models.BinaryField()
    non_dairy = models.BinaryField()
    gluten_free = models.BinaryField()
    limit = models.IntegerField()


class Frappe(models.Model):
    class Sizes(models.IntegerChoices):
        SMALL = 1
        MEDIUM = 2
        LARGE = 3

    name = models.CharField(max_length=250)
    markup = models.DecimalField(max_digits=5, decimal_places=2)
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    size = models.IntegerField(choices=Sizes.choices)

    @property
    def price(self):
        return sum() + self.markup


class Recipe_Item(models.Model):
    frappe = models.ForeignKey(Frappe, verbose_name=(""), on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Extras, on_delete=models.CASCADE)
    quantity = models.IntegerField()
