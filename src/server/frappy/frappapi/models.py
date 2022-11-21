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

    class OrderStates(models.IntegerChoices):
        IN_PROGRESS = 1
        COMPLETED = 2

    base = models.ForeignKey(Base, on_delete=models.DO_NOTHING)
    milk = models.ForeignKey(Milk, on_delete=models.DO_NOTHING)
    size = models.IntegerField(choices=Sizes.choices)
    extras = models.ManyToManyField(
        Extras, blank=True, related_name="details", through="ExtraDetail"
    )
    final_price = models.DecimalField(max_digits=20, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING)
    comments = models.TextField(blank=True)
    creator = models.ForeignKey(User, related_name="frappes", on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now_add=True)
    menu_key = models.ForeignKey(
        "Menu",
        related_name="menu_key",
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
    )
    status = models.IntegerField(choices=OrderStates.choices, default=1)

    def __str__(self):
        if hasattr(self, "menu"):
            return self.menu_key.name
        return f"{self.creator.email}@ {self.create_date} : {self.base}/{self.milk}/{self.extras}"

    def price(self, size=None):

        # If no price is provided, use the default of the model
        return (
            sum(
                [
                    round(detail.extras.price_per_unit * detail.amount, 2)
                    for detail in ExtraDetail.objects.filter(frappe=self)
                ]
            )
            + (self.base.price_per_unit)
            + (self.milk.price_per_unit)
        )


class ExtraDetail(models.Model):
    amount = models.IntegerField()
    frappe = models.ForeignKey(Frappe, on_delete=models.CASCADE)
    extras = models.ForeignKey(Extras, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.frappe} -> {self.extras} : {self.amount}"


class Menu(models.Model):
    name = models.CharField(max_length=250)
    frappe = models.ForeignKey(Frappe, on_delete=models.PROTECT)
    photo = models.ImageField(upload_to="uploads", blank=True)
    markup = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    active = models.BooleanField(default=True)

    def prices(self) -> list[int]:
        return [round(self.frappe.price(x) + self.markup, 2) for x in (1, 2, 3)]

    def __str__(self) -> str:
        return self.name
