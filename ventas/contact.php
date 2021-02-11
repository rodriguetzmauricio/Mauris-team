<?php

// configure
$from = 'NeuralSoft - Contacto<contacto@webns.com>'; 
$sendTo = 'Ventas <ventas@neuralsoft.com>';
$subject = 'Contacto Landing - Presea Ventas';
$fields = array('name' => 'NOMBRE Y APELLIDO', 'surname' => 'EMPRESA', 'localidad' => 'LOCALIDAD', 'rubro' => 'RUBRO' , 'usuarios' => 'USUARIOS' , 'area' => 'COMO NOS CONOCIO:', 'phone' => 'TELEFONO', 'email' => 'MAIL', 'message' => 'MENSAJE / COMENTARIOS', 'gclid_field' => 'Gclid Google'); // array variable name => Text to appear in email
$lien="https://www.neuralsoft.com/presea";
$okMessage = 'Mensaje enviado. Nos contactaremos a la brevedad. Muchas gracias.<br><a href="'.$lien.'" alt="">Lo invitamos a navegar nuestro sitio web.</a>';
$errorMessage = 'Mensaje no enviado. Por favor intentelo nuevamente. Muchas gracias.';

// let's do the sending

try
{
    $emailText = "Datos del cliente\n=============================\n";

    foreach ($_POST as $key => $value) {

        if (isset($fields[$key])) {
            $emailText .= "$fields[$key]: $value\n";
        }
    }

    mail($sendTo, $subject, $emailText, "From: " . $from);
	
	/* Inicio valores antes de grabar */
	$nombre=$empresa=$localidad=$origen=$cantusu=$email=$codarea=$telefono=$mensaje=$rubro="";
	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
	$nombre				= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['name'])))));
	$empresa			= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['surname'])))));
	$localidad			= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['localidad'])))));
	$rubro				= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['rubro'])))));
	$cantusu			= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['usuarios'])))));
	$email				= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['email'])))));
	$codarea			= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['area'])))));
	$telefono			= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['phone'])))));
	$mensaje			= htmlspecialchars(addslashes(stripslashes(strip_tags(trim($_POST['message'])))));
	
	$nombre				= test_input($nombre);
	$empresa			= test_input($empresa);	
	$localidad			= test_input($localidad); 
	$origen				= $subject; 
	$cantusu			= test_input($cantusu);	
	$email				= test_input($email); 		
	$codarea			= test_input($codarea); 
	$telefono			= test_input($telefono);
	$mensaje			= test_input($mensaje);
	
	$mysqli = new mysqli('localhost','neuralwebmaster','X7)w3vA4UuZx','Neu4821efd');
	if ($mysqli->connect_error) {
		die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	}
	
	$query = "INSERT INTO rm7zpd3_contact (nombre, empresa, localidad, origen, cantusu, email, codarea, telefono, mensaje, rubro) 
								   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
	$statement = $mysqli->prepare($query);
	$statement->bind_param("ssssssssss", $nombre, $empresa, $localidad, $origen, $cantusu, $email, $codarea, $telefono, $mensaje, $rubro);

	if($statement->execute()){
		$responseArray = array('type' => 'success', 'message' => $okMessage);
	}else{
		die('Error : ('. $mysqli->errno .') '. $mysqli->error);
	}

	/* Fin */
	
    $responseArray = array('type' => 'success', 'message' => $okMessage);	
	
}
catch (\Exception $e)
{
    $responseArray = array('type' => 'danger', 'message' => $errorMessage);
}

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
    $encoded = json_encode($responseArray);
    
    header('Content-Type: application/json');
    
    echo $encoded;
}
else {
    echo $responseArray['message'];
}