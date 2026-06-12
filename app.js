const domainProfiles = {
  it: {
    label: "IT / Service Incident",
    keywords: ["outage", "deployment", "server", "database", "latency", "timeout", "api", "service", "ticket", "monitoring", "change", "release"],
    hypotheses: [
      {
        title: "Recent change introduced a service failure",
        keywords: ["deploy", "deployment", "release", "change", "config", "configuration", "rollback", "version", "patch"],
        actions: ["Add change validation gates before release.", "Improve rollback readiness and ownership.", "Link monitoring alerts to recent change records."],
        solutions: ["Containment: roll back or disable the suspected change until service is stable.", "Permanent fix: add automated pre-release tests for the failed behavior.", "Verification: rerun the failed workflow and confirm alerts, latency, and error rates return to normal."]
      },
      {
        title: "Capacity or dependency failure caused degraded service",
        keywords: ["capacity", "cpu", "memory", "disk", "queue", "timeout", "dependency", "database", "network", "latency"],
        actions: ["Set capacity thresholds with alerting.", "Create dependency health checks.", "Run load and failover testing."],
        solutions: ["Containment: reduce load, scale capacity, or route traffic around the failing dependency.", "Permanent fix: increase capacity limits and add dependency failover behavior.", "Verification: confirm normal response times under expected peak load."]
      }
    ]
  },
  cybersecurity: {
    label: "Cybersecurity",
    keywords: ["phishing", "malware", "ioc", "alert", "endpoint", "account", "login", "mfa", "exfiltration", "suspicious", "siem"],
    hypotheses: [
      {
        title: "Compromised identity or endpoint enabled unauthorized activity",
        keywords: ["phishing", "credential", "password", "mfa", "login", "impossible travel", "endpoint", "malware", "token", "unauthorized"],
        actions: ["Reset affected credentials and revoke active sessions.", "Review MFA coverage and conditional access.", "Preserve endpoint and identity logs for review."],
        solutions: ["Containment: disable affected sessions, isolate impacted endpoints, and reset credentials.", "Permanent fix: close the identity or endpoint control gap that allowed access.", "Verification: confirm no continued suspicious logins, alerts, or endpoint indicators remain."]
      },
      {
        title: "Detection or control gap allowed suspicious activity to continue",
        keywords: ["missed", "alert", "suppressed", "allowlist", "exception", "no alert", "not detected", "bypass"],
        actions: ["Tune detection rules.", "Review security exceptions.", "Add escalation criteria for repeated alerts."],
        solutions: ["Containment: manually review the affected activity window for unresolved exposure.", "Permanent fix: update detection rules, alert routing, and exception expiration.", "Verification: replay or simulate the condition and confirm detection fires as expected."]
      }
    ]
  },
  safety: {
    label: "Workplace Safety",
    keywords: ["injury", "incident", "ppe", "equipment", "procedure", "training", "supervisor", "hazard", "near miss", "work area"],
    hypotheses: [
      {
        title: "Procedure, training, or hazard control was insufficient",
        keywords: ["procedure", "training", "unclear", "not trained", "ppe", "hazard", "supervision", "shortcut", "inspection"],
        actions: ["Update the procedure and retrain affected staff.", "Verify PPE availability and use.", "Add a pre-task hazard check."],
        solutions: ["Containment: pause the affected task until hazards and required controls are confirmed.", "Permanent fix: revise the procedure, retrain staff, and require documented hazard checks.", "Verification: observe the task and confirm the revised controls are being followed."]
      },
      {
        title: "Equipment or environmental condition contributed to the incident",
        keywords: ["equipment", "machine", "guard", "floor", "spill", "lighting", "weather", "maintenance", "defect"],
        actions: ["Inspect and repair affected equipment.", "Document environmental controls.", "Add recurring maintenance verification."],
        solutions: ["Containment: remove affected equipment or area from service until safe.", "Permanent fix: repair the condition and add inspection or maintenance controls.", "Verification: document inspection results and confirm no repeat hazard is present."]
      }
    ]
  },
  quality: {
    label: "Manufacturing / Quality",
    keywords: ["defect", "batch", "lot", "inspection", "supplier", "material", "process", "rework", "scrap", "tolerance"],
    hypotheses: [
      {
        title: "Process deviation or material variation caused the defect",
        keywords: ["batch", "lot", "supplier", "material", "deviation", "tolerance", "calibration", "inspection", "defect"],
        actions: ["Quarantine affected batches.", "Verify calibration and process parameters.", "Review supplier and material records."],
        solutions: ["Containment: quarantine affected lots and stop further release.", "Permanent fix: correct the process parameter, supplier issue, or inspection gap.", "Verification: retest affected samples and confirm future lots meet tolerance."]
      }
    ]
  },
  compliance: {
    label: "Compliance / Audit",
    keywords: ["audit", "policy", "control", "approval", "exception", "access", "evidence", "requirement", "noncompliance"],
    hypotheses: [
      {
        title: "Control design or execution gap allowed noncompliance",
        keywords: ["control", "policy", "approval", "exception", "access", "missing evidence", "requirement", "review", "segregation"],
        actions: ["Clarify the control owner and required evidence.", "Add periodic control testing.", "Create exception approval and expiration rules."],
        solutions: ["Containment: identify affected records, access, or approvals and correct immediate exceptions.", "Permanent fix: redesign the control so ownership, evidence, and timing are explicit.", "Verification: perform a sample test and confirm the control produces auditable evidence."]
      }
    ]
  },
  education: {
    label: "Education / Administrative Operations",
    keywords: ["student", "faculty", "registration", "advising", "financial aid", "system", "deadline", "communication", "workflow"],
    hypotheses: [
      {
        title: "Process handoff or communication gap caused the service failure",
        keywords: ["handoff", "communication", "email", "deadline", "workflow", "approval", "queue", "student", "advising"],
        actions: ["Define handoff ownership and due dates.", "Add status visibility for the requester.", "Create escalation rules for stalled cases."],
        solutions: ["Containment: identify stalled cases and assign an owner for immediate completion.", "Permanent fix: define handoff rules, status visibility, and escalation thresholds.", "Verification: review new cases after implementation and confirm they move within expected timeframes."]
      }
    ]
  },
  general: {
    label: "General RCA",
    keywords: [],
    hypotheses: [
      {
        title: "Process breakdown caused the observed failure",
        keywords: ["unclear", "missed", "late", "manual", "handoff", "approval", "procedure", "communication", "error"],
        actions: ["Document the intended process.", "Assign ownership for each handoff.", "Add verification before final completion."],
        solutions: ["Containment: assign an owner to correct the affected case or backlog.", "Permanent fix: document the process, owners, deadlines, and required checks.", "Verification: audit a small sample and confirm the process works without manual rescue."]
      },
      {
        title: "Human, tool, or information gap contributed to the outcome",
        keywords: ["training", "access", "tool", "system", "information", "unknown", "mistake", "confusing"],
        actions: ["Close the information gap.", "Improve job aids and training.", "Reduce manual steps where possible."],
        solutions: ["Containment: give the affected users the missing access, instruction, or tool support.", "Permanent fix: update training, job aids, system prompts, or automation.", "Verification: have a user repeat the task and confirm the same confusion or error does not recur."]
      }
    ]
  }
};

