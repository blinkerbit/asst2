from tornado.web import Application
try:
    from server_backend import StockHandler,CodesHandler
except:
    from  handlers.stock import StockHandler,CodesHandler

from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop


def make_app() -> Application:
    return Application(
        [
            (r"/history/(.*)", StockHandler),
            (r"/codes", CodesHandler),
        ],
        debug=True,
    )


# Create an HTTP server listening on localhost, port 8080.
def start_app():
    http_server = HTTPServer(make_app())
    http_server.listen(8098, address="127.0.0.1")
    IOLoop.current().start()
