<?php

//防止页面出现乱码
header("content-type:text/html;charset=utf8");

//获取服务器地址
$db_hostname = "localhost";

//获取服务器的用户名
$db_username = "root";

//获取服务器的密码
$db_password = "root";

//链接你需要的数据库
$db_name = "db-1904";

//链接数据库
$con = new mysqli($db_hostname,$db_username,$db_password,$db_name);

//判断是否链接成功
if($con->connect_error){
    die('链接失败'.$con->connect_error);
}

//设置数据库编码格式
$con->query("set names utf8");

?>
