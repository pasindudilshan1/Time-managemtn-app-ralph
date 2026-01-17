# PRD: Simple Time Management App

## Overview

A clean, intuitive time management application that helps users track tasks with time estimates, monitor time spent, and manage their daily workload efficiently. The app focuses on simplicity while providing essential time tracking features.

## Problem Statement

People struggle to manage their time effectively because they:
- Don't estimate how long tasks will take
- Lose track of time spent on activities
- Can't prioritize work based on available time
- Have no visibility into their daily time allocation
- Get overwhelmed by complex time tracking tools

## Goals & Success Metrics

| Goal | Success Metric |
|------|----------------|
| Quick task capture | Users can create a task in < 5 seconds |
| Accurate time tracking | 90% of tasks have time estimates |
| Simple time logging | Track time with 1-click start/stop |
| Daily overview | View total time planned vs spent |
| Minimal learning curve | New users productive within 2 minutes |

## User Stories

1. **As a user**, I want to create tasks with estimated time duration, so I can plan my day effectively.
2. **As a user**, I want to start/stop a timer for active tasks, so I can track actual time spent.
3. **As a user**, I want to see remaining time for tasks, so I know what I can realistically complete.
4. **As a user**, I want to view total time planned and spent today, so I can manage my workload.
5. **As a user**, I want to mark tasks as complete, so I can track my progress.
6. **As a user**, I want to categorize tasks, so I can organize different types of work.
7. **As a user**, I want visual indicators for time status, so I can quickly identify overdue items.

## Functional Requirements

### FR-1: Task Data Model
```typescript
interface Task {
  id: string
  title: string
  description?: string
  estimatedMinutes: number
  actualMinutes: number
  category: 'work' | 'personal' | 'urgent' | 'other'
  status: 'pending' | 'in-progress' | 'completed'
  isTimerActive: boolean
  timerStartTime?: number
  createdAt: number
  completedAt?: number
}
```

### FR-2: Task Creation
- Input field for task title (required)
- Time estimate input in minutes (default: 30)
- Category selector dropdown
- Optional description field
- "Add Task" button
- Validates title is not empty

### FR-3: Time Tracking
- Start/Stop timer button on each task
- Only one timer can be active at a time
- Timer updates every second while active
- Automatically adds elapsed time to actualMinutes
- Visual indicator for active timer (pulsing icon)

### FR-4: Task Display
- Show task title, category badge, and time info
- Display estimated time vs actual time spent
- Progress bar showing time completion percentage
- Status indicator (pending, in-progress, completed)
- Action buttons: Start/Stop, Complete, Delete

### FR-5: Time Summary Dashboard
- Total estimated time for all pending tasks
- Total actual time spent today
- Number of tasks completed today
- Time remaining (estimated - actual)
- Visual progress indicator

### FR-6: Task Management
- Mark tasks as complete (moves to completed section)
- Delete tasks
- Filter by: All, Pending, In Progress, Completed
- Filter by category
- Sort by: Created date, Estimated time, Actual time

### FR-7: Local Storage Persistence
- Save tasks to localStorage
- Load tasks on app startup
- Auto-save on every change
- Preserve timer state on refresh

## Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Performance | UI updates in < 50ms |
| Responsiveness | Works on mobile, tablet, desktop |
| Data Persistence | Tasks saved locally, no data loss |
| Accessibility | Keyboard navigable, ARIA labels |
| Browser Support | Chrome, Firefox, Safari, Edge (latest) |

## Technical Approach

### Component Structure
```
App.tsx
├── TimeHeader (daily summary stats)
├── TaskInput (create new task form)
├── FilterControls (filter/sort options)
└── TaskList
    └── TaskItem (individual task with timer)
```

### State Management
```typescript
const [tasks, setTasks] = useState<Task[]>([])
const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all')
const [categoryFilter, setCategoryFilter] = useState<string>('all')
```

### Core Functions
```typescript
- addTask(task: Omit<Task, 'id' | 'createdAt'>)
- startTimer(taskId: string)
- stopTimer(taskId: string)
- completeTask(taskId: string)
- deleteTask(taskId: string)
- updateTask(taskId: string, updates: Partial<Task>)
```

## UI/UX Guidelines

### Layout
- Clean, card-based design
- Generous whitespace
- Mobile-first responsive layout
- Fixed header with summary stats
- Scrollable task list

### Color Scheme
- Primary: #3b82f6 (blue)
- Success: #10b981 (green)
- Warning: #f59e0b (amber)
- Danger: #ef4444 (red)
- Neutral: #6b7280 (gray)

### Typography
- Headers: 24px, bold
- Task titles: 16px, medium
- Time info: 14px, regular
- Category badges: 12px, bold

### Time Status Indicators
- Under estimate: Green progress bar
- Near estimate (90%+): Amber progress bar
- Over estimate: Red progress bar

### Category Badges
- Work: Blue
- Personal: Purple
- Urgent: Red
- Other: Gray

## Out of Scope (Future Enhancements)
- Calendar integration
- Recurring tasks
- Team collaboration
- Reports and analytics
- Cloud sync
- Mobile app
- Notifications

## Success Criteria
- User can create, track, and complete tasks
- Timer accurately tracks time spent
- Dashboard shows meaningful time summaries
- App is responsive and performant
- Data persists across sessions

## Timeline & Milestones

| Phase | Deliverable | Estimate |
|-------|-------------|----------|
| 1 | Data model + basic UI structure | 2 hours |
| 2 | Task creation & display | 2 hours |
| 3 | Timer functionality | 2 hours |
| 4 | Summary dashboard | 1 hour |
| 5 | Filters & sorting | 1 hour |
| 6 | LocalStorage persistence | 1 hour |
| 7 | Styling & polish | 2 hours |
| 8 | Testing & bug fixes | 1 hour |

**Total Estimate: 12 hours**
