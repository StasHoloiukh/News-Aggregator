# News Aggregator

A modern frontend application built with React and TypeScript that aggregates news articles from the [News API](https://newsapi.org/). It features a clean UI, advanced filtering, and dynamic configuration managed via a Headless CMS.

## 🚀 Features

- **News Feed**: Browse the latest headlines and articles.
- **Advanced Filtering**: Filter news by source and search by keywords (with debounced search).
- **Sorting**: Sort articles by publication date, relevancy, or popularity.
- **Pagination**: Navigate through pages of results.
- **Article Details**: View full article details including images, description, and content.
- **Dynamic Configuration**:
  - **Allowed Sources**: The list of valid news sources is fetched dynamically from a CMS.
  - **Topic Classification**: Articles are automatically tagged with topics based on keyword rules defined in the CMS.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite
- **State Management & Data Fetching**: TanStack Query (React Query)
- **Styling**: TailwindCSS
- **API**: News API
- **CMS**: Sanity (Configurable)

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/news-aggregator.git
   cd news-aggregator
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**

   Create a `.env` file in the root directory and add your API keys:

   ```env
   VITE_NEWS_API_KEY=your_news_api_key
   VITE_CMS_API_URL=your_cms_url
   ```

4. **Run the application**

   ```bash
   npm run dev
   ```


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

