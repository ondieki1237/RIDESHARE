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

// Query travel history
$user_id = 1; // Replace with actual user ID or session variable
$sql = "SELECT * FROM travel_history WHERE user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

echo "<h2>Your Travel History</h2>";
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "Trip ID: " . $row["trip_id"]. " - Date: " . $row["date"]. "<br>";
    }
} else {
    echo "No travel history available.";
}

$stmt->close();
$conn->close();
?>
