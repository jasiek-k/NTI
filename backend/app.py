from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

"""
with open('./data.json') as file:
    data = json.load(file)
"""
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postdb@localhost/nti'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), unique = True)
    email = db.Column(db.String(100), unique = True)

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username


#examples = Example.query.all()
#for ex in examples:
#    print(ex.data)
db.create_all()
db.session.commit()
users = User.query.all()
print(users)
"""
@app.route('/')
def hello_world():
    return 'Hello world!'

@app.route('/news')
def get_news():
    return data

@app.route('/login', methods = ['GET', 'POST'])
def user_login():
    login = request.args["login"]   
    password = request.args["password"]
    if request.method == "POST":
        print(f'{login} {password}')
        if login != None and password != None:
            return f'User {login} logged'

@app.route('/register', methods = ['GET', 'POST'])
def user_register():
    name = request.args["name"]   
    surname = request.args["surname"]   
    mail = request.args["mail"]   
    password = request.args["password"]
    if request.method == "POST":
        print(f'{name} {surname} {mail} {password}')
        if name != None and surname != None and mail != None and password != None:
            return f'User {name} {surname} registered'

@app.route('/comment', methods = ['GET', 'POST'])
def add_comment():
    post_id = request.args.get("post_id")   
    comment = request.args.get("comment")
    if request.method == "POST":
        print(f'{post_id} {comment}')
        if post_id != None and comment != None:
            return f'Comment added to post {post_id}'
        else:
            return 'Error occured'

@app.route('/rev/<float:revNo>')
def revision(revNo):
    return 'Revision number %f' % revNo
"""
if __name__ == '__main__':
    #app.run(debug = True)
    app.run(debug= True, host='127.0.0.1', port=5000)