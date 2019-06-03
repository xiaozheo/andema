function Login() {
    this.init();
}
Login.prototype = {
    init: function () {
        this.subbtn = document.getElementById("subbtn");
        this.getData();
    },
    getData: function () {
        this.subbtn.addEventListener("click", this.getDataCb.bind(this))
    },
    getDataCb: function (e) {
        this.username = document.getElementById("username");
        this.password = document.getElementById("password");
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost/andama/src/php/login.php",
            data: {
                username: this.username.value,
                password: this.password.value
            }
        }).then(this.getDataCbCb.bind(this))
    },
    getDataCbCb: function (data) {
        console.log(data)
        if (data.status) {
            alert("登陆成功！");
            location.href = "http://localhost/andama/src/"
        }
    }
}

new Login();