const allHypotheses = Object.values(domainProfiles).flatMap((profile) => profile.hypotheses);

const elements = {
  domain: document.querySelector("#domain"),
  problem: document.querySelector("#problem"),
  evidence: document.querySelector("#evidence"),
  fileUpload: document.querySelector("#fileUpload"),
  fileStatus: document.querySelector("#fileStatus"),
  analyzeButton: document.querySelector("#analyzeButton"),
  clearButton: document.querySelector("#clearButton"),
  sampleButton: document.querySelector("#sampleButton"),
  emptyState: document.querySelector("#emptyState"),
  analysisOutput: document.querySelector("#analysisOutput"),
  resultsTitle: document.querySelector("#results-title"),
  confidenceBadge: document.querySelector("#confidenceBadge"),
  problemSummary: document.querySelector("#problemSummary"),
  rootCause: document.querySelector("#rootCause"),
  supportingEvidence: document.querySelector("#supportingEvidence"),
  contributingFactors: document.querySelector("#contributingFactors"),
  timelineSignals: document.querySelector("#timelineSignals"),
  gaps: document.querySelector("#gaps"),
  actionsList: document.querySelector("#actionsList"),
  resolutionPlan: document.querySelector("#resolutionPlan")
};

const supportedFileTypes = [
  "text/",
  "application/json",
  "application/xml",
  "application/x-yaml"
];

const supportedFileExtensions = [".txt", ".log", ".csv", ".json", ".md", ".xml", ".html", ".htm", ".yaml", ".yml"];
const defaultFileStatus = "Text, logs, CSV, JSON, Markdown, XML, and HTML files can be added.";

const sampleProblem = "Registration portal timed out for students for about 50 minutes.";
const sampleEvidence = `June 10, 8:15 AM - Users reported that the student registration portal returned timeout errors.
June 10, 8:25 AM - Monitoring showed API latency above 12 seconds. Database CPU was at 96%.
June 10, 8:40 AM - The team noticed a deployment from 7:55 AM changed the search query used by the registration service.
June 10, 9:05 AM - Rolling back the release restored response times.
Impact: Students could not complete registration for about 50 minutes.
Notes: No alert fired until after users reported the issue.`;

