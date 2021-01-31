export default class Mouse{
    constructor() {
        this.binding = {
            destroy: 0,
            place: 2            
        }
        this.state = {
            destroy: false,
            place: false
        }
    };
    connect() {
        document.addEventListener('mousedown',(ev)=>{
            switch (ev.button) {
                case this.binding.destroy:
                    this.state.destroy = true;
                break;
                case this.binding.place:
                    this.state.place = true;
                break;
            }
        })
        document.addEventListener('mouseup',(ev)=>{
            switch (ev.button) {
                case this.binding.destroy:
                    this.state.destroy = false;
                break;
                case this.binding.place:
                    this.state.place = false;
                break;
            }
        })
    }
}