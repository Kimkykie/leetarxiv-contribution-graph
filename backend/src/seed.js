// src/scripts/seed.js
const mongoose = require('mongoose');
const User = require('./models/user.model');

const fileTypes = [
    'index.js', 'styles.css', 'app.js', 'README.md', 'config.json',
    'api.js', 'utils.js', 'database.js', 'server.js', 'routes.js',
    'components/Header.js', 'components/Footer.js', 'models/User.js',
    'services/auth.js', 'middleware/auth.js', 'tests/api.test.js'
];

const getRandomFile = () => fileTypes[Math.floor(Math.random() * fileTypes.length)];

// Helper to get random time within work hours
const getRandomTime = (date) => {
    const workStart = 9; // 9 AM
    const workEnd = 18;  // 6 PM

    // Random hour between work hours
    const hour = Math.floor(Math.random() * (workEnd - workStart)) + workStart;
    // Random minute
    const minute = Math.floor(Math.random() * 60);

    const newDate = new Date(date);
    newDate.setHours(hour, minute);
    return newDate;
};

// Helper to generate commits for a specific date with varying intensity
const generateCommitsForDate = (date, intensity = 'normal') => {
    const commits = [];
    let maxCommits;

    switch (intensity) {
        case 'high':
            maxCommits = Math.floor(Math.random() * 8) + 5; // 5-12 commits
            break;
        case 'normal':
            maxCommits = Math.floor(Math.random() * 4) + 1; // 1-4 commits
            break;
        case 'low':
            maxCommits = Math.random() > 0.5 ? 1 : 0; // 0-1 commits
            break;
    }

    // Generate times for all commits and sort them
    const times = Array.from({ length: maxCommits }, () => getRandomTime(date))
        .sort((a, b) => a - b);

    // Create commits with sorted times
    times.forEach(time => {
        commits.push({
            Date: time,
            Filename: getRandomFile()
        });
    });

    return commits;
};

// Generate commits for a year with specified pattern
const generateYearCommits = (year, pattern = 'normal') => {
    const commits = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        // Don't generate future dates for 2024
        if (year === 2024 && date > new Date()) {
            break;
        }

        const dayCommits = generateCommitsForDate(new Date(date), pattern);
        commits.push(...dayCommits);
    }

    return commits;
};

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/github_contributions');
        console.log('Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});

        // Create users with different patterns
        const users = [
            {
                Username: "murage",
                CommitHistory: [
                    ...generateYearCommits(2025, 'high'),    // Very active current year
                    ...generateYearCommits(2024, 'normal'),  // Normal activity last year
                    // 2022 has no data (intentionally empty)
                    ...generateYearCommits(2022, 'low')      // Low activity in 2021
                ]
            },
            {
                Username: "john_doe",
                CommitHistory: [
                    ...generateYearCommits(2025, 'normal'),  // Normal activity current year
                    ...generateYearCommits(2024, 'low')      // Low activity last year
                ]
            },
            {
                Username: "jane_smith",
                CommitHistory: [
                    ...generateYearCommits(2025, 'low'),     // Low activity current year
                    ...generateYearCommits(2021, 'high')     // Very active last year
                ]
            }
        ];

        await User.insertMany(users);

        console.log('\nSeed data created successfully!');
        console.log('\nData Summary:');
        for (const user of users) {
            console.log(`\n${user.Username}:`);
            console.log(`Total commits: ${user.CommitHistory.length}`);

            // Group commits by year and count
            const yearCounts = user.CommitHistory.reduce((acc, commit) => {
                const year = commit.Date.getFullYear();
                acc[year] = (acc[year] || 0) + 1;
                return acc;
            }, {});

            // Display yearly breakdown
            Object.entries(yearCounts)
                .sort((a, b) => b[0] - a[0]) // Sort years descending
                .forEach(([year, count]) => {
                    console.log(`  ${year}: ${count} commits`);
                });

            // Show sample of today's commits if any exist
            const todayCommits = user.CommitHistory.filter(commit => {
                const today = new Date();
                const commitDate = new Date(commit.Date);
                return commitDate.toDateString() === today.toDateString();
            });

            if (todayCommits.length > 0) {
                console.log('\n  Sample of today\'s commits:');
                todayCommits.slice(0, 3).forEach(commit => {
                    console.log(`    ${commit.Date.toLocaleTimeString()}: ${commit.Filename}`);
                });
                if (todayCommits.length > 3) {
                    console.log(`    ... and ${todayCommits.length - 3} more`);
                }
            }
        }

        await mongoose.connection.close();
        console.log('\nDatabase connection closed');

    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDatabase();