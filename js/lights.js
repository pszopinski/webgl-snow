var lights, ambient, lamp;

function createAmbient() {
    var ambient = new THREE.AmbientLight(0xffffff, 0.25);
    return ambient;
}

function createLamp() {
    var lamp = new THREE.SpotLight(0xffffff, 0.25, 30, 20, 1);
    lamp.position.set(-4, 6, 1);
    lamp.castShadow = true;
    lamp.shadow.mapSize.width = 1024;
    lamp.shadow.mapSize.height = 1024;
    lamp.shadow.camera.near = 1;
    lamp.shadow.camera.far = 50;
    return lamp;
}

ambient = createAmbient();
lamp = createLamp();

lights = [];
lights.push(ambient);
lights.push(lamp);

