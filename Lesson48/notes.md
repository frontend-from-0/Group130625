# Using Cursor for Development

### High level

- **Rules** — persistent instructions / guardrails (how we code, what to avoid)
- **Skills** — reusable workflows (code review, test generator, release notes)
- **Sub-agents** — specialized agents with their own rules/skills (e.g. "dependency-upgrader")
- **MCP** — tool layer (connectors to external systems: Stripe, DB, Figma, Playwright)
- **Hooks** *(in Cursor world)* — deterministic control points / filters around agent behavior (e.g. pre-run checks, secret blocking), often implemented via rules + settings rather than a separate `hooks.json` now
- **Plugins / Directory** — bundles of rules + skills + sub-agents + MCP config that you install instead of hand-rolling everything

> **Think:** rules = constitution · skills = standard operating procedures · sub-agents = specialist coworkers · MCP = tools · plugins = prebuilt starter kits

---

## Rules: User, Project, Team

### What rules actually do

Cursor has layered rules: **User**, **Project**, **Team**, plus AGENTS/CLAUDE-style files.

Rules are *always-on* context the agent reads before doing anything — they shape completions, chat, and agent behavior without you repeating yourself.

**Typical rule content for web dev:**

- Tech stack preferences (Next, strict TS, Tailwind)
- Style & patterns (folder structure, error handling, i18n)
- "Never do X" and "Always do Y before commit"

### Where they live

In current Cursor setups you'll see some mix of:

**User rules (global)**

- Managed from Cursor UI / settings, stored in a user config location (e.g. `~/.cursor/settings.json` or similar; exact path may differ by version)
- Use for personal preferences: "TypeScript > JS", editor shortcuts, explanation style

**Project rules**

- Historically `.cursorrules` at repo root
- Newer versions also support `.cursor/rules/*.mdc` or similar for more modular rules
- This is the main place to encode: coding standards, architecture decisions, quality gates

**Team / org rules**

- In Teams / Enterprise, admins can configure org-wide rules that apply across repos (security, PII redaction, model choices)
- Often combined with `AGENTS.md`-style files describing expectations for internal agents

> **Precedence:** Team/Org + Project define the contract; User rules add personal flavor as long as they don't conflict.

### How to set them up

**User level**

1. Open **Cursor → Settings → Rules**
2. Add your personal default, for example:
   - Prefer React/Next + TS
   - Explain non-obvious changes in comments
   - Don't auto-add new deps without asking

**Project level**

In repo root, create `.cursor/rules/*.mdc` files with project-specific guidance:

- Tech stack and constraints
- How to handle auth, i18n
- What test commands to run and when

Optionally break into separate files (e.g. `quality-gates.mdc`, `architecture.mdc`).

**Team level** *(if you use Cursor Teams)*

- Admin in Cursor web → configure shared rules for all repos
- Use this for org-wide policies: secrets handling, which MCP servers are allowed, minimum quality gates

---

## Skills: where they live and how to use them

### What a "skill" is

A **Skill** is a folder with a `SKILL.md` that describes a reusable workflow an agent can "load" when your prompt matches its description.

**Example skills:**

- Code reviewer that checks for accessibility + loading states
- Test generator for new components
- "Wrap-up session and write changelog"

### Paths and scope

Current Cursor convention: skills are **project-scoped**.

**Location:**

```
your-project/
├── .cursor/
│   └── skills/
│       ├── code-reviewer/
│       │   └── SKILL.md
│       └── test-generator/
│           └── SKILL.md
```

There is no official "global skills directory" in Cursor; if you want a skill everywhere, you either:

- Commit `.cursor/skills/` to repos, **or**
- Maintain a script/dotfiles that copy your favorite skills into new projects

Skills created for Claude Code or other agents (same `SKILL.md` spec) can usually be dropped straight into `.cursor/skills/`.

### Installing & creating skills

**Install from a directory / catalog**

Use Cursor Directory / AgentDepot / similar to find skills, then copy or unzip them into `.cursor/skills/`.

For example:

```bash
mkdir -p .cursor/skills
unzip code-reviewer.zip -d .cursor/skills/
```

**Create your own**

```bash
mkdir -p .cursor/skills/code-reviewer
```

Create `SKILL.md` that describes:

1. What the skill does
2. When it should be triggered (intent keywords)
3. Constraints & steps (e.g. "only touch files under `src/`, run `pnpm test` before finalizing")

Once it's there, Cursor will detect it — when you ask *"review this PR for accessibility issues"*, it will match that to the appropriate skill.

> For teams, committing `.cursor/skills/` means every dev gets the same skills "out of the box".

---

## Sub-agents: specialists with their own config

### What sub-agents are

