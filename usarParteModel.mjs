import ModelPartes from './partes.model.mjs'

const mp=new ModelPartes('prov_par.s3db')
// mp.getAll()
mp.get(5)
.then(resp=>{
    console.log(resp)
})
.catch(err=>{
    console.log(err)
})