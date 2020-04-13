Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 vertexPosition;
  in vec4 vertexTexCoord;
  out vec4 tex; // passed to FS
  out vec4 modelPosition;


  uniform struct {
    mat4 rayDirMatrix;
  } camera;

  void main(void) {
  	tex = vertexTexCoord;
    gl_Position = vertexPosition * camera.rayDirMatrix;
  }
`;