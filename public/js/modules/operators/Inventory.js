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
            grass: new this.Item("grass",1,"/images/grass-topx16.png"),
            dirt: new this.Item("dirt",1,"/images/grass-bottomx16.png"),
            stone: new this.Item("stone",1,"/images/stone.png"),
            log: new this.Item("log",1,"/images/oak_log.png"),
            planks: new this.Item("planks",1,"/images/oak_planks.png"),
            leaves: new this.Item("leaves",1,"/images/oak_leaves.png"),
        }
        this.content[35] = this.items.bedrock;
        this.content[34] = this.items.grass;
        this.content[33] = this.items.dirt;
        this.content[32] = this.items.stone;
        this.content[31] = this.items.log;
        this.content[30] = this.items.planks;
        this.content[29] = this.items.leaves;
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