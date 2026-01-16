# PRD: Task Priority Levels

## Overview

Add priority levels (High, Medium, Low) to tasks in the Task Manager application, allowing users to categorize and visually distinguish tasks by importance.

## Problem Statement

Currently, all tasks appear with equal visual weight. Users cannot:
- Identify urgent tasks at a glance
- Organize work by importance
- Focus on high-priority items first

## Goals & Success Metrics

| Goal | Success Metric |
|------|----------------|
| Enable task prioritization | Users can assign priority to 100% of tasks |
| Improve task visibility | Priority indicated visually within 1 second of viewing |
| Maintain simplicity | No more than 1 additional click to set priority |

## User Stories

1. **As a user**, I want to assign a priority level when creating a task, so I can categorize its importance upfront.
2. **As a user**, I want to change the priority of an existing task, so I can adjust as priorities shift.
3. **As a user**, I want to visually distinguish tasks by priority, so I can quickly identify urgent work.
4. **As a user**, I want new tasks to default to Medium priority, so I don't have to set it every time.

## Functional Requirements

### FR-1: Priority Data Model
- Add `priority` field to `Task` interface
- Type: `'high' | 'medium' | 'low'`
- Default value: `'medium'`

### FR-2: Priority Selection on Create
- Add priority selector to task creation form
- Options: High, Medium, Low
- Default selection: Medium

### FR-3: Priority Display
- Show priority indicator on each task card
- Visual differentiation:
  - **High**: Red accent/badge
  - **Medium**: Yellow/orange accent/badge  
  - **Low**: Gray accent/badge

### FR-4: Priority Editing
- Allow changing priority on existing tasks
- Inline dropdown or clickable badge

### FR-5: State Management
- Update `addTask` to include priority
- Update `Task[]` state to persist priority

## Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Performance | Priority change must update UI in < 100ms |
| Accessibility | Priority selector must be keyboard navigable |
| Accessibility | Color not sole indicator (include text/icon) |

## Technical Approach

### Changes to App.tsx

```typescript
// Updated interface
interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'  // NEW
}

// New state for priority selection
const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium')

// Updated addTask function
const addTask = () => {
  if (newTaskTitle.trim()) {
    setTasks([...tasks, {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,  // NEW
    }])
    setNewTaskTitle('')
    setNewTaskPriority('medium')
  }
}

// New function to change priority
const changePriority = (id: string, priority: 'high' | 'medium' | 'low') => {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, priority } : task
  ))
}
```

### CSS Updates

```css
.task-card.priority-high { border-left: 4px solid #dc2626; }
.task-card.priority-medium { border-left: 4px solid #f59e0b; }
.task-card.priority-low { border-left: 4px solid #6b7280; }

.priority-badge {
  font-size: 0.75rem;
  padding: 2px 8px;
  border-radius: 4px;
}
.priority-badge.high { background: #fecaca; color: #dc2626; }
.priority-badge.medium { background: #fef3c7; color: #d97706; }
.priority-badge.low { background: #e5e7eb; color: #4b5563; }
```

## UI/UX Considerations

- Priority selector: Dropdown or segmented button group
- Badge position: After task title, before delete button
- Color scheme: Red (urgent) → Yellow (normal) → Gray (low)
- Include text label with color for accessibility

## Out of Scope

- Sorting/filtering by priority (future enhancement)
- Custom priority levels
- Priority-based notifications
- Drag-and-drop reordering by priority

## Timeline & Milestones

| Phase | Deliverable | Estimate |
|-------|-------------|----------|
| 1 | Data model + create form | 1 hour |
| 2 | Visual display + styling | 1 hour |
| 3 | Edit priority functionality | 30 min |
| 4 | Testing + polish | 30 min |

**Total Estimate: 3 hours**
