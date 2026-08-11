import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');

const required = [
  'AI API Gateway',
  'Planet Console',
  'Checkout Release Workspace',
  'iOS Checkout QA',
  'client rating on a completed paid iOS QA engagement',
  'I fix broken product flows and finish features that are stuck.',
  'WHAT YOU CAN HIRE ME FOR',
  'Choose the result you need.',
  'Review a complete isolation record',
];

const forbidden = [
  '12 years',
  'client project',
  'React and TypeScript workflow console',
  'Vite application architecture',
];

const failures = [];

for (const phrase of required) {
  if (!html.includes(phrase)) failures.push(`Missing required phrase: ${phrase}`);
}

for (const phrase of forbidden) {
  if (html.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`Forbidden public claim: ${phrase}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Portfolio content gate: PASS');
