// JavaScript Document
var num, error, memory, oper, pend = 0;

$(function(){
	num = $("#num");
	error = $("#error");
	memory = $("#memory");
	
	num.on("focus", cleanAll);
	
	$("#btn_to_m").on("click", function(){
		addValue(num.val());
	});
	
	$("#btn_from_m").on("click", function(){
		var children = memory.children();
		if (children.length > 0){
			var child = children.last();
			num.val(+child.html());
			child.remove();
			cleanError();
		} else {
			setError("* No existen valores en memoria");
		}
	});
	
	$("#btn_pow").on("click", function(){
		elevate(num.val(), 2);
		cleanError();
	});
	
	$("#btn_inverse").on("click", function(){
		divide(1, +num.val());
	});
	
	$("#btn_sqrt").on("click", function(){
		var value = num.val();
		if (value >= 0){
			num.val(Math.sqrt(value));
			cleanError();
		} else {
			setError("* Obtencion de un n\u00FAmero complejo");
		}
	});
	
	$("#btn_whole_part").on("click", function(){
		var value = num.val();
		num.val((value >= 0) ? Math.floor(value) : -Math.ceil(value));
		cleanError();
	});
	
	$("#btn_potency_of_two").on("click", function(){
		elevate(2, num.val());
		cleanError();
	});
	
	$("#btn_n_factorial").on("click", function(){
		var value = num.val();
		for(var n = value-1; n > 0; n--){
			value *= n;
		}
		num.val(value);
		cleanError();
	});
	
	$("#btn_summation").on("click", function(){
		executeOperationInCsvFormat(0, function (total, x){
			return total += x;
		});
	});
	
	$("#btn_product").on("click", function(){
		executeOperationInCsvFormat(1, function (total, x){
			return total *= x;
		});
	});
	
	$("#btn_sum").on("click", function(){
		initOper("+");
	});
	
	$("#btn_subtraction").on("click", function(){
		initOper("-");
	});
	
	$("#btn_multiplication").on("click", function(){
		initOper("*");
	});
	
	$("#btn_division").on("click", function(){
		initOper("/");
	});
	
	$("#btn_elevate").on("click", function(){
		initOper("^");
	});
	
	$("#btn_calculate").on("click", function(){
		if (oper === "+"){ num.val(pend + Number(num.val())); }
		else if (oper === "-"){ num.val(pend - num.val()); }
		else if (oper === "*"){ num.val(pend * num.val()); }
		else if (oper === "/"){ divide(pend, +num.val()); }
		else if (oper === "^"){ elevate(pend, num.val()); }
	});
});

function cleanAll(){
	clean(num);
	cleanError();
}

function clean(obj){
	obj.val("");
	obj.html("");
}

function cleanError(){
	clean(error);
	error.parent().addClass("d-none").removeClass("d-table-cell");
}

function setError(msj){
	error.html(msj);
	error.parent().addClass("d-table-cell").removeClass("d-none");
}

function divide(op1, op2){
	if (op2 !== 0){
		num.val(op1/op2);
		cleanError();
	} else {
		setError("* No se puede dividir por 0");
	}
}

function elevate(op1, op2){
	num.val(Math.pow(op1, op2));
}

function executeOperationInCsvFormat(valInit, callback){
	var total = valInit;
	num.val().split(",").forEach(function(x){
		total = callback(total, Number(x));
	});
	num.val(total);
	cleanError();
}

function initOper(operValue){
	oper = operValue;
	pend = Number(num.val());
	cleanAll();
}

function addValue(value){
	if (value !== ""){
		newValue = createValue(+value);
		memory.append(newValue);
		onValueSaved(newValue); //Esta funcion esta definida en el archivo calculadora_memory.js
		cleanAll();
	} else {
		setError("* Introduzca un n\u00FAmero a guardar");
	}
}

function createValue(value){
	return $("<div class=\"border-info border-bottom value-memory\">"+value+"</div>");
}