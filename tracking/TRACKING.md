# Work Tracking Log — Portfolio Cleanup Audit

**Purpose:** Every AI agent that executes an instruction from `instruction_set/` MUST
append one entry here before considering that instruction complete. This log is the
single source of truth for what changed, who changed it, and when.

---

## Rules (mandatory)

1. **One entry per completed instruction file** (01 through 07). If an instruction is
   split across multiple sessions, append one entry per session and mark it `(part N)`.
2. **Append only.** Never edit, reorder, or delete existing entries. Corrections get a new
   entry that references the entry being corrected.
3. **Fill every field.** If something does not apply, write `N/A` — never leave a blank.
4. The **agent model** field must state the model name of the agent doing the work. If the
   model name cannot be disclosed, write `undisclosed AI agent`.
5. Timestamps must be **ISO-8601** (e.g. `2026-08-08T14:30:00Z`), in UTC.
6. **Files modified** must list every created, modified, and deleted file with its
   repository-relative path, tagged `[created]`, `[modified]`, or `[deleted]`.
7. The **verification** field must state the actual result of `npm run build` and
   `npm run check` (pass/fail + error counts), not "should work".
8. Unexpected discoveries go into **Follow-ups** — do NOT fix them silently (per
   `instruction_set/00_README_FIRST.md`, section 6).

---

## Entry template (copy everything inside the fence)

```markdown
---

## [INSTRUCTION-ID] — [Instruction title]

- **Agent model:** [model name or "undisclosed AI agent"]
- **Completed:** [ISO-8601 UTC timestamp]
- **Changes made:**
  - [bullet list of concrete changes, one per logical change]
- **Files modified:**
  - [path] [created|modified|deleted]
  - [path] [created|modified|deleted]
- **Summary:** [2–4 sentences summarizing what was fixed and why it matters]
- **Verification:**
  - `npm run build`: [PASS/FAIL — notes]
  - `npm run check`: [PASS/FAIL — error/warning counts]
  - Manual checks: [what was visually/behaviourally verified]
- **Follow-ups:** [anything noticed but intentionally not fixed, or "None"]
```

---

## Example entry (for format reference only — do not treat as real work)

```markdown
---

## [00] — Example: Baseline setup

- **Agent model:** undisclosed AI agent
- **Completed:** 2026-08-08T09:00:00Z
- **Changes made:**
  - Ran `npm install` and recorded baseline build output
- **Files modified:**
  - N/A
- **Summary:** Illustrative entry showing the required level of detail.
- **Verification:**
  - `npm run build`: PASS — 2 warnings
  - `npm run check`: FAIL — 3 errors (baseline)
  - Manual checks: dev server renders the home page
- **Follow-ups:** None
```

---

## Log entries

_No entries yet. The first agent to complete Instruction 01 appends below this line._
