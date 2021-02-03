import * as THREE from "/js/three/build/three.module.js"
import '/js/cannon/build/cannon.min.js'
export default class WorldComponent {
    constructor() {
        this.mapSize = null;
        this.mapHeight = null;
        this.textures = [];
        this.objectMap = [];
        this.chunkMap = [];
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
        this.missingTexture = {
            texture :{            
            top: new THREE.MeshStandardMaterial({ color: 0xffffff }),
            side: new THREE.MeshStandardMaterial({ color: 0xffffff }),
            bottom: new THREE.MeshStandardMaterial({ color: 0xffffff }),
            }
        }
        this.physicsMaterial = new CANNON.Material("groundMaterial");
        this.physicsContactMaterial = new CANNON.ContactMaterial(
            this.physicsMaterial,
            this.physicsMaterial,
            {friction:0,restitution :0.1,contactEquationStiffness:10e100,contactEquationRelaxation:100,frictionEquationRelaxation:1000});
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
    createSkybox(scene,renderer,path) {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
            path,
            () => {
            const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
            rt.fromEquirectangularTexture(renderer, texture);
            scene.background = rt;
            });
    }
    loadObjectMap(map) {
        this.objectMap = map.objectMap;
        this.mapSize = map.size;
        this.mapHeight = map.maxHeight;
    }
    findObjectByCoords(x,y,z) {
        if (x>this.mapSize-1||y>this.mapHeight-1||z>this.mapSize-1||x<0||y<0||z<0) {
            return {position:{x:x,y:y,z:z},content:false,schema:null,meshes:{t:null,b:null,n:null,w:null,e:null,s:null}};
        } else {
            return this.objectMap[(z)*((this.mapSize)*this.mapHeight)+(x)*(this.mapHeight)+ (y)]
        }
    }
    loadHeightMap(scene) {
        this.objectMap.forEach(element => {
            if (element.content !== false) {
                this.renderBuffer(element,scene)
            }   
        })
    }
    loadChunk(scene,coords) {
        this.objectMap.forEach(element => {
            if (element.content !== false) {
                this.renderBuffer(element,scene)
            }   
        })
    }
    unloadChunk(scene,coords) {
        this.objectMap.forEach(element => {
            if (element.content !== false) {
                if (element.meshes.t !== null) {
                    scene.remove(element.meshes.t)
                }
                if (element.meshes.b !== null) {
                    scene.remove(element.meshes.b)
                }
                if (element.meshes.n !== null) {
                    scene.remove(element.meshes.n)
                }
                if (element.meshes.w !== null) {
                    scene.remove(element.meshes.w)
                }
                if (element.meshes.e !== null) {
                    scene.remove(element.meshes.e)
                }
                if (element.meshes.s !== null) {
                    scene.remove(element.meshes.s)
                }
            }   
        })
    }
    renderBuffer(object,scene) {
        var material = this.textures.find(texture => texture.name === object.schema )
        if (material === undefined) {
            material = this.missingTexture
        }
        const meshW = new THREE.Mesh( this.geometry.w, material.texture.side );
        meshW.position.x = object.position.x;
        meshW.position.y = object.position.y;
        meshW.position.z = object.position.z;
        const meshN = new THREE.Mesh( this.geometry.n, material.texture.side );
        meshN.position.x = object.position.x;
        meshN.position.y = object.position.y;
        meshN.position.z = object.position.z;
        const meshT = new THREE.Mesh( this.geometry.t, material.texture.top );
        meshT.position.x = object.position.x;
        meshT.position.y = object.position.y;
        meshT.position.z = object.position.z;
        const meshB = new THREE.Mesh( this.geometry.b, material.texture.bottom );
        meshB.position.x = object.position.x;
        meshB.position.y = object.position.y;
        meshB.position.z = object.position.z;
        const meshS = new THREE.Mesh( this.geometry.s, material.texture.side );
        meshS.position.x = object.position.x;
        meshS.position.y = object.position.y;
        meshS.position.z = object.position.z;
        const meshE = new THREE.Mesh( this.geometry.e, material.texture.side );
        meshE.position.x = object.position.x;
        meshE.position.y = object.position.y;
        meshE.position.z = object.position.z;
        var needToRender = {t:true,b:true,n:true,w:true,e:true,s:true}
        if(this.findObjectByCoords(object.position.x,object.position.y+1,object.position.z)?.content !== false) {
            needToRender.t = false;
        }
        if(this.findObjectByCoords(object.position.x,object.position.y-1,object.position.z)?.content !== false) {
            needToRender.b = false;
        }
        if(this.findObjectByCoords(object.position.x,object.position.y,object.position.z-1)?.content !== false) {
            needToRender.n = false;
        }
        if(this.findObjectByCoords(object.position.x,object.position.y,object.position.z+1)?.content !== false) {
            needToRender.w = false;
        }
        if(this.findObjectByCoords(object.position.x+1,object.position.y,object.position.z)?.content !== false) {
            needToRender.s = false;
        }
        if(this.findObjectByCoords(object.position.x-1,object.position.y,object.position.z)?.content !== false) {
            needToRender.e = false;
        }
        if (!needToRender.t) {
            scene.remove(meshT)
            object.meshes.t = null;
        } else {
            scene.add(meshT)
            object.meshes.t = scene.children[scene.children.length -1];
        }
        if (!needToRender.b) {
            scene.remove(meshB)
            object.meshes.b = null;
        } else {
            scene.add(meshB)
            object.meshes.b = scene.children[scene.children.length -1];
        }
        if (!needToRender.n) {
            scene.remove(meshN)
            object.meshes.n = null;
        } else {
            scene.add(meshN)
            object.meshes.n = scene.children[scene.children.length -1];
        }
        if (!needToRender.w) {
            scene.remove(meshW)
            object.meshes.w = null;
        } else {
            scene.add(meshW)
            object.meshes.w = scene.children[scene.children.length -1];
        }
        if (!needToRender.s) {
            scene.remove(meshS)
            object.meshes.s = null;
        } else {
            scene.add(meshS)
            object.meshes.s = scene.children[scene.children.length -1];
        }
        if (!needToRender.e) {
            scene.remove(meshE)
            object.meshes.e = null;
        } else {
            scene.add(meshE)
            object.meshes.e = scene.children[scene.children.length -1];
        }       
    }
    getHitboxes(player,world) {
        for (let x = -3;x<=3;x++) {
            for(let y = -3;y<=3;y++) {
                for(let z= -3;z<=3;z++) {
                    if (Math.abs(x)<=2&&Math.abs(y)<=2&&Math.abs(z)<=2) {           
                        var obj = this.findObjectByCoords(Math.round(player.body.position.x)+x,Math.round(player.body.position.y)+y,Math.round(player.body.position.z)+z)
                        if (obj.content !== true) {
                            continue;
                           } else {
                            if (world.bodies.find(body => body.position.x === obj.position.x&&body.position.y === obj.position.y&&body.position.z === obj.position.z)===undefined) {
                                let cBody = new CANNON.Body({ mass: 0});
                                cBody.addShape(this.shape)
                                cBody.material = this.physicsMaterial
                                cBody.type = 0
                                cBody.position.x = obj.position.x
                                cBody.position.y = obj.position.y
                                cBody.position.z = obj.position.z
                                world.addBody(cBody)
                               }
                           }
                    } else {
                        let unusedBody = world.bodies.find(body => (body.position.x === Math.round(player.body.position.x)+x&&body.position.y === Math.round(player.body.position.y)+y&&body.position.z === Math.round(player.body.position.z)+z))
                        if (unusedBody!==undefined) {
                            world.removeBody(unusedBody)
                        }
                    }
                }
            }
        }; 
    };
    updateMeshNearObject(selectedObject,scene) {
        for (let x = -1;x<=1;x++) {
            for(let y = -1;y<=1;y++) {
                for(let z= -1;z<=1;z++) {
                    var objectToUpdate = this.findObjectByCoords(Math.round(selectedObject.position.x)+x,Math.round(selectedObject.position.y)+y,Math.round(selectedObject.position.z)+z)
                    if (objectToUpdate.meshes.t !== null) {
                        scene.remove(objectToUpdate.meshes.t)
                    }
                    if (objectToUpdate.meshes.b !== null) {
                        scene.remove(objectToUpdate.meshes.b)
                    }
                    if (objectToUpdate.meshes.n !== null) {
                        scene.remove(objectToUpdate.meshes.n)
                    }
                    if (objectToUpdate.meshes.w !== null) {
                        scene.remove(objectToUpdate.meshes.w)
                    }
                    if (objectToUpdate.meshes.e !== null) {
                        scene.remove(objectToUpdate.meshes.e)
                    }
                    if (objectToUpdate.meshes.s !== null) {
                        scene.remove(objectToUpdate.meshes.s)
                    }
                    if (objectToUpdate?.content !== false) {
                        this.renderBuffer(objectToUpdate,scene)
                    }
                }
            }
        }
    };
    removeObject(selectedObject,scene,world) {
        selectedObject.content = false;
        this.updateMeshNearObject(selectedObject,scene)
        var selectedBody = world.bodies.find(body => body.position.x === selectedObject.position.x&&body.position.y === selectedObject.position.y&&body.position.z === selectedObject.position.z);
        if (selectedBody !== undefined) {
            world.removeBody(selectedBody)
        } 
    }
    addObject(adjacentMesh,object,scene) {
        var adjacentObject = this.findObjectByCoords(adjacentMesh.position.x,adjacentMesh.position.y,adjacentMesh.position.z);
        if (adjacentObject.content !== false) {
            if (adjacentObject.meshes.t?.uuid === adjacentMesh.uuid) {
                var selectedObject = this.findObjectByCoords(adjacentObject.position.x,adjacentObject.position.y+1,adjacentObject.position.z)
                selectedObject.content = true;
                selectedObject.schema = object;
                this.updateMeshNearObject(selectedObject,scene)
            } else if (adjacentObject.meshes.b?.uuid === adjacentMesh.uuid) {
                var selectedObject = this.findObjectByCoords(adjacentObject.position.x,adjacentObject.position.y-1,adjacentObject.position.z)
                selectedObject.content = true;
                selectedObject.schema = object;
                this.updateMeshNearObject(selectedObject,scene)
            } else if (adjacentObject.meshes.n?.uuid === adjacentMesh.uuid) {
                var selectedObject = this.findObjectByCoords(adjacentObject.position.x,adjacentObject.position.y,adjacentObject.position.z-1)
                selectedObject.content = true;
                selectedObject.schema = object;
                this.updateMeshNearObject(selectedObject,scene)
            } else if (adjacentObject.meshes.w?.uuid === adjacentMesh.uuid) {
                var selectedObject = this.findObjectByCoords(adjacentObject.position.x,adjacentObject.position.y,adjacentObject.position.z+1)
                selectedObject.content = true;
                selectedObject.schema = object;
                this.updateMeshNearObject(selectedObject,scene)
            } else if (adjacentObject.meshes.s?.uuid === adjacentMesh.uuid) {
                var selectedObject = this.findObjectByCoords(adjacentObject.position.x+1,adjacentObject.position.y,adjacentObject.position.z)
                selectedObject.content = true;
                selectedObject.schema = object;
                this.updateMeshNearObject(selectedObject,scene)
            } else if (adjacentObject.meshes.e?.uuid === adjacentMesh.uuid) {
                var selectedObject = this.findObjectByCoords(adjacentObject.position.x-1,adjacentObject.position.y,adjacentObject.position.z)
                selectedObject.content = true;
                selectedObject.schema = object;
                this.updateMeshNearObject(selectedObject,scene)
            }
        }
    }
}