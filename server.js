const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, `build`)));
app.get(`*`, (res, res) => {
  res.sendFile(path.join(__dirname, `build`, `index.html`));
});

app.listen(PORT, () => console.log('Server running'));