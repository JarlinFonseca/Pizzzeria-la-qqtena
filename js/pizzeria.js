var datos;
var precioTotal = 0;

async function leerJSON() {
	try {
		let respuesta = await fetch('https://raw.githubusercontent.com/madarme/persistencia/main/pizza.json');
		datos = await respuesta.json();


	} catch (error) {

		console.log(error);
	}
}



async function nombrePizzeria() {
	await leerJSON();
	document.getElementById("tituloID").innerHTML = datos.nombrePizzeria;
}


async function obtenerInformacionOpciones() {
	await leerJSON();
	nombrePizzeria();
	mostrarAdicionalesSabores();
	verificarSabores1Seleccionados();
	verificarSabores2Seleccionados();
	generarCheckBoxAmbosSabores();
	verificarHabilitarDeshabilitarCheckBox();
	mostrarBotonCalcularFactura();
}


function obtenerCantidadPizzas() {
	let cantidad = document.getElementById("digitoCantidad").value;
	return cantidad;
}


function mostrarCantidadPizzasTamanio() {
	let rta = "";
	let cantidadPizzas = obtenerCantidadPizzas();

	if (validarCampoObligatorio(cantidadPizzas) && validarNumeroMayorCero(cantidadPizzas) && validarNumeroIngresado(cantidadPizzas)) {

		desactivarTexto_Boton();

		for (var i = 1; i <= cantidadPizzas; i++) {

			rta += `
		<form class="tamaniosPizzas  p-3  ml-4 mt-3 mb-2"  >
		<p class="mt-3">Tamaño de Pizza: ${i}: </p>

                  <select class="selector ml-2" id="selectorTamanios${i}" onclick="cargarBotonOP_and_getTamanios()">
                  	<option value="Grande">Grande</option>
                  	<option value="Mediano">Mediano</option>
                  	<option value="Pequeño">Pequeño</option>
                  	
                  </select>
				  </form>
                  `;
		}
		document.getElementById("contenidoFormulario").innerHTML = rta;
		mostrarBotonRecargar();
		mostrarBotonCargarOpciones();
	}
}



function mostrarBotonRecargar() {

	let boton = "";
	boton += `<input class="boton" id="botonCargarNuevo" type="button"  value="Cargar de nuevo" onclick="recargarPagina()"> `;
	document.getElementById("mostrarBotonRecargar").innerHTML = boton;
}


function recargarPagina() {

	document.getElementById("mostrarBotonRecargar").innerHTML = '';
	document.getElementById("contenidoFormulario").innerHTML = '';
	document.getElementById("botonCargarOpciones").innerHTML = '';
	activarTexto_Boton();
}

function cargarBotonOP_and_getTamanios() {
	getTamaniosPizzas();
	mostrarBotonCargarOpciones();
}

function cargarBotonCF_and_obtenerSabores() {
	obtenerArregloSabores(1);
	obtenerArregloSabores(2);
	mostrarBotonCalcularFactura();
}


function mostrarBotonCargarOpciones() {

	let boton = "";
	boton += `
		<input class="boton" id="botonCargarOpciones" type="button"  value="Cargar Opciones" onclick="location.href='html/opciones.html?cantidad=${obtenerCantidadPizzas()}&tamanios=${getTamaniosPizzas()}'">
		 `;

	document.getElementById("botonCargarOpciones").innerHTML = boton;
}


function validarNumeroMayorCero(numero) {
	if (numero <= 0) {
		alert('[ERROR] El numero ingresado debe ser mayor a cero');
		return false;
	}
	return true;
}

function validarNumeroIngresado(numero) {
	var patron = /^\d*$/; //Expresión regular para aceptar solo números enteros

	if (!patron.test(numero)) {
		alert('[ERROR] Debe ingresar un número entero');
		return false;
	}
	return true;
}


function validarCampoObligatorio(numero) {

	if (numero == null || numero.length == 0 || /^\s+$/.test(numero)) {
		alert('[ERROR] El campo numérico no puede estar vacío');
		return false;
	}
	return true;
}

function desactivarTexto_Boton() {
	document.getElementById('digitoCantidad').disabled = true;
	document.getElementById('botonCrear').disabled = true;
}

