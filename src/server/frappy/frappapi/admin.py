from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Frappe)
admin.site.register(Base)
admin.site.register(Extras)
admin.site.register(Milk)