import { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000';
const WEATHER_API_URL = 'http://localhost:4000';

function WeatherWidget() {
  return (
    <div className="weather-widget">
      <h3>🌤️ Météo</h3>
      <iframe 
        src="http://localhost:4000" 
        width="100%" 
        height="250"
        frameBorder="0"
        title="App Météo"
        className="weather-iframe"
      />
    </div>
  );
}
/* Version améliorée du widget météo sans iframe */
/*
function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Récupère la géolocalisation si possible
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            await fetchWeatherData(lat, lon);
          },
          async () => {
            // Si géolocalisation refusée, utilise Paris par défaut
            await fetchWeatherData();
          }
        );
      } else {
        // Si géolocalisation non supportée, utilise Paris par défaut
        await fetchWeatherData();
      }
    } catch (error) {
      console.error('Erreur météo:', error);
      setLoading(false);
    }
  };
  // Météo de Paris en constante par défaut
  const fetchWeatherData = async (lat = 48.8566, lon = 2.3522) => {
    try {
      let url = `${WEATHER_API_URL}/`;
      if (lat && lon) {
        url += `?lat=${lat}&lon=${lon}`;
      }
      // Récuperation des données météo depuis la position du navigateur
      const response = await fetch(url);
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      
// Extraction des données depuis le HTML
      const city = doc.querySelector('.city')?.textContent || 'Paris';
      const temp = doc.querySelector('.temp')?.textContent || 'N/A';
      const description = doc.querySelector('.description')?.textContent || 'N/A';
      
      setWeather({
        city,
        temperature: temp,
        description
      });
    } catch (error) {
      console.error('Erreur lors de la récupération météo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget">
      <h3>🌤️ Météo</h3>
      {loading ? (
        <div className="weather-loading">Chargement...</div>
      ) : weather ? (
        <div className="weather-content">
          <div className="weather-temp">{weather.temperature}°C</div>
          <div className="weather-desc">{weather.description}</div>
          <div className="weather-city">{weather.city}</div>
        </div>
      ) : (
        <div className="weather-error">Données indisponibles</div>
      )}
    </div>
  );
}
*/
function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(false);

  // Charger les tâches au démarrage
  useEffect(() => {
    fetchTasks();
  }, []);

  // Récupérer les tâches depuis l'API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour basculer le statut d'une tâche
  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = { ...task, done: !task.done };

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: updatedTask.title,
          done: updatedTask.done
        }),
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  // Fonction pour ajouter une nouvelle tâche
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        const response = await fetch(`${API_URL}/tasks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTaskTitle.trim()
          }),
        });

        if (response.ok) {
          setNewTaskTitle('');
          setShowForm(false);
          fetchTasks();
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout:', error);
      }
    }
  };

  // Fonction pour supprimer une tâche
  const deleteTask = async (id, e) => {
    e.stopPropagation();

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  // Commencer l'édition d'une tâche
  const startEditTask = (task, e) => {
    e.stopPropagation();
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditingTaskTitle('');
  };

  // Valider l'édition
  const saveEdit = async () => {
    if (editingTaskTitle.trim()) {
      const task = tasks.find(t => t.id === editingTaskId);
      
      try {
        const response = await fetch(`${API_URL}/tasks/${editingTaskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editingTaskTitle.trim(),
            done: task.done
          }),
        });

        if (response.ok) {
          setEditingTaskId(null);
          setEditingTaskTitle('');
          fetchTasks();
        }
      } catch (error) {
        console.error('Erreur lors de la modification:', error);
      }
    }
  };

  return (
      
    <div className="main-content">
      {/* Widget météo en haut ou sur le côté */}
      <div className="weather-container">
        <WeatherWidget />
      </div>
      <div className="app">
        <h1>Ma Todo List</h1>
        
        {/* Bouton d'ajout */}
        <div className="add-section">
          <div className="action-buttons">
            <button 
              className="add-button"
              onClick={() => setShowForm(!showForm)}
              title="Ajouter une tâche"
            >
              +
            </button>
            <button 
                className={`edit-button ${editMode ? 'active' : ''}`}
                onClick={() => setEditMode(!editMode)}
                title="Mode modification"
              >
                ✏️
              </button>
            </div>
          {/* Formulaire d'ajout */}
          {showForm && (
            <div className="add-form">
              <input 
                type="text"
                placeholder="Nouvelle tâche..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                autoFocus
              />
              <button onClick={addTask} className="confirm-button">
                Ajouter
              </button>
              <button onClick={() => setShowForm(false)} className="cancel-button">
                Annuler
              </button>
            </div>
          )}
        </div>
        
        <div className="todo-list">
          {loading ? (
            <div className="loading">Chargement...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              Aucune tâche. Cliquez sur + pour en ajouter une !
            </div>
          ) : (
            tasks.map(task => (
              <div 
                key={task.id} 
                className={`todo-item ${task.done ? 'completed' : ''} ${editingTaskId === task.id ? 'editing' : ''}`}
                onClick={() => !editMode && editingTaskId !== task.id && toggleTask(task.id)}
              >
                <div className="checkbox">
                  {task.done ? '✓' : '○'}
                </div>
                
                {/* Affichage normal ou mode édition */}
                {editingTaskId === task.id ? (
                  <div className="edit-inline">
                    <input 
                      type="text"
                      className="edit-input"
                      value={editingTaskTitle}
                      onChange={(e) => setEditingTaskTitle(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                      autoFocus
                    />
                    <div className="edit-actions">
                      <button 
                        className="save-button"
                        onClick={saveEdit}
                        title="Valider"
                      >
                        ✓
                      </button>
                      <button 
                        className="cancel-edit-button"
                        onClick={cancelEdit}
                        title="Annuler"
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="task-title">{task.title}</span>
                    
                    {/* Boutons d'actions visibles en mode édition */}
                    {editMode && (
                      <div className="item-actions">
                        <button 
                          className="edit-item-button"
                          onClick={(e) => startEditTask(task, e)}
                          title="Modifier"
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-button"
                          onClick={(e) => deleteTask(task.id, e)}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>
        
        {tasks.length > 0 && (
          <div className="stats">
            Total: {tasks.length} | 
            Terminées: {tasks.filter(t => t.done).length} | 
            Restantes: {tasks.filter(t => !t.done).length}
          </div>
        )}
      </div>
    </div>      
  )
}

export default App