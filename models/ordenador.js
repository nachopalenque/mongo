// Using Node.js `require()`
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.Database_URL)
  .then(() => console.log('Connected!'));



  const ordenadorSchema = new mongoose.Schema({
    marca:String,
    precio:Number
  })

  const Ordenador = mongoose.model('Ordenador',ordenadorSchema,'ordenadores')

const buscarPrimero =()=>{
    
    //buscamos el primer registro
    Ordenador.findOne()
    .then( ordenador=>{
    if(ordenador){
      console.log('El primer ordenador encontrado',ordenador)
    }else{
      console.log('No se ha encontrado ningun registro')
    }
   
    })
    .catch(err=>console.error('Error al obtener el ordenador',err));
   
     }

     const buscarTodos =()=>{
    
        //buscamos todos registro
       return Ordenador.find()
        .then( ordenadores=>{
        if(ordenadores.length > 0){
          console.log('Ordenadores encontrados',ordenadores)
          return ordenadores;
        }else{
          console.log('No se ha encontrado ningun registro')
          return null;
        }
       
        })
        .catch(err=>{console.error('Error al obtener los ordenadores',err);
          throw err;
        });
       
         }

         const buscarPorId =(id)=>{
    
            //buscamos el primer registro
            return Ordenador.findById(id)
            .then( ordenador=>{
            if(ordenador){
              console.log('El primer ordenador encontrado',ordenador)
              return ordenador;
            }else{
              console.log('No se ha encontrado ningun registro con el id' +id)
              return null;
            }
           
            })
            .catch(err=>console.error('Error al obtener el ordenador',err));
              throw err;
             }
           
 const buscarPrecioMayor =(precioMayor)=>{
    
                //buscamos el primer registro
               return Ordenador.find({precio:{$gt:precioMayor}})
                .then( ordenadores=>{
                if(ordenadores.length>0){
                  console.log('Ordenadores con precio mayor a '+precioMayor+' encontrados',ordenadores)
                  return ordenadores;
                }else{
                  console.log('No se ha encontrado ningun ordenador con precio mayor a' +precioMayor)
                  return null;
                }
               
                })
                .catch(err=>console.error('Error al obtener el ordenador',err));
                 throw err;
                 }
       
 const crearNuevoOrdenador= (m,p)=>{
 // Crear un nuevo ordenador
 const nuevoOrdenador = new Ordenador({
    marca: m,
    precio: p
  });
  // Guardar el ordenador en la base de datos
  return nuevoOrdenador.save()
    .then(ordenador => console.log('Ordenador guardado:', ordenador))
    .catch(err => console.error('Error al guardar el ordenador:', err))
  throw err;
}
       
const actualizarOrdenador = (idOrdenador, nuevoPrecio)=>{
    //le pasamos el idOrdenador, le pasamos el objeto precio con nuevo precio
    //{new:true} para devolver el objeto actualizado
    Ordenador.findByIdAndUpdate(idOrdenador, { precio: nuevoPrecio }, { new: true })
  .then(ordenadorActualizado => {
    if (ordenadorActualizado) {
      console.log('Ordenador actualizado:', ordenadorActualizado);
    } else {
      console.log('No se encontró ningún ordenador con ese ID.');
    }
  })
  .catch(err => console.error('Error al actualizar el ordenador:', err));

}

const borrarOrdenador = (idOrdenadorParaBorrar)=>{
   return Ordenador.findByIdAndDelete(idOrdenadorParaBorrar)
  .then(ordenadorEliminado => {
    if (ordenadorEliminado) {
      console.log('Ordenador eliminado:', ordenadorEliminado);
      return ordenadorEliminado
    } else {
      console.log('No se encontró ningún ordenador con ese ID.');
      return null
    }
  })
  .catch(err => console.error('Error al eliminar el ordenador:', err))
  throw err;

}

     module.exports = {buscarPrimero, buscarTodos, Ordenador, buscarPorId, buscarPrecioMayor, crearNuevoOrdenador, actualizarOrdenador, borrarOrdenador}