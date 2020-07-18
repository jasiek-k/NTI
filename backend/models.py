from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class UsersModel(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(80), nullable = False)
    surname = db.Column(db.String(80), nullable = False)
    email = db.Column(db.String(100), unique = True)
    password = db.Column(db.String(50), nullable = False)
    comments = db.relationship('CommentsModel', backref='users', lazy = 'joined')

    def __init__(self, name, surname, email, password):
        self.name = name
        self.surname = surname
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % self.name


class PostsModel(db.Model):
    __tablename__ = 'posts'

    post_id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.DateTime, default = datetime.now)
    content = db.Column(db.String(500), nullable = True)
    photo = db.Column(db.String(1000000), nullable = True)
    comments = db.relationship('CommentsModel', backref='posts', lazy = 'joined')
    tags = db.relationship('TagsModel', backref = 'posts', lazy = 'joined')

    def __init__(self, content, photo):
        self.content = content
        self.photo = photo


class CommentsModel(db.Model):
    __tablename__ = 'comments'

    comment_id = db.Column(db.Integer, primary_key = True)
    date = db.Column(db.DateTime, default = datetime.now)
    content = db.Column(db.String(1000), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'))

    def __init__(self, content, user_id, post_id):
        self.content = content
        self.user_id = user_id
        self.post_id = post_id


class TagsModel(db.Model):
    __tablename__ = 'tags'

    tag_id = db.Column(db.Integer, primary_key = True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.post_id'), nullable = False)
    tag = db.Column(db.String(20), nullable = False)

    def __init__(self, post_id, tag):
        self.post_id = post_id
        self.tag = tag 
