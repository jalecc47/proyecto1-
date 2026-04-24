const express = require("express");
const router = express.Router();
const pool = require("../db"); // ahora es pool, no db
const bcrypt = require("bcrypt");

// REGISTRO
router.post("/registro", async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)",
            [nombre, email, hash]
        );

        res.json({ mensaje: "Usuario registrado" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: "Error al registrar usuario" });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ mensaje: "Usuario no existe" });
        }

        const usuario = result.rows[0];

        const valido = await bcrypt.compare(password, usuario.password);

        if (!valido) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        res.json({
            mensaje: "Login exitoso",
            usuario: usuario.nombre
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ mensaje: "Error en login" });
    }
});

module.exports = router;