import * as THREE from 'three';
import { Camera } from './init/camera';
import { Scene } from './init/scene';
import { Renderer } from './init/renderer';
import { Controls } from './init/controls';
import { Lights } from './init/lights';
import { Geometry } from './init/geometry';
import { Model } from './init/model';

//----------------------- Variablen -----------------------//
let ground_width = 3000;
let ground_length = 3000;
let camera, scene, renderer, ground, lights, controls, mixer, clock;

//----------------------- Funktionsaufrufe -----------------------//
init();
createScene();

//----------------------- Funktionen -----------------------//

// Erstellt: Kamera, Szene, Renderer, Bewegungskontroller
function init() {
    camera = new Camera();
    scene = new Scene();
    renderer = new Renderer();
    clock = new THREE.Clock();
    controls = new Controls(camera.getCamera(), renderer.getRenderer().domElement);
}

function setModelAnimation() {
    let model = new Model();
    model.setModelName('../../models/BallAnimated.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        mesh.position.set(0, 10, 0);
        scene.getScene().add(mesh);
        mixer = new THREE.AnimationMixer(mesh);
        const clips = gltf.animations;
        clips.forEach(function(clip) {
            const action = mixer.clipAction(clip);
            action.play();
        });
    });
}

function setModel() {
    let model = new Model();
    model.setModelName('../../models/SpielfeldAnimated.glb');
    model.getModel().load(model.getModelName(), (gltf) => {
        let mesh = gltf.scene;
        mesh.position.set(0, 10, 0);
        scene.getScene().add(mesh);
    });
}

// Erstellt: Licht, Boden, Modelle
function createScene() {
    lights = new Lights();
  //  ground = new Geometry();
   // ground.createPlane(ground_width, ground_length);

    scene.getScene().add(
        lights.getAmbientLight(),
        lights.getDirLight1(),
        lights.getDirLight2(),
       // lights.getHelper(),
       // ground.getPlane()
    );
    setModelAnimation();
    setModel();

    // event listeners
    window.addEventListener('resize', onWindowResize, false);
    animate();
}

function onWindowResize() {
    camera.getCamera().aspect = window.innerWidth / window.innerHeight;
    camera.getCamera().updateProjectionMatrix();
    renderer.getRenderer().setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    if(mixer)
        mixer.update(clock.getDelta());
        requestAnimationFrame(animate);
        controls.getControls().update();
        render();
}

function render() {
    renderer.getRenderer().render(scene.getScene(), camera.getCamera());
}