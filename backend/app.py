from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

with open('data.json') as file:
    data = json.load(file)

app = Flask(__name__)
CORS(app)
data_base = SQLAlchemy(app)

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

if __name__ == '__main__':
    #app.run(debug = True)
    app.run(debug= True, host='127.0.0.1', port=5000)