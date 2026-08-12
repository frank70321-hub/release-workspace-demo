const REQUIRED_CHECKS = ['typecheck', 'unit', 'playwright', 'build'];

export function evaluateReleaseGate({ candidateCommit, checks }) {
  const checksByName = new Map(checks.map((check) => [check.name, check]));
  const blockers = [];

  for (const name of REQUIRED_CHECKS) {
    const check = checksByName.get(name);

    if (!check) {
      blockers.push(`${name}: missing`);
      continue;
    }

    if (check.commit !== candidateCommit) {
      blockers.push(`${name}: stale commit ${check.commit}`);
      continue;
    }

    if (check.status !== 'passed') {
      blockers.push(`${name}: ${check.status}`);
    }
  }

  return {
    decision: blockers.length === 0 ? 'release' : 'hold',
    blockers,
    verifiedCommit: candidateCommit,
  };
}
