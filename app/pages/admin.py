from django.contrib import admin

from .models import Category, ContactSubmission, Project

admin.site.register(Project, admin.ModelAdmin)
admin.site.register(Category, admin.ModelAdmin)
admin.site.register(ContactSubmission, admin.ModelAdmin)
