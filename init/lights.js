import * as THREE from 'three';

export class Lights {
    constructor() {
        this.createAmbientLight();
        this.createDirLight1();
        this.createDirLight2();
        this.createHelper();
    }

    createAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xfff2cc, 2);
    }

    createDirLight1() {
        this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        this.dirLight.position.set(0, 100, -100);
    }
    createDirLight2() {
        this.dirLight2 = new THREE.DirectionalLight(0xffffff, 2);
        this.dirLight2.position.set(0, 100, 100);
    }

    createHelper() {
        this.helper = new THREE.DirectionalLightHelper( this.dirLight, 5 );
    }

    getAmbientLight() {
        return this.ambientLight;
    }

    getDirLight1() {
        return this.dirLight;
    }

    getDirLight2() {
        return this.dirLight2;
    }

    getHelper() {
        return this.helper;
    }
}