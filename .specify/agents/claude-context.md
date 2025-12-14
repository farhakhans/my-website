# Agent Context: Physical AI Book Development

## Project Overview
- **Project**: Physical AI Technical Book using Docusaurus
- **Purpose**: Create an accessible, comprehensive educational resource for Physical AI
- **Target Audience**: Beginner to intermediate developers, engineers, and students
- **Core Technology**: Docusaurus documentation framework with Node.js/React

## Technical Stack
- **Framework**: Docusaurus (static site generator)
- **Languages**: Python (primary), JavaScript (secondary), C++ (tertiary) for examples
- **Content Format**: MDX (Markdown + React components)
- **Deployment**: GitHub Pages, with alternatives of Netlify or Vercel

## Project Structure
```
my-physical-ai-book/
├── docs/                 # All book content
│   ├── intro.md
│   ├── chapter-1/
│   │   ├── index.md
│   │   ├── topic-1.md
│   │   └── exercises.md
│   └── ...
├── src/
│   ├── components/       # Custom React components
│   └── pages/
├── static/               # Static assets
├── docusaurus.config.js  # Main config
├── sidebars.js          # Navigation
└── package.json
```

## Content Philosophy
- **Hands-On Learning**: Every concept includes practical examples and exercises
- **Progressive Complexity**: Content builds from foundational to advanced concepts
- **Documentation-First**: All code examples thoroughly documented
- **Multi-Modal Learning**: Support for different learning styles
- **Real-World Focus**: Examples reflect genuine Physical AI applications

## Key Files and Configurations
- **docusaurus.config.js**: Site metadata, themes, plugins
- **sidebars.js**: Navigation structure for the book
- **src/css/custom.css**: Custom styling for educational content
- **docs/**: All chapter content organized by topic

## Development Workflow
1. Create chapter directories in `/docs/`
2. Add content with proper frontmatter and MDX
3. Update `sidebars.js` for navigation
4. Test locally with `npm run start`
5. Build with `npm run build` before deployment

## API Endpoints (if needed)
- GET /api/chapters - All chapters with metadata
- GET /api/chapters/:id - Specific chapter content
- GET /api/exercises/:chapterId - Exercises for a chapter
- GET /api/resources/:chapterId - Resources for a chapter

## Best Practices
- Follow progressive complexity structure
- Include hands-on exercises in every chapter
- Use consistent formatting and style
- Include real-world examples and applications
- Make code examples executable and testable
- Organize content in logical hierarchies
- Provide clear navigation paths

## Deployment Commands
- `npm run start` - Local development server
- `npm run build` - Production build
- `npm run serve` - Serve production build locally
- `npm run deploy` - Deploy to GitHub Pages