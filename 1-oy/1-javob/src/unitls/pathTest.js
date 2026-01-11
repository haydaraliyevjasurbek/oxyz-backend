// =====================================
//  1-mashq
// =====================================
// const path = require('path')
// const usersPath = path.join(__dirname, '../../data/users.json')
// // console.log(usersPath)
// const fullUrl = path.resolve('../../data/users.json')
// // console.log(fullUrl)

// =====================================
//  2-mashq
// =====================================
// 🧠 2️⃣ __dirname / __filename – tushunish testi
// // src/app.js
// console.log(__dirname);
// Terminaldan:
// node src/app.js
// ❓ Savollar:
// 1️⃣ Konsolga nima chiqadi?
// 2️⃣ Agar fayl ichida process.chdir("..") qilinsa, __dirname o‘zgaradimi?
// 3️⃣ Nega backendda __dirname ishonchli?

// =====================================
//  3-mashq
// =====================================
// const fs = require('fs')
// const path = require('path')

// let logTime = `[${new Date().toLocaleString("uz-UZ")}] Server started\n`;

// const logPath = path.resolve('../../data/')
// const file = path.join(logPath, 'logs.txt' )

// if(!fs.existsSync(path.resolve('../../', 'data/logs.txt'))){
//     fs.writeFileSync(file, logTime)
// }else{
//     fs.appendFileSync(file, logTime)
// }

// =====================================
//  4-mashq 1-yechim
// =====================================
// const path = require("path");
// const fs = require("fs");

// const usersJsonLocation = path.join(__dirname, "../../data/users.json");
// let jsonDate = fs.readFileSync(usersJsonLocation, "utf8") ? filterByAge(JSON.parse(fs.readFileSync(usersJsonLocation, "utf8"))) : console.log(`users.json bo'sh!` );

// function filterByAge(data) {
//   const newJsonData = [];
//   data.forEach((element) => {
//     if (element.age > 18) {
//       newJsonData.unshift(element);
//     }
//   });
//   let newWriteData = JSON.stringify(newJsonData);
//   fs.writeFileSync(usersJsonLocation, newWriteData);
//   return console.log('Tayyor!');
//   ;
// }

// =====================================
//  4-mashq 2-yechim
// =====================================
// const path = require("path");
// const fs = require("fs");

// const usersJsonLocation = path.join(__dirname, "../../data/users.json");
// let jsonDate = fs.readFileSync(usersJsonLocation, "utf8");
// // console.log(typeof jsonDate);

// filterByAge(jsonDate);

// function filterByAge(data) {
//   const newJsonData = [];

//   if (data.length != 0) {
//     data = JSON.parse(data);
//     if (!(data === null || data === undefined || data === "")) {
//       data.forEach((element) => {
//         if (element.age > 18) {
//           newJsonData.unshift(element);
//         }
//       });
//       let newWriteData = JSON.stringify(newJsonData);
//       fs.writeFileSync(usersJsonLocation, newWriteData);
//       return console.log("Tayyor! \n ", JSON.parse(newWriteData));
//     }
//   } else {
//     return console.log("users.json bo'sh!");
//   }
// }

// =====================================
//  5-mashq
// =====================================
// console.log("A");

// fs.readFile("file.txt", "utf-8", () => {
//   console.log("B");
// });

// fs.readFileSync("file.txt", "utf-8");

// console.log("C");
// 1️⃣ Natija qanday chiqadi?
// 2️⃣ Nega aynan shunday?
// 3️⃣ Serverda qaysi qismi xavfli?

// Javoblar
// 1️⃣ A, C, B.
// 2️⃣ readFileSync va readFile bloklaydi, ya'ni keyingi kod bajarilishini kutadi.
// 3️⃣ readFileSync qismi xavfli, chunki u serverni bloklaydi va boshqa so'rovlarni qabul qila olmaydi.

// =====================================
//  6-mashq
// =====================================
// const os = require('os')
// const fs = require('fs')
// const path = require('path')

// const filePath = path.join(__dirname, '../../data/')
// console.log(filePath);

// function createSystemInfoFile(filePath) {
//     fs.writeFileSync(path.join(filePath, 'server-info.txt'),
//     `Platform: ${os.platform()}\nFree Memory: ${(os.freemem() / (1024 ** 3)).toFixed(2)}\nCPU Cores: ${os.cpus().length}`
//     )
//     console.log(`Server ma'lumotlari server-info.txt fayliga yozildi.`);
// }
// createSystemInfoFile(filePath);

