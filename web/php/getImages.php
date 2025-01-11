<?php
header('Content-Type: application/json');
$imagesDir = '../img/gallery';
$images = array_diff(scandir($imagesDir), array('.', '..'));
echo json_encode(array_values($images));