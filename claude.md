# Claude Code Project Guidelines

## Critical Guardrails

- **DO NOT** attempt to read `.env` or any file containing credentials.
- If environment variables are needed, check `.env.example` for the keys.
- Always use `process.env.VARIABLE_NAME` (or the language equivalent) instead of hardcoding values.

## Build & Test Commands

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Code Style

- Use TypeScript for all new files.
- Prefer functional components over classes.
- Follow the existing folder structure for API routes.
