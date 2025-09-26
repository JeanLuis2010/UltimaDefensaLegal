<?php
if($_SERVER["REQUEST_METHOD"] == "POST"){
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $practice = $_POST['practice'];
    $city = $_POST['city'];
    $message = $_POST['message'];

    $to = "admin@ultimadefensalegal.com"; 
    $subject = "New Founding Attorney Application";
    $body = "Name: $fullname\nEmail: $email\nPhone: $phone\nPractice: $practice\nCity: $city\nMessage: $message";

    mail($to, $subject, $body);
    header("Location: thank-you.html");
}
?>
