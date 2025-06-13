// three/examples/jsm/controls/OrbitControls.js@0.177.0 downloaded from https://ga.jspm.io/npm:three@0.177.0/examples/jsm/controls/OrbitControls.js

import{Ray as t,Plane as e,MathUtils as s,Vector3 as i,Controls as o,MOUSE as n,TOUCH as a,Quaternion as h,Spherical as r,Vector2 as l}from "three";
/**
 * Fires when the camera has been transformed by the controls.
 *
 * @event OrbitControls#change
 * @type {Object}
 */const c={type:"change"};
/**
 * Fires when an interaction was initiated.
 *
 * @event OrbitControls#start
 * @type {Object}
 */const p={type:"start"};
/**
 * Fires when an interaction has finished.
 *
 * @event OrbitControls#end
 * @type {Object}
 */const _={type:"end"};const d=new t;const u=new e;const m=Math.cos(70*s.DEG2RAD);const b=new i;const y=2*Math.PI;const f={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};const g=1e-6;class OrbitControls extends o{
/**
	 * Constructs a new controls instance.
	 *
	 * @param {Object3D} object - The object that is managed by the controls.
	 * @param {?HTMLDOMElement} domElement - The HTML element used for event listeners.
	 */
constructor(t,e=null){super(t,e);this.state=f.NONE;
/**
		 * The focus point of the controls, the `object` orbits around this.
		 * It can be updated manually at any point to change the focus of the controls.
		 *
		 * @type {Vector3}
		 */this.target=new i;
/**
		 * The focus point of the `minTargetRadius` and `maxTargetRadius` limits.
		 * It can be updated manually at any point to change the center of interest
		 * for the `target`.
		 *
		 * @type {Vector3}
		 */this.cursor=new i;
/**
		 * How far you can dolly in (perspective camera only).
		 *
		 * @type {number}
		 * @default 0
		 */this.minDistance=0;
/**
		 * How far you can dolly out (perspective camera only).
		 *
		 * @type {number}
		 * @default Infinity
		 */this.maxDistance=Infinity;
/**
		 * How far you can zoom in (orthographic camera only).
		 *
		 * @type {number}
		 * @default 0
		 */this.minZoom=0;
/**
		 * How far you can zoom out (orthographic camera only).
		 *
		 * @type {number}
		 * @default Infinity
		 */this.maxZoom=Infinity;
/**
		 * How close you can get the target to the 3D `cursor`.
		 *
		 * @type {number}
		 * @default 0
		 */this.minTargetRadius=0;
/**
		 * How far you can move the target from the 3D `cursor`.
		 *
		 * @type {number}
		 * @default Infinity
		 */this.maxTargetRadius=Infinity;
/**
		 * How far you can orbit vertically, lower limit. Range is `[0, Math.PI]` radians.
		 *
		 * @type {number}
		 * @default 0
		 */this.minPolarAngle=0;
/**
		 * How far you can orbit vertically, upper limit. Range is `[0, Math.PI]` radians.
		 *
		 * @type {number}
		 * @default Math.PI
		 */this.maxPolarAngle=Math.PI;
/**
		 * How far you can orbit horizontally, lower limit. If set, the interval `[ min, max ]`
		 * must be a sub-interval of `[ - 2 PI, 2 PI ]`, with `( max - min < 2 PI )`.
		 *
		 * @type {number}
		 * @default -Infinity
		 */this.minAzimuthAngle=-Infinity;
/**
		 * How far you can orbit horizontally, upper limit. If set, the interval `[ min, max ]`
		 * must be a sub-interval of `[ - 2 PI, 2 PI ]`, with `( max - min < 2 PI )`.
		 *
		 * @type {number}
		 * @default -Infinity
		 */this.maxAzimuthAngle=Infinity;
/**
		 * Set to `true` to enable damping (inertia), which can be used to give a sense of weight
		 * to the controls. Note that if this is enabled, you must call `update()` in your animation
		 * loop.
		 *
		 * @type {boolean}
		 * @default false
		 */this.enableDamping=false;
/**
		 * The damping inertia used if `enableDamping` is set to `true`.
		 *
		 * Note that for this to work, you must call `update()` in your animation loop.
		 *
		 * @type {number}
		 * @default 0.05
		 */this.dampingFactor=.05;
/**
		 * Enable or disable zooming (dollying) of the camera.
		 *
		 * @type {boolean}
		 * @default true
		 */this.enableZoom=true;
/**
		 * Speed of zooming / dollying.
		 *
		 * @type {number}
		 * @default 1
		 */this.zoomSpeed=1;
/**
		 * Enable or disable horizontal and vertical rotation of the camera.
		 *
		 * Note that it is possible to disable a single axis by setting the min and max of the
		 * `minPolarAngle` or `minAzimuthAngle` to the same value, which will cause the vertical
		 * or horizontal rotation to be fixed at that value.
		 *
		 * @type {boolean}
		 * @default true
		 */this.enableRotate=true;
/**
		 * Speed of rotation.
		 *
		 * @type {number}
		 * @default 1
		 */this.rotateSpeed=1;
/**
		 * How fast to rotate the camera when the keyboard is used.
		 *
		 * @type {number}
		 * @default 1
		 */this.keyRotateSpeed=1;
/**
		 * Enable or disable camera panning.
		 *
		 * @type {boolean}
		 * @default true
		 */this.enablePan=true;
/**
		 * Speed of panning.
		 *
		 * @type {number}
		 * @default 1
		 */this.panSpeed=1;
/**
		 * Defines how the camera's position is translated when panning. If `true`, the camera pans
		 * in screen space. Otherwise, the camera pans in the plane orthogonal to the camera's up
		 * direction.
		 *
		 * @type {boolean}
		 * @default true
		 */this.screenSpacePanning=true;
/**
		 * How fast to pan the camera when the keyboard is used in
		 * pixels per keypress.
		 *
		 * @type {number}
		 * @default 7
		 */this.keyPanSpeed=7;
/**
		 * Setting this property to `true` allows to zoom to the cursor's position.
		 *
		 * @type {boolean}
		 * @default false
		 */this.zoomToCursor=false;
/**
		 * Set to true to automatically rotate around the target
		 *
		 * Note that if this is enabled, you must call `update()` in your animation loop.
		 * If you want the auto-rotate speed to be independent of the frame rate (the refresh
		 * rate of the display), you must pass the time `deltaTime`, in seconds, to `update()`.
		 *
		 * @type {boolean}
		 * @default false
		 */this.autoRotate=false;
/**
		 * How fast to rotate around the target if `autoRotate` is `true`. The default  equates to 30 seconds
		 * per orbit at 60fps.
		 *
		 * Note that if `autoRotate` is enabled, you must call `update()` in your animation loop.
		 *
		 * @type {number}
		 * @default 2
		 */this.autoRotateSpeed=2;
/**
		 * This object contains references to the keycodes for controlling camera panning.
		 *
		 * ```js
		 * controls.keys = {
		 * 	LEFT: 'ArrowLeft', //left arrow
		 * 	UP: 'ArrowUp', // up arrow
		 * 	RIGHT: 'ArrowRight', // right arrow
		 * 	BOTTOM: 'ArrowDown' // down arrow
		 * }
		 * ```
		 * @type {Object}
		 */this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"};
/**
		 * This object contains references to the mouse actions used by the controls.
		 *
		 * ```js
		 * controls.mouseButtons = {
		 * 	LEFT: THREE.MOUSE.ROTATE,
		 * 	MIDDLE: THREE.MOUSE.DOLLY,
		 * 	RIGHT: THREE.MOUSE.PAN
		 * }
		 * ```
		 * @type {Object}
		 */this.mouseButtons={LEFT:n.ROTATE,MIDDLE:n.DOLLY,RIGHT:n.PAN};
/**
		 * This object contains references to the touch actions used by the controls.
		 *
		 * ```js
		 * controls.mouseButtons = {
		 * 	ONE: THREE.TOUCH.ROTATE,
		 * 	TWO: THREE.TOUCH.DOLLY_PAN
		 * }
		 * ```
		 * @type {Object}
		 */this.touches={ONE:a.ROTATE,TWO:a.DOLLY_PAN};
/**
		 * Used internally by `saveState()` and `reset()`.
		 *
		 * @type {Vector3}
		 */this.target0=this.target.clone();
/**
		 * Used internally by `saveState()` and `reset()`.
		 *
		 * @type {Vector3}
		 */this.position0=this.object.position.clone();
/**
		 * Used internally by `saveState()` and `reset()`.
		 *
		 * @type {number}
		 */this.zoom0=this.object.zoom;this._domElementKeyEvents=null;this._lastPosition=new i;this._lastQuaternion=new h;this._lastTargetPosition=new i;this._quat=(new h).setFromUnitVectors(t.up,new i(0,1,0));this._quatInverse=this._quat.clone().invert();this._spherical=new r;this._sphericalDelta=new r;this._scale=1;this._panOffset=new i;this._rotateStart=new l;this._rotateEnd=new l;this._rotateDelta=new l;this._panStart=new l;this._panEnd=new l;this._panDelta=new l;this._dollyStart=new l;this._dollyEnd=new l;this._dollyDelta=new l;this._dollyDirection=new i;this._mouse=new l;this._performCursorZoom=false;this._pointers=[];this._pointerPositions={};this._controlActive=false;this._onPointerMove=P.bind(this);this._onPointerDown=E.bind(this);this._onPointerUp=D.bind(this);this._onContextMenu=R.bind(this);this._onMouseWheel=M.bind(this);this._onKeyDown=S.bind(this);this._onTouchStart=O.bind(this);this._onTouchMove=w.bind(this);this._onMouseDown=T.bind(this);this._onMouseMove=v.bind(this);this._interceptControlDown=j.bind(this);this._interceptControlUp=A.bind(this);this.domElement!==null&&this.connect(this.domElement);this.update()}connect(t){super.connect(t);this.domElement.addEventListener("pointerdown",this._onPointerDown);this.domElement.addEventListener("pointercancel",this._onPointerUp);this.domElement.addEventListener("contextmenu",this._onContextMenu);this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:false});const e=this.domElement.getRootNode();e.addEventListener("keydown",this._interceptControlDown,{passive:true,capture:true});this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown);this.domElement.removeEventListener("pointermove",this._onPointerMove);this.domElement.removeEventListener("pointerup",this._onPointerUp);this.domElement.removeEventListener("pointercancel",this._onPointerUp);this.domElement.removeEventListener("wheel",this._onMouseWheel);this.domElement.removeEventListener("contextmenu",this._onContextMenu);this.stopListenToKeyEvents();const t=this.domElement.getRootNode();t.removeEventListener("keydown",this._interceptControlDown,{capture:true});this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}
