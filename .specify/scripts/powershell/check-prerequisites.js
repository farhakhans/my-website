#!/usr/bin/env node

// Simple implementation of check-prerequisites functionality
const fs = require('fs');
const path = require('path');

// Find the most recent feature directory
const specsDir = 'specs';
let featureDir = '';
let availableDocs = [];

if (fs.existsSync(specsDir)) {
    const featureDirs = fs.readdirSync(specsDir).filter(dir =>
        fs.statSync(path.join(specsDir, dir)).isDirectory() &&
        /^\d+-/.test(dir)
    );

    if (featureDirs.length > 0) {
        // Sort by number prefix to get the most recent
        featureDirs.sort((a, b) => {
            const numA = parseInt(a.split('-')[0]);
            const numB = parseInt(b.split('-')[0]);
            return numB - numA;
        });

        featureDir = path.join(specsDir, featureDirs[0]);

        // Look for common documentation files
        const docFiles = [];
        if (fs.existsSync(path.join(featureDir, 'tasks.md'))) docFiles.push(path.join(featureDir, 'tasks.md'));
        if (fs.existsSync(path.join(featureDir, 'plan.md'))) docFiles.push(path.join(featureDir, 'plan.md'));
        if (fs.existsSync(path.join(featureDir, 'spec.md'))) docFiles.push(path.join(featureDir, 'spec.md'));
        if (fs.existsSync(path.join(featureDir, 'research.md'))) docFiles.push(path.join(featureDir, 'research.md'));
        if (fs.existsSync(path.join(featureDir, 'data-model.md'))) docFiles.push(path.join(featureDir, 'data-model.md'));
        if (fs.existsSync(path.join(featureDir, 'quickstart.md'))) docFiles.push(path.join(featureDir, 'quickstart.md'));

        availableDocs = docFiles;
    }
}

// Fallback if no feature specs exist
if (!featureDir) {
    featureDir = 'specs/1-physical-ai-chapter-spec';
    availableDocs = [
        'specs/1-physical-ai-chapter-spec/tasks.md',
        'specs/1-physical-ai-chapter-spec/plan.md',
        'specs/1-physical-ai-chapter-spec/spec.md'
    ];
}

console.log(JSON.stringify({
    FEATURE_DIR: featureDir,
    AVAILABLE_DOCS: availableDocs
}));