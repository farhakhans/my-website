#!/usr/bin/env node

// Simple implementation of create-new-feature functionality
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const featureDescription = args.join(' ') || '';
const number = args.includes('--number') ? args[args.indexOf('--number') + 1] : '1';
const shortName = args.includes('--short-name') ? args[args.indexOf('--short-name') + 1] : 'feature';

// Create feature directory
const featureDir = path.join('specs', `${number}-${shortName}`);
if (!fs.existsSync(featureDir)) {
    fs.mkdirSync(featureDir, { recursive: true });
}

// Create spec file
const specFilePath = path.join(featureDir, 'spec.md');
const specContent = `# Specification: ${shortName}\n\n${featureDescription}`;

fs.writeFileSync(specFilePath, specContent);

// Create checklists directory
const checklistDir = path.join(featureDir, 'checklists');
if (!fs.existsSync(checklistDir)) {
    fs.mkdirSync(checklistDir, { recursive: true });
}

console.log(JSON.stringify({
    BRANCH_NAME: `${number}-${shortName}`,
    SPEC_FILE: specFilePath
}));