const express = require("express");
const router = express.Router();
const multer = require("multer");

const personas = [];
const mascotas = [];

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "Files");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("myfile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = { message: "No hay nada q subir", statusCode: 400 };
    return next(error, req, res);
  }
  res.json(file);
});

router.post("/uploads", upload.array("myfiles", 5), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = { message: "No hay nada q subir", statusCode: 400 };
    return next(error, req, res);
  }
  res.json(files);
});

/* router.get('/home', (req, res) => {
   res.sendFile('./html/index.html')
}) */

router.get("/mascotas", (req, res) => {
  res.json({ mascotas });
});

router.post("/mascotas", (req, res) => {
  const { nombre, raza, edad } = req.body;
  mascotas.push({ nombre, raza, edad });
  res.sendStatus(201);
});

router.get("/personas", (req, res) => {
  res.json({ personas });
});

router.post("/personas", (req, res) => {
  const { nombre, apellido, edad } = req.body;
  personas.push({ nombre, apellido, edad });
  res.sendStatus(201);
});

module.exports = router;
