const express = require('express');
const cors = require('cors');
const { generateDiagramSVG } = require('./diagramGenerator');

const app = express();
app.use(cors());
app.use(express.json());

// ... other middleware and routes ...

app.post('/generate-diagram', async (req, res) => {
  try {
    const { text } = req.body;
    const svgString = await generateDiagramSVG(text);
    res.set('Content-Type', 'image/svg+xml');
    res.send(svgString);
  } catch (error) {
    console.error('Error generating diagram:', error);
    res.status(500).json({ error: 'Failed to generate diagram' });
  }
});

// ... rest of your server code ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
