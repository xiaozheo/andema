<?php
include("public.php");
$sql = "select * from goods";
$res=mysqli_query($con,$sql);

$data = array();
while($arr = mysqli_fetch_assoc($res)){
    //php中数组的添加
    array_push($data,$arr);
}

echo json_encode($data);

?>