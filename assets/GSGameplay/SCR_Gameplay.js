window.SCREEN_WIDTH = 0;
window.SCREEN_HEIGHT = 0;

window.GameState = cc.Enum({
	PLAY: 0,
	GAME_OVER: 1
});

window.SCR_Gameplay = cc.Class({
    extends: cc.Component,
	
	statics: {
		instance: null
	},

    properties: {
        head: {
            default: null,
            type: cc.Node
        },
		
		tube: {
			default: null,
			type: cc.Node
		},
		
		txtGameOver: {
			default: null,
			type: cc.Node
		},
		
		_state: {
			default: GameState.PLAY,
			type: GameState,
			serializable: false
		}
    },

    onLoad: function() {
        cc.director.getCollisionManager().enabled = true;
		//cc.director.getCollisionManager().enabledDebugDraw = true;
		
		//cc.director.getPhysicsManager().enabled = true;
        //cc.director.getPhysicsManager().gravity = cc.v2(0, -3000);
		
		cc.debug.setDisplayStats(false);
		
        SCREEN_WIDTH = this.node.width;
        SCREEN_HEIGHT = this.node.height;
		
		this.txtGameOver.active = false;
		
		this.node.on('mousedown', this.onMouseDown, this);
		
		SCR_Gameplay.instance = this;
    },

    update: function(dt) {

    },
	
	onMouseDown: function(event) {
		if (this._state == GameState.PLAY) {
			this.head.getComponent("SCR_Head").launch();
		}
		else if (this._state == GameState.GAME_OVER) {
			cc.director.loadScene("SCN_Gameplay");
		}
	},
	
	finishLevel: function() {
	},
	
	gameOver: function() {
		this.txtGameOver.active = true;
		this._state = GameState.GAME_OVER;
	}
});
