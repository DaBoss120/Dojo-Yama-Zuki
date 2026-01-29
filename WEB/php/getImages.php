<?php
header('Content-Type: application/json');

// List of allowed origins
$allowedOrigins = [
    'http://127.0.0.1:5501',
    'https://yamazuki.ch',
    'https://www.yamazuki.ch'
];

// Check if the Origin header is set and is in the allowed list
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

$imagesDir = '../IMG/gallery';
// It's a good idea to check if the directory exists to avoid PHP errors
if (is_dir($imagesDir)) {
    $images = array_diff(scandir($imagesDir), array('.', '..'));
    echo json_encode(array_values($images));
} else {
    echo json_encode([]);
}