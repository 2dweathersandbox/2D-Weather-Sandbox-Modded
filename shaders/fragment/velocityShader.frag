// velocityShader.frag
precision mediump float;

uniform sampler2D u_velocity;
uniform vec2 u_resolution;

void main() {
    // Convert pixel coordinates to normalized coordinates (UV)
    vec2 uv = gl_FragCoord.xy / u_resolution;

    // Read the current velocity value from the velocity texture
    vec2 velocity = texture2D(u_velocity, uv).xy;

    // Output the velocity as RG (XY), fill B as 0, and Alpha as 1
    gl_FragColor = vec4(velocity, 0.0, 1.0);
}