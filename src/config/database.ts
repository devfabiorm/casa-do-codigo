import sqlite3 from 'sqlite3';
// import { open, ISqlite, IMigrate } from 'sqlite';

const db = new sqlite3.Database('data.db')

const USERS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    full_name VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
)
`;

const INSERT_1ST_USER = 
`
INSERT INTO users (
    full_name, 
    email,
    password
) SELECT 'Gabriel Leite', 'gabriel@alura.com.br', '123' WHERE NOT EXISTS (SELECT * FROM users WHERE email = 'gabriel@alura.com.br')
`;

const BOOKS_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, 
    price REAL NOT NULL,
    description TEXT DEFAULT ('') NOT NULL
)
`;

const INSERT_1ST_BOOK = 
`
INSERT INTO books (
    title,
    price,
    description
) SELECT 'Node na prática', 30.0, 'Como desenvolver com Node.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'Node na prática')
`;

const INSERT_2ND_BOOK = 
`
INSERT INTO books (
    title, 
    price,
    description
) SELECT 'JavaScript na prática', 40.0, 'Como desenvolver com JavaScript.' WHERE NOT EXISTS (SELECT * FROM books WHERE title = 'JavaScript na prática')
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USERS_SCHEMA);
    db.run(INSERT_1ST_USER);
    db.run(BOOKS_SCHEMA);
    db.run(INSERT_1ST_BOOK);
    db.run(INSERT_2ND_BOOK);

    db.each("SELECT * FROM users", (err, user) => {
        console.log('Usuario: ');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('db encerrado!');
        process.exit(0);
    })
);

export default db;