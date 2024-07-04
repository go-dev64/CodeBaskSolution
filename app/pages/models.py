from django.db import models
from django.urls import reverse
from django.utils import timezone


class Project(models.Model):
    """
    Represents a project.

    Attributes:
        title (str): The title of the project.
        slug (str): The slug field for the project's URL.
        category (Category): The category of the project.
        resume (str): A summary of the project.
        body (str): The main content of the project.
        publish (datetime): The date and time when the project was published.
        created (datetime): The date and time when the project was created.
        updated (datetime): The date and time when the project was last updated.
    """

    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique_for_date="publish")
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

    def get_absolute_url(self):
        return reverse("pages:project_detail", args=[self.slug])


class Category(models.Model):
    """
    Represents a category.

    Attributes:
        name (str): The name of the category.
    """

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class ContactSubmission(models.Model):
    """
    Represents a contact submission.

    Attributes:
        first_name (str): The first name of the submitter.
        last_name (str): The last name of the submitter.
        subject (str): The subject of the submission.
        email (str): The email address of the submitter.
        message (str): The message of the submission.
    """

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    subject = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return f"{self.last_name} {self.first_name}"

    def nouveau_toto():
        pass

    def nouveau_stata():
        # Nouvelle fonction ajoutÃ©e
        pass

    def nouveau_ta():
        # Nouvelle fonction ajoutÃ©e
        x = 1
        print(x)
