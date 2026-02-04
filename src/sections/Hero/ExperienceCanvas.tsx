import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, ContactShadows, useScroll, ScrollControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function PlaceholderSUV() {
    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.2}>
            <group rotation={[0, -Math.PI / 12, 0]}>
                {/* Main Body */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[4.2, 1.2, 2]} />
                    <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Cabin */}
                <mesh position={[-0.2, 1, 0]} castShadow>
                    <boxGeometry args={[2.5, 0.8, 1.8]} />
                    <meshStandardMaterial color="#050505" metalness={1} roughness={0} transparent opacity={0.7} />
                </mesh>
                {/* Wheels Placeholder */}
                <mesh position={[1.4, -0.6, 0.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[1.4, -0.6, -0.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[-1.6, -0.6, 0.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                <mesh position={[-1.6, -0.6, -0.9]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                    <cylinderGeometry args={[0.45, 0.45, 0.3, 32]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
                {/* Lights */}
                <mesh position={[2.1, 0, 0.7]}>
                    <boxGeometry args={[0.1, 0.2, 0.4]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                </mesh>
                <mesh position={[2.1, 0, -0.7]}>
                    <boxGeometry args={[0.1, 0.2, 0.4]} />
                    <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={2} />
                </mesh>
            </group>
        </Float>
    );
}

function Scene() {
    const scroll = useScroll();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);

    useFrame(() => {
        if (!cameraRef.current) return;

        // Smooth camera movement from right to left in front of the car
        // We base it on the scroll progress (0 to 1)
        const progress = scroll.offset;

        // Starting position (Right Front): x=6, z=8
        // Middle position (Center Front): x=0, z=10
        // Ending position (Left Front): x=-6, z=8

        const xPos = 6 - progress * 12;
        const zPos = 8 + Math.sin(progress * Math.PI) * 2;

        cameraRef.current.position.set(xPos, 2, zPos);
        cameraRef.current.lookAt(0, 0, 0);
    });

    return (
        <>
            <PerspectiveCamera ref={cameraRef} makeDefault fov={45} />

            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={150} castShadow color="#fff" />
            <pointLight position={[-10, 5, -10]} intensity={20} color="#00ffff" />

            <Environment preset="night" />

            <group position={[0, -0.5, 0]}>
                <PlaceholderSUV />
            </group>

            <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.6}
                scale={20}
                blur={2.5}
                far={4.5}
                color="#000"
            />
        </>
    );
}

export function ExperienceCanvas() {
    return (
        <div className="h-full w-full">
            <Canvas shadows>
                <Suspense fallback={null}>
                    <ScrollControls pages={3} damping={0.2}>
                        <Scene />
                    </ScrollControls>
                </Suspense>
            </Canvas>
        </div>
    );
}
