<?php
// 1. Fetch practice data from your AppSheet app
// (You'll need to replace these placeholders with your actual AppSheet API configuration)
$appId = "d3d7048d-96b6-4450-b683-37ae994e1c21";
$appAccessKey = "V2-wQih4-IOxVa-43Luy-gwk1v-3r4uA-PEEso-eEnsw-HpyY9";
$tableName = "Practices"; // Assuming your table is named "Practices"

$url = "https://api.appsheet.com/api/v2/apps/$appId/tables/$tableName/Find";

$headers = array(
    "ApplicationAccessKey: $appAccessKey",
    "Content-Type: application/json"
);

$response = file_get_contents($url, false, stream_context_create([
    'http' => [
        'method' => 'GET',
        'header' => $headers
    ]
]));

$practices = json_decode($response, true);

// 2. Output practice data as JSON for JavaScript to use
echo json_encode($practices);
?>
