import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D({ className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Root group for rotation and mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Geodesic Security Shield (Wireframe Icosahedron)
    const outerGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const outerWireframe = new THREE.WireframeGeometry(outerGeo);
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x6C8CFF,
      transparent: true,
      opacity: 0.32,
      linewidth: 1
    });
    const outerLines = new THREE.LineSegments(outerWireframe, outerMat);
    mainGroup.add(outerLines);

    // 2. Middle Cryptographic Lattice (Electric Lime Dodecahedron)
    const midGeo = new THREE.DodecahedronGeometry(1.5, 1);
    const midWireframe = new THREE.WireframeGeometry(midGeo);
    const midMat = new THREE.LineBasicMaterial({
      color: 0xC7FF4A,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5
    });
    const midLines = new THREE.LineSegments(midWireframe, midMat);
    mainGroup.add(midLines);

    // 3. Inner Quantum Core (Faceted Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(0.8, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xC7FF4A,
      wireframe: true,
      transparent: true,
      opacity: 0.9
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 4. Node Particle Network (Defense Nodes)
    const particleCount = 180;
    const particleCoords = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const limeColor = new THREE.Color(0xC7FF4A);
    const blueColor = new THREE.Color(0x6C8CFF);

    for (let i = 0; i < particleCount; i++) {
      // Distribute on sphere surface with random radii
      const radius = 2.0 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particleCoords[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particleCoords[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particleCoords[i * 3 + 2] = radius * Math.cos(phi);

      const isLime = Math.random() > 0.4;
      const c = isLime ? limeColor : blueColor;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particleCoords, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particles);

    // Mouse Tracking for Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseX = (clientX / container.clientWidth) * 2 - 1;
      mouseY = -(clientY / container.clientHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Slow ambient rotations
        outerLines.rotation.y += 0.003;
        outerLines.rotation.x += 0.001;

        midLines.rotation.y -= 0.005;
        midLines.rotation.z += 0.002;

        coreMesh.rotation.y += 0.008;
        coreMesh.rotation.x -= 0.004;

        particles.rotation.y += 0.0015;

        // Subtle breathing scale on core
        const scale = 1 + Math.sin(elapsedTime * 2) * 0.08;
        coreMesh.scale.set(scale, scale, scale);

        // Smooth mouse parallax lerp
        targetRotationY = mouseX * 0.45;
        targetRotationX = -mouseY * 0.45;

        mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.05;
        mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.05;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      outerGeo.dispose();
      outerWireframe.dispose();
      outerMat.dispose();
      midGeo.dispose();
      midWireframe.dispose();
      midMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
}
