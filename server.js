const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let items =   [
        { id: 1, name: 'Inception', releaseDate: '2010-07-16', rating: 8.8 },
        { id: 2, name: 'Interstellar', releaseDate: '2014-11-07', rating: 8.6 },
        { id: 3, name: 'The Dark Knight', releaseDate: '2008-07-18', rating: 9.0 },
        { id: 4, name: 'The Matrix', releaseDate: '1999-03-31', rating: 8.7 },
        { id: 5, name: 'Kalki', releaseDate: '2024-06-10', rating: 7.8 }
     ];

app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
    releaseDate: req.body.releaseDate,
    rating: req.body.rating
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/api/items/:id', (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
