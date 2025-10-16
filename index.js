import express from 'express';
import { performance } from 'perf_hooks';
import { findAvailableListings } from './src/findAvailableListings.js';


const app = express();
app.use(express.json());
app.set('json spaces', 2);  // Pretty-print JSON responses

// Health check endpoint for Elastic Beanstalk
app.get('/', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Post endpoint to handle incoming JSON data
app.post('/', (req, res) => {
    try {
        const inputData = req.body;
        const start = performance.now();
        const result = findAvailableListings(inputData);
        const end = performance.now();
        const elapsed = end - start;
        
        res.json(result);
        console.log(`Request processed in ${elapsed.toFixed(2)}ms`);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('Server is running on port ', PORT)});