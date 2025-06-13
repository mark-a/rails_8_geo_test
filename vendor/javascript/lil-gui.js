// lil-gui@0.20.0 downloaded from https://ga.jspm.io/npm:lil-gui@0.20.0/dist/lil-gui.esm.js

/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */
class Controller{constructor(t,e,i,n,s="div"){
/**
		 * The GUI that contains this controller.
		 * @type {GUI}
		 */
this.parent=t;
/**
		 * The object this controller will modify.
		 * @type {object}
		 */this.object=e;
/**
		 * The name of the property to control.
		 * @type {string}
		 */this.property=i;
/**
		 * Used to determine if the controller is disabled.
		 * Use `controller.disable( true|false )` to modify this value.
		 * @type {boolean}
		 */this._disabled=false;
/**
		 * Used to determine if the Controller is hidden.
		 * Use `controller.show()` or `controller.hide()` to change this.
		 * @type {boolean}
		 */this._hidden=false;
/**
		 * The value of `object[ property ]` when the controller was created.
		 * @type {any}
		 */this.initialValue=this.getValue();
/**
		 * The outermost container DOM element for this controller.
		 * @type {HTMLElement}
		 */this.domElement=document.createElement(s);this.domElement.classList.add("controller");this.domElement.classList.add(n);
/**
		 * The DOM element that contains the controller's name.
		 * @type {HTMLElement}
		 */this.$name=document.createElement("div");this.$name.classList.add("name");Controller.nextNameID=Controller.nextNameID||0;this.$name.id="lil-gui-name-"
/**
		 * The DOM element that contains the controller's "widget" (which differs by controller type).
		 * @type {HTMLElement}
		 */+ ++Controller.nextNameID;this.$widget=document.createElement("div");this.$widget.classList.add("widget");
/**
		 * The DOM element that receives the disabled attribute when using disable().
		 * @type {HTMLElement}
		 */this.$disable=this.$widget;this.domElement.appendChild(this.$name);this.domElement.appendChild(this.$widget);this.domElement.addEventListener("keydown",(t=>t.stopPropagation()));this.domElement.addEventListener("keyup",(t=>t.stopPropagation()));this.parent.children.push(this);this.parent.controllers.push(this);this.parent.$children.appendChild(this.domElement);this._listenCallback=this._listenCallback.bind(this);this.name(i)}
/**
	 * Sets the name of the controller and its label in the GUI.
	 * @param {string} name
	 * @returns {this}
	 */name(t){
/**
		 * The controller's name. Use `controller.name( 'Name' )` to modify this value.
		 * @type {string}
		 */
this._name=t;this.$name.textContent=t;return this}
/**
	 * Pass a function to be called whenever the value is modified by this controller.
	 * The function receives the new value as its first parameter. The value of `this` will be the
	 * controller.
	 *
	 * For function controllers, the `onChange` callback will be fired on click, after the function
	 * executes.
	 * @param {Function} callback
	 * @returns {this}
	 * @example
	 * const controller = gui.add( object, 'property' );
	 *
	 * controller.onChange( function( v ) {
	 * 	console.log( 'The value is now ' + v );
	 * 	console.assert( this === controller );
	 * } );
	 */onChange(t){
/**
		 * Used to access the function bound to `onChange` events. Don't modify this value directly.
		 * Use the `controller.onChange( callback )` method instead.
		 * @type {Function}
		 */
this._onChange=t;return this}_callOnChange(){this.parent._callOnChange(this);this._onChange!==void 0&&this._onChange.call(this,this.getValue());this._changed=true}
/**
	 * Pass a function to be called after this controller has been modified and loses focus.
	 * @param {Function} callback
	 * @returns {this}
	 * @example
	 * const controller = gui.add( object, 'property' );
	 *
	 * controller.onFinishChange( function( v ) {
	 * 	console.log( 'Changes complete: ' + v );
	 * 	console.assert( this === controller );
	 * } );
	 */onFinishChange(t){
/**
		 * Used to access the function bound to `onFinishChange` events. Don't modify this value
		 * directly. Use the `controller.onFinishChange( callback )` method instead.
		 * @type {Function}
		 */
this._onFinishChange=t;return this}_callOnFinishChange(){if(this._changed){this.parent._callOnFinishChange(this);this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())}this._changed=false}
/**
	 * Sets the controller back to its initial value.
	 * @returns {this}
	 */reset(){this.setValue(this.initialValue);this._callOnFinishChange();return this}
/**
	 * Enables this controller.
	 * @param {boolean} enabled
	 * @returns {this}
	 * @example
	 * controller.enable();
	 * controller.enable( false ); // disable
	 * controller.enable( controller._disabled ); // toggle
	 */enable(t=true){return this.disable(!t)}
/**
	 * Disables this controller.
	 * @param {boolean} disabled
	 * @returns {this}
	 * @example
	 * controller.disable();
	 * controller.disable( false ); // enable
	 * controller.disable( !controller._disabled ); // toggle
	 */disable(t=true){if(t===this._disabled)return this;this._disabled=t;this.domElement.classList.toggle("disabled",t);this.$disable.toggleAttribute("disabled",t);return this}
/**
	 * Shows the Controller after it's been hidden.
	 * @param {boolean} show
	 * @returns {this}
	 * @example
	 * controller.show();
	 * controller.show( false ); // hide
	 * controller.show( controller._hidden ); // toggle
	 */show(t=true){this._hidden=!t;this.domElement.style.display=this._hidden?"none":"";return this}
/**
	 * Hides the Controller.
	 * @returns {this}
	 */hide(){return this.show(false)}
