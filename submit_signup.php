<?php
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "RideShareDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hashing the password for security
$id_number = $_POST['id_number'];
$phone_number = $_POST['phone_number'];
$seats_number = $_POST['seats_number']; // Assuming this is an integer
$city = $_POST['city'];

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (name, email, password, id_number, phone_number, seats_number, city) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssis", $name, $email, $password, $id_number, $phone_number, $seats_number, $city); // Check if 'i' or 's' for seats_number

// Execute the statement
if ($stmt->execute()) {
    // Close connections
    $stmt->close();
    $conn->close();
    
    // Redirect to a confirmation page or back to the sign-up page
    header("Location: success.html");
    exit;
} else {
    echo "Error: " . $stmt->error;
}

// Close connections in case of error
$stmt->close();
$conn->close();
?>
