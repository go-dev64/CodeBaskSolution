"""from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.views.generic import FormView, TemplateView

from .forms import ContactForm


class HomeView(TemplateView):
    template_name = "pages/home.html"


home_view = HomeView.as_view()


class ContactFormView(SuccessMessageMixin, FormView):
    template_name = "pages/contact.html"
    form_class = ContactForm
    success_url = reverse_lazy("pages:home")
    success_message = "Votre demande a bien été envoyé."
"""

from django.contrib import messages
from django.template.response import TemplateResponse

from ..utils.routers import Router
from .forms import ContactForm

home_router = Router()


@home_router.get(url_name="home")
def home_view(request):
    return TemplateResponse(request, "pages/home.html")


@home_router.get
def hx__display_acces_button_to_contact_form(request):
    return TemplateResponse(request, "pages/")


@home_router.get
def hx__display_contact_form(request):
    form = ContactForm()
    return TemplateResponse(request, "pages/contact.html", {"form": form})


@home_router.post
def hx__submit_contact_form(request):
    form = ContactForm(request.POST)
    if not form.is_valid():
        messages.error(request, "Veuillez corriger les erreurs ci-dessous.")
        return TemplateResponse(request, "pages/contact.html", {"form": form})
    return TemplateResponse(request, "pages/contact.html", {"form": form})
