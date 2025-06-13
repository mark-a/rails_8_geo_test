import {Controller} from "@hotwired/stimulus"


import * as THREE from "three";
import { OrbitControls } from "three/orbit"
import GUI from "lil-gui";


export default class extends Controller {
    static values = {latitude: Number, longitude: Number};

    connect() {

        const viewportData = getViewportData.apply(this);

        var meshColor = "hsl(0, 0%, 11%)";
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            meshColor = "hsl(0 0% 80%)";
        }


        const config = {
            classNames: {
                sceneParent: "sceneParent"
            },
            viewport: viewportData,
            camera: {
                left: viewportData.width / -2,
                right: viewportData.width / 2,
                top: viewportData.height / 2,
                bottom: viewportData.height / -2,
                near: -500,
                far: 500,
                aspect: viewportData.aspectRatio,
                position: [0, 0, -1],
                lookAt: [0, 0, 0]
            },
            meshes: {
                sphere: {position: [0, 0, 0], color: meshColor, radius: 160},
                marker: {color: "red", radius: 6}
            },
            gui: {
                latitude: this.latitudeValue, // Range: -90 to 90
                longitude: this.longitudeValue // Range: -180 to 180
            }
        };


        init(config, this);

    }
}

function createCamera(config) {
    const {
        left,
        right,
        top,
        bottom,
        near,
        far,
        aspect,
        position,
        lookAt
    } = config.camera;
    const camera = new THREE.OrthographicCamera(
        left,
        right,
        top,
        bottom,
        near,
        far
    );
    camera.position.set(...position);
    camera.lookAt(...lookAt);

    return camera;
}

function createRenderer(sceneParent, config) {
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    const {width, height, pixelRatio} = config.viewport;
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.setClearColor(0xffffff, 0);

    sceneParent.appendChild(renderer.domElement);
    return renderer;
}

function createSphere(config) {
    const {radius, position, color} = config.meshes.sphere;

    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({
        color,
        wireframe: true
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(...position);

    return sphere;
}

function createMarker(config) {
    const {
        gui: {longitude, latitude},
        meshes: {
            marker: {radius, color}
        }
    } = config;

    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 16, 16),
        new THREE.MeshBasicMaterial({color})
    );
    moveMarker({
        marker: mesh,
        longitude,
        latitude
    }, config);

    return mesh;
}

function getViewportData() {
    return {
        width: this.element.clientWidth,
        height: 480,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
}

function createMeshes(config) {
    return [createSphere(config), createMarker(config)];
}

function initControls({camera, renderer}) {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    controls.addEventListener("start", () => {
        renderer.domElement.style.cursor = "grabbing";
    });

    controls.addEventListener("end", () => {
        renderer.domElement.style.cursor = "grab";
    });

    return controls;
}

function latLongToVector3(latitude, longitude, config) {


    const radius = config.meshes.sphere.radius;
    const center = new THREE.Vector3(...config.meshes.sphere.position);

    const {sin, cos, PI} = Math;
    const phi = (90 - latitude) * (PI / 180);
    const theta = (longitude + 180) * (PI / 180);

    const x = -radius * sin(phi) * cos(theta);
    const y = radius * cos(phi);
    const z = radius * sin(phi) * sin(theta);

    return new THREE.Vector3(x, y, z).add(center);
}

function moveMarker({marker, latitude, longitude}, config) {
    const pos = latLongToVector3(latitude, longitude, config);
    marker.position.copy(pos);
}

function onNewFrame({renderer, scene, camera, controls}) {
    controls.update();
    renderer.render(scene, camera);
}

function onResize({camera, renderer},instance) {
    const {width, height} = getViewportData.apply(instance);

    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;

    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function initCanvas3d(config, instance) {
    const sceneParent = document.querySelector(
        `.${config.classNames.sceneParent}`
    );

    if (!sceneParent) {
        throw new Error(`Element not found`);
    }

    const scene = new THREE.Scene();
    const camera = createCamera(config);
    const renderer = createRenderer(sceneParent, config);
    const [sphere, marker] = createMeshes(config);
    const controls = initControls({camera, renderer});

    scene.add(sphere, marker);

    window.addEventListener("resize", () => onResize({camera, renderer}, instance));

    renderer.setAnimationLoop(() => {
        onNewFrame({renderer, scene, camera, controls});
    });

    return {marker};
}

function initGui(marker, config) {
    const gui = new GUI();
    gui.add(config.gui, "latitude", -90, 90).onChange(onChange);
    gui.add(config.gui, "longitude", -180, 180).onChange(onChange);

    function onChange() {
        const {longitude, latitude} = config.gui;

        moveMarker({marker, latitude, longitude}, config);
    }
}

function init(config, instance) {
    const {marker} = initCanvas3d(config, instance);
    //initGui(marker, config);
}


