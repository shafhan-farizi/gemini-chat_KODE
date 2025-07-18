const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const { GoogleGenerativeAI } = require('@google/generative-ai')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' })

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Gemini app is running on port: http://localhost:${PORT}`)
})

app.post('/api/chat', async(req, res) => {
    const { prompt } = req.body;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        res.json({ output: response.text() })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})