// =====================================
//  7-mashq
// =====================================
// db/users.json fayl asosida:
// 1️⃣ createUser(name)
// 2️⃣ getUserById(id)
// 3️⃣ deleteUser(id)
// ID unikal bo‘lsin
// Fayl bo‘sh bo‘lsa ham ishlasin
// Xato bo‘lsa crash qilmasin
// Path hardcode bo‘lmasin
// Async/await bilan yoz

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { error } = require("console");
const location = path.join(__dirname, "../../");
const 

const userData = [
  { id: 1, name: "Ali", age: 17 },
  { id: 2, name: "Vali", age: 22 },
  { id: 3, name: "Olim", age: 19 },
];


function dbfileCreator(loc){
  loc = path.join(loc, 'db')
  if(!fs.existsSync(loc)){
    fs.mkdirSync(loc, { recursive: false })
    console.log('db papka yaratildi!');
  }

  loc = path.join(loc, 'users.json')
  if(!fs.existsSync(loc)){
    fs.writeFileSync(loc, "[]", 'utf-8')
    console.log('users.json fayl yaratildi!');
  }
  console.log('Papka va fayl tayyor!');
}

function savaUser(user){
  if(fs.existsSync())

  // if(!(fs.existsSync(path.join(location, 'db') || !(fs.existsSync(path.join(location, 'db/users.json')))))){
  //   dbfileCreator(location)
  //   if(!fs.readFileSync(path.join(location, 'db/users.json'))){
  //     console.log("Haliveri users.json faylimiz bo'sh endi users qo'shamiz.");
      
  //     const dbLoc = path.join(location, 'db/users.json')

  //     const users = fs.readFileSync(dbLoc, 'utf-8')
  //     users = JSON.parse(users)
            
  //     users.push(user)
  //     users = JSON.stringify(users, null, 2)
      
  //     fs.writeFileSync(dbLoc, users, 'utf-8')
      
  //     console.log("User saqlandi.");
  //   }else if(fs.readFileSync(path.join(location, 'db/users.json'))){
  //     console.log("users.json faylimizda users bor va yoniga yana qo'shamiz.");
      
  //     const dbLoc = path.join(location, 'db/users.json')
  //     const users = fs.readFileSync(dbLoc, 'utf-8')
      
  //     users = JSON.parse(users)
  //     users.push(user)
  //     users = JSON.stringify(users, null, 2)
  //     fs.writeFileSync(dbLoc, users, 'utf-8')
      

  //     console.log("User saqlandi.");
  //   }
  // }else if((fs.existsSync(path.join(location, 'db') && (fs.existsSync(path.join(location, 'db/users.json')))))){
  //   if(fs.readFileSync(path.join(location, 'db/users.json')) === undefined){
  //     console.log("Haliveri users.json faylimiz bo'sh endi users qo'shamiz.");
      
  //     const dbLoc = path.join(location, 'db/users.json')
  //     const users = fs.readFileSync(dbLoc, 'utf-8')
      
  //     users.push(user)
  //     users = JSON.stringify(users, null, 2)
      
  //     fs.writeFileSync(dbLoc, users, 'utf-8')
      
  //     console.log("User saqlandi.");
  //   }else if(fs.readFileSync(path.join(location, 'db/users.json')) !== undefined){
  //     console.log("Haliveri users.json faylimiz bo'sh endi users qo'shamiz.");
      
  //     const dbLoc = path.join(location, 'db/users.json')
  //     const users = fs.readFileSync(dbLoc, 'utf-8')
      
  //     users = JSON.parse(users)
  //     users.push(user)
  //     users = JSON.stringify(users, null, 2)
  //     fs.writeFileSync(dbLoc, users, 'utf-8')
      

  //     console.log("User saqlandi.");
  //   }
  // }else{
  //   console.log("User saqlanmadi.");

  // }
// }
// savaUser(userData[1])

function createUser(name, age){
  if(!name || !age){
    return console.log("User ma'lumotlarida xatolik bor yoki to'ldirilmagan");
  }else if(name && age){
    const newUser = {
      id: crypto.randomUUID(),
      name,
      age,
      createdTime: new Date().toISOString()
    }
    console.log("User yaratildi!\n", newUser);
    savaUser(newUser)
  }else{
    return console.log(error);
  }
}

createUser("Jasur",19)
