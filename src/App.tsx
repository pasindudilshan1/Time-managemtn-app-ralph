import { useState } from 'react'
import './App.css'

interface Task {
  id: string;
  title: string;
  description?: string;
  estimatedMinutes: number;
  actualMinutes: number;
  category: 'work' | 'personal' | 'urgent' | 'other';
  status: 'pending' | 'in-progress' | 'completed';
  isTimerActive: boolean;
  timerStartTime?: number;
  createdAt: number;
  completedAt?: number;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    estimatedMinutes: 30,
    category: 'work' as Task['category']
  });

  const addTask = () => {
    if (!newTask.title.trim()) {
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title.trim(),
      estimatedMinutes: newTask.estimatedMinutes,
      actualMinutes: 0,
      category: newTask.category,
      status: 'pending',
      isTimerActive: false,
      createdAt: Date.now()
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      estimatedMinutes: 30,
      category: 'work'
    });
  };

  return (
    <div className="app">
      <h1>Time Management App</h1>
      
      <div className="task-form">
        <input
          type="text"
          placeholder="Task title..."
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        
        <input
          type="number"
          placeholder="Minutes"
          value={newTask.estimatedMinutes}
          onChange={(e) => setNewTask({ ...newTask, estimatedMinutes: parseInt(e.target.value) || 30 })}
          min="1"
        />
        
        <select
          value={newTask.category}
          onChange={(e) => setNewTask({ ...newTask, category: e.target.value as Task['category'] })}
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="urgent">Urgent</option>
          <option value="other">Other</option>
        </select>
        
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="task-container">
        {/* Task components will be added here */}
      </div>
    </div>
  )
}

export default App
