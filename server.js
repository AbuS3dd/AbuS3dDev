const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files from the current directory
app.use(express.static('./'));

// FiveM server status endpoint
app.get('/api/server-status', async (req, res) => {
    try {
        const response = await axios.get('http://urserverip:30120/players.json');
        res.json({
            status: 'online',
            players: response.data,
            maxPlayers: 64
        });
    } catch (error) {
        console.error('Error fetching server status:', error.message);
        res.status(500).json({
            status: 'offline',
            error: 'Could not fetch server status'
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
