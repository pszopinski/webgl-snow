function Snowflake() {
    this.state = 'unborn';

    var image = new THREE.TextureLoader().load(
        'textures/snowflake' + Math.floor(1 + Math.random() * 15) + '.png'
    );
    var rotation = Math.random() * Math.PI * 2;
    this.material = new THREE.SpriteMaterial({
        map: image,
        rotation: rotation
    });

    this.sprite = new THREE.Sprite(this.material);

    this.update = function() {
        if (this.state == 'unborn') {
            // Choose a random position
            let x, y, z;
            x = Math.random() * params['Scene size'] / 2;
            x *= Math.random() < 0.5 ? -1 : 1;
            y = Math.random() * params['Scene size'] / 2;
            y *= Math.random() < 0.5 ? -1 : 1;
            y += params['Scene size'];
            z = Math.random() * params['Scene size'] / 2;
            z *= Math.random() < 0.5 ? -1 : 1;
            this.sprite.position.set(x, y, z);

            // Reset opacity and scale
            this.material.opacity = 1;
            let scale = (1 + Math.random()) * params['Snowflake size'];
            this.sprite.scale.set(scale, scale, scale);

            // Reset the brownian vector
            this.vector = new THREE.Vector3(0, 0, 0);

            // Add the snowflake to the scene
            scene.add(this.sprite);

            // Change the state
            this.state = 'in-flight';
        } else if (this.state == 'in-flight') {
            // Remove out-of-bounds snowflakes
            let limit = params['Scene size'] / 2;
            if (
                Math.abs(this.sprite.position.x) > limit ||
                this.sprite.position.y < -limit ||
                Math.abs(this.sprite.position.z) > limit
            ) {
                this.state = 'unborn';
                return;
            }

            // Detect collisions
            // TODO

            // Apply downward motion
            this.sprite.position.y -=
                params['Downward motion'] * params['Step size'];

            // Modyfiy the brownian vector
            let increment = new THREE.Vector3(
                Math.random() - 0.5,
                Math.random() - 0.5,
                Math.random() - 0.5
            ).divideScalar(5000);
            this.vector
                .add(increment)
                .normalize()
                .multiplyScalar(
                    params['Brownian motion'] * params['Step size']
                );

            // Apply brownian motion
            this.sprite.position.add(this.vector);
        } else if (this.state == 'melting') {
            // Remove melted snowflakes
            if (this.material.opacity < 0.01) {
                this.state = 'unborn';
                return;
            }

            // Modify scale and opacity
            let multiplier = 1 - params['Melting factor'] / 10;
            this.material.opacity *= Math.pow(multiplier, 2);
            this.sprite.scale.divideScalar(Math.sqrt(multiplier));
        }
    };
}

