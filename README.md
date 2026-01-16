# Task App

A simple task manager built with React and TypeScript.

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

## Typecheck

```bash
npm run typecheck
```

## Use Ralph to Add Features

1. Copy Ralph to this project:
   ```bash
   mkdir -p scripts/ralph
   cp ../ralph/ralph.sh scripts/ralph/
   cp ../ralph/prompt.md scripts/ralph/
   ```

2. Create a PRD for the feature you want:
   ```bash
   amp
   # Then: Load the prd skill and create a PRD for [your feature]
   # Then: Load the ralph skill and convert tasks/prd-[name].md to prd.json
   ```

3. Run Ralph:
   ```bash
   ./scripts/ralph/ralph.sh
   ```
