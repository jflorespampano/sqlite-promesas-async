import SqliteClase from "./SqliteClase.mjs";

const objSqlite=new SqliteClase('prov_par.s3db')

function getAll(){
    const sql=`select * from partes;`
    return new Promise((resolve,reject)=>{
        objSqlite.open()
        .then(resp=>{
            if(resp==false){
                throw new Error("No se pudo abrir la BD")
            }
            return objSqlite.all(sql,[])
        })
        .then(resp=>{
            resolve(resp)
        })
        .catch(err=>{
            console.log("Error:",err)
            reject(err)
        })
        .finally(()=>{
            objSqlite.close()
        })
    })
}

function insert(datos){
    const sql='insert into partes(nombre,proveedor,existencia) values(?,?,?)'
    return new Promise((resolve,reject)=>{
        objSqlite.open()
        .then(resp=>{
            if(resp==false){
                throw new Error("No se pudo abrir la BD")
            }
            return objSqlite.run(sql,datos)
        })
        .then(resp=>{
            resolve(resp)
        })
        .catch(err=>{
            console.log("Error:",err)
            reject(err)
        })
        .finally(()=>{
            objSqlite.close()
        })
    })
}

// insert(['clavo 1/2',2,350])
// .then(resp=>{
//     console.log("de iserta:",resp)
// })
// .catch(err=>{
//     console.log(("Error:",err))
// })

getAll()
.then(resp=>{
    console.log("respuesta:",resp)
})
.catch(err=>{
    console.log(("Error:",err))
})