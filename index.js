import express from 'express';

const app = express();
app.use(express.json());


// Post endpoint to handle incoming JSON data
app.post('/', (req, res) => {
    const data = req.body;

    res.json(data);
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {console.log('Server is running on port ', PORT)});