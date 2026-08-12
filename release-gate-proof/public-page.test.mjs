import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('publishes an inspectable release-gate record without unsupported claims', async () => {
  const html = await readFile(new URL('../release-gate.html', import.meta.url), 'utf8');
  const required = [
    'PR Release Gate',
    'typecheck',
    'unit',
    'playwright',
    'build',
    'stale commit',
    '4 / 4 policy checks passed',
    'release-gate-proof/release-policy.test.mjs',
    'Self-owned engineering proof',
  ];

  for (const phrase of required) {
    assert.ok(html.toLowerCase().includes(phrase.toLowerCase()), `Missing: ${phrase}`);
  }

  assert.doesNotMatch(html, /client project|production client|guarantee/i);
});

test('documents a CI workflow that runs policy and public-content checks', async () => {
  const workflow = await readFile(new URL('../.github/workflows/release-gate.yml', import.meta.url), 'utf8');

  assert.match(workflow, /node --test release-gate-proof\/\*\.test\.mjs/);
  assert.match(workflow, /node scripts\/verify-content\.mjs/);
  assert.match(workflow, /pull_request:/);
});
