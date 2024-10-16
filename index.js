const http = require("http");
const url = require("url");
const fs = require("fs");

http
  .createServer(function (req, res) {
    console.log(req.url);

    if (req.url === "/") {
      fs.readFile("index.html", function (err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    } else {
      const q = url.parse(req.url, true);
      const filename = "." + q.pathname + ".html";

      fs.readFile(filename, function (err, data) {
        if (err) {
          fs.readFile("404.html", function (err404, data404) {
            if (err404) {
              res.writeHead(500, { "Content-Type": "text/html" });
              return res.end("500 Internal Server Error");
            }
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(data404);
          });
          return;
        }

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      });
    }
  })
  .listen(8080);
