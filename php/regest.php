<?php
include("public.php");
$username = $_POST["username"];
$password = $_POST["password"];
$sql = "select * from user where username='$username'";
$res = mysqli_query($con,$sql);
$arr = mysqli_fetch_assoc($res);


if(count($arr)){
    echo json_encode(array(
        "status"=>false,
        "info"=>"用户名重复"

    ));
}else{
    $inner = "insert into user (username,password) value ('$username','$password')";
    $n = mysqli_query($con,$inner);
    if($n){
        echo json_encode(array(
            "status"=>true,
            "info"=>"注册成功"
        ));
    }else{
        echo json_encode(array(
            "status"=>false,
            "info"=>"注册失败"
        ));
    }
}
?>