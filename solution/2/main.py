import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        output = ''
        name = 'John Doe'
        seat_number = 'A1'
        department = ['IT','COMP','entc','mech','civil']

        output += '<b>Name: </b>' + name + '<br>'
        output += 'Seat Number: ' +seat_number + '<br>'
        output += 'Deaprtments: <br>'

        for i in department:
            output += i + '<br>'

        self.response.write(output)
app = webapp2.WSGIApplication([
    ('/', MainPage),
], debug=True)