/**
	 * Changes this controller into a dropdown of options.
	 *
	 * Calling this method on an option controller will simply update the options. However, if this
	 * controller was not already an option controller, old references to this controller are
	 * destroyed, and a new controller is added to the end of the GUI.
	 * @example
	 * // safe usage
	 *
	 * gui.add( obj, 'prop1' ).options( [ 'a', 'b', 'c' ] );
	 * gui.add( obj, 'prop2' ).options( { Big: 10, Small: 1 } );
	 * gui.add( obj, 'prop3' );
	 *
	 * // danger
	 *
	 * const ctrl1 = gui.add( obj, 'prop1' );
	 * gui.add( obj, 'prop2' );
	 *
	 * // calling options out of order adds a new controller to the end...
	 * const ctrl2 = ctrl1.options( [ 'a', 'b', 'c' ] );
	 *
	 * // ...and ctrl1 now references a controller that doesn't exist
	 * assert( ctrl2 !== ctrl1 )
	 * @param {object|Array} options
	 * @returns {Controller}
	 */options(t){const e=this.parent.add(this.object,this.property,t);e.name(this._name);this.destroy();return e}
/**
	 * Sets the minimum value. Only works on number controllers.
	 * @param {number} min
	 * @returns {this}
	 */min(t){return this}
/**
	 * Sets the maximum value. Only works on number controllers.
	 * @param {number} max
	 * @returns {this}
	 */max(t){return this}
/**
	 * Values set by this controller will be rounded to multiples of `step`. Only works on number
	 * controllers.
	 * @param {number} step
	 * @returns {this}
	 */step(t){return this}
/**
	 * Rounds the displayed value to a fixed number of decimals, without affecting the actual value
	 * like `step()`. Only works on number controllers.
	 * @example
	 * gui.add( object, 'property' ).listen().decimals( 4 );
	 * @param {number} decimals
	 * @returns {this}
	 */decimals(t){return this}
/**
	 * Calls `updateDisplay()` every animation frame. Pass `false` to stop listening.
	 * @param {boolean} listen
	 * @returns {this}
	 */listen(t=true){
/**
		 * Used to determine if the controller is currently listening. Don't modify this value
		 * directly. Use the `controller.listen( true|false )` method instead.
		 * @type {boolean}
		 */
this._listening=t;if(this._listenCallbackID!==void 0){cancelAnimationFrame(this._listenCallbackID);this._listenCallbackID=void 0}this._listening&&this._listenCallback();return this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay();this._listenPrevValue=t}
/**
	 * Returns `object[ property ]`.
	 * @returns {any}
	 */getValue(){return this.object[this.property]}
/**
	 * Sets the value of `object[ property ]`, invokes any `onChange` handlers and updates the display.
	 * @param {any} value
	 * @returns {this}
	 */setValue(t){if(this.getValue()!==t){this.object[this.property]=t;this._callOnChange();this.updateDisplay()}return this}
