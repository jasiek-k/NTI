from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import *
from flask import jsonify
import json
from sqlalchemy.orm import joinedload

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


@app.route('/news', methods=['GET'])
def get_news():
    if request.method == 'GET':
        posts_list = []
        posts = PostsModel.query.all()

        for item in posts:
            comments = CommentsModel.query.filter(
                CommentsModel.post_id == item.post_id).all()
            post_comments = []
            for comment in comments:
                post_user = UsersModel.query.filter(
                    UsersModel.user_id == comment.user_id).first()
                post_comments.append({
                    "content": comment.content,
                    "date": comment.date,
                    "user_name": f'{post_user.name} {post_user.surname}',
                })
            posts_list.append({
                "id": item.post_id,
                "content": item.content,
                "date": item.date,
                "photo": item.photo,
                "comments": post_comments,
            })
        return {"posts": posts_list}
    else:
        return {"error": "En error occured, only POST method is allowed.", "status": -1}


@app.route('/login', methods=['POST'])
def handle_login():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            user = UsersModel.query.filter_by(email=data['email']).first()
            if hasattr(user, 'user_id') == False:
                return {"error": "There is no account associated with this email.", "status": -1}
            elif data['password'] != user.password:
                return {"error": "Wrong password", "status": -1}
            else:
                if (user.name == 'admin' and user.surname == 'admin'):
                    result = {
                        "id": user.user_id,
                        "name": user.name,
                        "surname": user.surname,
                        "email": user.email,
                    }
                    return {"user": result, "status": 1413912}
                else:
                    result = {
                        "id": user.user_id,
                        "name": user.name,
                        "surname": user.surname,
                        "email": user.email,
                    }
                    return {"user": result, "status": 123}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}


@ app.route('/register', methods=['POST', 'GET'])
def handle_users():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_user = UsersModel(
                name=data['name'],
                surname=data['surname'],
                email=data['email'],
                password=data['password']
            )
            db.session.add(new_user)
            db.session.commit()
            return {"message": f"User {new_user.name} has been added successfully.", "status": 234}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}
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


@ app.route('/comments', methods=['POST'])
def handle_comments():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_comment = CommentsModel(
                content=data['content'],
                user_id=data['user_id'],
                post_id=data['post_id']
            )
            db.session.add(new_comment)
            db.session.commit()
            return {"message": f"Comment has been added successfully to the post.", "status": 1}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}
    else:
        return {"error": "En error occured, only POST method is allowed.", "status": -1}


@ app.route('/post', methods=['POST'])
def add_post():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_post = PostsModel(
                content=data['content'],
                photo=data['photo'],
            )
            db.session.add(new_post)
            db.session.commit()
            return {"message": f"Post has been added successfully.", "status": 1}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}
    else:
        return {"error": "En error occured, only POST method is allowed.", "status": -1}


if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
