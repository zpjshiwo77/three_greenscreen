function initVideoScene(videoId, container) {
    var video = document.getElementById(videoId);
    var canvas;
    var playflag = false;
    var imgBox = document.getElementById('cimg');
    var renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas = renderer.domElement;
    document.getElementById(container).appendChild(canvas);
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(video.width, video.height);
    var scene = new THREE.Scene();
    window.scene = scene;

    var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 10);
    camera.position.set(0, 0, 1);
    scene.add(camera);

    var movie;
    var movieGeometry;
    var movieMaterial;
    movieMaterial = new ChromaKeyMaterial(videoId, video.width, video.height, 0x00ff05, 0);
    movieGeometry = new THREE.PlaneGeometry(4, 3);
    movieMaterial.side = THREE.DoubleSide;
    movie = new THREE.Mesh(movieGeometry, movieMaterial);
    movie.position.set(0, 0, 0);
    movie.scale.set(1, 1, 1);
    movie.visible = false;
    scene.add(movie);

    function imgtest(img,t){
        var iimage;
        var imageGeometry;
        var imageMaterial;
        imageGeometry = new THREE.PlaneGeometry(4, 3);
        imageMaterial =  new THREE.MeshBasicMaterial();
        var imgTexture = THREE.ImageUtils.loadTexture(img);
        imageMaterial.map = imgTexture;
        if(t) imageMaterial.transparent = true;
        iimage = new THREE.Mesh(imageGeometry, imageMaterial);
        // iimage.position.set(0, 0, 0);
        // iimage.scale.set(1, 1, 1);
        // iimage.visible = true;
        scene.add(iimage);
    }
    imgtest('1.jpg');

    animate();

    function animate() {
        if ((video.currentTime > 1) && movie.visible == false) {
            movie.visible = true;
        }
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        if(playflag){
            imgBox.src = canvas.toDataURL("image/png");
        }
    }

    document.getElementById('btnPlay').addEventListener('click', function () {
        playflag = true;
        video.play();
        imgtest('2.png',true);        
    });

    var curfilter = 0;
    document.getElementById("changefilterbtn").addEventListener("click", function () {
        if (curfilter == 6) {
            curfilter = 0
        } else {
            curfilter++
        }

        if (curfilter == 3) {
            document.getElementById("minuslight").style.display = "inline-block";
            document.getElementById("addlight").style.display = "inline-block";
        } else {
            document.getElementById("minuslight").style.display = "none";
            document.getElementById("addlight").style.display = "none";
        }

        if (curfilter == 6) {
            document.getElementById("minusgrid").style.display = "inline-block";
            document.getElementById("addgrid").style.display = "inline-block";
        } else {
            document.getElementById("minusgrid").style.display = "none";
            document.getElementById("addgrid").style.display = "none";
        }

        movieMaterial.uniforms.filterType.value = curfilter;
        movieMaterial.uniforms.texture.needsUpdate = true;
    })
    document.getElementById("addgrid").addEventListener("click", function () {
        if (curfilter == 6 && movieMaterial.uniforms.gridSize.value > 0.2) {
            movieMaterial.uniforms.gridSize.value -= 0.1;
            movieMaterial.uniforms.texture.needsUpdate = true;
        }
    })
    document.getElementById("minusgrid").addEventListener("click", function () {
        if (curfilter == 6 && movieMaterial.uniforms.gridSize.value < 1.5) {
            movieMaterial.uniforms.gridSize.value += 0.1;
            movieMaterial.uniforms.texture.needsUpdate = true;
        }
    })
    document.getElementById("minuslight").addEventListener("click", function () {
        if (curfilter == 3 && movieMaterial.uniforms.lightLevel.value > 0) {
            movieMaterial.uniforms.lightLevel.value -= 0.1;
            movieMaterial.uniforms.texture.needsUpdate = true;
        }
    })
    document.getElementById("addlight").addEventListener("click", function () {
        if (curfilter == 3 && movieMaterial.uniforms.lightLevel.value < 0.7) {
            movieMaterial.uniforms.lightLevel.value += 0.1;
            movieMaterial.uniforms.texture.needsUpdate = true;
        }
    })
}