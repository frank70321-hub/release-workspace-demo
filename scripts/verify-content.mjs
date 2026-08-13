import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const releaseGateHtml = await readFile(new URL('../release-gate.html', import.meta.url), 'utf8');
const investorPackHtml = await readFile(new URL('../investor-pack-auditor.html', import.meta.url), 'utf8');
const mnaModelQaHtml = await readFile(new URL('../mna-model-qa.html', import.meta.url), 'utf8');

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
  'Inspect the PR release gate',
  'Inspect the fictional investor-pack consistency audit.',
];

const investorPackRequired = [
  'Six inconsistencies found before the investor meeting',
  'Fictional direct proof',
  'Summary!B5',
  'Slide 2',
  '13.0 months',
  'does not provide investment advice',
];

const mnaModelQaRequired = [
  'Two decision-critical model errors isolated before lender delivery',
  'Download the fictional workbook',
  '$496,000 observed versus $456,000 expected.',
  'Acquisition Model!C8 vs Source Documents!E9',
  'contains no real client or transaction information',
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

for (const phrase of investorPackRequired) {
  if (!investorPackHtml.includes(phrase)) failures.push(`Missing investor-pack proof phrase: ${phrase}`);
}

for (const phrase of mnaModelQaRequired) {
  if (!mnaModelQaHtml.includes(phrase)) failures.push(`Missing M&A model-QA proof phrase: ${phrase}`);
}

for (const phrase of forbidden) {
  if (`${html}\n${releaseGateHtml}\n${investorPackHtml}\n${mnaModelQaHtml}`.toLowerCase().includes(phrase.toLowerCase())) {
    failures.push(`Forbidden public claim: ${phrase}`);
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Portfolio content gate: PASS');