function activarTexto_Boton() {
	document.getElementById('digitoCantidad').disabled = false;
	document.getElementById('botonCrear').disabled = false;
}

function obtenerCantidadPizzasURL_Adicionales_Sabores() {
	let parametros = new URLSearchParams(window.location.search);
	let cantidadPizzas = parametros.get('cantidad');
	return cantidadPizzas;
}


function mostrarAdicionalesSabores() {

	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();


	let mensaje = "";


	for (var i = 1; i <= cantidadPizzas; i++) {

		mensaje += ` 
	 			<form class="formularioOpcionesPizza mt-3 mb-3 p-3  ml-4" action="">
      <div class="row tamanioFilaSabores ml-1" >

      	<div class="col-md-5 ">
      		<p>Escoja sabores para pizza ${i} (puede escoger uno o dos):</p>

      	</div>
		  <div class="col-md-2">
		  
			  <select class="selectorSab selectorSabores1${i} ml-2 "id="selectorS1${i}" onchange="verificarSabores1Seleccionados()" onclick="cargarBotonCF_and_obtenerSabores()" >
			       
					
					<option value="Napolitana" id="napol1${i}" ></option>            	
                  	<option value="Mexicana" id="mex1${i}" ></option>
                  	<option value="Hawayana" id="hawa1${i}"></option>
                  	<option value="Vegetariana" id="vege1${i}"></option>
                  	
                  </select>
      	</div>
		  <div class="col-md-5">
		
			   <select class="selectorSab selectorSabores2${i} ml-2" id="selectorS2${i}" onchange="verificarSabores2Seleccionados()" onclick="cargarBotonCF_and_obtenerSabores()">
			   
					   <option value="Ninguno" id="ninguno${i}">Ninguno</option>
					   <option value="Napolitana" id="napol2${i}" ></option>  
					   <option value="Mexicana" id="mex2${i}"></option>
					   <option value="Hawayana" id="hawa2${i}"></option>
					   <option value="Vegetariana" id="vege2${i}"></option>       	
                  </select>
      	</div>  
  
 </div> 

 
 <div class="row mt-5">
 	<div class="col-md-6 ">
 		<div class="container">
			 <p id="sabores1${i}">Ingredientes adicionales</p> 
			 
			 <div id="checkBox1${i}" >
			 
			 </div>
 		</div>	

 		 <div class="container mt-3">
			  <p id="sabores2${i}">Ingredientes adicionales:</p>
			  <div id="checkBox2${i}">

			  </div>
 			
		  </div>	
	
 </div>
		

	 <div class="col-md-3  ">
	 
	 <div  id="imagenS1${i}" class="mr-5 ">  

	 </div>
 		
 	</div>
	 <div class="col-md-3  ">
	 
	 <div  id="imagenS2${i}" class="mr-5">  
	
		 </div>
 	</div>
 	
 </div>       
		</form>
		<div class="clear"></div> 
		 `;
	}

	document.getElementById("contenidoAdicionalesSabores").innerHTML = mensaje;
	reemplazarSaborPizzasURL_JSON();
}


function reemplazarSaborPizzasURL_JSON() {

	let sabor1 = obtenerSaborPizzasURL_JSON(0);
	let sabor2 = obtenerSaborPizzasURL_JSON(1);
	let sabor3 = obtenerSaborPizzasURL_JSON(2);
	let sabor4 = obtenerSaborPizzasURL_JSON(3);


	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();

	for (var i = 1; i <= cantidadPizzas; i++) {

		//Sabor Napolitana: Sabor 1 y 2
		reemplazarValoresEnHTML(`napol1${i}`, `napol2${i}`, sabor1);

		//Sabor Mexicana: Sabor 1 y 2
		reemplazarValoresEnHTML(`mex1${i}`, `mex2${i}`, sabor2);

		//Sabor Hawayana: Sabor 1 y 2
		reemplazarValoresEnHTML(`hawa1${i}`, `hawa2${i}`, sabor3);

		//Sabor Vegeariana: Sabor 1 y 2
		reemplazarValoresEnHTML(`vege1${i}`, `vege2${i}`, sabor4);
	}
}


