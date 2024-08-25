const express = require('express');
const path = require('path');
const productRouter = require('./routes/productRouter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
