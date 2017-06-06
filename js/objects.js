var objects, floor, box, sphere;

function createFloor() {
    var geometry = new THREE.CircleBufferGeometry(7.5, 8);
    var material = new THREE.MeshStandardMaterial({
        color: 0x333333,
        dithering: true,
        metalness: 0.2,
        roughness: 0.8
    });
    var floor = new THREE.Mesh(geometry, material);
    floor.position.y = -1;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    return floor;
}

function createBox() {
    var geometry = new THREE.BoxBufferGeometry(2, 2, 2);
    var material = new THREE.MeshStandardMaterial({
        color: 0x66aaff,
        dithering: true,
        shading: THREE.FlatShading,
        metalness: 0.2,
        roughness: 0.1
    });
    var box = new THREE.Mesh(geometry, material);
    box.receiveShadow = true;
    box.castShadow = true;
    return box;
}

function createSphere() {
    var geometry = new THREE.IcosahedronGeometry(1, 2);
    var material = new THREE.MeshStandardMaterial({
        color: 0xff66aa,
        dithering: true,
        metalness: 0.2,
        roughness: 0.1
    });
    var sphere = new THREE.Mesh(geometry, material);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    return sphere;
}

floor = createFloor();
box = createBox();
sphere = createSphere();

objects = [];
objects.push(floor);
objects.push(box);
objects.push(sphere);

