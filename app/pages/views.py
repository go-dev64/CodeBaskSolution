from django.contrib import messages
from django.template.response import TemplateResponse

from ..utils.routers import Router
from .forms import ContactForm

home_router = Router()


@home_router.get(url_name="home")
def home_view(request):
    return TemplateResponse(request, "pages/home/home.html")


@home_router.get
def hx__display_acces_button_to_contact_form(request):
    return TemplateResponse(
        request, "pages/home/hx/display-acces-button-to-contact-form.html"
    )


@home_router.get
def hx__display_form(request):
    form = ContactForm()
    return TemplateResponse(
        request,
        "pages/home/hx/display-form.html",
        {"form": form},
    )


@home_router.post
def hx__submit_contact_form(request):
    form = ContactForm(request.POST)
    if not form.is_valid():
        messages.error(request, "Veuillez corriger les erreurs ci-dessous.")
        return TemplateResponse(
            request,
            "pages/home/hx/submit-contact-form--error.html",
            {"form": form},
            headers={"HX-Swap": "none"},
        )
    form.save()
    messages.success(request, "Votre demande a bien été envoyé!")
    return TemplateResponse(
        request, "pages/home/hx/submit-contact-form--success.html", {"form": form}
    )
