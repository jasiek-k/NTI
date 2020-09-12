from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from models import *
from flask import jsonify
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
'''
@app.route('/news', methods=['POST', 'GET'])
def get_news():
    if request.method == 'GET':
        posts = PostsModel.query.all()
        #q = PostsModel.query.all().join("tags")
        #list = db.session.query(posts, tags).filter(users.id == friendships.friend_id).filter(friendships.user_id == userID).paginate(page, 1, False)
        list2 = PostsModel.query.all()
        print(list2)
        comm = []
        for i in len(list2):
            comments = CommentsModel.query.join(UsersModel.user_id==CommentsModel.user_id).filter(CommentsModel.post_id==i)
            comm.append(jsonify(comments))
        return { result: comm }
'''
#select users.name, users.surname, comments.content from users inner join comments on users.user_id=comments.user_id;
        #return jsonify(posts)
"""
        return jsonify(username=g.user.username,
                   email=g.user.email,
                   id=g.user.id)
        results = [
            {
                "id": post.post_id,
                "date": post.date,
                "content": post.content,
                "photo": post.photo,
                #"comments": post.comments,
            } for post in posts]
        return {"count": len(results), "posts": results}
"""
"""
    elif request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_comment = CommentsModel(
                content=data['content'], 
                user_id=data['user_id'], 
                post_id=data['post_id'])
            db.session.add(new_comment)
            db.session.commit()
            return {"message": f"User {new_comment.content} has been added successfully.", 
                "status": 1}
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
                return {"error": "There is no account associated with this email.", "status": -1}
            elif data['password'] != user.password:
                return {"error": "Wrong password", "status": -1}
            else:
                result = {
                    "id": user.user_id,
                    "name": user.name,
                    "surname": user.surname,
                    "email": user.email,
                } 
                return { "user": result, "status": 123}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}

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
"""
@app.route('/comments', methods=['POST', 'GET'])
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
            return {"message": f"Comment has been added successfully to post {data.post_id}.", "status": 1}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}
    elif request.method == 'GET':
        results = [
            {
                "user_id": item.user_id,
                "post_id": item.post_id,
                "content": item.content
            } for item in comments]
        return {"count": len(results), "comments": results}
"""
"""
@app.route('/news', methods=['POST', 'GET'])
def handle_news():
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_post = PostsModel(
                content=data['content'], 
                photo=data['photo']
            )
            db.session.add(new_post)
            db.session.commit()
            return {"message": "Post has been added successfully.", "status": 1}
        else:
            return {"error": "The request payload is not in JSON format.", "status": -1}
    elif request.method == 'GET':
        
        posts = PostsModel.query.all()
        comments = CommentsModel.query.all()
        posts = PostsModel.query.all().join(CommentsModel).filter(PostsModel.post_id == CommentsModel.post_id)
        print(posts)
        
        #comments = CommentsModel.query.filter(item)
        for item in posts:
            comment = CommentsModel.query.filter_by(comment_id == item.)
            for comment in comments:
                if comment.post_id == item.post_id:
                    comments.append({
                        "id": comment.comment_id,
                        "date": comment.date,
                        "content": comment.content,
                        "user_id": comment.user_id
                    })
            result.append({
                "id": item.post_id,
                "content": item.content,
                "date": item.date,
                "photo": item.photo,
                "comments": comments,
            })
"""
"""    
        results = [
            {
                "id": item.post_id,
                "content": item.content,
                "date": item.date,
                "photo": item.photo,
                #"comments": CommentsModel.query.filter_by(post_id = item.post_id)
            } for item in posts]
"""
"""
        return {"count": len(results), "posts": results}
"""
@app.route('/comment/<id>', methods=['POST', 'GET'])
def comments(id):
    if request.method == 'GET':
        comments = CommentsModel.query.filter(comment_id == id)
        print(comments)
    else:
      return true

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)