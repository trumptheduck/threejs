import * as THREE from "/js/three/build/three.module.js"
export default class Assets {
    static TextureSchema = (function(){
        class TextureSchema {
            constructor(name,path) {
                this.name = name;
                this.texture = {
                    top: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(path.top) }),
                    side: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(path.side) }),
                    bottom: new THREE.MeshStandardMaterial({ map: new THREE.TextureLoader().load(path.bottom) }),
                };
            }
        }
        return TextureSchema
    })();
}