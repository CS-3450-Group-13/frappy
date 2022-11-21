# Generated by Django 4.1.2 on 2022-11-16 19:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Base",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("stock", models.IntegerField()),
                (
                    "price_per_unit",
                    models.DecimalField(decimal_places=2, max_digits=20),
                ),
                ("updated_on", models.DateTimeField(auto_now=True)),
                ("created_on", models.DateTimeField(auto_now_add=True)),
                ("decaf", models.BooleanField()),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="ExtraDetail",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("amount", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Extras",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("stock", models.IntegerField()),
                (
                    "price_per_unit",
                    models.DecimalField(decimal_places=2, max_digits=20),
                ),
                ("updated_on", models.DateTimeField(auto_now=True)),
                ("created_on", models.DateTimeField(auto_now_add=True)),
                ("decaf", models.BooleanField(default=True)),
                ("non_dairy", models.BooleanField(default=True)),
                ("gluten_free", models.BooleanField(default=True)),
                ("limit", models.IntegerField()),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Frappe",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "size",
                    models.IntegerField(
                        choices=[(1, "Small"), (2, "Medium"), (3, "Large")]
                    ),
                ),
                ("final_price", models.DecimalField(decimal_places=2, max_digits=20)),
                ("comments", models.TextField(blank=True)),
                ("create_date", models.DateTimeField(auto_now_add=True)),
                (
                    "status",
                    models.IntegerField(
                        choices=[(1, "In Progress"), (2, "Completed")], default=1
                    ),
                ),
                (
                    "base",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.DO_NOTHING,
                        to="frappapi.base",
                    ),
                ),
                (
                    "creator",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="frappes",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "extras",
                    models.ManyToManyField(
                        blank=True,
                        related_name="details",
                        through="frappapi.ExtraDetail",
                        to="frappapi.extras",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Milk",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("stock", models.IntegerField()),
                (
                    "price_per_unit",
                    models.DecimalField(decimal_places=2, max_digits=20),
                ),
                ("updated_on", models.DateTimeField(auto_now=True)),
                ("created_on", models.DateTimeField(auto_now_add=True)),
                ("non_dairy", models.BooleanField(default=True)),
            ],
            options={
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Menu",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=250)),
                ("photo", models.ImageField(blank=True, upload_to="uploads")),
                (
                    "markup",
                    models.DecimalField(decimal_places=2, default=0, max_digits=5),
                ),
                ("active", models.BooleanField(default=True)),
                (
                    "frappe",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="frappapi.frappe",
                    ),
                ),
            ],
        ),
        migrations.AddField(
            model_name="frappe",
            name="menu_key",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="menu_key",
                to="frappapi.menu",
            ),
        ),
        migrations.AddField(
            model_name="frappe",
            name="milk",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING, to="frappapi.milk"
            ),
        ),
        migrations.AddField(
            model_name="frappe",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.DO_NOTHING,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="extradetail",
            name="extras",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="frappapi.extras"
            ),
        ),
        migrations.AddField(
            model_name="extradetail",
            name="frappe",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="frappapi.frappe"
            ),
        ),
    ]
