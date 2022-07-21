# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
from server_logic import handle_request_data
import time
import json
import io

hostName = "localhost"
serverPort = 8080

class StaghuntServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "text/html")
        self.end_headers()

        self.wfile.write(bytes("<html><head><title>https://pythonbasics.org</title></head>", "utf-8"))
        self.wfile.write(bytes("<p>Request: %s</p>" % self.path, "utf-8"))
        self.wfile.write(bytes("<body>", "utf-8"))
        self.wfile.write(bytes("<p>This is an example web server.</p>", "utf-8"))
        self.wfile.write(bytes("</body></html>", "utf-8"))

    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()

        data = handle_request_data(self.rfile) # an io.BufferedIOBase input stream

        self.wfile.write(bytes(data, "utf-8"))

if __name__ == "__main__":
    # HTTPServer(server_address, RequestHandlerClass)
    webServer = HTTPServer((hostName, serverPort), StaghuntServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
