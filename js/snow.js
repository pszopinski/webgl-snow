var scene, camera, renderer;

init();
animate();

function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.set(0, 5, 10);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
}   

function animate() {
    requestAnimationFrame(animate);
    
    renderer.render(scene, camera);
}
