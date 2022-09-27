from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager


class UserManger(BaseUserManager):
    use_in_migrations: bool = True

    def _create_user(self, email, password, **extras):
        if not email:
            raise ValueError("must provide email")
        email = self.normalize_email(email)
        user: User = self.model(email=email, **extras)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extras):
        extras.setdefault("is_staff", False)
        extras.setdefault("is_superuser", False)
        return self._create_user(email, password, extras)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(("email_address"), unique=True, null=False)
    USERNAME_FIELD = "email"

    REQUIRED_FIELDS: list[str] = []
    objects = UserManger()
