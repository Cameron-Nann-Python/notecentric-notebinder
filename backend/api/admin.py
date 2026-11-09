from django.contrib import admin

# Register your models here.
from .models import Class, Module, Note

admin.site.register(Class)
admin.site.register(Module)
admin.site.register(Note)