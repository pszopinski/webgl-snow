var params, scene, snowflakes, camera, renderer, stats, gui, controls;

init();
animate();

function init() {
    // Params
    params = {
        'Number of snowflakes': 1000,
        'Downward motion': 5,
        'Brownian motion': 2
    };

    // Scene
    scene = new THREE.Scene();

    // Snowflakes
    snowflakes = [];
    for (let i = 0; i < params['Number of snowflakes']; i++) {
        snowflakes[i] = new Snowflake(i);
    }

    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        100
    );
    camera.position.set(0, 5, 10);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // GUI
    gui = new dat.GUI({ width: 300 });
    var snowflakesFolder = gui.addFolder('Snowflakes');
    snowflakesFolder.open();
    var sceneFolder = gui.addFolder('Scene');
    sceneFolder.open();

    snowflakesFolder
        .add(params, 'Number of snowflakes', 500, 5000)
        .step(100)
        .onChange(val => console.log('Number of snowflakes: ' + val));
    snowflakesFolder
        .add(params, 'Downward motion', 0, 10)
        .onChange(val => console.log('Downward motion: ' + val));
    snowflakesFolder
        .add(params, 'Brownian motion', 0, 10)
        .onChange(val => console.log('Brownian motion: ' + val));

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;
    controls.enableZoom = true;

    // Resize
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    stats.update();

    renderer.render(scene, camera);
}

