/* Esto es un comentario en jQuery */
//Esto es un comentario en jQuery
//El browser no va a hacer nada con los comentarios. Los ignora. Son para que como programador recuerdes más rápido que hace cada función o que guardas en cada variable



/* La primera función que usas siempre es esta */
$(document).ready(function() {
 
    //Todo el código que quieres agregar va dentro de esto. Lo que hace es asegurarse de agregar las funciones que escribas aquí a los elementos de HTML una vez que existan. Lo que esta función le dice al browser es que espere a que el documento de HTML esté listo para correr todo lo que agregues aqui. 
 
});



/* La función que tienes para aparecer submenús es la siguiente, te la explico por partes */
$('.desplegar-submenu-resp').click(function(){
    var id = $(this).attr('href');
    $(id).fadeToggle();
    return false;
});

/****************************************************************************************************************************************/
/* Lo primero que tienes que hacer es decidir a que elemento le vas a agregar la función. Es decir a que botón le tienes que dar clic para que se despliegue el submenú. El botón tiene la clase .desplegar-submenu-resp, entonces la forma de "tomar" el botón que tienes en tu página sería la siguiente */

$('.desplegar-submenu-resp') 

//Tienes varios botones con la misma clase entonces agarra todos los botones con esa clase y a cada uno le agrega lo que sea que agregues después

//Para agarrar cualquier elemento realmente lo unico que necesitas es agregar el nombre del elemento (id, clase o etiqueta) dentro de $()
//Ejemplos:

$('#logo') //Obtiene el elemento HTML con este id
$('.desplegar-submenu-resp') //Obtiene todos los elementos de HTML con esta clase
$('buttons') //Obtiene todos los elementos <button></button> que tengas en el HTML

/****************************************************************************************************************************************/
/* Ya que tienes el elemento (o los elementos) al cual agregar la función debes decidir el tipo de interacción que el usuario tiene que tener con ese elemento para que se realice la función que quieres, en este caso aparecer el submenú. Lo más común es que sea al click. Lo cual se hace de la siguiente manera: */

$('.desplegar-submenu-resp').click(); //Después del elemento agregas un punto seguido de la interacción, en este caso es el click pero pueden ser varias y al final abres y cierras parentesis y el punto y coma, para indicar que es el final de la instrucción

//Después te explico otras funciones que puedes agregar en lugar del click, no son tan comunes


/****************************************************************************************************************************************/

/* Ya que tienes el elemento y la interacción para disparar la función lo siguiente es agregar la función, dentro de la cual puedes hacer practicamente lo que quieras. Mostrar y ocultar elementos, cambiar clases, cambiar el contenido de HTML de cualquier elemento, cambiar estilos, etc. Independientemente de lo que quieras hacer siempre debes agregar una función, con la siguiente sintaxis */

function(){
    //Aqui va el código para lo que quieras hacer, en este caso es desplegar el submenú
} 
//Esta función va dentro de los parentesis de la interacción, en este caso el click, lo cual se vería algo así
.click(function(){

})

//Junto con el elemento al cual se le agrega la función queda así:
$('.desplegar-submenu-resp').click(function(){
    
});


/****************************************************************************************************************************************/
/* La segunda parte sería agregar el código para aparecer el submenú. Lo más sencillo sería llamar el elemento al que queremos aparecer (ya sea por id o por clase) y agregar la instrucción de aparecer y/o desaparecer */
.fadeIn(); //Aparece un elemento
.fadeOut(); //Desaparece un elemento
.fadeToggle(); //Si el elemento esta oculto lo aparece, si el elemento esta visible lo desaparece.

//Esto se haría así:
$('#submenu-hombres-responsivo').fadeIn();

/* Sin embargo hay que recordar que la función se esta agregando a los tres botones (HOMBRE, MUJER, DEPORTES). Entonces cada que dieramos click en cualquiera de ellos lo que haría es desplegar el submenú de la sección de hombres, en lugar de desplegar el submenú especifico para cada sección. Para resolver esto es importante notar que tenemos acceso al botón completo de html, y dicho botón tiene un atributo llamado href al que podemos acceder desde jQuery. La idea es mandar en el href de cada botón el id del submenú que se quiere desplegar, para que se despliegue solamente el submenú correspondiente. */

//HTML con los href correspondientes al ID de cada submenú: 
<a class="desplegar-submenu-resp" href="#submenu-hombres-responsivo">HOMBRES</a>
<a class="desplegar-submenu-resp" href="#submenu-mujeres-responsivo">MUJERES</a>
<a class="desplegar-submenu-resp" href="#submenu-deportes-responsivo">DEPORTES</a>


//El código en jQuery para obtener el href de cada botón, que es el mismo al ID del submenú sería el siguiente

$('.desplegar-submenu-resp').click(function(){
     $(this).attr('href');
     //Algo que no te había mencionado es que $(this) dentro de la función lo que hace es agarrar el elemento especifico al que le diste click, entonces si le diste click al botón que dice deportes $(this) sería el botón DEPORTES. Para obtener especificamente el ID, el cual estamos agregando al href lo que se hace es agregar el .attr('href') después de $(this)

     //Una traducción sería: De este botón (al que le diste click) traeme el atributo href, lo cual te regresaría #submenu-deportes-responsivo
}); 

/* Con el código de arriba logramos acceder al ID #submenu-deportes-responsivo, lo que quiere decir que ahora tenemos el ID especifico del submenu que queremos desplegar/ocultar. Para hacer esto lo que tendríamos que hacer sería: */
$('#submenu-deportes-responsivo').fadeToggle(); 

/* Sin embargo para poder pasar el valor que regresa  
$(this).attr('href');  ->'#submenu-deportes-responsivo' 
dentro de $(aqui).fadeToggle(); 
es necesario que utilicemos una variable.
*/
/* Una variable es una parte de memoria a la cual puedes acceder por un nombre, que tu asignas, y puedes guardar cualquier valor para utilizarlo después */
/*Para guardarlo en una variable primero necesitamos saber como declarar una variable. Es realmente sencillo. Solamente es la palabra var seguido del nombre de la variable. */
var id;
/* Una vez declarada la variable puedes asignarle cualquier valor. El valor que queremos asignar es el href del botón, el cual es el mismo que el ID del submenú que vamos a desplegar/ocultar */
var id;
id =  $(this).attr('href');
//Que viene siendo lo mismo que esto:
var id =  $(this).attr('href'); 

/* En nuestra variable ID ya tenemos guardado el href o el id del submenú, en este caso #submenu-deportes-responsivo */
var id = $(this).attr('href') =  #submenu-deportes-responsivo

/* Nuestro código completo se vería algo así hasta ahora */
$('.desplegar-submenu-resp').click(function(){
    var id = $(this).attr('href');
});

/* Para hacer que aparezca el elemento del ID, ahora guardado en la variable, mandamos llamar el elemento desde jquery junto con la función de aparecer/ocultar */
$(id).fadeToggle();


/* Lo cual se vería así: */
$('.desplegar-submenu-resp').click(function(){
    var id = $(this).attr('href');
    $(id).fadeToggle();
    
});

/* El return false; que se agrega al final es para evitar que haga las funciones que por default tiene el anchor, que sería mandar a otra página. */
$('.desplegar-submenu-resp').click(function(){
    var id = $(this).attr('href');
    $(id).fadeToggle();
    return false;
});
