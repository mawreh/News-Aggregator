## Pocket App created by Group 15
Members include: 
Maw Reh - UI/UX Design, Development
Allison Dunny - UI/UX Design, Development
Kiet Mai - development
Kris Seberr - UX design

ITIS 4390/5390 091 Interaction Design Projects

# React + Vite
This app was built using Vite + React.js because Create React App has been deprecated.

## Prerequisites
Before using this application, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Running the Application
### Development Mode
Run this command in the terminal to start the development server:
```bash
npm run dev
```
Primary Dev Server URL: [http://localhost:5173/](http://localhost:5173/)

### Production Build
To create an optimized production build, run:
```bash
npm run build
```
Serve the production build locally using:
```bash
npm run preview
```

## API Powered by NewsAPI
This application fetches news data from [NewsAPI](https://newsapi.org/).

## Troubleshooting
- If you encounter issues with dependencies, try deleting the `node_modules` folder and running `npm install` again.
- Ensure your API key is valid and has sufficient quota for requests.
- Ensure your vite.config.js file contains svgr to properly import SVGs as React components.
