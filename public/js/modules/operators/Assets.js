import * as THREE from "/js/three/build/three.module.js"
export default class Assets {
    static TextureSchema = (function(){
        class TextureSchema {
            constructor(name,path) {
                this.name = name;
                this.resource = {
                    top: new THREE.TextureLoader().load(path.top),
                    side: new THREE.TextureLoader().load(path.side),
                    bottom: new THREE.TextureLoader().load(path.bottom)
                }
                this.resource.top.magFilter = THREE.NearestFilter;
                this.resource.side.magFilter = THREE.NearestFilter;
                this.resource.bottom.magFilter = THREE.NearestFilter;
                this.texture = {
                    top: new THREE.MeshStandardMaterial({ map: this.resource.top, }),
                    side: new THREE.MeshStandardMaterial({ map: this.resource.side }),
                    bottom: new THREE.MeshStandardMaterial({ map: this.resource.bottom }),
                };
            }
        }
        return TextureSchema
    })();
}