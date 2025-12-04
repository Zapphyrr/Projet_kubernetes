from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)  # Permet les requêtes cross-origin

def get_db():
    conn= sqlite3.connect('tasks.db')
    conn.row_factory=sqlite3.Row
    return conn

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT 0
        )
    ''')
    db.commit()
    db.close()

# Nouvelle route pour la météo
@app.route('/api/weather/<city>', methods=['GET'])
def get_weather(city):
    try:
        api_key = os.getenv('OPENWEATHER_API_KEY')
        if not api_key:
            return jsonify({'error': 'API key not configured'}), 500
            
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
        response = requests.get(url)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({'error': 'Weather data not found'}), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/tasks', methods=['GET'])
def get_tasks():
    db = get_db()
    tasks = db.execute('SELECT * FROM tasks').fetchall()
    db.close()
    return jsonify([dict(task) for task in tasks])

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.json
    db = get_db()
    db.execute('INSERT INTO tasks (title, done) VALUES (?, ?)', (data['title'], False))
    db.commit()
    db.close()
    return jsonify({'message': 'Task added'}), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.json
    db = get_db()
    db.execute('UPDATE tasks SET title=?, done=? WHERE id=?', (data['title'], data['done'], task_id))
    db.commit()
    db.close()
    return jsonify({'message': 'Task updated'})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    db = get_db()
    db.execute('DELETE FROM tasks WHERE id=?', (task_id,))
    db.commit()
    db.close()
    return jsonify({'message': 'Task deleted'})

#Initialisation de notre base de donnée, placé avant le main, mais après la création de l'instance flask
with app.app_context():
    init_db()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)