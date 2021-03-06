export default class Keyboard {
    constructor () {
        this.binding = {
            moveForward: "w",
            moveBackward: "s",
            moveLeft: "a",
            moveRight: "d",
            jump: " ",
            log: "`",
            hotbar: {
                slot1: "1",
                slot2: "2",
                slot3: "3",
                slot4: "4",
                slot5: "5",
                slot6: "6",
                slot7: "7",
                slot8: "8",
                slot9: "9",
            },
            inventory: "e"
        };
        this.state = {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false,
            jump: false,
            hotbarSelected: null,
            inventory: false
        }
        this.inputAngle = 0;
        this.isActive = false;
        this.isJumping = false;
        this.logParam = null;
        this.logger = () => {
            this.logParam()
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
                case this.binding.hotbar.slot1: 
                this.state.hotbarSelected = 1;
                break;
                case this.binding.hotbar.slot2: 
                this.state.hotbarSelected = 2;
                break;
                case this.binding.hotbar.slot3: 
                this.state.hotbarSelected = 3;
                break;
                case this.binding.hotbar.slot4: 
                this.state.hotbarSelected = 4;
                break;
                case this.binding.hotbar.slot5: 
                this.state.hotbarSelected = 5;
                break;
                case this.binding.hotbar.slot6: 
                this.state.hotbarSelected = 6;
                break;
                case this.binding.hotbar.slot7: 
                this.state.hotbarSelected = 7;
                break;
                case this.binding.hotbar.slot8: 
                this.state.hotbarSelected = 8;
                break;
                case this.binding.hotbar.slot9: 
                this.state.hotbarSelected = 9;
                break;
                case this.binding.inventory: 
                this.state.inventory = !this.state.inventory;
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
