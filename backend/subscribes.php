<?php
require_once 'dth.inc.php';

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    global $pdo;
    $data = json_decode(file_get_contents("php://input"));

    $Email = $data->Email;

    $query = "INSERT INTO subscribes (Email) VALUES (?)";

    $stmt = $pdo->prepare($query);
    $stmt->execute([$Email]);

    $pdo = null;
    $stmt = null;
}
die();