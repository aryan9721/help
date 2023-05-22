import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        output=""
        number=10

        for i in range(1,11):
            output+= str(number) + " * " + str(i) + " = " + str(number*i) + "<br>"
        
        self.response.write(output)

app = webapp2.WSGIApplication([('/',MainPage)],debug=True)