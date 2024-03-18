from crispy_forms.helper import FormHelper
from crispy_forms.layout import Column, Layout, Row
from django import forms

from .models import ContactSubmission


class ContactForm(forms.ModelForm):
    """
    A form for submitting contact information.

    Inherits from `forms.ModelForm` and provides fields and widgets for
    capturing the user's first name, last name, email, subject, and message.

    Attributes:
        model (Model): The model class associated with the form.
        fields (list): The list of fields to include in the form.
        widgets (dict): A dictionary mapping field names to widget instances.
        labels (dict): A dictionary mapping field names to label names.
        help_texts (dict): A dictionary mapping field names to help texts.

    Methods:
        send_email: Placeholder method for sending an email.

    """

    class Meta:
        model = ContactSubmission
        fields = ["first_name", "last_name", "email", "subject", "message"]
        widgets = {
            "first_name": forms.TextInput(attrs={"class": "form-control"}),
            "last_name": forms.TextInput(attrs={"class": "form-control"}),
            "email": forms.EmailInput(attrs={"class": "form-control"}),
            "subject": forms.TextInput(attrs={"class": "form-control"}),
            "message": forms.Textarea(attrs={"class": "form-control"}),
        }
        labels = {
            "first_name": "Prenom",
            "last_name": "Nom",
            "email": "Email",
            "subject": "Sujet du message",
            "message": "Message",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_tag = False
        self.helper.layout = Layout(
            Row(
                Column("last_name", css_class="form-group"),
                Column("first_name", css_class="form-group"),
            ),
            Row(
                Column("email", css_class="form-group"),
                Column("subject", css_class="form-group"),
            ),
            Row(
                Column("message", css_class="form-group"),
            ),
        )
