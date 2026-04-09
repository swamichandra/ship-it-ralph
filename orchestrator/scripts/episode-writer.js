#!/usr/bin/env node

/**
 * Episode writer for orchestrator memory.
 * Usage: node orchestrator/scripts/episode-writer.js
 */

import fs from "fs/promises";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((r) => rl.question(q, r));

const ROOT = process.cwd();
const RALPH_STATE = path.join(ROOT, ".ralph");
const BRIEFS = path.join(RALPH_STATE, "briefs");
const EPISODES = path.join(RALPH_STATE, "memory", "episodes");

async function readFile(p) {
  try {
    return await fs.readFile(p, "utf-8");
  } catch {
    return null;
  }
}

function extract(text, pattern) {
  const m = text?.match(pattern);
  return m ? m[1].trim() : null;
}

async function main() {
  console.log("\n=== Ship-it-Ralph Orchestrator Episode Writer ===\n");

  const brief0 = await readFile(path.join(BRIEFS, "phase-0-brief.md"));
  if (!brief0) {
    console.error("Missing .ralph/briefs/phase-0-brief.md");
    process.exit(1);
  }

  const domain = extract(brief0, /DOMAIN:\s*(.+)/) || "unknown";
  const idea = extract(brief0, /SPEC:\s*"?([^"\n]+)"?/) || "unknown";

  const brief8 = await readFile(path.join(BRIEFS, "phase-8-brief.md"));
  const verdict = extract(brief8, /Verdict:\s*(\S+)/) || "UNKNOWN";

  const name = await ask("Project name: ");
  const date = new Date().toISOString().split("T")[0];

  const edited = (await ask("Spec edited during review? (y/n): ")).toLowerCase() === "y";
  let edits = "- None";
  if (edited) {
    const lines = [];
    console.log("Enter edits (blank line to finish):");
    while (true) {
      const line = await ask("  > ");
      if (!line) break;
      lines.push(`- ${line}`);
    }
    edits = lines.length ? lines.join("\n") : "- Edited, details not captured";
  }

  const episode = `# Episode: ${name}

**Date**: ${date}
**Idea**: "${idea}"
**Domain**: ${domain}
**Outcome**: ${verdict}

## User Edits to Spec
${edits}

## For Next Time
- [capture 1-3 improvements]
`;

  await fs.mkdir(EPISODES, { recursive: true });
  const file = `${date}-${name.toLowerCase().replace(/\s+/g, "-")}.md`;
  const out = path.join(EPISODES, file);
  await fs.writeFile(out, episode, "utf-8");

  console.log(`\nEpisode written: ${out}\n`);
  rl.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
