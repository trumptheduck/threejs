export default class RenderingEngine {
    constructor (fps) {
        this.fps = fps;
        //Make a function to update the renderer and animate it with FPS throttling             
        this.stop = false;
        this.frameCount = 0;
        this.fpsInterval, this.startTime, this.now, this.then, this.elapsed;
        //Initialize the timer variables and start the animation
        this.render = () => {};
        this.frame = () => {
            requestAnimationFrame(this.frame);
            this.now = Date.now();
            this.elapsed = this.now - this.then;
            if (this.elapsed > this.fpsInterval) {
                this.then = this.now - (this.elapsed % this.fpsInterval);
                this.render()
            }
        }
        this.startAnimating = () =>{
            this.fpsInterval = 1000 / fps;
            this.then = Date.now();
            this.startTime = this.then;
            this.frame();
        }
        
}
}