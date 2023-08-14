# Vite Project with React - Production Build

This repository contains a simple project template using Vite and React, along with instructions on how to build the project for production.

## Features

- **Vite**: A build tool that aims to be faster than Webpack and Parcel.
- **React**: A JavaScript library for building user interfaces.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/) (v16.14.0 or later)

### Production Build

Follow these steps to build and deploy your project for production:

1. Install dependencies:

   ```sh
   npm install
   ```

2. Build the project

```sh
npm run build
```
After running this command, a dist directory will be created in the root folder. This directory contains the optimized and minified files for production.

3. Serve the dist folder:
You can deploy the contents of the dist folder to your preferred hosting platform. The specific steps for deploying depend on your chosen platform.
If you want to quickly test the production build locally, you can use a static file server like 
```sh
npx serve dist
```
