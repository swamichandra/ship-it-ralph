# Orchestrator Layer

This folder contains the optional execution layer that sits above `SKILL.md`.

- `ORCHESTRATOR.md` defines the runtime phase loop.
- `phases/` contains phase-local instructions.
- `pruning/` contains context-loading and verification gates.
- `memory/` contains episodic memory rules and artifacts.
- `scripts/` contains helper tools (for example, episode writer).

Use this layer when you want lower token usage and tighter phase-local context handling.
If any instruction conflicts, `SKILL.md` wins.
