const { Pool } = require("pg");

const pool = new Pool({
    connectionString: "postgresql://mi_base_datos_szrx_user:tVpWK2MZN4L4poTa4aUGkgY9VtE5Pa2b@dpg-d7kj8cf7f7vs73aua50g-a.oregon-postgres.render.com/mi_base_datos_szrx",
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;