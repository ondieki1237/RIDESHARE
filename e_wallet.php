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

// Query e-wallet balance
$user_id = 1; // Replace with actual user ID or session variable
$sql = "SELECT balance FROM e_wallet WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($balance);
$stmt->fetch();

echo "<h2>Your E-Wallet</h2>";
echo "Balance: $" . $balance;

$stmt->close();
$conn->close();
?>
