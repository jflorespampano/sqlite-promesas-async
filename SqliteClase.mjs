// controlador para sqlite
import sqlite3 from 'sqlite3'

class SqliteClase{
    constructor(dbFilePath){
        this.dbFilePath=dbFilePath
        this.dbOpen=false
        this.db=null
    }
    /**
     * 
     * @returns Devuelve un manejador de base de datos SQLite
     */
    open(){
        return new Promise((resolve, reject)=>{
            console.log("base de datos:",this.dbFilePath)
            this.db = new sqlite3.Database(this.dbFilePath, (err) => {
                if (err) {
                    console.log('No se pudo conectar a la database: ', err)
                    this.dbOpen=false
                    reject({
                        "success":false,
                        "error":err
                    })

                } else {
                    // console.log('Connectado a la database:',JSON.stringify(this.db))
                    this.dbOpen=true
                    resolve({
                        "success":true,
                        "error":null
                    })
                }
            })
        })
    }
    /**
     * 
     * @param {*} sql Consulta sql
     * @param {*} params arreglo de parametros []
     * @returns { id: this.lastID, changes: this.changes }
     */
    run(sql, params = []) {
        // console.log(sql,params)
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error corriendo  sql ' + sql)
                    console.log(err)
                    reject({
                        "success":false,
                        "data":[],
                        "error":err
                    })
                } else {
                    //si el statemet se ejcuta satisfactoriamente
                    //el objeto this de la funcion callback contiene 2 propiedades:
                    //lastID contiene el inidce del ultimo registro insertado.
                    //changes contiene el indice del ultimo renglon afectado por la consulta.
                    //console.log("en run ",{ id: this.lastID, changes: this.changes })
                    // console.log({ id: this.lastID, changes: this.changes })
                    resolve({ 
                        "success":true,
                        "data":[{id: this.lastID, changes: this.changes}],
                        "error":null
                    })
                }
            })
        })
    }
    /**
     * 
     * @param {*} sql consulta sql
     * @param {*} params parametro para el whre id=? en un arreglo [id]
     * @returns 
     */
    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject({
                        "success":false,
                        "data":[],
                        "error":err
                    })
                } else {
                    //console.log(`consulta ${sql} correcta `,result)
                    resolve({
                        "success":false,
                        "data":result,
                        "error":null
                    })
                    //resolve({ id: this.lastID, changes: this.changes })
                }
            })
        })
    }
    /**
     * 
     * @param {*} sql consulta sql
     * @param {*} params arreglo vacio [] o ningun parametro
     * @returns el resultado de la consulta sql
     */
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, result) => {
                if (err) {
                    console.log('Error running sql: ' + sql)
                    console.log(err)
                    reject({
                        "success":false,
                        "data":[],
                        "error":err
                    })
                } else {
                    resolve({
                        "success":false,
                        "data":result,
                        "error":null
                    })
                }
            })
        })
    }
    /**
     * cierra la base de datos
     */
    close(){
        console.log("base de datos cerrada")
        if(this.dbOpen) this.db.close()
    }
}

export default SqliteClase