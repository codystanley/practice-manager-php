<?php
require_once 'connections.php';

$tableName = "OfficeHours";

$url = "https://www.appsheet.com/api/v2/apps/$appId/tables/$tableName/Find";

// Create the request body (adjust Locale, Location, Timezone, and UserSettings as needed)
$requestBody = json_encode([
    "Action" => "Find",
    "Properties" => (object)[], // Leave this empty to fetch all properties
    "Rows" => (object)[] // Leave this empty to fetch all rows
]);

// Initialize cURL session
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "ApplicationAccessKey: $appAccessKey",
    "Content-Type: application/json"
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);

// Execute cURL session
$hoursResponse = curl_exec($ch);

// Check for errors
if (curl_errno($ch)) {
    echo 'Error:' . curl_error($ch);
} else {
    print_r($hoursResponse);
}

// Close cURL session
curl_close($ch);

// Output the response
echo $hoursResponse;
?>
