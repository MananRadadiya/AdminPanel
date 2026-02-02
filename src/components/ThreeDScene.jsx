import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDScene() {
    const containerRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            container.clientWidth / container.clientHeight,
            1,
            1000
        );
        camera.position.z = 400;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.autoClear = false;

        container.appendChild(renderer.domElement);

        rendererRef.current = renderer;

        // Create three separate groups for rotation
        const circle = new THREE.Object3D();
        const skelet = new THREE.Object3D();
        const particle = new THREE.Object3D();

        scene.add(circle);
        scene.add(skelet);
        scene.add(particle);

        // Geometries
        const geometry = new THREE.TetrahedronGeometry(2, 0);
        const geom = new THREE.IcosahedronGeometry(7, 1);
        const geom2 = new THREE.IcosahedronGeometry(15, 1);

        // Materials
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
        });

        const mat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
        });

        const mat2 = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            wireframe: true,
            side: THREE.DoubleSide,
        });

        // Particles
        for (let i = 0; i < 800; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position
                .set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
                .normalize()
                .multiplyScalar(90 + Math.random() * 700);
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            particle.add(mesh);
        }

        // Circle planet
        const planet = new THREE.Mesh(geom, mat);
        planet.scale.x = planet.scale.y = planet.scale.z = 16;
        circle.add(planet);

        // Skeleton planet
        const planet2 = new THREE.Mesh(geom2, mat2);
        planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;
        skelet.add(planet2);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const lights = [];
        lights[0] = new THREE.DirectionalLight(0xffffff, 0.8);
        lights[0].position.set(1, 0, 0);
        lights[1] = new THREE.DirectionalLight(0xffffff, 0.8);
        lights[1].position.set(0.75, 1, 0.5);
        lights[2] = new THREE.DirectionalLight(0xffffff, 0.6);
        lights[2].position.set(-0.75, -1, 0.5);
        scene.add(lights[0]);
        scene.add(lights[1]);
        scene.add(lights[2]);

        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);

            // Rotation animations
            particle.rotation.y -= 0.004;
            circle.rotation.x -= 0.002;
            circle.rotation.y -= 0.003;
            skelet.rotation.x -= 0.001;
            skelet.rotation.y += 0.002;

            renderer.clear();
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);

            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }

            if (rendererRef.current) {
                rendererRef.current.dispose();

                if (
                    rendererRef.current.domElement &&
                    rendererRef.current.domElement.parentNode
                ) {
                    rendererRef.current.domElement.parentNode.removeChild(
                        rendererRef.current.domElement
                    );
                }
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-[280px] bg-black rounded-lg"
        />
    );

}
