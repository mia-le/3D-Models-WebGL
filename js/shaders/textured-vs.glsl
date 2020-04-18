Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
in vec4 vertexPosition;
in vec4 vertexTexCoord;
out vec4 tex; // passed to FS
out vec4 modelPosition;

uniform struct{
  vec4 solidColor;
  sampler2D colorTexture;
  vec4 lightWoodColor;
  vec4 darkWoodColor;
  float freq;
  float noiseFreq;
  float noiseExp;
  float noiseAmp;
} material;

uniform struct {
  mat4 modelMatrix;
} gameObject;

uniform struct {
  mat4 viewProjMatrix;
} camera;

void main(void) {
  tex = vertexTexCoord;
  modelPosition = vertexPosition;
  gl_Position = vertexPosition * gameObject.modelMatrix * camera.viewProjMatrix;
}
`;