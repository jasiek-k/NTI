from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

dataArray = {}
with open('data.json') as file:
    data = json.load(file)
    print(data)

@app.route('/')
def hello_world():
    return 'Hello world!'

@app.route('/news')
def show_blog():
    return data

@app.route('/query', methods = ['GET', 'POST'])
def query():
    language = request.args.get('language') #opcjonalne info
    framework = request.args['framework']   #obowiązkowe info
    website = request.args.get('website')
    return '<h1>The lang is: {}</h1>'.format(language)

@app.route('/rev/<float:revNo>')
def revision(revNo):
    return 'Revision number %f' % revNo


if __name__ == '__main__':
    #app.run(debug = True)
    app.run(debug= True, host='127.0.0.1', port=5000)