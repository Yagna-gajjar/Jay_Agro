<?php
require_once 'dth.inc.php';
if ($_SERVER["REQUEST_METHOD"] == 'GET') {
    global $pdo;

    $dthname = $_GET['dthname'];

    $query = "SELECT dthname, HD, DD, Truck, Application, Formation, a, b FROM dthrig WHERE  dthname = $dthname";
    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $pdo = null;
    $stmt = null;

    echo json_encode($items);
}

die();