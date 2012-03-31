#!/usr/bin/env python
import urllib

from SimpleHTTPServer import SimpleHTTPRequestHandler, test

PROVIDER_URL = 'http://localhost:8080' 

class ProxyingHTTPHandler(SimpleHTTPRequestHandler):

    def do_GET(self):
        if self.path.startswith('/openplanetideas-plusyou'):
            self.copyfile(urllib.urlopen(PROVIDER_URL + self.path), self.wfile)
        else:
            return SimpleHTTPRequestHandler.do_GET(self)

if __name__ == '__main__':
    test(ProxyingHTTPHandler)