function obtenerSaborPizzasURL_JSON(numero) {
	// numero->0 ->Napolitana
	// numero->1 ->Mexicana
	// numero->2 ->Hawayana
	// numero->3 ->Vegetariana
	let sabor = datos.pizzas[numero].sabor;
	return sabor;
}

function obtenerPreciosPizzasURL_JSON(numeroPizza, numeroTamanio) {

	let precioPizza = datos.pizzas[numeroPizza].precio[numeroTamanio].precio;
	console.log(precioPizza);
	return precioPizza;

}

function obtenerPreciosAdicionalesURL_JSON(iterador_adicional) {

	let precioAdicional = datos.adicional[iterador_adicional].valor;
	return precioAdicional;
}



function reemplazarValoresEnHTML(id1, id2, sabor) {
	document.getElementById(id1).innerHTML = sabor;
	document.getElementById(id2).innerHTML = sabor;
}



function verificarSabores1Seleccionados() {

	let sabor1 = obtenerSaborPizzasURL_JSON(0);
	let sabor2 = obtenerSaborPizzasURL_JSON(1);
	let sabor3 = obtenerSaborPizzasURL_JSON(2);
	let sabor4 = obtenerSaborPizzasURL_JSON(3);

	var imagenNapolitana = obtenerImagenesURLSabores(0);
	var imagenMexicana = obtenerImagenesURLSabores(1);
	var imagenHawayana = obtenerImagenesURLSabores(2);
	var imagenVegetariana = obtenerImagenesURLSabores(3);

	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();

	let arregloSabores1 = new Array();

	for (var i = 1; i <= cantidadPizzas; i++) {
		var select = document.getElementById(`selectorS1${i}`);

		var selectedOperation = select.options[select.selectedIndex].value;

		arregloSabores1.push(selectedOperation);

		verificarImageneSabores(selectedOperation, 1, i, imagenNapolitana, imagenMexicana, imagenHawayana, imagenVegetariana);
		verificarPizzaSeleccionadaSabor(selectedOperation, 1, i, sabor1, sabor2, sabor3, sabor4);
	}
	validarSelector1Con2(1, 2);
}



function verificarSabores2Seleccionados() {
	let sabor1 = obtenerSaborPizzasURL_JSON(0);
	let sabor2 = obtenerSaborPizzasURL_JSON(1);
	let sabor3 = obtenerSaborPizzasURL_JSON(2);
	let sabor4 = obtenerSaborPizzasURL_JSON(3);


	var imagenNapolitana = obtenerImagenesURLSabores(0);
	var imagenMexicana = obtenerImagenesURLSabores(1);
	var imagenHawayana = obtenerImagenesURLSabores(2);
	var imagenVegetariana = obtenerImagenesURLSabores(3);

	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();
	var arregloSabores2 = new Array();


	for (var i = 1; i <= cantidadPizzas; i++) {

		var select = document.getElementById(`selectorS2${i}`);
		var selectedOperation = select.options[select.selectedIndex].value;

		arregloSabores2.push(selectedOperation);

		verificarImageneSabores(selectedOperation, 2, i, imagenNapolitana, imagenMexicana, imagenHawayana, imagenVegetariana);
		verificarPizzaSeleccionadaSabor(selectedOperation, 2, i, sabor1, sabor2, sabor3, sabor4);
	}
	validarSelector1Con2(2, 1);
	verificarHabilitarDeshabilitarCheckBox();
}



function obtenerImagenesURLSabores(numero) {

	let imagen = datos.pizzas[numero].url_Imagen;
	return imagen;
}



