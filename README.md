# LeetArxiv Contribution Graph

A vanilla JavaScript implementation of a contribution visualization system for [LeetArxiv](https://www.leetarxiv.com/), a platform for implementing research papers similar to how LeetCode works for coding problems. This component visualizes users' contribution activities over time.

![LeetArxiv Contribution Graph](https://s7.gifyu.com/images/SXeNa.gif)

## 📖 About

This contribution graph component helps LeetArxiv users track their progress in implementing research papers. Similar to GitHub's contribution visualization, it provides an intuitive way to view implementation activity patterns over time.

## 🏗️ Project Structure

```
leetarxiv-contribution-graph/
├── frontend/
│   └── index.html          # Complete frontend implementation with embedded CSS/JS
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.config.js   # MongoDB connection configuration
│   │   ├── controllers/
│   │   │   └── commit.controller.js   # Request handlers
│   │   ├── models/
│   │   │   └── user.model.js   # MongoDB schemas
│   │   ├── routes/
│   │   │   └── commit.routes.js   # API route definitions
│   │   ├── scripts/
│   │   │   └── seed.js   # Database seeding script
│   │   └── server.js     # Express server setup
│   └── package.json
```

## ⚡ Features

- **Time-based Views**: Toggle between yearly, monthly, and weekly contribution views
- **Interactive Details**: Hover tooltips showing implementation details and timestamps
- **Vanilla Implementation**: Built with pure JavaScript - no frameworks or external dependencies
- **Embeddable**: Designed to be embedded within the LeetArxiv platform
- **Responsive**: Adapts seamlessly to different screen sizes

## 🛠️ Technical Stack

### Frontend
- **Single File**: Complete implementation in one `index.html` file
- **Vanilla JavaScript**: No frameworks or build tools required
- **CSS Grid**: Responsive tile-based layout
- **CSS Custom Properties**: Easy theming and customization

### Backend
- **Node.js & Express**: Lightweight and efficient server
- **MongoDB**: Document database for storing user activity
- **RESTful API**: Clean interface for data operations

## 🚀 Setup & Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Kimkykie/leetarxiv-contribution-graph.git
cd leetarxiv-contribution-graph
```

2. **Backend Setup**
```bash
cd backend
npm install
```

3. **Configure MongoDB**
```javascript
// backend/src/config/db.config.js
// Default connection: mongodb://localhost:27017/github_contributions
```

4. **Seed Test Data**
```bash
npm run seed
```

5. **Start the Server**
```bash
npm start
```

6. **Frontend Setup**
- Serve the `frontend/index.html` file using any web server
- For development, you can use any simple HTTP server

## 🔌 API Endpoints

### Fetch User's Implementation History
```http
GET /RetrieveCommits?username=<username>
```

### Record New Implementation
```http
POST /UpdateCommits
{
    "username": "string",
    "filename": "string"
}
```

## 💅 Customization

The component uses CSS custom properties for easy theming:
```css
:root {
    /* Core Theme Colors */
    --bg-color: #0d1117;             /* Main background color */
    --text-color: #c9d1d9;           /* Primary text color */
    --border-color: #30363d;         /* Border colors for containers */
    --tile-bg: #161b22;              /* Default tile background */

    /* Contribution Level Colors */
    --level-0: #161b22;              /* No contributions */
    --level-1: #0e4429;              /* Light contribution level */
    --level-2: #006d32;              /* Medium contribution level */
    --level-3: #26a641;              /* High contribution level */
    --level-4: #39d353;              /* Very high contribution level */

    /* UI Element Colors */
    --button-bg: #21262d;            /* Button background color */
    --secondary-text: #8b949e;       /* Secondary text color */

    /* Layout Properties */
    --tile-size: 15px;               /* Size of contribution tiles */
    --tile-gap: 4px;                 /* Gap between tiles */
}
```

## 📱 Responsive Behavior

The component automatically adjusts based on viewport:
- **Desktop**: Full-width visualization
- **Tablet**: Optimized 3-column layout
- **Mobile**: Compact 2-column layout

## 🔧 Development Notes

- The frontend is intentionally kept as a single file for easy embedding
- Backend uses a simple but extensible schema for tracking paper implementations
- Seed script provides realistic test data with varying activity patterns

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Related Links

- [LeetArxiv Platform](https://www.leetarxiv.com/)