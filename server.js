const https = require("https");
const fs = require("fs");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync("./localhost+3-key.pem"), // Path to your private key
  cert: fs.readFileSync("./localhost+3.pem"), // Path to your certificate
};

app.prepare().then(() => {
  https
    .createServer(httpsOptions, (req, res) => {
      handle(req, res);
    })
    .listen(3000, () => {
      console.log("🚀 Server running at https://localhost:3000");
    });
});
