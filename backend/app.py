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

@app.route('/')
def main():
    return 'Hello Wordl!'

@app.route('/register', methods=['POST', 'GET'])
def handle_users():
    print(request)
    if request.method == 'POST':
        if request.is_json:
            data = request.get_json()
            new_user = UsersModel(name=data['name'], surname=data['surname'], email=data['email'], password=data['password'])
            db.session.add(new_user)
            db.session.commit()
            return {"message": f"user {new_user.name} has been added successfully.", "status": 1}
        else:
            return {"error": "The request payload is not in JSON format"}

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