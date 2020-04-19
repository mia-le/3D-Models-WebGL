const Shaders = {
	Vertex: {

	},
	Fragment: {

	}
};

const Programs = {

	ToList: function() {
		return Object.values(Programs).filter((x) => !(typeof x === 'function'));
	}
};

function LoadShadersAndPrograms(gl) {

	// Load Shaders
	Shaders.Fragment.Textured = new Shader(gl, gl.FRAGMENT_SHADER, "textured-fs.glsl");
	Shaders.Vertex.Textured = new Shader(gl, gl.VERTEX_SHADER, "textured-vs.glsl");

	Shaders.Fragment.Environment = new Shader(gl, gl.FRAGMENT_SHADER, "environment-fs.glsl");
	Shaders.Vertex.Environment = new Shader(gl, gl.VERTEX_SHADER, "environment-vs.glsl");

	Shaders.Fragment.Wood = new Shader(gl, gl.FRAGMENT_SHADER, "proc-fs.glsl");

	Shaders.Fragment.Ground = new Shader(gl,gl.FRAGMENT_SHADER, "ground-fs.glsl");

	Shaders.Vertex.Shadow = new Shader(gl, gl.VERTEX_SHADER, "shadow-vs.glsl");
	Shaders.Fragment.Shadow = new Shader(gl, gl.FRAGMENT_SHADER, "shadow-fs.glsl");

	// Make Programs with those Shaders
	Programs.Textured = new TexturedProgram(gl, Shaders.Vertex.Textured, Shaders.Fragment.Textured);
	Programs.EnvironmentCube = new TexturedProgram(gl, Shaders.Vertex.Environment, Shaders.Fragment.Environment);
	Programs.Wood = new TexturedProgram(gl, Shaders.Vertex.Textured, Shaders.Fragment.Wood);
	Programs.Ground = new TexturedProgram(gl, Shaders.Vertex.Textured, Shaders.Fragment.Ground);
	Programs.Shadow = new TexturedProgram(gl, Shaders.Vertex.Shadow, Shaders.Fragment.Shadow);
}