function verificarImageneSabores(valor, sabor1_o_2, i, imagen1, imagen2, imagen3, imagen4) {

	let mensaje = `<img  class="imagenesSabores" id="imagenSabor1${i}"   `;


	if (valor == "Ninguno" && sabor1_o_2 == 2) {
		document.getElementById(`imagenS${sabor1_o_2}${i}`).innerHTML = "";
	} else if (valor == "Napolitana") {
		mensaje += `src="${imagen1}" > `;

		document.getElementById(`imagenS${sabor1_o_2}${i}`).innerHTML = mensaje;
	} else if (valor == "Mexicana") {
		mensaje += `src="${imagen2}" > `;

		document.getElementById(`imagenS${sabor1_o_2}${i}`).innerHTML = mensaje;
	} else if (valor == "Hawayana") {
		mensaje += ` src="${imagen3}" >  `;

		document.getElementById(`imagenS${sabor1_o_2}${i}`).innerHTML = mensaje;
	} else {

		mensaje += ` src="${imagen4}" >  `;

		document.getElementById(`imagenS${sabor1_o_2}${i}`).innerHTML = mensaje;
	}
}


function verificarPizzaSeleccionadaSabor(valor, sabor1_o_2, i, sabor1, sabor2, sabor3, sabor4) {


	let mensaje = "Ingredientes adicionales ";

	if (valor == "Ninguno" && sabor1_o_2 == 2) {

		document.getElementById(`sabores${sabor1_o_2}${i}`).innerHTML = mensaje + "(" + "Escogió ninguna" + "):";

	} else if (valor == "Napolitana") {

		document.getElementById(`sabores${sabor1_o_2}${i}`).innerHTML = mensaje + "(" + "Pizza " + sabor1 + "):";
	} else if (valor == "Mexicana") {

		document.getElementById(`sabores${sabor1_o_2}${i}`).innerHTML = mensaje + "(" + "Pizza " + sabor2 + "):";

	} else if (valor == "Hawayana") {

		document.getElementById(`sabores${sabor1_o_2}${i}`).innerHTML = mensaje + "(" + "Pizza " + sabor3 + "):";

	} else {
		document.getElementById(`sabores${sabor1_o_2}${i}`).innerHTML = mensaje + "(" + "Pizza " + sabor4 + "):";
	}
}

function obtenerAdicionalesJSON(numero) {

	let adicional = datos.adicional[numero].nombre_ingrediente;

	return adicional;
}



function generarCheckBoxAmbosSabores() {

	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();

	for (var i = 1; i <= cantidadPizzas; i++) {

		generarCheckBox(1, i);
		generarCheckBox(2, i);
	}
}

function generarCheckBox(idBox, idCiclo) {

	var check1 = "";

	for (let i = 0; i < datos.adicional.length; i++) {
		check1 += `
		<div class="form-check form-check-inline" onclick="cargarBotonCF_and_obtenerAdicionales()" >
		<input class="form-check-input" type="checkbox"  name="box${idBox + "" + idCiclo}" id="box${idBox + "" + idCiclo + "" + i}" value="${i}">
		<label style="margin:10px;" class="form-check-label" for="box${idBox + "" + idCiclo}">${obtenerAdicionalesJSON(i)}</label>
		</div>
		`;
	}

	document.getElementById(`checkBox` + idBox + idCiclo).innerHTML = check1;
}






function obtenerArregloSabores(tipoSabor1_o_2) {

	cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();
	let arregloSabores = new Array();

	for (var i = 1; i <= cantidadPizzas; i++) {
		var select = document.getElementById(`selectorS${tipoSabor1_o_2}${i}`);
		var selectedOperation = select.options[select.selectedIndex].value;

		arregloSabores.push(selectedOperation);
	}
	return arregloSabores;
}


function obtenerArregloCheckBox() {

	let checkboxes = (document.querySelectorAll(`.form-check-input`));
	let arreglo = [];

	let cantPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();

	console.log(cantPizzas);

	for (let x = 1; x <= cantPizzas; x++) {

		for (let i = 0; i < checkboxes.length; i++) {

			if (checkboxes[i].checked && (checkboxes[i].name == `box${1 + "" + x}`)) {
				arreglo.push(checkboxes[i].value + "-" + 1 + "-" + x);
			}


			if (checkboxes[i].checked && (checkboxes[i].name == `box${2 + "" + x}`)) {

				arreglo.push(checkboxes[i].value + "-" + 2 + "-" + x);
			}
		}
	}
	return arreglo;
}


function cargarBotonCF_and_obtenerAdicionales() {
	obtenerArregloCheckBox();
	mostrarBotonCalcularFactura();
}


