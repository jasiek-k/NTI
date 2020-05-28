from flask import Flask
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

@app.route('/rev/<float:revNo>')
def revision(revNo):
    return 'Revision number %f' % revNo


if __name__ == '__main__':
    #app.run(debug = True)
    app.run(host='127.0.0.1', port=5000)