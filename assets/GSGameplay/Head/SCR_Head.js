// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var HeadState = cc.Enum({
	IDLE: 0,
	LAUNCH: 1
});

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
		
		_state: {
			default: HeadState.IDLE,
			type: HeadState,
			serializable: false
		}
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
    },

    update(dt) {
		if (this._state == HeadState.LAUNCH) {
			this.node.y += 50;
			if (this.node.y > CANVAS_HEIGHT * 0.5) {
				SCR_Gameplay.instance.gameOver();
			}
		}
	},
	
	launch() {
		if (this._state == HeadState.IDLE) {
			this._state = HeadState.LAUNCH;
		}
	},
	
	onCollisionEnter(otherCollider, selfCollider) {
		if (SCR_Gameplay.instance._state == GameState.PLAY) {
			if (otherCollider.node.name == "Hole") {
				this._state = HeadState.IDLE;
				this.node.position = SCR_Gameplay.instance.tubeDestination.getComponent("SCR_Tube").getHeadPosition();
				SCR_Gameplay.instance.tubeDestination.getComponent(cc.Animation).stop();
				SCR_Gameplay.instance.finishLevel();
			}
			else if (otherCollider.node.name == "Body") {
				this._state = HeadState.IDLE;
				SCR_Gameplay.instance.tubeDestination.getComponent(cc.Animation).stop();
				SCR_Gameplay.instance.gameOver();
			}
		}
	}
});
