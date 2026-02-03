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
