const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