/**
	 * Updates the display to keep it in sync with the current value. Useful for updating your
	 * controllers when their values have been modified outside of the GUI.
	 * @returns {this}
	 */updateDisplay(){return this}load(t){this.setValue(t);this._callOnFinishChange();return this}save(){return this.getValue()}destroy(){this.listen(false);this.parent.children.splice(this.parent.children.indexOf(this),1);this.parent.controllers.splice(this.parent.controllers.indexOf(this),1);this.parent.$children.removeChild(this.domElement)}}class BooleanController extends Controller{constructor(t,e,i){super(t,e,i,"boolean","label");this.$input=document.createElement("input");this.$input.setAttribute("type","checkbox");this.$input.setAttribute("aria-labelledby",this.$name.id);this.$widget.appendChild(this.$input);this.$input.addEventListener("change",(()=>{this.setValue(this.$input.checked);this._callOnFinishChange()}));this.$disable=this.$input;this.updateDisplay()}updateDisplay(){this.$input.checked=this.getValue();return this}}function normalizeColorString(t){let e,i;(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);return!!i&&"#"+i}const t={isPrimitive:true,match:t=>typeof t==="string",fromHexString:normalizeColorString,toHexString:normalizeColorString};const e={isPrimitive:true,match:t=>typeof t==="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)};const i={isPrimitive:false,match:t=>Array.isArray(t),fromHexString(t,i,n=1){const s=e.fromHexString(t);i[0]=(s>>16&255)/255*n;i[1]=(s>>8&255)/255*n;i[2]=(s&255)/255*n},toHexString([t,i,n],s=1){s=255/s;const l=t*s<<16^i*s<<8^n*s;return e.toHexString(l)}};const n={isPrimitive:false,match:t=>Object(t)===t,fromHexString(t,i,n=1){const s=e.fromHexString(t);i.r=(s>>16&255)/255*n;i.g=(s>>8&255)/255*n;i.b=(s&255)/255*n},toHexString({r:t,g:i,b:n},s=1){s=255/s;const l=t*s<<16^i*s<<8^n*s;return e.toHexString(l)}};const s=[t,e,i,n];function getColorFormat(t){return s.find((e=>e.match(t)))}class ColorController extends Controller{constructor(t,e,i,n){super(t,e,i,"color");this.$input=document.createElement("input");this.$input.setAttribute("type","color");this.$input.setAttribute("tabindex",-1);this.$input.setAttribute("aria-labelledby",this.$name.id);this.$text=document.createElement("input");this.$text.setAttribute("type","text");this.$text.setAttribute("spellcheck","false");this.$text.setAttribute("aria-labelledby",this.$name.id);this.$display=document.createElement("div");this.$display.classList.add("display");this.$display.appendChild(this.$input);this.$widget.appendChild(this.$display);this.$widget.appendChild(this.$text);this._format=getColorFormat(this.initialValue);this._rgbScale=n;this._initialValueHexString=this.save();this._textFocused=false;this.$input.addEventListener("input",(()=>{this._setValueFromHexString(this.$input.value)}));this.$input.addEventListener("blur",(()=>{this._callOnFinishChange()}));this.$text.addEventListener("input",(()=>{const t=normalizeColorString(this.$text.value);t&&this._setValueFromHexString(t)}));this.$text.addEventListener("focus",(()=>{this._textFocused=true;this.$text.select()}));this.$text.addEventListener("blur",(()=>{this._textFocused=false;this.updateDisplay();this._callOnFinishChange()}));this.$disable=this.$text;this.updateDisplay()}reset(){this._setValueFromHexString(this._initialValueHexString);return this}_setValueFromHexString(t){if(this._format.isPrimitive){const e=this._format.fromHexString(t);this.setValue(e)}else{this._format.fromHexString(t,this.getValue(),this._rgbScale);this._callOnChange();this.updateDisplay()}}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){this._setValueFromHexString(t);this._callOnFinishChange();return this}updateDisplay(){this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale);this._textFocused||(this.$text.value=this.$input.value.substring(1));this.$display.style.backgroundColor=this.$input.value;return this}}class FunctionController extends Controller{constructor(t,e,i){super(t,e,i,"function");this.$button=document.createElement("button");this.$button.appendChild(this.$name);this.$widget.appendChild(this.$button);this.$button.addEventListener("click",(t=>{t.preventDefault();this.getValue().call(this.object);this._callOnChange()}));this.$button.addEventListener("touchstart",(()=>{}),{passive:true});this.$disable=this.$button}}class NumberController extends Controller{constructor(t,e,i,n,s,l){super(t,e,i,"number");this._initInput();this.min(n);this.max(s);const r=l!==void 0;this.step(r?l:this._getImplicitStep(),r);this.updateDisplay()}decimals(t){this._decimals=t;this.updateDisplay();return this}min(t){this._min=t;this._onUpdateMinMax();return this}max(t){this._max=t;this._onUpdateMinMax();return this}step(t,e=true){this._step=t;this._stepExplicit=e;return this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let e=(t-this._min)/(this._max-this._min);e=Math.max(0,Math.min(e,1));this.$fill.style.width=e*100+"%"}this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals));return this}_initInput(){this.$input=document.createElement("input");this.$input.setAttribute("type","text");this.$input.setAttribute("aria-labelledby",this.$name.id);const t=window.matchMedia("(pointer: coarse)").matches;if(t){this.$input.setAttribute("type","number");this.$input.setAttribute("step","any")}this.$widget.appendChild(this.$input);this.$disable=this.$input;const onInput=()=>{let t=parseFloat(this.$input.value);if(!isNaN(t)){this._stepExplicit&&(t=this._snap(t));this.setValue(this._clamp(t))}};const increment=t=>{const e=parseFloat(this.$input.value);if(!isNaN(e)){this._snapClampSetValue(e+t);this.$input.value=this.getValue()}};const onKeyDown=t=>{t.key==="Enter"&&this.$input.blur();if(t.code==="ArrowUp"){t.preventDefault();increment(this._step*this._arrowKeyMultiplier(t))}if(t.code==="ArrowDown"){t.preventDefault();increment(this._step*this._arrowKeyMultiplier(t)*-1)}};const onWheel=t=>{if(this._inputFocused){t.preventDefault();increment(this._step*this._normalizeMouseWheel(t))}};let e,i,n,s,l,r=false;const o=5;const onMouseDown=t=>{e=t.clientX;i=n=t.clientY;r=true;s=this.getValue();l=0;window.addEventListener("mousemove",onMouseMove);window.addEventListener("mouseup",onMouseUp)};const onMouseMove=t=>{if(r){const n=t.clientX-e;const s=t.clientY-i;if(Math.abs(s)>o){t.preventDefault();this.$input.blur();r=false;this._setDraggingStyle(true,"vertical")}else Math.abs(n)>o&&onMouseUp()}if(!r){const e=t.clientY-n;l-=e*this._step*this._arrowKeyMultiplier(t);s+l>this._max?l=this._max-s:s+l<this._min&&(l=this._min-s);this._snapClampSetValue(s+l)}n=t.clientY};const onMouseUp=()=>{this._setDraggingStyle(false,"vertical");this._callOnFinishChange();window.removeEventListener("mousemove",onMouseMove);window.removeEventListener("mouseup",onMouseUp)};const onFocus=()=>{this._inputFocused=true};const onBlur=()=>{this._inputFocused=false;this.updateDisplay();this._callOnFinishChange()};this.$input.addEventListener("input",onInput);this.$input.addEventListener("keydown",onKeyDown);this.$input.addEventListener("wheel",onWheel,{passive:false});this.$input.addEventListener("mousedown",onMouseDown);this.$input.addEventListener("focus",onFocus);this.$input.addEventListener("blur",onBlur)}_initSlider(){this._hasSlider=true;this.$slider=document.createElement("div");this.$slider.classList.add("slider");this.$fill=document.createElement("div");this.$fill.classList.add("fill");this.$slider.appendChild(this.$fill);this.$widget.insertBefore(this.$slider,this.$input);this.domElement.classList.add("hasSlider");const map=(t,e,i,n,s)=>(t-e)/(i-e)*(s-n)+n;const setValueFromX=t=>{const e=this.$slider.getBoundingClientRect();let i=map(t,e.left,e.right,this._min,this._max);this._snapClampSetValue(i)};const mouseDown=t=>{this._setDraggingStyle(true);setValueFromX(t.clientX);window.addEventListener("mousemove",mouseMove);window.addEventListener("mouseup",mouseUp)};const mouseMove=t=>{setValueFromX(t.clientX)};const mouseUp=()=>{this._callOnFinishChange();this._setDraggingStyle(false);window.removeEventListener("mousemove",mouseMove);window.removeEventListener("mouseup",mouseUp)};let t,e,i=false;const beginTouchDrag=t=>{t.preventDefault();this._setDraggingStyle(true);setValueFromX(t.touches[0].clientX);i=false};const onTouchStart=n=>{if(!(n.touches.length>1)){if(this._hasScrollBar){t=n.touches[0].clientX;e=n.touches[0].clientY;i=true}else beginTouchDrag(n);window.addEventListener("touchmove",onTouchMove,{passive:false});window.addEventListener("touchend",onTouchEnd)}};const onTouchMove=n=>{if(i){const i=n.touches[0].clientX-t;const s=n.touches[0].clientY-e;if(Math.abs(i)>Math.abs(s))beginTouchDrag(n);else{window.removeEventListener("touchmove",onTouchMove);window.removeEventListener("touchend",onTouchEnd)}}else{n.preventDefault();setValueFromX(n.touches[0].clientX)}};const onTouchEnd=()=>{this._callOnFinishChange();this._setDraggingStyle(false);window.removeEventListener("touchmove",onTouchMove);window.removeEventListener("touchend",onTouchEnd)};const n=this._callOnFinishChange.bind(this);const s=400;let l;const onWheel=t=>{const e=Math.abs(t.deltaX)<Math.abs(t.deltaY);if(e&&this._hasScrollBar)return;t.preventDefault();const i=this._normalizeMouseWheel(t)*this._step;this._snapClampSetValue(this.getValue()+i);this.$input.value=this.getValue();clearTimeout(l);l=setTimeout(n,s)};this.$slider.addEventListener("mousedown",mouseDown);this.$slider.addEventListener("touchstart",onTouchStart,{passive:false});this.$slider.addEventListener("wheel",onWheel,{passive:false})}_setDraggingStyle(t,e="horizontal"){this.$slider&&this.$slider.classList.toggle("active",t);document.body.classList.toggle("lil-gui-dragging",t);document.body.classList.toggle(`lil-gui-${e}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){if(!this._hasSlider&&this._hasMin&&this._hasMax){this._stepExplicit||this.step(this._getImplicitStep(),false);this._initSlider();this.updateDisplay()}}_normalizeMouseWheel(t){let{deltaX:e,deltaY:i}=t;if(Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta){e=0;i=-t.wheelDelta/120;i*=this._stepExplicit?1:10}const n=e+-i;return n}_arrowKeyMultiplier(t){let e=this._stepExplicit?1:10;t.shiftKey?e*=10:t.altKey&&(e/=10);return e}_snap(t){let e=0;this._hasMin?e=this._min:this._hasMax&&(e=this._max);t-=e;t=Math.round(t/this._step)*this._step;t+=e;t=parseFloat(t.toPrecision(15));return t}_clamp(t){t<this._min&&(t=this._min);t>this._max&&(t=this._max);return t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class OptionController extends Controller{constructor(t,e,i,n){super(t,e,i,"option");this.$select=document.createElement("select");this.$select.setAttribute("aria-labelledby",this.$name.id);this.$display=document.createElement("div");this.$display.classList.add("display");this.$select.addEventListener("change",(()=>{this.setValue(this._values[this.$select.selectedIndex]);this._callOnFinishChange()}));this.$select.addEventListener("focus",(()=>{this.$display.classList.add("focus")}));this.$select.addEventListener("blur",(()=>{this.$display.classList.remove("focus")}));this.$widget.appendChild(this.$select);this.$widget.appendChild(this.$display);this.$disable=this.$select;this.options(n)}options(t){this._values=Array.isArray(t)?t:Object.values(t);this._names=Array.isArray(t)?t:Object.keys(t);this.$select.replaceChildren();this._names.forEach((t=>{const e=document.createElement("option");e.textContent=t;this.$select.appendChild(e)}));this.updateDisplay();return this}updateDisplay(){const t=this.getValue();const e=this._values.indexOf(t);this.$select.selectedIndex=e;this.$display.textContent=e===-1?t:this._names[e];return this}}class StringController extends Controller{constructor(t,e,i){super(t,e,i,"string");this.$input=document.createElement("input");this.$input.setAttribute("type","text");this.$input.setAttribute("spellcheck","false");this.$input.setAttribute("aria-labelledby",this.$name.id);this.$input.addEventListener("input",(()=>{this.setValue(this.$input.value)}));this.$input.addEventListener("keydown",(t=>{t.code==="Enter"&&this.$input.blur()}));this.$input.addEventListener("blur",(()=>{this._callOnFinishChange()}));this.$widget.appendChild(this.$input);this.$disable=this.$input;this.updateDisplay()}updateDisplay(){this.$input.value=this.getValue();return this}}var l='.lil-gui {\n  font-family: var(--font-family);\n  font-size: var(--font-size);\n  line-height: 1;\n  font-weight: normal;\n  font-style: normal;\n  text-align: left;\n  color: var(--text-color);\n  user-select: none;\n  -webkit-user-select: none;\n  touch-action: manipulation;\n  --background-color: #1f1f1f;\n  --text-color: #ebebeb;\n  --title-background-color: #111111;\n  --title-text-color: #ebebeb;\n  --widget-color: #424242;\n  --hover-color: #4f4f4f;\n  --focus-color: #595959;\n  --number-color: #2cc9ff;\n  --string-color: #a2db3c;\n  --font-size: 11px;\n  --input-font-size: 11px;\n  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;\n  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;\n  --padding: 4px;\n  --spacing: 4px;\n  --widget-height: 20px;\n  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);\n  --name-width: 45%;\n  --slider-knob-width: 2px;\n  --slider-input-width: 27%;\n  --color-input-width: 27%;\n  --slider-input-min-width: 45px;\n  --color-input-min-width: 45px;\n  --folder-indent: 7px;\n  --widget-padding: 0 0 0 3px;\n  --widget-border-radius: 2px;\n  --checkbox-size: calc(0.75 * var(--widget-height));\n  --scrollbar-width: 5px;\n}\n.lil-gui, .lil-gui * {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n.lil-gui.root {\n  width: var(--width, 245px);\n  display: flex;\n  flex-direction: column;\n  background: var(--background-color);\n}\n.lil-gui.root > .title {\n  background: var(--title-background-color);\n  color: var(--title-text-color);\n}\n.lil-gui.root > .children {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.lil-gui.root > .children::-webkit-scrollbar {\n  width: var(--scrollbar-width);\n  height: var(--scrollbar-width);\n  background: var(--background-color);\n}\n.lil-gui.root > .children::-webkit-scrollbar-thumb {\n  border-radius: var(--scrollbar-width);\n  background: var(--focus-color);\n}\n@media (pointer: coarse) {\n  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {\n    --widget-height: 28px;\n    --padding: 6px;\n    --spacing: 6px;\n    --font-size: 13px;\n    --input-font-size: 16px;\n    --folder-indent: 10px;\n    --scrollbar-width: 7px;\n    --slider-input-min-width: 50px;\n    --color-input-min-width: 65px;\n  }\n}\n.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {\n  --widget-height: 28px;\n  --padding: 6px;\n  --spacing: 6px;\n  --font-size: 13px;\n  --input-font-size: 16px;\n  --folder-indent: 10px;\n  --scrollbar-width: 7px;\n  --slider-input-min-width: 50px;\n  --color-input-min-width: 65px;\n}\n.lil-gui.autoPlace {\n  max-height: 100%;\n  position: fixed;\n  top: 0;\n  right: 15px;\n  z-index: 1001;\n}\n\n.lil-gui .controller {\n  display: flex;\n  align-items: center;\n  padding: 0 var(--padding);\n  margin: var(--spacing) 0;\n}\n.lil-gui .controller.disabled {\n  opacity: 0.5;\n}\n.lil-gui .controller.disabled, .lil-gui .controller.disabled * {\n  pointer-events: none !important;\n}\n.lil-gui .controller > .name {\n  min-width: var(--name-width);\n  flex-shrink: 0;\n  white-space: pre;\n  padding-right: var(--spacing);\n  line-height: var(--widget-height);\n}\n.lil-gui .controller .widget {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  min-height: var(--widget-height);\n}\n.lil-gui .controller.string input {\n  color: var(--string-color);\n}\n.lil-gui .controller.boolean {\n  cursor: pointer;\n}\n.lil-gui .controller.color .display {\n  width: 100%;\n  height: var(--widget-height);\n  border-radius: var(--widget-border-radius);\n  position: relative;\n}\n@media (hover: hover) {\n  .lil-gui .controller.color .display:hover:before {\n    content: " ";\n    display: block;\n    position: absolute;\n    border-radius: var(--widget-border-radius);\n    border: 1px solid #fff9;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n  }\n}\n.lil-gui .controller.color input[type=color] {\n  opacity: 0;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n}\n.lil-gui .controller.color input[type=text] {\n  margin-left: var(--spacing);\n  font-family: var(--font-family-mono);\n  min-width: var(--color-input-min-width);\n  width: var(--color-input-width);\n  flex-shrink: 0;\n}\n.lil-gui .controller.option select {\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n  max-width: 100%;\n}\n.lil-gui .controller.option .display {\n  position: relative;\n  pointer-events: none;\n  border-radius: var(--widget-border-radius);\n  height: var(--widget-height);\n  line-height: var(--widget-height);\n  max-width: 100%;\n  overflow: hidden;\n  word-break: break-all;\n  padding-left: 0.55em;\n  padding-right: 1.75em;\n  background: var(--widget-color);\n}\n@media (hover: hover) {\n  .lil-gui .controller.option .display.focus {\n    background: var(--focus-color);\n  }\n}\n.lil-gui .controller.option .display.active {\n  background: var(--focus-color);\n}\n.lil-gui .controller.option .display:after {\n  font-family: "lil-gui";\n  content: "↕";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  padding-right: 0.375em;\n}\n.lil-gui .controller.option .widget,\n.lil-gui .controller.option select {\n  cursor: pointer;\n}\n@media (hover: hover) {\n  .lil-gui .controller.option .widget:hover .display {\n    background: var(--hover-color);\n  }\n}\n.lil-gui .controller.number input {\n  color: var(--number-color);\n}\n.lil-gui .controller.number.hasSlider input {\n  margin-left: var(--spacing);\n  width: var(--slider-input-width);\n  min-width: var(--slider-input-min-width);\n  flex-shrink: 0;\n}\n.lil-gui .controller.number .slider {\n  width: 100%;\n  height: var(--widget-height);\n  background: var(--widget-color);\n  border-radius: var(--widget-border-radius);\n  padding-right: var(--slider-knob-width);\n  overflow: hidden;\n  cursor: ew-resize;\n  touch-action: pan-y;\n}\n@media (hover: hover) {\n  .lil-gui .controller.number .slider:hover {\n    background: var(--hover-color);\n  }\n}\n.lil-gui .controller.number .slider.active {\n  background: var(--focus-color);\n}\n.lil-gui .controller.number .slider.active .fill {\n  opacity: 0.95;\n}\n.lil-gui .controller.number .fill {\n  height: 100%;\n  border-right: var(--slider-knob-width) solid var(--number-color);\n  box-sizing: content-box;\n}\n\n.lil-gui-dragging .lil-gui {\n  --hover-color: var(--widget-color);\n}\n.lil-gui-dragging * {\n  cursor: ew-resize !important;\n}\n\n.lil-gui-dragging.lil-gui-vertical * {\n  cursor: ns-resize !important;\n}\n\n.lil-gui .title {\n  height: var(--title-height);\n  font-weight: 600;\n  padding: 0 var(--padding);\n  width: 100%;\n  text-align: left;\n  background: none;\n  text-decoration-skip: objects;\n}\n.lil-gui .title:before {\n  font-family: "lil-gui";\n  content: "▾";\n  padding-right: 2px;\n  display: inline-block;\n}\n.lil-gui .title:active {\n  background: var(--title-background-color);\n  opacity: 0.75;\n}\n@media (hover: hover) {\n  body:not(.lil-gui-dragging) .lil-gui .title:hover {\n    background: var(--title-background-color);\n    opacity: 0.85;\n  }\n  .lil-gui .title:focus {\n    text-decoration: underline var(--focus-color);\n  }\n}\n.lil-gui.root > .title:focus {\n  text-decoration: none !important;\n}\n.lil-gui.closed > .title:before {\n  content: "▸";\n}\n.lil-gui.closed > .children {\n  transform: translateY(-7px);\n  opacity: 0;\n}\n.lil-gui.closed:not(.transition) > .children {\n  display: none;\n}\n.lil-gui.transition > .children {\n  transition-duration: 300ms;\n  transition-property: height, opacity, transform;\n  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);\n  overflow: hidden;\n  pointer-events: none;\n}\n.lil-gui .children:empty:before {\n  content: "Empty";\n  padding: 0 var(--padding);\n  margin: var(--spacing) 0;\n  display: block;\n  height: var(--widget-height);\n  font-style: italic;\n  line-height: var(--widget-height);\n  opacity: 0.5;\n}\n.lil-gui.root > .children > .lil-gui > .title {\n  border: 0 solid var(--widget-color);\n  border-width: 1px 0;\n  transition: border-color 300ms;\n}\n.lil-gui.root > .children > .lil-gui.closed > .title {\n  border-bottom-color: transparent;\n}\n.lil-gui + .controller {\n  border-top: 1px solid var(--widget-color);\n  margin-top: 0;\n  padding-top: var(--spacing);\n}\n.lil-gui .lil-gui .lil-gui > .title {\n  border: none;\n}\n.lil-gui .lil-gui .lil-gui > .children {\n  border: none;\n  margin-left: var(--folder-indent);\n  border-left: 2px solid var(--widget-color);\n}\n.lil-gui .lil-gui .controller {\n  border: none;\n}\n\n.lil-gui label, .lil-gui input, .lil-gui button {\n  -webkit-tap-highlight-color: transparent;\n}\n.lil-gui input {\n  border: 0;\n  outline: none;\n  font-family: var(--font-family);\n  font-size: var(--input-font-size);\n  border-radius: var(--widget-border-radius);\n  height: var(--widget-height);\n  background: var(--widget-color);\n  color: var(--text-color);\n  width: 100%;\n}\n@media (hover: hover) {\n  .lil-gui input:hover {\n    background: var(--hover-color);\n  }\n  .lil-gui input:active {\n    background: var(--focus-color);\n  }\n}\n.lil-gui input:disabled {\n  opacity: 1;\n}\n.lil-gui input[type=text],\n.lil-gui input[type=number] {\n  padding: var(--widget-padding);\n  -moz-appearance: textfield;\n}\n.lil-gui input[type=text]:focus,\n.lil-gui input[type=number]:focus {\n  background: var(--focus-color);\n}\n.lil-gui input[type=checkbox] {\n  appearance: none;\n  width: var(--checkbox-size);\n  height: var(--checkbox-size);\n  border-radius: var(--widget-border-radius);\n  text-align: center;\n  cursor: pointer;\n}\n.lil-gui input[type=checkbox]:checked:before {\n  font-family: "lil-gui";\n  content: "✓";\n  font-size: var(--checkbox-size);\n  line-height: var(--checkbox-size);\n}\n@media (hover: hover) {\n  .lil-gui input[type=checkbox]:focus {\n    box-shadow: inset 0 0 0 1px var(--focus-color);\n  }\n}\n.lil-gui button {\n  outline: none;\n  cursor: pointer;\n  font-family: var(--font-family);\n  font-size: var(--font-size);\n  color: var(--text-color);\n  width: 100%;\n  border: none;\n}\n.lil-gui .controller button {\n  height: var(--widget-height);\n  text-transform: none;\n  background: var(--widget-color);\n  border-radius: var(--widget-border-radius);\n}\n@media (hover: hover) {\n  .lil-gui .controller button:hover {\n    background: var(--hover-color);\n  }\n  .lil-gui .controller button:focus {\n    box-shadow: inset 0 0 0 1px var(--focus-color);\n  }\n}\n.lil-gui .controller button:active {\n  background: var(--focus-color);\n}\n\n@font-face {\n  font-family: "lil-gui";\n  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");\n}';function _injectStyles(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let r=false;class GUI{
