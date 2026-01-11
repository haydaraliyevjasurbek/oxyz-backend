const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const DB_PATH = path.join(__dirname, "db", "students.json");


function readStudents() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}
function writeStudents(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/users") {
    const students = readStudents();
    res.writeHead(200);
    return res.end(JSON.stringify(students));
  }

  if (req.method === "POST" && req.url === "/users") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", () => {
      const newStudent = JSON.parse(body);

      if (!newStudent.name || !newStudent.age) {
        res.writeHead(400);
        return res.end(JSON.stringify({ message: "Name va age majburiy" }));
      }

      const students = readStudents();

      const student = {
        id: Date.now(),
        name: newStudent.name,
        age: newStudent.age   
      };

      students.push(student);
      writeStudents(students);

      res.writeHead(201);
      res.end(JSON.stringify({
        message: "Student qo‘shildi",
        student
      }));
    });

    return;
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
