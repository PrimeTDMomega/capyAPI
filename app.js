const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // Change this to your desired port number

// Serve static files from the "images" directory
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

// API endpoint to serve a single image
app.get('/imgs/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, 'images', imageName);

    // Check if the file exists
    const fs = require('fs');
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // If the file does not exist, return a 404 Not Found error
            return res.status(404).send('Image not found');
        }

        // Return the image as a response with appropriate content-type
        res.sendFile(imagePath);
    });
});

// API endpoint to serve a list of all available images
app.get('/api/images', (req, res) => {
    // Get a list of image files from the "images" directory
    const fs = require('fs');
    const imageDir = path.join(__dirname, 'images');

    fs.readdir(imageDir, (err, files) => {
        if (err) {
            // If there was an error reading the directory, return a 500 Internal Server Error
            return res.status(500).send('Internal Server Error');
        }

        // Filter the files to only include image files (you can modify this based on your image formats)
        const imageFiles = files.filter((file) => {
            return ['.jpg', '.jpeg', '.png', '.gif'].includes(path.extname(file).toLowerCase());
        });

        // Return the list of image files as a JSON response
        res.json(imageFiles);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
