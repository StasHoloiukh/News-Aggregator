# News Aggregator — CMS (Sanity Studio)

This repository contains the Sanity Studio used to manage news sources, topics, and editorial content for the News Aggregator project.

This Studio provides a TypeScript-based Sanity configuration and a small set of content schemas for managing the project's CMS data.

## Features

- Manage `newsSource` and `topic` schema types
- Create and edit content and metadata used by the News Aggregator frontend
- Deploy a GraphQL API for third-party consumption
- Local development with hot-reload via `sanity dev`

## Quickstart

Prerequisites
- Node.js (16+ recommended)
- npm (or yarn)

Install
```bash
cd news-aggregator-cms
npm install
```

Run (development)
```bash
npm run dev
# runs: sanity dev
```

Build & deploy
```bash
npm run build
npm run deploy
# build: sanity build
# deploy: sanity deploy
```

## Project structure

- `sanity.config.ts` — Studio configuration
- `sanity.cli.ts` — CLI helpers and scripts
- `schemaTypes/` — content type definitions
	- `index.ts` — schema exports
	- `newsSource.ts` — news source schema
	- `topic.ts` — topic schema
- `static/` — static assets used by the Studio

## Editing / Extending the schema

1. Add a new file to `schemaTypes/` and follow the existing pattern.
2. Export the new type from `schemaTypes/index.ts`.
3. Restart the Studio (`npm run dev`) to load your changes.

## Contributing

- Follow the TypeScript and ESLint rules in this repo.
- Run `npm run dev` locally to test schema changes.

