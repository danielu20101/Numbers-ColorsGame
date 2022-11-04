import os
import redis

from flask import Flask, request, Response
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/login', methods=['POST'])
def login():
    req = request.get_json()
    email = req['email']
    password = req['password']

    redis_connection = redis.Redis(
        host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT']
    )
    # check if the username exists in the redis database
    if redis_connection.get(email):
        # check if the password is correct
        if redis_connection.get(email).decode("utf-8") == password:
            return Response("Login Succesfull", status=200)
        else:
            return Response('Incorrect password', status=201)
    else:
        return Response('Username does not exist', status=208)


@app.route('/register', methods=['POST'])
def register():
    req = request.get_json()
    email = req['email']
    password = req['password']
    print(email, password)

    redis_connection = redis.Redis(
        host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT']
    )

    # check if the username exists in the redis database
    if redis_connection.get(email):
        return Response('Username already exists', status=201)
    else:
        redis_connection.set(email, password)
        return Response('Registration successful', status=200)


@app.route('/redis')
def redis_test():
    r = redis.Redis(host=os.environ['REDIS_HOST'], port=6379, db=0)
    r.set('foo', 'bar')
    return r.get('foo')


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
