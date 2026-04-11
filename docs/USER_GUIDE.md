# Ship-it-Ralph — User guide

This guide expands on the [README](../README.md) with scenario-based instructions. The **authoritative** behavior is always **`SKILL.md`**: in this repo [`SKILL.md`](../SKILL.md); in **your workspace** **`.agents/<skill-name>/SKILL.md`** (recommended); optionally **`.github/SKILL.md`**; or, for a machine-wide install, **`~/.agents/skills/<skill-name>/SKILL.md`**. Do not use a lone **`SKILL.md`** at **`your-workspace/.agents/`** or at **`~/.agents/`** without the proper subfolder (v7.3+).

---

## 1. What you are installing

In **this** repository the skill lives at the **repository root** (`SKILL.md` with `references/` beside it). Copy it into **the folder you open as your IDE workspace** so the agent sees:

- **`.agents/<skill-name>/SKILL.md`** — full factory: phases, commands, run modes, verification rules (example folder name: `ship-it-ralph`)  
- **`.agents/<skill-name>/references/`** — design system, stack templates, constitution guide  

Paths like `references/STACK.md` are **relative to the folder that contains `SKILL.md`** (your **`.agents/<skill-name>/`** folder, **`.github/`** if you use that layout, or the **repository root** in the upstream Ship-it-Ralph repo). Optional: copy `assets/`, `scripts/`, and `evals/` into the same folder as `SKILL.md`.

**Optional — `.github/`:** same files under **`your-workspace/.github/`** if your team standardizes on Copilot-style layout.

**Optional — global (`~/.agents` in your user profile):** some tools require **`~/.agents/skills/<skill-name>/`**; **`~/.agents/SKILL.md`** alone is invalid there. Prefer **workspace** **`.agents/<skill-name>/`** when the skill should live with the project. See **Install location & path contract** in [`SKILL.md`](../SKILL.md).

**Copy commands** (from a clone of ship-it-ralph — run in the **ship-it-ralph repository root**; set `your-workspace` to your project root):

```bash
mkdir -p your-workspace/.agents/ship-it-ralph
cp SKILL.md your-workspace/.agents/ship-it-ralph/
cp -r references your-workspace/.agents/ship-it-ralph/
```

```powershell
$ws = "C:\path\to\your-workspace"
New-Item -ItemType Directory -Force -Path "$ws\.agents\ship-it-ralph" | Out-Null
Copy-Item SKILL.md "$ws\.agents\ship-it-ralph\"
Copy-Item references "$ws\.agents\ship-it-ralph\references" -Recurse
```

No global CLI, no npm package for Ship-it-Ralph itself. The **generated app** uses Node 22, npm, and the stack defined in the skill (Express, React, Vite, Vitest, SQLite via libsql).

---

## 1.5 Orchestrated mode (optional)

Orchestrated mode keeps one canonical skill while using `orchestrator/` for context minimization.

- **Canonical authority:** `SKILL.md` — in this repo [`SKILL.md`](../SKILL.md); in your workspace **`.agents/<skill-name>/SKILL.md`** (recommended); optional **`.github/SKILL.md`**; optional global **`~/.agents/skills/<skill-name>/SKILL.md`**
- **Execution layer (templates in this repo):** `orchestrator/ORCHESTRATOR.md`, `orchestrator/phases/`, `orchestrator/pruning/`, `orchestrator/memory/` (loader/patterns as seeds)

Precedence:
1. Your installed **`SKILL.md`** for commands, run modes, phase order, contracts, and output format.
2. `orchestrator/*` for context loading/pruning only.
3. On conflict, **`SKILL.md`** wins.

**Run artifacts (orchestrated factory):** phase briefs and episodic memory for a build live under the **generated app** at **`.ralph/briefs/`** and **`.ralph/memory/`** — not under `orchestrator/` in the Ship-it-Ralph repo. See [`ORCHESTRATOR_GUIDE.md`](ORCHESTRATOR_GUIDE.md).

Prompt example:

```text
Read orchestrator/ORCHESTRATOR.md and run /factory in orchestrated mode with SKILL.md precedence.
```

Use this when you want lower token use on long runs.

---

## 2. First run: full autonomous factory

1. Copy the bundle from the **ship-it-ralph** repository root into **your workspace** **`.agents/<skill-name>/`** as above (or use **`.github/`** if you prefer that layout).  
2. Open your agent (Cursor, Copilot, Claude Code, Antigravity).  
3. Send:

   ```text
   /factory a subscription tracker that warns before renewals
   ```

4. Let the agent run **without** asking for clarification (the skill forbids idle questions).  
5. When it finishes, you should see `FACTORY COMPLETE` and files: `spec/spec.md`, `spec/tasks.md`, `tests/`, `server/`, `client/`, `constitution.md`.  
6. From the project root:

   ```bash
   npm run install:all && npm run dev
   ```

   - Client: `http://localhost:5173`  
   - API: `http://localhost:3001` (see `references/STACK.md` next to your installed `SKILL.md` if your template differs)

7. API tests need a running server:

   ```bash
   npm run dev:server
   # other terminal
   npm test
   ```

---

## 3. Human-in-the-loop: review the spec before code

