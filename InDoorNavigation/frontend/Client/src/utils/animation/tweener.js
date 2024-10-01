// var easingTypes = require('tween-functions')
import tweenFunctions from './tween-functions';
// var easingTypes = require('tween-functions');



class Tween {
    constructor(config) {
        this._rafLoop = this._rafLoop.bind(this);
        this.terminate = this.terminate.bind(this);
        this._t0 = Date.now();
        this._config = config;
        this._rafLoop();
    }

    _rafLoop(){
        if (this._break){ 
            return; 
        }

        const {duration, start, end, easingType} = this._config;
        const now = Date.now();
        const elapsed = now - this._t0;
    
        if (elapsed >= duration){
            this._config.onFrame(end);
            this._config.onEnd();
            return;
        }
        
    
        const tweenVal = tweenFunctions[easingType](elapsed, start, end, duration);
        this._config.onFrame(tweenVal);
    
        requestAnimationFrame(this._rafLoop);
    }

    terminate(){
        this._break = true;
    }
}


function tween(config) {
	return new Tween(config);
};

export default tween;

// Tween.prototype._rafLoop = function() {
// 	if (this._break){ return; }

// 	var {duration, start, end, easingType} = this._config;
// 	var now = Date.now();
// 	var elapsed = now - this._t0;

// 	if (elapsed >= duration){
// 		this._config.onFrame(end);
// 		this._config.onEnd();
// 		return;
// 	}

// 	var tweenVal = easingTypes[easingType](elapsed, start, end, duration);
// 	this._config.onFrame(tweenVal);

// 	requestAnimationFrame(this._rafLoop);
// };

// Tween.prototype.terminate = function(){
// 	this._break = true;
// };