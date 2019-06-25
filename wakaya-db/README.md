# Modulo Base de Datos Wakaya

Gestor: MongoDB

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
     
     
