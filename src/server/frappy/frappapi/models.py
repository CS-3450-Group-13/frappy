from django.db import models
from users.models import User


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


class Frappe(models.Model):
    class Sizes(models.IntegerChoices):
        SMALL = 1
        MEDIUM = 2
        LARGE = 3

    base = models.ForeignKey(Base, on_delete=models.CASCADE)
    milk = models.ForeignKey(Milk, on_delete=models.CASCADE)
    size = models.IntegerField(choices=Sizes.choices)
    extras = models.ManyToManyField(
        Extras, blank=True, related_name="details", through="ExtraDetail"
    )
    creator = models.ForeignKey(User, related_name="frappes", on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)


class Menu(models.Model):
    name = models.CharField(max_length=250)
    frappe = models.ForeignKey(Frappe, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="uploads")
    markup = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    @property
    def price(self):
        return sum(self.frappe.extras) + self.markup

    def __str__(self) -> str:
        return self.name


class ExtraDetail(models.Model):
    amount = models.IntegerField()
    frappe = models.ForeignKey(Frappe, on_delete=models.CASCADE)
    extras = models.ForeignKey(Extras, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.frappe} -> {self.extras} : {self.amount}"
