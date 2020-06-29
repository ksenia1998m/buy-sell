const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dbConfig = require("./db.js");
const fileUpload =  require("express-fileupload");
const path = require("path");
const uniqueFilename = require("unique-filename");
const app = express();

// Загрузка файлов
app.use(fileUpload({
  createParentPath: true
}));

// Парсинг json
app.use(bodyParser.json());

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Создание соединения с базой данных
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: 'utf8_general_ci',
  connectionLimit: 10
});
connection.getConnection((err, connect) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  } else {
    connect.query('SET NAMES "utf8"');
    connect.query('SET CHARACTER SET "utf8"');
    connect.query('SET SESSION collation_connection = "utf8_general_ci"');
    console.log("Успешно соединено с БД");
  }
  if (connect) connect.release();
});


// Получение файла и загрузка его в папку uploads
app.post('/upload-photo/', async (req, res) => {
    console.log('Пришёл POST запрос для загрузки файла:');
    console.log('Файл: ', req.files)
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let photo = req.files.file0;
            let name = uniqueFilename("")+"."+photo.name.split(".")[1]
            photo.mv('./server/uploads/' + name);
            res.send({
                status: true,
                message: 'File is uploaded',
                filename: name
            });
        }
    } catch (err) {
      console.log("Ошибка ", err);
      res.status(500).send(err);
    }
  });
  
  //Получение полного пути файла
  app.get("/api/photo/:filename", (req, res) => {
    console.log(path.join(__dirname, "uploads", req.params.filename));
    res.sendFile(path.join(__dirname, "uploads", req.params.filename))
  })
  
  // Информирование о запуске сервера и его порте
  app.listen(3001, () => {
    console.log("Сервер запущен на http://localhost:3001");
  });
  
  // Регистрация пользователя
app.post("/api/registration", (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log('Пришёл POST запрос для пользователей:');
    console.log(req.body);
    connection.query(`SELECT * FROM users WHERE email='${req.body.email}'`, function (error, results) {
      if (error) {
        res.status(500).send('Ошибка сервера при получении пользователей с таким же Email')
        console.log(error);
      }
      console.log('Результаты проверки существования Email:');
      console.log(results[0]);
      if (results[0] === undefined) {
        connection.query('INSERT INTO `users` (`surname`, `name`, `patronymic` , `email`,  `phone`,   `password`, `id_ad_type`, `id_role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [req.body.surname, req.body.name,  req.body.patronymic, req.body.email,  req.body.phone, req.body.password, req.body.id_ad_type,  req.body.id_role],
          function () {
            console.log('Запрос на проверку существования созданной записи в БД');
            connection.query(`SELECT * FROM users WHERE email="${req.body.email}"`,
              function (err, result) {
                if (err) {
                  res.status(500).send('Ошибка сервера при получении пользователя по Email')
                  console.log(err);
                } else {
                  console.log(result);
                  res.json(result);
                }
              });
          })
      } else {
        res.json("exist");
      }
    });
  
  })
  