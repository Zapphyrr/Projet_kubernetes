from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

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