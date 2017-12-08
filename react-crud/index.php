<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

// include configuration file
include 'config/core.php';

// include the head template
include_once "layout_head.php";

// placeholder for rendering React components
echo "<div id='content'></div>";

// page footer
include_once "layout_foot.php";
?>