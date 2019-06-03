function Car() {
    this.init()
}

Car.prototype = {
    init: function () {
        this.tbody = document.getElementsByClassName('tbody')[0]
        this.sum = document.getElementsByClassName('sum');
        this.num = document.getElementsByClassName('num');
        this.add = document.getElementsByClassName('add');
        this.reduce = document.getElementsByClassName('reduce');
        this.checkeAll = document.getElementById('allcheck');
        this.total = document.getElementById('total')
        this.tab = document.getElementById('tab');
        this.getData();
        this.click();
    },
    getData: function () {
        // var obj = JSON.parse(localStorage.getItem('goods'))
        axios({
            method: 'get',
            url: 'http://localhost/andama/src/php/single.php'
        }).then(this.getDataCb.bind(this))

    },
    getDataCb: function (data) {
        var obj = JSON.parse(localStorage.getItem('goods'))
        var arr = [];
        var arr2 = [];
        var tt = 0;
        for (var a = 0; a < obj.length; a++) {
            var id = obj[a].id
            var num = obj[a].number
            arr.push(id)
            arr2.push(num)
        }
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                if (data[i].id == arr[j]) {
                    var img = JSON.parse(data[i].listimg)
                    var sum = data[i].price * arr2[j];
                    // console.log(data[i].id)
                    var str = '';
                    str += `
                    <tr class="count">
                        <td><input type="checkbox" name="" id="" value="" class="check" /></td>
                        <td class="img"><img src='${img.img1}'></td>
                        <td>${data[i].type}</td>
                        <td>很便宜啦</td>
                        <td>￥<span class="singleprice">${data[i].price}</span></td>
                        <td>
                            <button class="reduce">-</button><input type="" name="" class="num" value="${arr2[j]}" /><button
                                class="add">+</button>
                        </td>
                        <td>
                            ￥<span class="sum">${sum}</span>
                        </td>
                        <td>
                            <a href="##" class="del">删除</a>
                        </td>
                    </tr>
                `
                    this.tbody.innerHTML += str;
                    tt += Number(sum)
                    console.log(tt)

                }
            }
        }

        this.total.innerText = Number(tt)
        this.check();
    },
    click: function () {

        this.tab.addEventListener('click', this.clickCb.bind(this))
    },
    clickCb: function (e) {
        var e = e || e.event;
        var target = e.target;
        if (target.className == 'add') {
            target.previousElementSibling.value++;
            target.parentNode.nextElementSibling.lastElementChild.innerText = target.previousElementSibling.value * target.parentNode.previousElementSibling.lastElementChild.innerText
            this.Total()
        }
        if (target.className == 'reduce') {
            if (target.nextElementSibling.value == 0) {
                target.nextElementSibling.value = 0
            } else {
                target.nextElementSibling.value--
            }
            target.parentNode.nextElementSibling.lastElementChild.innerText = target.nextElementSibling.value * target.parentNode.previousElementSibling.lastElementChild.innerText
            this.Total()
        }
        if (target.className == 'del') {
            target.parentNode.parentNode.remove()
            this.Total()
        }
    },
    check: function () {
        this.check = document.getElementsByClassName('check');
        for (var i = 0; i < this.check.length; i++) {
            this.check[i].checked = 'checked'
        }
        this.checkeAll.addEventListener('click', this.checkeAllCb.bind(this))
        for (var i = 0; i < this.check.length; i++) {
            this.check[i].addEventListener('click', this.checkeCb.bind(this))
        }
        this.Total()
    },
    checkeAllCb: function () {
        for (var i = 0; i < this.check.length; i++) {
            this.check[i].checked = this.checkeAll.checked
        }
        this.Total()
    },
    checkeCb: function () {
        var bStop = true;
        for (var a = 0; a < this.check.length; a++) {
            if (!this.check[a].checked) {
                bStop = false;
            }
        }
        this.checkeAll.checked = bStop;
        this.Total()
    },
    Total:function(){
        var str = 0;
       for(var i = 0;i<this.sum.length;i++){
        console.log(this.check[i].checked)
           if(this.check[i].checked){
            str+=Number(this.sum[i].innerText)
           }
       }
       this.total.innerText = str
    }

}

new Car()