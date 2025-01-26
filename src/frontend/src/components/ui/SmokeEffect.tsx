"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const SmokeEffect = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer,
      scene: THREE.Scene,
      camera: THREE.PerspectiveCamera;
    let particles: THREE.Mesh[] = [];
    let clock: THREE.Clock;

    const init = () => {
      clock = new THREE.Clock();

      renderer = new THREE.WebGLRenderer();
      if (mountRef.current) {
        renderer.setSize(
          mountRef.current.clientWidth,
          mountRef.current.clientHeight
        );
        mountRef.current.appendChild(renderer.domElement);
      }

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
        50,
        mountRef.current?.clientWidth! / mountRef.current?.clientHeight!,
        1,
        100
      );
      camera.position.z = 5;
      scene.add(camera);

      const light = new THREE.DirectionalLight(0xffffff, 1.0);
      light.position.set(-1, 0, 1);
      scene.add(light);

      const textureLoader = new THREE.TextureLoader();
      const smokeTexture = textureLoader.load(
        "https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/smoke_01.png"
      );

      const material = new THREE.MeshLambertMaterial({
        color: 0x87cefa,
        depthWrite: false,
        map: smokeTexture,
        transparent: true,
      });

      const geometry = new THREE.PlaneGeometry(5, 5);

      for (let i = 0; i < 40; i++) {
        const particle = new THREE.Mesh(geometry, material);
        particle.position.set(
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 5
        );
        particle.rotation.z = Math.random() * Math.PI * 2;
        scene.add(particle);
        particles.push(particle);
      }

      const animate = () => {
        const delta = clock.getDelta();
        particles.forEach((particle) => {
          const z = particle.rotation.z;
          particle.lookAt(camera.position);
          particle.rotation.z = z + delta * 0.1;
        });
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      const onWindowResize = () => {
        if (mountRef.current) {
          const width = mountRef.current.clientWidth;
          const height = mountRef.current.clientHeight;

          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      };

      window.addEventListener("resize", onWindowResize);

      return () => {
        window.removeEventListener("resize", onWindowResize);
        mountRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
        scene.clear();
        particles = [];
      };
    };

    init();
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    />
  );
};

export default SmokeEffect;
