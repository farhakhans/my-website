# Quickstart Guide: Physical AI Book Development

## Prerequisites

Before starting development on the Physical AI book, ensure you have:

- **Node.js** version 18 or higher
- **npm** or **yarn** package manager
- **Git** for version control
- A code editor (VS Code recommended)
- Basic knowledge of Markdown and React components

## Getting Started

### 1. Clone or Initialize the Repository

```bash
# If starting fresh
npx create-docusaurus@latest my-physical-ai-book classic

# If working with existing repository
git clone <repository-url>
cd my-physical-ai-book
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Local Development Server

```bash
npm run start
```

This will start a local development server at `http://localhost:3000` with hot reloading enabled.

## Project Structure

The Physical AI book follows this structure:

```
my-physical-ai-book/
├── docs/                 # All book content goes here
│   ├── intro.md          # Introduction chapter
│   ├── chapter-1/        # First chapter folder
│   │   ├── index.md      # Chapter landing page
│   │   ├── topic-1.md    # Individual topic
│   │   └── exercises.md  # Hands-on exercises
│   ├── chapter-2/        # Additional chapters...
│   └── ...
├── src/
│   ├── components/       # Custom React components
│   └── pages/            # Additional pages
├── static/               # Static assets (images, code samples)
├── docusaurus.config.js  # Main Docusaurus configuration
├── sidebars.js          # Navigation structure
└── package.json         # Project dependencies
```

## Creating Your First Chapter

### 1. Create Chapter Directory

```bash
mkdir docs/chapter-1
```

### 2. Create Chapter Files

Create `docs/chapter-1/index.md`:

```markdown
---
sidebar_position: 1
title: "Chapter 1: Introduction to Physical AI"
---

# Introduction to Physical AI

## Learning Objectives

After completing this chapter, you will be able to:
1. Define Physical AI and its applications
2. Identify key components of Physical AI systems
3. Implement a basic sensor simulation

## Overview

Physical AI combines artificial intelligence with physical systems to create machines that can perceive, reason, and act in the physical world...

## Prerequisites

- Basic understanding of Python programming
- Familiarity with linear algebra concepts
```

### 3. Add to Navigation

Update `sidebars.js` to include your new chapter:

```javascript
module.exports = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Chapter 1: Introduction to Physical AI',
      items: ['chapter-1/index', 'chapter-1/topic-1', 'chapter-1/exercises'],
    },
    // Add more chapters here
  ],
};
```

## Adding Hands-On Exercises

Create exercises using MDX components:

```md
import { Exercise } from '@site/src/components/Exercise';

# Hands-On Exercise

<Exercise
  title="Basic Sensor Simulation"
  difficulty="beginner"
  description="Implement a basic sensor simulation that detects objects in a 2D space"
>

## Task
Create a Python function that simulates a distance sensor with the following specifications:
- Takes a target position as input
- Returns the distance to the target
- Includes simulated noise in the measurement

```python
import random

def simulate_distance_sensor(target_x, target_y, noise_level=0.1):
    # Your implementation here
    pass
```

## Expected Output
The function should return a distance value with some random noise added based on the noise_level parameter.

</Exercise>
```

## Running and Testing

### Local Development
```bash
npm run start
```

### Build for Production
```bash
npm run build
```

### Serve Production Build Locally
```bash
npm run serve
```

## Deployment

### GitHub Pages
1. Configure your GitHub repository for GitHub Pages
2. Set up GitHub Actions workflow (example in `.github/workflows/deploy.yml`)
3. Push to main branch to trigger deployment

### Alternative Hosting (Netlify/Vercel)
1. Connect your Git repository to the platform
2. Set build command to `npm run build`
3. Set publish directory to `build`

## Best Practices

### Content Creation
- Follow the progressive complexity structure
- Include hands-on exercises in every chapter
- Use consistent formatting and style
- Include real-world examples and applications

### Code Examples
- Use Python as the primary language for Physical AI examples
- Include clear explanations for each code snippet
- Provide expected outputs or behaviors
- Make examples executable and testable

### Navigation
- Organize content in logical hierarchies
- Use clear and descriptive titles
- Include breadcrumbs for easy navigation
- Link related concepts across chapters