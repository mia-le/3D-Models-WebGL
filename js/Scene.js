'use strict';

/* exported Scene */
class Scene extends UniformProvider {
	constructor(gl) {
		super('scene');
		this.programs = Programs.ToList();

		// GameObjects container
		this.gameObjects = {};
		this.gameObjectsArray = [];

		// Time
		this.deltaTime = 0;
		this.time = 0;
		this.timeAtFirstFrame = new Date().getTime();
		this.timeAtLastFrame = this.timeAtFirstFrame;

		this.light = new Vec3(0.5,-0.5,0.5);
		this.shadowMatrix = new Mat4();

		gl.enable(gl.DEPTH_TEST);

		this.LoadScene();
	}

	LoadScene() {
		this.avatar = new GameObject(Meshes.slowpoke, `slowpoke`);
		this.addGameObject(this.avatar);
		this.avatar.position.set(0.0,0.0,0.0);
		this.avatar.scale.set(0.03,0.03,0.03);
		this.avatar.yaw = 1.5;


		this.woodAvatar = new GameObject(Meshes.woodBall, `woodSlowpoke`);
		this.addGameObject(this.woodAvatar);
		this.woodAvatar.position.set(0.7,0.1,0.0);
		this.woodAvatar.scale.set(0.03,0.03,0.03);
		this.woodAvatar.yaw = 1.5;

		this.fullViewport = new GameObject(Meshes.heroesBackground, `heroes_cube`);
		this.fullViewport.update = () => {};
		this.addGameObject(this.fullViewport);
		this.fullViewport.noShadow = true;

		this.ground = new GameObject(Meshes.Ground, `ground`);
		this.addGameObject(this.ground);
		this.ground.position.set(0.0,0.000001,0.0);
		this.ground.noShadow = true;


		this.camera = new PerspectiveCamera(...this.programs);
		this.camera.parent = this.avatar;
		this.addComponentsAndGatherUniforms(...this.programs);

		this.shadowMatrix = new Mat4(
			1 ,    0    ,      0       ,   0,
			-this.light.x/this.light.y,  0 ,-this.light.z/this.light.y,   0,
			0    ,    0    ,  1 ,  0,
			0    ,    0.001    ,  0 ,   1
		);

	}

	onAllGameObjects(fnc) {
		for (const gameObject of this.gameObjectsArray) {
			fnc(gameObject);
		}
	}

	addGameObject(obj) {
		// Every GameObject must have a unique name
		if (obj.name in this.gameObjects) {
			console.log(`GameObject with name "${obj.name}" already exists.`);
			return;
		}

		console.log(`Added GameObject with name "${obj.name}".`);
		this.gameObjects[obj.name] = obj;
		this.gameObjectsArray.push(obj);
	}

	removeGameObject(objName) {
		// If a GameObject with this name exists, remove it
		if (objName in this.gameObjects) {
			console.log(`Removing GameObject with name "${objName}"`);
			delete this.gameObjects[objName];
			this.gameObjectsArray = this.gameObjectsArray.slice().filter((x) => x.name === objName);
		} else {
			console.log(`No GameObject with name "${objName} exists.`);
		}
	}

	resize(gl, canvas) {
		gl.viewport(0, 0, canvas.width, canvas.height);
		this.camera.setAspectRatio(canvas.width / canvas.height);
	}

	update(gl, keysPressed) {
		//jshint bitwise:false
		//jshint unused:false

		// Recalculate time and deltaTime
		const timeAtThisFrame = new Date().getTime();
		const dt = (timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
		const t = (timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;
		this.timeAtLastFrame = timeAtThisFrame;

		this.deltaTime = dt;
		this.time = t;

		//Camera
		this.camera.move(dt,keysPressed);
		this.avatar.move(keysPressed);

		// clear the screen
		gl.clearColor(0.3, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		this.onAllGameObjects((x) => {
			// update model matrix
			x.update();
		});
		this.onAllGameObjects((x) => {
			// draw the GameObject
			x.draw(this, this.camera);
		});

		this.onAllGameObjects((x) => {
			if(!x.noShadow){ // ground, background need no shadow
				x.using(Materials.Shadow()).draw(this, this.camera);
			}
		});
	}
}
