const fragmentShader =`
uniform float u_intensity;
uniform float u_time;

varying vec2 vUv;
varying float vDisplacement;

void main() {
    // Compute distortion for water effect
    float distort = vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time * 0.5);
    
    // Water usually has very little color, maybe a slight blue tint
    vec3 baseColor = vec3(0.8, 0.9, 1.0); // very subtle blue
    
    // Add dynamic shading to simulate depth
    float shading = 0.8 + 0.2 * sin(vUv.y * 5.0 + distort * 2.0);
    vec3 color = baseColor * shading;

    // Transparent center, fading out to edges
    float alpha = smoothstep(0.5, 0.0, length(vUv - 0.5) + distort * 0.1);

    // Optional: add a fake "highlight" in the middle
    float highlight = smoothstep(0.02, 0.0, length(vUv - vec2(0.4, 0.4)));
    color += highlight * vec3(1.0, 1.0, 1.0); // white highlight

    gl_FragColor = vec4(color, alpha);
}
`;

export default fragmentShader;

/*
The pink-blue balck ver
void main() {
    // Compute distortion for a 3D-like effect
    float distort = vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time * 0.5);
    
    // Base color with a gradient shift
    vec3 color = vec3(
        1.0 - abs(vUv.x - 0.5) * 2.0, 
        0.4 + abs(vUv.y - 0.5) * 1.2 * (0.5 - distort), 
        1.2
    );

    // Enhance depth by adding shadow-like variations
    float shading = 0.5 + 0.5 * sin(vUv.y * 5.0 + distort * 2.0);
    color *= shading;

    // Dynamic alpha for transparency effect
    float alpha = smoothstep(0.0, 1.0, 1.5 - length(vUv - 0.5) * 2.0 - distort * 0.5);

    gl_FragColor = vec4(color * vec3(1.2, 0.4, 1.2), alpha);
}
*/