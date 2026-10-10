// 로컬 확인용 정적 서버. 의존성 없음. 사용: node tools/serve.js  →  http://127.0.0.1:8765
// (이 PC 의 python 은 Windows Store 스텁이라 `python -m http.server` 가 뜨지 않는다.)
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, ".."), port = Number(process.env.PORT) || 8765;
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".txt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8" };
http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(req.url.split("?")[0]));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { "content-type": "text/plain" }); return res.end("404 " + req.url); }
    res.writeHead(200, { "content-type": types[path.extname(file)] || "application/octet-stream", "cache-control": "no-store" });
    res.end(data);
  });
}).listen(port, "127.0.0.1", () => console.log(`http://127.0.0.1:${port}  (root: ${root})`));