/**
	 * Creates a panel that holds controllers.
	 * @example
	 * new GUI();
	 * new GUI( { container: document.getElementById( 'custom' ) } );
	 *
	 * @param {object} [options]
	 * @param {boolean} [options.autoPlace=true]
	 * Adds the GUI to `document.body` and fixes it to the top right of the page.
	 *
	 * @param {HTMLElement} [options.container]
	 * Adds the GUI to this DOM element. Overrides `autoPlace`.
	 *
	 * @param {number} [options.width=245]
	 * Width of the GUI in pixels, usually set when name labels become too long. Note that you can make
	 * name labels wider in CSS with `.lil‑gui { ‑‑name‑width: 55% }`.
	 *
	 * @param {string} [options.title=Controls]
	 * Name to display in the title bar.
	 *
	 * @param {boolean} [options.closeFolders=false]
	 * Pass `true` to close all folders in this GUI by default.
	 *
	 * @param {boolean} [options.injectStyles=true]
	 * Injects the default stylesheet into the page if this is the first GUI.
	 * Pass `false` to use your own stylesheet.
	 *
	 * @param {number} [options.touchStyles=true]
	 * Makes controllers larger on touch devices. Pass `false` to disable touch styles.
	 *
	 * @param {GUI} [options.parent]
	 * Adds this GUI as a child in another GUI. Usually this is done for you by `addFolder()`.
	 */
