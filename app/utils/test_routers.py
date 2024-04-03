import unittest

from django.http import HttpResponse
from django.test import RequestFactory

from app.utils.routers import Router


class TestRouter(unittest.TestCase):
    def setUp(self):
        self.router = Router()
        self.factory = RequestFactory()

    def test_url_decorator(self):
        @self.router.url(url_path="test-url", url_name="test-url")
        def test_view(request):
            return HttpResponse("Test URL")

        urlpatterns = self.router.urls.urlpatterns
        self.assertEqual(len(urlpatterns), 1)
        self.assertEqual(urlpatterns[0].pattern._route, "test-url/")
        self.assertEqual(urlpatterns[0].name, "test-url")

        request = self.factory.get("/test-url/")
        response = test_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"Test URL")

    def test_get_decorator(self):
        @self.router.get(url_path="test-get", url_name="test-get")
        def test_view(request):
            return HttpResponse("Test GET")

        urlpatterns = self.router.urls.urlpatterns
        self.assertEqual(len(urlpatterns), 1)
        self.assertEqual(urlpatterns[0].pattern._route, "test-get/")
        self.assertEqual(urlpatterns[0].name, "test-get")

        request = self.factory.get("/test-get/")
        response = test_view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, b"Test GET")

    # Add more test cases for other decorators...
