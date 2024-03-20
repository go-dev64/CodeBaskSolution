from django.test import RequestFactory, TestCase
from django.urls import reverse

from .forms import ContactForm
from .views import (
    hx__display_acces_button_to_contact_form,
    hx__display_form,
    hx__submit_contact_form,
)


class HomeViewTest(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_home_view(self):
        response = self.client.get("/")
        self.assertTemplateUsed(response, "pages/home/home.html")

    def test_hx__display_acces_button_to_contact_form(self):
        url = reverse("hx__display_acces_button_to_contact_form")
        request = self.factory.get(url)
        response = hx__display_acces_button_to_contact_form(request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, "pages/home/hx/display-acces-button-to-contact-form.html"
        )

    def test_hx__display_form(self):
        url = reverse("hx__display_form")
        request = self.factory.get(url)
        response = hx__display_form(request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "pages/home/hx/display-form.html")
        self.assertIsInstance(response.context["form"], ContactForm)

    def test_hx__submit_contact_form(self):
        url = reverse("hx__submit_contact_form")
        request = self.factory.post(url, data={})
        response = hx__submit_contact_form(request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(
            response, "pages/home/hx/submit-contact-form--error.html"
        )
        self.assertIsInstance(response.context["form"], ContactForm)

    """def test_about_view(self):
        url = reverse("about")
        request = self.factory.get(url)
        response = about_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "pages/about/about.html")"""
