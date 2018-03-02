// JavaScript Document
var num, error, oper, pend = 0;

function init(){
	num = document.getElementById("num");
	error = document.getElementById("error");
}

function cleanAll(){
	clean(num);
	clean(error);
}

function clean(obj){
	obj.value = "";
	obj.innerText = "";
}

function pow(){
	num.value = Math.pow(num.value, 2);
}

function divide(op1, op2){
	if (op2 !== 0){
		num.value = op1/op2;
	} else {
		error.innerText = "* No se puede dividir por 0";
	}
}

function inverse(){
	divide(1, +num.value);
}

function sqrt(){
	var value = num.value;
	if (value >= 0){
		num.value = Math.sqrt(value);
	} else {
		error.innerText = "* Obtencion de un n\u00FAmero complejo";
	}
}

function wholePart(){
	var value = num.value;
	num.value = (value >= 0) ? Math.floor(value) : -Math.ceil(value);
}

function initOper(operValue){
	oper = operValue;
	pend = Number(num.value);
	cleanAll();
}

function sum(){
	initOper("+");
}

function subtraction(){
	initOper("-");
}

function multiplication(){
	initOper("*");
}

function division(){
	initOper("/");
}

function elevate(){
	initOper("^");
}

function calculate(){
	if (oper === "+"){ num.value = pend + Number(num.value) }
	else if (oper === "-"){ num.value = pend - num.value }
	else if (oper === "*"){ num.value = pend * num.value }
	else if (oper === "/"){ divide(pend, +num.value); }
	else if (oper === "^"){ num.value = Math.pow(pend, num.value); }
}