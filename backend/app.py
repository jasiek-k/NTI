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
def show_blog():
    return data

@app.route('/test')
def testing():
    #jtopy = json.dumps(data) 
    #dict_json = json.loads(jtopy) 
    #print(dict_json["posts"])
    data_set = (data['posts'])'
    return data_set

@app.route('/comment', methods = ['GET', 'POST'])
def add_comment():
    post_id = request.args.get("post_id")   
    comment = request.args.get("comment")
    if request.method == "POST":
        print(f'{post_id} {comment}')
        return f'REQUEST: {post_id} {comment}'

@app.route('/rev/<float:revNo>')
def revision(revNo):
    return 'Revision number %f' % revNo

if __name__ == '__main__':
    #app.run(debug = True)
    app.run(debug= True, host='127.0.0.1', port=5000)