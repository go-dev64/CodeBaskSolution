from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=100)
    category = models.ForeignKey(
        "Category", on_delete=models.CASCADE, null=True, blank=True
    )
    description = models.TextField()
    technology = models.CharField(max_length=20, blank=True)
    image = models.ImageField(upload_to="projects/", blank=True)
    url_site = models.URLField(blank=True)
    url_github = models.URLField(blank=True)

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
