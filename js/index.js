$(document).ready(function(){
    var ifilter;
    var gifM;
    var times = 0;
    var nowImg = 1;
    var Textures = [];

    /**
     * 页面初始化
     */
    function pageInit(){
        eventInit();
        filterInit();
        loadImg();
    }
    pageInit();

    /**
     * 加载图片
     */
    function loadImg(){
        var imgs = ['images/bg.jpg','images/1.png','images/2.png','images/3.png','images/4.png'];
        ifilter.loadTexture(imgs,function(arr){
            Textures = arr;
            ifilter.addImg(Textures[0]);
        });
    }

    /**
     * 事件初始化
     */
    function eventInit(){
        $("#btnPlay").on("click",dealVideo);
        $("#changefilterbtn").on("click",function(){
            ifilter.changefilter(3);
        });
        $("#addgrid").on("click",function(){
            ifilter.changefilterGrid(1.5);
        });
        $("#addlight").on("click",function(){
            ifilter.changefilterLight(0.7);
        });
    }

    /**
     * 处理视频
     */
    function dealVideo(){
        var that = $(this);
        if(that.html() == "开始播放"){
            ifilter.run();
            that.html("暂停播放");
            if(gifM == null) gifM = ifilter.addImg(Textures[1],true);
        }
        else{
            ifilter.pause();
            that.html("开始播放");
        }
    }

    /**
     * 滤镜初始化
     */
    function filterInit(){
        ifilter = new initVideoScene('myvideo','glwrap',updateImg);
    }

    /**
     * 更新图片
     */
    function updateImg(time,img){
        times++;
        if(times%5 == 0){
            nowImg++;
            nowImg =  nowImg > 4 ? 1 : nowImg;
            ifilter.changeImg(gifM,Textures[nowImg])
        }
        $("#cimg")[0].src = img;
    }
    
});