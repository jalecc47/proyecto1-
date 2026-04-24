const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// SERVIR FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

const authRoutes = require("./rutas/auth");
app.use("/api", authRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});