function obtenerAdicionalPrecio(numero) {
	let precioAdicional = datos.adicional[numero].valor;
	return precioAdicional;
}


function separarArregloAdicionalesPizzas() {

	let arreglo = obtenerArregloAdicionalesURL();
	let arre = arreglo.split(",");
	return arre;
}


function separarTamaniosEnArreglo() {

	let tamaniosPizzas = obtenerTamaniosPizzasURL_Adicionales_Sabores();
	let arreglo = tamaniosPizzas.split(",");

	return arreglo;
}


function separarSaboresEnArreglo(tipo_sabor) {
	let sabores = obtenerSaboresURL(tipo_sabor);

	if (sabores != null) {

		arreglo = sabores.split(",");
	}
	return arreglo;
}


function deseleccionar_todoCheckBox(y) {
	let checkBox = (document.querySelectorAll(`.form-check-input`));
	let x = 0;

	for (let i = 0; i < checkBox.length; i++) {
		if (checkBox[i].name == `box${2 + "" + y}`) {
			checkBox[i].checked = 0;
		}
	}
}


function deshabilitarCheckBox(idSelect, idCiclo) {
	let elementos = document.getElementsByName(`box${idSelect + "" + idCiclo}`);

	for (let x = 0; x < elementos.length; x++) {
		elementos[x].disabled = true;
	}
}


function habilitarCheckBox(idSelect, idCiclo) {
	let elementos = document.getElementsByName(`box${idSelect + "" + idCiclo}`);

	for (let i = 0; i < elementos.length; i++) {
		elementos[i].disabled = false;
	}
}


function verificarNingunoDesactivar(seleccionado, i) {
	if (seleccionado == "Ninguno") {
		deshabilitarCheckBox(2, i);
		deseleccionar_todoCheckBox(i);
	}
}

function verificarActivar(seleccionado, i) {
	if (seleccionado != ("Ninguno")) {
		habilitarCheckBox(2, i);
	}
}


function verificarHabilitarDeshabilitarCheckBox() {
	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();
	for (var i = 1; i <= cantidadPizzas; i++) {
		var select = document.getElementById(`selectorS2${i}`);
		var selectedOperation = select.options[select.selectedIndex].value;

		verificarNingunoDesactivar(selectedOperation, i);
		verificarActivar(selectedOperation, i);
	}
}



function validarSelector1Con2(idSabor1, idSabor2) {

	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();

	for (var i = 1; i <= cantidadPizzas; i++) {
		var select = document.getElementById(`selectorS${idSabor1}${i}`);
		var selectedOperation = select.options[select.selectedIndex].value;
		let sabores = selectedOperation;

		if (sabores == "Ninguno" && idSabor1 == 2) {
			document.getElementById(`napol${idSabor2}${i}`).disabled = false;
			document.getElementById(`mex${idSabor2}${i}`).disabled = false;
			document.getElementById(`hawa${idSabor2}${i}`).disabled = false;
			document.getElementById(`vege${idSabor2}${i}`).disabled = false;

		} else

			if (sabores == "Napolitana") {
				document.getElementById(`mex${idSabor2}${i}`).disabled = false;
				document.getElementById(`hawa${idSabor2}${i}`).disabled = false;
				document.getElementById(`vege${idSabor2}${i}`).disabled = false;
				document.getElementById(`napol${idSabor2}${i}`).disabled = true;
			} else if (sabores == "Mexicana") {
				document.getElementById(`napol${idSabor2}${i}`).disabled = false;
				document.getElementById(`hawa${idSabor2}${i}`).disabled = false;
				document.getElementById(`vege${idSabor2}${i}`).disabled = false;
				document.getElementById(`mex${idSabor2}${i}`).disabled = true;
			} else if (sabores == "Hawayana") {
				document.getElementById(`napol${idSabor2}${i}`).disabled = false;
				document.getElementById(`mex${idSabor2}${i}`).disabled = false;
				document.getElementById(`vege${idSabor2}${i}`).disabled = false;
				document.getElementById(`hawa${idSabor2}${i}`).disabled = true;
			} else if (sabores == "Vegetariana") {
				document.getElementById(`napol${idSabor2}${i}`).disabled = false;
				document.getElementById(`hawa${idSabor2}${i}`).disabled = false;
				document.getElementById(`mex${idSabor2}${i}`).disabled = false;
				document.getElementById(`vege${idSabor2}${i}`).disabled = true;
			}
	}
}

