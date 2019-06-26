# Modulo Base de Datos Wakaya

Gestor: MongoDB

### Conexión

    const db = require('wakaya-db')

    const config = {
    
        url: process.env.DB_URL || "mongodb+srv://@wakayadb-dk6m4.mongodb.net/wakayaDB?retryWrites=true&w=majority",

        config: {

            user: process.env.DB_USER || 'user',

            pass: process.env.DB_PASS || 'password'

        }
    
    }

    let services = null


    module.exports = async function initDatabase () {
      if (!services) {
        debug('Connecting to database')
        try {
          services = await db(config.db.url, config.db.config)
        } catch (e) { handleFatalError(e) }
      }
      return services // Organization, User
    }


    function handleFatalError (err) {
      console.log('ERRORR')
      console.error(err.message)
      console.error(err.stack)
      process.exit(1)
    }



A continuación se presenta las colecciones de la Base de datos:
###  User

Campos:
    -_id: String -> generado por la Base de datos
    
    -email: String -> obligatorio

    -password: String -> obligatorio

    -type: String -> obligatorio

        values: String  // ['client'  ó 'salesman']

    -company: -> No es obligatorio, Solo si el vendedor se registra como una Organizacion
      {
          name: String,
          _id: String
      }

###  Client

Campos:

      -_id: String -> generado por la Base de datos
      
      -user_id: String -> Obligatorio, obtenido por el modelo User
      
      -name: String -> Obligatorio
      
      -lastName: String -> Obligatorio
      
     -phones: [ Number ] -> Obligatorio}
     
     -document : {    
        
        type:String, // ['dni' ó 'C.E']
        
        number: Number
     
     } 
     
     -card: [{
            
            name: String,
            
            type: String,
            
            number: Number,
            
            cvc: Number,
            
            country: String,
            
            expiration: Date
        
     }]

###  Organization

Campos:

      -_id: String -> generado por la Base de datos
            
      -name: String -> Obligatorio
      
      -email: String -> Obligatorio
      
      -type: String -> Obligatorio
        
          values: ['public', 'private']
      
     -phones: [ Number ] -> Obligatorio}
     
     -address: String -> Obligatorio
     
     -url: String  -> No es Obligatorio
     
     -members:  [ Producer ]  -> Arreglo de objetos de la colección "Producer" 
     
###  Producer

Campos:

      -_id: String -> generado por la Base de datos
      
      -user_id: String -> Obligatorio, obtenido por el modelo User
      
      -name: String -> Obligatorio
      
      -lastName: String -> Obligatorio
      
     -phones: [ Number ] -> Obligatorio
     
     -categories: [ String ] -> Obligatorio, esto se agregará cuando se añadan productos 
     
     -img: String -> No es obligatorio
     
     
