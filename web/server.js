const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.static(__dirname)); // Serve static files from the 'web' directory

app.get('/api/getImages', (req, res) => {
    const imageDir = path.join(__dirname, 'img/gallery'); // Correct path to image directory
    fs.readdir(imageDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        const images = files.filter(file => /\.(jpg|jpeg|png|gif)$/.test(file));
        res.json(images);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});