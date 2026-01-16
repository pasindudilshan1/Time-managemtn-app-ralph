import { useState } from 'react'
import './App.css'

interface Task {
  id: string
  title: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Sample Task 1', completed: false },
    { id: '2', title: 'Sample Task 2', completed: true },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTaskTitle,
          completed: false,
        },
      ])
      setNewTaskTitle('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>
      
      <div className="add-task">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Enter new task..."
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span className="task-title">{task.title}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
