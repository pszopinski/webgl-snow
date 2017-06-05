var objects, floor, cube, sphere;

function createFloor() {
    var geometry = new THREE.PlaneBufferGeometry(30, 30);
    var material = new THREE.MeshPhongMaterial({
        color: 0xcccccc,
        side: THREE.DoubleSide,
        shininess: 15,
        dithering: true
    });
    var floor = new THREE.Mesh(geometry, material);
    floor.position.y = -0.01;
    floor.rotation.x = Math.PI / 2;
    floor.receiveShadow = true;
    return floor;
}

function createCube() {
    var geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        shininess: 100,
        dithering: true
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(1, 1, 1);
    cube.castShadow = true;
    return cube;
}

function createSphere() {
    var geometry = new THREE.SphereBufferGeometry(1, 12, 12);
    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
        shininess: 150,
        dithering: true
    });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(-1, 1, -1);
    sphere.castShadow = true;
    return sphere;
}

floor = createFloor();
cube = createCube();
sphere = createSphere();

objects = [];
objects.push(floor);
objects.push(cube);
objects.push(sphere);

