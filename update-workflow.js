const fs = require('fs');
const yaml = require('js-yaml');

// Load file list from YAML
const fileOptionsPath = './.github/generated/file-options.yml';
const workflowPath = './.github/workflows/manual-trigger.yml';

const fileOptionsYaml = yaml.load(fs.readFileSync(fileOptionsPath, 'utf8'));
const workflowYaml = yaml.load(fs.readFileSync(workflowPath, 'utf8'));

// Convert 'options' list from file-options.yml into array of filenames
let options = [];
const fileLines = fs.readFileSync(fileOptionsPath, 'utf8').split('\n');
fileLines.forEach(line => {
  const match = line.match(/^\s*- (.+)$/);
  if (match) options.push(match[1]);
});

// Patch the options into workflow
workflowYaml.on.workflow_dispatch.inputs.file_choice.options = options;

// Save updated workflow
fs.writeFileSync(workflowPath, yaml.dump(workflowYaml, { lineWidth: -1 }));

console.log('✅ manual-trigger.yml updated with new file options.');
