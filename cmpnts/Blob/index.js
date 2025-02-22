import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";

const Blob = () => {
    const mesh = useRef();
    const hover = useRef(false);
    const uniforms = useMemo(() => ({
        u_time: { value: 0 },
        u_intensity: { value: 0.3 }
    }), []);

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            mesh.current.material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();
    
            // Make sure hover interaction affects intensity
            mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
                mesh.current.material.uniforms.u_intensity.value,
                hover.current ? 1 : 0.15, // Adjust intensity when hovering
                0.02
            );
    
            // Add rotation effect
            mesh.current.rotation.y += 0.01;
            mesh.current.rotation.x += 0.005;
        }
    });

    return (
        <mesh ref={mesh}
            scale={1.5} position={[0, 0, 0]}
            onPointerOver={() => (hover.current = true)}
            onPointerOut={() => (hover.current = false)}
        >
            <icosahedronGeometry args={[2, 20]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

export default Blob;
