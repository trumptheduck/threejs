import * as THREE from "../../three/build/three.module.js"
//Check for container
if (document.getElementById("ui-layer") === null) {
    console.error("UI Layer not found! Failed to add Joystick!")
    var joystick = {
        compiledAngle: null,
        active: null
    }
} else {
            //Append Controller
            document.getElementById("ui-layer").innerHTML += ` 
            <div id="joystick" style="position: absolute;
            bottom: 5%;
            right: 5%;
            width: 15vw;
            height: 15vw;
            border-radius: 100%;
            background-color: transparent;
            background-image: url('/images/joystick/base.png');
            background-size: contain;
            background-repeat: no-repeat;
            opacity: 50%;">
            <div id="joystick-base" style=" position: absolute;
                top: 0%;
                left: 0%;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                background-color: transparent;
                z-index: 2;"></div>
            <div id="joystick-joy" style=" position: absolute;
                top: 30%;
                left: 30%;
                width: 40%;
                height: 40%;
                border-radius: 100%;
                background-color: transparent;
                background-image: url('/images/joystick/joy.png');
                background-size: contain;
                background-repeat: no-repeat;"></div>
        </div>`

        //Joystick Elements
        var joyEle = {
            joystick : document.getElementById('joystick'),
            joystickRect: document.getElementById('joystick').getBoundingClientRect(),
            joy : document.getElementById('joystick-joy'),
            joyRect: document.getElementById('joystick-joy').getBoundingClientRect(),
            base : document.getElementById('joystick-base'),
        }
        //Main joystick data
        var joystick = {
            offsets: {
                x: joyEle.joystickRect.x+joyEle.joyRect.width/2,
                y: joyEle.joystickRect.y+joyEle.joyRect.height/2,
            },
            normalized: {
                x: joyEle.joystickRect.width/2-joyEle.joyRect.width/2,
                y: joyEle.joystickRect.height/2-joyEle.joyRect.height/2,
            },
            angle: 0,
            compiledAngle: 0,
            active: false,
            //Update control state(Joy-button position)
            updateControlProfile() {
                    let position = {
                        relative : {
                            y: userInput.clientY - joystick.offsets.y,
                            x: userInput.clientX - joystick.offsets.x
                        },
                        normalized: {
                            y: -(userInput.clientY - joystick.offsets.y - joyEle.joystickRect.height/2 +joyEle.joyRect.height/2),
                            x: userInput.clientX - joystick.offsets.x - joyEle.joystickRect.width/2 + joyEle.joyRect.width/2
                        }
                    }
                    if (Math.pow(position.normalized.x,2)+Math.pow(position.normalized.y,2)<Math.pow(joyEle.joystickRect.height/2,2)) {
                        //In bound
                        joyEle.joy.style.top = `${position.relative.y}px`;
                        joyEle.joy.style.left = `${position.relative.x}px`;
                    } else {
                        //Out of bound
                        joyEle.joy.style.top = `${(joyEle.joystickRect.height/2-joyEle.joyRect.height/8)*Math.sin(joystick.compiledAngle-Math.PI/2)+joyEle.joystickRect.height/2-joyEle.joyRect.height/2}px`;
                        joyEle.joy.style.left = `${(joyEle.joystickRect.height/2-joyEle.joyRect.height/8)*Math.cos(joystick.compiledAngle-Math.PI/2)+joyEle.joystickRect.height/2-joyEle.joyRect.height/2}px`;
                    }
                    getJoystickAngle(position.normalized,joystick.compiledAngle)
                },
            //Reset control profile
            resetControlProfile() {
            joyEle.joy.style.top = `${joystick.normalized.y}px`;
            joyEle.joy.style.left = `${joystick.normalized.x}px`;
            }
        }
        //Get angle of the touch position with the two axis
        const getJoystickAngle = (coords) => {
            joystick.angle = Math.atan(coords.y/coords.x)
            if (coords.x < 0 ) {
                let degAngle = -THREE.Math.radToDeg(joystick.angle)-90
                joystick.compiledAngle = THREE.Math.degToRad(degAngle)
            } else if (coords.x > 0 ) {
                let degAngle = 180-THREE.Math.radToDeg(joystick.angle)-90
                joystick.compiledAngle = THREE.Math.degToRad(degAngle)
            } else {
                if (coords.y >= 0) {
                    let degAngle = 0;
                    joystick.compiledAngle = THREE.Math.degToRad(degAngle)
                } else if (coords.y < 0) {
                    let degAngle = 180;
                    joystick.compiledAngle = THREE.Math.degToRad(degAngle)
                } 
            }
        }
        //Event listeners
        var userInput = {clientX: 0, clientY:0}
        joyEle.base.addEventListener('touchstart', function(e) {
        userInput.clientX = e.touches[0].clientX;
        userInput.clientY = e.touches[0].clientY;
        joystick.updateControlProfile()
        joystick.active = true;
        }, false);
        joyEle.base.addEventListener('touchmove', function(e) {            
        userInput.clientX = e.touches[0].clientX;
        userInput.clientY = e.touches[0].clientY;
        joystick.updateControlProfile()
        joystick.active = true;
        }, false);
        joyEle.base.addEventListener('touchend', function(e) {
        joystick.resetControlProfile()
        joystick.active = false;
        }, false);
}
export let Joystick = {
    getAngle : () => joystick.compiledAngle,
    getState : () => joystick.active,
}