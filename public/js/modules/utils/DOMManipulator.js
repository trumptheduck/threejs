export default class DOMManipulator{
    constructor() {
        this.binding = {
            moveItem : function(){},
            exchangeItem : function(){},
            assignItem : function(){},
        }
        this.ivt = null;
        this.title = {
            play :() => {
                document.getElementById('menu-world').style.display = 'block'
            },
            credit : {}
        }
        this.load = null;
        this.menu = {
            generateWorld : () => {
                document.getElementById('menu-world-setting-wrapper').style.display = 'none'
                setTimeout(document.getElementById('menu-world-loading-wrapper').style.display = 'block',1000)
                const wSeed = document.getElementById('menu-world-input-seed').value;
                const wSize = document.getElementById('menu-world-input-size').value;
                this.load(wSize,wSeed)
            }
        }
    }
    renderInventory(itemArray) {
        for (let i = 0;i< itemArray.length;i++) {
            if (itemArray[i].amount < 1) {
              document.getElementById(`ivt-${i}`).innerHTML = ''
            } else {
                var id = Math.random()
                document.getElementById(`ivt-${i}`).innerHTML = `<img id="item-${id}" draggable="true" src="${itemArray[i].icon}" width="52" height="52" style="position: relative;left: -1px;top: -1px">`
                document.getElementById(`item-${id}`).addEventListener('dragstart',(event)=>{this.drag(event)})
              }
        }
    }
    allowDrop(ev) {
        ev.preventDefault();
      }
      
    drag(ev) {
        ev.dataTransfer.setData("data", ev.target.id);
        ev.dataTransfer.setData("origin",ev.target.parentNode.id)
      }
    drop(ev) {
        ev.preventDefault();
        var origin = ev.dataTransfer.getData("origin");
        if (ev.target.tagName === 'DIV') {
          var slot1, slot2
          slot1 = parseInt(ev.target.id.split('-').pop(),10);
          slot2 = parseInt(document.getElementById(origin).id.split('-').pop(),10)
          this.binding.moveItem(slot2,slot1);
          this.renderInventory(this.ivt)
        } else if (ev.target.tagName === 'IMG') {
          var slot1, slot2
          slot1 = parseInt(ev.target.parentNode.id.split('-').pop(),10);
          slot2 = parseInt(document.getElementById(origin).id.split('-').pop(),10)
          this.binding.exchangeItem(slot1,slot2);
          this.renderInventory(this.ivt)
        }
      }
      init() {this.renderInventory(this.ivt)}
}