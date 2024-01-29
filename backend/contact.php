<?php
require_once 'dth.inc.php';

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    global $pdo;
    $data = json_decode(file_get_contents("php://input"));
    $username = $data->username;
    $Email = $data->Email;
    $number = $data->number;
    $subject = $data->subject;
    $message = $data->message;

    $emailsubject = "jayagro engneering";
    $emailmessage = $username . ", " . $number . ", " . $subject . ", " . $message;
    $headers = 'From: yagnagajjar364@gmail.com';
    $success = mail($Email, $emailsubject, $emailmessage, $headers);

    if ($success) {
        http_response_code(200);
        echo 'Email sent successfully';
    } else {
        http_response_code(500);
        echo 'Failed to send email';
    }
    $query = "INSERT INTO contact_users (username, Email, number, subject, message) VALUES (?,? ,?,?,?)";

    $stmt = $pdo->prepare($query);
    $stmt->execute([$username, $Email, $number, $subject, $message]);
    $pdo = null;
    $stmt = null;

}
die();