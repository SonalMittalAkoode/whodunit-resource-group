<?php
/**
 * Whodunit Resource Group - Quote Request & Contact Form Mailer
 * 
 * Handles form submissions from contact.html and delivers formatted inquiries to eati@akoode.in
 */

// Strict error reporting settings for production
error_reporting(0);
ini_set('display_errors', 0);

// Configuration
$to_email       = 'eati@akoode.in';
$recipient_name = 'Whodunit Resource Group';
$site_name      = 'Whodunit Resource Group';

// Set response header
$is_ajax = (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') 
        || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

function send_response($status, $message, $redirect_url = 'thank-you.html') {
    global $is_ajax;
    if ($is_ajax) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code($status === 'success' ? 200 : 400);
        echo json_encode([
            'status'  => $status,
            'message' => $message
        ]);
        exit;
    } else {
        if ($status === 'success') {
            header('Location: ' . $redirect_url . '?status=success');
        } else {
            header('Location: contact.html?error=' . urlencode($message) . '#quote-form');
        }
        exit;
    }
}

// Accept only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_response('error', 'Invalid request method. Please submit the form.');
}

// Honeypot spam check - bots often fill hidden fields
if (!empty($_POST['website_url']) || !empty($_POST['hp_field'])) {
    // Silently succeed to fool spambots without sending email
    send_response('success', 'Your inquiry has been received.');
}

// Helper to sanitize inputs
function clean_input($data) {
    if (is_array($data)) {
        return array_map('clean_input', $data);
    }
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

// Helper to sanitize headers against injection attacks
function clean_header($data) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $data));
}

// Reject malformed and oversized submissions before processing them.
foreach ($_POST as $key => $value) {
    if (!is_string($value) || strlen($value) > ($key === 'additionalInformation' ? 4000 : 200)) {
        send_response('error', 'Please check the form fields and shorten any long entries.');
    }
}

// Read and sanitize form fields
$full_name      = clean_input($_POST['fullName'] ?? '');
$company        = clean_input($_POST['company'] ?? '');
$email          = clean_input($_POST['email'] ?? '');
$phone          = clean_input($_POST['phone'] ?? '');
$company_country = clean_input($_POST['companyCountryName'] ?? $_POST['companyCountry'] ?? '');

$product        = clean_input($_POST['product'] ?? '');
$quantity       = clean_input($_POST['quantity'] ?? '');
$destination    = clean_input($_POST['destinationCountryName'] ?? $_POST['destination'] ?? '');
$dest_port      = clean_input($_POST['destinationPort'] ?? '');
$specification  = clean_input($_POST['specification'] ?? '');
$packaging      = clean_input($_POST['packaging'] ?? '');
$shipment_window= clean_input($_POST['shipmentWindow'] ?? '');
$additional_info= clean_input($_POST['additionalInformation'] ?? '');

// Validation
$errors = [];

if (empty($full_name)) {
    $errors[] = 'Full Name is required.';
}
if (empty($company)) {
    $errors[] = 'Company Name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'A valid business email address is required.';
}
if (empty($product)) {
    $errors[] = 'Product required is mandatory.';
}
if (!is_numeric($quantity) || !is_finite((float)$quantity) || (float)$quantity <= 0) {
    $errors[] = 'Enter a quantity greater than zero in metric tonnes.';
}
if ($phone && (!preg_match('/^[+()0-9 .-]+$/', $phone) || strlen(preg_replace('/[^0-9]/', '', $phone)) < 7 || strlen(preg_replace('/[^0-9]/', '', $phone)) > 15)) {
    $errors[] = 'Enter a valid phone number.';
}
if (empty($destination)) {
    $errors[] = 'Destination country is required.';
}

if (!empty($errors)) {
    send_response('error', implode(' ', $errors));
}

// Clean fields for headers
$safe_name  = clean_header($full_name);
$safe_email = clean_header($email);
$safe_comp  = clean_header($company);

