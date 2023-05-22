import webapp2
from google.appengine.api import urlfetch
import json
class MainPage(webapp2.RequestHandler):
    def get(self):
        output=''' 
            <html>
            <body>
            <h1>hello</h1>
            <form method="post" action="/">
                <label>Pincode: </label> <input type="number" name="pincode"></input>
                <input type="submit">
            </form> 
            </body>
            </html>
           '''
        self.response.write(output)

    def post(self):
        zip = self.request.get('pincode')
        api = "https://api.postalpincode.in/pincode/"+zip
        result = urlfetch.fetch(api)
        data = result.content.decode('utf-8')
        data = json.loads(data)
        self.response.write (data)
app = webapp2.WSGIApplication([('/',MainPage)],debug=True)