# Generated by Django 5.0.3 on 2024-03-21 11:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_alter_project_options_rename_description_project_boy_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='boy',
            new_name='body',
        ),
    ]