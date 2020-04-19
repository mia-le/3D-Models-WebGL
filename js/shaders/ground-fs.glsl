Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
precision highp float;

out vec4 fragmentColor;
in vec4 tex;
in vec4 modelPosition;

uniform struct{
    sampler2D colorTexture;
} material;

uniform struct {
    float time;
} scene;

void main(void) {

    fragmentColor = texture(material.colorTexture, tex.xz / tex.w);
}
`;
