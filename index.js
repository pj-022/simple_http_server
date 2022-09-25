const projects = require('./data-store');   //Importing Data
const http = require("http");

const host = 'localhost';
const port = 8000;        // Declared Host and Port on which server is running

// Function to filter the json data by ID
function filterById(jsonObject, id) {
    return jsonObject.filter(function (jsonObject) { return (jsonObject['id'] == id); })[0];
}


// Listener Function Here
const requestListener = function (req, res) {
    const urlSegments = req.url.split('/')      // Breaking URL into chunks
    // console.log(urlSegments)
    
    // Validating url as it should contain all parameters and correct url
    if (urlSegments[1] == "projects") {
        if (urlSegments[2]) {
            var data = filterById(projects, urlSegments[2]);
            if (data) {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(200)
                res.end(JSON.stringify(data))       // if Data is found sending it as response
            }
            else {
                res.setHeader("Content-Type", "application/json");
                res.writeHead(404)
                res.end(`{"error": "No such Entry Found"}`)     // if Data is not Found sending error message
            }
        }
        else {
            res.setHeader("Content-Type", "application/json");
            res.writeHead(400)
            res.end(`{"error": "BAD REQUEST"}`)
        }
    }
    else {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(404)
        res.end(`{"error": "BAD REQUEST"}`)
    }

};

// Intializing Server to Listen on Host and Port specified earlier
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});