import * as THREE from "/js/three/build/three.module.js"
import '/js/cannon/build/cannon.min.js'
export default class WorldComponent {
    constructor() {
        this.physicsMaterial = new CANNON.Material("groundMaterial");
        this.physicsContactMaterial = new CANNON.ContactMaterial(
            this.physicsMaterial,
            this.physicsMaterial,
            {friction:0,restitution :0.2,contactEquationStiffness:1000e8,contactEquationRelaxation:10,frictionEquationRelaxation:10});
        this.Schema = (function(){
            let Schema = function (geometry,material,params) {
                this.params = params;
                switch (geometry) {
                    case "BoxGeometry":
                         this.geometry = new THREE.BoxGeometry(params?.dim.x,params?.dim.y,params?.dim.z);
                         this.params.map?.repeat.set(params?.dim.x,params?.dim.z)
                    break;
                    default: console.error("No geometry "+ schema.geometry + " found!")
                }
                switch (material) {
                    case "MeshStandardMaterial":
                        this.material = new THREE.MeshStandardMaterial(params?.style);
                    break;
                    default: console.error("No material "+ schema.material + " found!")
                }
            }
            return Schema
        })();    
        this.Component = (function(){
            let Component = function(schema,pos={x:0,y:0,z:0}) {
                this.schema = schema;
                this.pos = pos;
            }
            return Component
        })();   
    }
     addComponent(schema,pos,scene,world) {
        let compMesh = new THREE.Mesh(schema.geometry,schema.material)
        scene.add(compMesh)
        compMesh.position.set(pos.x,pos.y,pos.z);
        let compShape = new CANNON.Box(new CANNON.Vec3(schema.params.dim.x/2,schema.params.dim.y/2,schema.params.dim.z/2));
        let compBody = new CANNON.Body({ mass: 0});
            compBody.addShape(compShape)
            compBody.material = this.physicsMaterial
            compBody.position.x = pos.x
            compBody.position.y = pos.y
            compBody.position.z = pos.z
            world.addBody(compBody)
            
    };
    loadComponentsArray(array,scene,world) {
        if (array?.length === undefined) {
            console.error("WorldComponent: Loader input is not an array!")
        } else {
            for (let i = 0; i<array.length;i++) {
                if (array[i]?.schema?.geometry===undefined||array[i]?.schema?.material===undefined||array[i]?.schema?.params===undefined) {
                    console.error("WC/LCA: Invalid schema format!")
                } else {
                    this.addComponent(array[i].schema,array[i].pos,scene,world)
                    console.log(`Loading: ${(i/array.length)*100}%`)
                }   
            }
        }        
    }
}