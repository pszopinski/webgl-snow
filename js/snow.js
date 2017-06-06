var params, scene, camera, renderer, stats, gui, controls;

init();
animate();

function init() {
    // Params
    params = {
        'Number of snowflakes': 2000,
        'Snowflake size': 0.1,
        'Downward motion': 5,
        'Brownian motion': 2,
        'Melting factor': 0.05,
        'Step size': 0.01,
        'Scene size': 15,
        'Show floor': true,
        'Show box': true,
        'Show sphere': false
    };

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 1, 50);

    // Lights
    lights.forEach(light => scene.add(light));

    // Objects
    if (params['Show floor']) {
        scene.add(floor);
    }
    if (params['Show box']) {
        scene.add(box);
    }
    if (params['Show sphere']) {
        scene.add(sphere);
    }

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
    camera.position.set(-3, 2, -4);

    // Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x111111, 1);
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
        .add(params, 'Number of snowflakes', 0, 5000)
        .step(500)
        .onChange(val => {
            let delta = val - snowflakes.length;
            if (delta < 0) {
                // Remove snowflakes
                for (let i = 0; i < -1 * delta; i++) {
                    scene.remove(snowflakes[i].sprite);
                }
                snowflakes.splice(0, -1 * delta);
            } else {
                // Add snowflakes
                for (let i = 0; i < delta; i++) {
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
        .add(params, 'Brownian motion', 0, 10)
        .onChange(val => (params['Brownian motion'] = val));
    snowflakesFolder
        .add(params, 'Melting factor', 0, 0.5)
        .onChange(val => (params['Melting factor'] = val));
    snowflakesFolder
        .add(params, 'Step size', 0.005, 0.015)
        .onChange(val => (params['Step size'] = val));

    sceneFolder
        .add(params, 'Scene size', 0, 30)
        .onChange(val => (params['Scene size'] = val));
    sceneFolder.add(params, 'Show floor').onChange(val => {
        val ? scene.add(floor) : scene.remove(floor);
        params['Show floor'] = val;
    });
    sceneFolder.add(params, 'Show box').onChange(val => {
        val ? scene.add(box) : scene.remove(box);
        params['Show box'] = val;
    });
    sceneFolder.add(params, 'Show sphere').onChange(val => {
        val ? scene.add(sphere) : scene.remove(sphere);
        params['Show sphere'] = val;
    });

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

