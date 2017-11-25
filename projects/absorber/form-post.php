<?php

$sendto   = "sto.rad25@gmail.com"; // почта, на которую будет приходить письмо
$username = $_POST['NAME'];   // сохраняем в переменную данные полученные из поля c именем
$usertel = $_POST['PHONE']; // сохраняем в переменную данные полученные из поля c телефонным номером
$service = $_POST['service'];

// Формирование заголовка письма
$subject  = "Заказ на сатйе";
$headers  = "From: http://restavracia-amortizatorov.kiev.ua\r\n";
//$headers .= "Reply-To: ". strip_tags($service) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Cообщение с сайта</h2>\r\n";
$msg .= "<p><strong>От кого:</strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Услуга:</strong> ".$service."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$usertel."</p>\r\n";
$msg .= "</body></html>";

// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {

    header('Location: /thank.php');
} else {
    echo "<center><p>Что-то пошло не так! Пожалуйста позвоните по номеру +38 073 156 73 15 для связи с менеджером</p></center>";
}

?>