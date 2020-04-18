const Geometries = {

};

const Materials = {

};

const Meshes = {

};

function LoadGeometryMaterialsAndMeshes(gl) {

	// Load Geometries as functions
	Geometries.TexturedQuad = () => {
		return new TexturedQuadGeometry(gl);
	};

	// Load Materials
	Materials.Textured = (textureName) => {
		const mat = new Material(Programs.Textured);
		mat.colorTexture.set(new Texture2D(gl, textureName));
		return mat;
	};

	Materials.Wood = () => {
		const mat = new Material(Programs.Wood);
		mat.lightWoodColor = new Vec3(1.0,0.0,0.0);
		mat.darkWoodColor = new Vec3(1.0,1.0,0.0);
		mat.freq = 0.3;
		mat.noiseFreq = 0.3;
		mat.noiseExp = 2;
		mat.noiseAmp = 2;
		return mat;
	};

	Materials.EnvironmentCube = (cubeName) => {
		const mat = new Material(Programs.EnvironmentCube);
		mat.envTexture.set(new TextureCube(gl, cubeName));
		return mat;
	};


	//create Meshes

	Meshes.slowpoke = new MultiMesh(
		gl,
		"media/slowpoke/slowpoke.json",
		[Materials.Textured("/media/slowpoke/YadonDh.png"),Materials.Textured("/media/slowpoke/YadonEyeDh.png")]
	)

	Meshes.woodSlowpoke = new MultiMesh(
		gl,
		"media/slowpoke/slowpoke.json",
		[Materials.Wood()]
	)

	this.heroesCube = [
		"media/posx512.jpg",
		"media/negx512.jpg",
		"media/posy512.jpg",
		"media/negy512.jpg",
		"media/posz512.jpg",
		"media/negz512.jpg"];

	Meshes.heroesBackground = new Mesh(
		Materials.EnvironmentCube(this.heroesCube),
	    Geometries.TexturedQuad()
	)

}