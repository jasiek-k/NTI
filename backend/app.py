from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import *
import json


app = Flask(__name__)
CORS(app)
POSTGRES = {
    'user': 'postgres',
    'pw': 'postdb',
    'db': 'nti',
    'host': 'localhost',
    'port': '5433',
}
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
db.init_app(app)


with open('data.json') as file:
    data = json.load(file)

@app.route('/')
def main():
    return 'Hello Wordl!'
"""
@app.route('/news', methods=['POST', 'GET'])
def get_news():
    if request.method == 'GET':
        posts = PostsModel.query.all()
        results = [
            {
                "id": post.post_id,
                "date": post.date,
                "content": post.content,
                "photo": post.photo,
            } for post in posts]
        return {"count": len(results), "posts": results}
    elif request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_comment = CommentsModel(
                content=data['content'], 
                user_id=data['user_id'], 
                post_id=data['post_id'])
            db.session.add(new_comment)
            db.session.commit()
            return {"message": f"user {new_comment.content} has been added successfully.", 
                "status": 1}
        else:
            return {"error": "The request payload is not in JSON format", "status": -1}
"""

@app.route('/news')
def get_news():
    return data

@app.route('/user/<name>', methods=['GET'])
def get_user(name):
    users = UsersModel.query.filter_by(name = name).all()
    results = [
            {
                "id": user.user_id,
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
                "password": user.password
            } for user in users]
    return user

@app.route('/login', methods=['POST'])
def handle_login():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            user = UsersModel.query.filter_by(email = data['email']).first()
            if hasattr(user, 'user_id') == False:
                return {"error": "There is no account associated with this email", "status": -1}
            elif data['password'] != user.password:
                return {"error": "Wrong password", "status": -1}
            else:
                result = {
                    "id": user.user_id,
                    "name": user.name,
                    "surname": user.surname,
                    "email": user.email,
                } 
                return { "user": result, "status": 1}
        else:
            return {"error": "The request payload is not in JSON format", "status": -1}

@app.route('/register', methods=['POST', 'GET'])
def handle_users():
    #print(request)
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_user = UsersModel(
                name=data['name'], 
                surname=data['surname'], 
                email=data['email'], 
                password=data['password'])
            db.session.add(new_user)
            db.session.commit()
            return {"message": f"user {new_user.name} has been added successfully.", "status": 1}
        else:
            return {"error": "The request payload is not in JSON format", "status": -1}
    elif request.method == 'GET':
        users = UsersModel.query.all()
        results = [
            {
                "id": user.user_id,
                "name": user.name,
                "surname": user.surname,
                "email": user.email,
                "password": user.password
            } for user in users]
            
        return {"count": len(results), "users": results}

if __name__ == '__main__':
    app.run(debug= True, host='127.0.0.1', port=5000)