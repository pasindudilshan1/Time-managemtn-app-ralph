import { useState } from 'react'
import './App.css'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Sample Task 1', completed: false, priority: 'medium' },
    { id: '2', title: 'Sample Task 2', completed: true, priority: 'medium' },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium')

  const addTask = () => {
    if (newTaskTitle.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          title: newTaskTitle,
          completed: false,
          priority: newTaskPriority,
        },
      ])
      setNewTaskTitle('')
      setNewTaskPriority('medium')
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
        <select
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value as Task['priority'])}
          className="priority-select"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
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
