function initVideoScene(videoId, containerId, callback) {
    var _self = this;
    var videoObj = document.getElementById(videoId);
    var canvasObj;
    var movieObj;
    
    var renderer;
    var camera;
    var scene;

    var playflag = false;
    var filter = 0;

    /**
     * 执行
     */
    _self.run = function(){
        videoObj.play();
        playflag = true;
    }

    /**
     * 暂停
     */
    _self.pause = function(){
        videoObj.pause();
        playflag = false;
    }

    /**
     * 修改滤镜
     * @param {Number} type 可选 0 - 6; 
     */
    _self.changefilter = function(type){
        if(type >= 0 && type <= 6){
            filter = type;
            movieObj.movieMaterial.uniforms.filterType.value = type;
            movieObj.movieMaterial.uniforms.texture.needsUpdate = true;
        }
    }

    /**
     * 修改明暗
     * @param {Number} value 可选 0.1 - 0.7; 
     */
    _self.changefilterLight = function(value){
        if(filter == 3 && value <= 0.7 && value >= 0.1){
            movieObj.movieMaterial.uniforms.lightLevel.value = value;
            movieObj.movieMaterial.uniforms.texture.needsUpdate = true;
        }
    }

    /**
     * 修改噪点数
     * @param {Number} value 可选 0.2 - 1.5; 
     */
    _self.changefilterGrid = function(value){
        if(filter == 6 && value <= 1.5 && value >= 0.2){
            movieObj.movieMaterial.uniforms.gridSize.value = value;
            movieObj.movieMaterial.uniforms.texture.needsUpdate = true;
        }
    }

    /**
     * 加载图片纹理
     */
    _self.loadTexture = function(imgs,callback){
        var len = imgs.length;
        var Textures = [];

        for (var i = 0; i < len; i++) {
            var loader = new THREE.TextureLoader();
            loader.load(
                imgs[i],
                function ( texture ) {
                    Textures.push(texture);
                    if(Textures.length == len && callback){
                        callback(Textures);
                    }
                }
            );
        }
    }

    /**
     * 添加图片
     */
    _self.addImg = function(imgTexture,transparent){
        var imgObj;
        var imageGeometry;
        var imageMaterial;
        imageGeometry = new THREE.PlaneGeometry(4, 3);
        imageMaterial =  new THREE.MeshBasicMaterial();
        imageMaterial.map = imgTexture;
        imageMaterial.transparent = transparent;
        imgObj = new THREE.Mesh(imageGeometry, imageMaterial);
        // imgObj.position.set(0, 0, 0);
        // imgObj.scale.set(1, 1, 1);
        // imgObj.visible = true;
        scene.add(imgObj);

        return imageMaterial;
    }

    /**
     * 修改图片
     */
    _self.changeImg = function(Material,imgTexture){
        Material.map = imgTexture;
    }

    /**
     * 初始化
     */
    function _init(){
        _senceInit();
        _movieInit();
        _animate();
    }
    _init();

    /**
     * 动画
     */
    function _animate() {
        if ((videoObj.currentTime > 0) && movieObj.movie.visible == false) {
            movieObj.movie.visible = true;
        }
        
        renderer.render(scene, camera);

        if(playflag && callback){
            var img = canvasObj.toDataURL("image/png")
            callback(videoObj.currentTime,img);
        }

        requestAnimationFrame(function(){
            _animate();
        });
    }

    /**
     * 场景初始化
     */
    function _senceInit(){
        scene = new THREE.Scene();
        window.scene = scene;

        camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
        camera.position.set(0, 0, 1);
        scene.add(camera);

        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        canvasObj = renderer.domElement;
        document.getElementById(containerId).appendChild(canvasObj);
        renderer.setClearColor(0xffffff, 0);
        renderer.setSize(videoObj.width, videoObj.height);
    }

    /**
     * 视频初始化
     */
    function _movieInit(){
        var movie;
        var movieGeometry;
        var movieMaterial;
        movieMaterial = new ChromaKeyMaterial(videoId, videoObj.width, videoObj.height, 0x00ff05, 0);
        movieGeometry = new THREE.PlaneGeometry(4, 3);
        movieMaterial.side = THREE.DoubleSide;
        movie = new THREE.Mesh(movieGeometry, movieMaterial);
        movie.position.set(0, 0, 0);
        movie.scale.set(1, 1, 1);
        movie.visible = false;
        scene.add(movie);
        movieObj = {
            movie:movie,
            movieGeometry:movieGeometry,
            movieMaterial:movieMaterial
        }
    }
}