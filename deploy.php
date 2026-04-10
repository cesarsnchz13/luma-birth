<?php
// Read secret from a file outside public_html
$secret_file = '/home/duo1cennmnos/.deploy_secret';
if (!file_exists($secret_file)) {
    http_response_code(500);
    die('Secret file not found');
}
$secret = trim(file_get_contents($secret_file));

// Verify token from POST body
$token = $_POST['token'] ?? '';
if (!$secret || !hash_equals($secret, $token)) {
    http_response_code(403);
    die('Forbidden');
}

$repo = '/home/duo1cennmnos/repositories/luma-birth';
$deploy_path = '/home/duo1cennmnos/public_html/';

// Pull latest from GitHub
$pull = shell_exec("cd {$repo} && git pull 2>&1");

// Copy files to public_html
$cp_index = shell_exec("/bin/cp {$repo}/index.html {$deploy_path} 2>&1");
$cp_assets = shell_exec("/bin/cp -R {$repo}/assets {$deploy_path} 2>&1");

echo "Done.\n";
echo $pull;
