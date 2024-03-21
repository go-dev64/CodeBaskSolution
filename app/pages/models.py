from django.db import models
from django.utils import timezone


class Project(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250)
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, null=True, blank=True
    )
    resume = models.TextField()
    body = models.TextField()
    publish = models.DateTimeField(default=timezone.now)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-publish"]
        indexes = [models.Index(fields=["-publish"])]

    def __str__(self):
        return self.title


class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class ContactSubmission(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f"{self.last_name} {self.first_name}"
