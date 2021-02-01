import * as THREE from "/js/three/build/three.module.js"
export default class GameEngine {
    constructor() {
            this.camera = {
                dirVector: new THREE.Vector3(),
                dirAngle: null
            }
        }
    updatePlayerViewport(camera,player) {
        camera.position.x = player.body.position.x;
        camera.position.z = player.body.position.z;
        camera.position.y = player.body.position.y+0.6;
    }
    updatePlayerHitbox(player) {
        player.mesh.position.set(player.body.position.x, player.body.position.y, player.body.position.z);
        player.mesh.quaternion.set(player.body.quaternion.x, player.body.quaternion.y, player.body.quaternion.z, player.body.quaternion.w);
    }
    getCameraAngle(camera) {
        camera.getWorldDirection(this.camera.dirVector)
        this.camera.dirAngle = Math.atan2(this.camera.dirVector.x,this.camera.dirVector.z);  
    }
    handleUI(player,angle) {
        player.handMesh.position.x = 0.5*Math.sin(angle) + player.mesh.position.x
        player.handMesh.position.z = 0.5*Math.cos(angle) + player.mesh.position.z
        player.handMesh.position.y = player.mesh.position.y +0.2;
    }
}