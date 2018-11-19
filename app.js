let app = require('./server');

const port = process.env.port || 8000;

app.listen(port, function () {
    console.log(`App is running on ${port}`);
});