function analyzeEvidence() {
  const rawProblem = elements.problem.value.trim();
  const rawEvidence = elements.evidence.value.trim();

  if (!rawEvidence) {
    showEmpty("Add evidence first");
    return;
  }

  const combinedInput = `${rawProblem}\n${rawEvidence}`.trim();
  const text = combinedInput.toLowerCase();
  const selectedDomain = chooseDomain(text);
  const profile = domainProfiles[selectedDomain];
  const candidates = selectedDomain === "general" ? allHypotheses : [...profile.hypotheses, ...domainProfiles.general.hypotheses];
  const scored = candidates
    .map((hypothesis) => scoreHypothesis(hypothesis, text, rawEvidence))
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  const confidence = calculateConfidence(best.score, rawEvidence, text);
  const timeline = extractTimeline(rawEvidence);
  const factors = buildContributingFactors(scored, best.title);
  const gaps = findGaps(text, timeline, confidence);

  elements.emptyState.classList.add("hidden");
  elements.analysisOutput.classList.remove("hidden");
  elements.resultsTitle.textContent = profile.label;
  elements.confidenceBadge.textContent = `${confidence}%`;
  elements.problemSummary.textContent = rawProblem || "No separate problem statement provided. The analyzer inferred the problem from the evidence.";
  elements.rootCause.textContent = best.score > 0
    ? best.title
    : "The evidence does not contain enough causal signals for a defensible root cause yet.";

  renderList(elements.supportingEvidence, best.matches.length ? best.matches : ["No strong keyword-level causal signal was found. Add the action, symptom, timing, and resolution details to improve the analysis."]);
  renderList(elements.contributingFactors, factors);
  renderList(elements.timelineSignals, timeline.length ? timeline : ["No clear dates or times were detected. Add a short sequence of events if possible."]);
  renderList(elements.gaps, gaps);
  renderList(elements.actionsList, best.actions);
  renderList(elements.resolutionPlan, buildResolutionPlan(best, confidence));
}

function chooseDomain(text) {
  const selected = elements.domain.value;
  if (selected !== "auto") {
    return selected;
  }

  const scores = Object.entries(domainProfiles)
    .filter(([key]) => key !== "general")
    .map(([key, profile]) => ({
      key,
      score: profile.keywords.reduce((total, keyword) => total + countTerm(text, keyword), 0)
    }))
    .sort((a, b) => b.score - a.score);

  return scores[0].score > 0 ? scores[0].key : "general";
}

function scoreHypothesis(hypothesis, text, rawEvidence) {
  const matches = [];
  let score = 0;

  hypothesis.keywords.forEach((keyword) => {
    const count = countTerm(text, keyword);
    if (count > 0) {
      score += count;
      matches.push(`Detected "${keyword}" ${count === 1 ? "once" : `${count} times`} in the evidence.`);
    }
  });

  if (/\b(rollback|reverted|restored|fixed|resolved|after|before|because|caused by|due to)\b/i.test(rawEvidence)) {
    score += 2;
    matches.push("Evidence includes causal or resolution language that helps connect event to outcome.");
  }

  return { ...hypothesis, score, matches };
}

