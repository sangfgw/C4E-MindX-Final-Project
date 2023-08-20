# C4E-MindX-Final-Project (Blog Website)
This is MindX C4E Course Final Project Repository

## How to use:
- Clone Project with command: **git clone https://github.com/sangfgw/C4E-MindX-Final-Project.git**
- Open project folder (C4E-MindX-Final-Project) with VSCode
- Open VSCode Terminal with command: **Ctrl + Shift + `** (On Windows)
- Typing command: **npm install** (To Install Tailwind CSS Dependency)
- From your root file **(C4E-MindX-Final-Project)** add **tailwind.config.js** file and copy paste this code into that file and save:
```
/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {},
    },
    plugins: [],
}
```
- Next typing command: **npx tailwindcss -i ./src/css/input.css -o ./dist/output.css --watch** (To let Tailwind CSS build output CSS file and use)
- Open HTML file from (/src/pages folder) index.html (with live server) to see the result

**Note: You must install NodeJS to use npm**
