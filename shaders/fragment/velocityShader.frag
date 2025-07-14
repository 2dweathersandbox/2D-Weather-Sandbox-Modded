#version 300 es
precision highp float;
precision highp sampler2D;
precision highp isampler2D;

in vec2 fragCoord;
in vec2 texCoord;
in vec2 texCoordXpY0;
in vec2 texCoordX0Yp;

uniform sampler2D baseTex;
uniform isampler2D wallTex;
uniform sampler2D initialTex; // New texture for initial_Tv data

uniform float dragMultiplier;
uniform float wind;
uniform vec2 texelSize;

layout(location = 0) out vec4 base;
layout(location = 2) out ivec4 wall;

// New function to replace getInitialT
float getInitialT(int y) {
    float v = float(y) / 504.0; // Normalize index to [0,1]
    return texture(initialTex, vec2(v, 0.5)).r;
}

void main() {
    base = texture(baseTex, texCoord);
    vec4 baseXpY0 = texture(baseTex, texCoordXpY0);
    vec4 baseX0Yp = texture(baseTex, texCoordX0Yp);

    wall = texture(wallTex, texCoord);

    if (wall[1] == 0) {
        base[0] = 0.0;
        base[1] = 0.0;
    } else {
        base[0] += base[2] - baseXpY0[2];
        base[1] += base[2] - baseX0Yp[2];

        base[0] *= 1.0 - dragMultiplier * 0.0002;
        base[1] *= 1.0 - dragMultiplier * 0.0002;

        base[0] -= pow(base[0], 5.0) * dragMultiplier;
        base[1] -= pow(base[1], 5.0) * dragMultiplier;

        base[0] += wind * 0.000001;
    }
}