<?php
require_once 'dth.inc.php';

if ($_SERVER["REQUEST_METHOD"] == 'POST') {
    global $pdo;

    $data = json_decode(file_get_contents("php://input"));

    $dthname = $data->dthname;
    $name = $data->name;
    $Email = $data->Email;
    $PurposeofRequirement = $data->PurposeofRequirement;
    $RequirementDetails = $data->RequirementDetails;

    $emailsubject = "jayagro engneering";
    $emailmessage = $dthname . ", " . $name . ", " . $PurposeofRequirement . ", " . $RequirementDetails;
    $headers = 'From: yagnagajjar364@gmail.com';
    $success = mail($Email, $emailsubject, $emailmessage, $headers);

    if ($success) {
        http_response_code(200);
        echo 'Email sent successfully';
    } else {
        http_response_code(500);
        echo 'Failed to send email';
    }

    $query = "INSERT INTO enquiries (nameofproduct, name, Email, PurposeofRequirement, RequirementDetails) VALUES (?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$dthname, $name, $Email, $PurposeofRequirement, $RequirementDetails]);

    $pdo = null;
    $stmt = null;
}
die();