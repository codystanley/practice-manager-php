<?php
$host = '34.23.248.39';
$db   = 'practice_manager';
$user = 'pm-user';
$pass = 'Password123!';


$dsn = "mysql:host=$host;dbname=$db";

try {
    // Set PDO options for timeouts
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 5 // Set a 5-second timeout
    ];

    $pdo = new PDO($dsn, $user, $pass, $options);

    // Prepare and execute the query
    $stmt = $pdo->prepare('SELECT * FROM practices');
    $stmt->execute();

    // Fetch all rows
    $rows = $stmt->fetchAll();

    // Convert rows to JSON
    $json = json_encode($rows);

    // Output the JSON response
    header('Content-Type: application/json');
    echo $json;

} catch (PDOException $e) {
    // Handle PDO exceptions, including timeouts
    http_response_code(500); // Set a 500 Internal Server Error status
    echo json_encode(['error' => 'Database connection error: ' . $e->getMessage()]);
} catch (Exception $e) {
    // Handle general exceptions
    http_response_code(500);
    echo json_encode(['error' => 'Error: ' . $e->getMessage()]);
}
