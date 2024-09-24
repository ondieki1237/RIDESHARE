<?php
// Database connection details
$servername = "localhost"; // Replace with your MySQL server name
$username = "root"; // Replace with your MySQL username
$password = "root"; // Replace with your MySQL password
$dbname = "ridesharedb"; // Replace with your database name

// Establishing connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Checking connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Processing form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collecting and sanitizing input data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    $id_number = mysqli_real_escape_string($conn, $_POST['id_number']);
    $phone_number = mysqli_real_escape_string($conn, $_POST['phone_number']);
    $seats_number = mysqli_real_escape_string($conn, $_POST['seats_number']);
    $city = mysqli_real_escape_string($conn, $_POST['city']);

    // Inserting data into MySQL database
    $sql = "INSERT INTO users (name, email, password, id_number, phone_number, seats_number, city)
            VALUES ('$name', '$email', '$password', '$id_number', '$phone_number', '$seats_number', '$city')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
        // Redirect to a success page or do something else
        // header('Location: success.html');
        // exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Closing connection
$conn->close();
?>
