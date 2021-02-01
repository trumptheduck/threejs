import HeightMap from "/js/modules/generators/HeightMap.js"
export default class WorldMap {
    constructor (size,seed=Math.random()*1000) {
        this.objectMap = [];
        this.hMap = new HeightMap(size);
        this.hMap.generate(seed);
        this.size = this.hMap.size;
        this.heightMap = this.hMap.heightMap;
        this.maxHeight = 64;
        this.generateObjectMap = ()=>{
            for(let i = 0; i< this.heightMap.length;i++) {
                for (let j = 0; j <this.maxHeight;j++) {
                    if (j <this.heightMap[i]) {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:true,schema:"grass",})
                    } else {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:false,schema:null,})
                    }
                }
            }
        }
        this.generateObjectMap()
    }
    
}