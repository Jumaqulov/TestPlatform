const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const testRoutes = require('./routes/test');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api/test', testRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
