function Single() {
    this.init()
}
Single.prototype = {
    init: function () {
        this.article = document.getElementsByClassName("article")[0];
        this.getData();

    },
    getData: function () {
        axios({
            method: "get",
            url: "http://localhost/andama/src/php/single.php"
        }).then(this.getDataCb.bind(this))
    },
    getDataCb: function (data) {
        var id = location.href.split("=")[1];
        var str = "";
        var stt = "";
        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                str = `
              <div class="left_box" data-id="${data[i].id}">
            <ul class="article_list" class="left"> </ul>
            <div class="show">
                <img src="${data[i].img}" alt="">
                <div class="magnifier"></div>
            </div>
        </div>
        <div class="big_img">
            <img src="${data[i].img}" alt="" class="bigimg">
        </div>
        <div class="right_box">
            <div class="text-box">
                <h3 class="type">${data[i].type}</h3>
                <p>
                    <span>￥</span><span class="price">${data[i].price}</span>
                </p>
            </div>
            <div>

                <!-- <p class="style">
                    <span>颜色：</span>
                    <span class="style_color">黑色 (001) </span>
                    <span class="style_num">STYLE#1317330</span>
                </p>
                <div>
                    <a style="background-color: #231F20" data-aid="1" class="color_a color_checked"></a>
                    <a style="background-color: #006174" data-aid="2" class="color_a "></a>
                    <a style="background-color: #A29FA9" data-aid="3" class="color_a "></a>
                </div> -->

            
                <p class="size_box">
                    <span>尺码：</span><span class="stylesize"> </span>
                </p>
                <ul class="sizelist">
                    <li>S</li>
                    <li>M</li>
                    <li>L</li>
                    <li>XL</li>
                    <li>XXL</li>
                    <li>3XL</li>
                </ul>
                <div class="put">
                    <p class="buy_num">
                        <span>数量：</span><span class="buynum"></span>
                    </p>
                    <div class="put_sec">
                        <a class="put_reduce">-</a>
                        <input type="text" value="1" class="changenum">
                        <a class="put_add">+</a>
                    </div>
                </div>
                <div class="add_car">
                    <a class="carbtn">加入购物车</a>
                    <a class="carbtn immediately">立即购买</a>
                </div>
            </div>
        </div>
              `
                var objLisr = JSON.parse(data[i].listimg);
                var objImg = JSON.parse(data[i].data_img);
                this.article.innerHTML = str;
                this.articleList = document.getElementsByClassName("article_list")[0];
                for (var key in objLisr) {
                    stt = `
                <li class="" data-img="${objImg[key]}">
                    <img src="${objLisr[key]}" alt="" class="listimg">
                </li>
                `
                    this.articleList.innerHTML += stt;
                }
            }
        }
        this.li = document.getElementsByClassName("article_list")[0].getElementsByTagName("li");
        this.li[0].className = "cheacked";
        this.img = document.getElementsByClassName("show")[0].getElementsByTagName("img");
        this.big = document.getElementsByClassName("bigimg")[0];
        this.bigimg = document.getElementsByClassName("big_img")[0].getElementsByTagName("img");
        for (var i = 0; i < this.li.length; i++) {
            this.li[i].addEventListener("mouseenter", this.mouseCb.bind(this, this.li[i]))
        }
        this.show = document.getElementsByClassName("show")[0];
        this.magnifier = document.getElementsByClassName("magnifier");
        // console.log(this.magnifier)
        this.show.addEventListener("mousemove", this.hover.bind(this));
        this.show.addEventListener("mouseout", this.out.bind(this));
        this.joincar()
    },
    mouseCb: function (that) {
        for (var a = 0; a < this.li.length; a++) {
            this.li[a].className = ""
        }

        that.className = "cheacked";
        var src = that.getAttribute("data-img");
        this.img[0].src = src
        this.bigimg[0].src = this.img[0].src
    },
    hover: function (e) {
        var e = e || e.event;
        var that = this.magnifier[0];
        this.img = document.getElementsByClassName("show")[0].getElementsByTagName("img");
        this.bigImg = document.getElementsByClassName("big_img")[0];
        this.bigimg = document.getElementsByClassName("big_img")[0].getElementsByTagName("img");

        that.style.display = "block";
        this.bigImg.style.display = "block"
        that.style.width = this.img[0].offsetWidth / 2 + "px";
        that.style.height = this.img[0].offsetHeight / 2 + "px";

        x = e.pageX - (that.offsetParent.offsetLeft + that.offsetParent.offsetParent.offsetLeft) - this.show.offsetWidth / 4;
        y = e.pageY - (that.offsetParent.offsetTop + that.offsetParent.offsetParent.offsetTop) - this.show.offsetWidth / 4;
        if (x <= 0) {
            x = 0
        }
        if (y <= 0) {
            y = 0
        }
        if (x >= this.show.offsetWidth - this.magnifier[0].offsetWidth) {
            x = this.show.offsetWidth - this.magnifier[0].offsetWidth
        }
        if (y >= this.show.offsetHeight - this.magnifier[0].offsetHeight) {
            y = this.show.offsetHeight - this.magnifier[0].offsetHeight
        }


        that.style.left = x + "px";
        that.style.top = y + "px";
        this.bigimg[0].style.left = -1.5 * x + 'px';
        this.bigimg[0].style.top = -1.5 * y + 'px'
    },
    out: function () {
        this.magnifier[0].style.display = "none";
        this.bigImg.style.display = "none"
    },
    joincar: function () {
        this.put = document.getElementsByClassName("put_sec")[0];
        this.Reduce = document.getElementsByClassName("put_reduce")[0];
        this.Add = document.getElementsByClassName("put_add")[0];
        this.input = document.getElementsByClassName('changenum')[0];
        this.carbtn = document.getElementsByClassName('carbtn')[0];
        this.box = document.getElementsByClassName('left_box')[0]
        this.Add.addEventListener('click', this.addCb.bind(this));
        this.Reduce.addEventListener('click', this.ReduceCb.bind(this));
        this.carbtn.addEventListener('click', this.carbtnCb.bind(this));

    },
    addCb: function () {
        var value = this.input.value;
        value++
        this.input.value = value
    },
    ReduceCb: function () {
        var value = this.input.value;
        if (value == 0) {
            value = 0
        } else (
            value--
        )
        this.input.value = value
    },
    carbtnCb: function () {
        var id = this.box.getAttribute('data-id');
        var num = this.input.value;

        //判断第一次点击的时候整体是否存在  localStorage
        if (!localStorage.getItem('goods')) {
            localStorage.setItem('goods', JSON.stringify([{ id: id, number: num }]))
        } else {
            var obj = JSON.parse(localStorage.getItem('goods'));

            var bStop = true;
            //遍历对比cookie中是否存在商品的id，若存在应先获取当前商品的数量，然后存入localStorage
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].id == id) {
                    bStop = false;
                    obj = JSON.parse(localStorage.getItem('goods'));
                    obj[i].number = num     //重新获得当前商品数量
                    localStorage.setItem('goods', JSON.stringify(obj));
                    break
                }
            }
            //localStorage存在 但是当前加入购物车的 商品id与cookieid不匹配，及当前商品未加入购物车
            if (bStop) {

                obj.push({ id: id, number: num });
                localStorage.setItem('goods', JSON.stringify(obj));
            }
        }
        location.href = "http://localhost/andama/src/html/car.html";
    }
}
new Single();