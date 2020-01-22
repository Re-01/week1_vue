<?php
    require('connect.php');

    function getUser($conn) {
        $getData = 'SELECT * FROM users';
        $runQuery = $conn->query($getData);

        $result = array();

        while($row = $runQuery->fetch(PDO::FETCH_ASSOC)) {
            // push each row of data into our arry to make it easy to interate over
            $result[] = $row;
        }

        return $result;
    }