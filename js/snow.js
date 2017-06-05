var params, scene, camera, renderer, stats, gui, controls;

init();
animate();

function init() {
    // Params
    params = {
        'Number of snowflakes': 1000,
        'Snowflake size': 0.1,
        'Downward motion': 5,
        'Brownian motion': 1,
        'Melting factor': 0.5,
        'Step size': 0.01,
        'Scene size': 15
    };

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 50);

    // Lights
    lights.forEach(light => scene.add(light));

    // Objects
    objects.forEach(object => scene.add(object));

    // Snowflakes
    for (let i = 0; i < params['Number of snowflakes']; i++) {
        snowflakes[i] = new Snowflake();
    }

    // Camera
    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        100
    );
    camera.position.set(-6, 6, 8);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Stats
    stats = new Stats();
    document.body.appendChild(stats.dom);

    // GUI
    gui = new dat.GUI({ width: 350 });
    var snowflakesFolder = gui.addFolder('Snowflakes');
    snowflakesFolder.open();
    var sceneFolder = gui.addFolder('Scene');
    sceneFolder.open();

    snowflakesFolder
        .add(params, 'Number of snowflakes', 0, 2000)
        .step(1)
        .onChange(val => {
            let delta = val - snowflakes.length;
            console.log(delta);
            if (delta < 0) {
                // Remove snowflakes
                for (let i = 0; i < -1 * delta; i++) {
                    console.log('remove ' + i);
                    scene.remove(snowflakes[i].sprite);
                }
                snowflakes.splice(0, -1 * delta);
            } else {
                // Add snowflakes
                for (let i = 0; i < delta; i++) {
                    console.log('add ' + snowflakes.length);
                    snowflakes.push(new Snowflake());
                }
            }
            params['Number of snowflakes'] = val;
        });
    snowflakesFolder
        .add(params, 'Snowflake size', 0, 0.2)
        .onChange(val => (params['Snowflake size'] = val));
    snowflakesFolder
        .add(params, 'Downward motion', 0, 10)
        .onChange(val => (params['Downward motion'] = val));
    snowflakesFolder
        .add(params, 'Brownian motion', 0, 2)
        .onChange(val => (params['Brownian motion'] = val));
    snowflakesFolder
        .add(params, 'Melting factor', 0, 1)
        .onChange(val => (params['Melting factor'] = val));
    snowflakesFolder
        .add(params, 'Step size', 0.005, 0.015)
        .onChange(val => (params['Step size'] = val));

    sceneFolder
        .add(params, 'Scene size', 0, 30)
        .onChange(val => (params['Scene size'] = val));

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
    snowflakes.forEach(snowflake => snowflake.update());

    requestAnimationFrame(animate);

    controls.update();

    stats.update();

    renderer.render(scene, camera);
}

