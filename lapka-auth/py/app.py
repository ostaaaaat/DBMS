import pypyodbc
from flask import Flask, request, jsonify
from flask_cors import CORS

DRIVER_NAME = 'ODBC Driver 17 for SQL Server'
SERVER_NAME = 'mssql'
DATABASE_NAME = 'Users'

connection_string = f"""
    DRIVER={DRIVER_NAME};
    SERVER={SERVER_NAME};
    DATABASE={DATABASE_NAME};
    UID=SA;
    PWD=Pass@word;
    PORT=1433;
    Trust_Connection=yes;
"""
conn = pypyodbc.connect(connection_string)

app = Flask(__name__)
CORS(app)


@app.route('/registration', methods=['POST'])
def createUser():
    cursor = conn.cursor()

    if request.method == 'POST':
        body = request.json
        email = body['email']
        password = body['password']
        name = body['name']
        number = body['number']
        print(email, password, name, number)
        cursor.execute("INSERT Users (email, password, name, phone) values (?, ?, ?, ?)",
                       (email, password, name, number))
        cursor.commit()

        return jsonify({
            'status': 'Data is posted',
            'email': email,
            'password': password,
            'name': name,
            'number': number,
        })


if __name__ == '__main__':
    app.run(debug=False)
