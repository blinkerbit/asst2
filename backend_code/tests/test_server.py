import json
from tornado.testing import AsyncHTTPTestCase
from server_backend import make_app


class TestHelloApp(AsyncHTTPTestCase):
    def get_app(self):
        return make_app()

    def test_homepage(self):
        with open("tests/response.json") as f:
            test_data = f.read()
        response = self.fetch("/history/RPGLIFE")
        self.assertEqual(response.code, 200)
        self.assertEqual(response.body.decode(), test_data)
