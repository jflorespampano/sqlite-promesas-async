const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
let datos = [
    {
        "userId": 1,
        "id": 1,
        "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        "body": "quia et suscipit\nsuscipit recusandae consequuntur architecto"
    },
    {
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore  molestiae ut reiciendis\nqui aperiam non debitis po nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quoe porro eius odio et labore et velit aut"
    },
    {
        "userId": 1,
        "id": 4,
        "title": "eum et est occaecati",
        "body": "ullam et saepe reiciendiscommodi nesciunt rem tenetur doloremque ipsam iure\nquis so velit"
    },
    {
        "userId": 1,
        "id": 5,
        "title": "nesciunt quas odio",
        "body": "repudiandae veniam quaerat suptatibus quis\nest aut tenetur dolor neque"
    },
    {
        "userId": 1,
        "id": 6,
        "title": "dolorem eum magni eos aperiam quia",
        "body": "ut aspernatur corporis harum nihils et ea nemo ab reprehenderit ores velit et doloremque molestiae"
    },
    {
        "userId": 1,
        "id": 7,
        "title": "magnam facilis autem",
        "body": "dolore placeat quibusdam ea quo vitae\nma sequi eos ea sed quas"
    },
    {
        "userId": 1,
        "id": 8,
        "title": "dolorem dolore est ipsam",
        "body": "dignissimos aperiam dolorem qui eum\nfacilis psam ut commodi dolor voluptatum modi aut vitae"
    }];


function crearTabla(db) {
    db.serialize(() => {
        const sql = `CREATE TABLE IF NOT EXISTS posts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL,
            title TEXT NOT NULL,
            body  TEXT NOT NULL
        ); `
        db.run(sql);

        const stmt = db.prepare("INSERT INTO posts(userId, title, body) VALUES (?,?,?);");
        datos.forEach(e => {
            stmt.run(e.userId, e.title, e.body);
        });
        // for (let i = 0; i < 10; i++) {
        //     stmt.run("Ipsum " + i);
        // }
        stmt.finalize();

        db.each("SELECT * FROM posts;", (err, row) => {
            console.log(row.id + ": " + row.title);
        });
    });

    //db.close();

}

db = new sqlite3.Database('posts.sqlite3', (err) => {
    if (err) {
        console.log('Could not connect to database', err)
    } else {
        console.log('Connected to database');
    }
});
crearTabla(db);
db.close();