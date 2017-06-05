function Snowflake(id) {
    this.id = id;
    var image = new THREE.TextureLoader().load(
        'textures/snowflake' + (id % 15 + 1) + '.png'
    );
    this.material = new THREE.SpriteMaterial({ map: image });
    this.sprite = new THREE.Sprite(this.material);
}

