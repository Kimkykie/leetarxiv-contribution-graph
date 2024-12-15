# GitHub Contributions Backend

A lightweight Node.js/MongoDB backend service that manages user contribution data similar to GitHub's contribution graph.

## Features

- Track user contributions over time
- Store file-level commit information

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd github-contributions-backend
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB locally:
```bash
mongod
```

## Configuration

The application uses the following default configuration:
- Port: 3000
- MongoDB URL: mongodb://localhost:27017/github_contributions

## Running the Application

1. Start the server:
```bash
npm start
```

2. Seed the database with sample data:
```bash
npm run seed
```

The seed script will create three users with different contribution patterns:
- `murage`: High activity in 2024, normal in 2023, no data in 2022, low in 2021
- `john_doe`: Normal activity in 2024, low in 2023
- `jane_smith`: Low activity in 2024, high in 2023

## API Endpoints

### Get User Commits
```
GET /RetrieveCommits?username=<username>
```
Returns all commits for the specified user.

### Add New Commit
```
POST /UpdateCommits
```
Body:
```json
{
    "username": "string",
    "filename": "string"
}
```
Adds a new commit for the specified user.

## Project Structure
```
src/
├── models/
│   └── user.model.js     # MongoDB schema definition
├── controllers/
│   └── commit.controller.js  # Request handlers
├── routes/
│   └── commit.routes.js  # API routes
├── config/
│   └── db.config.js      # Database configuration
├── scripts/
│   └── seed.js          # Database seeding script
└── server.js            # Application entry point
```

## Data Schema

User Schema:
```javascript
{
    Username: String,
    CommitHistory: [{
        Date: Date,
        Filename: String
    }]
}
```

## Testing the API

Using curl:
```bash
# Get user commits
curl "http://localhost:3000/RetrieveCommits?username=murage"

# Add new commit
curl -X POST http://localhost:3000/UpdateCommits \
  -H "Content-Type: application/json" \
  -d '{"username":"murage","filename":"index.js"}'
```
