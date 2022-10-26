# Generated by Django 4.1.2 on 2022-10-26 18:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("frappapi", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="frappe",
            name="creator",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="frappes",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="frappe",
            name="extras",
            field=models.ManyToManyField(
                blank=True,
                related_name="details",
                through="frappapi.ExtraDetail",
                to="frappapi.extras",
            ),
        ),
        migrations.AddField(
            model_name="frappe",
            name="milk",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="frappapi.milk"
            ),
        ),
        migrations.AddField(
            model_name="frappe",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
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
