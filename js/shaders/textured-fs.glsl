Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  out vec4 fragmentColor;
  in vec4 color;
  in vec4 tex;
  in vec4 modelPosition;

uniform struct{
  vec4 solidColor;
  sampler2D colorTexture;
  vec3 lightWoodColor;
  vec3 darkWoodColor;
  float freq;
  float noiseFreq;
  float noiseExp;
  float noiseAmp;
} material;

  uniform struct {
    float time;
  } scene;

  void main(void) {

    float w = fract( modelPosition.x );

    fragmentColor = material.solidColor * cos(scene.time) * 0.01
     + texture(material.colorTexture, tex.xy);
  }
`;