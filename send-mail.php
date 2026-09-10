<?php
/**
 * Whodunit Resource Group - Quote Request & Contact Form Mailer
 * 
 * Optimized for GoDaddy (cPanel / Linux / Windows Hosting), Localhost, and Standard Web Hosts.
 * Handles form submissions from contact.html and delivers inquiries to eati@akoode.in
 */

// Error handling settings
error_reporting(0);
ini_set('display_errors', 0);

// =============================================================================
// CONFIGURATION
// =============================================================================
$to_email        = 'eati@akoode.in';
$site_name       = 'Whodunit Resource Group';

// Domain detection for GoDaddy:
// GoDaddy requires the From address to use the domain hosted on your cPanel account.
$detected_host   = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (!empty($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : '');
$detected_host   = preg_replace('/^www\./i', '', $detected_host);
$detected_host   = preg_replace('/:\d+$/', '', $detected_host);

if (!empty($detected_host) && strpos($detected_host, '.') !== false && $detected_host !== 'localhost') {
    $from_domain = $detected_host;
} else {
    $from_domain = 'whodunitresourcegroup.com';
}
$from_email      = 'noreply@' . $from_domain;

// Optional: If you have GoDaddy / cPanel / Gmail SMTP credentials, you can configure them below:
$use_smtp        = false;                  // Set to true to force SMTP instead of mail()
$smtp_host       = 'localhost';            // GoDaddy internal relay: 'localhost' or 'relay-hosting.secureserver.net'
$smtp_port       = 25;                     // 25 (GoDaddy relay), 587 (TLS), or 465 (SSL)
$smtp_security   = '';                     // '' for port 25, 'tls' for 587, 'ssl' for 465
$smtp_username   = '';                     // Leave blank for GoDaddy internal relay (no auth needed)
$smtp_password   = '';

// =============================================================================
// RESPONSE & SANITIZATION HELPERS
// =============================================================================
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

// Honeypot spam check
if (!empty($_POST['website_url']) || !empty($_POST['hp_field'])) {
    send_response('success', 'Your inquiry has been received.');
}

// Input sanitizer
function clean_input($data) {
    if (is_array($data)) {
        return array_map('clean_input', $data);
    }
    $data = trim($data);
    $data = stripslashes($data);
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

// Header injection cleaner
function clean_header($data) {
    return trim(str_replace(["\r", "\n", "%0a", "%0d"], '', $data));
}

// Read and sanitize form fields
$full_name       = clean_input($_POST['fullName'] ?? '');
$company         = clean_input($_POST['company'] ?? '');
$email           = clean_input($_POST['email'] ?? '');
$phone           = clean_input($_POST['phone'] ?? '');
$company_country = clean_input($_POST['companyCountryName'] ?? $_POST['companyCountry'] ?? '');

$product         = clean_input($_POST['product'] ?? '');
$quantity        = clean_input($_POST['quantity'] ?? '');
$destination     = clean_input($_POST['destinationCountryName'] ?? $_POST['destination'] ?? '');
$dest_port       = clean_input($_POST['destinationPort'] ?? '');
$specification   = clean_input($_POST['specification'] ?? '');
$packaging       = clean_input($_POST['packaging'] ?? '');
$shipment_window = clean_input($_POST['shipmentWindow'] ?? '');
$additional_info = clean_input($_POST['additionalInformation'] ?? '');

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
if (empty($quantity)) {
    $errors[] = 'Quantity in metric tonnes is required.';
}
if (empty($destination)) {
    $errors[] = 'Destination country is required.';
}

if (!empty($errors)) {
    send_response('error', implode(' ', $errors));
}

// Clean fields for email headers
$safe_name  = clean_header($full_name);
$safe_email = clean_header($email);
$safe_comp  = clean_header($company);

$subject = "New Pulse Export Quote Request - " . ($safe_comp ? $safe_comp : $safe_name);

$submission_time = date('F j, Y, g:i a');
$user_ip         = clean_input($_SERVER['REMOTE_ADDR'] ?? 'Unknown');

// Build HTML Email Body
$html_body = '<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #222; background-color: #f4f6f8; margin: 0; padding: 20px; }
    .box { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 6px; overflow: hidden; border: 1px solid #ddd; }
    .header { background: #0c2b23; color: #ffffff; padding: 20px 25px; border-bottom: 3px solid #c97a2b; }
    .header h2 { margin: 0; font-size: 20px; color: #ffffff; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #d0deda; }
    .content { padding: 25px; }
    .title { font-size: 14px; font-weight: bold; color: #0c2b23; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 20px; margin-bottom: 10px; text-transform: uppercase; }
    .title:first-child { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
    td { padding: 8px 10px; font-size: 13px; vertical-align: top; border-bottom: 1px solid #f0f0f0; }
    td.lbl { width: 35%; font-weight: bold; color: #555; background: #fafafa; }
    td.val { width: 65%; color: #111; }
    .notes { background: #fdfbf7; border-left: 3px solid #c97a2b; padding: 10px 14px; font-size: 13px; white-space: pre-wrap; margin-top: 5px; }
    .footer { background: #f4f4f4; padding: 12px 25px; font-size: 11px; color: #777; border-top: 1px solid #e5e5e5; }
</style>
</head>
<body>
<div class="box">
    <div class="header">
        <h2>' . $site_name . '</h2>
        <p>New Pulse Export Inquiry from Website</p>
    </div>
    <div class="content">
        <div class="title">Buyer &amp; Company Details</div>
        <table>
            <tr><td class="lbl">Full Name:</td><td class="val"><strong>' . $full_name . '</strong></td></tr>
            <tr><td class="lbl">Company:</td><td class="val">' . $company . '</td></tr>
            <tr><td class="lbl">Email:</td><td class="val"><a href="mailto:' . $email . '">' . $email . '</a></td></tr>
            <tr><td class="lbl">Phone / WhatsApp:</td><td class="val">' . ($phone ? $phone : 'Not provided') . '</td></tr>
            <tr><td class="lbl">Company Country:</td><td class="val">' . ($company_country ? $company_country : 'Not specified') . '</td></tr>
        </table>

        <div class="title">Product &amp; Trade Requirements</div>
        <table>
            <tr><td class="lbl">Product Required:</td><td class="val"><strong>' . $product . '</strong></td></tr>
            <tr><td class="lbl">Quantity (MT):</td><td class="val"><strong>' . $quantity . '</strong></td></tr>
            <tr><td class="lbl">Destination Country:</td><td class="val">' . $destination . '</td></tr>
            <tr><td class="lbl">Destination Port:</td><td class="val">' . ($dest_port ? $dest_port : 'Not specified') . '</td></tr>
            <tr><td class="lbl">Specification / Grade:</td><td class="val">' . ($specification ? $specification : 'Standard Export Grade') . '</td></tr>
            <tr><td class="lbl">Packaging:</td><td class="val">' . ($packaging ? $packaging : 'Standard') . '</td></tr>
            <tr><td class="lbl">Shipment Window:</td><td class="val">' . ($shipment_window ? $shipment_window : 'Prompt / Open') . '</td></tr>
        </table>

        <div class="title">Additional Notes</div>
        <div class="notes">' . (!empty($additional_info) ? $additional_info : 'None') . '</div>
    </div>
    <div class="footer">
        Submitted on: ' . $submission_time . ' | Sender IP: ' . $user_ip . '
    </div>
</div>
</body>
</html>';

// Build plain text backup
$text_body = "New Quote Request - $site_name\n\n";
$text_body .= "Full Name: $full_name\nCompany: $company\nEmail: $email\nPhone: $phone\nCountry: $company_country\n\n";
$text_body .= "Product: $product\nQuantity: $quantity MT\nDestination: $destination\nPort: $dest_port\nSpec: $specification\nPackaging: $packaging\nWindow: $shipment_window\nNotes: $additional_info\n";

// =============================================================================
// BACKUP STORAGE: SAVE SUBMISSION LOCALLY (Logs Folder)
// =============================================================================
$logs_dir = __DIR__ . '/logs';
if (!is_dir($logs_dir)) {
    @mkdir($logs_dir, 0755, true);
    @file_put_contents($logs_dir . '/.htaccess', "Deny from all\n");
}

$inquiry_entry = [
    'time'            => date('Y-m-d H:i:s'),
    'fullName'        => $full_name,
    'company'         => $company,
    'email'           => $email,
    'phone'           => $phone,
    'country'         => $company_country,
    'product'         => $product,
    'quantity'        => $quantity,
    'destination'     => $destination,
    'port'            => $dest_port,
    'spec'            => $specification,
    'packaging'       => $packaging,
    'shipment'        => $shipment_window,
    'notes'           => $additional_info,
    'ip'              => $user_ip
];

$inquiries_file = $logs_dir . '/inquiries.json';
$all_inquiries = [];
if (file_exists($inquiries_file)) {
    $content = @file_get_contents($inquiries_file);
    $all_inquiries = json_decode($content, true) ?: [];
}
array_unshift($all_inquiries, $inquiry_entry);
@file_put_contents($inquiries_file, json_encode($all_inquiries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// =============================================================================
// PURE-PHP SMTP SENDER (For GoDaddy Relay / SMTP Fallback)
// =============================================================================
function godaddy_smtp_send($host, $port, $security, $user, $pass, $from, $to, $subject, $html, $text, $reply_to, &$err = '') {
    $socket_host = ($security === 'ssl' ? 'ssl://' : '') . $host;
    $socket = @fsockopen($socket_host, $port, $errno, $errstr, 10);
    if (!$socket) {
        $err = "SMTP Connection failed: $errstr ($errno)";
        return false;
    }
    
    $read = function() use ($socket) {
        $res = '';
        while ($line = fgets($socket, 515)) {
            $res .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $res;
    };
    
    $res = $read();
    if (substr($res, 0, 3) !== '220') { fclose($socket); $err = "Greeting error: $res"; return false; }
    
    $client = !empty($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost';
    fwrite($socket, "EHLO $client\r\n");
    $res = $read();
    
    if ($security === 'tls') {
        fwrite($socket, "STARTTLS\r\n");
        $res = $read();
        if (substr($res, 0, 3) !== '220') { fclose($socket); $err = "STARTTLS error: $res"; return false; }
        if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket); $err = "TLS Handshake failed"; return false;
        }
        fwrite($socket, "EHLO $client\r\n");
        $read();
    }
    
    if (!empty($user) && !empty($pass)) {
        fwrite($socket, "AUTH LOGIN\r\n");
        $read();
        fwrite($socket, base64_encode($user) . "\r\n");
        $read();
        fwrite($socket, base64_encode($pass) . "\r\n");
        $res = $read();
        if (substr($res, 0, 3) !== '235') { fclose($socket); $err = "Auth failed: $res"; return false; }
    }
    
    fwrite($socket, "MAIL FROM: <$from>\r\n");
    $res = $read();
    if (substr($res, 0, 3) !== '250') { fclose($socket); $err = "MAIL FROM error: $res"; return false; }
    
    fwrite($socket, "RCPT TO: <$to>\r\n");
    $res = $read();
    if (substr($res, 0, 3) !== '250' && substr($res, 0, 3) !== '251') { fclose($socket); $err = "RCPT TO error: $res"; return false; }
    
    fwrite($socket, "DATA\r\n");
    $res = $read();
    if (substr($res, 0, 3) !== '354') { fclose($socket); $err = "DATA error: $res"; return false; }
    
    $boundary = "==Multipart_Boundary_x" . md5(time()) . "x";
    $msg  = "From: $from\r\n";
    $msg .= "To: $to\r\n";
    $msg .= "Reply-To: $reply_to\r\n";
    $msg .= "Subject: $subject\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n\r\n";
    
    $msg .= "--$boundary\r\n";
    $msg .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $msg .= $text . "\r\n\r\n";
    
    $msg .= "--$boundary\r\n";
    $msg .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $msg .= $html . "\r\n\r\n";
    
    $msg .= "--$boundary--\r\n";
    $msg .= "\r\n.\r\n";
    
    fwrite($socket, $msg);
    $res = $read();
    if (substr($res, 0, 3) !== '250') { fclose($socket); $err = "Message send error: $res"; return false; }
    
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    return true;
}

// =============================================================================
// EMAIL DISPATCH - 3-TIER GODADDY RESILIENT SENDING
// =============================================================================
$mail_sent = false;

// 1. First Attempt: GoDaddy-compliant mail() with mandatory -f parameter
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "From: " . $from_email . "\r\n";
$headers .= "Reply-To: " . $safe_email . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// GoDaddy strictly requires the 5th parameter "-f sender@domain.com"
$mail_sent = @mail($to_email, $subject, $html_body, $headers, "-f" . $from_email);

// 2. Second Attempt: Standard mail() without -f (in case -f is restricted)
if (!$mail_sent) {
    $mail_sent = @mail($to_email, $subject, $html_body, $headers);
}

// 3. Third Attempt: GoDaddy Internal Relay (relay-hosting.secureserver.net or localhost port 25)
if (!$mail_sent) {
    $smtp_err = '';
    // Try GoDaddy internal relay servers
    $godaddy_relays = ['relay-hosting.secureserver.net', 'localhost', '127.0.0.1'];
    foreach ($godaddy_relays as $relay) {
        if (godaddy_smtp_send($relay, 25, '', '', '', $from_email, $to_email, $subject, $html_body, $text_body, $safe_email, $smtp_err)) {
            $mail_sent = true;
            break;
        }
    }
}

// 4. Custom SMTP if configured
if (!$mail_sent && $use_smtp && !empty($smtp_password)) {
    $smtp_err = '';
    $mail_sent = godaddy_smtp_send(
        $smtp_host,
        $smtp_port,
        $smtp_security,
        $smtp_username,
        $smtp_password,
        $from_email,
        $to_email,
        $subject,
        $html_body,
        $text_body,
        $safe_email,
        $smtp_err
    );
}

// =============================================================================
// FINAL RESPONSE
// =============================================================================
if ($mail_sent) {
    send_response('success', 'Thank you! Your inquiry has been sent successfully. Our team will review and respond promptly.');
} else {
    $last_err = error_get_last();
    $log_err = isset($last_err['message']) ? $last_err['message'] : ($smtp_err ?? 'Unknown mail error');
    @file_put_contents($logs_dir . '/mail_errors.log', "[" . date('Y-m-d H:i:s') . "] " . $log_err . "\n", FILE_APPEND);
    
    send_response('error', 'Unable to send email at this time. Please contact us directly at ' . $to_email);
}
?>
