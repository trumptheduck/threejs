export default class Inventory{
    constructor(size) {
        this.content = [];
        this.emptyItem = {
            amount: 0,
            schema: '',
            icon: ''
        }
        for(let i = 0; i< size;i++) {this.content.push(this.emptyItem)}
        this.Item = (function(){
            class Item {
                constructor (schema,amount,iconPath) {
                    this.amount = amount;
                    this.schema = schema;
                    this.icon = iconPath;
                }
            }
            return Item
        })();
        this.items = {
            bedrock: new this.Item("bedrock",1,"/images/bedrock.png"),
            grass: new this.Item("grass",1,"/images/grass-top.png"),
            dirt: new this.Item("dirt",1,"/images/grass-bottomx16.png"),
        }
        this.content[12] = this.items.bedrock;
        this.content[13] = this.items.grass;
        this.content[14] = this.items.dirt;
        this.exchangeItem = (slot1,slot2) => {
            let interchangeValue = this.content[slot1];
            this.content[slot1] = this.content[slot2];
            this.content[slot2] = interchangeValue;
        };
        this.assignItem = (item,slot) => {
            this.content[slot] = item;
        };
        this.moveItem = (slot1,slot2) => {
            this.content[slot2] = this.content[slot1];
            this.content[slot1] = this.emptyItem;
        };
    }
    
}