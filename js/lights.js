var lights, ambient, lamp;

function createAmbient() {
    var ambient = new THREE.AmbientLight(0xffffff, 0.25);
    return ambient;
}

function createLamp(color, x, y, z) {
    var lamp = new THREE.SpotLight(color, 0.5, 30, 20, 1);
    lamp.position.set(x, y, z);
    lamp.castShadow = true;
    lamp.shadow.mapSize.width = 4096;
    lamp.shadow.mapSize.height = 4096;
    lamp.shadow.camera.near = 1;
    lamp.shadow.camera.far = 50;
    return lamp;
}

ambient = createAmbient();
lamp1 = createLamp(0xffeecc, 5, 8, -6);
lamp2 = createLamp(0xccddff, 3, 8, -6);

lights = [];
lights.push(ambient);
lights.push(lamp1);
lights.push(lamp2);

