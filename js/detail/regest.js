function Regest() {
    this.init();
}
Regest.prototype = {
    init: function () {
        this.regest = document.getElementById("regest");
        this.username = document.getElementById("username");
        this.subBtn = document.getElementById("subbtn");
        this.checked = document.getElementsByClassName("checked");

        this.sendData();
    },
    sendData: function () {
        this.regest.addEventListener("submit", this.sendDataCb.bind(this))
    },
    sendDataCb: function (e) {
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        this.repassword = document.getElementById("repassword");
        this.checked = document.getElementsByClassName("checked");
        e.preventDefault();
        if (this.password.value == this.repassword.value) {
            for (var i = 0; i < this.checked.length; i++) {
                if (this.checked[i].checked) {
                    axios({
                        method: "post",
                        url: "http://localhost/andama/src/php/regest.php",
                        data: {
                            username: this.username.value,
                            password: this.password.value
                        }
                    }).then(this.sendDataCbCb.bind(this))
                }else {
                   return alert("请勾选")
                }
            }
        } else {
            alert("两次密码输入不一致")
            this.repassword.value = "";
        }
    },
    sendDataCbCb: function (data) {
        if (data.status) {
            alert("注册成功，请登陆！");
            location.href = "http://localhost/andama/src/html/login.html"
        }
    }
}

new Regest();