**Sub-agents** = named agents with focused responsibilities and their own rule/skill/MCP config.

Think: *"Planner"*, *"Reviewer"*, *"Dependency-Upgrade-Scout"*.

They let you orchestrate multiple experts instead of one giant AGI doing everything badly.

**Typical sub-agent types in Cursor ecosystems:**

| Agent | Role |
|-------|------|
| Planner | Turns goals into a plan |
| Implementer | Writes code following the plan |
| Reviewer | Checks diffs for bugs, quality, adherence to rules |
| Scout | Explores new libraries or dependencies |

### Where they live

Newer Cursor versions support something like `.cursor/agents/*.md` (very similar to Claude's `.claude/agents/*`).

**Example structure:**

```
.cursor/
  agents/
    dependency-upgrade-scout.md
    accessibility-reviewer.md
  skills/
  rules/
  mcp.json
```

Each agent file typically contains:

- Name & description
- Allowed paths/tools
- Rules it should follow
- Sometimes explicit owner / governance info (who reviews its work)

### How to use sub-agents

**At the UI level, you usually:**

- Select an agent profile when starting a chat, **or**
- Let the main agent spawn sub-agents internally for parallel work ("fan-out" patterns)

**When to create:**

- Define sub-agents for repetitive tasks (dep bumps, test flakiness triage, a11y sweeps)
- Add strict rules about allowed directories & commands
- Wire them up via skills or commands (e.g. a `/upgrade-deps` command that invokes the upgrade agent)

> For teams, those agent definitions live in the repo so everyone uses the same specialist patterns.

---

## MCP: external tools & servers

### What MCP is

**MCP** (Model Context Protocol) is a way for the agent to call external tools (HTTP APIs, DBs, playgrounds, Playwright, etc.) in a standard way.

**Use cases in web dev:**

- A Playwright MCP server to drive browser tests
- A Stripe MCP server to look up product/price metadata
- Internal docs/search MCP for your company

### Config and scope

Configuration is typically in `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-playwright"]
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

- This is **project-level**, committed to the repo, so all devs share the same allowed tools
- Team/Org admin can additionally whitelist/blacklist which MCP servers are allowed in the org

> **Good practice:** keep MCP set small (<10 servers) to keep behavior predictable and context manageable.

---

## Hooks and modes

Cursor's "hooks" vocabulary is a bit overloaded, but conceptually:

- **Modes** — constrain which tools / behaviors are allowed (e.g. read-only mode vs full edit mode)
- **Hooks** — deterministic checks / filters applied around agent actions (like intercepting a command to verify it doesn't leak secrets)

Modern docs emphasize rules and modes instead of a separate `hooks.json`, but the ideas carry over:

1. Use **rules** to define what is allowed
2. Use **modes** to define which toolset is active (e.g. no MCP tools, or no terminal access)
3. Use **team policies** to enforce secrets/PII protection and command sandboxing

**For a fintech codebase, you'd likely:**

- Have a "safe mode" agent that can refactor but not touch infra or call deployment MCP
- Restrict secrets-related MCP servers to specific projects/teams

---

## Plugins / Directory (bundles)

Cursor Directory / AgentDepot style sites package rules + skills + agents + MCP config into plugin bundles.

**Examples:**

- "Pro-workflow" bundle — skills like smart-commit, wrap-up, review, plus quality-gate rules and planner/reviewer agents
- Tech-leads-oriented libraries — code review skills, security rules, etc.


> For teams, standardize on a small set of approved plugins and bake them into repo templates.

---

## Environment strategy: user vs project vs team

Given all that, here's a practical strategy you could use personally and in a team:

### User level *(global, personal)*

- Configure user rules: how you like explanations, which stacks you prefer by default
- *Optional:* maintain a dotfiles repo / script that copies your favorite skills into any new project's `.cursor/skills`

### Project level *(repo-scoped, versioned)*

| Path | What goes here |
|------|----------------|
| `.cursorrules` / `.cursor/rules/*.mdc` | Tech stack, folder structure, quality gates (lint/test/typecheck before commit), security constraints |
| `.cursor/skills/` | Project-specific workflows: UI review, domain-specific test generator, release notes |
| `.cursor/agents/` | Sub-agents for repetitive tasks (dep upgrades, a11y sweeps) |
| `.cursor/mcp.json` | Only the MCP servers you actually need |

### Team / org level

Use Cursor Teams admin to:

- Enforce org-wide rules (safety, model policies)
- Approve or deny certain MCP servers or plugins
- For internal SDK-style agents, keep a contract (owner, allowed paths, rollback plan) in the repo alongside agents/skills

### Summary

- **User level** → personal taste
- **Project level** → codebase truth
- **Team/org level** → risk management
