import {noise, noiseSeed} from '/js/perlin-noise/index.js'
export default class HeightMap {
    constructor(size) {
        this.heightMap = [];
        this.chunks = [];
        this.size = size
    };
    generate(seed) {
        noiseSeed(seed)
        for (let i = 0; i < this.size*this.size;i++) {
            this.heightMap[i] = Math.round(noise((i%this.size)/25,Math.floor(i/this.size)/25)*15)
        }
    }
    generateChunk(coords) {
        var chunkMap = []
        for (let i = 0; i < this.size*this.size;i++) {
            chunkMap[i] = Math.round(noise((i%this.size+this.size*coords.x)/25,(Math.floor(i/this.size)+this.size*coords.y)/25)*15)
        }
        return chunkMap
    }
    }