function getTamaniosPizzas() {
	let tamanios = [];

	for (let i = 1; i <= obtenerCantidadPizzas(); i++) {
		let select = document.getElementById(`selectorTamanios${i}`);
		let selectedOperation = select.options[select.selectedIndex].value;
		tamanios.push(selectedOperation);
	}
	return tamanios;
}



function obtenerTamaniosPizzasURL_Adicionales_Sabores() {
	let parametros = new URLSearchParams(window.location.search);
	let tamaniosPizzas = parametros.get('tamanios');
	return tamaniosPizzas;

}


function obtenerArregloAdicionalesURL() {

	let parametros = new URLSearchParams(window.location.search);

	let adicionales = parametros.get(`adicionales`);
	if (adicionales != null) {
		console.log(adicionales);
		return adicionales;
	} else {
		return 1;
	}
}


function obtenerSaboresURL(tipo_sabor) {

	let parametros = new URLSearchParams(window.location.search);
	let sabores = parametros.get(`sabores${tipo_sabor}`);
	return sabores;
}


async function cargarFuncionesFactura() {
	await leerJSON();
	nombrePizzeria();
	mostrarTabla();
}


function mostrarBotonCalcularFactura() {

	let boton = "";
	boton += `<input class="boton" id="botonCargarFactura" type="button"  value="Calcular Factura" onclick="location.href='factura.html?cantidad=${obtenerCantidadPizzasURL_Adicionales_Sabores()}&tamanios=${obtenerTamaniosPizzasURL_Adicionales_Sabores()}&sabores1=${obtenerArregloSabores(1)}&sabores2=${obtenerArregloSabores(2)}&adicionales=${obtenerArregloCheckBox()}'">
	 `;

	document.getElementById("botonCargaFactura").innerHTML = boton;
}


function mostrarTabla() {
	let tabla = "";
	let cantidadPizzas = obtenerTamaniosPizzasURL_Adicionales_Sabores();


	tabla += `
	  <table class='center' id="tabla">

	 <tr>
	  <th> Descripción </th>
	  <th> Valor</th>

	</tr>`;

	tabla += obtenerTablaPizzas();

	tabla += `<tr>
   <td> <b>Total:</b> </td>
   <td> <b> $ ${precioTotal}</b></td>

 </tr>`;

	tabla += "</table>";


	document.getElementById("tablaID").innerHTML = tabla;

}



function obtenerTablaPizzas() {
	let tamaniosPizzas = separarTamaniosEnArreglo();
	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();
	var arreglo = separarArregloAdicionalesPizzas();
	let cadena = "";
	var x;

	var valorTamanioPizza = "";

	for (var i = 1; i <= cantidadPizzas; i++) {

		x = i - 1;
		valorTamanioPizza = tamaniosPizzas[x];;
		if (valorTamanioPizza == "Mediano") {
			valorTamanioPizza = "Mediana";
		}
		if (valorTamanioPizza == "Pequeño") {
			valorTamanioPizza = "Pequeña";
		}

		precioTotal += identificarSaborPrecio(x);
		cadena += `<tr>
	 <td>Pizza ${valorTamanioPizza} ${identificarSabor(x)}</td>
	 <td> $ ${identificarSaborPrecio(x)}</td>
	 </tr>`;

		cadena += obtenerTablaAdicionales(i);
	}
	return cadena;
}


