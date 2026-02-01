# OWL Cyber Club Website

Tech stack:
- Vue 3 + Vite
- SCSS
- TypeScript

## Project Setup

```bash
npm install
```

## Running the app

```bash
npm run dev
```

## Building the app

```bash
npm run build
```

## Deployment on GitHub Pages

This site is automatically deployed to GitHub Pages! 🚀

### How it works

Every time you push to the `main` branch, GitHub Actions will:
1. Install dependencies
2. Build the project
3. Deploy the `dist/` folder to GitHub Pages

Site will be live at: **https://owl-cyber-club.github.io/**

### Manual deployment

You can also trigger a deployment manually:
1. Go to the **Actions** tab in GitHub
2. Select the "Deploy static content to Pages" workflow
3. Click **Run workflow** → **Run workflow**

### Deployment limits

GitHub Pages provides **500 deployments per month** for free accounts. To conserve deployments:
- Don't commit small typo fixes individually (batch them together)
- Only commit when you have complete features or meaningful changes
- See `CONTRIBUTING.md` for more details
