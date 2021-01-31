export default class Keyboard {
    constructor () {
        this.binding = {
            moveForward: "w",
            moveBackward: "s",
            moveLeft: "a",
            moveRight: "d",
            jump: " ",
            log: "`"
        };
        this.state = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false,
            jump: false
        }
        this.inputAngle = 0;
        this.isActive = false;
        this.isJumping = false;
        this.logParam = null;
        this.logger = () => {
            console.log(this.logParam);
        }
    };
    connect() {
        document.addEventListener('keydown',(e)=> {
            switch (e.key) {
                case this.binding.moveForward:
                    this.state.moveForward = true;
                break;
                case this.binding.moveBackward:
                    this.state.moveBackward = true;
                break;
                case this.binding.moveLeft:
                    this.state.moveLeft = true;
                break;
                case this.binding.moveRight:
                    this.state.moveRight = true;
                break;
                case this.binding.jump:
                    this.state.jump = true;
                break;
                case this.binding.log:
                    this.logger()
                break;
            }
        });
        document.addEventListener('keyup',(e)=>{
            switch (e.key) {
                case this.binding.moveForward:
                    this.state.moveForward = false;
                break;
                case this.binding.moveBackward:
                    this.state.moveBackward = false;
                break;
                case this.binding.moveLeft:
                    this.state.moveLeft = false;
                break;
                case this.binding.moveRight:
                    this.state.moveRight = false;
                break;
                case this.binding.jump:
                    this.state.jump = false;
                break;
            }
        });
    };
    update() {
        if (this.state.moveForward&&!this.state.moveBackward&&!this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = 0
            this.isActive = true;
        } else if (!this.state.moveForward&&this.state.moveBackward&&!this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = Math.PI
            this.isActive = true;
        } else if (!this.state.moveForward&&!this.state.moveBackward&&this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = -Math.PI/2
            this.isActive = true;
        } else if (!this.state.moveForward&&!this.state.moveBackward&&!this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = Math.PI/2
            this.isActive = true;
        } else if (this.state.moveForward&&this.state.moveBackward&&!this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = 0
            this.isActive = false;
        } else if (!this.state.moveForward&&!this.state.moveBackward&&this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = 0
            this.isActive = false;
        } else if (this.state.moveForward&&!this.state.moveBackward&&this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = -Math.PI/4
            this.isActive = true;
        } else if (this.state.moveForward&&!this.state.moveBackward&&!this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = Math.PI/4
            this.isActive = true;
        } else if (!this.state.moveForward&&this.state.moveBackward&&this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = -3*Math.PI/4
            this.isActive = true;
        } else if (!this.state.moveForward&&this.state.moveBackward&&!this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = 3*Math.PI/4
            this.isActive = true;
        } else if (this.state.moveForward&&!this.state.moveBackward&&this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = 0
            this.isActive = true;
        } else if (!this.state.moveForward&&this.state.moveBackward&&this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = Math.PI;
            this.isActive = true;
        } else if (this.state.moveForward&&this.state.moveBackward&&this.state.moveLeft&&!this.state.moveRight) {
            this.inputAngle = -Math.PI/2;
            this.isActive = true;
        } else if (this.state.moveForward&&this.state.moveBackward&&!this.state.moveLeft&&this.state.moveRight) {
            this.inputAngle = Math.PI/2;
            this.isActive = true;
        } else {
            this.inputAngle = 0;
            this.isActive = false;
        }
        this.isJumping = this.state.jump
    }
    
    
}