function countTerm(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\b${escaped}\\b`, "gi");
  return (text.match(pattern) || []).length;
}

function calculateConfidence(score, rawEvidence, text) {
  let confidence = Math.min(72, 28 + score * 8);

  if (elements.problem.value.trim().length >= 20) confidence += 6;
  if (extractTimeline(rawEvidence).length >= 2) confidence += 8;
  if (/\b(impact|affected|users|students|customers|injury|defect)\b/.test(text)) confidence += 5;
  if (/\b(rollback|reverted|restored|fixed|resolved)\b/.test(text)) confidence += 8;
  if (rawEvidence.length < 220) confidence -= 15;

  return Math.max(10, Math.min(92, confidence));
}

function extractTimeline(rawEvidence) {
  const lines = rawEvidence
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  const timelinePattern = /\b(\d{1,2}:\d{2}\s?(am|pm)?|\d{1,2}\/\d{1,2}\/\d{2,4}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|monday|tuesday|wednesday|thursday|friday|saturday|sunday|today|yesterday)\b/i;
  return lines.filter((line) => timelinePattern.test(line)).slice(0, 6);
}

function buildContributingFactors(scored, bestTitle) {
  const factors = scored
    .filter((item) => item.title !== bestTitle && item.score > 0)
    .slice(0, 3)
    .map((item) => item.title);

  if (!factors.length) {
    factors.push("No separate contributing factor was strongly detected from the current evidence.");
  }

  return factors;
}

function findGaps(text, timeline, confidence) {
  const gaps = [];

  if (elements.problem.value.trim().length < 20) gaps.push("Add a clear problem statement so the RCA has a specific outcome to explain.");
  if (!timeline.length) gaps.push("Add a timeline showing what happened before, during, and after the incident.");
  if (!/\b(impact|affected|duration|cost|injury|defect|outage)\b/.test(text)) gaps.push("Add the impact, scope, duration, or affected people/systems.");
  if (!/\b(fixed|resolved|rollback|corrected|contained|restored)\b/.test(text)) gaps.push("Add what action restored normal conditions or stopped the issue.");
  if (!/\b(owner|approved|supervisor|team|vendor|user|operator|admin)\b/.test(text)) gaps.push("Identify the responsible process owner, team, role, or system.");
  if (confidence < 55) gaps.push("Collect direct evidence linking the suspected cause to the observed effect before treating this as final.");

  return gaps.length ? gaps : ["No major evidence gaps detected, but the conclusion should still be reviewed by a responsible human owner."];
}

function buildResolutionPlan(hypothesis, confidence) {
  if (hypothesis.score <= 0) {
    return [
      "Containment: stabilize the affected people, system, product, or process before making permanent changes.",
      "Permanent fix: gather stronger evidence before selecting a corrective action.",
      "Verification: rerun the failed process after the fix and compare results against the original problem."
    ];
  }

  const plan = [...hypothesis.solutions];

  if (confidence < 60) {
    plan.push("Decision check: treat this as a proposed solution until the evidence gap is closed.");
  }

  return plan;
}

function renderList(node, items) {
  node.replaceChildren();
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    node.appendChild(li);
  });
}

async function addUploadedFiles(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) {
    return;
  }

  const accepted = [];
  const rejected = [];

  for (const file of files) {
    if (!isSupportedEvidenceFile(file)) {
      rejected.push(file.name);
      continue;
    }

    const content = await file.text();
    accepted.push({ name: file.name, content });
  }

  if (accepted.length) {
    const uploadedEvidence = accepted
      .map((file) => `\n\n--- Evidence file: ${file.name} ---\n${file.content.trim()}`)
      .join("");
    elements.evidence.value = `${elements.evidence.value.trim()}${uploadedEvidence}`.trim();
  }

  updateFileStatus(accepted, rejected);
  event.target.value = "";
}

function isSupportedEvidenceFile(file) {
  const lowerName = file.name.toLowerCase();
  const hasSupportedExtension = supportedFileExtensions.some((extension) => lowerName.endsWith(extension));
  const hasSupportedType = supportedFileTypes.some((type) => file.type.startsWith(type));

  return hasSupportedExtension || hasSupportedType || file.type === "";
}

function updateFileStatus(accepted, rejected) {
  const messages = [];

  if (accepted.length) {
    messages.push(`Added ${accepted.length} file${accepted.length === 1 ? "" : "s"}.`);
  }

  if (rejected.length) {
    messages.push(`Skipped unsupported file${rejected.length === 1 ? "" : "s"}: ${rejected.join(", ")}.`);
  }

  elements.fileStatus.textContent = messages.join(" ") || defaultFileStatus;
}

function showEmpty(title) {
  elements.resultsTitle.textContent = title;
  elements.confidenceBadge.textContent = "0%";
  clearAnalysisOutput();
  elements.analysisOutput.classList.add("hidden");
  elements.emptyState.classList.remove("hidden");
}

function clearAnalysisOutput() {
  elements.problemSummary.textContent = "";
  elements.rootCause.textContent = "";
  [
    elements.supportingEvidence,
    elements.contributingFactors,
    elements.timelineSignals,
    elements.gaps,
    elements.actionsList,
    elements.resolutionPlan
  ].forEach((node) => node.replaceChildren());
}

function clearCase() {
  elements.problem.value = "";
  elements.evidence.value = "";
  elements.fileUpload.value = "";
  elements.domain.value = "auto";
  elements.fileStatus.textContent = defaultFileStatus;
  showEmpty("Case Cleared");
}

elements.fileUpload.addEventListener("change", addUploadedFiles);
elements.analyzeButton.addEventListener("click", analyzeEvidence);
elements.clearButton.addEventListener("click", clearCase);
elements.sampleButton.addEventListener("click", () => {
  elements.problem.value = sampleProblem;
  elements.evidence.value = sampleEvidence;
  elements.fileUpload.value = "";
  elements.fileStatus.textContent = "Sample evidence loaded. Clear Case removes it.";
  elements.domain.value = "auto";
  analyzeEvidence();
});
