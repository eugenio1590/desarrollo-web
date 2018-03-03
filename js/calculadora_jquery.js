// JavaScript Document
var num, error, oper, pend = 0;

$(function(){
	num = $("#num");
	error = $("#error");
	
	num.on("focus", cleanAll);
	
	$("#btn_pow").on("click", function(){
		elevate(num.val(), 2);
		clean(error);
	});
	
	$("#btn_inverse").on("click", function(){
		divide(1, +num.val());
	});
	
	$("#btn_sqrt").on("click", function(){
		var value = num.val();
		if (value >= 0){
			num.val(Math.sqrt(value));
			clean(error);
		} else {
			error.html("* Obtencion de un n\u00FAmero complejo");
		}
	});
	
	$("#btn_whole_part").on("click", function(){
		var value = num.val();
		num.val((value >= 0) ? Math.floor(value) : -Math.ceil(value));
		clean(error);
	});
	
	$("#btn_potency_of_two").on("click", function(){
		elevate(2, num.val());
		clean(error);
	});
	
	$("#btn_n_factorial").on("click", function(){
		var value = num.val();
		for(var n = value-1; n > 0; n--){
			value *= n;
		}
		num.val(value);
		clean(error);
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
	clean(error);
}

function clean(obj){
	obj.val("");
	obj.html("");
}

function divide(op1, op2){
	if (op2 !== 0){
		num.val(op1/op2);
		clean(error);
	} else {
		error.html("* No se puede dividir por 0");
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
	clean(error);
}

function initOper(operValue){
	oper = operValue;
	pend = Number(num.val());
	cleanAll();
}