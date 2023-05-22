import webapp2
import os
import urllib
import json
from google.appengine.ext.webapp import template
class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(__file__),'index.html')
        self.response.write(template.render(path,{}))
    def post(self):
        name = self.request.get('name')
        url = "http://universities.hipolabs.com/search?name="+name
        response = urllib.urlopen(url).read()
        data = json.loads(response)
        template_values = {
            "name": response
        }
        path = os.path.join(os.path.dirname(__file__),'result.html')
        self.response.write(template.render(path,template_values))
app = webapp2.WSGIApplication([('/',MainPage)],debug=True)