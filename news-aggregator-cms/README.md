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

## Managing Content

### Adding a News Source

1. Open the Studio (`npm run dev`)
2. Navigate to **News Source** in the left sidebar
3. Click **Create** to add a new source
4. Fill in:
   - **Source Name**: Display name (e.g., "BBC News")
   - **Source ID**: NewsAPI source ID (e.g., "bbc-news", "cnn", "techcrunch")
   - **Is Active**: Toggle to enable/disable this source
5. Click **Publish** to save

Only **active sources** will be visible to the frontend application.

### Defining Topics

1. Open the Studio (`npm run dev`)
2. Navigate to **Topic** in the left sidebar
3. Click **Create** to add a new topic
4. Fill in:
   - **Topic Name**: e.g., "Technology", "Politics", "Business"
   - **Keywords**: Add keywords that articles should be classified under (required, minimum 1)
     - Example: `["AI", "machine learning", "neural networks"]`
   - **Color**: Optional hex color for UI display (e.g., "#3B82F6")
5. Click **Publish** to save

The frontend will match article titles against these keywords to automatically classify articles.

## Frontend Integration

The frontend application fetches CMS configuration dynamically. See `lib/queries.ts` for GROQ queries.

### GROQ Queries Available

**Fetch active news sources:**
```groq
*[_type == "newsSource" && isActive == true] {
  _id,
  sourceId,
  name
}
```

**Fetch all topics with keywords:**
```groq
*[_type == "topic"] {
  _id,
  name,
  keywords,
  color
}
```

See `lib/queries.ts` for TypeScript helpers and client setup.

## API & Deployment

### Deploy GraphQL Schema (optional)
To enable GraphQL queries:
```bash
npm run deploy-graphql
```

This publishes a GraphQL API endpoint for the dataset.

### Environment Variables

The frontend uses these credentials (from `sanity.config.ts`):
- **projectId**: `frbzm2pc`
- **dataset**: `production`
- **apiVersion**: `2024-01-01`

These are baked into `lib/queries.ts`. For security, the Sanity client uses read-only API tokens via `useCdn: true`.

## Editing / Extending the schema

1. Add a new file to `schemaTypes/` and follow the existing pattern.
2. Export the new type from `schemaTypes/index.ts`.
3. Restart the Studio (`npm run dev`) to load your changes.

## Contributing

- Follow the TypeScript and ESLint rules in this repo.
- Run `npm run dev` locally to test schema changes.
- Document new schema types with descriptions and validation rules.