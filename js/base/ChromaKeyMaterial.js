ChromaKeyMaterial = function (domid, width, height, keyColor, filtertype) {
    THREE.ShaderMaterial.call(this);
    var keyColorObject = new THREE.Color(keyColor);
    var video = document.getElementById(domid);
    video.loop = true;
    video.setAttribute('webkit-playsinline', 'webkit-playsinline');
    video.setAttribute('playsinline', 'playsinline');
    var videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    var myuniforms = {
        texture: {
            type: "t",
            value: videoTexture
        },
        color: {
            type: "c",
            value: keyColorObject
        },
        videowidth: {
            type: "f",
            value: width
        },
        videoheight: {
            type: "f",
            value: height
        },
        filterType: {
            type: "i",
            value: filtertype
        },
        lightLevel: {
            type: "f",
            value: 0.2
        },
        gridSize: {
            type: "f",
            value: 0.8
        }
    };
    this.setValues({
        uniforms: myuniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true
    });
}

ChromaKeyMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