constructor({parent:t,autoPlace:e=t===void 0,container:i,width:n,title:s="Controls",closeFolders:o=false,injectStyles:a=true,touchStyles:h=true}={}){
/**
		 * The GUI containing this folder, or `undefined` if this is the root GUI.
		 * @type {GUI}
		 */
this.parent=t;
/**
		 * The top level GUI containing this folder, or `this` if this is the root GUI.
		 * @type {GUI}
		 */this.root=t?t.root:this;
/**
		 * The list of controllers and folders contained by this GUI.
		 * @type {Array<GUI|Controller>}
		 */this.children=[];
/**
		 * The list of controllers contained by this GUI.
		 * @type {Array<Controller>}
		 */this.controllers=[];
/**
		 * The list of folders contained by this GUI.
		 * @type {Array<GUI>}
		 */this.folders=[];
/**
		 * Used to determine if the GUI is closed. Use `gui.open()` or `gui.close()` to change this.
		 * @type {boolean}
		 */this._closed=false;
/**
		 * Used to determine if the GUI is hidden. Use `gui.show()` or `gui.hide()` to change this.
		 * @type {boolean}
		 */this._hidden=false;
/**
		 * The outermost container element.
		 * @type {HTMLElement}
		 */this.domElement=document.createElement("div");this.domElement.classList.add("lil-gui");
/**
		 * The DOM element that contains the title.
		 * @type {HTMLElement}
		 */this.$title=document.createElement("button");this.$title.classList.add("title");this.$title.setAttribute("aria-expanded",true);this.$title.addEventListener("click",(()=>this.openAnimated(this._closed)));this.$title.addEventListener("touchstart",(()=>{}),{passive:true});
/**
		 * The DOM element that contains children.
		 * @type {HTMLElement}
		 */this.$children=document.createElement("div");this.$children.classList.add("children");this.domElement.appendChild(this.$title);this.domElement.appendChild(this.$children);this.title(s);if(this.parent){this.parent.children.push(this);this.parent.folders.push(this);this.parent.$children.appendChild(this.domElement)}else{this.domElement.classList.add("root");h&&this.domElement.classList.add("allow-touch-styles");if(!r&&a){_injectStyles(l);r=true}if(i)i.appendChild(this.domElement);else if(e){this.domElement.classList.add("autoPlace");document.body.appendChild(this.domElement)}n&&this.domElement.style.setProperty("--width",n+"px");this._closeFolders=o}}
