<?php
$to = "calebjs2001@gmail.com";
$subject = "Test Email";
$message = "This is a test email from your server.";
$headers = "From: cjsigmon@cjsigmon.com\r\n";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully!";
} else {
    echo "Email sending failed. Check your server configuration.";
}
?>
