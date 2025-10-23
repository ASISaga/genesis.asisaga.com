# Copilot Prompts for MCP Client Calls

## Run Web Workflow
```
copilot> Call MCP tool "run_web_workflow" with:
{
  "script_path": "src/QualityMCP/workflow/run.js",
  "repo_path": "c:/Development/ASISaga/Website/genesis.asisaga.com",
  "args": ["--subdomain", "genesis"]
}
```

## Run Playwright Integration Tests
```
copilot> Call MCP tool "run_playwright_test" with:
{
  "test_path": "src/QualityMCP/tests_playwright/integration",
  "repo_path": "c:/Development/ASISaga/Website/genesis.asisaga.com",
  "subdomain": "genesis"
}
```
