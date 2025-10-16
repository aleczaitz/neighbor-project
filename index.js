import express from 'express';
import { find_available_listings } from './src/find_available_listings.js';

const app = express();
app.use(express.json());
app.set('json spaces', 2);  // Pretty-print JSON responses


// Post endpoint to handle incoming JSON data
app.post('/', (req, res) => {
    try {
        const inputData = req.body;
        const result = find_available_listings(inputData);
        res.json(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('Server is running on port ', PORT)});