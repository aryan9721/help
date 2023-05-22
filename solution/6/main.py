import webapp2

class MainPage(webapp2.RequestHandler): 
    def get(self):
        output=""
        n=8
        prev2 = 0
        prev = 1
        output += str(prev2) + " " + str(prev) + " "

        for i in range(2,n):
            curr = prev+prev2
            output+=str(curr)+" "
            prev2 = prev
            prev = curr

        self.response.write(output)

app = webapp2.WSGIApplication([('/',MainPage)],debug=True)
