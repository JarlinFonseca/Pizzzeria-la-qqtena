![Pizzería](http://www.madarme.co/portada-web.png)
# Título de proyecto: Pizzeria La QQTEÑA
***
En este proyecto se realiza un algoritmo para una página web de una pizzeria, la cual recibe el pedido del usuario y genera una facturación.
## Tabla de Contenido
1. [Características](#características)
2. [Contenido del proyecto](#contenido-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [IDE](#ide)
5. [Instalación](#instalación)
6. [Demo](#demo)
7. [Autores](#autores)
8. [Institución Académica](#institución-académica)

___
#### Características:

Proyecto de una página web dinámica para una pizzería, la cual tiene el siguiente comportamiento:
1. En la página principal (index.html) el usuario digita la cantidad de pizzas y el tamaño de cada una.
2. Posteriormente, con el botón "cargar opciones" se redirecciona al usuario hacia una nueva página donde puede escoger los sabores de las pizzas y los adicionales.
3. Para finalizar, se carga la factura donde se visualiza el pedido del cliente que contiene las pizzas seleccionadas con sus sabores, sus respectivos adicionales y el total de la cuenta.

* Para el proyecto se utilizó la lectura de datos JSON, donde se encuentran los sabores, tamaños, adicionales y fotos de todas las pizzas. Así mismo, se encuentra el nombre de la pizzeria y su logo.
* Carga dinámica del JSON
* utilización del método URLSearchParams para la lectura de datos enviados por la URL.
* El archivo JSON utilizado se encuentra en: [JSON pizzeria ](https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json "JSON pizzeria")
___
#### Contenido del proyecto:

- [index.html](https://gitlab.com/jarlinandresfb/pizzzeria-la-qqtena/-/blob/master/index.html "index.html") : este es el archivo principal del proyecto.
- [opciones.html](https://gitlab.com/jarlinandresfb/pizzzeria-la-qqtena/-/blob/master/html/opciones.html "opciones.html") : archivo donde se encuentran los sabores y adicionales de las pizzas.
- [factura.html](https://gitlab.com/jarlinandresfb/pizzzeria-la-qqtena/-/blob/master/html/factura.html "factura.html"): archivo donde se carga el pedido del usuario y el total de la cuenta.
- [pizzeria.js](https://gitlab.com/jarlinandresfb/pizzzeria-la-qqtena/-/blob/master/js/pizzeria.js "pizzeria.js") : archivo donde se encuentra la lógica del proyecto, aquí se hacen los algoritmos para leer datos e imprimir la facturación.
- [index.css](https://gitlab.com/jarlinandresfb/pizzzeria-la-qqtena/-/blob/master/css/index.css "index.css"): archivo donde se encuentran los estilos utilizados para el diseño de la página.
___
#### Tecnologías:

- [HTML5](https://developer.mozilla.org/es/docs/HTML/HTML5 "HTML5") : es la tecnología que permite la creación de sitios web gracias a la amplitud de elementos, atributos y etiquetas. 
- [JavaScript](https://developer.mozilla.org/es/docs/Learn/JavaScript/First_steps/Qu%C3%A9_es_JavaScript "JavaScript"): lenguaje que permite implementar funciones en las páginas web. Es la tecnología que hace realidad el diseño dinamico de un sitio web.
- [CSS3](https://desarrolloweb.com/manuales/css3.html "CSS3"): es la tecnología que permite el diseño de la página web, con la utilización de multiples estilos.
___
#### IDE:

- El proyecto se desarrolla con la utilización de Visual Studio Code.
- Se utiliza el visor de JSON, para visualizar los datos guardados dentro del JSON-(http://jsonviewer.stack.hu/).
___
#### Instalación:

NOTA: Para la interacción por consola del proyecto es necesario la instalación de Firefox Developer Edition - [descargar](https://www.mozilla.org/es-ES/firefox/developer/ "descargar")


```sh
1. Se debe descargar el proyecto completo.
2. Invocar el index.html desde el navegador Firefox Developer Edition
```

___
#### Demo:

Para la demostración de la aplicación de la pizzeria visite: [Pizzeria La QQTEÑA](http://ufps16.madarme.co/pizzzeria-la-qqtena/ "Pizerria la QQTEÑA")
___
#### Autores:

1. Jarlin Andres Fonseca Bermón 1151758 - jarlinandresfb@ufps.edu.co
2. Natalia Ortiz Armesto        1151770 - nataliaoa@ufps.edu.co
___
#### Institución Académica:
Proyecto desarrollado en la materia de Programación Web del [Programa de Ingeniería de Sistemas](https://ingsistemas.cloud.ufps.edu.co/ "Programa de Ingeniería de Sistemas") de la [Universidad Francisco de Paula Santander](https://ww2.ufps.edu.co/ "Universidad Francisco de Paula Santander")