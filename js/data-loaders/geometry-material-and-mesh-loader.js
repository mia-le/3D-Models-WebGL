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

	Meshes.USA = new Mesh(
		Materials.Textured("/media/usa.jpg"),
		Geometries.TexturedQuad()
	)

}