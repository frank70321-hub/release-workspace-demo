const releaseRows = [...document.querySelectorAll('[data-release-result]')];
const runReleaseChecks = document.querySelector('#run-release-checks');
const releaseDecision = document.querySelector('#release-decision');
const releaseSummary = document.querySelector('#release-summary');
const blockerCount = document.querySelector('#blocker-count');
const checkProgress = document.querySelector('#check-progress');
const releaseView = document.querySelector('#release-view');
const workflowView = document.querySelector('#workflow-view');
const viewLabel = document.querySelector('#view-label');
const viewTitle = document.querySelector('#view-title');
const workflowStatus = document.querySelector('#workflow-status');
const workflowState = document.querySelector('#workflow-state');
const workflowHistory = document.querySelector('#workflow-history');
const eventCount = document.querySelector('#event-count');
const acceptedCount = document.querySelector('#accepted-count');
const stoppedCount = document.querySelector('#stopped-count');
const historyCount = document.querySelector('#history-count');

function completeReleaseChecks() {
  releaseRows.forEach((row) => {
    row.classList.add('is-passed');
    row.querySelector('em').textContent = 'Passed';
  });
  checkProgress.textContent = '4 / 4 passed';
  blockerCount.textContent = '00';
  releaseDecision.textContent = 'GO';
  releaseDecision.className = 'accepted';
  releaseSummary.textContent = 'handoff ready';
  runReleaseChecks.textContent = 'Release checks complete';
  runReleaseChecks.disabled = true;
}

const eventOutcomes = {
  'valid-update': { label: 'Valid update', state: 'ACCEPTED', detail: 'Validated and queued for review.', className: 'accepted', accepted: true },
  'invalid-id': { label: 'Malformed ID', state: 'REJECTED', detail: 'Stopped before processing.', className: 'rejected', stopped: true },
  'duplicate-submission': { label: 'Duplicate request', state: 'HELD', detail: 'One action retained for review.', className: 'held', stopped: true },
};

const totals = { events: 0, accepted: 0, stopped: 0 };

function addWorkflowHistory(eventName) {
  const outcome = eventOutcomes[eventName];
  if (!outcome) return;
  workflowHistory.querySelector('.empty-history')?.remove();
  totals.events += 1;
  totals.accepted += outcome.accepted ? 1 : 0;
  totals.stopped += outcome.stopped ? 1 : 0;
  eventCount.textContent = String(totals.events).padStart(2, '0');
  acceptedCount.textContent = String(totals.accepted).padStart(2, '0');
  stoppedCount.textContent = String(totals.stopped).padStart(2, '0');
  historyCount.textContent = `${totals.events} ${totals.events === 1 ? 'entry' : 'entries'}`;
  workflowState.textContent = outcome.state;
  workflowState.className = outcome.className;
  workflowStatus.textContent = outcome.detail;
  const row = document.createElement('li');
  const detail = document.createElement('span');
  const state = document.createElement('span');
  detail.textContent = `${outcome.label}: ${outcome.detail}`;
  state.textContent = outcome.state;
  state.className = outcome.className;
  row.append(detail, state);
  workflowHistory.prepend(row);
}

runReleaseChecks.addEventListener('click', completeReleaseChecks);
document.querySelectorAll('[data-workflow-event]').forEach((button) => button.addEventListener('click', () => addWorkflowHistory(button.dataset.workflowEvent)));
document.querySelectorAll('[data-mode]').forEach((button) => button.addEventListener('click', () => {
  const workflowMode = button.dataset.mode === 'workflow';
  document.querySelectorAll('[data-mode]').forEach((tab) => {
    const active = tab === button;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-pressed', String(active));
  });
  releaseView.classList.toggle('is-hidden', workflowMode);
  workflowView.classList.toggle('is-hidden', !workflowMode);
  viewLabel.textContent = workflowMode ? 'WORKFLOW INTEGRATION' : 'RELEASE READINESS';
  viewTitle.textContent = workflowMode ? 'What should happen to this input?' : 'Can this build ship?';
}));