/**
	 * Adds a controller to the GUI, inferring controller type using the `typeof` operator.
	 * @example
	 * gui.add( object, 'property' );
	 * gui.add( object, 'number', 0, 100, 1 );
	 * gui.add( object, 'options', [ 1, 2, 3 ] );
	 *
	 * @param {object} object The object the controller will modify.
	 * @param {string} property Name of the property to control.
	 * @param {number|object|Array} [$1] Minimum value for number controllers, or the set of
	 * selectable values for a dropdown.
	 * @param {number} [max] Maximum value for number controllers.
	 * @param {number} [step] Step value for number controllers.
	 * @returns {Controller}
	 */add(t,e,i,n,s){if(Object(i)===i)return new OptionController(this,t,e,i);const l=t[e];switch(typeof l){case"number":return new NumberController(this,t,e,i,n,s);case"boolean":return new BooleanController(this,t,e);case"string":return new StringController(this,t,e);case"function":return new FunctionController(this,t,e)}console.error("gui.add failed\n\tproperty:",e,"\n\tobject:",t,"\n\tvalue:",l)}
/**
	 * Adds a color controller to the GUI.
	 * @example
	 * params = {
	 * 	cssColor: '#ff00ff',
	 * 	rgbColor: { r: 0, g: 0.2, b: 0.4 },
	 * 	customRange: [ 0, 127, 255 ],
	 * };
	 *
	 * gui.addColor( params, 'cssColor' );
	 * gui.addColor( params, 'rgbColor' );
	 * gui.addColor( params, 'customRange', 255 );
	 *
	 * @param {object} object The object the controller will modify.
	 * @param {string} property Name of the property to control.
	 * @param {number} rgbScale Maximum value for a color channel when using an RGB color. You may
	 * need to set this to 255 if your colors are too bright.
	 * @returns {Controller}
	 */addColor(t,e,i=1){return new ColorController(this,t,e,i)}
