# Generated by Django 5.0.3 on 2024-03-12 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pages", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="project",
            old_name="url",
            new_name="url_github",
        ),
        migrations.AddField(
            model_name="project",
            name="url_site",
            field=models.URLField(blank=True),
        ),
    ]
