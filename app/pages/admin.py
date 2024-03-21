from django.contrib import admin

from .models import Category, ContactSubmission, Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "slug", "category", "publish"]
    list_filter = ["publish", "category"]
    search_fields = ["title", "body"]
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "publish"
    ordering = ["publish"]


admin.site.register(Category, admin.ModelAdmin)
admin.site.register(ContactSubmission, admin.ModelAdmin)