/**
	 * Adds a folder to the GUI, which is just another GUI. This method returns
	 * the nested GUI so you can add controllers to it.
	 * @example
	 * const folder = gui.addFolder( 'Position' );
	 * folder.add( position, 'x' );
	 * folder.add( position, 'y' );
	 * folder.add( position, 'z' );
	 *
	 * @param {string} title Name to display in the folder's title bar.
	 * @returns {GUI}
	 */addFolder(t){const e=new GUI({parent:this,title:t});this.root._closeFolders&&e.close();return e}
/**
	 * Recalls values that were saved with `gui.save()`.
	 * @param {object} obj
	 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
	 * @returns {this}
	 */load(t,e=true){t.controllers&&this.controllers.forEach((e=>{e instanceof FunctionController||e._name in t.controllers&&e.load(t.controllers[e._name])}));e&&t.folders&&this.folders.forEach((e=>{e._title in t.folders&&e.load(t.folders[e._title])}));return this}
/**
	 * Returns an object mapping controller names to values. The object can be passed to `gui.load()` to
	 * recall these values.
	 * @example
	 * {
	 * 	controllers: {
	 * 		prop1: 1,
	 * 		prop2: 'value',
	 * 		...
	 * 	},
	 * 	folders: {
	 * 		folderName1: { controllers, folders },
	 * 		folderName2: { controllers, folders }
	 * 		...
	 * 	}
	 * }
	 *
	 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
	 * @returns {object}
	 */save(t=true){const e={controllers:{},folders:{}};this.controllers.forEach((t=>{if(!(t instanceof FunctionController)){if(t._name in e.controllers)throw new Error(`Cannot save GUI with duplicate property "${t._name}"`);e.controllers[t._name]=t.save()}}));t&&this.folders.forEach((t=>{if(t._title in e.folders)throw new Error(`Cannot save GUI with duplicate folder "${t._title}"`);e.folders[t._title]=t.save()}));return e}
