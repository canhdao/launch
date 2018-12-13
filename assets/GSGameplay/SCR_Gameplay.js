cc.Class({
    extends: cc.Component,

    properties: {
        head: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function () {
        //this.label.string = this.text;
		cc.debug.setDisplayStats(false);
		
		this.node.on('mousedown', this.onMouseDown, this);
    },

    update: function (dt) {

    },
	
	onMouseDown: function(event) {
		this.head.getComponent("SCR_Head").launch();
	}
});
