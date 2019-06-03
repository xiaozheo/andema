//字幕滚动
function Nav() {
    this.free = document.getElementById("free");
    this.init();
}
Nav.prototype = {
    init: function () {
        this.navFree()
    },
    navFree: function () {
        this.leftran = this.free.offsetLeft;
        this.time = setInterval(this.navFreeCb.bind(this), 30)
    },
    navFreeCb: function () {
        this.bStop = true
        if (this.free.offsetLeft >= -100) {
            this.free.style.left = (this.free.offsetLeft - 2) + 'px';
            this.bStop = false;
        }
        if (this.bStop) {
            this.free.style.left = this.leftran + 'px'
        }
    }
}
new Nav();


//顶部固定  回到顶部  二级菜单
function TopFolat() {
    this.topFolat = document.querySelector(".top_folat");
    this.topFolat.style.position = 'relative';
    this.back = document.getElementById("backtop");
    this.listBtn = document.getElementsByClassName("top_folat_list_btn")
    this.secmeu = document.getElementsByClassName("secmeu")[0];
    this.secmeuF = document.getElementsByClassName("secmeu_f")[0];

    this.init()

}
TopFolat.prototype = {
    init: function () {
        this.fix();
        this.backtop();
        this.secmeuL();
    },
    secmeuL: function () {
        this.secmeu.addEventListener("mouseleave", this.secmeuFCb.bind(this))
        this.topFolat.addEventListener("mouseover", this.mouseoverCb.bind(this));
        this.topFolat.addEventListener("mouseout", this.mouseoutCb.bind(this));
    },
    mouseoverCb: function (e) {
        var e = e || e.event;
        this.target = e.target;
        if (this.target.tagName == "A") {
            // console.log(this.target.getAttribute("data-id"))
            this.target.style.borderColor = "red";
            this.target.style.color = "red";
            var secmeu = this.target.parentNode.parentNode.parentNode.firstElementChild;
            secmeu.style.display = "block";
            axios({
                method: "get",
                url: "http://localhost/andama/src/json/floatmeu1.json"
            }).then(this.getDta.bind(this))
        }
    },
    getDta: function (data) {
        var str = "";
        var stt = "";
        for (var i = 0; i < data.status.length; i++) {
            if (this.target.getAttribute("data-id") == data.status[i].id) {
                str = `
                <div data-id="${data.status[i].id}" class="secmeu_f">
                <ul class="firstmenlist">
                </ul>
                <div class="left">
                    <div class="banneroneinner left">
                        <a href="##" class="hrefover">
                            <div class="bannerover">
                                <div class="back">
                                    <span href="##" class="buynow"></span>
                                </div>
                                <img src="${data.status[i].img1}" alt="">
                                
                            </div>
                            <p class="banneronetext">
                            ${data.status[i].p1}
                            </p>
                        </a>
                    </div>
                    <div class="banneroneinner left  middlesrc">
                        <a href="##" class="hrefover">
                            <div class="bannerover">
                                <div class="back">
                                    <span href="##" class="buynow"></span>
                                </div>
                                <img src="${data.status[i].img2}" alt="">
                            </div>
                            <p class="banneronetext">
                            ${data.status[i].p2}
                            </p>
                        </a>
                    </div>
                    <div class="banneroneinner left">
                        <a href="##" class="hrefover">
                            <div class="bannerover">
                                <div class="back">
                                    <span href="##" class="buynow"></span>
                                </div>
                                <img src="${data.status[i].img3}" alt="">
                            </div>
                            <p class="banneronetext">
                            ${data.status[i].p3}
                            </p>
                        </a>
                    </div>
                    <div class="banneroneinner left">
                    <a href="##" class="hrefover">
                        <div class="bannerover">
                            <div class="back">
                                <span href="##" class="buynow"></span>
                            </div>
                            <img src="${data.status[i].img4}" alt="">
                        </div>
                        <p class="banneronetext">
                        ${data.status[i].p4}
                        </p>
                    </a>
                </div>
                </div>
            </div>
                `

                this.secmeu.innerHTML = str;
            
                this.firstmenlist = document.getElementsByClassName("firstmenlist");
                for (var key in data.status[i].ul1) {
                    stt = `<li data-id="01">${data.status[i].ul1[key]}</li>`
                    this.firstmenlist[0].innerHTML += stt
                }
            }
        }
    },
    mouseoutCb: function (e) {
        var e = e || e.event;
        var target = e.target;
        if (target.tagName == "A") {
            target.style.borderColor = "#fff"
            target.style.color = "#1d1d1d";
        }
    },
    secmeuFCb: function () {
        this.secmeu.style.display = "none";
    },
    fix: function () {
        window.onscroll = this.fixCb.bind(this)
    },
    fixCb: function () {
        this.height = document.documentElement.scrollTop || document.body.scrollTop;
        if (this.height > 60) {
            this.topFolat.style.position = 'fixed';
            this.topFolat.style.zIndex = 9;
            this.topFolat.style.left = 0;
            this.topFolat.style.top = 0;

        } else {
            this.topFolat.style.position = 'relative';
        }
    },
    backtop: function () {
        this.back.addEventListener("click", this.backtopCb.bind(this));

    },
    backtopCb: function () {
        this.timer = setInterval(this.backtopCbTime.bind(this), 30)
    },
    backtopCbTime: function () {
        document.documentElement.scrollTop = (this.height - 100);

        if (document.documentElement.scrollTop == 0) {
            clearInterval(this.timer)
        }
    }

}
new TopFolat()







//搜索栏变长
function InputWidth() {
    this.searchBox = document.getElementsByClassName("search_box")[0];
    this.search = document.getElementById("search");
    this.init()
}
InputWidth.prototype = {
    init: function () {
        this.searched()
    },
    searched: function () {
        this.searchBoxWidth = this.searchBox.offsetWidth;
        this.search.addEventListener("mouseover", this.searchedAddCb.bind(this));
        this.search.addEventListener("blur", this.searchedRaduceCb.bind(this, this.searchBoxWidth));
    },
    searchedAddCb: function () {
        if (this.searchBox.style.width <= 240) {
            this.searchBox.style.width = this.searchBox.offsetWidth * 2 + 'px';
        } else {
            this.searchBox.style.width = 240 + 'px';
        }
    },
    searchedRaduceCb: function () {
        this.searchBox.style.width = 120 + 'px';
    }
}
new InputWidth();



//注册
function Regest(){
    this.init()
}
Regest.prototype={
    init:function(){
        this.regest = document.querySelector(".regest")
       this.regestHref();
    },
    regestHref:function(){
        this.regest.addEventListener("click",this.regestHrefCb.bind(this))
    },
    regestHrefCb:function(){
        location.href = "http://localhost/andama/src/html/regest.html"
    }
}
new Regest()

//登陆
function Login(){
    this.init()
}
Login.prototype={
    init:function(){
        this.login = document.getElementById("login")
        console.log( this.login)
       this.loginHref();
    },
    loginHref:function(){
        this.login.addEventListener("click",this.loginHrefCb.bind(this))
    },
    loginHrefCb:function(){
        location.href = "http://localhost/andama/src/html/login.html"
    }
}
new Login()