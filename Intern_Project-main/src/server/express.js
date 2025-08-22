import express from 'express';
const app = express();
app.use(express.json());

let latestPayload = null;

app.post('/api/ttn', (req, res) => {
  latestPayload = req.body;
  res.status(200).send('OK');
});

app.get('/api/ttn/latest', (req, res) => {
  res.json(latestPayload);
});

app.get('/', (req, res) => {
  res.send('TTN webhook server is running!');
});

app.listen(3001, () => console.log('TTN webhook server running on port 3001'));