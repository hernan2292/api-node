// ============================
//  Port
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Environment
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
//  Data Base
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/api';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;


// ============================
//  Google client
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || '1036035725337-van3au8jrb85b0qvmgpq6taep87g5n2g.apps.googleusercontent.com'