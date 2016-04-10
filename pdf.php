<?php
if (isset($_POST['informacion'])){

	$json = file_get_contents('php://input');
	$figurasArray = json_decode(stripslashes($_POST['informacion']), true);


	/* HTML --------------------------------------------------------------------- */
	$html = '<link rel="stylesheet" href="css/estilos_pdf.css">';
	foreach ($figurasArray as &$valor) {
		$forma_Valor = htmlspecialchars($valor[forma], ENT_QUOTES | ENT_HTML401, 'UTF-8');
		$id_Valor = htmlspecialchars($valor[id], ENT_QUOTES | ENT_HTML401, 'UTF-8');

		$atributosArray = explode(";", $valor[atributos]);

		$top_prop_Valor = htmlspecialchars($atributosArray[0], ENT_QUOTES | ENT_HTML401, 'UTF-8');
		$left_prop_Valor = htmlspecialchars($atributosArray[1], ENT_QUOTES | ENT_HTML401, 'UTF-8');
		$rotate_prop_Valor = htmlspecialchars($atributosArray[2], ENT_QUOTES | ENT_HTML401, 'UTF-8');

		$medida = 180.9636;
		$top_prop = $top_prop_Valor * 1.5874;
		$left_prop = $left_prop_Valor * 1.5874;
		$rotate_prop = $rotate_prop_Valor;

		if ($rotate_prop > 0){
			$theta = deg2rad ($rotate_prop);
			$x = $left_prop;
			$y = $top_prop;
			$xc = $x + ($medida/2);
			$yc = $y + ($medida/2);
			$xf = ($x-$xc) * cos($theta) + $xc - ($y-$yc) * sin($theta);
			$yf = ($y-$yc) * cos($theta) + $yc + ($x-$xc) * sin($theta);
			$xfin = $xf - $x;
			$yfin = $y - $yf;
			$top_prop_final = $y - $yfin;
			$left_prop_final = $x + $xfin;
		} else {
			$top_prop_final = $top_prop;
			$left_prop_final = $left_prop;
		}
		$html .= '<div class="figura '.$forma_Valor.'" id="'.$id_Valor.'" style="top:'.$top_prop_final.'px; left:'.$left_prop_final.'px; -webkit-transform:rotate('.$rotate_prop.'deg);-moz-transform:rotate('.$rotate_prop.'deg);-ms-transform:rotate('.$rotate_prop.'deg);transform:rotate('.$rotate_prop.'deg);"><div class="svg"></div></div>';
	}

	$rotulo_url = "img/rotulo_".date("Y").".jpg";
	if (file_exists($rotulo_url)) {
		$rotulo = $rotulo_url;
	} else {
		$rotulo = "img/rotulo.jpg";
	}

	$html .= '<div id="rotulo"><img src="'.$_SERVER['HTTP_REFERER'].''.$rotulo.'" width="411px" height="23px"></div>';



	/* PDF ---------------------------------------------------------------------- */
	require_once("dompdf/dompdf_config.inc.php");
	$dompdf = new DOMPDF();
	$dompdf->set_paper('A3', 'landscape');
	$dompdf->load_html($html);
	$dompdf->render();
	$dompdf->get_canvas()->get_cpdf()->setEncryption('', 'Prueba', array('print'));
	$dompdf->stream("Catedra_Cosgaya_TP_Figuras.pdf");
}
?>