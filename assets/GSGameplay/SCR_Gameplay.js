window.canvas = null;

window.CANVAS_WIDTH = 0;
window.CANVAS_HEIGHT = 0;

window.GameState = cc.Enum({
	PLAY: 0,
	SWITCH_LEVEL: 1,
	GAME_OVER: 2
});

window.SCR_Gameplay = cc.Class({
    extends: cc.Component,
	
	statics: {
		instance: null
	},

    properties: {
		PFB_TUBE: {
			default: null,
			type: cc.Prefab
		},
		
        head: {
            default: null,
            type: cc.Node
        },
		
		tubeSource: {
			default: null,
			type: cc.Node
		},
		
		tubeDestination: {
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
		
		canvas = this.node;
		
		CANVAS_WIDTH = this.node.width;
		CANVAS_HEIGHT = this.node.height;
		
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
		if (this._state != GameState.SWITCH_LEVEL) {
			// state
			this._state = GameState.SWITCH_LEVEL;
			
			// destination
			var offset = this.tubeSource.position.sub(this.tubeDestination.position);
			
			var moveDestination = cc.moveBy(0.5, offset);
			var callFunc = cc.callFunc(this.onCompleteSwitchLevel, this);
			var sequence = cc.sequence(moveDestination, callFunc);
			
			this.tubeDestination.runAction(sequence);
			
			// head
			var moveHead = moveDestination.clone();
			this.head.runAction(moveHead);
			
			// source
			var moveSource = moveDestination.clone();
			this.tubeSource.runAction(moveSource);
		}
	},
	
	gameOver: function() {
		this.txtGameOver.active = true;
		this._state = GameState.GAME_OVER;
	},
	
	onCompleteSwitchLevel: function() {
		this.tubeSource.destroy();
		this.tubeSource = this.tubeDestination;
		this.tubeDestination = cc.instantiate(this.PFB_TUBE);
		this.tubeDestination.parent = canvas;
		
		this._state = GameState.PLAY;
	}
});
