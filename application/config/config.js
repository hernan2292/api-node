// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Entorno
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Token lifetime
// ============================
process.env.TOKEN_LIFETIME = process.env.TOKEN_LIFETIME || 60 * 60 * 24 * 30;

// ============================
//  Token seed
// ============================
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'dev';


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/api';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;