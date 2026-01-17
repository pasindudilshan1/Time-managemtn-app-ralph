# Ralph Wiggum - Long-running AI agent loop (PowerShell version)
# Usage: .\ralph.ps1 [max_iterations]

param(
    [int]$MaxIterations = 10
)

$ErrorActionPreference = "Continue"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$PrdFile = Join-Path $ScriptDir "prd.json"
$ProgressFile = Join-Path $ScriptDir "progress.txt"
$ArchiveDir = Join-Path $ScriptDir "archive"
$LastBranchFile = Join-Path $ScriptDir ".last-branch"

# Archive previous run if branch changed
if ((Test-Path $PrdFile) -and (Test-Path $LastBranchFile)) {
    $prdContent = Get-Content $PrdFile -Raw | ConvertFrom-Json
    $CurrentBranch = $prdContent.branchName
    $LastBranch = Get-Content $LastBranchFile -Raw
    
    if ($CurrentBranch -and $LastBranch -and ($CurrentBranch -ne $LastBranch)) {
        # Archive the previous run
        $Date = Get-Date -Format "yyyy-MM-dd"
        $FolderName = $LastBranch -replace '^ralph/', ''
        $ArchiveFolder = Join-Path $ArchiveDir "$Date-$FolderName"
        
        Write-Host "Archiving previous run: $LastBranch" -ForegroundColor Yellow
        New-Item -ItemType Directory -Path $ArchiveFolder -Force | Out-Null
        
        if (Test-Path $PrdFile) { Copy-Item $PrdFile $ArchiveFolder }
        if (Test-Path $ProgressFile) { Copy-Item $ProgressFile $ArchiveFolder }
        Write-Host "   Archived to: $ArchiveFolder" -ForegroundColor Green
        
        # Reset progress file for new run
        @"
# Ralph Progress Log
Started: $(Get-Date)
---
"@ | Set-Content $ProgressFile
    }
}

# Track current branch
if (Test-Path $PrdFile) {
    $prdContent = Get-Content $PrdFile -Raw | ConvertFrom-Json
    $CurrentBranch = $prdContent.branchName
    if ($CurrentBranch) {
        $CurrentBranch | Set-Content $LastBranchFile -NoNewline
    }
}

# Initialize progress file if it doesn't exist
if (-not (Test-Path $ProgressFile)) {
    @"
# Ralph Progress Log
Started: $(Get-Date)
---
"@ | Set-Content $ProgressFile
}

Write-Host "`nStarting Ralph - Max iterations: $MaxIterations" -ForegroundColor Cyan
Write-Host "================================================`n" -ForegroundColor Cyan

for ($i = 1; $i -le $MaxIterations; $i++) {
    Write-Host ""
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Magenta
    Write-Host "  Ralph Iteration $i of $MaxIterations" -ForegroundColor Magenta
    Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Magenta
    Write-Host ""
    
    # Run opencode with the ralph prompt
    try {
        $PromptPath = Join-Path $ScriptDir "prompt.md"
        $PromptContent = Get-Content $PromptPath -Raw
        
        # Use 'opencode run' command with the prompt as an argument
        # This is the correct way to run opencode in non-interactive mode
        $output = opencode run $PromptContent 2>&1 | Out-String
        
        Write-Host $output
        
        # Check for completion signal
        if ($output -match "<promise>COMPLETE</promise>") {
            Write-Host ""
            Write-Host "✓ Ralph completed all tasks!" -ForegroundColor Green
            Write-Host "Completed at iteration $i of $MaxIterations" -ForegroundColor Green
            exit 0
        }
        
        # Check if PRD shows all stories complete
        if (Test-Path $PrdFile) {
            $prdContent = Get-Content $PrdFile -Raw | ConvertFrom-Json
            $allComplete = $true
            foreach ($story in $prdContent.userStories) {
                if (-not $story.passes) {
                    $allComplete = $false
                    break
                }
            }
            
            if ($allComplete) {
                Write-Host ""
                Write-Host "✓ All user stories marked as complete in PRD!" -ForegroundColor Green
                Write-Host "Completed at iteration $i of $MaxIterations" -ForegroundColor Green
                exit 0
            }
        }
    }
    catch {
        Write-Host "Error in iteration $i : $_" -ForegroundColor Red
        # Continue to next iteration
    }
    
    Write-Host "`nIteration $i complete. Continuing..." -ForegroundColor Cyan
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "⚠ Ralph reached max iterations ($MaxIterations) without completing all tasks." -ForegroundColor Yellow
Write-Host "Check $ProgressFile for status." -ForegroundColor Yellow
exit 1