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
                    if (j === 0) {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:true,schema:"bedrock",meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    } else if (j === this.heightMap[i]+20) {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:true,schema:"grass",meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    } else if (j < this.heightMap[i]+20&&j >= this.heightMap[i]+14) {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:true,schema:"dirt",meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    } else if (j< this.heightMap[i]+14&&j!==0) {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:true,schema:"stone",meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    } else {
                        this.objectMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:false,schema:null,meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    }
                }
            }
        }
        this.generateObjectMap()
        this.generateChunk = (coords) => {
            var chunkMap = [];
            var hMap = this.hMap.generateChunk({x:coords.x,y:coords.x});
            for(let i = 0; i< this.heightMap.length;i++) {
                for (let j = 0; j <this.maxHeight;j++) {
                    if (j <this.hMap[i]) {
                        chunkMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:true,schema:"grass",meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    } else {
                        chunkMap.push({position:{x:(i%this.size),y:j,z:Math.floor(i/this.size)},content:false,schema:null,meshes:{t:null,b:null,n:null,w:null,e:null,s:null}})
                    }
                }
            }
            return chunkMap
        }
    }
    
}