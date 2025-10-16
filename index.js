import express from 'express';
import {spawn} from 'child_process';

const app = express();
app.use(express.json());


// Post endpoint to handle incoming JSON data
app.post('/', (req, res) => {
    const inputData = req.body;

    const py = spawn("python3", ["find_available_listings.py"]);
    let output = "";

    // Send JSON data to Python script
    py.stdin.write(JSON.stringify(inputData));
    py.stdin.end();

    // Collect data from Python script
    py.stdout.on('data', (data) => {
        output += data.toString();
    })

    py.stderr.on('data', (data) => {
        console.error("python error: ", data.toString());
    })

    py.on('close', (code) => {
        try {
            const result = JSON.parse(output);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to parse Python output' });
        }
    })
    
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('Server is running on port ', PORT)});