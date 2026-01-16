---
applyTo: "**/*"
description: "Repository architecture, companion-file roles, integration points, ontological design system, and agent responsibilities for the subdomain."
---

# Companion File Structure & Repository Architecture

This file documents the companion-file codex and how agents should interpret the repository structure.

- **README.md** — Human-facing entry point. Quick start, project overview, and contribution guide.
- **.github/instructions/scss.instructions.md** — Ontological SCSS design system, semantic mappings, and zero raw CSS policy.
- **.github/instructions/html.instructions.md** — Template and Jekyll/Liquid guidance, include rules, and accessibility checks.
- **.github/instructions/js.instructions.md** — JS entry, asset ordering, vendor rules, and HTML-in-JS scans.
- **.github/instructions/testing.instructions.md** — Testing philosophy, conventions, and CI/CD hooks.
- **.github/agents/** — Role-focused agent files (subdomain-evolution-agent, scss-refactor-agent, etc.).
- **.github/prompts/** — MCP test invocation prompts for Buddhi integration.

Each file is atomic: it covers one domain of guidance. Together, they form a codex for both humans and Copilot agents.

## Repository layout (agent interpretation)

- Root level — Genesis subdomain content: HTML pages, `_sass`, `assets`, `_data`, and configuration.
- `_sass/` — Ontological SCSS mappings (NO raw CSS properties allowed).
- `_sass/_main.scss` — Entry point importing ontology system from theme.
- `_sass/_genesis-ontology.scss` — Comprehensive semantic mappings for all Genesis classes.
- `_sass/_genesis-sacred.scss` — Genesis-specific ontological customizations.
- `_sass/pages/` — Legacy files (preserved for reference, NOT imported).
- `assets/` — JavaScript, images, and compiled assets.

## Ontological Design System (Genesis Semantic SCSS Engine)

### Core Architecture

Genesis subdomain uses the **Genesis Semantic SCSS Engine** from the ASI Saga theme repository. This is a three-tier architecture:

**Tier 1: Content (HTML)** - Defines WHAT the data is  
**Tier 2: Interface (Ontological API)** - Defines the ROLE of content  
**Tier 3: Engine (Theme)** - Defines the VISUAL appearance

### Zero Raw CSS Policy

**Subdomain SCSS files must contain NO raw CSS properties.**

❌ **Forbidden**: `padding: 2rem;`, `color: #fff;`, `display: flex;`, etc.  
✅ **Required**: Only `@include genesis-*` mixins

### Six Ontological Categories

1. **`genesis-environment($logic)`** - Spatial organization (distributed, focused, associative, chronological, manifest)
2. **`genesis-entity($nature)`** - Visual presence (primary, secondary, imperative, latent, aggregate, ancestral)
3. **`genesis-cognition($intent)`** - Typography intent (axiom, discourse, protocol, gloss, motive, quantum)
4. **`genesis-synapse($vector)`** - Interaction (navigate, execute, inquiry, destructive, social)
5. **`genesis-state($condition)`** - Temporal state (stable, evolving, deprecated, locked, simulated)
6. **`genesis-atmosphere($vibe)`** - Sensory texture (neutral, ethereal, void, vibrant)

## Evolution Mechanism - Living Genome

The Genesis Ontological System is a **Living Genome** that evolves through intelligent collaboration between AI agents and developers.

### Subdomain Perspective

**Found a semantic gap?** The ontology evolves!

1. **Review existing variants** - Check all 31 variants in theme's INTEGRATION-GUIDE.md
2. **Try combinations** - Mix ontological mixins creatively
3. **Propose evolution** - If genuine gap exists, create Ontological Proposition PR to theme
4. **Theme Agent reviews** - Proposal evaluated for semantic purity and universality
5. **Approval & implementation** - New variants documented in theme's GENOME.md

**Key Principle**: NEVER add raw CSS as workaround. If ontology doesn't cover a pattern, propose an evolution.

### Agent Ecosystem

**Subdomain Evolution Agent** (`.github/agents/subdomain-evolution-agent.prompt.md`)
- Identifies semantic gaps in current ontology
- Creates well-formed Ontological Propositions
- Submits PRs to theme repository

**SCSS Refactor Agent** (`.github/agents/scss-refactor-agent.prompt.md`)
- Converts legacy CSS to ontological mixins
- Ensures zero raw CSS properties
- Validates semantic purity

**Theme Genome Agent** (theme repository)
- Reviews ontological propositions
- Maintains semantic purity of system
- Approves/implements new variants
- Updates GENOME.md with evolution history

### Proposition Workflow

When subdomain needs a semantic pattern not covered by current ontology:

1. **Validate Need**: Ensure not already covered by existing variants or combinations
2. **Create Proposition**: Use Ontological Proposition template
3. **Submit PR**: To theme repository with complete documentation
4. **Theme Review**: Theme Genome Agent evaluates within 48-72 hours
5. **Resolution**:
   - Approved → Theme implements → Subdomain integrates
   - Rejected → Feedback provided → Use existing variants
   - Refine → Update proposition → Resubmit

## Integration points (high level)

- **Theme coordination**: Genesis subdomain imports `ontology/index` from theme via `remote_theme`
- **Ontological purity**: All visual styling comes from theme's `_sass/ontology/_engines.scss`
- **Semantic mappings**: Subdomain provides class-to-role mappings in `_genesis-ontology.scss`
- **Evolution coordination**: Semantic gaps trigger Ontological Proposition workflow to theme

## Theme Resources

- **Theme Repository**: https://github.com/ASISaga/theme.asisaga.com
- **Ontology Integration Guide**: https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md
- **Agent Ecosystem**: https://github.com/ASISaga/theme.asisaga.com/blob/main/.github/AGENTS.MD
- **Evolution Philosophy**: https://github.com/ASISaga/theme.asisaga.com/blob/main/evolution.md
- **Genome History**: https://github.com/ASISaga/theme.asisaga.com/blob/main/GENOME.md

## Agent responsibilities (architecture-specific)

Agents should:

- **Validate ontological purity**: Ensure subdomain SCSS contains zero raw CSS properties
- **Map semantically**: Apply appropriate ontological mixins based on information intent
- **Propose evolution**: When genuine semantic gaps exist, create well-formed propositions
- **Coordinate with theme**: For breaking changes or new ontological variants
- **Document decisions**: Explain ontological choices in SCSS comments
- **Maintain separation**: Content (HTML) vs. Role (Mixins) vs. Visual (Theme Engine)

## Change coordination guidance

- **Ontological propositions**: Use template in subdomain-evolution-agent.prompt.md
- **Breaking changes**: Theme handles with semantic versioning and migration guides
- **New variants**: Require universal applicability across ASI Saga ecosystem
- **Visual preferences**: NOT valid for propositions (theme controls visual expression)
- **Semantic needs**: Valid for propositions (describe WHAT, not HOW)

## Validation Checklist

Before committing SCSS changes:

- [ ] Zero raw CSS properties (no `px`, `rem`, `color`, `display`, etc.)
- [ ] Only `@include genesis-*` mixins used
- [ ] Semantic class names (describe WHAT, not HOW)
- [ ] SCSS nesting mirrors HTML hierarchy
- [ ] Ontological roles documented in comments
- [ ] No media queries (responsive handled by theme)
- [ ] No CSS variables (theme provides tokens)