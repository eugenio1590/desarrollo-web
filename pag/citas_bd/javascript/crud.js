// JavaScript Document

localStorage.galeria = localStorage.galeria || JSON.stringify(galeria_original);

var galeria = leerGaleria();

function leerGaleria(){
	return JSON.parse(localStorage.galeria);
}

function agregarCita(cita){
	var actual = galeria.push(cita);
	escribirGaleria(galeria);
	return actual;
}

function actualizarCita(actual, cita){
	galeria.splice(actual, 1, cita);
	escribirGaleria(galeria);
}

function eliminarCita(actual){
	galeria.splice(actual, 1);
	escribirGaleria(galeria);
}

function restaurarGaleria(){
	galeria = galeria_original;
	escribirGaleria(galeria);
}

function escribirGaleria(galeria){
	localStorage.galeria = JSON.stringify(galeria);
}