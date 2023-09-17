<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to = "calebjs2001@gmail.com";
    $subject = "New Contact Form Submission from $name";

    // Email message
    $messageBody = "Name: $name\n";
    $messageBody .= "Email: $email\n";
    $messageBody .= "Message:\n$message";

    // Additional headers
    $headers = "From: cjsigmon@cjsigmon.com\r\n";

    // Send email
    if (mail($to, $subject, $messageBody, $headers)) {
        echo "Submitted! <br>";
    } else {
        echo "Sorry, there was an error sending your message.";
    }
}
?>
