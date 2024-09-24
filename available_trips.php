<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "ridesharedb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query available trips
$sql = "SELECT * FROM trips";
$result = $conn->query($sql);

echo "<h2>Available Trips</h2>";
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Trip ID: " . $row["trip_id"]. " - Destination: " . $row["destination"]. "<br>";
    }
} else {
    echo "No trips available.";
}

$conn->close();
?>
