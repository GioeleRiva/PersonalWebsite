<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer.php';
require 'Exception.php';
require 'SMTP.php';

if ($_POST)
{
    $info = '';
    if (isset($_POST['info']) && $_POST['info'] != '')
    {
        $info = $_POST['info'];
        $info = htmlentities($info, ENT_COMPAT | ENT_QUOTES, 'UTF-8', true);
    }
    else
    {
        return;
    }
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->AuthType = 'LOGIN';
    $mail->Host = '%SMTPHOST%';
    $mail->Port = 587;
    $mail->SMTPSecure = 'tls';
    $mail->SMTPAuth = true;
    $mail->Username = '%USERNAME%';
    $mail->Password = '%PASSWORD%';
    try
    {
        $mail->setFrom('%USERNAME%');
        $mail->addAddress('%DESTINATION%');
        $mail->Subject = 'Visita';
        $ip = getUserIpAddr();
        $details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));
        $mail->Body = 'IP: ' . $ip . '<br>CITY: ' . $details->city . '<br>POSTAL CODE: ' . $details->postal . '<br>REGION: ' . $details->region . '<br>COUNTRY: ' . $details->country . '<br>LOCATION: ' . $details->loc . '<br>TIMEZONE: ' . $details->timezone . '<br>ISP: ' . $details->org . '<br>BROWSER: ' . $_SERVER['HTTP_USER_AGENT'] . '<br>RENDERER: ' . $info;
        $mail->IsHTML(true);
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'http://www.google.com/bot.html') !== false)
        {
        } 
        else
        {
            $mail->send();
        }
    }
    catch(\Exception $e)
    {
	   //echo $e->errorMessage();
    }
}
function getUserIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}
?>
