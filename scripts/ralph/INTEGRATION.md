# Ralph + OpenCode Integration Guide

## How Ralph Integrates with OpenCode

### 1. The Core Integration Point

**In `ralph.sh` (line ~77):**
```bash
OUTPUT=$(cat "$SCRIPT_DIR/prompt.md" | opencode --dangerously-allow-all 2>&1 | tee /dev/stderr)
```

**In `ralph.ps1` (PowerShell version):**
```powershell
$output = Get-Content $PromptPath -Raw | opencode --dangerously-allow-all 2>&1
```

This command:
- Reads `prompt.md` (the AI agent instructions)
- Pipes it to the `opencode` CLI
- Uses `--dangerously-allow-all` to enable file operations
- Captures the output to check for completion

### 2. OpenCode CLI Flags

**Key flags for Ralph integration:**

- `--dangerously-allow-all` - **REQUIRED** - Allows the AI to:
  - Read files
  - Write files  
  - Run terminal commands
  - Access git operations
  
- `--model` - (Optional) Specify which model to use:
  ```bash
  opencode --model claude-3-5-sonnet-20241022 --dangerously-allow-all
  ```

- `--max-tokens` - (Optional) Control response length:
  ```bash
  opencode --max-tokens 8000 --dangerously-allow-all
  ```

### 3. How prompt.md Works

The `prompt.md` file tells OpenCode what to do:

```markdown
1. Read the PRD at `prd.json`
2. Check progress at `progress.txt`
3. Find highest priority story where `passes: false`
4. Implement that story
5. Run quality checks
6. Commit if passing
7. Update PRD to set `passes: true`
8. Update progress.txt
9. Reply with <promise>COMPLETE</promise> when all done
```

### 4. The Completion Signal

Ralph looks for this in OpenCode's output:
```xml
<promise>COMPLETE</promise>
```

When OpenCode responds with this, Ralph knows all user stories are complete and stops the loop.

### 5. Customizing the Integration

#### Change OpenCode Model
```bash
# In ralph.sh, modify line ~77:
OUTPUT=$(cat "$SCRIPT_DIR/prompt.md" | opencode --model claude-opus-4-20250514 --dangerously-allow-all 2>&1 | tee /dev/stderr)
```

#### Add Timeout
```bash
# Add timeout to prevent hanging:
OUTPUT=$(timeout 600 bash -c "cat '$SCRIPT_DIR/prompt.md' | opencode --dangerously-allow-all 2>&1") || true
```

#### Change Max Iterations Default
```bash
# In ralph.sh line 7, change:
MAX_ITERATIONS=${1:-10}  # Change 10 to your preferred default
```

#### Add Logging
```bash
# Add after the opencode call:
echo "$OUTPUT" >> "$SCRIPT_DIR/opencode-raw-output.log"
```

## Installation & Setup

### Step 1: Install OpenCode CLI
```bash
npm install -g @opencode/cli
```

### Step 2: Verify Installation
```bash
opencode --version
```

### Step 3: Configure Authentication
OpenCode may require API keys. Set them in your environment:
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANTHROPIC_API_KEY="your-key-here"
```

Or on Windows PowerShell:
```powershell
$env:ANTHROPIC_API_KEY="your-key-here"
```

### Step 4: Test OpenCode Manually
```bash
cd "e:\Algotech project 02\task-app - Copy (2)\scripts\ralph"
cat prompt.md | opencode --dangerously-allow-all
```

### Step 5: Run Ralph
```bash
# Bash (Git Bash, WSL, Linux, Mac):
bash ralph.sh 5

# PowerShell (Windows):
.\ralph.ps1 -MaxIterations 5
```

## Usage Examples

### Single Iteration (Testing)
```powershell
# PowerShell
cd "e:\Algotech project 02\task-app - Copy (2)\scripts\ralph"
Get-Content prompt.md | opencode --dangerously-allow-all
```

### Multiple Iterations
```powershell
# PowerShell
.\ralph.ps1 -MaxIterations 10
```

```bash
# Bash
bash ralph.sh 10
```

### With Custom Model
```bash
# Edit ralph.sh line ~77 to add --model flag:
cat "$SCRIPT_DIR/prompt.md" | opencode --model gpt-4 --dangerously-allow-all 2>&1 | tee /dev/stderr
```

## Troubleshooting

### "opencode: command not found"
```bash
# Install it:
npm install -g @opencode/cli

# Or check if node_modules/.bin is in PATH:
export PATH="$PATH:./node_modules/.bin"
```

### "Authentication failed"
```bash
# Set your API key:
export ANTHROPIC_API_KEY="your-key"
```

### Ralph doesn't stop
- Check if OpenCode is outputting `<promise>COMPLETE</promise>`
- Look at `progress.txt` to see what Ralph is doing
- Check `prd.json` to see which stories have `passes: true`

### OpenCode times out
- Add a timeout wrapper (see customization above)
- Reduce the scope of user stories
- Increase `--max-tokens`

## Advanced: Custom OpenCode Configuration

Create `.opencoderc` in your project root:
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "maxTokens": 8000,
  "temperature": 0.7,
  "allowFileOperations": true
}
```

Then ralph.sh can use:
```bash
OUTPUT=$(cat "$SCRIPT_DIR/prompt.md" | opencode 2>&1 | tee /dev/stderr)
```

## Key Files

- `ralph.sh` - Bash loop script (Mac/Linux/WSL)
- `ralph.ps1` - PowerShell script (Windows)
- `prompt.md` - Instructions for OpenCode AI
- `prd.json` - User stories with tracking
- `progress.txt` - Execution log

## Next Steps

1. Test with `.\ralph.ps1 -MaxIterations 1` first
2. Review the git commits Ralph makes
3. Check `progress.txt` for learnings
4. Gradually increase iterations as confidence grows
