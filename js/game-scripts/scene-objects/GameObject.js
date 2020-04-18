"use strict"; 
/* exported GameObject */
class GameObject extends UniformProvider {
  constructor(mesh, name) {
    super("gameObject");

    this.name = name || `Object-${Math.random() * 10000}`;

    this.position = new Vec3(0, 0, 0); 
    this.roll = 0;
    this.pitch = 0;
    this.yaw = 0;
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

    move(keyPressed){
        let moveVec = new Vec3(0,0,0);
        if(keyPressed["UP"] ===true){
            moveVec.y= 0.01;
        }
        if(keyPressed["DOWN"]===true){
            moveVec.y -= 0.01;
        }
        if(keyPressed["LEFT"]===true){
            moveVec.x = 0.01;
        }
        if(keyPressed["RIGHT"] ===true){
            moveVec.x -= 0.01;
        }
        this.position.add(moveVec);
    }

  update() {
  	this.modelMatrix.set().
  		scale(this.scale).
  		rotate(this.roll).
  		rotate(this.pitch,1,0,0).
  		rotate(this.yaw,0,1,0).
  		translate(this.position);
  }
}