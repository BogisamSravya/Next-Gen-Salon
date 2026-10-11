from django.test import TestCase
from django.urls import reverse

class HomePageTests(TestCase):
    def test_home_page_status_code(self):
        response = self.client.get(reverse('home'))
        self.assertEqual(response.status_code, 200)

    def test_home_page_template_used(self):
        response = self.client.get(reverse('home'))
        self.assertTemplateUsed(response, 'website/index.html')

    def test_home_page_contains_branding(self):
        response = self.client.get(reverse('home'))
        self.assertContains(response, 'NEXT GEN')
        self.assertContains(response, '/static/css/style.css')
        self.assertContains(response, '/static/images/hero-salon.jpg')
        self.assertContains(response, '/static/js/main.js')
