import * as THREE from "/js/three/build/three.module.js"
import '/js/cannon/build/cannon.min.js'
export default class WorldComponent {
    constructor() {
        this.objectList = [];
        this.objectMap = [];
        this.vertices = {
            w : new Float32Array( [
                -0.5, 0.5,  0.5,
                -0.5, -0.5,  0.5,
                0.5,  -0.5,  0.5,
    
                0.5,  -0.5,  0.5,
                0.5,  0.5,  0.5,
                -0.5, 0.5,  0.5
            ] ),
            n : new Float32Array( [
                0.5,  0.5,  -0.5,
                0.5, -0.5,  -0.5,
                -0.5, -0.5,  -0.5,
    
                -0.5, -0.5,  -0.5,
                -0.5,  0.5,  -0.5,
                0.5,  0.5,  -0.5,
            ] ),
            t : new Float32Array( [
                -0.5,  0.5,  0.5,
                0.5,  0.5,  0.5,
                0.5, 0.5,  -0.5,
    
                 0.5,  0.5,  -0.5,
                -0.5,  0.5,  -0.5,
                -0.5, 0.5,  0.5,
                
               
                
            ] ),
            b : new Float32Array( [
                
                0.5, -0.5,  0.5,
                -0.5,  -0.5,  0.5,
                -0.5, -0.5,  -0.5,
                
                -0.5, -0.5,  -0.5,
                0.5,  -0.5,  -0.5,
                0.5,  -0.5,  0.5,
                
            ] ),
            s : new Float32Array( [
                0.5, 0.5,  0.5,
                0.5, -0.5,  0.5,
                0.5,  -0.5,  -0.5,
    
                0.5,  -0.5,  -0.5,
                0.5,  0.5,  -0.5,
                0.5, 0.5,  0.5
            ] ),
            e : new Float32Array( [
                -0.5,  0.5,  -0.5,
                -0.5, -0.5,  -0.5,
                 -0.5, -0.5,  0.5,
    
                -0.5, -0.5,  0.5,
                -0.5,  0.5,  0.5,
                -0.5,  0.5,  -0.5,
            ] ),
        }
        this.geometry = {
            w : new THREE.BufferGeometry(),
            n : new THREE.BufferGeometry(),
            t : new THREE.BufferGeometry(),
            b : new THREE.BufferGeometry(),
            s : new THREE.BufferGeometry(),
            e : new THREE.BufferGeometry(),
        }
        this.uvMap = new Float32Array( [    1,1,
                                            1,0,
                                            0,0,

                                            0,0,
                                            0,1,
                                            1,1,  ] )
        this.setAttribute = () => {
            this.geometry.w.setAttribute( 'position', new THREE.BufferAttribute( this.vertices.w, 3 ) );
            this.geometry.n.setAttribute( 'position', new THREE.BufferAttribute( this.vertices.n, 3 ) );
            this.geometry.t.setAttribute( 'position', new THREE.BufferAttribute( this.vertices.t, 3 ) );
            this.geometry.b.setAttribute( 'position', new THREE.BufferAttribute( this.vertices.b, 3 ) );
            this.geometry.s.setAttribute( 'position', new THREE.BufferAttribute( this.vertices.s, 3 ) );
            this.geometry.e.setAttribute( 'position', new THREE.BufferAttribute( this.vertices.e, 3 ) );
            this.geometry.w.setAttribute( 'uv', new THREE.BufferAttribute( this.uvMap, 2 ) );
            this.geometry.n.setAttribute( 'uv', new THREE.BufferAttribute( this.uvMap, 2 ) );
            this.geometry.t.setAttribute( 'uv', new THREE.BufferAttribute( this.uvMap, 2 ) );
            this.geometry.b.setAttribute( 'uv', new THREE.BufferAttribute( this.uvMap, 2 ) );
            this.geometry.s.setAttribute( 'uv', new THREE.BufferAttribute( this.uvMap, 2 ) );
            this.geometry.e.setAttribute( 'uv', new THREE.BufferAttribute( this.uvMap, 2 ) );
        }
        this.computeVertexNormals = () => {
            this.geometry.w.computeVertexNormals()
            this.geometry.n.computeVertexNormals()
            this.geometry.t.computeVertexNormals()
            this.geometry.b.computeVertexNormals()
            this.geometry.s.computeVertexNormals()
            this.geometry.e.computeVertexNormals()
        }
        this.shape = new CANNON.Box(new CANNON.Vec3(1.3/2,1/2,1.3/2));
        this.setAttribute()
        this.computeVertexNormals()
        this.physicsMaterial = new CANNON.Material("groundMaterial");
        this.physicsContactMaterial = new CANNON.ContactMaterial(
            this.physicsMaterial,
            this.physicsMaterial,
            {friction:0,restitution :0.01,contactEquationStiffness:10e100,contactEquationRelaxation:1000,frictionEquationRelaxation:1000});
    }
    createLightSource(scene) {
        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
            hemiLight.position.set( 0, 500, 0 );
            scene.add( hemiLight );
            var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
            dirLight.position.set( -1, 0.75, 1 );
            dirLight.position.multiplyScalar( 50);
            dirLight.name = "dirlight";
            // dirLight.shadowCameraVisible = true;
            scene.add( dirLight );
            dirLight.castShadow = true;
            dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 1024*2;
            var d = 300;
            dirLight.shadow.camera.left = -d;
            dirLight.shadow.camera.right = d;
            dirLight.shadow.camera.top = d;
            dirLight.shadow.camera.bottom = -d;
            dirLight.shadow.camera.far = 3500;
            dirLight.shadow.bias = -0.0001;
    }
    loadObjectMap(map) {
        for(let i = 0; i< map.heightMap.length;i++) {
            for (let j = 0; j <map.heightMap[i];j++) {
            this.objectMap.push({x:(i%map.size),y:j-1,z:Math.floor(i/map.size)})
        }
        }
    }
    loadHeightMap(map,scene,material) {
        for(let i = 0; i< map.heightMap.length;i++) {
            for (let j = 0; j <map.heightMap[i];j++) {
                this.renderBuffer({x:(i%map.size),y:j-1,z:Math.floor(i/map.size)},scene,material)
            }
            
        }
    }
    renderBuffer(pos,scene,material) {
        const meshW = new THREE.Mesh( this.geometry.w, material.side );
        meshW.position.x = pos.x;
        meshW.position.y = pos.y;
        meshW.position.z = pos.z;
        const meshN = new THREE.Mesh( this.geometry.n, material.side );
        meshN.position.x = pos.x;
        meshN.position.y = pos.y;
        meshN.position.z = pos.z;
        const meshT = new THREE.Mesh( this.geometry.t, material.top );
        meshT.position.x = pos.x;
        meshT.position.y = pos.y;
        meshT.position.z = pos.z;
        const meshB = new THREE.Mesh( this.geometry.b, material.bottom );
        meshB.position.x = pos.x;
        meshB.position.y = pos.y;
        meshB.position.z = pos.z;
        const meshS = new THREE.Mesh( this.geometry.s, material.side );
        meshS.position.x = pos.x;
        meshS.position.y = pos.y;
        meshS.position.z = pos.z;
        const meshE = new THREE.Mesh( this.geometry.e, material.side );
        meshE.position.x = pos.x;
        meshE.position.y = pos.y;
        meshE.position.z = pos.z;
        var needToRender = {t:true,b:true,n:true,w:true,e:true,s:true}
        if(this.objectMap.find(object => (object.x === pos.x&&object.y === pos.y+1&&object.z === pos.z))!==undefined) {
            needToRender.t = false;
        }
        if(this.objectMap.find(object => (object.x === pos.x&&object.y === pos.y-1&&object.z === pos.z))!==undefined) {
            needToRender.b = false;
        }
        if(this.objectMap.find(object => (object.x === pos.x&&object.y === pos.y&&object.z === pos.z-1))!==undefined) {
            needToRender.n = false;
        }
        if(this.objectMap.find(object => (object.x === pos.x&&object.y === pos.y&&object.z === pos.z+1))!==undefined) {
            needToRender.w = false;
        }
        if(this.objectMap.find(object => (object.x-1 === pos.x&&object.y === pos.y&&object.z === pos.z))!==undefined) {
            needToRender.s = false;
        }
        if(this.objectMap.find(object => (object.x+1 === pos.x&&object.y === pos.y&&object.z === pos.z))!==undefined) {
            needToRender.e = false;
        }
        if (!needToRender.t) {
            scene.remove(meshT)
        } else {
            scene.add(meshT)
        }
        if (!needToRender.b) {
            scene.remove(meshB)
        } else {
            scene.add(meshB)
        }
        if (!needToRender.n) {
            scene.remove(meshN)
        } else {
            scene.add(meshN)
        }
        if (!needToRender.w) {
            scene.remove(meshW)
        } else {
            scene.add(meshW)
        }
        if (!needToRender.s) {
            scene.remove(meshS)
        } else {
            scene.add(meshS)
        }
        if (!needToRender.e) {
            scene.remove(meshE)
        } else {
            scene.add(meshE)
        }       
    }
    getHitboxes(player,world) {
        for (let x = -2;x<=2;x++) {
            for(let y = -2;y<=2;y++) {
                for(let z= -2;z<=2;z++) {
                    if (Math.abs(x)<=1&&Math.abs(y)<=2&&Math.abs(z)<=1) {
                        if (this.objectMap.find(object => (object.x === Math.round(player.body.position.x)+x&&object.y === Math.round(player.body.position.y)+y&&object.z === Math.round(player.body.position.z)+z))!==undefined) {
                            let obj = this.objectMap.find(object => (object.x === Math.round(player.body.position.x)+x&&object.y === Math.round(player.body.position.y)+y&&object.z === Math.round(player.body.position.z)+z))   
                            if (world.bodies.find(body => body.position.x === obj.x&&body.position.y === obj.y&&body.position.z === obj.z)===undefined) {
                                let cBody = new CANNON.Body({ mass: 0});
                                cBody.addShape(this.shape)
                                cBody.material = this.physicsMaterial
                                cBody.type = 0
                                cBody.position.x = obj.x
                                cBody.position.y = obj.y
                                cBody.position.z = obj.z
                                world.addBody(cBody)
                               }
                           }
                    } else {
                        if (world.bodies.find(body => (body.position.x === Math.round(player.body.position.x)+x&&body.position.y === Math.round(player.body.position.y)+y&&body.position.z === Math.round(player.body.position.z)+z))!==undefined) {
                            let unusedBody = world.bodies.find(body => (body.position.x === Math.round(player.body.position.x)+x&&body.position.y === Math.round(player.body.position.y)+y&&body.position.z === Math.round(player.body.position.z)+z))
                            world.removeBody(unusedBody)
                        }
                    }
                }
            }
        }; 
    };
    updateMeshNearObject(selectedObject,scene,material) {
        for (let x = -1;x<=1;x++) {
            for(let y = -1;y<=1;y++) {
                for(let z= -1;z<=1;z++) {
                    var datedMeshes = scene.children.filter(meshes => meshes.position.x === Math.round(selectedObject.x)+x&&meshes.position.y === Math.round(selectedObject.y)+y&&meshes.position.z === Math.round(selectedObject.z)+z);
                        datedMeshes.forEach(mesh => {
                            scene.remove(mesh)
                        })
                    var objectToUpdate = this.objectMap.find(object => (object.x === Math.round(selectedObject.x)+x&&object.y === Math.round(selectedObject.y)+y&&object.z === Math.round(selectedObject.z)+z));
                    if (objectToUpdate !== undefined) {
                        this.renderBuffer({x:objectToUpdate.x,y:objectToUpdate.y,z:objectToUpdate.z},scene,material)
                    }
                }
            }
        }
    };
    removeObject(selectedObject,scene,world,material) {
        this.objectMap.splice(this.objectMap.indexOf(selectedObject),1)
        this.updateMeshNearObject(selectedObject,scene,material)
        var selectedBody = world.bodies.find(body => body.position.x === selectedObject.x&&body.position.y === selectedObject.y&&body.position.z === selectedObject.z);
        if (selectedBody !== undefined) {
            world.removeBody(selectedBody)
        } 
        
    }
}