import SqliteClase from './SqliteClase.mjs'
class ModelPartes{
    constructor(dbFilePath){
        this.dbController=new SqliteClase(dbFilePath)
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    get(id){
        const sql=`select * from partes where id=?;`
        return new Promise((resolve,reject)=>{
            this.dbController.open()
            .then(resp=>{
                if(resp==false){
                    throw new Error("No se pudo abrir la BD")
                }
                return this.dbController.get(sql,[id])
            })
            .then(resp=>{
                resolve(resp)
            })
            .catch(err=>{
                console.log("Error:",err)
                reject(err)
            })
            .finally(()=>{
                this.dbController.close()
            })
        })
    }
    /**
     * Devuelve la lista de todas las partes
     * @returns objeto con la lista de datos
     */
    getAll(){
        const sql=`select * from partes;`
        return new Promise((resolve,reject)=>{
            this.dbController.open()
            .then(resp=>{
                if(resp==false){
                    throw new Error("No se pudo abrir la BD")
                }
                return this.dbController.all(sql,[])
            })
            .then(resp=>{
                resolve(resp)
            })
            .catch(err=>{
                console.log("Error:",err)
                reject(err)
            })
            .finally(()=>{
                this.dbController.close()
            })
        })
    }
    /**
     * Inserta un registro en partes
     * @param {*} datos arreglo de paarametros [nombre,proveedor,existencia]
     * @returns 
     */
    insert(datos){
        const sql='insert into partes(nombre,proveedor,existencia) values(?,?,?)'
        return new Promise((resolve,reject)=>{
            this.dbController.open()
            .then(resp=>{
                if(resp==false){
                    throw new Error("No se pudo abrir la BD")
                }
                return this.dbController.run(sql,datos)
            })
            .then(resp=>{
                resolve(resp)
            })
            .catch(err=>{
                console.log("Error:",err)
                reject(err)
            })
            .finally(()=>{
                this.dbController.close()
            })
        })
    }

    //agregue el método put para actualizar todos los campos de un registro
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar u registro
}
export default ModelPartes