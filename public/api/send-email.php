<?php
// public/api/send-email.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Read JSON input
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON payload"]);
    exit();
}

// REQUIRED: Put your Resend API key here when uploading to cPanel
$resendApiKey = 're_3JBhdaNT_8B7dUxdXMvbmZQJtP1kEJ3EW'; 

$to = $input['to'] ?? '';
$subject = $input['subject'] ?? 'New Inquiry';
$html = $input['html'] ?? '';

// IMPORTANT: Since your domain isn't verified yet, you MUST use this testing address.
// Once you verify thecoconuttreetrails.com in Resend, change this back to 'info@thecoconuttreetrails.com'
$from = 'onboarding@resend.dev'; 

if (empty($to) || empty($html)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields (to, html)"]);
    exit();
}

// Prepare Resend API payload
$postData = json_encode([
    'from' => 'The Coconut Tree Trails <' . $from . '>',
    'to' => [$to],
    'subject' => $subject,
    'html' => $html,
]);

// Initialize cURL
$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resendApiKey,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(["success" => true, "data" => json_decode($response)]);
} else {
    http_response_code(500);
    echo json_encode([
        "error" => "Failed to send email", 
        "details" => $response,
        "curl_error" => $curlError
    ]);
}
?>