/**
	 * Adds key event listeners to the given DOM element.
	 * `window` is a recommended argument for using this method.
	 *
	 * @param {HTMLDOMElement} domElement - The DOM element
	 */listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown);this._domElementKeyEvents=t}stopListenToKeyEvents(){if(this._domElementKeyEvents!==null){this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown);this._domElementKeyEvents=null}}saveState(){this.target0.copy(this.target);this.position0.copy(this.object.position);this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0);this.object.position.copy(this.position0);this.object.zoom=this.zoom0;this.object.updateProjectionMatrix();this.dispatchEvent(c);this.update();this.state=f.NONE}update(t=null){const e=this.object.position;b.copy(e).sub(this.target);b.applyQuaternion(this._quat);this._spherical.setFromVector3(b);this.autoRotate&&this.state===f.NONE&&this._rotateLeft(this._getAutoRotationAngle(t));if(this.enableDamping){this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor;this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor}else{this._spherical.theta+=this._sphericalDelta.theta;this._spherical.phi+=this._sphericalDelta.phi}let s=this.minAzimuthAngle;let o=this.maxAzimuthAngle;if(isFinite(s)&&isFinite(o)){s<-Math.PI?s+=y:s>Math.PI&&(s-=y);o<-Math.PI?o+=y:o>Math.PI&&(o-=y);this._spherical.theta=s<=o?Math.max(s,Math.min(o,this._spherical.theta)):this._spherical.theta>(s+o)/2?Math.max(s,this._spherical.theta):Math.min(o,this._spherical.theta)}this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi));this._spherical.makeSafe();this.enableDamping===true?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset);this.target.sub(this.cursor);this.target.clampLength(this.minTargetRadius,this.maxTargetRadius);this.target.add(this.cursor);let n=false;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const t=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale);n=t!=this._spherical.radius}b.setFromSpherical(this._spherical);b.applyQuaternion(this._quatInverse);e.copy(this.target).add(b);this.object.lookAt(this.target);if(this.enableDamping===true){this._sphericalDelta.theta*=1-this.dampingFactor;this._sphericalDelta.phi*=1-this.dampingFactor;this._panOffset.multiplyScalar(1-this.dampingFactor)}else{this._sphericalDelta.set(0,0,0);this._panOffset.set(0,0,0)}if(this.zoomToCursor&&this._performCursorZoom){let t=null;if(this.object.isPerspectiveCamera){const e=b.length();t=this._clampDistance(e*this._scale);const s=e-t;this.object.position.addScaledVector(this._dollyDirection,s);this.object.updateMatrixWorld();n=!!s}else if(this.object.isOrthographicCamera){const e=new i(this._mouse.x,this._mouse.y,0);e.unproject(this.object);const s=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale));this.object.updateProjectionMatrix();n=s!==this.object.zoom;const o=new i(this._mouse.x,this._mouse.y,0);o.unproject(this.object);this.object.position.sub(o).add(e);this.object.updateMatrixWorld();t=b.length()}else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled.");this.zoomToCursor=false}if(t!==null)if(this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(t).add(this.object.position);else{d.origin.copy(this.object.position);d.direction.set(0,0,-1).transformDirection(this.object.matrix);if(Math.abs(this.object.up.dot(d.direction))<m)this.object.lookAt(this.target);else{u.setFromNormalAndCoplanarPoint(this.object.up,this.target);d.intersectPlane(u,this.target)}}}else if(this.object.isOrthographicCamera){const t=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale));if(t!==this.object.zoom){this.object.updateProjectionMatrix();n=true}}this._scale=1;this._performCursorZoom=false;if(n||this._lastPosition.distanceToSquared(this.object.position)>g||8*(1-this._lastQuaternion.dot(this.object.quaternion))>g||this._lastTargetPosition.distanceToSquared(this.target)>g){this.dispatchEvent(c);this._lastPosition.copy(this.object.position);this._lastQuaternion.copy(this.object.quaternion);this._lastTargetPosition.copy(this.target);return true}return false}_getAutoRotationAngle(t){return t!==null?y/60*this.autoRotateSpeed*t:y/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){b.setFromMatrixColumn(e,0);b.multiplyScalar(-t);this._panOffset.add(b)}_panUp(t,e){if(this.screenSpacePanning===true)b.setFromMatrixColumn(e,1);else{b.setFromMatrixColumn(e,0);b.crossVectors(this.object.up,b)}b.multiplyScalar(t);this._panOffset.add(b)}_pan(t,e){const s=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;b.copy(i).sub(this.target);let o=b.length();o*=Math.tan(this.object.fov/2*Math.PI/180);this._panLeft(2*t*o/s.clientHeight,this.object.matrix);this._panUp(2*e*o/s.clientHeight,this.object.matrix)}else if(this.object.isOrthographicCamera){this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix);this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)}else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");this.enablePan=false}}_dollyOut(t){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale/=t;else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");this.enableZoom=false}}_dollyIn(t){if(this.object.isPerspectiveCamera||this.object.isOrthographicCamera)this._scale*=t;else{console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");this.enableZoom=false}}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=true;const s=this.domElement.getBoundingClientRect();const i=t-s.left;const o=e-s.top;const n=s.width;const a=s.height;this._mouse.x=i/n*2-1;this._mouse.y=-o/a*2+1;this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX);this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY);this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(y*this._rotateDelta.x/e.clientHeight);this._rotateUp(y*this._rotateDelta.y/e.clientHeight);this._rotateStart.copy(this._rotateEnd);this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY);this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart);this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y));this._dollyStart.copy(this._dollyEnd);this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY);this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed);this._pan(this._panDelta.x,this._panDelta.y);this._panStart.copy(this._panEnd);this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY);t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY));this.update()}_handleKeyDown(t){let e=false;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed);e=true;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed);e=true;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0);e=true;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-y*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0);e=true;break}if(e){t.preventDefault();this.update()}}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t);const s=.5*(t.pageX+e.x);const i=.5*(t.pageY+e.y);this._rotateStart.set(s,i)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t);const s=.5*(t.pageX+e.x);const i=.5*(t.pageY+e.y);this._panStart.set(s,i)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t);const s=t.pageX-e.x;const i=t.pageY-e.y;const o=Math.sqrt(s*s+i*i);this._dollyStart.set(0,o)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t);this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t);this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t);const s=.5*(t.pageX+e.x);const i=.5*(t.pageY+e.y);this._rotateEnd.set(s,i)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(y*this._rotateDelta.x/e.clientHeight);this._rotateUp(y*this._rotateDelta.y/e.clientHeight);this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t);const s=.5*(t.pageX+e.x);const i=.5*(t.pageY+e.y);this._panEnd.set(s,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed);this._pan(this._panDelta.x,this._panDelta.y);this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t);const s=t.pageX-e.x;const i=t.pageY-e.y;const o=Math.sqrt(s*s+i*i);this._dollyEnd.set(0,o);this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed));this._dollyOut(this._dollyDelta.y);this._dollyStart.copy(this._dollyEnd);const n=(t.pageX+e.x)*.5;const a=(t.pageY+e.y)*.5;this._updateZoomParameters(n,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t);this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t);this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return true;return false}_trackPointer(t){let e=this._pointerPositions[t.pointerId];if(e===void 0){e=new l;this._pointerPositions[t.pointerId]=e}e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode;const s={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}t.ctrlKey&&!this._controlActive&&(s.deltaY*=10);return s}}function E(t){if(this.enabled!==false){if(this._pointers.length===0){this.domElement.setPointerCapture(t.pointerId);this.domElement.addEventListener("pointermove",this._onPointerMove);this.domElement.addEventListener("pointerup",this._onPointerUp)}if(!this._isTrackingPointer(t)){this._addPointer(t);t.pointerType==="touch"?this._onTouchStart(t):this._onMouseDown(t)}}}function P(t){this.enabled!==false&&(t.pointerType==="touch"?this._onTouchMove(t):this._onMouseMove(t))}function D(t){this._removePointer(t);switch(this._pointers.length){case 0:this.domElement.releasePointerCapture(t.pointerId);this.domElement.removeEventListener("pointermove",this._onPointerMove);this.domElement.removeEventListener("pointerup",this._onPointerUp);this.dispatchEvent(_);this.state=f.NONE;break;case 1:const e=this._pointers[0];const s=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:s.x,pageY:s.y});break}}function T(t){let e;switch(t.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case n.DOLLY:if(this.enableZoom===false)return;this._handleMouseDownDolly(t);this.state=f.DOLLY;break;case n.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enablePan===false)return;this._handleMouseDownPan(t);this.state=f.PAN}else{if(this.enableRotate===false)return;this._handleMouseDownRotate(t);this.state=f.ROTATE}break;case n.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(this.enableRotate===false)return;this._handleMouseDownRotate(t);this.state=f.ROTATE}else{if(this.enablePan===false)return;this._handleMouseDownPan(t);this.state=f.PAN}break;default:this.state=f.NONE}this.state!==f.NONE&&this.dispatchEvent(p)}function v(t){switch(this.state){case f.ROTATE:if(this.enableRotate===false)return;this._handleMouseMoveRotate(t);break;case f.DOLLY:if(this.enableZoom===false)return;this._handleMouseMoveDolly(t);break;case f.PAN:if(this.enablePan===false)return;this._handleMouseMovePan(t);break}}function M(t){if(this.enabled!==false&&this.enableZoom!==false&&this.state===f.NONE){t.preventDefault();this.dispatchEvent(p);this._handleMouseWheel(this._customWheelEvent(t));this.dispatchEvent(_)}}function S(t){this.enabled!==false&&this._handleKeyDown(t)}function O(t){this._trackPointer(t);switch(this._pointers.length){case 1:switch(this.touches.ONE){case a.ROTATE:if(this.enableRotate===false)return;this._handleTouchStartRotate(t);this.state=f.TOUCH_ROTATE;break;case a.PAN:if(this.enablePan===false)return;this._handleTouchStartPan(t);this.state=f.TOUCH_PAN;break;default:this.state=f.NONE}break;case 2:switch(this.touches.TWO){case a.DOLLY_PAN:if(this.enableZoom===false&&this.enablePan===false)return;this._handleTouchStartDollyPan(t);this.state=f.TOUCH_DOLLY_PAN;break;case a.DOLLY_ROTATE:if(this.enableZoom===false&&this.enableRotate===false)return;this._handleTouchStartDollyRotate(t);this.state=f.TOUCH_DOLLY_ROTATE;break;default:this.state=f.NONE}break;default:this.state=f.NONE}this.state!==f.NONE&&this.dispatchEvent(p)}function w(t){this._trackPointer(t);switch(this.state){case f.TOUCH_ROTATE:if(this.enableRotate===false)return;this._handleTouchMoveRotate(t);this.update();break;case f.TOUCH_PAN:if(this.enablePan===false)return;this._handleTouchMovePan(t);this.update();break;case f.TOUCH_DOLLY_PAN:if(this.enableZoom===false&&this.enablePan===false)return;this._handleTouchMoveDollyPan(t);this.update();break;case f.TOUCH_DOLLY_ROTATE:if(this.enableZoom===false&&this.enableRotate===false)return;this._handleTouchMoveDollyRotate(t);this.update();break;default:this.state=f.NONE}}function R(t){this.enabled!==false&&t.preventDefault()}function j(t){if(t.key==="Control"){this._controlActive=true;const t=this.domElement.getRootNode();t.addEventListener("keyup",this._interceptControlUp,{passive:true,capture:true})}}function A(t){if(t.key==="Control"){this._controlActive=false;const t=this.domElement.getRootNode();t.removeEventListener("keyup",this._interceptControlUp,{passive:true,capture:true})}}export{OrbitControls};

