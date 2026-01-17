# Ralph Integration with OpenCode

Ralph is an autonomous AI agent that implements your PRD iteratively using OpenCode.

## Setup

### 1. Prerequisites
- OpenCode CLI installed: `npm install -g @opencode/cli`
- Git repository initialized
- Node.js project set up

### 2. Configuration Files

The Ralph setup uses these files:
- **`prd.json`** - Product Requirements with user stories (priority and passes tracking)
- **`prompt.md`** - Instructions for the AI agent
- **`progress.txt`** - Tracks completed work and learnings
- **`ralph.sh`** - Main loop script (Bash)

### 3. Windows Usage (PowerShell)

Since you're on Windows, convert the bash script to PowerShell or use WSL/Git Bash:

**Option A: Run with Git Bash**
```bash
cd "e:\Algotech project 02\task-app - Copy (2)\scripts\ralph"
bash ralph.sh 10
```

**Option B: Manual OpenCode Execution**
```powershell
cd "e:\Algotech project 02\task-app - Copy (2)\scripts\ralph"
Get-Content prompt.md | opencode --dangerously-allow-all
```

### 4. How It Works

1. Ralph reads `prd.json` to find the highest priority story where `passes: false`
2. Implements that user story
3. Runs quality checks (typecheck, lint, test)
4. Commits changes if checks pass
5. Updates `prd.json` to set `passes: true`
6. Appends progress to `progress.txt`
7. Repeats until all stories have `passes: true`

## Current Project: Time Management App

**User Stories:**
- US-1: Task Data Model & Basic Structure (Priority 1)
- US-2: Task Creation Form (Priority 2)
- US-3: Task Display with Time Info (Priority 3)
- US-4: Start/Stop Timer (Priority 4)
- US-5: Time Summary Dashboard (Priority 5)
- US-6: Task Completion & Status (Priority 6)
- US-7: Filter & Sort Tasks (Priority 7)
- US-8: Progress Bar & Time Indicators (Priority 8)
- US-9: LocalStorage Persistence (Priority 9)

## Running Ralph

### Single Iteration (Recommended for testing)
```powershell
Get-Content prompt.md | opencode --dangerously-allow-all
```

### Multiple Iterations (Bash - use Git Bash or WSL)
```bash
bash ralph.sh 10  # Run up to 10 iterations
```

## Progress Tracking

Ralph tracks progress in two places:
1. **`prd.json`** - Updates `passes: true` when a story is complete
2. **`progress.txt`** - Detailed log of what was implemented and learnings

## Monitoring

After each iteration, check:
- `progress.txt` for what was completed
- `prd.json` to see which stories are done (`passes: true`)
- Git commits for the actual code changes

## Stopping Ralph

The script automatically stops when:
- All user stories have `passes: true`
- Maximum iterations reached (default: 10)

Or manually with `Ctrl+C`

## Tips

1. **Start small**: Test with 1-2 iterations first
2. **Review commits**: Check Ralph's work before merging
3. **Update learnings**: The better `progress.txt` patterns are, the smarter Ralph gets
4. **Branch isolation**: Ralph works on `ralph/time-management-app` branch
5. **Quality gates**: Ralph won't commit if tests fail

## Architecture

```
scripts/ralph/
├── ralph.sh           # Main loop (Bash)
├── prompt.md          # AI agent instructions
├── prd.json          # Product requirements
├── progress.txt      # Progress log
└── archive/          # Previous runs
```