// Server domain for From header
$server_host = !empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'whodunitresourcegroup.com';
if (preg_match('/^[a-zA-Z0-9.-]+$/', $server_host) === 0) {
    $server_host = 'whodunitresourcegroup.com';
}
$from_email = 'no-reply@' . preg_replace('/^www\./i', '', $server_host);

$subject = "New Pulse Export Quote Request: " . ($safe_comp ? $safe_comp : $safe_name);

// Timestamp and metadata
$submission_time = date('F j, Y, g:i a e');
$user_ip         = clean_input($_SERVER['REMOTE_ADDR'] ?? 'Unknown');
$user_agent      = clean_input(substr($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown', 0, 200));

// Build HTML Email Body
$html_body = '
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>' . htmlspecialchars($subject, ENT_QUOTES, 'UTF-8') . '</title>
<style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #222222; background-color: #f4f6f8; margin: 0; padding: 20px; }
    .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e1e7ec; }
    .header { background: #0c2b23; color: #ffffff; padding: 26px 30px; border-bottom: 4px solid #c97a2b; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; color: #ffffff; }
    .header p { margin: 6px 0 0 0; font-size: 14px; color: #d0deda; }
    .content { padding: 30px; }
    .section-title { font-size: 16px; font-weight: 700; color: #0c2b23; border-bottom: 2px solid #eef2f5; padding-bottom: 8px; margin-top: 24px; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .section-title:first-of-type { margin-top: 0; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
    .data-table td { padding: 9px 12px; font-size: 14px; vertical-align: top; }
    .data-table tr:nth-child(even) { background-color: #f9fafb; }
    .data-table td.label { width: 38%; font-weight: 600; color: #4a5568; }
    .data-table td.value { width: 62%; color: #1a202c; font-weight: 500; }
    .notes-box { background: #fdfbf7; border-left: 4px solid #c97a2b; padding: 14px 16px; font-size: 14px; color: #2d3748; white-space: pre-wrap; margin-top: 8px; border-radius: 0 4px 4px 0; }
    .meta-footer { background: #edf2f7; padding: 16px 30px; font-size: 12px; color: #718096; border-top: 1px solid #e2e8f0; }
    .meta-footer p { margin: 3px 0; }
    .reply-btn-wrap { margin-top: 25px; text-align: center; }
    .reply-btn { display: inline-block; background: #0c2b23; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 14px; font-weight: 600; }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <h1>' . $site_name . '</h1>
        <p>New Commercial Pulse Export Inquiry</p>
    </div>
    <div class="content">
        <div class="section-title">Buyer &amp; Company Details</div>
        <table class="data-table">
            <tr>
                <td class="label">Full Name:</td>
                <td class="value"><strong>' . $full_name . '</strong></td>
            </tr>
            <tr>
                <td class="label">Company Name:</td>
                <td class="value">' . $company . '</td>
            </tr>
            <tr>
                <td class="label">Business Email:</td>
                <td class="value"><a href="mailto:' . $email . '" style="color:#0c2b23; font-weight:600;">' . $email . '</a></td>
            </tr>
            <tr>
                <td class="label">Phone / WhatsApp:</td>
                <td class="value">' . ($phone ? $phone : '<em>Not provided</em>') . '</td>
            </tr>
            <tr>
                <td class="label">Company Country:</td>
                <td class="value">' . ($company_country ? $company_country : '<em>Not specified</em>') . '</td>
            </tr>
        </table>

        <div class="section-title">Product &amp; Trade Specifications</div>
        <table class="data-table">
            <tr>
                <td class="label">Product Required:</td>
                <td class="value"><strong>' . $product . '</strong></td>
            </tr>
            <tr>
                <td class="label">Quantity (MT):</td>
                <td class="value"><strong>' . $quantity . '</strong></td>
            </tr>
            <tr>
                <td class="label">Destination Country:</td>
                <td class="value">' . $destination . '</td>
            </tr>
            <tr>
                <td class="label">Destination Port / City:</td>
                <td class="value">' . ($dest_port ? $dest_port : '<em>Not specified</em>') . '</td>
            </tr>
            <tr>
                <td class="label">Class &amp; Grade:</td>
                <td class="value">' . ($specification ? $specification : '<em>Standard Export Grade</em>') . '</td>
            </tr>
            <tr>
                <td class="label">Packaging:</td>
                <td class="value">' . ($packaging ? $packaging : '<em>Standard</em>') . '</td>
            </tr>
            <tr>
                <td class="label">Shipment Window:</td>
                <td class="value">' . ($shipment_window ? $shipment_window : '<em>Prompt / Open</em>') . '</td>
            </tr>
        </table>

        <div class="section-title">Message / Specification Notes</div>
        <div class="notes-box">' . (!empty($additional_info) ? $additional_info : 'No additional message provided.') . '</div>

        <div class="reply-btn-wrap">
            <a href="mailto:' . $email . '?subject=Re:%20Pulse%20Inquiry%20-%20' . rawurlencode($site_name) . '" class="reply-btn">Reply to ' . $full_name . '</a>
        </div>
    </div>
    <div class="meta-footer">
        <p><strong>Submitted on:</strong> ' . $submission_time . '</p>
        <p><strong>Sender IP:</strong> ' . $user_ip . '</p>
        <p><strong>User Agent:</strong> ' . $user_agent . '</p>
    </div>
</div>
</body>
</html>
';

// Build Plain-Text Alternative Body
$text_body = "====================================================\n";
$text_body .= "$site_name - New Quote Request\n";
$text_body .= "====================================================\n\n";
$text_body .= "BUYER & COMPANY DETAILS\n";
$text_body .= "----------------------------------------------------\n";
$text_body .= "Full Name:       $full_name\n";
$text_body .= "Company:         $company\n";
$text_body .= "Business Email:  $email\n";
$text_body .= "Phone/WhatsApp:  " . ($phone ? $phone : 'Not provided') . "\n";
$text_body .= "Company Country: " . ($company_country ? $company_country : 'Not specified') . "\n\n";

$text_body .= "PRODUCT & TRADE SPECIFICATIONS\n";
$text_body .= "----------------------------------------------------\n";
$text_body .= "Product Required:     $product\n";
$text_body .= "Quantity (MT):        $quantity\n";
$text_body .= "Destination Country:  $destination\n";
$text_body .= "Destination Port:     " . ($dest_port ? $dest_port : 'Not specified') . "\n";
$text_body .= "Class & Grade:        " . ($specification ? $specification : 'Standard Export Grade') . "\n";
$text_body .= "Packaging:            " . ($packaging ? $packaging : 'Standard') . "\n";
$text_body .= "Shipment Window:      " . ($shipment_window ? $shipment_window : 'Prompt / Open') . "\n\n";

$text_body .= "MESSAGE / SPECIFICATION NOTES\n";
$text_body .= "----------------------------------------------------\n";
$text_body .= (!empty($additional_info) ? $additional_info : 'None') . "\n\n";

$text_body .= "====================================================\n";
$text_body .= "Submitted on: $submission_time\n";
$text_body .= "IP Address:   $user_ip\n";
$text_body .= "====================================================\n";

// Construct Headers
$headers   = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-type: text/html; charset=UTF-8';
$headers[] = 'From: ' . $site_name . ' <' . $from_email . '>';
$headers[] = 'Reply-To: ' . $safe_name . ' <' . $safe_email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();
$headers[] = 'X-Originating-IP: ' . $user_ip;

$headers_str = implode("\r\n", $headers);

// Send the email
$mail_sent = @mail($to_email, $subject, $html_body, $headers_str);

if ($mail_sent) {
    send_response('success', 'Thank you! Your inquiry has been sent successfully. Our team will review and respond promptly.');
} else {
    // In local dev without sendmail or configured mail server, mail() may return false
    // Provide appropriate guidance while graceful in production
    send_response('error', 'Unable to send email at this time. Please contact us directly at ' . $to_email);
}
?>
