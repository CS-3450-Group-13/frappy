from email.policy import default
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class UserManger(BaseUserManager):
    use_in_migrations: bool = True

    def create_user(self, email, first_name=None, last_name=None, password=None):
        if not email:
            raise ValueError("must provide email")

        email = self.normalize_email(email)
        user: User = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            password=password,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(email=email, password=password)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)


# Create your models here.
class User(AbstractUser):
    username = None
    balance = models.DecimalField()
    email = models.EmailField(("email Address"), unique=True, null=False)
    USERNAME_FIELD = "email"
    balance = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, default=0
    )
    REQUIRED_FIELDS: list[str] = []
    objects = UserManger()

    def __str__(self):
        return f"{self.email} | {self.balance}"


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    hours = models.DecimalField(max_digits=100, decimal_places=2, default=0)
    wage = models.DecimalField(max_digits=10, decimal_places=2, default=14.95)

    is_cashier = models.BooleanField(default=False)
    is_barista = models.BooleanField(default=False)
