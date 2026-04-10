# TP5Api

# Parte 1
# pokemon por nombre

URL: https://pokeapi.co/api/v2/pokemon/pikachu
Método: GET
Status: 200 OK

Acá probamos buscar a pikachu por nombre.

La api devolvió toda la información del pokemon en formato json, por ejemplo el nombre, la altura, el peso, los tipos y la imagen.

Esto después nos sirvió para usar esos datos en el proyecto.

# pokemon por id

URL: https://pokeapi.co/api/v2/pokemon/6
Método: GET
Status: 200 OK

En esta probamos buscar por número en vez de por nombre.

El id 6 corresponde a charizard.

nos devolvió prácticamente lo mismo que antes, pero entendí que también se puede buscar por id.

# lista de pokemon

URL: https://pokeapi.co/api/v2/pokemon?limit=10
Método: GET
Status: 200 OK

Esta request devuelve una lista de 10 pokemon.

Acá pudimos ver cómo usar parámetros en la url, en este caso el limit para elegir cuántos mostrar.

# tipo de pokemon

URL: https://pokeapi.co/api/v2/type/fire
Método: GET
Status: 200 OK

Acá busquamos por tipo, usando fire.

La api nos devolvió información sobre ese tipo y también una lista de pokemon que son de fuego.

# prueba de error

URL: https://pokeapi.co/api/v2/pokemon/pikachuuuuu
Método: GET
Status: 404 Not Found

Esta la hicimos a propósito mal para ver qué pasaba.

La api devolvió error 404 porque ese pokemon no existe.

Esto nos sirvio para después manejar errores en el codigo y mostrar un mensaje si el usuario escribe mal el nombre.
   

# Parte 2

En esta segunda parte hicimos una mini pokedex usando HTML, CSS y JavaScript.

La idea del proyecto es que el usuario escriba el nombre de un pokemon y al tocar buscar se muestre la informacion traida desde la PokeAPI.

Se muestra el nombre, la imagen, el tipo, el peso y la altura.

Tambien agregamos un manejo de error por si el pokemon no existe o el nombre esta mal escrito.

Para probarlo uusar Live Server abriendo el archivo index.html.

Ejemplos:

pikachu
charizard
squirtle

Tecnologias usadas:

HTML
CSS
JavaScript
PokeAPI