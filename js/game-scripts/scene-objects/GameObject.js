"use strict"; 
/* exported GameObject */
class GameObject extends UniformProvider {
  constructor(mesh, name) {
    super("gameObject");

    this.name = name || `Object-${Math.random() * 10000}`;

    this.position = new Vec3(0, 0, 0); 
    this.orientation = 0; 
    this.scale = new Vec3(1, 1, 1); 

    this.addComponentsAndGatherUniforms(mesh); // defines this.modelMatrix
  }

  /*
        !!! Modify GameObject inside parameters !!!
        this.gameObjects.push(new GameObject(..).apply((me) => {
            me.position.set(1,1,1);
            me.orientation = 90;
            ...
        });

   */
  apply(fnc) {
  	fnc(this);
  	return this;
  }

  update() {
  	this.modelMatrix.set().
  		scale(this.scale).
  		rotate(this.orientation).
  		translate(this.position);
  }
}