/* Cookies borrar anteriores ---------------------------------------- */
$.removeCookie('tp_figuras');
$.removeCookie('tp_figuras_v220');



/* Cookies Nuevo Nombre --------------------------------------------- */
var Cookie_Nombre = "tp_figuras_v250";



/* Detector de Internet Explorer ------------------------------------ */
var Detector_IE = !!navigator.userAgent.match(/Trident/);
if (Detector_IE) {
	$("html").addClass("navegador_IE");
}


/* Detector de Sistema Operativo ------------------------------------ */
if (navigator.appVersion.indexOf("Mac")!=-1){
	$("html").addClass("SO_Mac");
}

if (!!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){
	$("html").addClass("SO_iOS");
}



/* Atados de teclado ------------------------------------------------ */
var ctrlKey = false;
var shiftKey = false;
var zKey = false;
$(document).on('keydown keyup',function(e) {
	if (e.which === 17) {
		ctrlKey = e.type=='keydown';
	}
	if (e.which === 16) {
		shiftKey = e.type=='keydown';
	}
	if (e.which === 90) {
		zKey = e.type=='keydown';
	}
});



$(document).ready(function(){

	/* Ajuste Pantalla ---------------------------------------------- */
	var coeficiente_normal = 1;

	var Pantalla_Ancho = window.innerWidth;
	var Pantalla_Alto = window.innerHeight;

	var CSS_hoja_Ancho = 1000;
	var CSS_hoja_Alto = 708;

	if ( (CSS_hoja_Ancho * Pantalla_Alto / CSS_hoja_Alto) > Pantalla_Ancho ){
		var JS_hoja_Ancho = Pantalla_Ancho;
		var JS_hoja_Alto = CSS_hoja_Alto * Pantalla_Ancho / CSS_hoja_Ancho;
	} else {
		var JS_hoja_Ancho = CSS_hoja_Ancho * Pantalla_Alto / CSS_hoja_Alto;
		var JS_hoja_Alto = Pantalla_Alto;
	}

	if ($.cookie('tp_figuras_ajuste') === null || $.cookie('tp_figuras_ajuste') === "" || $.cookie('tp_figuras_ajuste') === "null" || $.cookie('tp_figuras_ajuste') === undefined){
			
			// No cookie

	} else {

		$.removeCookie('tp_figuras_ajuste');

		var coeficiente_normal = CSS_hoja_Ancho / JS_hoja_Ancho;
		var coeficiente_ajuste = JS_hoja_Ancho / CSS_hoja_Ancho;

		var CSS_figura_width = 114;
		var CSS_figura_line = 76;

		var CSS_figura_span_width = 80;
		var CSS_figura_span_top = 17;

		var CSS_SVG_circulo_width = 66;
		var CSS_SVG_cuadrado_width = 60;
		var CSS_SVG_triangulo_width = 76;
		var CSS_SVG_triangulo_height = 65.82;

		$("#hoja").width( JS_hoja_Ancho );
		$("#hoja").height( JS_hoja_Alto );

		var AJU_figura = ".original";
		$(AJU_figura).css({
			"height":CSS_figura_width * coeficiente_ajuste+"px",
			"line-height":CSS_figura_line * coeficiente_ajuste+"px",
			"width":CSS_figura_width * coeficiente_ajuste+"px"
		});

		var AJU_figura_span = ".original span";
		$(AJU_figura_span).css({
			"height":CSS_figura_span_width * coeficiente_ajuste+"px",
			"top":CSS_figura_span_top * coeficiente_ajuste+"px",
			"width":CSS_figura_span_width * coeficiente_ajuste+"px"
		});

		if ($(".figura").hasClass("original") == true){
			var AJU_SVG_circulo = ".circulo svg";
			$(AJU_SVG_circulo).css({
				"height":CSS_SVG_circulo_width * coeficiente_ajuste+"px",
				"width":CSS_SVG_circulo_width * coeficiente_ajuste+"px"
			});
			var AJU_SVG_cuadrado = ".cuadrado svg";
			$(AJU_SVG_cuadrado).css({
				"height":CSS_SVG_cuadrado_width * coeficiente_ajuste+"px",
				"width":CSS_SVG_cuadrado_width * coeficiente_ajuste+"px"
			});
			var AJU_SVG_triangulo = ".triangulo svg";
			$(AJU_SVG_triangulo).css({
				"height":CSS_SVG_triangulo_height * coeficiente_ajuste+"px",
				"width":CSS_SVG_triangulo_width * coeficiente_ajuste+"px"
			});
		}
	}
	/* Ajuste Pantalla ---------------------------------------------- */




	/* Figuras Rotacion --------------------------------------------- */
	function rotacion(objeto,max,min){
		var fig_obj = '.'+objeto+' span';
		$(fig_obj).each(function(){
			var rNum = Math.floor(Math.random() * (max - min + 1)) + min;
			if (rNum == 90){
				rNum = 77;
			}
			if (objeto == "cuadrado" && rNum == 45){
				rNum = 37;
			}
			$(this).css({
				'-webkit-transform':'rotate('+rNum+'deg)',
				'-moz-transform':'rotate('+rNum+'deg)',
				'transform':'rotate('+rNum+'deg)'
			});
			$(this).parent().attr('data-rotacion', rNum);
		});
	}


	/* Figuras Posicion --------------------------------------------- */
	function posicion(objeto,maxBottom,minBottom,maxRight,minRight){
		$(objeto).each(function(){
			var bottomNum = Math.floor(Math.random() * (maxBottom - minBottom + 1)) + minBottom;
			var rightNum = Math.floor(Math.random() * (maxRight - minRight + 1)) + minRight;
			$(this).css({
				'top':'auto',
				'left':'auto',
				'bottom':bottomNum,
				'right':rightNum
			});

			var fig_ini = $( this );
			var fig_pos = fig_ini.position();
			$(this).css({
				'top':fig_pos.top,
				'left':fig_pos.left,
				'bottom':'auto',
				'right':'auto'
			});
		});
	}


	/* Figuras Atributos unidad px ---------------------------------- */
	function attr_quitar_px(valor){
		var extension = valor.indexOf('px');
		if (valor == 'auto'){
			return valor;
		} else {
			return valor.substring(0, extension);
		}
	}
	function attr_agregar_px(valor){
		if (valor == 'auto'){
			return valor;
		} else {
			return valor+'px';
		}
	}




	/* Deshacer ----------------------------------------------------- */
	var DeshacerArray = [];
	function DeshacerCrear(estado,id,top,left){
		$( "#deshacer" ).removeClass("menu_desactivado").addClass("menu_activado");
		DeshacerArray.push({estado: estado, id: id, top: top, left: left});
	}
	function Deshacer(){
		if (DeshacerArray.length > 0){
			var Deshacer_ultimo = $(DeshacerArray).get(-1);
			if (Deshacer_ultimo["estado"] == "grupo" && grupoEstado == "abierto"){
				$(".grupo").animate({
					'top':Deshacer_ultimo["top"],
					'left':Deshacer_ultimo["left"]
					},160
				);
				DeshacerBorrar();
			} else {
				$("#"+Deshacer_ultimo["id"]).animate({
					'top':Deshacer_ultimo["top"],
					'left':Deshacer_ultimo["left"],
					},160
				);
			}
			DeshacerArray.pop();
		}
		if (DeshacerArray.length == 0){
			DeshacerBorrar();
		}
	}
	function DeshacerBorrar(){
		DeshacerArray.length = 0;
		$( "#deshacer" ).addClass("menu_desactivado").removeClass("menu_activado");
	}
	$(document).keydown(function(e){
		if( ctrlKey && zKey ){
			Deshacer();
			estadisticas('teclado', 'Deshacer'); /* Analytics */
		}
	});
	$( "#deshacer" ).click(function(event) {
		event.preventDefault();
		Deshacer();
	});


	/* Grupo de Figuras --------------------------------------------- */
	var grupoArray = [];
	var grupoEstado = 'cerrado';
	var grupoBoton = 'desactivado';


	/* Grupo Boton Texto -------------------------------------------- */
	function grupoBotonTexto(texto){
		var AgruparBotonID = "#agrupar a";
		if (texto == "Crear"){
			$( AgruparBotonID ).text( "Agrupar" );
		}
		if (texto == "Seleccionar"){
			$( AgruparBotonID ).text( "Seleccionar figuras" );
		}
		if (texto == "Desagrupar"){
			$( AgruparBotonID ).text( "Desagrupar" );
		}
	}


	/* Grupo Verificar ---------------------------------------------- */
	function grupoVerificacion(estado){
		if (estado == "Solitario"){
			if (grupoEstado == 'abierto' && grupoArray.length == 1){
				grupoBorrar();
			}
		}
		if (estado == "Agrupando"){
			if (grupoEstado == 'abierto' && grupoVerificacion("Estatico")){
				grupoBotonTexto("Desagrupar");
			}
		}
		if (estado == "Estatico"){
			var grupo_pos_top = parseFloat(attr_quitar_px($(".grupo").css("top")));
			var grupo_pos_left = parseFloat(attr_quitar_px($(".grupo").css("left")));
			if (grupo_pos_top == 0 && grupo_pos_left == 0){
				return true;
			} else {
				return false;
			}
		}
	}


	/* Grupo Icono -------------------------------------------------- */
	function grupoIcono(objeto){
		if ($(objeto+" img.grupo-icono").length == 0){
			$('<img class="grupo-icono objeto" src="img/grupo-icono.svg">').appendTo(objeto);
		} else {
			$(objeto+" img.grupo-icono").remove();
		}
	}


	/* Grupo Crear -------------------------------------------------- */
	function grupoCrear(objeto){

		if(grupoArray.indexOf(objeto) == -1){
			grupoArray.push(objeto);
		}

		var grupo_pos_top = attr_quitar_px($(".grupo").css("top"));
		var grupo_pos_left = attr_quitar_px($(".grupo").css("left"));
		var fig_add_pos_top = attr_quitar_px($('#'+objeto).css("top"));
		var fig_add_pos_left = attr_quitar_px($('#'+objeto).css("left"));


		if (grupo_pos_top < 0){
			var fig_agrupada_pos_top = Math.abs(grupo_pos_top) + parseFloat(fig_add_pos_top);
		} else {
			var fig_agrupada_pos_top = -Math.abs(grupo_pos_top) + parseFloat(fig_add_pos_top);
		}

		if (grupo_pos_left < 0){
			var fig_agrupada_pos_left = Math.abs(grupo_pos_left) + parseFloat(fig_add_pos_left);
		} else {
			var fig_agrupada_pos_left = -Math.abs(grupo_pos_left) + parseFloat(fig_add_pos_left);
		}

		$( ".solo" ).draggable( "disable" );
		$('#'+objeto).addClass("agrupado").removeClass("solo").css({"top":fig_agrupada_pos_top,"left":fig_agrupada_pos_left});
		$( ".agrupado" ).appendTo(".grupo");
		$( ".grupo" ).draggable( "enable" );
		grupoIcono('#'+objeto);
		$( ".solo" ).draggable( "enable" );

		if (grupoArray.length > 1){
			grupoVerificacion("Agrupando");
		}
	}


	/* Grupo Borrar ------------------------------------------------- */
	function grupoBorrar(objeto){

		if (typeof objeto === "undefined" || grupoArray.length == 2){
			var afectados = "todos";
		} else {
			var afectados = "uno";
		}

		$(".grupo .agrupado").each(function(){
			if (afectados == "todos"){
				var elemento = "#"+$(this).attr("id");
			} else {
				var elemento = objeto;
				$( elemento ).draggable( "enable" );
			}
			var fig_grupo_top = parseFloat(attr_quitar_px($(elemento).css("top"))) + parseFloat(attr_quitar_px($(".grupo").css("top")));
			var fig_grupo_left = parseFloat(attr_quitar_px($(elemento).css("left"))) + parseFloat(attr_quitar_px($(".grupo").css("left")));
			var fig_grupo_top_calculo = attr_quitar_px($("#hoja").css("height")) - attr_quitar_px($(elemento).css("height"));
			var fig_grupo_left_calculo = attr_quitar_px($("#hoja").css("width")) - attr_quitar_px($(elemento).css("width"));
			if (fig_grupo_top < 0){
				fig_grupo_top = 0;
			} else if (fig_grupo_top > fig_grupo_top_calculo){
				fig_grupo_top = attr_quitar_px($("#hoja").css("height")) - attr_quitar_px($(elemento).css("height"));
			}
			if (fig_grupo_left < 0){
				fig_grupo_left = 0;
			} else if (fig_grupo_left > fig_grupo_left_calculo){
				fig_grupo_left = attr_quitar_px($("#hoja").css("width")) - attr_quitar_px($(elemento).css("width"))
			}
			$(elemento).css({top: attr_agregar_px(fig_grupo_top), left: attr_agregar_px(fig_grupo_left), bottom:"auto", right:"auto"});
			$(elemento).appendTo("#hoja").removeClass("agrupado").addClass("solo");
			grupoIcono(elemento);

			if (afectados == "uno"){
				return false;
			}

			DeshacerBorrar();
		});
		
		if (afectados == "todos") {
			$( ".grupo" ).draggable( "disable" ).css({top:"0", left: "0"});
			$( ".figura" ).draggable( "enable" );
			grupoArray.length = 0;
			grupoEstado = 'cerrado';
			grupoBoton = 'desactivado';
			grupoBotonTexto("Crear");
		} else {
			grupoArray.splice( $.inArray(objeto, grupoArray), 1 );
		}
	}





	/* Inicio ------------------------------------------------------- */
	function inicio(){


		/* Deshacer Borrar ------------------------------------------ */
		DeshacerBorrar();


		/* Creacion de Figuras -------------------------------------- */
		$(".original").each(function(){
			$(this).hide();
			$(this).css({'top':'0','left':'0'});
		});


		for (var i=1; i<11; i++){
			$( ".original" ).clone().removeClass("original").appendTo( "#hoja" ).show();
		}

		var count = 1;
		$(".figura").each(function(){
			$(this).attr('id', 'fig_'+count);
			count++;
		});



		$( ".solo" ).draggable({
			containment: "#hoja",
			handle: ".objeto",
			scroll: false,
			drag: function() {
				grupoVerificacion("Solitario");
				
			},
			start: function() {
				DeshacerCrear("solo",$(this).attr("id"),$(this).css("top"),$(this).css("left"));
			}
		});

		$( ".grupo" ).draggable({
			handle: ".objeto",
			drag: function() {
				grupoBotonTexto("Desagrupar");
			},
			stop: function() {
				grupoVerificacion("Solitario");
			},
			start: function() {
				DeshacerCrear("grupo","grupo",$(this).css("top"),$(this).css("left"));
			}
		});

		$( ".grupo" ).draggable( "disable" );

		$( ".solo" ).click(function() {
			$( ".solo" ).draggable( "enable" );
		});


		
		/* Selector para agrupar figuras -------------------------------- */
		var MouseEstatico = "si";

		$( ".objeto" ).mousedown(function() {

			$(document).mousemove(function(){
				var MouseEstatico = "no";
			});

			var fig_agrupada_estado = $(this).closest(".figura").is(".agrupado");

			if (MouseEstatico == "si"){
				if (!shiftKey) {
					if (fig_agrupada_estado == false){
						var grupo_pos_top = parseFloat(attr_quitar_px($(".grupo").css("top")));
						var grupo_pos_left = parseFloat(attr_quitar_px($(".grupo").css("left")));
						if (grupoEstado == 'abierto' && grupoBoton == 'activado' && grupoVerificacion("Estatico")){
							grupoCrear($(this).closest(".figura").attr("id"));
						}
					}
				} else {
					if (fig_agrupada_estado == false){
						grupoEstado = 'abierto';
						grupoCrear($(this).closest(".figura").attr("id"));
						estadisticas('teclado', 'Agrupar Individual'); /* Analytics */
					} else {
						grupoBorrar('#'+$(this).closest(".figura").attr("id"));
						estadisticas('teclado', 'Desagrupar Individual'); /* Analytics */
					}
				}
			}
		});



		$(".figura").mouseover(function() {
			$( this ).css("z-index","2");
		}).mouseout(function() {
			$( this ).css("z-index","1");
		});



		rotacion("cuadrado",80,10);
		rotacion("triangulo",110,10);
		posicion(".figura",0, JS_hoja_Alto/2, JS_hoja_Ancho/1.6, 0);
	}
	inicio();




	/* Grupo Boton -------------------------------------------------- */
	$( "#agrupar" ).click(function(event) {
		event.preventDefault();
		if (grupoEstado == 'cerrado'){
			grupoEstado = 'abierto';
			grupoBoton = 'activado';
			grupoBotonTexto("Seleccionar");
		} else if (grupoEstado == 'abierto'){
			grupoBorrar();
		}
	});




	/* Cookies ------------------------------------------------------ */
	function cookieCrear(){
		$.cookie.json = true;
		$(".figura").bind( "mouseup", function() {
			var attrArray = [];
			for ( var i=1; i < $(".figura").length + 1; i++ ){
				
				var fig_id = "#fig_"+i;
				var fig_top = $(fig_id).css("top");
				var fig_left = $(fig_id).css("left");

				var attr_sin_coma = attr_quitar_px(fig_top)+";"+attr_quitar_px(fig_left)+";"+$(fig_id).attr('data-rotacion');
				attrArray.push({ id: $(fig_id).attr('id'), atributos: attr_sin_coma });
			}
			$.removeCookie(Cookie_Nombre);
			$.cookie(Cookie_Nombre, attrArray, { expires: 365 });
		});
	}
	cookieCrear();




	if ($.cookie(Cookie_Nombre) === null || $.cookie(Cookie_Nombre) === "" || $.cookie(Cookie_Nombre) === "null" || $.cookie(Cookie_Nombre) === undefined){
		
		// No cookie

	} else {
		$.cookie.json = true;
		var cookieArray = $.cookie(Cookie_Nombre);

		for (var i=0;i < $(".figura").length;i++){
			var fig_id = "#"+cookieArray[i]['id'];
			var fig_attr_array = cookieArray[i]['atributos'].split(';');

			var fig_top = attr_agregar_px(fig_attr_array[0]);
			var fig_left = attr_agregar_px(fig_attr_array[1]);

			$(fig_id).css({
				'top': fig_top,
				'left': fig_left
			});
			$(fig_id).find("span").css({
				'-webkit-transform':'rotate('+fig_attr_array[2]+'deg)',
				'-moz-transform':'rotate('+fig_attr_array[2]+'deg)',
				'transform':'rotate('+fig_attr_array[2]+'deg)'
			});
			$(fig_id).attr('data-rotacion', fig_attr_array[2]);
		}
	}




	/* PDF Formulario de envio de Array ----------------------------- */
	$("#generarpdf").click(function(event){
	    event.preventDefault();

	    grupoBorrar();

		var phpArray = [];

		for ( var i=1; i < $(".figura").length + 1; i++ ){
			var fig_id = "#fig_"+i;
			if ($(fig_id).hasClass("original") == false){
				var fig_top = $(fig_id).css("top");
				var fig_left = $(fig_id).css("left");
				var fig_forma_class = $(fig_id).attr('class');
				if (fig_forma_class.indexOf('circulo') > -1){
					fig_forma = "circulo";
				} else if (fig_forma_class.indexOf('cuadrado') > -1){
					fig_forma = "cuadrado";
				} else if (fig_forma_class.indexOf('triangulo') > -1){
					fig_forma = "triangulo";
				}
				var attr_sin_coma = attr_quitar_px(fig_top)*coeficiente_normal+";"+attr_quitar_px(fig_left)*coeficiente_normal+";"+$(fig_id).attr('data-rotacion');
				phpArray.push({ id: $(fig_id).attr('id'), atributos: attr_sin_coma , forma: fig_forma });
			}
		}

	    $("#informacion").val(JSON.stringify(phpArray));
	    $("#formulario").submit();
	});




	/* Reinicio figuras y cookie ------------------------------------ */
	$("#reiniciar_aceptar").click(function(event){
		event.preventDefault();

		grupoBorrar();

		$.removeCookie(Cookie_Nombre);

		$(".figura").each(function(){
			if ($(this).hasClass("original") == false){
				$(this).remove();
			}
		});

		inicio();
		cookieCrear();
	});



	/* Ajuste Pantalla ---------------------------------------------- */
	$('#ajustar_aceptar').click(function(event) {
		event.preventDefault();
		$.removeCookie(Cookie_Nombre);
		$.removeCookie('tp_figuras_ajuste');
		$.cookie('tp_figuras_ajuste', 'Ajuste Pantalla');
	    location.reload();
	});




	/* Menu --------------------------------------------------------- */
	$( "#submenu" ).click(function() {
		$(this).toggleClass("menu_abierto");
	});



	$(".ajustar_accion").colorbox({
		inline:true,
		height:"380px",
		width:"420px",
		initialHeight:"380px",
		initialWidth:"420px",
		transition:"fade"
	});
	$("#ajustar_aceptar, #ajustar_cancelar").click(function(event){
		event.preventDefault();
		$.colorbox.close();
	});

	$(".reinicio_accion").colorbox({
		inline:true,
		height:"300px",
		width:"360px",
		initialHeight:"300px",
		initialWidth:"360px",
		transition:"fade"
	});
	$("#reiniciar_aceptar, #reiniciar_cancelar").click(function(event){
		event.preventDefault();
		$.colorbox.close();
	});

	$(".trabajopractico_accion").colorbox({
		inline:true,
		height:"460px",
		width:"560px",
		initialHeight:"460px",
		initialWidth:"560px",
		transition:"fade"
	});

	$(".info_accion").colorbox({
		inline:true,
		height:"460px",
		width:"600px",
		initialHeight:"400px",
		initialWidth:"500px",
		transition:"fade"
	});



	/* Menu Tooltip ------------------------------------------------- */
	if ($("html").hasClass("no-touch") == true){
		$('#menu li a').tooltip();
	}



	/* Estadisticas Eventos Google Analytics ------------------------------- */
	function estadisticas(accion,etiqueta){
		// console.log( "Accion: "+accion+" / Etiqueta: "+etiqueta );
	}

	$('#deshacer a').on('click', function() {
		estadisticas('click', 'Deshacer');
	});

	$('#agrupar a').on('click', function() {
		estadisticas('click', 'Agrupar');
	});

	$('#generarpdf a').on('mousedown', function() {
		estadisticas('click', 'Generar PDF');
	});

	$('#trabajopractico a').on('click', function() {
		estadisticas('click', 'Trabajo practico');
	});

	$('#reiniciar a').on('click', function() {
		estadisticas('click', 'Reiniciar');
	});

	$('#info a').on('click', function() {
		estadisticas('click', 'Informacion');
	});


});