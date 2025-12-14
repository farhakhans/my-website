#!/usr/bin/env node

// Simple implementation of setup-plan functionality
const fs = require('fs');
const path = require('path');

// Find the most recent feature spec
const specsDir = 'specs';
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

        const latestFeature = featureDirs[0];
        const featureSpec = path.join(specsDir, latestFeature, 'spec.md');
        const implPlan = path.join(specsDir, latestFeature, 'plan.md');

        console.log(JSON.stringify({
            FEATURE_SPEC: featureSpec,
            IMPL_PLAN: implPlan,
            SPECS_DIR: specsDir,
            BRANCH: latestFeature
        }));
    }
}

// Fallback if no feature specs exist
console.log(JSON.stringify({
    FEATURE_SPEC: 'specs/1-physical-ai-chapter-spec/spec.md',
    IMPL_PLAN: 'specs/1-physical-ai-chapter-spec/plan.md',
    SPECS_DIR: specsDir,
    BRANCH: '1-physical-ai-chapter-spec'
}));