---
applyTo: "**/_sass/**,**/*.scss,**/_sass/**/_*.scss"
description: "SCSS guidance for Genesis subdomain: ontological design system, semantic mappings, zero raw CSS policy, and theme coordination."
---

# Genesis Ontological SCSS Design System

This subdomain uses the **Genesis Semantic SCSS Engine** from the ASI Saga theme repository. All visual styling comes from the theme's ontological engine.

## Core Principles

### 1. Zero Raw CSS Properties
**Subdomain SCSS files must contain NO raw CSS properties.**

❌ **Wrong (Legacy Approach):**
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
  color: white;
}
```

✅ **Correct (Ontological Approach):**
```scss
.my-card {
  @include genesis-entity('primary');  // All styling from theme engine
}
```

### 2. Semantic Class Names
Use meaningful, content-focused class names that describe WHAT something is, not HOW it looks.

❌ **Wrong:** `.blue-box`, `.rounded-button`, `.big-text`
✅ **Correct:** `.research-paper`, `.submit-action`, `.page-title`

### 3. Mirrored Structure
SCSS nesting should perfectly mirror HTML DOM hierarchy.

```html
<main class="research-hub">
  <header class="intro-section">
    <h1 class="hub-title">Neural Logic Research</h1>
  </header>
</main>
```

```scss
.research-hub {
  @include genesis-environment('focused');
  
  .intro-section {
    @include genesis-entity('primary');
    
    .hub-title {
      @include genesis-cognition('axiom');
    }
  }
}
```

## Ontological API Reference

### Six Ontological Categories

1. **`genesis-environment($logic)`** - Spatial organization and layout
   - `'distributed'` - Autonomous entities in non-linear grid
   - `'focused'` - Singular narrative thread for reading
   - `'associative'` - Network where connections matter
   - `'chronological'` - Time-linear stream of events
   - `'manifest'` - High-density dashboard

2. **`genesis-entity($nature)`** - Visual presence and weight
   - `'primary'` - Fundamental object of current view
   - `'secondary'` - Supportive, contextual data
   - `'imperative'` - System-critical, high-urgency
   - `'latent'` - Backgrounded, awaiting activation
   - `'aggregate'` - Container summarizing multiple entities
   - `'ancestral'` - Archived or historical data

3. **`genesis-cognition($intent)`** - Information type and typography
   - `'axiom'` - Foundational thesis or headline
   - `'discourse'` - Standard prose/body text
   - `'protocol'` - Technical/code content
   - `'gloss'` - Minor annotations
   - `'motive'` - Persuasive guidance
   - `'quantum'` - Small chips/tags

4. **`genesis-synapse($vector)`** - Interaction patterns
   - `'navigate'` - Link to different location
   - `'execute'` - Primary action/button
   - `'inquiry'` - Request more data/search
   - `'destructive'` - Permanent removal
   - `'social'` - Social sharing

5. **`genesis-state($condition)`** - Temporal state
   - `'stable'` - Normal equilibrium
   - `'evolving'` - Being updated/streamed
   - `'deprecated'` - No longer current
   - `'locked'` - Requires clearance
   - `'simulated'` - Projection, not live

6. **`genesis-atmosphere($vibe)`** - Sensory texture
   - `'neutral'` - Standard transparency
   - `'ethereal'` - Light-based focus
   - `'void'` - Deep-space, high-contrast
   - `'vibrant'` - High-energy, colorful

## File Structure

- `_sass/_main.scss` - Entry point, imports ontology system
- `_sass/_genesis-ontology.scss` - Comprehensive semantic mappings for all Genesis classes
- `_sass/_genesis-sacred.scss` - Genesis-specific customizations and special components
- `_sass/pages/` - Legacy files (preserved for reference, not imported)

## Evolution Mechanism

When you discover a semantic pattern not covered by the current ontology:

1. **Review existing variants** - Check the theme's INTEGRATION-GUIDE.md for all 31 variants
2. **Try combinations** - Mix ontological mixins creatively before requesting new variants
3. **Propose evolution** - If genuine gap exists, create an Ontological Proposition PR to theme repository
4. **Document rationale** - Explain WHAT semantic role is missing and WHY it's universally applicable

See `.github/agents/subdomain-evolution-agent.prompt.md` for detailed proposition workflow.

## Validation Checklist

Before committing SCSS changes:

- [ ] **Zero Raw CSS**: No `px`, `rem`, `color`, `display`, `margin`, `padding`, etc.
- [ ] **Semantic Purity**: Class names describe WHAT, not HOW
- [ ] **Mirrored Structure**: SCSS nesting matches HTML hierarchy exactly
- [ ] **Ontological Mixins**: Only use `@include genesis-*` mixins
- [ ] **Theme Dependency**: Relies entirely on theme's `_engines.scss`

## Common Patterns

### Blog Post / Article Page
```scss
.blog-post {
  @include genesis-environment('focused');
  @include genesis-atmosphere('ethereal');
  
  .post-header {
    @include genesis-entity('primary');
    
    .post-title { @include genesis-cognition('axiom'); }
    .post-meta { @include genesis-cognition('gloss'); }
  }
  
  .post-content {
    @include genesis-cognition('discourse');
  }
  
  .read-more {
    @include genesis-synapse('navigate');
  }
}
```

### Dashboard / Analytics
```scss
.dashboard {
  @include genesis-environment('manifest');
  @include genesis-atmosphere('vibrant');
  
  .metric-card {
    @include genesis-entity('primary');
    @include genesis-state('evolving');
  }
}
```

### Product Grid
```scss
.product-grid {
  @include genesis-environment('distributed');
  
  .product-card {
    @include genesis-entity('primary');
    
    .product-name { @include genesis-cognition('motive'); }
    .buy-button { @include genesis-synapse('execute'); }
  }
}
```

## Forbidden Patterns

❌ **Never do these in subdomain SCSS:**
- Raw CSS properties (`color: #fff;`)
- Media queries (handled by theme)
- CSS custom properties/variables (provided by theme)
- `@extend` directives (use mixins instead)
- Deep nesting (>4 levels)
- Global element selectors in components

## Theme Coordination

- **Theme repository**: https://github.com/ASISaga/theme.asisaga.com
- **Breaking changes**: Require coordinated PRs across theme and subdomains
- **New tokens/mixins**: Proposed through Ontological Proposition PR template
- **Documentation**: See theme's `_sass/ontology/INTEGRATION-GUIDE.md`

## Agent Responsibilities

For SCSS refactoring and migration workflows, see:
- `.github/agents/scss-refactor-agent.prompt.md` - Migration specialist
- `.github/agents/subdomain-evolution-agent.prompt.md` - Proposition creator

## Resources

- **Theme Ontology Guide**: https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md
- **Agent Ecosystem**: https://github.com/ASISaga/theme.asisaga.com/blob/main/.github/AGENTS.MD
- **Evolution Philosophy**: https://github.com/ASISaga/theme.asisaga.com/blob/main/evolution.md
