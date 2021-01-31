import {noise, noiseSeed} from '/js/perlin-noise/index.js'
export default class HeightMap {
    constructor(size) {
        this.heightMap = [];
        this.size = size
    };
    generate(seed) {
        noiseSeed(seed)
        for (let i = 0; i < this.size*this.size;i++) {
            this.heightMap[i] = Math.round(noise((i%this.size)/25,Math.floor(i/this.size)/25)*15)
        }
    }
    }