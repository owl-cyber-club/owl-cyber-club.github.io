# Running Owl Cyber Club Locally

This guide will help you set up and run the website on your local machine for development and review.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher.
  - [Download Node.js](https://nodejs.org/) (LTS version recommended)
  - Verify installation by running `node -v` in your terminal.

## 🚀 Getting Started

Follow these steps to get the project running:

### 1. Install Dependencies

Open your terminal in the project root directory and run:

```bash
npm install
```

This will install all necessary packages including React, Vite, and Tailwind CSS.

### 2. Start the Development Server

Run the following command to start the local dev server:

```bash
npm run dev
```

### 3. Review the Website

Once the server starts, you will see a local URL in your terminal (usually `http://localhost:****`).

- **Ctrl + Click** the link or copy and paste it into your browser.
- The page will automatically reload whenever you make changes to the code.

### 4. Stop the Server

To stop the development server and free up your terminal:

- Press **Ctrl + C** in the terminal where the server is running.
- If it asks `Terminate batch job (Y/N)?`, type `Y` and press **Enter**.

## 🛠️ Other Commands

- **Build for Production**: `npm run build` (Generates optimized files in the `dist` folder)
- **Preview Production Build**: `npm run preview` (Starts a local server to view the built files)
- **Type Checking**: `npx tsc` (Verify TypeScript integrity)

## ❓ Troubleshooting

### 'npm' or 'node' is not recognized

If you just installed Node.js and get this error:

1. Close all open terminal windows.
2. Restart VS Code or your terminal.
3. Try running `node -v` again.

### Dependencies fail to install

If you encounter errors during `npm install`:

- Try clearing the cache: `npm cache clean --force`
- Delete `package-lock.json` and try `npm install` again.