function obtenerTablaAdicionales(x) {

	let arregloAd = separarArregloAdicionalesPizzas();

	var cadena = "";
	if (arregloAd[0] != "") {



		for (let i = 0; i < arregloAd.length; i++) {

			let iteradorPizza = arregloAd[i].charAt(4) - 1;


			if (arregloAd[i].charAt(4) == x) {//Inicio
				precioTotal += obtenerPreciosAdicionalesURL_JSON(arregloAd[i].charAt(0));

				cadena += `<tr>
			<td>Adicional-${identificarTipoSabor(arregloAd[i].charAt(2), iteradorPizza)}-${obtenerAdicionalesJSON(arregloAd[i].charAt(0))}</td>
			<td> $ ${obtenerPreciosAdicionalesURL_JSON(arregloAd[i].charAt(0))}</td>
			</tr>`;

			} //Cierre

		}
	}
	return cadena;
}

function identificarPrecio(tipo_sabor,) {

	let sabores = separarSaboresEnArreglo(tipo_sabor);
	let rtaSabor;
	if (tipo_sabor == 1) {
		rtaSabor = sabores[i];
	} else {
		rtaSabor = sabores[i];
	}
	return rtaSabor;
}


function identificarSabor(x) {

	let sabores1 = separarSaboresEnArreglo(1);
	let sabores2 = separarSaboresEnArreglo(2);
	let sabor = "";

	if (sabores2[x] == "Ninguno") {
		sabor += sabores1[x];
	} else {
		sabor += "Mitad " + sabores1[x] + " y " + "Mitad " + sabores2[x];
	}
	return sabor;

}

function identificarTipoSabor(tipo_sabor, i) {

	let sabores = separarSaboresEnArreglo(tipo_sabor);

	let rtaSabor;
	if (tipo_sabor == 1) {
		rtaSabor = sabores[i];
	} else {
		rtaSabor = sabores[i];
	}
	return rtaSabor;
}



function identificarSaborPrecio(x) {

	let cantidadPizzas = obtenerCantidadPizzasURL_Adicionales_Sabores();

	let sabores1 = separarSaboresEnArreglo(1);
	let sabores2 = separarSaboresEnArreglo(2);
	let precio = 0;

	if (sabores2[x] == "Ninguno") {
		precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(1, x), validarTamaniosConNumeros(x));
	} else {

		if (sabores1[x] == "Napolitana" && (sabores2[x] == "Mexicana" || sabores2[x] == "Hawayana" || sabores2[x] == "Vegetariana")) {
			precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(1, x), validarTamaniosConNumeros(x));
		} else if (sabores2[x] == "Napolitana" && (sabores1[x] == "Mexicana" || sabores1[x] == "Hawayana" || sabores1[x] == "Vegetariana")) {
			precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(2, x), validarTamaniosConNumeros(x));

		} else if (sabores1[x] == "Mexicana" && (sabores2[x] == "Hawayana" || sabores2[x] == "Vegetariana")) {
			precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(1, x), validarTamaniosConNumeros(x));
		} else if (sabores2[x] == "Mexicana" && (sabores1[x] == "Hawayana" || sabores1[x] == "Vegetariana")) {
			precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(2, x), validarTamaniosConNumeros(x));
		} else if (sabores1[x] == "Hawayana" && (sabores2[x] == "Vegetariana")) {
			precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(1, x), validarTamaniosConNumeros(x));
		} else if (sabores2[x] == "Hawayana" && (sabores1[x] == "Vegetariana")) {
			precio = obtenerPreciosPizzasURL_JSON(validarSaboresConNumeros(2, x), validarTamaniosConNumeros(x));
		}
	}

	return precio;
}


function validarTamaniosConNumeros(i) {
	let tamanios = separarTamaniosEnArreglo();
	let valor = 0;

	if (tamanios[i] == "Grande") {
		valor = 0;
	} else if (tamanios[i] == "Mediano") {
		valor = 1;

	} else if (tamanios[i] == "Pequeño") {
		valor = 2;

	}
	return valor;
}


function validarSaboresConNumeros(tipo_sabor, i) {

	let sabores = separarSaboresEnArreglo(tipo_sabor);
	let valor = 0;

	if (sabores[i] == "Napolitana") {
		valor = 0;
	} else if (sabores[i] == "Mexicana") {
		valor = 1;
	} else if (sabores[i] == "Hawayana") {
		valor = 2;
	} else if (sabores[i] == "Vegetariana") {
		valor = 3;
	}

	return valor;
}


