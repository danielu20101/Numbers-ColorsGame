import os
import redis

from flask import Flask, request, Response, jsonify
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

    # check if user exists using hget
    user = redis_connection.hgetall(email)
    if user:
        # check if password is correct
        if user[b'password'] == password.encode('utf-8'):
            return Response(status=200)
        else:
            return Response(status=201)
    else:
        return Response(status=202)



@app.route('/register', methods=['POST'])
def register():
    req = request.get_json()
    email = req['email']
    password = req['password']

    redis_connection = redis.Redis(
        host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT']
    )

    # check if user exists, otherwise create a new one using hmset/hget
    """
    Register Schema:

    email: {"passsword": <password>}
    """
    if redis_connection.hgetall(email):
        return Response('User already exists', status=201)
    else:
        redis_connection.hmset(email, {"password": password})
        return Response('User created', status=200)
    



@app.route('/add_score', methods=['POST'])
def add_score():
    req = request.get_json()
    email = req['email']
    score = int(req['score'])
    game = req['game']

    redis_connection = redis.Redis(
        host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT']
    )

    data = redis_connection.hgetall(email)
    try:
        color = data[b'color']
        number = data[b'number']

        data = data[game.encode('utf-8')].decode("utf-8")
        # convert this string to a list
        data = data[1:-1].split(", ")
        data = [int(i) for i in data]
        data.append(score)

        if game == "color":
            obj = {"color": str(data), "number": number}
        else:
            obj = {"color": color, "number": str(data)}

        # update score
        redis_connection.hmset(email, obj)
        return Response(status=200)
    except KeyError:
        if game == "color":
            obj = {"color": str([score]), "number": str([0])}
        else:
            obj = {"color": str([0]), "number": str([score])}
        # create score
        redis_connection.hmset(email, obj)
        return Response(status=200)




@app.route('/get_score', methods=['POST'])
def get_score():
    """
    get all scores for an email, and categorize them by max to min
    :return:
    """
    req = request.get_json()
    email = req['email']

    redis_connection = redis.Redis(
        host=os.environ['REDIS_HOST'], port=os.environ['REDIS_PORT']
    )

    # email = "email2"
    # get data using hgetall
    data = redis_connection.hgetall(email)

    # check if data is empty
    try:
        color = data[b'color']
        number = data[b'number']

        color = color.decode('utf-8')
        color = color[1:-1].split(", ")
        color = [int(i) for i in color]

        number = number.decode('utf-8')
        number = number[1:-1].split(", ")
        number = [int(i) for i in number]

        color = sorted(color, reverse=True)
        number = sorted(number, reverse=True)

        obj = {"color": color, "number": number}
        return jsonify(obj)
    except KeyError:
        return jsonify({"color": ["null"], "number": ["null"]})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
