# Generated by Django 5.0.3 on 2024-03-21 14:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0006_project_resume"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="slug",
            field=models.SlugField(max_length=250, unique_for_date="publish"),
        ),
    ]
