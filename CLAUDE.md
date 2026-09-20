# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Start development server**: `npm run dev`
- **Build for production**: `npm run build`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`
- **Install dependencies**: `npm install` (or `npm ci`)

## Project Structure

```
/home/krish/Hackathon/Terra
├── public/                  # Static assets
│   ├── favicon.svg
│   └── icons.svg
├── src/                     # Source code
│   ├── assets/              # Image assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.jsx              # Main React component
│   ├── index.css            # Global CSS
│   └── main.jsx             # Entry point
├── index.html               # Root HTML template
├── package.json             # Project metadata & scripts
├── vite.config.js           # Vite configuration
├── .oxlintrc.json           # Oxlint configuration
├── package-lock.json
├── README.md
└── .gitignore
```

## Architecture Overview

- **Framework**: React 19 with Vite 8 as the build tool
- **Styling**: TailwindCSS 4 via PostCSS integration (`@tailwindcss/vite`)
- **Linting**: Oxlint with React and Oxc plugins, enforcing:
  - `react/rules-of-hooks`: error
  - `react/only-export-components`: warn (allows constant exports)
- **Development Experience**: Hot Module Replacement (HMR) enabled via Vite
- **Asset Management**: 
  - Images imported as modules (PNG, SVG)
  - SVG sprites used for icons (public/icons.svg)
- **Entry Point**: `src/main.jsx` creates React root with StrictMode
- **Main Component**: `src/App.jsx` contains:
  - State management (React useState for counter)
  - Hero section with imagery
  - "Get started" section with HMR instructions
  - Documentation section linking to Vite/React
  - Social section with external links

## Key Configuration Files

### package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwindcss": "^4.3.3",
    "@tailwindcss/vite": "^4.3.3"
  },
  "devDependencies": {
    "vite": "^8.3.0",
    "@vitejs/plugin-react": "^6.1.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.7",
    "oxlint": "^1.81.0"
  }
}
```

### vite.config.js
```javascript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### .oxlintrc.json
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## Development Workflow

1. **Initialize**: Run `npm install` to install dependencies
2. **Develop**: Run `npm run dev` to start the Vite development server
3. **Lint**: Run `npm run lint` to check code quality with Oxlint
4. **Build**: Run `npm run build` for production assets
5. **Preview**: Run `npm run preview` to test the production build locally

## Notes

- The project uses `.jsx` file extensions but includes TypeScript definitions via `@types/react`
- No testing framework is configured in the base template
- Static assets in `public/` are served at the root URL
- TailwindCSS 4 is configured via Vite plugin for zero-setup integration