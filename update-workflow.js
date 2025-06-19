const fs = require('fs');
const yaml = require('js-yaml');

const files = fs.readdirSync('.', { withFileTypes: true })
  .filter(f => f.isFile())
  .map(f => `  - ${f.name}`);

const workflowPath = '.github/workflows/manual-trigger.yml';
let workflow = fs.readFileSync(workflowPath, 'utf8');

const fileOptions = files.join('\n');

// Replace the placeholder section
workflow = workflow.replace(
  /options:\s*\n(\s*-\s.*\n)+/gm,
  `options:\n${fileOptions}\n`
);

fs.writeFileSync(workflowPath, workflow);
