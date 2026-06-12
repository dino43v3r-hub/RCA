# RCA Evidence Analyzer

A lightweight root-cause analysis app. Enter the problem that needs to be explained, paste evidence or upload text-based files, choose a focus area or auto-detect the domain, and the app returns the most likely root cause with supporting signals, contributing factors, evidence gaps, timeline signals, corrective actions, and a resolution plan.

## Run

Open `index.html` in a browser.

No build step and no dependencies are required.

## Current Scope

The first version uses transparent rule-based analysis so the result can run locally and explain why it reached a conclusion. It is designed as an MVP foundation for a future AI-backed RCA engine.

Evidence can be entered by:

- Writing a short problem statement that identifies the outcome to explain
- Pasting directly into the evidence box
- Uploading text-like files such as `.txt`, `.log`, `.csv`, `.json`, `.md`, `.xml`, `.html`, `.yaml`, and `.yml`

PDF, Word, image, and spreadsheet parsing should be added with a backend or document-processing library in a later version.

Supported focus areas:

- IT / Service Incident
- Cybersecurity
- Workplace Safety
- Manufacturing / Quality
- Compliance / Audit
- Education / Administrative Operations
- General RCA

For IT storage cases, CSV evidence with fields such as `DriveSizeGB`, `FreeGB`, `UsedGB`, `WindowsInstaller_GB`, `WinSxS_GB`, `ProgramData_GB`, and profile/cache columns is summarized to identify likely technical space consumers.

## Product Direction

The user should only need to provide the problem and evidence. The app should infer the likely root cause, show the basis for that inference, recommend solutions, and flag what still needs to be proven before the conclusion is final.

Future improvements:

- File upload for logs, PDFs, images, and ticket exports
- AI-assisted evidence extraction
- Saved cases
- Exportable RCA reports
- Domain-specific report templates
- Review workflow with human approval before final RCA
