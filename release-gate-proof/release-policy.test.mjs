import test from 'node:test';
import assert from 'node:assert/strict';

import { evaluateReleaseGate } from './release-policy.mjs';

const commit = '8f31c2a';
const passingChecks = [
  { name: 'typecheck', status: 'passed', commit },
  { name: 'unit', status: 'passed', commit },
  { name: 'playwright', status: 'passed', commit },
  { name: 'build', status: 'passed', commit },
];

test('allows staging only when every required check passed for the candidate commit', () => {
  const result = evaluateReleaseGate({ candidateCommit: commit, checks: passingChecks });

  assert.deepEqual(result, {
    decision: 'release',
    blockers: [],
    verifiedCommit: commit,
  });
});

test('blocks when a required check is missing', () => {
  const result = evaluateReleaseGate({
    candidateCommit: commit,
    checks: passingChecks.filter((check) => check.name !== 'playwright'),
  });

  assert.equal(result.decision, 'hold');
  assert.deepEqual(result.blockers, ['playwright: missing']);
});

test('blocks failed and pending checks with an explicit reason', () => {
  const result = evaluateReleaseGate({
    candidateCommit: commit,
    checks: passingChecks.map((check) => {
      if (check.name === 'unit') return { ...check, status: 'failed' };
      if (check.name === 'build') return { ...check, status: 'pending' };
      return check;
    }),
  });

  assert.equal(result.decision, 'hold');
  assert.deepEqual(result.blockers, ['unit: failed', 'build: pending']);
});

test('blocks green checks produced for a stale commit', () => {
  const result = evaluateReleaseGate({
    candidateCommit: commit,
    checks: passingChecks.map((check) =>
      check.name === 'playwright' ? { ...check, commit: '1a2b3c4' } : check,
    ),
  });

  assert.equal(result.decision, 'hold');
  assert.deepEqual(result.blockers, ['playwright: stale commit 1a2b3c4']);
});