1. Run:

   ```text
   /factory --review a subscription tracker that warns before renewals
   ```

2. Wait until the agent pauses after **`spec/spec.md`** is written.  
3. Open `spec/spec.md`, edit anything that is wrong (wording, entities, screens).  
4. Continue the build:

   ```text
   /approve
   ```

From `/approve`, phases 5–8 run autonomously (tasks, tests, server, client, security).

---

## 4. Run modes (`fast`, `normal`, `advanced`)

Modes change **scope and depth**, not **which phases run**. Phases 0–8 still execute in order for a full `/factory`.

| Mode | When to use | What changes |
|------|-------------|--------------|
| **fast** | Smallest viable MVP, fewer tokens | Fewer MVP features, entities, screens, and seed rows (see SKILL.md). Charts default off unless the idea is analytics-heavy. |
| **normal** | Default | Standard caps in the skill. |
| **advanced** | Production-minded MVP | Adds **Assumptions** and **Risks & edge cases** to `spec/spec.md`, deeper security findings, and expects honest reporting of `npm test` when the agent can run commands. |

Examples:

```text
/factory --fast a two-screen todo app with tags
/factory --advanced a subscription tracker that warns before renewals
/factory --mode normal --review a hiring pipeline tracker
```

**Important:** `--fast` does **not** skip tests or security. It tightens product scope only.

---

## 5. Partial commands (existing projects)

Use these when you already have artifacts and only need part of the loop.

| Command | You need | Effect |
|---------|----------|--------|
| `/from-spec` | `spec/spec.md` | Phases 5–8: tasks, tests, server, client, security. Spec file is not regenerated. |
| `/retask` | `spec/spec.md` | Regenerates `spec/tasks.md` only. |
| `/tests` | `spec/spec.md`, `spec/tasks.md` | Regenerates Vitest files only. |
| `/rebuild` | `spec/spec.md`, `spec/tasks.md` | Rebuilds server + client + security pass. |
| `/respec` | New idea in the message | Phases 1–5: new `spec/spec.md` and `spec/tasks.md`, **no** code changes until you `/rebuild` or `/from-spec`. |
| `/redesign` | Working server, `spec/spec.md`, `constitution.md` | Phases 3 and 7B: new design, client rewrite; updates `spec/spec.md` **## Screens** and **## Design** only (see `SKILL.md`). |
| `/security` | Code + `spec/spec.md` + `constitution.md` | Phase 8 only. |
| `/continue` | `spec/tasks.md` + prior “Ralph got sleepy” message | Resume truncated 7A or 7B. |

If you pass `--mode` on a partial command, see **Partial runs** in `SKILL.md` (e.g. `/from-spec --advanced` still applies advanced verification behavior where phases 1–3 did not run).

---

## 6. Truncation and “Ralph got sleepy”

If the model hits output limits mid-build, the skill tells you to type **`/continue`**. The agent should resume from the next unchecked task in `spec/tasks.md`. After client work finishes, run Phase 8 if it has not run yet.

---

## 7. Verification expectations

The skill asks the agent to:

- Write real tests in Phase 6 (they **fail** until the server exists — that is correct).  
- Pass the **health check** after Phase 7A before starting 7B.  
- Always emit a **security** block with a real **VERDICT** in Phase 8.  
- Avoid read-only dashboard output: include mutation flows (create/edit/delete), feedback states, and one actionable AI accept/reject flow.  
- Avoid claiming “tests pass” without running the test command when execution is available.

If your environment cannot run shell commands, the agent should say so instead of implying green tests.

---

## 8. Common issues

| Issue | What to try |
|-------|-------------|
| API tests fail or hang | Start the server first: `npm run dev:server`, then `npm test`. |
| Wrong ports | Check `server` port and Vite proxy in `references/STACK.md` and your generated `vite.config`. |
| Spec is wrong | Use `/factory --review` on a **new** project, or edit `spec/spec.md` and run `/retask` then `/rebuild`. |
| Scope too big | Use `/factory --fast` or split into two factory runs (skill limits DEFERRED items per run). |
| “Allow reading external directory? WORKSPACES…” (Cursor) | The skill creates **`../ralph-apps/...`** next to your project. That is **outside** a workspace opened on the app folder only — **Allow** if you want that layout. If your environment blocks writes above workspace root, switch the bootstrap path in your local `SKILL.md` to **`./ralph-apps/...`**. |
| Orchestrated mode behavior drift | Re-assert precedence: your **`SKILL.md`** is canonical; `orchestrator/*` is loading logic only. |
| Agent skipped a phase | Point it to **`.agents/<skill-name>/SKILL.md`** or **`.github/SKILL.md`** in **your** workspace, or to [`SKILL.md`](../SKILL.md) when editing the upstream skill. |

---

## 9. Optional companions

Other skill packs (e.g. general engineering skills) can live **beside** Ship-it-Ralph. They do not replace the factory: **`/factory`** remains the single entry point for generating this stack.

---

*Aligned with Ship-it-Ralph v7.3 · upstream skill: [`SKILL.md`](../SKILL.md) · recommended install: **your-workspace** **`.agents/<skill-name>/`** · optional: `.github/` or `~/.agents/skills/<skill-name>/`.*
