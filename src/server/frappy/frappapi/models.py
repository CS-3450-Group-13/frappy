from django.db import models

# Create your models here.
class Ingredient(models.Model):
    name = models.CharField(max_length=50, unique=True)
    stock = models.IntegerField()
    price_per_unit = models.DecimalField(max_digits=20, decimal_places=2)
    updated_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Base(Ingredient):
    decaf = models.BooleanField()


class Milk(Ingredient):
    non_dairy = models.BooleanField(default=True)


class Extras(Ingredient):
    decaf = models.BooleanField(default=True)
    non_dairy = models.BooleanField(default=True)
    gluten_free = models.BooleanField(default=True)
    limit = models.IntegerField()


class ExtraDetail(models.Model):
    amount = models.IntegerField()
    frappe = models.ForeignKey('Frappe', on_delete=models.CASCADE)
    extras = models.ForeignKey(Extras, on_delete=models.CASCADE)
        

class Frappe(models.Model):
    class Sizes(models.IntegerChoices):
        SMALL = 1
        MEDIUM = 2
        LARGE = 3

    name = models.CharField(max_length=250)
    markup = models.DecimalField(max_digits=5, decimal_places=2)
    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    milk = models.ForeignKey(Milk, on_delete=models.CASCADE)
    size = models.IntegerField(choices=Sizes.choices)
    extras = models.ManyToManyField(Extras, blank=True, through=ExtraDetail)

    @property
    def price(self):
        # TODO: Correct the price
        return sum() + self.markup

    def __str__(self):
        return self.name


class Menu(models.Model):
    frappe = models.ForeignKey(Frappe, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="uploads")
