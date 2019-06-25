# Modulo Base de Datos Wakaya

Gestor: MongoDB

A continuación se presenta las colecciones de la Base de datos:
###  User

Campos:
    -_id: String -> generado por la Base de datos
    
    -email: String -> obligatorio

    -password: String -> obligatorio

    -type: String -> obligatorio

        values: ['client', 'salesman']

    -company: -> No es obligatorio, Solo si el vendedor se registra como una Organizacion
      {
          name: String,
          _id: String
      }

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
