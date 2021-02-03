import * as THREE from "/js/three/build/three.module.js"
import Inventory from "/js/modules/operators/Inventory.js"
export default class Player {
    constructor() {
        this.controls = null;
        this.mouse = null;
        this.keyboard = null;
        this.Inventory = new Inventory(36);
        this.ivtAction = {
            moveItem : this.Inventory.moveItem,
            exchangeItem : this.Inventory.exchangeItem,
            assignItem : this.Inventory.assignItem
        }
        this.isInventoryOpened = false;
        this.inventoryPrevState = false;
        this.selectedSlot = null;
        this.prevSlot = null;
        this.isMoving = false;
        this.isJumping = false;
        this.isDestroying = false;
        this.isPlacing = false;
        this.isGrounded = false;
        this.movingAngle = null;
        this.jumpingVelocity = 5.8;
        this.snapVec = {
            x: 0,
            y: 0
        };
        this.speed = 5;
        this.geometry = new THREE.BoxGeometry(0.25,2,0.25);
        this.handGeo = new THREE.BoxGeometry(0.1,0.5,0.1);
        this.material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.handMesh = new THREE.Mesh(this.handGeo,this.material)
        this.shape = new CANNON.Box(new CANNON.Vec3(0.25/2, 2/2, 0.25/2));
        this.body = new CANNON.Body({ mass: 0.0000001});
        this.body.addShape(this.shape)
        this.body.position.x = 0
        this.body.position.y = 30
        this.body.position.z = 0
        this.body.angularDamping=1;
        this.body.linearDamping=0;
        this.body.allowSleep = true;
        this.body.sleepSpeedLimit = 1;
        this.body.sleepTimeLimit = 1.0;
        this.lookAt = null;
        this.selectedItem = "grass";
        this.destroyCD = 5;
        this.placeCD = 5;
        this.jumpCD = 10;
        this.currDestroyCD = 0;
        this.currPlaceCD = 0;
        this.currJumpCD = 0;
        this.spawn = (scene,world) => {
            scene.add(this.mesh);
            world.addBody(this.body);
        }
        this.doMovement = (speed,angle,inputAngle) => {
            if (!this.isGrounded) {
                if (this.isMoving) {
                        this.body.velocity.x = 0.35*this.snapVec.x + 0.5*speed*Math.sin(angle+inputAngle)
                        this.body.velocity.z = 0.35*this.snapVec.y + 0.5*speed*Math.cos(angle+inputAngle)
                    } else {
                        this.body.velocity.x = 0.35*this.snapVec.x
                        this.body.velocity.z = 0.35*this.snapVec.y
                    }
            }
            if (this.isMoving) {
                this.body.sleepState = 0
                if (!this.isGrounded) {
                } else {
                    this.body.velocity.x = speed*Math.sin(angle+inputAngle)
                    this.body.velocity.z = speed*Math.cos(angle+inputAngle)
                    this.snapVec.x = this.body.velocity.x
                    this.snapVec.y = this.body.velocity.z
                }     
            } else if (!this.isMoving&&this.isGrounded) {
            this.body.velocity.x = 0
            this.body.velocity.z = 0
            this.snapVec.x = this.body.velocity.x
            this.snapVec.y = this.body.velocity.z
            }
            if (this.currJumpCD > 0) {this.currJumpCD--}
            if (this.isJumping&&this.currJumpCD === 0) {
                this.body.sleepState = 0
                if (!this.isGrounded) {
                    return
                } else {
                    this.currJumpCD = this.jumpCD;
                    this.body.velocity.y = this.jumpingVelocity;
                }
            }
        }
        
        this.doAction = (scene,world,wrcomp) => {
            if (this.prevSlot !== this.selectedSlot) {
                this.prevSlot = this.selectedSlot;
                this.selectedItem = this.Inventory.content[this.selectedSlot - 1]?.schema;
                document.getElementById("ivt-0").classList.remove("selected");
                document.getElementById("ivt-1").classList.remove("selected");
                document.getElementById("ivt-2").classList.remove("selected");
                document.getElementById("ivt-3").classList.remove("selected");
                document.getElementById("ivt-4").classList.remove("selected");
                document.getElementById("ivt-5").classList.remove("selected");
                document.getElementById("ivt-6").classList.remove("selected");
                document.getElementById("ivt-7").classList.remove("selected");
                document.getElementById("ivt-8").classList.remove("selected");
                document.getElementById(`ivt-${this.selectedSlot - 1}`).classList.add("selected");
            }
            if (this.isInventoryOpened !== this.inventoryPrevState) {
                console.log(this.isInventoryOpened)
                this.inventoryPrevState = this.isInventoryOpened;
                if (this.isInventoryOpened) {
                    document.getElementById("UI-inventory").style.display = 'grid';
                    this.mouse.state.destroy = false;
                    this.mouse.state.place = false;
                    this.selectedItem = this.Inventory.content[this.selectedSlot - 1]?.schema;
                    this.controls.unlock()
                } else {
                    document.getElementById("UI-inventory").style.display = 'none';
                    this.controls.lock()
                    this.mouse.state.destroy = false;
                    this.mouse.state.place = false;
                    this.selectedItem = this.Inventory.content[this.selectedSlot - 1]?.schema;
                }
            }
            if (this.currDestroyCD > 0) {this.currDestroyCD--}
            if (this.isDestroying&&this.currDestroyCD === 0&&!this.isInventoryOpened) {
                this.currDestroyCD = this.destroyCD;
                let selectedObject = wrcomp?.objectMap.find(object => (object.position.x === this.lookAt?.object.position.x&&object.position.y === this.lookAt?.object.position.y&&object.position.z === this.lookAt?.object.position.z));
                if (selectedObject !== undefined) {
                    wrcomp.removeObject(selectedObject,scene,world)
                }
            };
            if (this.currPlaceCD > 0) {this.currPlaceCD--}
            if (this.isPlacing&&this.currPlaceCD === 0&&!this.isInventoryOpened) {
                this.currPlaceCD = this.placeCD;
                let adjacentMesh = this.lookAt?.object;
                if (adjacentMesh !== undefined) {
                    wrcomp.addObject(adjacentMesh,this.selectedItem,scene)
                }
            }
        }

        
        this.vectors = {
            vec : new THREE.Vector3(this.body.position.x,this.body.position.y,this.body.position.z),
            vecDown : new THREE.Vector3(0,-1,0),
            crosshair : new THREE.Vector2(0,0),
        }
        this.rays = {
             ray : new THREE.Raycaster(),
             raycaster : new THREE.Raycaster(),
        }

        this.getGroundingStatus = (scene) => {
            this.vectors.vec.set(this.body.position.x,this.body.position.y,this.body.position.z)
            this.rays.ray.set(this.vectors.vec,this.vectors.vecDown);
            var belows = this.rays.ray.intersectObjects(scene.children)
            if (belows[0]===undefined) {
                this.isGrounded = false; 
            } else {
                if (belows[0]?.distance <= 1) {
                    this.isGrounded = true;
                } else {
                    this.isGrounded = false; 
                }
            }
        }
        this.getCrosshairTarget = (camera,scene) => {
            this.rays.raycaster.setFromCamera( this.vectors.crosshair, camera)
            const intersects = this.rays.raycaster.intersectObjects(scene.children)
            if (intersects[0] !== undefined) {
                this.lookAt = intersects[0];
            } else {
                    this.lookAt = null;
            }
        }
        this.updatePCControllers = (keyboard,mouse) => {
            keyboard.update()
            this.isDestroying = mouse.state.destroy;
            this.isPlacing = mouse.state.place;
            this.movingAngle = keyboard.inputAngle;
            this.isMoving = keyboard.isActive;
            this.isJumping = keyboard.isJumping;
            this.selectedSlot = keyboard.state.hotbarSelected;
            this.isInventoryOpened = keyboard.state.inventory;
        }
    }      
}