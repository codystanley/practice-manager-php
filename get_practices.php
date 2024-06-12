<?php
// 1. Fetch practice data from your AppSheet app
// (You'll need to replace these placeholders with your actual AppSheet API configuration)
$appId = "d3d7048d-96b6-4450-b683-37ae994e1c21";
$appAccessKey = "V2-wQih4-IOxVa-43Luy-gwk1v-3r4uA-PEEso-eEnsw-HpyY9";
$tableName = "Practices"; // Assuming your table is named "Practices"

$url = "https://www.appsheet.com/api/v2/apps/$appId/tables/$tableName/Find";

// Create the request body (adjust Locale, Location, Timezone, and UserSettings as needed)
$requestBody = json_encode([
    "Action" => "Find",
    "Properties" => [
        "Selector" => ["Select(Practices[PracticeID], Practices[PracticeName])"],
    ],
    "Rows" => (object)[] // Leave this empty to fetch all rows
]);

// Initialize cURL session
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "ApplicationAccessKey: $appAccessKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);            // Use POST method
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody); // Set the request body

// Execute cURL session
$response = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
}

// Close cURL session
curl_close($ch);

$practices = json_decode($response, true);

var_dump($practices); // For debugging purposes

// 2. Output practice data as JSON for JavaScript to use
echo json_encode($practices);
?>
