function Detali(){
    this.init()
}
Detali.prototype={
    init:function(){
        this.listBox = document.getElementsByClassName("list_box");
        this.color = document.getElementsByClassName("color");
        this.imgSrc = document.getElementsByClassName("img_src");
        this.goodsnum = document.getElementsByClassName("goodsnum")[0];
        this.getData();
       
    },
    getData:function(){
        axios({
            method: "get",
            url: "http://localhost/andama/src/php/detail.php"
        }).then(this.getDataCb.bind(this))
    },
    
    getDataCb:function(data){
        this.goodsnum.innerHTML = data.length
        var str = '';
        var stt =""
        this.color = document.getElementsByClassName("color")
        for(var i =0;i<data.length;i++){
            data[i].index = i
            var index =  data[i].index;
          
            // var objAb =JSON.parse(data[index].ab);
            // var objAid = JSON.parse(data[index].data_aid)
            // console.log(objAb)
            // console.log(objAid)
            str =`
            <div class="middle_list">
                     <div class="list_inner" data-id="${data[i].id}">
                         <div class="img_inner" data-img="${data[i].data_img}">
                             <img src="../img/${data[i].img}" alt="" class="img_src">
                         </div>
                         <div class="text_inner">
                             <div class="color">
                                
                             </div>
                             <p>${data[i].p}</p>
                             <p>￥<span class="price">${data[i].price}</span></p>
                         </div>
                     </div>
                 </div>
            ` 
            this.listBox[0].innerHTML += str;
            this.color = document.getElementsByClassName("color")
            
            var objAb =JSON.parse(data[index].ab);
            var objAid = JSON.parse(data[index].data_aid);
            for(var key in objAb){
                stt =` <a href="##" style="${objAb[key]}" data-aid="../img/${objAid[key]}" class="color_a"></a>`
                this.color[index].innerHTML += stt;
            }
        }
        this.colorAa = document.getElementsByClassName("color_a")
        for(var i = 0; i<this.colorAa.length;i++){
            this.colorAa[i].index = i;
            this.colorAa[i].addEventListener("mouseenter",this.colorAaCb.bind(this,this.colorAa[i]));
            for(var a=0;a<1;a++){
                
            }
        }
        this.listInner =document.getElementsByClassName("list_inner");
        for(var i = 0;i<this.listInner.length;i++){
            this.listInner[i].addEventListener("click",this.listInnerCb.bind(this,this.listInner[i]));
        }
    },
    listInnerCb:function(that){
        that.getAttribute("data-id");
        var id=  that.getAttribute("data-id");
        location.href="http://localhost/andama/src/html/single.html?id="+id+""
    },
    colorAaCb:function(that){
        that.getAttribute("data-aid");
        var img = that.parentNode.parentNode.previousElementSibling.firstElementChild
        img.src= that.getAttribute("data-aid");

    },

}

new Detali();