/**
	 * Opens a GUI or folder. GUI and folders are open by default.
	 * @param {boolean} open Pass false to close.
	 * @returns {this}
	 * @example
	 * gui.open(); // open
	 * gui.open( false ); // close
	 * gui.open( gui._closed ); // toggle
	 */open(t=true){this._setClosed(!t);this.$title.setAttribute("aria-expanded",!this._closed);this.domElement.classList.toggle("closed",this._closed);return this}
/**
	 * Closes the GUI.
	 * @returns {this}
	 */close(){return this.open(false)}_setClosed(t){if(this._closed!==t){this._closed=t;this._callOnOpenClose(this)}}
/**
	 * Shows the GUI after it's been hidden.
	 * @param {boolean} show
	 * @returns {this}
	 * @example
	 * gui.show();
	 * gui.show( false ); // hide
	 * gui.show( gui._hidden ); // toggle
	 */show(t=true){this._hidden=!t;this.domElement.style.display=this._hidden?"none":"";return this}
/**
	 * Hides the GUI.
	 * @returns {this}
	 */hide(){return this.show(false)}openAnimated(t=true){this._setClosed(!t);this.$title.setAttribute("aria-expanded",!this._closed);requestAnimationFrame((()=>{const e=this.$children.clientHeight;this.$children.style.height=e+"px";this.domElement.classList.add("transition");const onTransitionEnd=t=>{if(t.target===this.$children){this.$children.style.height="";this.domElement.classList.remove("transition");this.$children.removeEventListener("transitionend",onTransitionEnd)}};this.$children.addEventListener("transitionend",onTransitionEnd);const i=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!t);requestAnimationFrame((()=>{this.$children.style.height=i+"px"}))}));return this}
/**
	 * Change the title of this GUI.
	 * @param {string} title
	 * @returns {this}
	 */title(t){
/**
		 * Current title of the GUI. Use `gui.title( 'Title' )` to modify this value.
		 * @type {string}
		 */
this._title=t;this.$title.textContent=t;return this}
/**
	 * Resets all controllers to their initial values.
	 * @param {boolean} recursive Pass false to exclude folders descending from this GUI.
	 * @returns {this}
	 */reset(t=true){const e=t?this.controllersRecursive():this.controllers;e.forEach((t=>t.reset()));return this}
/**
	 * Pass a function to be called whenever a controller in this GUI changes.
	 * @param {function({object:object, property:string, value:any, controller:Controller})} callback
	 * @returns {this}
	 * @example
	 * gui.onChange( event => {
	 * 	event.object     // object that was modified
	 * 	event.property   // string, name of property
	 * 	event.value      // new value of controller
	 * 	event.controller // controller that was modified
	 * } );
	 */onChange(t){
/**
		 * Used to access the function bound to `onChange` events. Don't modify this value
		 * directly. Use the `gui.onChange( callback )` method instead.
		 * @type {Function}
		 */
this._onChange=t;return this}_callOnChange(t){this.parent&&this.parent._callOnChange(t);this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}
/**
	 * Pass a function to be called whenever a controller in this GUI has finished changing.
	 * @param {function({object:object, property:string, value:any, controller:Controller})} callback
	 * @returns {this}
	 * @example
	 * gui.onFinishChange( event => {
	 * 	event.object     // object that was modified
	 * 	event.property   // string, name of property
	 * 	event.value      // new value of controller
	 * 	event.controller // controller that was modified
	 * } );
	 */onFinishChange(t){
/**
		 * Used to access the function bound to `onFinishChange` events. Don't modify this value
		 * directly. Use the `gui.onFinishChange( callback )` method instead.
		 * @type {Function}
		 */
this._onFinishChange=t;return this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t);this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}
/**
	 * Pass a function to be called when this GUI or its descendants are opened or closed.
	 * @param {function(GUI)} callback
	 * @returns {this}
	 * @example
	 * gui.onOpenClose( changedGUI => {
	 * 	console.log( changedGUI._closed );
	 * } );
	 */onOpenClose(t){this._onOpenClose=t;return this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t);this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){if(this.parent){this.parent.children.splice(this.parent.children.indexOf(this),1);this.parent.folders.splice(this.parent.folders.indexOf(this),1)}this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement);Array.from(this.children).forEach((t=>t.destroy()))}
/**
	 * Returns an array of controllers contained by this GUI and its descendents.
	 * @returns {Controller[]}
	 */controllersRecursive(){let t=Array.from(this.controllers);this.folders.forEach((e=>{t=t.concat(e.controllersRecursive())}));return t}
/**
	 * Returns an array of folders contained by this GUI and its descendents.
	 * @returns {GUI[]}
	 */foldersRecursive(){let t=Array.from(this.folders);this.folders.forEach((e=>{t=t.concat(e.foldersRecursive())}));return t}}export{BooleanController,ColorController,Controller,FunctionController,GUI,NumberController,OptionController,StringController,GUI as default};

