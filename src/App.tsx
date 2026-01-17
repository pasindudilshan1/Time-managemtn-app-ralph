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

  // TODO: Use tasks and setTasks in upcoming user stories
  void tasks;
  void setTasks;

  return (
    <div className="app">
      <h1>Time Management App</h1>
      
      <div className="task-container">
        {/* Task components will be added here */}
      </div>
    </div>
  )
}

export default App
