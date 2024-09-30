# Giphy Search App

A single-page application built using React that allows users to search for GIFs using the Giphy API. The app features live search results, pagination, and a responsive layout.

## Features

- Search GIFs from Giphy using the Giphy Search API.
- Live search results as you type.
- Pagination with arrow-based controls.
- Collage/masonry-style responsive layout for GIFs.
- Hover effects on GIFs for enhanced user experience.
- Environment variables for securing the API key.

## Demo

Watch a demonstration of the app here:

[Click here to view the demo video](./video/demo.mp4)

## Getting Started

These instructions will help you set up the project locally on your machine.

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shailjasarawagi/giphy-search-app.git
   cd giphy-search-app
   ```

2. **Install dependencies**:

   In the project directory, run:

   ```
   npm install
   ```

3. **Set up the environment variables**:

- Create a .env file in the root directory of the project.

- Add your Giphy API key to the .env file in the following format:

  ```
  REACT_APP_GIPHY_API_KEY=your_giphy_api_key
  ```

4. Run the development server:

   After setting up the environment variables, run:

   ```
   npm start
   ```

   This will start the app in development mode. Open http://localhost:3000 to view it in the browser.

## Usage

- Search for GIFs by typing in the search box. Results will be displayed as you type.
- Use the left and right arrows to navigate through pages.
- The current search term and page will be reflected in the URL for easy sharing.

## Available Scripts

In the project directory, you can run the following scripts:

    - npm start: Runs the app in development mode.
    - npm run build: Builds the app for production in the build folder.
    - npm run lint: Runs ESLint to analyze your code for issues.
