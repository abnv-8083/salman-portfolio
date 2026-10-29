import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Primary Cryptographic Lattice (Icosahedron in Electric Purple 0xBF00FF & Charcoal 0x2D2D2D)
    const geoOuter = new THREE.IcosahedronGeometry(2.1, 1);
    const wireOuter = new THREE.WireframeGeometry(geoOuter);
    const matOuter = new THREE.LineBasicMaterial({
      color: 0xBF00FF,
      transparent: true,
      opacity: 0.55
    });
    const meshOuter = new THREE.LineSegments(wireOuter, matOuter);
    group.add(meshOuter);

    // 2. Inner Neon Core (Octahedron in vibrant Neon Green 0x2CFF05)
    const geoInner = new THREE.OctahedronGeometry(1.2, 0);
    const wireInner = new THREE.WireframeGeometry(geoInner);
    const matInner = new THREE.LineBasicMaterial({
      color: 0x2CFF05,
      transparent: true,
      opacity: 0.95,
      linewidth: 1.5
    });
    const meshInner = new THREE.LineSegments(wireInner, matInner);
    group.add(meshInner);

    // 3. Subtle Latitude Ring in Electric Purple 0xBF00FF
    const geoRing = new THREE.RingGeometry(2.38, 2.4, 48);
    const matRing = new THREE.MeshBasicMaterial({
      color: 0xBF00FF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const ringMesh = new THREE.Mesh(geoRing, matRing);
    ringMesh.rotation.x = Math.PI / 2.2;
    group.add(ringMesh);

    // 4. Secondary Horizontal Ring in Neon Green 0x2CFF05
    const geoRing2 = new THREE.RingGeometry(1.8, 1.82, 48);
    const matRing2 = new THREE.MeshBasicMaterial({
      color: 0x2CFF05,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ringMesh2 = new THREE.Mesh(geoRing2, matRing2);
    ringMesh2.rotation.y = Math.PI / 4;
    group.add(ringMesh2);

    // Controlled mouse tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.4;
      targetY = y * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // IntersectionObserver to pause rendering when offscreen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (!prefersReducedMotion) {
        meshOuter.rotation.y += 0.002;
        meshOuter.rotation.x += 0.001;

        meshInner.rotation.y -= 0.004;
        meshInner.rotation.z += 0.002;

        ringMesh.rotation.z += 0.003;

        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        group.rotation.y = mouseX;
        group.rotation.x = -mouseY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      geoOuter.dispose();
      matOuter.dispose();
      geoInner.dispose();
      matInner.dispose();
      geoRing.dispose();
      matRing.dispose();
      geoRing2.dispose();
      matRing2.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing ${className}`}
      aria-hidden="true"
    />
  );
}
