import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        output = ""
        name = "aryan<br>"
        seat= 'T190058512<br>'
        output+=name
        output+=seat
        i=0
        while i<10:
            output+='department<br>'
            i=i+1
        self.response.write(output)

app = webapp2.WSGIApplication(
    [('/', MainPage)],
    debug= True
)