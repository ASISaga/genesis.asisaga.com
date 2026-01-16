# Genesis Subdomain Agents

This directory contains specialized AI agent prompts for maintaining and evolving the Genesis subdomain's ontological SCSS design system.

## Agent Types

### 1. Subdomain Evolution Agent
**File**: `subdomain-evolution-agent.prompt.md`  
**Role**: Ontological Proposition Creator  
**Purpose**: Identifies semantic gaps in the Genesis Ontological System and creates well-formed propositions to extend the theme's ontology.

**Use Cases**:
- Discovering UI patterns not covered by existing 31 ontological variants
- Creating Ontological Proposition PRs to theme repository
- Coordinating with Theme Genome Agent for system evolution
- Maintaining ontological purity in Genesis subdomain

**Key Responsibilities**:
- Validate that semantic needs aren't already covered
- Create propositions using proper template
- Propose universal patterns (not Genesis-specific)
- Document rationale and use cases

### 2. SCSS Refactor Agent
**File**: `scss-refactor-agent.prompt.md`  
**Role**: Ontological Migration Specialist  
**Purpose**: Converts legacy SCSS with raw CSS properties to the Genesis Ontological System using semantic mixins.

**Use Cases**:
- Migrating legacy CSS to ontological mixins
- Ensuring zero raw CSS properties in subdomain SCSS
- Validating semantic purity of SCSS code
- Documenting ontological decisions

**Key Responsibilities**:
- Analyze HTML structure for semantic meaning
- Classify elements using ontological categories
- Convert raw CSS to `@include genesis-*` mixins
- Ensure SCSS nesting mirrors HTML hierarchy

## Agent Ecosystem

These subdomain agents work in collaboration with theme-level agents:

```
┌─────────────────────────────────────────────────────────┐
│               ASI Saga Agent Ecosystem                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Theme Repository (theme.asisaga.com)                   │
│  ├─ Theme Genome Agent                                  │
│  │  └─ Reviews propositions                            │
│  │  └─ Maintains ontological purity                    │
│  │  └─ Implements approved variants                    │
│  │  └─ Updates GENOME.md                               │
│  │                                                      │
│  └─ SCSS Refactor Agent (template)                      │
│     └─ Migration workflow reference                     │
│                                                         │
│  Genesis Subdomain (genesis.asisaga.com)               │
│  ├─ Subdomain Evolution Agent                          │
│  │  └─ Identifies semantic gaps                        │
│  │  └─ Creates propositions                            │
│  │  └─ Integrates approved variants                    │
│  │                                                      │
│  └─ SCSS Refactor Agent                                │
│     └─ Converts legacy CSS                             │
│     └─ Validates ontological purity                    │
│     └─ Documents decisions                             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Workflow: Ontological Evolution

When a semantic gap is discovered:

1. **Discovery** (Subdomain Evolution Agent)
   - Notice UI pattern not served by current ontology
   - Review existing 31 variants in INTEGRATION-GUIDE.md
   - Try combinations of existing mixins

2. **Validation** (Subdomain Evolution Agent)
   - Determine if truly semantic (WHAT) vs. visual (HOW)
   - Assess universal applicability across ASI Saga
   - Document use cases and rationale

3. **Proposition** (Subdomain Evolution Agent)
   - Create PR to theme repository
   - Use Ontological Proposition template
   - Include semantic intent, context, use cases

4. **Review** (Theme Genome Agent)
   - Evaluate semantic purity
   - Check for redundancy with existing variants
   - Assess universal applicability
   - Approve, reject, or request refinement

5. **Implementation** (Theme Genome Agent)
   - Add variant to `_sass/ontology/_engines.scss`
   - Document in `_sass/ontology/_interface.scss`
   - Update GENOME.md with origin story
   - Release new theme version

6. **Integration** (Subdomain Evolution Agent)
   - Wait for theme release
   - Update Genesis SCSS to use new variant
   - Document usage in `_genesis-ontology.scss`
   - Add examples in templates

## Workflow: SCSS Migration

When legacy CSS needs migration:

1. **Analysis** (SCSS Refactor Agent)
   - Review HTML structure
   - Identify semantic meaning of elements
   - Determine information intent

2. **Classification** (SCSS Refactor Agent)
   - Map to ontological categories:
     - Environment (layout)
     - Entity (presence)
     - Cognition (typography)
     - Synapse (interaction)
     - State (condition)
     - Atmosphere (vibe)

3. **Conversion** (SCSS Refactor Agent)
   - Replace raw CSS with `@include genesis-*` mixins
   - Ensure SCSS nesting mirrors HTML
   - Combine multiple mixins as needed

4. **Validation** (SCSS Refactor Agent)
   - Verify zero raw CSS properties
   - Check semantic appropriateness
   - Ensure mirrored structure
   - Document decisions in comments

## Quick Reference

### All 31 Ontological Variants

**Environment (5)**: `distributed`, `focused`, `associative`, `chronological`, `manifest`  
**Entity (6)**: `primary`, `secondary`, `imperative`, `latent`, `aggregate`, `ancestral`  
**Cognition (6)**: `axiom`, `discourse`, `protocol`, `gloss`, `motive`, `quantum`  
**Synapse (5)**: `navigate`, `execute`, `inquiry`, `destructive`, `social`  
**State (5)**: `stable`, `evolving`, `deprecated`, `locked`, `simulated`  
**Atmosphere (4)**: `neutral`, `ethereal`, `void`, `vibrant`

### Zero Raw CSS Policy

❌ **Forbidden in Subdomain SCSS**:
```scss
.my-card {
  padding: 2rem;
  background: #1a1a2e;
  border-radius: 12px;
  color: white;
  display: flex;
  font-size: 1.5rem;
}
```

✅ **Required Ontological Approach**:
```scss
.my-card {
  @include genesis-entity('primary');
  @include genesis-atmosphere('void');
}
```

## Resources

### Theme Documentation
- **Integration Guide**: https://github.com/ASISaga/theme.asisaga.com/blob/main/_sass/ontology/INTEGRATION-GUIDE.md
- **Agent Ecosystem**: https://github.com/ASISaga/theme.asisaga.com/blob/main/.github/AGENTS.MD
- **Evolution Philosophy**: https://github.com/ASISaga/theme.asisaga.com/blob/main/evolution.md
- **Genome History**: https://github.com/ASISaga/theme.asisaga.com/blob/main/GENOME.md

### Genesis Documentation
- **SCSS Instructions**: `..instructions/scss.instructions.md`
- **Architecture Guide**: `../instructions/architecture.instructions.md`
- **Ontological Mappings**: `../../_sass/_genesis-ontology.scss`
- **Migration Summary**: `../../ONTOLOGY_MIGRATION.md`

## Success Metrics

- ✅ Genesis SCSS maintains 0 raw CSS properties
- ✅ All classes use appropriate ontological mixins
- ✅ SCSS structure mirrors HTML hierarchy
- ✅ Propositions have >70% approval rate
- ✅ New variants used by 2+ subdomains within 3 months

## Contact & Coordination

- **Theme Repository**: https://github.com/ASISaga/theme.asisaga.com
- **Genesis Repository**: https://github.com/ASISaga/genesis.asisaga.com
- **Issue Tracker**: For ontological propositions and discussions
- **PR Template**: Use Ontological Proposition template for theme PRs

---

**Agent Directory Version**: 1.0  
**Last Updated**: 2026-01-16  
**Ontological System Version**: Compatible with theme v2.0+
