import { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Progress } from '@/components/ui/progress';

function HeartShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const heartShape = new THREE.Shape();
  const x = 0, y = 0;
  heartShape.moveTo(x, y + 0.5);
  heartShape.bezierCurveTo(x, y + 0.5, x - 0.5, y, x - 0.5, y);
  heartShape.bezierCurveTo(x - 0.5, y - 0.35, x, y - 0.7, x, y - 1);
  heartShape.bezierCurveTo(x, y - 0.7, x + 0.5, y - 0.35, x + 0.5, y);
  heartShape.bezierCurveTo(x + 0.5, y, x, y + 0.5, x, y + 0.5);

  const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 8, bevelSize: 0.05, bevelThickness: 0.05 };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8} position={[0, 0.2, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial color="#d4365c" emissive="#8b1a3a" emissiveIntensity={0.4} metalness={0.3} roughness={0.4} />
      </mesh>
    </Float>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 60;
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    
    const isGold = Math.random() > 0.7;
    colors[i * 3] = isGold ? 0.9 : 0.85;
    colors[i * 3 + 1] = isGold ? 0.7 : 0.2;
    colors[i * 3 + 2] = isGold ? 0.3 : 0.4;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const posArr = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        posArr[i * 3 + 1] -= 0.005;
        if (posArr[i * 3 + 1] < -4) posArr[i * 3 + 1] = 4;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete,
      });
    }
  }, [progress, onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-valentine-burgundy/20 via-background to-background" />
      
      <div className="relative w-full h-[50vh] max-h-[400px]">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#d4365c" />
          <pointLight position={[-5, -3, 3]} intensity={0.5} color="#c9a44a" />
          <HeartShape />
          <FloatingParticles />
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.4}
            color="#d4a574"
            font="/fonts/dancing-script.woff"
            anchorX="center"
            anchorY="middle"
          >
            J ♥ Z
          </Text>
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-8">
        <h2 className="font-handwriting text-3xl md:text-4xl text-valentine-blush text-glow">
          Opening Our Story...
        </h2>
        <div className="w-64 md:w-80">
          <Progress value={progress} className="h-2 bg-secondary" />
        </div>
        <p className="font-casual text-lg text-muted-foreground">
          {progress < 30 ? '📖 Gathering memories...' : 
           progress < 60 ? '💌 Unfolding love letters...' : 
           progress < 90 ? '🌹 Arranging roses...' : '💕 Ready for you...'}
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
