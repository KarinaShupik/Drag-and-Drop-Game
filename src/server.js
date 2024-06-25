import express from 'express';
import { fileURLToPath } from 'url';
import path from "path"
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'pages')));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'game.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
