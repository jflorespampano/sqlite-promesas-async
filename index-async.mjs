import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

//para depuracion
sqlite3.verbose();

async function muestra() {
    // open the database
    const db = await open({
        filename: 'posts.sqlite3',
        driver: sqlite3.Database
    });
    const result = await db.all('SELECT * FROM posts');
    db.close();
    console.log(result);
}
async function leerUnDato() {
    const db = await open({
        filename: 'posts.sqlite3',
        driver: sqlite3.Database
    });
    const result = await db.get('SELECT * FROM posts WHERE id = ?', '1')
    console.log(result);
}
async function insertaDato({ id, userId, title, body }) {
    const db = await open({
        filename: 'posts.sqlite3',
        driver: sqlite3.Database
    });
    const sql = `INSERT INTO posts(userId,title,body) VALUES (${userId},'${title}','${body}')`;
    const result = await db.run(sql);
    console.log('resultado:', result);
    db.close();
    muestra();
}

async function actualizaDato({ id, userId, title, body }) {
    const db = await open({
        filename: 'posts.sqlite3',
        driver: sqlite3.Database
    });
    const sql = `update posts set userId=${userId}, title='${title}', body='${body}' where id=${id}`;
    const result2 = await db.run(sql)
    console.log(result2);
    db.close();
    muestra();
}

muestra();
//leerUnDato();
//insertaDato({ id: 23, userId: 103, title: 'titulo 103', body: 'cuerpot 103' });

