from django.test import RequestFactory, TestCase
from django.urls import reverse

from app.pages.models import ContactSubmission


class SubmitContactFormTestCase(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_submit_contact_form_valid(self):
        # Create a POST request with valid form data
        response = self.client.post(reverse("hx__submit_contact_form"), {})
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, "pages/home/hx/submit-contact-form--succes.html"
        )
        self.assertTrue(ContactSubmission.objects.exists())
