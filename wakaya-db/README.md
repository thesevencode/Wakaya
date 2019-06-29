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

        values: String  // ['client'  ó 'producer']
    
    -activate: Boolean -> por defecto sera False
    
    -terms: Boolean ->Obligatorio
 
 
Funciones:

    1) createOrUpdate(user)
    
            param: user -> Objeto
            returns: 
                - Objeto  -> Éxito
                - null -> Solo si no se pude hacer el update
                
    2) activateEmail(_id)
        
            param: _id -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - true -> Éxito
                - false -> Error
                
    3) findById(_id)
    
            param: _id -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    4) findByEmail(email)
    
            param: email -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos 
                
    5) findAll()
    
            returns: 
                - [Objeto] -> Éxito
                - Error -> Generado por la base de datos 
                
    6) findByEmailSelectPassword(email)
    
            param: email -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto: { password,_id} -> Éxito
                - Error -> Generado por la base de datos 
                
        
###  Client

Campos:


      -_id: String -> generado por la Base de datos
      
      -user_id: String -> Obligatorio, obtenido por el modelo User
      
      -name: String -> Obligatorio
      
      -lastName: String -> Obligatorio
      
     -phones: [ Number ] -> Obligatorio
     
     -address : String 
     
     -photography : String
     
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
     
Funciones :

    1) createOrUpdate(client)
    
            param: client -> Objeto
            returns: 
                - Objeto  -> Éxito
                - null -> Solo si no se pude hacer el update 
                
    2) findByUserId(user_id)
        
            param: user_id -> String
            returns: 
                - null -> si el user_id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    3) findById(_id)
    
            param: _id -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    4) findAll()
    
            returns: 
                - [Objeto] -> Éxito
                - Error -> Generado por la base de datos      
                

###  Organization

Campos:


      -_id: String -> generado por la Base de datos
      
      -producer_id : String, Unique -> Obligatorio, obtenido por el modelo Producer
            
      -name: String -> Obligatorio
      
      -email: String -> Obligatorio
      
      -type: String -> Obligatorio
        
          values: ['public', 'private']
      
     -phones: [ Number ] -> Obligatorio}
     
     -address: String -> Obligatorio
     
     -url: String  -> No es Obligatorio
     
     -img: String
     
     -members:  [ Producer ]  -> Arreglo de objetos de la colección "Producer" 
     
     
Funciones :

    
    1) createOrUpdate(organization)
    
            param: organization -> Objeto
            returns: 
                - Objeto  -> Éxito
                - null -> Solo si no se pude hacer el update 
                
    2) addMembers(_id, listMembers)
          
            params: 
                _id -> String
                listMembers -> Arreglo de Producer
            returns: 
                - null 
                        ->si el Id no tiene el formato correcto
                        ->Si no se pudo realizar la accion
                        -> Si no Existe la organization
                - [Producer] -> Éxito, Lista de los miembros de la organization
                - Error -> Generado por la base de datos

    3) findByIdListMembers(_id)
    
            param: organization -> Objeto
            returns: 
                - null -> si el Id no tiene el formato correcto
                - [Producer] -> Éxito, Lista de los miembros de la organization 
                - Error -> Generado por la base de datos
                
    4) updateMember(_id, member)
    
            params: 
                _id -> String
                -member -> Objeto producer
            returns: 
                - null 
                        ->Si no se pudo realizar la accion
                - Objeto -> Éxito, Lista de los miembros de la organization
              
    5) findById(_id)
    
            param: _id -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    6) findByProducerId(producer_id)
    
            param: producer_id -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    7) findByEmail(email)
    
            param: email -> String
            returns: 
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
    
    8) findAll()
    
            returns: 
                - [Objeto] -> Éxito, Arreglo de organizacioens
                - Error -> Generado por la base de datos 

     
###  Producer

Campos:


      -_id: String -> generado por la Base de datos
      
      -user_id: String -> Obligatorio, obtenido por el modelo User
      
      -name: String -> Obligatorio
      
      -lastName: String -> Obligatorio
      
     -phones: [ Number ] -> Obligatorio
     
     -categories: [ String ] -> Obligatorio, esto se agregará cuando se añadan productos 
     
     -url: String 
     
     -img: String
     
     -id_organization: String -> Solo si pertenece a alguna organización
     
     -organization: //Solo si creó una organización, por lo tanto es el administrador.
         {
            name: String,
            _id: String, Unique
         }
     
Funciones : 

    1) createOrUpdate(producer)
    
            param: producer -> Objeto
            returns: 
                - Objeto  -> Éxito
                - null -> Solo si no se pude hacer el update 
              
    2) findById(_id)
    
            param: _id -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    3) findByidOrganization(id_organization)
    
            param: id_organization -> String
            returns: 
                - Objeto -> Éxito
                - Error -> Generado por la base de datos
                
    4) findByCategories(categories)
    
            param: categories -> Array[String] ->ejemplo : ['apicultura', 'artesania']
            returns: 
                - [Producer] -> Éxito, Arreglo de productores
                - Error -> Generado por la base de datos
                
    5) addCategorie(_id, categorie)
    
            param: 
                -_id: String
                -categorie -> String
            returns: 
                - null -> si el Id no tiene el formato correcto
                - True -> Exito
                - False -> Error
                
    6) addOrUpdateOrganization(_id, organization)
    
            param: 
                -_id: String
                -organization -> Objeto { name: String, _id: String }
            returns: 
                - null -> si el Id no tiene el formato correcto
                - Objeto: organization -> Exito
                - False -> Error
                
    7) deleteOrganization(_id)
    
            param: 
                -_id: String
            returns: 
                - True -> Exito
                - False -> Error
                
    8) findAll()
    
            returns: 
                - [Objeto] -> Éxito, Arreglo de productores
                - Error -> Generado por la base de datos 

