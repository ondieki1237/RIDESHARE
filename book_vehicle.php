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

// Get form data
$vehicle_type = $_POST['vehicle_type'];
$pickup_location = $_POST['pickup_location'];
$dropoff_location = $_POST['dropoff_location'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO bookings (vehicle_type, pickup_location, dropoff_location) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $vehicle_type, $pickup_location, $dropoff_location);

// Execute the statement
if ($stmt->execute()) {
    echo "Vehicle booked successfully!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
