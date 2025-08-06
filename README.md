# LeetArxiv Contribution Graph

GitHub-style contribution visualization for [LeetArxiv](https://www.leetarxiv.com/). Tracks research paper implementation activity over time.

![LeetArxiv Contribution Graph](https://s7.gifyu.com/images/SXeNa.gif)

## Problem

LeetArxiv users need a way to visualize their progress implementing research papers. Without visual feedback, it's hard to maintain momentum or identify activity patterns.

## Solution

Vanilla JavaScript contribution graph that integrates with LeetArxiv. Shows implementation activity in a familiar GitHub-style heatmap with multiple time views and interactive details.

## Features

- **Time views** - Yearly, monthly, weekly toggles
- **Interactive tooltips** - Implementation details on hover
- **Vanilla JS** - No frameworks, easy to embed
- **Responsive** - Adapts to mobile/tablet layouts

## Setup

**Backend:**
```bash
cd backend
npm install
npm run seed    # Generate test data
npm start       # Server on port 3000
```

**Frontend:**
Serve `frontend/index.html` with any web server.

## API

```http
GET /RetrieveCommits?username=<username>
POST /UpdateCommits
{
    "username": "string", 
    "filename": "string"
}
```

## Architecture

**Frontend** - Single HTML file with embedded CSS/JS
**Backend** - Express + MongoDB for user activity tracking
**Data model** - Simple schema storing username, filename, timestamp

```
backend/
├── src/
│   ├── controllers/commit.controller.js
│   ├── models/user.model.js  
│   ├── routes/commit.routes.js
│   └── server.js
└── scripts/seed.js

frontend/
└── index.html
```

## Customization

CSS custom properties for theming:
```css
:root {
    --bg-color: #0d1117;
    --level-0: #161b22;    /* No activity */
    --level-1: #0e4429;    /* Low activity */
    --level-4: #39d353;    /* High activity */
    --tile-size: 15px;
}
```

## Integration Notes

- Designed for embedding in LeetArxiv platform
- Single file frontend for simple deployment  
- RESTful API matches existing LeetArxiv patterns
- Responsive breakpoints at 768px and 480px

## License

MIT
