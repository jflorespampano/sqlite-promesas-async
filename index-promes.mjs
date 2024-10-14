//Notas:
//ver en:https://www.npmjs.com/package/sqlite
//para trabajar con modulos poner: "type": "module",en package.json
//opcion: poner extension: .mjs a los archivos js
//Crear el proyecto: npm init
//dependencia a instalar
//npm install sqlite3 --save
//npm install sqlite
//

import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

//para depuracion
sqlite3.verbose();

/////////////////////////////////////// promesas ///////////////////////////////
function muestraCnPromesa() {
    return new Promise((resolve,reject)=>{
        let mydb
        open({
            filename: 'posts.sqlite3',
            driver: sqlite3.Database
        }).then((db) => {
            mydb=db
            db.all('SELECT * FROM posts')
            .then((result) => {
                resolve(result);
            })
        })
        .catch(err=>{
            reject(err)
        })
        .finally(()=>{
            mydb.close().then(() => {
                console.log('cerrada la bd');
            });
        })

    })
}

function insertaDatoCnPromesa({ userId, title, body }) {
    return new Promise((resolve,reject)=>{
        let mydb
        open({
            filename: 'posts.sqlite3',
            driver: sqlite3.Database
        }).then(db => {
            mydb=db
            const sql = `INSERT INTO posts(userId,title,body) VALUES (${userId},'${title}','${body}')`;
            return db.run(sql)
        })
        .then(result => {
            resolve(result);
        })
        .catch((error) => {
            reject(error)
        })
        .finally(()=>{
            mydb.close().then(() => {
                console.log('cerrada la bd');
            });
        })
    })
}

function actualizaDatoCnPromesa({ id, userId, title, body }) {
    return new Promise((resolve,reject)=>{
        let mydb
        open({
            filename: 'posts.sqlite3',
            driver: sqlite3.Database
        }).then(db => {
            mydb=db
            const sql = `update posts set userId=${userId}, title='${title}', body='${body}' 
                where id=${id}`;
            // console.log(sql)
            return db.run(sql)
        })
        .then(result => {
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        })
        .finally(()=>{
            mydb.close().then(() => {
                console.log('cerrada la bd');
            });
        })
    })
}


//Ejemplos:

// insertaDatoCnPromesa({  
//     userId: 123, 
//     title: 'titulo 123', 
//     body: 'cuerpo 123' 
// })
// .then(resp=>{
//     console.log("respuesta de la insercion:",resp)
//     return actualizaDatoCnPromesa({ 
//         id: 10, 
//         userId: 122, 
//         title: 'Title - 10', 
//         body: 'Body actualizado  - 10' 
//     })
// })

actualizaDatoCnPromesa({ 
    id: 10, 
    userId: 122, 
    title: 'Title - 10', 
    body: 'Body actualizado  - 10' 
})
.then(resp=>{
    console.log("Resultado Actualizacion:",resp)
    return muestraCnPromesa()
})
.then(resp=>{
    console.log("Resultado:",resp)
})
.catch(err=>{
    console.log("Error:",err)
})


