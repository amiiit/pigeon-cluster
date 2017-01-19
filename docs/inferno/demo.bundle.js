webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _infact = __webpack_require__(2);
	
	var _demo = __webpack_require__(7);
	
	var _demo2 = _interopRequireDefault(_demo);
	
	__webpack_require__(29);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createVNode = _infact.Inferno.createVNode;
	
	
	_infact.ReactDOM.render(createVNode(16, _demo2.default), document.getElementById('root'));

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// // infact = inferno + react
	
	if (true) {
	    exports.Inferno = __webpack_require__(3);
	    exports.ReactDOM = exports.Inferno;
	    exports.Component = __webpack_require__(5);
	    exports.PropTypes = {};
	}
	if (false) {
	    exports.React = require('react');
	    exports.ReactDOM = require('react-dom');
	    exports.Component = exports.React.Component;
	    exports.PropTypes = exports.React.PropTypes;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno v1.0.0-beta42
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.Inferno = global.Inferno || {})));
	}(this, (function (exports) { 'use strict';
	
	var NO_OP = '$NO_OP';
	var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
	var isBrowser = typeof window !== 'undefined' && window.document;
	
	// this is MUCH faster than .constructor === Array and instanceof Array
	// in Node 7 and the later versions of V8, slower in older versions though
	var isArray = Array.isArray;
	function isStatefulComponent(o) {
	    return !isUndefined(o.prototype) && !isUndefined(o.prototype.render);
	}
	function isStringOrNumber(obj) {
	    return isString(obj) || isNumber(obj);
	}
	function isNullOrUndef(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	function isInvalid(obj) {
	    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	}
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	function isAttrAnEvent(attr) {
	    return attr[0] === 'o' && attr[1] === 'n' && attr.length > 3;
	}
	function isString(obj) {
	    return typeof obj === 'string';
	}
	function isNumber(obj) {
	    return typeof obj === 'number';
	}
	function isNull(obj) {
	    return obj === null;
	}
	function isTrue(obj) {
	    return obj === true;
	}
	function isUndefined(obj) {
	    return obj === undefined;
	}
	function isObject(o) {
	    return typeof o === 'object';
	}
	function throwError(message) {
	    if (!message) {
	        message = ERROR_MSG;
	    }
	    throw new Error(("Inferno Error: " + message));
	}
	function warning(condition, message) {
	    if (!condition) {
	        console.error(message);
	    }
	}
	var EMPTY_OBJ = {};
	
	function applyKeyIfMissing(index, vNode) {
	    if (isNull(vNode.key)) {
	        vNode.key = "." + index;
	    }
	    return vNode;
	}
	function _normalizeVNodes(nodes, result, i) {
	    for (; i < nodes.length; i++) {
	        var n = nodes[i];
	        if (!isInvalid(n)) {
	            if (Array.isArray(n)) {
	                _normalizeVNodes(n, result, 0);
	            }
	            else {
	                if (isStringOrNumber(n)) {
	                    n = createTextVNode(n);
	                }
	                else if (isVNode(n) && n.dom) {
	                    n = cloneVNode(n);
	                }
	                result.push((applyKeyIfMissing(i, n)));
	            }
	        }
	    }
	}
	function normalizeVNodes(nodes) {
	    var newNodes;
	    // we assign $ which basically means we've flagged this array for future note
	    // if it comes back again, we need to clone it, as people are using it
	    // in an immutable way
	    // tslint:disable
	    if (nodes['$']) {
	        nodes = nodes.slice();
	    }
	    else {
	        nodes['$'] = true;
	    }
	    // tslint:enable
	    for (var i = 0; i < nodes.length; i++) {
	        var n = nodes[i];
	        if (isInvalid(n) || Array.isArray(n)) {
	            var result = (newNodes || nodes).slice(0, i);
	            _normalizeVNodes(nodes, result, i);
	            return result;
	        }
	        else if (isStringOrNumber(n)) {
	            if (!newNodes) {
	                newNodes = nodes.slice(0, i);
	            }
	            newNodes.push(applyKeyIfMissing(i, createTextVNode(n)));
	        }
	        else if ((isVNode(n) && n.dom) || (isNull(n.key) && !(n.flags & 64 /* HasNonKeyedChildren */))) {
	            if (!newNodes) {
	                newNodes = nodes.slice(0, i);
	            }
	            newNodes.push(applyKeyIfMissing(i, cloneVNode(n)));
	        }
	        else if (newNodes) {
	            newNodes.push(applyKeyIfMissing(i, cloneVNode(n)));
	        }
	    }
	    return newNodes || nodes;
	}
	function normalizeChildren(children) {
	    if (isArray(children)) {
	        return normalizeVNodes(children);
	    }
	    else if (isVNode(children) && children.dom) {
	        return cloneVNode(children);
	    }
	    return children;
	}
	function normalizeProps(vNode, props, children) {
	    if (!(vNode.flags & 28 /* Component */) && isNullOrUndef(children) && !isNullOrUndef(props.children)) {
	        vNode.children = props.children;
	    }
	    if (props.ref) {
	        vNode.ref = props.ref;
	    }
	    if (props.events) {
	        vNode.events = props.events;
	    }
	    if (!isNullOrUndef(props.key)) {
	        vNode.key = props.key;
	    }
	}
	function copyPropsTo(copyFrom, copyTo) {
	    for (var prop in copyFrom) {
	        if (isUndefined(copyTo[prop])) {
	            copyTo[prop] = copyFrom[prop];
	        }
	    }
	}
	function normalizeElement(type, vNode) {
	    if (type === 'svg') {
	        vNode.flags = 128 /* SvgElement */;
	    }
	    else if (type === 'input') {
	        vNode.flags = 512 /* InputElement */;
	    }
	    else if (type === 'select') {
	        vNode.flags = 2048 /* SelectElement */;
	    }
	    else if (type === 'textarea') {
	        vNode.flags = 1024 /* TextareaElement */;
	    }
	    else if (type === 'media') {
	        vNode.flags = 256 /* MediaElement */;
	    }
	    else {
	        vNode.flags = 2 /* HtmlElement */;
	    }
	}
	function normalize(vNode) {
	    var props = vNode.props;
	    var type = vNode.type;
	    var children = vNode.children;
	    // convert a wrongly created type back to element
	    if (isString(type) && (vNode.flags & 28 /* Component */)) {
	        normalizeElement(type, vNode);
	        if (props.children) {
	            vNode.children = props.children;
	            children = props.children;
	        }
	    }
	    if (props) {
	        normalizeProps(vNode, props, children);
	    }
	    if (!isInvalid(children)) {
	        vNode.children = normalizeChildren(children);
	    }
	    if (props && !isInvalid(props.children)) {
	        props.children = normalizeChildren(props.children);
	    }
	}
	
	var options = {
	    recyclingEnabled: true,
	    findDOMNodeEnabled: false,
	    roots: null,
	    createVNode: null,
	    beforeRender: null,
	    afterRender: null,
	    afterMount: null,
	    afterUpdate: null,
	    beforeUnmount: null
	};
	
	function createVNode(flags, type, props, children, events, key, ref, noNormalise) {
	    if (flags & 16 /* ComponentUnknown */) {
	        flags = isStatefulComponent(type) ? 4 /* ComponentClass */ : 8 /* ComponentFunction */;
	    }
	    var vNode = {
	        children: isUndefined(children) ? null : children,
	        dom: null,
	        events: events || null,
	        flags: flags || 0,
	        key: key === undefined ? null : key,
	        props: props || null,
	        ref: ref || null,
	        type: type
	    };
	    if (!noNormalise) {
	        normalize(vNode);
	    }
	    if (options.createVNode) {
	        options.createVNode(vNode);
	    }
	    return vNode;
	}
	function cloneVNode(vNodeToClone, props) {
	    var _children = [], len = arguments.length - 2;
	    while ( len-- > 0 ) _children[ len ] = arguments[ len + 2 ];
	
	    var children = _children;
	    if (_children.length > 0 && !isNull(_children[0])) {
	        if (!props) {
	            props = {};
	        }
	        if (_children.length === 1) {
	            children = _children[0];
	        }
	        if (isUndefined(props.children)) {
	            props.children = children;
	        }
	        else {
	            if (isArray(children)) {
	                if (isArray(props.children)) {
	                    props.children = props.children.concat(children);
	                }
	                else {
	                    props.children = [props.children].concat(children);
	                }
	            }
	            else {
	                if (isArray(props.children)) {
	                    props.children.push(children);
	                }
	                else {
	                    props.children = [props.children];
	                    props.children.push(children);
	                }
	            }
	        }
	    }
	    children = null;
	    var flags = vNodeToClone.flags;
	    var events = vNodeToClone.events || (props && props.events) || null;
	    var newVNode;
	    if (isArray(vNodeToClone)) {
	        newVNode = vNodeToClone.map(function (vNode) { return cloneVNode(vNode); });
	    }
	    else if (isNullOrUndef(props) && isNullOrUndef(children)) {
	        newVNode = Object.assign({}, vNodeToClone);
	    }
	    else {
	        var key = !isNullOrUndef(vNodeToClone.key) ? vNodeToClone.key : props.key;
	        var ref = vNodeToClone.ref || props.ref;
	        if (flags & 28 /* Component */) {
	            newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), null, events, key, ref, true);
	        }
	        else if (flags & 3970 /* Element */) {
	            children = (props && props.children) || vNodeToClone.children;
	            newVNode = createVNode(flags, vNodeToClone.type, Object.assign({}, vNodeToClone.props, props), children, events, key, ref, !children);
	        }
	    }
	    if (flags & 28 /* Component */) {
	        var newProps = newVNode.props;
	        if (newProps) {
	            var newChildren = newProps.children;
	            // we need to also clone component children that are in props
	            // as the children may also have been hoisted
	            if (newChildren) {
	                if (isArray(newChildren)) {
	                    for (var i = 0; i < newChildren.length; i++) {
	                        var child = newChildren[i];
	                        if (!isInvalid(child) && isVNode(child)) {
	                            newProps.children[i] = cloneVNode(child);
	                        }
	                    }
	                }
	                else if (isVNode(newChildren)) {
	                    newProps.children = cloneVNode(newChildren);
	                }
	            }
	        }
	        newVNode.children = null;
	    }
	    newVNode.dom = null;
	    return newVNode;
	}
	function createVoidVNode() {
	    return createVNode(4096 /* Void */);
	}
	function createTextVNode(text) {
	    return createVNode(1 /* Text */, null, null, text);
	}
	function isVNode(o) {
	    return !!o.flags;
	}
	
	var Lifecycle = function Lifecycle() {
	    this.listeners = [];
	    this.fastUnmount = true;
	};
	Lifecycle.prototype.addListener = function addListener (callback) {
	    this.listeners.push(callback);
	};
	Lifecycle.prototype.trigger = function trigger () {
	        var this$1 = this;
	
	    for (var i = 0; i < this.listeners.length; i++) {
	        this$1.listeners[i]();
	    }
	};
	
	function constructDefaults(string, object, value) {
	    /* eslint no-return-assign: 0 */
	    string.split(',').forEach(function (i) { return object[i] = value; });
	}
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xmlNS = 'http://www.w3.org/XML/1998/namespace';
	var svgNS = 'http://www.w3.org/2000/svg';
	var strictProps = {};
	var booleanProps = {};
	var namespaces = {};
	var isUnitlessNumber = {};
	var skipProps = {};
	var dehyphenProps = {
	    httpEquiv: 'http-equiv',
	    acceptCharset: 'accept-charset'
	};
	var probablyKebabProps = /^(accentH|arabicF|capH|font[FSVW]|glyph[NO]|horiz[AO]|panose1|renderingI|strikethrough[PT]|underline[PT]|v[AHIM]|vert[AO]|xH|alignmentB|baselineS|clip[PR]|color[IPR]|dominantB|enableB|fill[OR]|flood[COF]|imageR|letterS|lightingC|marker[EMS]|pointerE|shapeR|stop[CO]|stroke[DLMOW]|text[ADR]|unicodeB|wordS|writingM).*/;
	function kebabize(str, smallLetter, largeLetter) {
	    return (smallLetter + "-" + (largeLetter.toLowerCase()));
	}
	var delegatedProps = {};
	constructDefaults('xlink:href,xlink:arcrole,xlink:actuate,xlink:role,xlink:titlef,xlink:type', namespaces, xlinkNS);
	constructDefaults('xml:base,xml:lang,xml:space', namespaces, xmlNS);
	constructDefaults('volume,defaultValue,defaultChecked', strictProps, true);
	constructDefaults('children,ref,key,selected,checked,value,multiple', skipProps, true);
	constructDefaults('onClick,onMouseDown,onMouseUp,onMouseMove,onSubmit,onDblClick,onKeyDown,onKeyUp,onKeyPress', delegatedProps, true);
	constructDefaults('muted,scoped,loop,open,checked,default,capture,disabled,readOnly,required,autoplay,controls,seamless,reversed,allowfullscreen,novalidate', booleanProps, true);
	constructDefaults('animationIterationCount,borderImageOutset,borderImageSlice,borderImageWidth,boxFlex,boxFlexGroup,boxOrdinalGroup,columnCount,flex,flexGrow,flexPositive,flexShrink,flexNegative,flexOrder,gridRow,gridColumn,fontWeight,lineClamp,lineHeight,opacity,order,orphans,tabSize,widows,zIndex,zoom,fillOpacity,floodOpacity,stopOpacity,strokeDasharray,strokeDashoffset,strokeMiterlimit,strokeOpacity,strokeWidth,', isUnitlessNumber, true);
	
	var delegatedEvents = new Map();
	function handleEvent(name, lastEvent, nextEvent, dom) {
	    var delegatedRoots = delegatedEvents.get(name);
	    if (nextEvent) {
	        if (!delegatedRoots) {
	            delegatedRoots = { items: new Map(), count: 0, docEvent: null };
	            var docEvent = attachEventToDocument(name, delegatedRoots);
	            delegatedRoots.docEvent = docEvent;
	            delegatedEvents.set(name, delegatedRoots);
	        }
	        if (!lastEvent) {
	            delegatedRoots.count++;
	        }
	        delegatedRoots.items.set(dom, nextEvent);
	    }
	    else if (delegatedRoots) {
	        if (delegatedRoots.items.has(dom)) {
	            delegatedRoots.count--;
	            delegatedRoots.items.delete(dom);
	            if (delegatedRoots.count === 0) {
	                document.removeEventListener(normalizeEventName(name), delegatedRoots.docEvent);
	                delegatedEvents.delete(name);
	            }
	        }
	    }
	}
	function dispatchEvent(event, dom, items, count, eventData) {
	    var eventsToTrigger = items.get(dom);
	    if (eventsToTrigger) {
	        count--;
	        // linkEvent object
	        eventData.dom = dom;
	        if (eventsToTrigger.event) {
	            eventsToTrigger.event(eventsToTrigger.data, event);
	        }
	        else {
	            eventsToTrigger(event);
	        }
	        if (eventData.stopPropagation) {
	            return;
	        }
	    }
	    var parentDom = dom.parentNode;
	    if (count > 0 && (parentDom || parentDom === document.body)) {
	        dispatchEvent(event, parentDom, items, count, eventData);
	    }
	}
	function normalizeEventName(name) {
	    return name.substr(2).toLowerCase();
	}
	function attachEventToDocument(name, delegatedRoots) {
	    var docEvent = function (event) {
	        var eventData = {
	            stopPropagation: false,
	            dom: document
	        };
	        // we have to do this as some browsers recycle the same Event between calls
	        // so we need to make the property configurable
	        Object.defineProperty(event, 'currentTarget', {
	            configurable: true,
	            get: function get() {
	                return eventData.dom;
	            }
	        });
	        event.stopPropagation = function () {
	            eventData.stopPropagation = true;
	        };
	        var count = delegatedRoots.count;
	        if (count > 0) {
	            dispatchEvent(event, event.target, delegatedRoots.items, count, eventData);
	        }
	    };
	    document.addEventListener(normalizeEventName(name), docEvent);
	    return docEvent;
	}
	
	function isCheckedType(type) {
	    return type === 'checkbox' || type === 'radio';
	}
	function isControlled(props) {
	    var usesChecked = isCheckedType(props.type);
	    return usesChecked ? !isNullOrUndef(props.checked) : !isNullOrUndef(props.value);
	}
	function onTextInputChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onInput) {
	        var event = events.onInput;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.oninput) {
	        events.oninput(e);
	    }
	    // the user may have updated the vNode from the above onInput events
	    // so we need to get it from the context of `this` again
	    applyValue(this.vNode, dom);
	}
	function wrappedOnChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var event = events.onChange;
	    if (event.event) {
	        event.event(event.data, e);
	    }
	    else {
	        event(e);
	    }
	}
	function onCheckboxChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onClick) {
	        var event = events.onClick;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.onclick) {
	        events.onclick(e);
	    }
	    // the user may have updated the vNode from the above onClick events
	    // so we need to get it from the context of `this` again
	    applyValue(this.vNode, dom);
	}
	function handleAssociatedRadioInputs(name) {
	    var inputs = document.querySelectorAll(("input[type=\"radio\"][name=\"" + name + "\"]"));
	    [].forEach.call(inputs, function (dom) {
	        var inputWrapper = wrappers.get(dom);
	        if (inputWrapper) {
	            var props = inputWrapper.vNode.props;
	            if (props) {
	                dom.checked = inputWrapper.vNode.props.checked;
	            }
	        }
	    });
	}
	function processInput(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    applyValue(vNode, dom);
	    if (isControlled(props)) {
	        var inputWrapper = wrappers.get(dom);
	        if (!inputWrapper) {
	            inputWrapper = {
	                vNode: vNode
	            };
	            if (isCheckedType(props.type)) {
	                dom.onclick = onCheckboxChange.bind(inputWrapper);
	                dom.onclick.wrapped = true;
	            }
	            else {
	                dom.oninput = onTextInputChange.bind(inputWrapper);
	                dom.oninput.wrapped = true;
	            }
	            if (props.onChange) {
	                dom.onchange = wrappedOnChange.bind(inputWrapper);
	                dom.onchange.wrapped = true;
	            }
	            wrappers.set(dom, inputWrapper);
	        }
	        inputWrapper.vNode = vNode;
	    }
	}
	function applyValue(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    var type = props.type;
	    var value = props.value;
	    var checked = props.checked;
	    var multiple = props.multiple;
	    if (type && type !== dom.type) {
	        dom.type = type;
	    }
	    if (multiple && multiple !== dom.multiple) {
	        dom.multiple = multiple;
	    }
	    if (isCheckedType(type)) {
	        if (!isNullOrUndef(value)) {
	            dom.value = value;
	        }
	        dom.checked = checked;
	        if (type === 'radio' && props.name) {
	            handleAssociatedRadioInputs(props.name);
	        }
	    }
	    else {
	        if (!isNullOrUndef(value) && dom.value !== value) {
	            dom.value = value;
	        }
	        else if (!isNullOrUndef(checked)) {
	            dom.checked = checked;
	        }
	    }
	}
	
	function isControlled$1(props) {
	    return !isNullOrUndef(props.value);
	}
	function updateChildOption(vNode, value) {
	    var props = vNode.props || EMPTY_OBJ;
	    var dom = vNode.dom;
	    // we do this as multiple may have changed
	    dom.value = props.value;
	    if ((isArray(value) && value.indexOf(props.value) !== -1) || props.value === value) {
	        dom.selected = true;
	    }
	    else {
	        dom.selected = props.selected || false;
	    }
	}
	function onSelectChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onChange) {
	        var event = events.onChange;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.onchange) {
	        events.onchange(e);
	    }
	    // the user may have updated the vNode from the above onChange events
	    // so we need to get it from the context of `this` again
	    applyValue$1(this.vNode, dom);
	}
	function processSelect(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    applyValue$1(vNode, dom);
	    if (isControlled$1(props)) {
	        var selectWrapper = wrappers.get(dom);
	        if (!selectWrapper) {
	            selectWrapper = {
	                vNode: vNode
	            };
	            dom.onchange = onSelectChange.bind(selectWrapper);
	            dom.onchange.wrapped = true;
	            wrappers.set(dom, selectWrapper);
	        }
	        selectWrapper.vNode = vNode;
	    }
	}
	function applyValue$1(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    if (props.multiple !== dom.multiple) {
	        dom.multiple = props.multiple;
	    }
	    var children = vNode.children;
	    var value = props.value;
	    if (isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	            updateChildOption(children[i], value);
	        }
	    }
	    else if (isVNode(children)) {
	        updateChildOption(children, value);
	    }
	}
	
	function isControlled$2(props) {
	    return !isNullOrUndef(props.value);
	}
	function onTextareaInputChange(e) {
	    var vNode = this.vNode;
	    var events = vNode.events || EMPTY_OBJ;
	    var dom = vNode.dom;
	    if (events.onInput) {
	        var event = events.onInput;
	        if (event.event) {
	            event.event(event.data, e);
	        }
	        else {
	            event(e);
	        }
	    }
	    else if (events.oninput) {
	        events.oninput(e);
	    }
	    // the user may have updated the vNode from the above onInput events
	    // so we need to get it from the context of `this` again
	    applyValue$2(this.vNode, dom);
	}
	function processTextarea(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    applyValue$2(vNode, dom);
	    var textareaWrapper = wrappers.get(dom);
	    if (isControlled$2(props)) {
	        if (!textareaWrapper) {
	            textareaWrapper = {
	                vNode: vNode
	            };
	            dom.oninput = onTextareaInputChange.bind(textareaWrapper);
	            dom.oninput.wrapped = true;
	            wrappers.set(dom, textareaWrapper);
	        }
	        textareaWrapper.vNode = vNode;
	    }
	}
	function applyValue$2(vNode, dom) {
	    var props = vNode.props || EMPTY_OBJ;
	    var value = props.value;
	    if (dom.value !== value) {
	        if (!isNullOrUndef(value)) {
	            dom.value = value;
	        }
	    }
	}
	
	var wrappers = new Map();
	function processElement(flags, vNode, dom) {
	    if (flags & 512 /* InputElement */) {
	        processInput(vNode, dom);
	    }
	    else if (flags & 2048 /* SelectElement */) {
	        processSelect(vNode, dom);
	    }
	    else if (flags & 1024 /* TextareaElement */) {
	        processTextarea(vNode, dom);
	    }
	}
	
	function unmount(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling) {
	    var flags = vNode.flags;
	    if (flags & 28 /* Component */) {
	        unmountComponent(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling);
	    }
	    else if (flags & 3970 /* Element */) {
	        unmountElement(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling);
	    }
	    else if (flags & (1 /* Text */ | 4096 /* Void */)) {
	        unmountVoidOrText(vNode, parentDom);
	    }
	}
	function unmountVoidOrText(vNode, parentDom) {
	    if (parentDom) {
	        removeChild(parentDom, vNode.dom);
	    }
	}
	function unmountComponent(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling) {
	    var instance = vNode.children;
	    var flags = vNode.flags;
	    var isStatefulComponent$$1 = flags & 4;
	    var ref = vNode.ref;
	    var dom = vNode.dom;
	    if (!isRecycling) {
	        if (isStatefulComponent$$1) {
	            instance._ignoreSetState = true;
	            options.beforeUnmount && options.beforeUnmount(vNode);
	            instance.componentWillUnmount && instance.componentWillUnmount();
	            if (ref && !isRecycling) {
	                ref(null);
	            }
	            instance._unmounted = true;
	            options.findDOMNodeEnabled && componentToDOMNodeMap.delete(instance);
	        }
	        else if (!isNullOrUndef(ref)) {
	            if (!isNullOrUndef(ref.onComponentWillUnmount)) {
	                ref.onComponentWillUnmount(dom);
	            }
	        }
	        if (!shallowUnmount) {
	            if (isStatefulComponent$$1) {
	                var subLifecycle = instance._lifecycle;
	                if (!subLifecycle.fastUnmount) {
	                    unmount(instance._lastInput, null, subLifecycle, false, shallowUnmount, isRecycling);
	                }
	            }
	            else {
	                if (!lifecycle.fastUnmount) {
	                    unmount(instance, null, lifecycle, false, shallowUnmount, isRecycling);
	                }
	            }
	        }
	    }
	    if (parentDom) {
	        var lastInput = instance._lastInput;
	        if (isNullOrUndef(lastInput)) {
	            lastInput = instance;
	        }
	        removeChild(parentDom, dom);
	    }
	    if (options.recyclingEnabled && !isStatefulComponent$$1 && (parentDom || canRecycle)) {
	        poolComponent(vNode);
	    }
	}
	function unmountElement(vNode, parentDom, lifecycle, canRecycle, shallowUnmount, isRecycling) {
	    var dom = vNode.dom;
	    var ref = vNode.ref;
	    var events = vNode.events;
	    if (!shallowUnmount && !lifecycle.fastUnmount) {
	        if (ref && !isRecycling) {
	            unmountRef(ref);
	        }
	        var children = vNode.children;
	        if (!isNullOrUndef(children)) {
	            unmountChildren$1(children, lifecycle, shallowUnmount, isRecycling);
	        }
	    }
	    if (!isNull(events)) {
	        for (var name in events) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchEvent(name, events[name], null, dom, lifecycle);
	            events[name] = null;
	        }
	    }
	    if (parentDom) {
	        removeChild(parentDom, dom);
	    }
	    if (options.recyclingEnabled && (parentDom || canRecycle)) {
	        poolElement(vNode);
	    }
	}
	function unmountChildren$1(children, lifecycle, shallowUnmount, isRecycling) {
	    if (isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            if (!isInvalid(child) && isObject(child)) {
	                unmount(child, null, lifecycle, false, shallowUnmount, isRecycling);
	            }
	        }
	    }
	    else if (isObject(children)) {
	        unmount(children, null, lifecycle, false, shallowUnmount, isRecycling);
	    }
	}
	function unmountRef(ref) {
	    if (isFunction(ref)) {
	        ref(null);
	    }
	    else {
	        if (isInvalid(ref)) {
	            return;
	        }
	        if (false) {
	            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	        }
	        throwError();
	    }
	}
	
	function patch(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	    if (lastVNode !== nextVNode) {
	        var lastFlags = lastVNode.flags;
	        var nextFlags = nextVNode.flags;
	        if (nextFlags & 28 /* Component */) {
	            if (lastFlags & 28 /* Component */) {
	                patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */, isRecycling);
	            }
	            else {
	                replaceVNode(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextFlags & 4 /* ComponentClass */), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else if (nextFlags & 3970 /* Element */) {
	            if (lastFlags & 3970 /* Element */) {
	                patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	            }
	            else {
	                replaceVNode(parentDom, mountElement(nextVNode, null, lifecycle, context, isSVG), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else if (nextFlags & 1 /* Text */) {
	            if (lastFlags & 1 /* Text */) {
	                patchText(lastVNode, nextVNode);
	            }
	            else {
	                replaceVNode(parentDom, mountText(nextVNode, null), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else if (nextFlags & 4096 /* Void */) {
	            if (lastFlags & 4096 /* Void */) {
	                patchVoid(lastVNode, nextVNode);
	            }
	            else {
	                replaceVNode(parentDom, mountVoid(nextVNode, null), lastVNode, lifecycle, isRecycling);
	            }
	        }
	        else {
	            // Error case: mount new one replacing old one
	            replaceLastChildAndUnmount(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	        }
	    }
	}
	function unmountChildren(children, dom, lifecycle, isRecycling) {
	    if (isVNode(children)) {
	        unmount(children, dom, lifecycle, true, false, isRecycling);
	    }
	    else if (isArray(children)) {
	        removeAllChildren(dom, children, lifecycle, false, isRecycling);
	    }
	    else {
	        dom.textContent = '';
	    }
	}
	function patchElement(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	    var nextTag = nextVNode.type;
	    var lastTag = lastVNode.type;
	    if (lastTag !== nextTag) {
	        replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	    }
	    else {
	        var dom = lastVNode.dom;
	        var lastProps = lastVNode.props;
	        var nextProps = nextVNode.props;
	        var lastChildren = lastVNode.children;
	        var nextChildren = nextVNode.children;
	        var lastFlags = lastVNode.flags;
	        var nextFlags = nextVNode.flags;
	        var lastRef = lastVNode.ref;
	        var nextRef = nextVNode.ref;
	        var lastEvents = lastVNode.events;
	        var nextEvents = nextVNode.events;
	        nextVNode.dom = dom;
	        if (isSVG || (nextFlags & 128 /* SvgElement */)) {
	            isSVG = true;
	        }
	        if (lastChildren !== nextChildren) {
	            patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        if (!(nextFlags & 2 /* HtmlElement */)) {
	            processElement(nextFlags, nextVNode, dom);
	        }
	        if (lastProps !== nextProps) {
	            patchProps(lastProps, nextProps, dom, lifecycle, context, isSVG);
	        }
	        if (lastEvents !== nextEvents) {
	            patchEvents(lastEvents, nextEvents, dom, lifecycle);
	        }
	        if (nextRef) {
	            if (lastRef !== nextRef || isRecycling) {
	                mountRef(dom, nextRef, lifecycle);
	            }
	        }
	    }
	}
	function patchChildren(lastFlags, nextFlags, lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
	    var patchArray = false;
	    var patchKeyed = false;
	    if (nextFlags & 64 /* HasNonKeyedChildren */) {
	        patchArray = true;
	    }
	    else if ((lastFlags & 32 /* HasKeyedChildren */) && (nextFlags & 32 /* HasKeyedChildren */)) {
	        patchKeyed = true;
	        patchArray = true;
	    }
	    else if (isInvalid(nextChildren)) {
	        unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	    }
	    else if (isInvalid(lastChildren)) {
	        if (isStringOrNumber(nextChildren)) {
	            setTextContent(dom, nextChildren);
	        }
	        else {
	            if (isArray(nextChildren)) {
	                mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
	            }
	            else {
	                mount(nextChildren, dom, lifecycle, context, isSVG);
	            }
	        }
	    }
	    else if (isStringOrNumber(nextChildren)) {
	        if (isStringOrNumber(lastChildren)) {
	            updateTextContent(dom, nextChildren);
	        }
	        else {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	            setTextContent(dom, nextChildren);
	        }
	    }
	    else if (isArray(nextChildren)) {
	        if (isArray(lastChildren)) {
	            patchArray = true;
	            if (isKeyed(lastChildren, nextChildren)) {
	                patchKeyed = true;
	            }
	        }
	        else {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	            mountArrayChildren(nextChildren, dom, lifecycle, context, isSVG);
	        }
	    }
	    else if (isArray(lastChildren)) {
	        removeAllChildren(dom, lastChildren, lifecycle, false, isRecycling);
	        mount(nextChildren, dom, lifecycle, context, isSVG);
	    }
	    else if (isVNode(nextChildren)) {
	        if (isVNode(lastChildren)) {
	            patch(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        else {
	            unmountChildren(lastChildren, dom, lifecycle, isRecycling);
	            mount(nextChildren, dom, lifecycle, context, isSVG);
	        }
	    }
	    else if (isVNode(lastChildren)) {
	    }
	    else {
	    }
	    if (patchArray) {
	        if (patchKeyed) {
	            patchKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	        else {
	            patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling);
	        }
	    }
	}
	function patchComponent(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isClass, isRecycling) {
	    var lastType = lastVNode.type;
	    var nextType = nextVNode.type;
	    var nextProps = nextVNode.props || EMPTY_OBJ;
	    var lastKey = lastVNode.key;
	    var nextKey = nextVNode.key;
	    var defaultProps = nextType.defaultProps;
	    if (!isUndefined(defaultProps)) {
	        copyPropsTo(defaultProps, nextProps);
	        nextVNode.props = nextProps;
	    }
	    if (lastType !== nextType) {
	        if (isClass) {
	            replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	        }
	        else {
	            var lastInput = lastVNode.children._lastInput || lastVNode.children;
	            var nextInput = createFunctionalComponentInput(nextVNode, nextType, nextProps, context);
	            patch(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling);
	            var dom = nextVNode.dom = nextInput.dom;
	            nextVNode.children = nextInput;
	            mountFunctionalComponentCallbacks(nextVNode.ref, dom, lifecycle);
	            unmount(lastVNode, null, lifecycle, false, true, isRecycling);
	        }
	    }
	    else {
	        if (isClass) {
	            if (lastKey !== nextKey) {
	                replaceWithNewNode(lastVNode, nextVNode, parentDom, lifecycle, context, isSVG, isRecycling);
	                return false;
	            }
	            var instance = lastVNode.children;
	            if (instance._unmounted) {
	                if (isNull(parentDom)) {
	                    return true;
	                }
	                replaceChild(parentDom, mountComponent(nextVNode, null, lifecycle, context, isSVG, nextVNode.flags & 4 /* ComponentClass */), lastVNode.dom);
	            }
	            else {
	                var lastState = instance.state;
	                var nextState = instance.state;
	                var lastProps = instance.props;
	                var childContext = instance.getChildContext();
	                nextVNode.children = instance;
	                instance._isSVG = isSVG;
	                if (!isNullOrUndef(childContext)) {
	                    childContext = Object.assign({}, context, childContext);
	                }
	                else {
	                    childContext = context;
	                }
	                var lastInput$1 = instance._lastInput;
	                var nextInput$1 = instance._updateComponent(lastState, nextState, lastProps, nextProps, context, false);
	                var didUpdate = true;
	                instance._childContext = childContext;
	                if (isInvalid(nextInput$1)) {
	                    nextInput$1 = createVoidVNode();
	                }
	                else if (nextInput$1 === NO_OP) {
	                    nextInput$1 = lastInput$1;
	                    didUpdate = false;
	                }
	                else if (isStringOrNumber(nextInput$1)) {
	                    nextInput$1 = createTextVNode(nextInput$1);
	                }
	                else if (isArray(nextInput$1)) {
	                    if (false) {
	                        throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                    }
	                    throwError();
	                }
	                else if (isObject(nextInput$1) && nextInput$1.dom) {
	                    nextInput$1 = cloneVNode(nextInput$1);
	                }
	                if (nextInput$1.flags & 28 /* Component */) {
	                    nextInput$1.parentVNode = nextVNode;
	                }
	                else if (lastInput$1.flags & 28 /* Component */) {
	                    lastInput$1.parentVNode = nextVNode;
	                }
	                instance._lastInput = nextInput$1;
	                instance._vNode = nextVNode;
	                if (didUpdate) {
	                    var fastUnmount = lifecycle.fastUnmount;
	                    var subLifecycle = instance._lifecycle;
	                    lifecycle.fastUnmount = subLifecycle.fastUnmount;
	                    patch(lastInput$1, nextInput$1, parentDom, lifecycle, childContext, isSVG, isRecycling);
	                    subLifecycle.fastUnmount = lifecycle.fastUnmount;
	                    lifecycle.fastUnmount = fastUnmount;
	                    instance.componentDidUpdate(lastProps, lastState);
	                    options.afterUpdate && options.afterUpdate(nextVNode);
	                    options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, nextInput$1.dom);
	                }
	                nextVNode.dom = nextInput$1.dom;
	            }
	        }
	        else {
	            var shouldUpdate = true;
	            var lastProps$1 = lastVNode.props;
	            var nextHooks = nextVNode.ref;
	            var nextHooksDefined = !isNullOrUndef(nextHooks);
	            var lastInput$2 = lastVNode.children;
	            var nextInput$2 = lastInput$2;
	            nextVNode.dom = lastVNode.dom;
	            nextVNode.children = lastInput$2;
	            if (lastKey !== nextKey) {
	                shouldUpdate = true;
	            }
	            else {
	                if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentShouldUpdate)) {
	                    shouldUpdate = nextHooks.onComponentShouldUpdate(lastProps$1, nextProps);
	                }
	            }
	            if (shouldUpdate !== false) {
	                if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentWillUpdate)) {
	                    nextHooks.onComponentWillUpdate(lastProps$1, nextProps);
	                }
	                nextInput$2 = nextType(nextProps, context);
	                if (isInvalid(nextInput$2)) {
	                    nextInput$2 = createVoidVNode();
	                }
	                else if (isStringOrNumber(nextInput$2) && nextInput$2 !== NO_OP) {
	                    nextInput$2 = createTextVNode(nextInput$2);
	                }
	                else if (isArray(nextInput$2)) {
	                    if (false) {
	                        throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	                    }
	                    throwError();
	                }
	                else if (isObject(nextInput$2) && nextInput$2.dom) {
	                    nextInput$2 = cloneVNode(nextInput$2);
	                }
	                if (nextInput$2 !== NO_OP) {
	                    patch(lastInput$2, nextInput$2, parentDom, lifecycle, context, isSVG, isRecycling);
	                    nextVNode.children = nextInput$2;
	                    if (nextHooksDefined && !isNullOrUndef(nextHooks.onComponentDidUpdate)) {
	                        nextHooks.onComponentDidUpdate(lastProps$1, nextProps);
	                    }
	                    nextVNode.dom = nextInput$2.dom;
	                }
	            }
	            if (nextInput$2.flags & 28 /* Component */) {
	                nextInput$2.parentVNode = nextVNode;
	            }
	            else if (lastInput$2.flags & 28 /* Component */) {
	                lastInput$2.parentVNode = nextVNode;
	            }
	        }
	    }
	    return false;
	}
	function patchText(lastVNode, nextVNode) {
	    var nextText = nextVNode.children;
	    var dom = lastVNode.dom;
	    nextVNode.dom = dom;
	    if (lastVNode.children !== nextText) {
	        dom.nodeValue = nextText;
	    }
	}
	function patchVoid(lastVNode, nextVNode) {
	    nextVNode.dom = lastVNode.dom;
	}
	function patchNonKeyedChildren(lastChildren, nextChildren, dom, lifecycle, context, isSVG, isRecycling) {
	    var lastChildrenLength = lastChildren.length;
	    var nextChildrenLength = nextChildren.length;
	    var commonLength = lastChildrenLength > nextChildrenLength ? nextChildrenLength : lastChildrenLength;
	    var i = 0;
	    for (; i < commonLength; i++) {
	        var nextChild = nextChildren[i];
	        if (nextChild.dom) {
	            nextChild = nextChildren[i] = cloneVNode(nextChild);
	        }
	        patch(lastChildren[i], nextChild, dom, lifecycle, context, isSVG, isRecycling);
	    }
	    if (lastChildrenLength < nextChildrenLength) {
	        for (i = commonLength; i < nextChildrenLength; i++) {
	            var nextChild$1 = nextChildren[i];
	            if (nextChild$1.dom) {
	                nextChild$1 = nextChildren[i] = cloneVNode(nextChild$1);
	            }
	            appendChild(dom, mount(nextChild$1, null, lifecycle, context, isSVG));
	        }
	    }
	    else if (nextChildrenLength === 0) {
	        removeAllChildren(dom, lastChildren, lifecycle, false, isRecycling);
	    }
	    else if (lastChildrenLength > nextChildrenLength) {
	        for (i = commonLength; i < lastChildrenLength; i++) {
	            unmount(lastChildren[i], dom, lifecycle, false, false, isRecycling);
	        }
	    }
	}
	function patchKeyedChildren(a, b, dom, lifecycle, context, isSVG, isRecycling) {
	    var aLength = a.length;
	    var bLength = b.length;
	    var aEnd = aLength - 1;
	    var bEnd = bLength - 1;
	    var aStart = 0;
	    var bStart = 0;
	    var i;
	    var j;
	    var aNode;
	    var bNode;
	    var nextNode;
	    var nextPos;
	    var node;
	    if (aLength === 0) {
	        if (bLength !== 0) {
	            mountArrayChildren(b, dom, lifecycle, context, isSVG);
	        }
	        return;
	    }
	    else if (bLength === 0) {
	        removeAllChildren(dom, a, lifecycle, false, isRecycling);
	        return;
	    }
	    var aStartNode = a[aStart];
	    var bStartNode = b[bStart];
	    var aEndNode = a[aEnd];
	    var bEndNode = b[bEnd];
	    if (bStartNode.dom) {
	        b[bStart] = bStartNode = cloneVNode(bStartNode);
	    }
	    if (bEndNode.dom) {
	        b[bEnd] = bEndNode = cloneVNode(bEndNode);
	    }
	    // Step 1
	    /* eslint no-constant-condition: 0 */
	    outer: while (true) {
	        // Sync nodes with the same key at the beginning.
	        while (aStartNode.key === bStartNode.key) {
	            patch(aStartNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
	            aStart++;
	            bStart++;
	            if (aStart > aEnd || bStart > bEnd) {
	                break outer;
	            }
	            aStartNode = a[aStart];
	            bStartNode = b[bStart];
	            if (bStartNode.dom) {
	                b[bStart] = bStartNode = cloneVNode(bStartNode);
	            }
	        }
	        // Sync nodes with the same key at the end.
	        while (aEndNode.key === bEndNode.key) {
	            patch(aEndNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
	            aEnd--;
	            bEnd--;
	            if (aStart > aEnd || bStart > bEnd) {
	                break outer;
	            }
	            aEndNode = a[aEnd];
	            bEndNode = b[bEnd];
	            if (bEndNode.dom) {
	                b[bEnd] = bEndNode = cloneVNode(bEndNode);
	            }
	        }
	        // Move and sync nodes from right to left.
	        if (aEndNode.key === bStartNode.key) {
	            patch(aEndNode, bStartNode, dom, lifecycle, context, isSVG, isRecycling);
	            insertOrAppend(dom, bStartNode.dom, aStartNode.dom);
	            aEnd--;
	            bStart++;
	            aEndNode = a[aEnd];
	            bStartNode = b[bStart];
	            if (bStartNode.dom) {
	                b[bStart] = bStartNode = cloneVNode(bStartNode);
	            }
	            continue;
	        }
	        // Move and sync nodes from left to right.
	        if (aStartNode.key === bEndNode.key) {
	            patch(aStartNode, bEndNode, dom, lifecycle, context, isSVG, isRecycling);
	            nextPos = bEnd + 1;
	            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	            insertOrAppend(dom, bEndNode.dom, nextNode);
	            aStart++;
	            bEnd--;
	            aStartNode = a[aStart];
	            bEndNode = b[bEnd];
	            if (bEndNode.dom) {
	                b[bEnd] = bEndNode = cloneVNode(bEndNode);
	            }
	            continue;
	        }
	        break;
	    }
	    if (aStart > aEnd) {
	        if (bStart <= bEnd) {
	            nextPos = bEnd + 1;
	            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	            while (bStart <= bEnd) {
	                node = b[bStart];
	                if (node.dom) {
	                    b[bStart] = node = cloneVNode(node);
	                }
	                bStart++;
	                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
	            }
	        }
	    }
	    else if (bStart > bEnd) {
	        while (aStart <= aEnd) {
	            unmount(a[aStart++], dom, lifecycle, false, false, isRecycling);
	        }
	    }
	    else {
	        aLength = aEnd - aStart + 1;
	        bLength = bEnd - bStart + 1;
	        var aNullable = a;
	        var sources = new Array(bLength);
	        // Mark all nodes as inserted.
	        for (i = 0; i < bLength; i++) {
	            sources[i] = -1;
	        }
	        var moved = false;
	        var pos = 0;
	        var patched = 0;
	        if ((bLength <= 4) || (aLength * bLength <= 16)) {
	            for (i = aStart; i <= aEnd; i++) {
	                aNode = a[i];
	                if (patched < bLength) {
	                    for (j = bStart; j <= bEnd; j++) {
	                        bNode = b[j];
	                        if (aNode.key === bNode.key) {
	                            sources[j - bStart] = i;
	                            if (pos > j) {
	                                moved = true;
	                            }
	                            else {
	                                pos = j;
	                            }
	                            if (bNode.dom) {
	                                b[j] = bNode = cloneVNode(bNode);
	                            }
	                            patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
	                            patched++;
	                            aNullable[i] = null;
	                            break;
	                        }
	                    }
	                }
	            }
	        }
	        else {
	            var keyIndex = new Map();
	            for (i = bStart; i <= bEnd; i++) {
	                node = b[i];
	                keyIndex.set(node.key, i);
	            }
	            for (i = aStart; i <= aEnd; i++) {
	                aNode = a[i];
	                if (patched < bLength) {
	                    j = keyIndex.get(aNode.key);
	                    if (!isUndefined(j)) {
	                        bNode = b[j];
	                        sources[j - bStart] = i;
	                        if (pos > j) {
	                            moved = true;
	                        }
	                        else {
	                            pos = j;
	                        }
	                        if (bNode.dom) {
	                            b[j] = bNode = cloneVNode(bNode);
	                        }
	                        patch(aNode, bNode, dom, lifecycle, context, isSVG, isRecycling);
	                        patched++;
	                        aNullable[i] = null;
	                    }
	                }
	            }
	        }
	        if (aLength === a.length && patched === 0) {
	            removeAllChildren(dom, a, lifecycle, false, isRecycling);
	            while (bStart < bLength) {
	                node = b[bStart];
	                if (node.dom) {
	                    b[bStart] = node = cloneVNode(node);
	                }
	                bStart++;
	                insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), null);
	            }
	        }
	        else {
	            i = aLength - patched;
	            while (i > 0) {
	                aNode = aNullable[aStart++];
	                if (!isNull(aNode)) {
	                    unmount(aNode, dom, lifecycle, false, false, isRecycling);
	                    i--;
	                }
	            }
	            if (moved) {
	                var seq = lis_algorithm(sources);
	                j = seq.length - 1;
	                for (i = bLength - 1; i >= 0; i--) {
	                    if (sources[i] === -1) {
	                        pos = i + bStart;
	                        node = b[pos];
	                        if (node.dom) {
	                            b[pos] = node = cloneVNode(node);
	                        }
	                        nextPos = pos + 1;
	                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                        insertOrAppend(dom, mount(node, dom, lifecycle, context, isSVG), nextNode);
	                    }
	                    else {
	                        if (j < 0 || i !== seq[j]) {
	                            pos = i + bStart;
	                            node = b[pos];
	                            nextPos = pos + 1;
	                            nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                            insertOrAppend(dom, node.dom, nextNode);
	                        }
	                        else {
	                            j--;
	                        }
	                    }
	                }
	            }
	            else if (patched !== bLength) {
	                for (i = bLength - 1; i >= 0; i--) {
	                    if (sources[i] === -1) {
	                        pos = i + bStart;
	                        node = b[pos];
	                        if (node.dom) {
	                            b[pos] = node = cloneVNode(node);
	                        }
	                        nextPos = pos + 1;
	                        nextNode = nextPos < b.length ? b[nextPos].dom : null;
	                        insertOrAppend(dom, mount(node, null, lifecycle, context, isSVG), nextNode);
	                    }
	                }
	            }
	        }
	    }
	}
	// // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
	function lis_algorithm(a) {
	    var p = a.slice(0);
	    var result = [];
	    result.push(0);
	    var i;
	    var j;
	    var u;
	    var v;
	    var c;
	    for (i = 0; i < a.length; i++) {
	        if (a[i] === -1) {
	            continue;
	        }
	        j = result[result.length - 1];
	        if (a[j] < a[i]) {
	            p[i] = j;
	            result.push(i);
	            continue;
	        }
	        u = 0;
	        v = result.length - 1;
	        while (u < v) {
	            c = ((u + v) / 2) | 0;
	            if (a[result[c]] < a[i]) {
	                u = c + 1;
	            }
	            else {
	                v = c;
	            }
	        }
	        if (a[i] < a[result[u]]) {
	            if (u > 0) {
	                p[i] = result[u - 1];
	            }
	            result[u] = i;
	        }
	    }
	    u = result.length;
	    v = result[u - 1];
	    while (u-- > 0) {
	        result[u] = v;
	        v = p[v];
	    }
	    return result;
	}
	function patchProp(prop, lastValue, nextValue, dom, isSVG, lifecycle) {
	    if (skipProps[prop]) {
	        return;
	    }
	    if (booleanProps[prop]) {
	        dom[prop] = nextValue ? true : false;
	    }
	    else if (strictProps[prop]) {
	        var value = isNullOrUndef(nextValue) ? '' : nextValue;
	        if (dom[prop] !== value) {
	            dom[prop] = value;
	        }
	    }
	    else if (lastValue !== nextValue) {
	        if (isAttrAnEvent(prop)) {
	            patchEvent(prop, lastValue, nextValue, dom, lifecycle);
	        }
	        else if (isNullOrUndef(nextValue)) {
	            dom.removeAttribute(prop);
	        }
	        else if (prop === 'className') {
	            if (isSVG) {
	                dom.setAttribute('class', nextValue);
	            }
	            else {
	                dom.className = nextValue;
	            }
	        }
	        else if (prop === 'style') {
	            patchStyle(lastValue, nextValue, dom);
	        }
	        else if (prop === 'dangerouslySetInnerHTML') {
	            var lastHtml = lastValue && lastValue.__html;
	            var nextHtml = nextValue && nextValue.__html;
	            if (lastHtml !== nextHtml) {
	                if (!isNullOrUndef(nextHtml)) {
	                    dom.innerHTML = nextHtml;
	                }
	            }
	        }
	        else if (prop !== 'childrenType' && prop !== 'ref' && prop !== 'key') {
	            var dehyphenProp;
	            if (dehyphenProps[prop]) {
	                dehyphenProp = dehyphenProps[prop];
	            }
	            else if (isSVG && prop.match(probablyKebabProps)) {
	                dehyphenProp = prop.replace(/([a-z])([A-Z]|1)/g, kebabize);
	                dehyphenProps[prop] = dehyphenProp;
	            }
	            else {
	                dehyphenProp = prop;
	            }
	            var ns = namespaces[prop];
	            if (ns) {
	                dom.setAttributeNS(ns, dehyphenProp, nextValue);
	            }
	            else {
	                dom.setAttribute(dehyphenProp, nextValue);
	            }
	        }
	    }
	}
	function patchEvents(lastEvents, nextEvents, dom, lifecycle) {
	    lastEvents = lastEvents || EMPTY_OBJ;
	    nextEvents = nextEvents || EMPTY_OBJ;
	    if (nextEvents !== EMPTY_OBJ) {
	        for (var name in nextEvents) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchEvent(name, lastEvents[name], nextEvents[name], dom, lifecycle);
	        }
	    }
	    if (lastEvents !== EMPTY_OBJ) {
	        for (var name$1 in lastEvents) {
	            // do not add a hasOwnProperty check here, it affects performance
	            if (isNullOrUndef(nextEvents[name$1])) {
	                patchEvent(name$1, lastEvents[name$1], null, dom, lifecycle);
	            }
	        }
	    }
	}
	function patchEvent(name, lastValue, nextValue, dom, lifecycle) {
	    if (lastValue !== nextValue) {
	        var nameLowerCase = name.toLowerCase();
	        var domEvent = dom[nameLowerCase];
	        // if the function is wrapped, that means it's been controlled by a wrapper
	        if (domEvent && domEvent.wrapped) {
	            return;
	        }
	        if (delegatedProps[name]) {
	            handleEvent(name, lastValue, nextValue, dom);
	        }
	        else {
	            if (!isFunction(nextValue) && !isNullOrUndef(nextValue)) {
	                if (false) {
	                    throwError(("an event on a VNode \"" + name + "\". was not a function. Did you try and apply an eventLink to an unsupported event?"));
	                }
	                throwError();
	            }
	            dom[nameLowerCase] = nextValue;
	        }
	    }
	}
	function patchProps(lastProps, nextProps, dom, lifecycle, context, isSVG) {
	    lastProps = lastProps || EMPTY_OBJ;
	    nextProps = nextProps || EMPTY_OBJ;
	    if (nextProps !== EMPTY_OBJ) {
	        for (var prop in nextProps) {
	            // do not add a hasOwnProperty check here, it affects performance
	            var nextValue = nextProps[prop];
	            var lastValue = lastProps[prop];
	            if (isNullOrUndef(nextValue)) {
	                removeProp(prop, nextValue, dom);
	            }
	            else {
	                patchProp(prop, lastValue, nextValue, dom, isSVG, lifecycle);
	            }
	        }
	    }
	    if (lastProps !== EMPTY_OBJ) {
	        for (var prop$1 in lastProps) {
	            // do not add a hasOwnProperty check here, it affects performance
	            if (isNullOrUndef(nextProps[prop$1])) {
	                removeProp(prop$1, lastProps[prop$1], dom);
	            }
	        }
	    }
	}
	// We are assuming here that we come from patchProp routine
	// -nextAttrValue cannot be null or undefined
	function patchStyle(lastAttrValue, nextAttrValue, dom) {
	    if (isString(nextAttrValue)) {
	        dom.style.cssText = nextAttrValue;
	        return;
	    }
	    for (var style in nextAttrValue) {
	        // do not add a hasOwnProperty check here, it affects performance
	        var value = nextAttrValue[style];
	        if (isNumber(value) && !isUnitlessNumber[style]) {
	            dom.style[style] = value + 'px';
	        }
	        else {
	            dom.style[style] = value;
	        }
	    }
	    if (!isNullOrUndef(lastAttrValue)) {
	        for (var style$1 in lastAttrValue) {
	            if (isNullOrUndef(nextAttrValue[style$1])) {
	                dom.style[style$1] = '';
	            }
	        }
	    }
	}
	function removeProp(prop, lastValue, dom) {
	    if (prop === 'className') {
	        dom.removeAttribute('class');
	    }
	    else if (prop === 'value') {
	        dom.value = '';
	    }
	    else if (prop === 'style') {
	        dom.removeAttribute('style');
	    }
	    else if (isAttrAnEvent(prop)) {
	        handleEvent(name, lastValue, null, dom);
	    }
	    else {
	        dom.removeAttribute(prop);
	    }
	}
	
	var componentPools = new Map();
	var elementPools = new Map();
	function recycleElement(vNode, lifecycle, context, isSVG) {
	    var tag = vNode.type;
	    var key = vNode.key;
	    var pools = elementPools.get(tag);
	    if (!isUndefined(pools)) {
	        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
	        if (!isUndefined(pool)) {
	            var recycledVNode = pool.pop();
	            if (!isUndefined(recycledVNode)) {
	                patchElement(recycledVNode, vNode, null, lifecycle, context, isSVG, true);
	                return vNode.dom;
	            }
	        }
	    }
	    return null;
	}
	function poolElement(vNode) {
	    var tag = vNode.type;
	    var key = vNode.key;
	    var pools = elementPools.get(tag);
	    if (isUndefined(pools)) {
	        pools = {
	            nonKeyed: [],
	            keyed: new Map()
	        };
	        elementPools.set(tag, pools);
	    }
	    if (isNull(key)) {
	        pools.nonKeyed.push(vNode);
	    }
	    else {
	        var pool = pools.keyed.get(key);
	        if (isUndefined(pool)) {
	            pool = [];
	            pools.keyed.set(key, pool);
	        }
	        pool.push(vNode);
	    }
	}
	function recycleComponent(vNode, lifecycle, context, isSVG) {
	    var type = vNode.type;
	    var key = vNode.key;
	    var pools = componentPools.get(type);
	    if (!isUndefined(pools)) {
	        var pool = key === null ? pools.nonKeyed : pools.keyed.get(key);
	        if (!isUndefined(pool)) {
	            var recycledVNode = pool.pop();
	            if (!isUndefined(recycledVNode)) {
	                var flags = vNode.flags;
	                var failed = patchComponent(recycledVNode, vNode, null, lifecycle, context, isSVG, flags & 4 /* ComponentClass */, true);
	                if (!failed) {
	                    return vNode.dom;
	                }
	            }
	        }
	    }
	    return null;
	}
	function poolComponent(vNode) {
	    var type = vNode.type;
	    var key = vNode.key;
	    var hooks = vNode.ref;
	    var nonRecycleHooks = hooks && (hooks.onComponentWillMount ||
	        hooks.onComponentWillUnmount ||
	        hooks.onComponentDidMount ||
	        hooks.onComponentWillUpdate ||
	        hooks.onComponentDidUpdate);
	    if (nonRecycleHooks) {
	        return;
	    }
	    var pools = componentPools.get(type);
	    if (isUndefined(pools)) {
	        pools = {
	            nonKeyed: [],
	            keyed: new Map()
	        };
	        componentPools.set(type, pools);
	    }
	    if (isNull(key)) {
	        pools.nonKeyed.push(vNode);
	    }
	    else {
	        var pool = pools.keyed.get(key);
	        if (isUndefined(pool)) {
	            pool = [];
	            pools.keyed.set(key, pool);
	        }
	        pool.push(vNode);
	    }
	}
	
	function mount(vNode, parentDom, lifecycle, context, isSVG) {
	    var flags = vNode.flags;
	    if (flags & 3970 /* Element */) {
	        return mountElement(vNode, parentDom, lifecycle, context, isSVG);
	    }
	    else if (flags & 28 /* Component */) {
	        return mountComponent(vNode, parentDom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
	    }
	    else if (flags & 4096 /* Void */) {
	        return mountVoid(vNode, parentDom);
	    }
	    else if (flags & 1 /* Text */) {
	        return mountText(vNode, parentDom);
	    }
	    else {
	        if (false) {
	            if (typeof vNode === 'object') {
	                throwError(("mount() received an object that's not a valid VNode, you should stringify it first. Object: \"" + (JSON.stringify(vNode)) + "\"."));
	            }
	            else {
	                throwError(("mount() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
	            }
	        }
	        throwError();
	    }
	}
	function mountText(vNode, parentDom) {
	    var dom = document.createTextNode(vNode.children);
	    vNode.dom = dom;
	    if (parentDom) {
	        appendChild(parentDom, dom);
	    }
	    return dom;
	}
	function mountVoid(vNode, parentDom) {
	    var dom = document.createTextNode('');
	    vNode.dom = dom;
	    if (parentDom) {
	        appendChild(parentDom, dom);
	    }
	    return dom;
	}
	function mountElement(vNode, parentDom, lifecycle, context, isSVG) {
	    if (options.recyclingEnabled) {
	        var dom$1 = recycleElement(vNode, lifecycle, context, isSVG);
	        if (!isNull(dom$1)) {
	            if (!isNull(parentDom)) {
	                appendChild(parentDom, dom$1);
	            }
	            return dom$1;
	        }
	    }
	    var tag = vNode.type;
	    var flags = vNode.flags;
	    if (isSVG || (flags & 128 /* SvgElement */)) {
	        isSVG = true;
	    }
	    var dom = documentCreateElement(tag, isSVG);
	    var children = vNode.children;
	    var props = vNode.props;
	    var events = vNode.events;
	    var ref = vNode.ref;
	    vNode.dom = dom;
	    if (!isNull(children)) {
	        if (isStringOrNumber(children)) {
	            setTextContent(dom, children);
	        }
	        else if (isArray(children)) {
	            mountArrayChildren(children, dom, lifecycle, context, isSVG);
	        }
	        else if (isVNode(children)) {
	            mount(children, dom, lifecycle, context, isSVG);
	        }
	    }
	    if (!(flags & 2 /* HtmlElement */)) {
	        processElement(flags, vNode, dom);
	    }
	    if (!isNull(props)) {
	        for (var prop in props) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchProp(prop, null, props[prop], dom, isSVG, lifecycle);
	        }
	    }
	    if (!isNull(events)) {
	        for (var name in events) {
	            // do not add a hasOwnProperty check here, it affects performance
	            patchEvent(name, null, events[name], dom, lifecycle);
	        }
	    }
	    if (!isNull(ref)) {
	        mountRef(dom, ref, lifecycle);
	    }
	    if (!isNull(parentDom)) {
	        appendChild(parentDom, dom);
	    }
	    return dom;
	}
	function mountArrayChildren(children, dom, lifecycle, context, isSVG) {
	    for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        if (!isInvalid(child)) {
	            if (child.dom) {
	                children[i] = child = cloneVNode(child);
	            }
	            mount(children[i], dom, lifecycle, context, isSVG);
	        }
	    }
	}
	function mountComponent(vNode, parentDom, lifecycle, context, isSVG, isClass) {
	    if (options.recyclingEnabled) {
	        var dom$1 = recycleComponent(vNode, lifecycle, context, isSVG);
	        if (!isNull(dom$1)) {
	            if (!isNull(parentDom)) {
	                appendChild(parentDom, dom$1);
	            }
	            return dom$1;
	        }
	    }
	    var type = vNode.type;
	    var props = vNode.props || EMPTY_OBJ;
	    var defaultProps = type.defaultProps;
	    var ref = vNode.ref;
	    var dom;
	    if (!isUndefined(defaultProps)) {
	        copyPropsTo(defaultProps, props);
	        vNode.props = props;
	    }
	    if (isClass) {
	        var instance = createClassComponentInstance(vNode, type, props, context, isSVG);
	        // If instance does not have componentWillUnmount specified we can enable fastUnmount
	        lifecycle.fastUnmount = isUndefined(instance.componentWillUnmount);
	        var input = instance._lastInput;
	        // we store the fastUnmount value, but we set it back to true on the lifecycle
	        // we do this so we can determine if the component render has a fastUnmount or not
	        instance._vNode = vNode;
	        vNode.dom = dom = mount(input, null, lifecycle, instance._childContext, isSVG);
	        // we now create a lifecycle for this component and store the fastUnmount value
	        var subLifecycle = instance._lifecycle = new Lifecycle();
	        subLifecycle.fastUnmount = lifecycle.fastUnmount;
	        if (!isNull(parentDom)) {
	            appendChild(parentDom, dom);
	        }
	        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
	        options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
	        vNode.children = instance;
	    }
	    else {
	        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
	        vNode.dom = dom = mount(input$1, null, lifecycle, context, isSVG);
	        vNode.children = input$1;
	        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
	        if (!isNull(parentDom)) {
	            appendChild(parentDom, dom);
	        }
	    }
	    return dom;
	}
	function mountClassComponentCallbacks(vNode, ref, instance, lifecycle) {
	    if (ref) {
	        if (isFunction(ref)) {
	            ref(instance);
	        }
	        else {
	            if (false) {
	                throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	            }
	            throwError();
	        }
	    }
	    var cDM = instance.componentDidMount;
	    var afterMount = options.afterMount;
	    if (!isUndefined(cDM) || !isNull(afterMount)) {
	        lifecycle.addListener(function () {
	            afterMount && afterMount(vNode);
	            cDM && instance.componentDidMount();
	        });
	    }
	}
	function mountFunctionalComponentCallbacks(ref, dom, lifecycle) {
	    if (ref) {
	        if (!isNullOrUndef(ref.onComponentWillMount)) {
	            ref.onComponentWillMount();
	        }
	        if (!isNullOrUndef(ref.onComponentDidMount)) {
	            lifecycle.addListener(function () { return ref.onComponentDidMount(dom); });
	        }
	        if (!isNullOrUndef(ref.onComponentWillUnmount)) {
	            lifecycle.fastUnmount = false;
	        }
	    }
	}
	function mountRef(dom, value, lifecycle) {
	    if (isFunction(value)) {
	        lifecycle.fastUnmount = false;
	        lifecycle.addListener(function () { return value(dom); });
	    }
	    else {
	        if (isInvalid(value)) {
	            return;
	        }
	        if (false) {
	            throwError('string "refs" are not supported in Inferno 1.0. Use callback "refs" instead.');
	        }
	        throwError();
	    }
	}
	
	function createClassComponentInstance(vNode, Component, props, context, isSVG) {
	    if (isUndefined(context)) {
	        context = {};
	    }
	    var instance = new Component(props, context);
	    instance.context = context;
	    if (instance.props === EMPTY_OBJ) {
	        instance.props = props;
	    }
	    instance._patch = patch;
	    if (options.findDOMNodeEnabled) {
	        instance._componentToDOMNodeMap = componentToDOMNodeMap;
	    }
	    var childContext = instance.getChildContext();
	    if (!isNullOrUndef(childContext)) {
	        instance._childContext = Object.assign({}, context, childContext);
	    }
	    else {
	        instance._childContext = context;
	    }
	    instance._unmounted = false;
	    instance._pendingSetState = true;
	    instance._isSVG = isSVG;
	    instance.componentWillMount();
	    options.beforeRender && options.beforeRender(instance);
	    var input = instance.render(props, instance.state, context);
	    options.afterRender && options.afterRender(instance);
	    if (isArray(input)) {
	        if (false) {
	            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	        }
	        throwError();
	    }
	    else if (isInvalid(input)) {
	        input = createVoidVNode();
	    }
	    else if (isStringOrNumber(input)) {
	        input = createTextVNode(input);
	    }
	    else {
	        if (input.dom) {
	            input = cloneVNode(input);
	        }
	        if (input.flags & 28 /* Component */) {
	            // if we have an input that is also a component, we run into a tricky situation
	            // where the root vNode needs to always have the correct DOM entry
	            // so we break monomorphism on our input and supply it our vNode as parentVNode
	            // we can optimise this in the future, but this gets us out of a lot of issues
	            input.parentVNode = vNode;
	        }
	    }
	    instance._pendingSetState = false;
	    instance._lastInput = input;
	    return instance;
	}
	function replaceLastChildAndUnmount(lastInput, nextInput, parentDom, lifecycle, context, isSVG, isRecycling) {
	    replaceVNode(parentDom, mount(nextInput, null, lifecycle, context, isSVG), lastInput, lifecycle, isRecycling);
	}
	function replaceVNode(parentDom, dom, vNode, lifecycle, isRecycling) {
	    var shallowUnmount = false;
	    // we cannot cache nodeType here as vNode might be re-assigned below
	    if (vNode.flags & 28 /* Component */) {
	        // if we are accessing a stateful or stateless component, we want to access their last rendered input
	        // accessing their DOM node is not useful to us here
	        unmount(vNode, null, lifecycle, false, false, isRecycling);
	        vNode = vNode.children._lastInput || vNode.children;
	        shallowUnmount = true;
	    }
	    replaceChild(parentDom, dom, vNode.dom);
	    unmount(vNode, null, lifecycle, false, shallowUnmount, isRecycling);
	}
	function createFunctionalComponentInput(vNode, component, props, context) {
	    var input = component(props, context);
	    if (isArray(input)) {
	        if (false) {
	            throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	        }
	        throwError();
	    }
	    else if (isInvalid(input)) {
	        input = createVoidVNode();
	    }
	    else if (isStringOrNumber(input)) {
	        input = createTextVNode(input);
	    }
	    else {
	        if (input.dom) {
	            input = cloneVNode(input);
	        }
	        if (input.flags & 28 /* Component */) {
	            // if we have an input that is also a component, we run into a tricky situation
	            // where the root vNode needs to always have the correct DOM entry
	            // so we break monomorphism on our input and supply it our vNode as parentVNode
	            // we can optimise this in the future, but this gets us out of a lot of issues
	            input.parentVNode = vNode;
	        }
	    }
	    return input;
	}
	function setTextContent(dom, text) {
	    if (text !== '') {
	        dom.textContent = text;
	    }
	    else {
	        dom.appendChild(document.createTextNode(''));
	    }
	}
	function updateTextContent(dom, text) {
	    dom.firstChild.nodeValue = text;
	}
	function appendChild(parentDom, dom) {
	    parentDom.appendChild(dom);
	}
	function insertOrAppend(parentDom, newNode, nextNode) {
	    if (isNullOrUndef(nextNode)) {
	        appendChild(parentDom, newNode);
	    }
	    else {
	        parentDom.insertBefore(newNode, nextNode);
	    }
	}
	function documentCreateElement(tag, isSVG) {
	    if (isSVG === true) {
	        return document.createElementNS(svgNS, tag);
	    }
	    else {
	        return document.createElement(tag);
	    }
	}
	function replaceWithNewNode(lastNode, nextNode, parentDom, lifecycle, context, isSVG, isRecycling) {
	    unmount(lastNode, null, lifecycle, false, false, isRecycling);
	    var dom = mount(nextNode, null, lifecycle, context, isSVG);
	    nextNode.dom = dom;
	    replaceChild(parentDom, dom, lastNode.dom);
	}
	function replaceChild(parentDom, nextDom, lastDom) {
	    if (!parentDom) {
	        parentDom = lastDom.parentNode;
	    }
	    parentDom.replaceChild(nextDom, lastDom);
	}
	function removeChild(parentDom, dom) {
	    parentDom.removeChild(dom);
	}
	function removeAllChildren(dom, children, lifecycle, shallowUnmount, isRecycling) {
	    dom.textContent = '';
	    if (!lifecycle.fastUnmount) {
	        removeChildren(null, children, lifecycle, shallowUnmount, isRecycling);
	    }
	}
	function removeChildren(dom, children, lifecycle, shallowUnmount, isRecycling) {
	    for (var i = 0; i < children.length; i++) {
	        var child = children[i];
	        if (!isInvalid(child)) {
	            unmount(child, dom, lifecycle, true, shallowUnmount, isRecycling);
	        }
	    }
	}
	function isKeyed(lastChildren, nextChildren) {
	    return nextChildren.length && !isNullOrUndef(nextChildren[0]) && !isNullOrUndef(nextChildren[0].key)
	        && lastChildren.length && !isNullOrUndef(lastChildren[0]) && !isNullOrUndef(lastChildren[0].key);
	}
	
	function normalizeChildNodes(dom) {
	    var rawChildNodes = dom.childNodes;
	    var length = rawChildNodes.length;
	    var i = 0;
	    while (i < length) {
	        var rawChild = rawChildNodes[i];
	        if (rawChild.nodeType === 8) {
	            if (rawChild.data === '!') {
	                var placeholder = document.createTextNode('');
	                dom.replaceChild(placeholder, rawChild);
	                i++;
	            }
	            else {
	                dom.removeChild(rawChild);
	                length--;
	            }
	        }
	        else {
	            i++;
	        }
	    }
	}
	function hydrateComponent(vNode, dom, lifecycle, context, isSVG, isClass) {
	    var type = vNode.type;
	    var props = vNode.props || EMPTY_OBJ;
	    var ref = vNode.ref;
	    vNode.dom = dom;
	    if (isClass) {
	        var _isSVG = dom.namespaceURI === svgNS;
	        var defaultProps = type.defaultProps;
	        if (!isUndefined(defaultProps)) {
	            copyPropsTo(defaultProps, props);
	            vNode.props = props;
	        }
	        var instance = createClassComponentInstance(vNode, type, props, context, _isSVG);
	        // If instance does not have componentWillUnmount specified we can enable fastUnmount
	        var fastUnmount = isUndefined(instance.componentWillUnmount);
	        var input = instance._lastInput;
	        // we store the fastUnmount value, but we set it back to true on the lifecycle
	        // we do this so we can determine if the component render has a fastUnmount or not
	        lifecycle.fastUnmount = true;
	        instance._vComponent = vNode;
	        instance._vNode = vNode;
	        hydrate(input, dom, lifecycle, instance._childContext, _isSVG);
	        var subLifecycle = instance._lifecycle = new Lifecycle();
	        subLifecycle.fastUnmount = lifecycle.fastUnmount;
	        // we then set the lifecycle fastUnmount value back to what it was before the mount
	        lifecycle.fastUnmount = fastUnmount;
	        mountClassComponentCallbacks(vNode, ref, instance, lifecycle);
	        options.findDOMNodeEnabled && componentToDOMNodeMap.set(instance, dom);
	        vNode.children = instance;
	    }
	    else {
	        var input$1 = createFunctionalComponentInput(vNode, type, props, context);
	        hydrate(input$1, dom, lifecycle, context, isSVG);
	        vNode.children = input$1;
	        vNode.dom = input$1.dom;
	        mountFunctionalComponentCallbacks(ref, dom, lifecycle);
	    }
	}
	function hydrateElement(vNode, dom, lifecycle, context, isSVG) {
	    var tag = vNode.type;
	    var children = vNode.children;
	    var props = vNode.props;
	    var events = vNode.events;
	    var flags = vNode.flags;
	    var ref = vNode.ref;
	    if (isSVG || (flags & 128 /* SvgElement */)) {
	        isSVG = true;
	    }
	    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== tag) {
	        var newDom = mountElement(vNode, null, lifecycle, context, isSVG);
	        vNode.dom = newDom;
	        replaceChild(dom.parentNode, newDom, dom);
	    }
	    else {
	        vNode.dom = dom;
	        if (children) {
	            hydrateChildren(children, dom, lifecycle, context, isSVG);
	        }
	        if (!(flags & 2 /* HtmlElement */)) {
	            processElement(flags, vNode, dom);
	        }
	        if (props) {
	            for (var prop in props) {
	                patchProp(prop, null, props[prop], dom, isSVG, lifecycle);
	            }
	        }
	        if (events) {
	            for (var name in events) {
	                patchEvent(name, null, events[name], dom, lifecycle);
	            }
	        }
	        if (ref) {
	            mountRef(dom, ref, lifecycle);
	        }
	    }
	}
	function hydrateChildren(children, dom, lifecycle, context, isSVG) {
	    normalizeChildNodes(dom);
	    var domNodes = Array.prototype.slice.call(dom.childNodes);
	    var childNodeIndex = 0;
	    if (isArray(children)) {
	        for (var i = 0; i < children.length; i++) {
	            var child = children[i];
	            if (isObject(child) && !isNull(child)) {
	                hydrate(child, domNodes[childNodeIndex++], lifecycle, context, isSVG);
	            }
	        }
	    }
	    else if (isObject(children)) {
	        hydrate(children, dom.firstChild, lifecycle, context, isSVG);
	    }
	}
	function hydrateText(vNode, dom) {
	    if (dom.nodeType === 3) {
	        var newDom = mountText(vNode, null);
	        vNode.dom = newDom;
	        replaceChild(dom.parentNode, newDom, dom);
	    }
	    else {
	        vNode.dom = dom;
	    }
	}
	function hydrateVoid(vNode, dom) {
	    vNode.dom = dom;
	}
	function hydrate(vNode, dom, lifecycle, context, isSVG) {
	    if (false) {
	        if (isInvalid(dom)) {
	            throwError("failed to hydrate. The server-side render doesn't match client side.");
	        }
	    }
	    var flags = vNode.flags;
	    if (flags & 28 /* Component */) {
	        return hydrateComponent(vNode, dom, lifecycle, context, isSVG, flags & 4 /* ComponentClass */);
	    }
	    else if (flags & 3970 /* Element */) {
	        return hydrateElement(vNode, dom, lifecycle, context, isSVG);
	    }
	    else if (flags & 1 /* Text */) {
	        return hydrateText(vNode, dom);
	    }
	    else if (flags & 4096 /* Void */) {
	        return hydrateVoid(vNode, dom);
	    }
	    else {
	        if (false) {
	            throwError(("hydrate() expects a valid VNode, instead it received an object with the type \"" + (typeof vNode) + "\"."));
	        }
	        throwError();
	    }
	}
	function hydrateRoot(input, parentDom, lifecycle) {
	    if (parentDom && parentDom.nodeType === 1 && parentDom.firstChild) {
	        hydrate(input, parentDom.firstChild, lifecycle, {}, false);
	        return true;
	    }
	    return false;
	}
	
	// rather than use a Map, like we did before, we can use an array here
	// given there shouldn't be THAT many roots on the page, the difference
	// in performance is huge: https://esbench.com/bench/5802a691330ab09900a1a2da
	var roots = [];
	var componentToDOMNodeMap = new Map();
	options.roots = roots;
	function findDOMNode(ref) {
	    if (!options.findDOMNodeEnabled) {
	        if (false) {
	            throwError('findDOMNode() has been disabled, use enableFindDOMNode() enabled findDOMNode(). Warning this can significantly impact performance!');
	        }
	        throwError();
	    }
	    var dom = ref && ref.nodeType ? ref : null;
	    return componentToDOMNodeMap.get(ref) || dom;
	}
	function getRoot(dom) {
	    for (var i = 0; i < roots.length; i++) {
	        var root = roots[i];
	        if (root.dom === dom) {
	            return root;
	        }
	    }
	    return null;
	}
	
	function setRoot(dom, input, lifecycle) {
	    var root = {
	        dom: dom,
	        input: input,
	        lifecycle: lifecycle
	    };
	    roots.push(root);
	    return root;
	}
	function removeRoot(root) {
	    for (var i = 0; i < roots.length; i++) {
	        if (roots[i] === root) {
	            roots.splice(i, 1);
	            return;
	        }
	    }
	}
	var documentBody = isBrowser ? document.body : null;
	function render(input, parentDom) {
	    if (documentBody === parentDom) {
	        if (false) {
	            throwError('you cannot render() to the "document.body". Use an empty element as a container instead.');
	        }
	        throwError();
	    }
	    if (input === NO_OP) {
	        return;
	    }
	    var root = getRoot(parentDom);
	    if (isNull(root)) {
	        var lifecycle = new Lifecycle();
	        if (!isInvalid(input)) {
	            if (input.dom) {
	                input = cloneVNode(input);
	            }
	            if (!hydrateRoot(input, parentDom, lifecycle)) {
	                mount(input, parentDom, lifecycle, {}, false);
	            }
	            root = setRoot(parentDom, input, lifecycle);
	            lifecycle.trigger();
	        }
	    }
	    else {
	        var lifecycle$1 = root.lifecycle;
	        lifecycle$1.listeners = [];
	        if (isNullOrUndef(input)) {
	            unmount(root.input, parentDom, lifecycle$1, false, false, false);
	            removeRoot(root);
	        }
	        else {
	            if (input.dom) {
	                input = cloneVNode(input);
	            }
	            patch(root.input, input, parentDom, lifecycle$1, {}, false, false);
	        }
	        lifecycle$1.trigger();
	        root.input = input;
	    }
	    if (root) {
	        var rootInput = root.input;
	        if (rootInput && (rootInput.flags & 28 /* Component */)) {
	            return rootInput.children;
	        }
	    }
	}
	function createRenderer(_parentDom) {
	    var parentDom = _parentDom || null;
	    return function renderer(lastInput, nextInput) {
	        if (!parentDom) {
	            parentDom = lastInput;
	        }
	        render(nextInput, parentDom);
	    };
	}
	
	function linkEvent(data, event) {
	    return { data: data, event: event };
	}
	
	if (isBrowser) {
		window.process = window.process || {};
		window.process.env = window.process.env || {
			NODE_ENV: 'development'
		};
	}
	
	if (false) {
		Object.freeze(EMPTY_OBJ);
		var testFunc = function testFn() {};
		warning(
			(testFunc.name || testFunc.toString()).indexOf('testFn') !== -1,
			'It looks like you\'re using a minified copy of the development build ' +
			'of Inferno. When deploying Inferno apps to production, make sure to use ' +
			'the production build which skips development warnings and is faster. ' +
			'See http://infernojs.org for more details.'
		);
	}
	
	// we duplicate it so it plays nicely with different module loading systems
	var index = {
		linkEvent: linkEvent,
		// core shapes
		createVNode: createVNode,
	
		// cloning
		cloneVNode: cloneVNode,
	
		// used to shared common items between Inferno libs
		NO_OP: NO_OP,
		EMPTY_OBJ: EMPTY_OBJ,
	
		// DOM
		render: render,
		findDOMNode: findDOMNode,
		createRenderer: createRenderer,
		options: options
	};
	
	exports['default'] = index;
	exports.linkEvent = linkEvent;
	exports.createVNode = createVNode;
	exports.cloneVNode = cloneVNode;
	exports.NO_OP = NO_OP;
	exports.EMPTY_OBJ = EMPTY_OBJ;
	exports.render = render;
	exports.findDOMNode = findDOMNode;
	exports.createRenderer = createRenderer;
	exports.options = options;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * inferno-component v1.0.0-beta42
	 * (c) 2016 Dominic Gannaway
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	     true ? module.exports = factory(__webpack_require__(4)) :
	    typeof define === 'function' && define.amd ? define(['inferno'], factory) :
	    (global.Inferno = global.Inferno || {}, global.Inferno.Component = factory(global.Inferno));
	}(this, (function (inferno) { 'use strict';
	
	var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
	var isBrowser = typeof window !== 'undefined' && window.document;
	
	// this is MUCH faster than .constructor === Array and instanceof Array
	// in Node 7 and the later versions of V8, slower in older versions though
	var isArray = Array.isArray;
	
	function isStringOrNumber(obj) {
	    return isString(obj) || isNumber(obj);
	}
	function isNullOrUndef(obj) {
	    return isUndefined(obj) || isNull(obj);
	}
	function isInvalid(obj) {
	    return isNull(obj) || obj === false || isTrue(obj) || isUndefined(obj);
	}
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	
	function isString(obj) {
	    return typeof obj === 'string';
	}
	function isNumber(obj) {
	    return typeof obj === 'number';
	}
	function isNull(obj) {
	    return obj === null;
	}
	function isTrue(obj) {
	    return obj === true;
	}
	function isUndefined(obj) {
	    return obj === undefined;
	}
	
	function throwError(message) {
	    if (!message) {
	        message = ERROR_MSG;
	    }
	    throw new Error(("Inferno Error: " + message));
	}
	
	var Lifecycle = function Lifecycle() {
	    this.listeners = [];
	    this.fastUnmount = true;
	};
	Lifecycle.prototype.addListener = function addListener (callback) {
	    this.listeners.push(callback);
	};
	Lifecycle.prototype.trigger = function trigger () {
	        var this$1 = this;
	
	    for (var i = 0; i < this.listeners.length; i++) {
	        this$1.listeners[i]();
	    }
	};
	
	var noOp = ERROR_MSG;
	if (false) {
	    noOp = 'Inferno Error: Can only update a mounted or mounting component. This usually means you called setState() or forceUpdate() on an unmounted component. This is a no-op.';
	}
	var componentCallbackQueue = new Map();
	// when a components root VNode is also a component, we can run into issues
	// this will recursively look for vNode.parentNode if the VNode is a component
	function updateParentComponentVNodes(vNode, dom) {
	    if (vNode.flags & 28 /* Component */) {
	        var parentVNode = vNode.parentVNode;
	        if (parentVNode) {
	            parentVNode.dom = dom;
	            updateParentComponentVNodes(parentVNode, dom);
	        }
	    }
	}
	// this is in shapes too, but we don't want to import from shapes as it will pull in a duplicate of createVNode
	function createVoidVNode() {
	    return inferno.createVNode(4096 /* Void */);
	}
	function createTextVNode(text) {
	    return inferno.createVNode(1 /* Text */, null, null, text);
	}
	function addToQueue(component, force, callback) {
	    // TODO this function needs to be revised and improved on
	    var queue = componentCallbackQueue.get(component);
	    if (!queue) {
	        queue = [];
	        componentCallbackQueue.set(component, queue);
	        Promise.resolve().then(function () {
	            applyState(component, force, function () {
	                for (var i = 0; i < queue.length; i++) {
	                    queue[i]();
	                }
	            });
	            componentCallbackQueue.delete(component);
	            component._processingSetState = false;
	        });
	    }
	    if (callback) {
	        queue.push(callback);
	    }
	}
	function queueStateChanges(component, newState, callback) {
	    if (isFunction(newState)) {
	        newState = newState(component.state);
	    }
	    for (var stateKey in newState) {
	        component._pendingState[stateKey] = newState[stateKey];
	    }
	    if (!component._pendingSetState && isBrowser) {
	        if (component._processingSetState || callback) {
	            addToQueue(component, false, callback);
	        }
	        else {
	            component._pendingSetState = true;
	            component._processingSetState = true;
	            applyState(component, false, callback);
	            component._processingSetState = false;
	        }
	    }
	    else {
	        component.state = Object.assign({}, component.state, component._pendingState);
	        component._pendingState = {};
	    }
	}
	function applyState(component, force, callback) {
	    if ((!component._deferSetState || force) && !component._blockRender && !component._unmounted) {
	        component._pendingSetState = false;
	        var pendingState = component._pendingState;
	        var prevState = component.state;
	        var nextState = Object.assign({}, prevState, pendingState);
	        var props = component.props;
	        var context = component.context;
	        component._pendingState = {};
	        var nextInput = component._updateComponent(prevState, nextState, props, props, context, force);
	        var didUpdate = true;
	        if (isInvalid(nextInput)) {
	            nextInput = createVoidVNode();
	        }
	        else if (nextInput === inferno.NO_OP) {
	            nextInput = component._lastInput;
	            didUpdate = false;
	        }
	        else if (isStringOrNumber(nextInput)) {
	            nextInput = createTextVNode(nextInput);
	        }
	        else if (isArray(nextInput)) {
	            if (false) {
	                throwError('a valid Inferno VNode (or null) must be returned from a component render. You may have returned an array or an invalid object.');
	            }
	            throwError();
	        }
	        var lastInput = component._lastInput;
	        var vNode = component._vNode;
	        var parentDom = (lastInput.dom && lastInput.dom.parentNode) || (lastInput.dom = vNode.dom);
	        component._lastInput = nextInput;
	        if (didUpdate) {
	            var subLifecycle = component._lifecycle;
	            if (!subLifecycle) {
	                subLifecycle = new Lifecycle();
	            }
	            else {
	                subLifecycle.listeners = [];
	            }
	            component._lifecycle = subLifecycle;
	            var childContext = component.getChildContext();
	            if (!isNullOrUndef(childContext)) {
	                childContext = Object.assign({}, context, component._childContext, childContext);
	            }
	            else {
	                childContext = Object.assign({}, context, component._childContext);
	            }
	            component._patch(lastInput, nextInput, parentDom, subLifecycle, childContext, component._isSVG, false);
	            subLifecycle.trigger();
	            component.componentDidUpdate(props, prevState);
	            inferno.options.afterUpdate && inferno.options.afterUpdate(vNode);
	        }
	        var dom = vNode.dom = nextInput.dom;
	        var componentToDOMNodeMap = component._componentToDOMNodeMap;
	        componentToDOMNodeMap && componentToDOMNodeMap.set(component, nextInput.dom);
	        updateParentComponentVNodes(vNode, dom);
	        if (!isNullOrUndef(callback)) {
	            callback();
	        }
	    }
	}
	var Component$1 = function Component(props, context) {
	    this.state = {};
	    this.refs = {};
	    this._processingSetState = false;
	    this._blockRender = false;
	    this._ignoreSetState = false;
	    this._blockSetState = false;
	    this._deferSetState = false;
	    this._pendingSetState = false;
	    this._pendingState = {};
	    this._lastInput = null;
	    this._vNode = null;
	    this._unmounted = true;
	    this._devToolsStatus = null;
	    this._devToolsId = null;
	    this._lifecycle = null;
	    this._childContext = null;
	    this._patch = null;
	    this._isSVG = false;
	    this._componentToDOMNodeMap = null;
	    /** @type {object} */
	    this.props = props || inferno.EMPTY_OBJ;
	    /** @type {object} */
	    this.context = context || {};
	};
	Component$1.prototype.render = function render (nextProps, nextState, nextContext) {
	};
	Component$1.prototype.forceUpdate = function forceUpdate (callback) {
	    if (this._unmounted) {
	        return;
	    }
	    isBrowser && applyState(this, true, callback);
	};
	Component$1.prototype.setState = function setState (newState, callback) {
	    if (this._unmounted) {
	        return;
	    }
	    if (!this._blockSetState) {
	        if (!this._ignoreSetState) {
	            queueStateChanges(this, newState, callback);
	        }
	    }
	    else {
	        if (false) {
	            throwError('cannot update state via setState() in componentWillUpdate().');
	        }
	        throwError();
	    }
	};
	Component$1.prototype.componentWillMount = function componentWillMount () {
	};
	Component$1.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState, prevContext) {
	};
	Component$1.prototype.shouldComponentUpdate = function shouldComponentUpdate (nextProps, nextState, context) {
	    return true;
	};
	Component$1.prototype.componentWillReceiveProps = function componentWillReceiveProps (nextProps, context) {
	};
	Component$1.prototype.componentWillUpdate = function componentWillUpdate (nextProps, nextState, nextContext) {
	};
	Component$1.prototype.getChildContext = function getChildContext () {
	};
	Component$1.prototype._updateComponent = function _updateComponent (prevState, nextState, prevProps, nextProps, context, force) {
	    if (this._unmounted === true) {
	        if (false) {
	            throwError(noOp);
	        }
	        throwError();
	    }
	    if ((prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) || prevState !== nextState || force) {
	        if (prevProps !== nextProps || nextProps === inferno.EMPTY_OBJ) {
	            this._blockRender = true;
	            this.componentWillReceiveProps(nextProps, context);
	            this._blockRender = false;
	            if (this._pendingSetState) {
	                nextState = Object.assign({}, nextState, this._pendingState);
	                this._pendingSetState = false;
	                this._pendingState = {};
	            }
	        }
	        var shouldUpdate = this.shouldComponentUpdate(nextProps, nextState, context);
	        if (shouldUpdate !== false || force) {
	            this._blockSetState = true;
	            this.componentWillUpdate(nextProps, nextState, context);
	            this._blockSetState = false;
	            this.props = nextProps;
	            var state = this.state = nextState;
	            this.context = context;
	            inferno.options.beforeRender && inferno.options.beforeRender(this);
	            var render = this.render(nextProps, state, context);
	            inferno.options.afterRender && inferno.options.afterRender(this);
	            return render;
	        }
	    }
	    return inferno.NO_OP;
	};
	
	return Component$1;
	
	})));


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _infact = __webpack_require__(2);
	
	var _infact2 = __webpack_require__(8);
	
	var _infact3 = _interopRequireDefault(_infact2);
	
	var _pigeonCluster = __webpack_require__(14);
	
	var _pigeonCluster2 = _interopRequireDefault(_pigeonCluster);
	
	var _infact4 = __webpack_require__(22);
	
	var _infact5 = _interopRequireDefault(_infact4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var createVNode = _infact.Inferno.createVNode;
	
	var Demo = function (_Component) {
	    _inherits(Demo, _Component);
	
	    function Demo() {
	        _classCallCheck(this, Demo);
	
	        return _possibleConstructorReturn(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).apply(this, arguments));
	    }
	
	    _createClass(Demo, [{
	        key: 'render',
	        value: function render() {
	            return createVNode(2, 'div', {
	                'style': { textAlign: 'center', marginTop: 50 }
	            }, createVNode(16, _infact3.default, {
	                'center': [50.879, 4.6997],
	                'zoom': 11,
	                'width': 600,
	                'height': 400,
	                children: createVNode(16, _pigeonCluster2.default, {
	                    children: [createVNode(16, _infact5.default, {
	                        'anchor': [50.889, 4.6997],
	                        'payload': 1
	                    }, null, null, 'm1'), createVNode(16, _infact5.default, {
	                        'anchor': [50.879, 4.7],
	                        'payload': 1
	                    }, null, null, 'm2'), createVNode(16, _infact5.default, {
	                        'anchor': [50.869, 4.72],
	                        'payload': 1
	                    }, null, null, 'm3')]
	                })
	            }));
	        }
	    }]);
	
	    return Demo;
	}(_infact.Component);
	
	exports.default = Demo;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	if (true) {
	  module.exports = __webpack_require__(9)
	}
	if (false) {
	  module.exports = require('./lib/react/index.js')
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _infact = __webpack_require__(10);
	
	var _parentPosition = __webpack_require__(11);
	
	var _parentPosition2 = _interopRequireDefault(_parentPosition);
	
	var _parentHasClass = __webpack_require__(12);
	
	var _parentHasClass2 = _interopRequireDefault(_parentHasClass);
	
	var _debounce = __webpack_require__(13);
	
	var _debounce2 = _interopRequireDefault(_debounce);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var ANIMATION_TIME = 300;
	var DIAGONAL_THROW_TIME = 1500;
	var SCROLL_PIXELS_FOR_ZOOM_LEVEL = 150;
	var MIN_DRAG_FOR_THROW = 40;
	var CLICK_TOLERANCE = 2;
	var DOUBLE_CLICK_DELAY = 300;
	var DEBOUNCE_DELAY = 60;
	
	var NOOP = function () {};
	
	function wikimedia(x, y, z) {
	  var retina = typeof window !== 'undefined' && window.devicePixelRatio >= 2;
	  return 'https://maps.wikimedia.org/osm-intl/' + z + '/' + x + '/' + y + (retina ? '@2x' : '') + '.png';
	}
	
	// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
	var lng2tile = function (lon, zoom) {
	  return (lon + 180) / 360 * Math.pow(2, zoom);
	};
	var lat2tile = function (lat, zoom) {
	  return (1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom);
	};
	
	function tile2lng(x, z) {
	  return x / Math.pow(2, z) * 360 - 180;
	}
	
	function tile2lat(y, z) {
	  var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
	  return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
	}
	
	function getMousePixel(dom, event) {
	  var parent = (0, _parentPosition2.default)(dom);
	  return [event.clientX - parent.x, event.clientY - parent.y];
	}
	
	function easeOutQuad(t) {
	  return t * (2 - t);
	}
	
	var minLng = tile2lng(0, 10);
	var minLat = tile2lat(Math.pow(2, 10), 10);
	
	var maxLng = tile2lng(Math.pow(2, 10), 10);
	var maxLat = tile2lat(0, 10);
	
	var createVNode = _infact.Inferno.createVNode;
	
	var Map = function (_Component) {
	  _inherits(Map, _Component);
	
	  function Map(props) {
	    _classCallCheck(this, Map);
	
	    var _this = _possibleConstructorReturn(this, (Map.__proto__ || Object.getPrototypeOf(Map)).call(this, props));
	
	    _this.setCenterZoomTarget = function (center, zoom, fromProps) {
	      var zoomAround = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	      var animationDuration = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : ANIMATION_TIME;
	
	      // TODO: if center diff is more than 2 screens, no animation
	      if (_this.props.animate) {
	        if (_this._isAnimating) {
	          window.cancelAnimationFrame(_this._animFrame);
	
	          var _this$animationStep = _this.animationStep(window.performance.now()),
	              centerStep = _this$animationStep.centerStep,
	              zoomStep = _this$animationStep.zoomStep;
	
	          _this._centerStart = centerStep;
	          _this._zoomStart = zoomStep;
	        } else {
	          _this._isAnimating = true;
	          _this._centerStart = _this.limitCenterAtZoom([_this._lastCenter[0], _this._lastCenter[1]], _this._lastZoom);
	          _this._zoomStart = _this._lastZoom;
	        }
	
	        _this._animationStart = window.performance.now();
	        _this._animationEnd = _this._animationStart + animationDuration;
	
	        if (zoomAround) {
	          _this._zoomAround = zoomAround;
	          _this._centerTarget = _this.calculateZoomCenter(_this._lastCenter, zoomAround, _this._lastZoom, zoom);
	        } else {
	          _this._zoomAround = null;
	          _this._centerTarget = center;
	        }
	        _this._zoomTarget = zoom;
	
	        _this._animFrame = window.requestAnimationFrame(_this.animate);
	      } else {
	        if (zoomAround) {
	          var _center = _this.calculateZoomCenter(_this._lastCenter, zoomAround, _this._lastZoom, zoom);
	          _this.setCenterZoom(_center, zoom, fromProps);
	        } else {
	          _this.setCenterZoom(center, zoom, fromProps);
	        }
	      }
	    };
	
	    _this.animationStep = function (timestamp) {
	      var length = _this._animationEnd - _this._animationStart;
	      var progress = Math.max(timestamp - _this._animationStart, 0);
	      var percentage = easeOutQuad(progress / length);
	
	      var zoomDiff = (_this._zoomTarget - _this._zoomStart) * percentage;
	      var zoomStep = _this._zoomStart + zoomDiff;
	
	      if (_this._zoomAround) {
	        var centerStep = _this.calculateZoomCenter(_this._centerStart, _this._zoomAround, _this._zoomStart, zoomStep);
	
	        return { centerStep: centerStep, zoomStep: zoomStep };
	      } else {
	        var _centerStep = [_this._centerStart[0] + (_this._centerTarget[0] - _this._centerStart[0]) * percentage, _this._centerStart[1] + (_this._centerTarget[1] - _this._centerStart[1]) * percentage];
	
	        return { centerStep: _centerStep, zoomStep: zoomStep };
	      }
	    };
	
	    _this.animate = function (timestamp) {
	      if (timestamp >= _this._animationEnd) {
	        _this._isAnimating = false;
	        _this.setCenterZoom(_this._centerTarget, _this._zoomTarget);
	      } else {
	        var _this$animationStep2 = _this.animationStep(timestamp),
	            centerStep = _this$animationStep2.centerStep,
	            zoomStep = _this$animationStep2.zoomStep;
	
	        _this.setCenterZoom(centerStep, zoomStep);
	        _this._animFrame = window.requestAnimationFrame(_this.animate);
	      }
	    };
	
	    _this.stopAnimating = function () {
	      if (_this._isAnimating) {
	        _this._isAnimating = false;
	        window.cancelAnimationFrame(_this._animFrame);
	      }
	    };
	
	    _this.limitCenterAtZoom = function (center) {
	      // TODO: use zoom to hide the gray area of the map - adjust the center
	      return [Math.max(Math.min(isNaN(center[0]) ? _this.state.center[0] : center[0], maxLat), minLat), Math.max(Math.min(isNaN(center[1]) ? _this.state.center[1] : center[1], maxLng), minLng)];
	    };
	
	    _this.setCenterZoom = function (center, zoom) {
	      var limitedCenter = _this.limitCenterAtZoom(center, zoom);
	
	      if (Math.round(_this.state.zoom) !== Math.round(zoom)) {
	        (function () {
	          var tileValues = _this.tileValues(_this.props, _this.state);
	          var nextValues = _this.tileValues(_this.props, { center: limitedCenter, zoom: zoom });
	          var oldTiles = _this.state.oldTiles;
	
	          _this.setState({
	            oldTiles: oldTiles.filter(function (o) {
	              return o.roundedZoom !== tileValues.roundedZoom;
	            }).concat(tileValues)
	          }, NOOP);
	
	          var loadTracker = {};
	
	          for (var x = nextValues.tileMinX; x <= nextValues.tileMaxX; x++) {
	            for (var y = nextValues.tileMinY; y <= nextValues.tileMaxY; y++) {
	              var key = x + '-' + y + '-' + nextValues.roundedZoom;
	              loadTracker[key] = false;
	            }
	          }
	
	          _this._loadTracker = loadTracker;
	        })();
	      }
	
	      _this.setState({ center: limitedCenter, zoom: zoom }, NOOP);
	
	      var maybeZoom = _this.props.zoom ? _this.props.zoom : _this._lastZoom;
	      var maybeCenter = _this.props.center ? _this.props.center : _this._lastCenter;
	      if (Math.abs(maybeZoom - zoom) > 0.001 || Math.abs(maybeCenter[0] - limitedCenter[0]) > 0.00001 || Math.abs(maybeCenter[1] - limitedCenter[1]) > 0.00001) {
	        _this._lastZoom = zoom;
	        _this._lastCenter = [].concat(_toConsumableArray(limitedCenter));
	        _this.syncToProps(limitedCenter, zoom);
	      }
	    };
	
	    _this.imageLoaded = function (key) {
	      if (_this._loadTracker && key in _this._loadTracker) {
	        _this._loadTracker[key] = true;
	
	        var unloadedCount = Object.keys(_this._loadTracker).filter(function (k) {
	          return !_this._loadTracker[k];
	        }).length;
	
	        if (unloadedCount === 0) {
	          _this.setState({ oldTiles: [] }, NOOP);
	        }
	      }
	    };
	
	    _this.handleTouchStart = function (event) {
	      var _this$props = _this.props,
	          width = _this$props.width,
	          height = _this$props.height;
	
	      if (event.touches.length === 1) {
	        var touch = event.touches[0];
	        var pixel = getMousePixel(_this._containerRef, touch);
	
	        if (pixel[0] >= 0 && pixel[1] >= 0 && pixel[0] < width && pixel[1] < height) {
	          _this._touchStartCoords = [[touch.clientX, touch.clientY]];
	
	          _this.stopAnimating();
	          event.preventDefault();
	
	          if (_this._lastTap && window.performance.now() - _this._lastTap < DOUBLE_CLICK_DELAY) {
	            var latLngNow = _this.pixelToLatLng(_this._touchStartCoords[0]);
	            _this.setCenterZoomTarget(null, Math.max(1, Math.min(_this.state.zoom + 1, 18)), false, latLngNow);
	          } else {
	            _this._lastTap = window.performance.now();
	            _this.startTrackingMoveEvents(pixel);
	          }
	        }
	        // added second finger and first one was in the area
	      } else if (event.touches.length === 2 && _this._touchStartCoords) {
	        event.preventDefault();
	
	        _this.stopTrackingMoveEvents();
	
	        if (_this.state.pixelDelta || _this.state.zoomDelta) {
	          _this.sendDeltaChange();
	        }
	
	        var t1 = event.touches[0];
	        var t2 = event.touches[1];
	
	        _this._touchStartCoords = [[t1.clientX, t1.clientY], [t2.clientX, t2.clientY]];
	        _this._touchStartMidPoint = [(t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2];
	        _this._touchStartDistance = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
	      }
	    };
	
	    _this.handleTouchMove = function (event) {
	      if (event.touches.length === 1 && _this._touchStartCoords) {
	        event.preventDefault();
	        var touch = event.touches[0];
	        var pixel = getMousePixel(_this._containerRef, touch);
	        _this.trackMoveEvents(pixel);
	
	        _this.setState({
	          pixelDelta: [touch.clientX - _this._touchStartCoords[0][0], touch.clientY - _this._touchStartCoords[0][1]]
	        }, NOOP);
	      } else if (event.touches.length === 2 && _this._touchStartCoords) {
	        var _this$props2 = _this.props,
	            width = _this$props2.width,
	            height = _this$props2.height;
	        var zoom = _this.state.zoom;
	
	        event.preventDefault();
	
	        var t1 = event.touches[0];
	        var t2 = event.touches[1];
	
	        var parent = (0, _parentPosition2.default)(_this._containerRef);
	
	        var midPoint = [(t1.clientX + t2.clientX) / 2, (t1.clientY + t2.clientY) / 2];
	        var midPointDiff = [midPoint[0] - _this._touchStartMidPoint[0], midPoint[1] - _this._touchStartMidPoint[1]];
	
	        var distance = Math.sqrt(Math.pow(t1.clientX - t2.clientX, 2) + Math.pow(t1.clientY - t2.clientY, 2));
	
	        var zoomDelta = Math.min(18, zoom + Math.log2(distance / _this._touchStartDistance)) - zoom;
	        var scale = Math.pow(2, zoomDelta);
	
	        var centerDiffDiff = [(parent.x + width / 2 - midPoint[0]) * (scale - 1), (parent.y + height / 2 - midPoint[1]) * (scale - 1)];
	
	        _this.setState({
	          zoomDelta: zoomDelta,
	          pixelDelta: [centerDiffDiff[0] + midPointDiff[0] * scale, centerDiffDiff[1] + midPointDiff[1] * scale]
	        }, NOOP);
	      }
	    };
	
	    _this.handleTouchEnd = function (event) {
	      if (_this._touchStartCoords) {
	        event.preventDefault();
	
	        var _this$sendDeltaChange = _this.sendDeltaChange(),
	            center = _this$sendDeltaChange.center,
	            zoom = _this$sendDeltaChange.zoom;
	
	        if (event.touches.length === 0) {
	          _this._touchStartCoords = null;
	          var pixel = getMousePixel(_this._containerRef, event.changedTouches[0]);
	          _this.throwAfterMoving(pixel, center, zoom);
	        } else if (event.touches.length === 1) {
	          var touch = event.touches[0];
	          var _pixel = getMousePixel(_this._containerRef, touch);
	
	          _this._touchStartCoords = [[touch.clientX, touch.clientY]];
	          _this.startTrackingMoveEvents(_pixel);
	        }
	      }
	    };
	
	    _this.handleMouseDown = function (event) {
	      var _this$props3 = _this.props,
	          width = _this$props3.width,
	          height = _this$props3.height;
	
	      var pixel = getMousePixel(_this._containerRef, event);
	
	      if (event.button === 0 && !(0, _parentHasClass2.default)(event.target, 'pigeon-drag-block') && pixel[0] >= 0 && pixel[1] >= 0 && pixel[0] < width && pixel[1] < height) {
	        _this.stopAnimating();
	        event.preventDefault();
	
	        if (_this._lastClick && window.performance.now() - _this._lastClick < DOUBLE_CLICK_DELAY) {
	          var latLngNow = _this.pixelToLatLng(_this._mousePosition);
	          _this.setCenterZoomTarget(null, Math.max(1, Math.min(_this.state.zoom + 1, 18)), false, latLngNow);
	        } else {
	          _this._lastClick = window.performance.now();
	
	          _this._mouseDown = true;
	          _this._dragStart = pixel;
	          _this.startTrackingMoveEvents(pixel);
	        }
	      }
	    };
	
	    _this.handleMouseMove = function (event) {
	      _this._mousePosition = getMousePixel(_this._containerRef, event);
	
	      if (_this._mouseDown && _this._dragStart) {
	        _this.trackMoveEvents(_this._mousePosition);
	        _this.setState({
	          pixelDelta: [_this._mousePosition[0] - _this._dragStart[0], _this._mousePosition[1] - _this._dragStart[1]]
	        }, NOOP);
	      }
	    };
	
	    _this.handleMouseUp = function (event) {
	      var pixelDelta = _this.state.pixelDelta;
	
	      if (_this._mouseDown) {
	        _this._mouseDown = false;
	
	        var pixel = getMousePixel(_this._containerRef, event);
	
	        if (_this.props.onClick && !(0, _parentHasClass2.default)(event.target, 'pigeon-click-block') && (!pixelDelta || Math.abs(pixelDelta[0]) + Math.abs(pixelDelta[1]) <= CLICK_TOLERANCE)) {
	          var latLng = _this.pixelToLatLng(pixel);
	          _this.props.onClick({ event: event, latLng: latLng, pixel: pixel });
	          _this.setState({ pixelDelta: null }, NOOP);
	        } else {
	          var _this$sendDeltaChange2 = _this.sendDeltaChange(),
	              center = _this$sendDeltaChange2.center,
	              zoom = _this$sendDeltaChange2.zoom;
	
	          _this.throwAfterMoving(pixel, center, zoom);
	        }
	      }
	    };
	
	    _this.startTrackingMoveEvents = function (coords) {
	      _this._moveEvents = [{ timestamp: window.performance.now(), coords: coords }];
	    };
	
	    _this.stopTrackingMoveEvents = function () {
	      _this._moveEvents = [];
	    };
	
	    _this.trackMoveEvents = function (coords) {
	      var timestamp = window.performance.now();
	
	      if (timestamp - _this._moveEvents[_this._moveEvents.length - 1].timestamp > 40) {
	        _this._moveEvents.push({ timestamp: timestamp, coords: coords });
	        if (_this._moveEvents.length > 2) {
	          _this._moveEvents.shift();
	        }
	      }
	    };
	
	    _this.throwAfterMoving = function (coords, center, zoom) {
	      var _this$props4 = _this.props,
	          width = _this$props4.width,
	          height = _this$props4.height,
	          animate = _this$props4.animate;
	
	      var timestamp = window.performance.now();
	      var lastEvent = _this._moveEvents.shift();
	
	      if (lastEvent && animate) {
	        var deltaMs = Math.max(timestamp - lastEvent.timestamp, 1);
	
	        var delta = [(coords[0] - lastEvent.coords[0]) / deltaMs * 120, (coords[1] - lastEvent.coords[1]) / deltaMs * 120];
	
	        var distance = Math.sqrt(delta[0] * delta[0] + delta[1] * delta[1]);
	
	        if (distance > MIN_DRAG_FOR_THROW) {
	          var diagonal = Math.sqrt(width * width + height * height);
	
	          var lng = tile2lng(lng2tile(center[1], zoom) - delta[0] / 256.0, zoom);
	          var lat = tile2lat(lat2tile(center[0], zoom) - delta[1] / 256.0, zoom);
	
	          _this.setCenterZoomTarget([lat, lng], zoom, false, null, DIAGONAL_THROW_TIME * distance / diagonal);
	        }
	      }
	
	      _this.stopTrackingMoveEvents();
	    };
	
	    _this.sendDeltaChange = function () {
	      var _this$state = _this.state,
	          center = _this$state.center,
	          zoom = _this$state.zoom,
	          pixelDelta = _this$state.pixelDelta,
	          zoomDelta = _this$state.zoomDelta;
	
	      var lat = center[0];
	      var lng = center[1];
	
	      if (pixelDelta || zoomDelta !== 0) {
	        lng = tile2lng(lng2tile(center[1], zoom + zoomDelta) - (pixelDelta ? pixelDelta[0] / 256.0 : 0), zoom + zoomDelta);
	        lat = tile2lat(lat2tile(center[0], zoom + zoomDelta) - (pixelDelta ? pixelDelta[1] / 256.0 : 0), zoom + zoomDelta);
	        _this.setCenterZoom([lat, lng], zoom + zoomDelta);
	      }
	
	      _this.setState({
	        pixelDelta: null,
	        zoomDelta: 0
	      }, NOOP);
	
	      return {
	        center: _this.limitCenterAtZoom([lat, lng], zoom + zoomDelta),
	        zoom: zoom + zoomDelta
	      };
	    };
	
	    _this.getBounds = function () {
	      var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.center;
	      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.zoomPlusDelta();
	      var _this$props5 = _this.props,
	          width = _this$props5.width,
	          height = _this$props5.height;
	
	      return {
	        ne: _this.pixelToLatLng([width - 1, 0], center, zoom),
	        sw: _this.pixelToLatLng([0, height - 1], center, zoom)
	      };
	    };
	
	    _this.syncToProps = function () {
	      var center = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.center;
	      var zoom = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.zoom;
	      var onBoundsChanged = _this.props.onBoundsChanged;
	
	      if (onBoundsChanged) {
	        var bounds = _this.getBounds(center, zoom);
	
	        onBoundsChanged({ center: center, zoom: zoom, bounds: bounds, initial: !_this._boundsSynced });
	
	        _this._boundsSynced = true;
	      }
	    };
	
	    _this.handleWheel = function (event) {
	      event.preventDefault();
	
	      var addToZoom = -event.deltaY / SCROLL_PIXELS_FOR_ZOOM_LEVEL;
	
	      if (_this._zoomTarget) {
	        var stillToAdd = _this._zoomTarget - _this.state.zoom;
	        _this.zoomAroundMouse(addToZoom + stillToAdd);
	      } else {
	        _this.zoomAroundMouse(addToZoom);
	      }
	    };
	
	    _this.zoomAroundMouse = function (zoomDiff) {
	      var zoom = _this.state.zoom;
	
	      if (!_this._mousePosition || zoom === 1 && zoomDiff < 0 || zoom === 18 && zoomDiff > 0) {
	        return;
	      }
	
	      var latLngNow = _this.pixelToLatLng(_this._mousePosition);
	
	      _this.setCenterZoomTarget(null, Math.max(1, Math.min(zoom + zoomDiff, 18)), false, latLngNow);
	    };
	
	    _this.zoomPlusDelta = function () {
	      return _this.state.zoom + _this.state.zoomDelta;
	    };
	
	    _this.pixelToLatLng = function (pixel) {
	      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.center;
	      var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.zoomPlusDelta();
	      var _this$props6 = _this.props,
	          width = _this$props6.width,
	          height = _this$props6.height;
	      var pixelDelta = _this.state.pixelDelta;
	
	      var pointDiff = [(pixel[0] - width / 2 - (pixelDelta ? pixelDelta[0] : 0)) / 256.0, (pixel[1] - height / 2 - (pixelDelta ? pixelDelta[1] : 0)) / 256.0];
	
	      var tileX = lng2tile(center[1], zoom) + pointDiff[0];
	      var tileY = lat2tile(center[0], zoom) + pointDiff[1];
	
	      return _this.limitCenterAtZoom([tile2lat(tileY, zoom), tile2lng(tileX, zoom)], zoom);
	    };
	
	    _this.latLngToPixel = function (latLng) {
	      var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this.state.center;
	      var zoom = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this.zoomPlusDelta();
	      var _this$props7 = _this.props,
	          width = _this$props7.width,
	          height = _this$props7.height;
	      var pixelDelta = _this.state.pixelDelta;
	
	      var limitedCenter = _this.limitCenterAtZoom(center);
	
	      var tileCenterX = lng2tile(limitedCenter[1], zoom);
	      var tileCenterY = lat2tile(limitedCenter[0], zoom);
	
	      var tileX = lng2tile(latLng[1], zoom);
	      var tileY = lat2tile(latLng[0], zoom);
	
	      return [(tileX - tileCenterX) * 256.0 + width / 2 + (pixelDelta ? pixelDelta[0] : 0), (tileY - tileCenterY) * 256.0 + height / 2 + (pixelDelta ? pixelDelta[1] : 0)];
	    };
	
	    _this.calculateZoomCenter = function (center, coords, oldZoom, newZoom) {
	      var _this$props8 = _this.props,
	          width = _this$props8.width,
	          height = _this$props8.height;
	
	      var pixelBefore = _this.latLngToPixel(coords, center, oldZoom);
	      var pixelAfter = _this.latLngToPixel(coords, center, newZoom);
	
	      var newCenter = _this.pixelToLatLng([width / 2 + pixelAfter[0] - pixelBefore[0], height / 2 + pixelAfter[1] - pixelBefore[1]], center, newZoom);
	
	      return _this.limitCenterAtZoom(newCenter, newZoom);
	    };
	
	    _this.setRef = function (dom) {
	      _this._containerRef = dom;
	    };
	
	    _this.syncToProps = (0, _debounce2.default)(_this.syncToProps, DEBOUNCE_DELAY);
	
	    _this._mousePosition = null;
	    _this._dragStart = null;
	    _this._mouseDown = false;
	    _this._moveEvents = [];
	    _this._lastClick = null;
	    _this._lastTap = null;
	    _this._touchStartCoords = null;
	
	    _this._isAnimating = false;
	    _this._animationStart = null;
	    _this._animationEnd = null;
	    _this._centerTarget = null;
	    _this._zoomTarget = null;
	
	    // When users are using uncontrolled components we have to keep this
	    // so we can know if we should call onBoundsChanged
	    _this._lastZoom = props.defaultZoom ? props.defaultZoom : props.zoom;
	    _this._lastCenter = props.defaultCenter ? props.defaultCenter : props.center;
	    _this._boundsSynced = false;
	
	    _this.state = {
	      zoom: _this._lastZoom,
	      center: _this._lastCenter,
	      zoomDelta: 0,
	      pixelDelta: null,
	      oldTiles: []
	    };
	    return _this;
	  }
	
	  _createClass(Map, [{
	    key: 'componentDidMount',
	    value: function () {
	      var wa = window.addEventListener;
	      wa('mousedown', this.handleMouseDown);
	      wa('mouseup', this.handleMouseUp);
	      wa('mousemove', this.handleMouseMove);
	
	      wa('touchstart', this.handleTouchStart);
	      wa('touchmove', this.handleTouchMove);
	      wa('touchend', this.handleTouchEnd);
	
	      this.syncToProps();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function () {
	      var wr = window.removeEventListener;
	      wr('mousedown', this.handleMouseDown);
	      wr('mouseup', this.handleMouseUp);
	      wr('mousemove', this.handleMouseMove);
	
	      wr('touchstart', this.handleTouchStart);
	      wr('touchmove', this.handleTouchMove);
	      wr('touchend', this.handleTouchEnd);
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function (nextProps) {
	      if (!nextProps.center && !nextProps.zoom) {
	        // if the user isn't controlling neither zoom nor center we don't have to update.
	        return;
	      }
	      var maybeCenter = nextProps.center ? nextProps.center : this.state.center;
	      var maybeZoom = nextProps.zoom ? nextProps.zoom : this.state.zoom;
	      if (Math.abs(maybeZoom - this.state.zoom) > 0.001 || Math.abs(maybeCenter[0] - this.state.center[0]) > 0.0001 || Math.abs(maybeCenter[1] - this.state.center[1]) > 0.0001) {
	        this.setCenterZoomTarget(maybeCenter, maybeZoom, true);
	      }
	    }
	
	    // main logic when changing coordinates
	
	
	    // https://www.bennadel.com/blog/1856-using-jquery-s-animate-step-callback-function-to-create-custom-animations.htm
	
	
	    // tools
	
	    // ref
	
	  }, {
	    key: 'tileValues',
	
	    // data to display the tiles
	
	    value: function (props, state) {
	      var width = props.width,
	          height = props.height;
	      var center = state.center,
	          zoom = state.zoom,
	          pixelDelta = state.pixelDelta,
	          zoomDelta = state.zoomDelta;
	
	      var roundedZoom = Math.round(zoom + (zoomDelta || 0));
	
	
	      var scale = Math.pow(2, zoom + (zoomDelta || 0) - roundedZoom);
	      var scaleWidth = width / scale;
	      var scaleHeight = height / scale;
	
	      var tileCenterX = lng2tile(center[1], roundedZoom) - (pixelDelta ? pixelDelta[0] / 256.0 / scale : 0);
	      var tileCenterY = lat2tile(center[0], roundedZoom) - (pixelDelta ? pixelDelta[1] / 256.0 / scale : 0);
	
	      var halfWidth = scaleWidth / 2 / 256.0;
	      var halfHeight = scaleHeight / 2 / 256.0;
	
	      var tileMinX = Math.floor(tileCenterX - halfWidth);
	      var tileMaxX = Math.floor(tileCenterX + halfWidth);
	
	      var tileMinY = Math.floor(tileCenterY - halfHeight);
	      var tileMaxY = Math.floor(tileCenterY + halfHeight);
	
	      return {
	        tileMinX: tileMinX,
	        tileMaxX: tileMaxX,
	        tileMinY: tileMinY,
	        tileMaxY: tileMaxY,
	        tileCenterX: tileCenterX,
	        tileCenterY: tileCenterY,
	        roundedZoom: roundedZoom,
	        zoomDelta: zoomDelta || 0,
	        scaleWidth: scaleWidth,
	        scaleHeight: scaleHeight,
	        scale: scale
	      };
	    }
	
	    // display the tiles
	
	  }, {
	    key: 'renderTiles',
	    value: function () {
	      var _this2 = this;
	
	      var oldTiles = this.state.oldTiles;
	
	      var mapUrl = this.props.provider || wikimedia;
	
	      var _tileValues = this.tileValues(this.props, this.state),
	          tileMinX = _tileValues.tileMinX,
	          tileMaxX = _tileValues.tileMaxX,
	          tileMinY = _tileValues.tileMinY,
	          tileMaxY = _tileValues.tileMaxY,
	          tileCenterX = _tileValues.tileCenterX,
	          tileCenterY = _tileValues.tileCenterY,
	          roundedZoom = _tileValues.roundedZoom,
	          scaleWidth = _tileValues.scaleWidth,
	          scaleHeight = _tileValues.scaleHeight,
	          scale = _tileValues.scale;
	
	      var tiles = [];
	
	      for (var i = 0; i < oldTiles.length; i++) {
	        var old = oldTiles[i];
	        var zoomDiff = old.roundedZoom - roundedZoom;
	
	        if (Math.abs(zoomDiff) > 4 || zoomDiff === 0) {
	          continue;
	        }
	
	        var pow = 1 / Math.pow(2, zoomDiff);
	        var xDiff = -(tileMinX - old.tileMinX * pow) * 256;
	        var yDiff = -(tileMinY - old.tileMinY * pow) * 256;
	
	        var _xMin = Math.max(old.tileMinX, 0);
	        var _yMin = Math.max(old.tileMinY, 0);
	        var _xMax = Math.min(old.tileMaxX, Math.pow(2, old.roundedZoom) - 1);
	        var _yMax = Math.min(old.tileMaxY, Math.pow(2, old.roundedZoom) - 1);
	
	        for (var x = _xMin; x <= _xMax; x++) {
	          for (var y = _yMin; y <= _yMax; y++) {
	            tiles.push({
	              key: x + '-' + y + '-' + old.roundedZoom,
	              url: mapUrl(x, y, old.roundedZoom),
	              left: xDiff + (x - old.tileMinX) * 256 * pow,
	              top: yDiff + (y - old.tileMinY) * 256 * pow,
	              width: 256 * pow,
	              height: 256 * pow,
	              active: false
	            });
	          }
	        }
	      }
	
	      var xMin = Math.max(tileMinX, 0);
	      var yMin = Math.max(tileMinY, 0);
	      var xMax = Math.min(tileMaxX, Math.pow(2, roundedZoom) - 1);
	      var yMax = Math.min(tileMaxY, Math.pow(2, roundedZoom) - 1);
	
	      for (var _x11 = xMin; _x11 <= xMax; _x11++) {
	        for (var _y = yMin; _y <= yMax; _y++) {
	          tiles.push({
	            key: _x11 + '-' + _y + '-' + roundedZoom,
	            url: mapUrl(_x11, _y, roundedZoom),
	            left: (_x11 - tileMinX) * 256,
	            top: (_y - tileMinY) * 256,
	            width: 256,
	            height: 256,
	            active: true
	          });
	        }
	      }
	
	      return createVNode(2, 'div', {
	        'style': {
	          width: scaleWidth,
	          height: scaleHeight,
	          position: 'absolute',
	          top: 0,
	          left: 0,
	          overflow: 'hidden',
	          willChange: 'transform',
	          transform: 'scale(' + scale + ', ' + scale + ')',
	          transformOrigin: 'top left'
	        }
	      }, createVNode(2, 'div', {
	        'style': {
	          position: 'absolute',
	          width: (tileMaxX - tileMinX + 1) * 256,
	          height: (tileMaxY - tileMinY + 1) * 256,
	          willChange: 'transform',
	          transform: 'translate(' + -((tileCenterX - tileMinX) * 256 - scaleWidth / 2) + 'px, ' + -((tileCenterY - tileMinY) * 256 - scaleHeight / 2) + 'px)'
	        }
	      }, tiles.map(function (tile) {
	        return createVNode(2, 'img', {
	          'src': tile.url,
	          'width': tile.width,
	          'height': tile.height,
	          'style': { position: 'absolute', left: tile.left, top: tile.top, willChange: 'transform', transform: tile.transform, transformOrigin: 'top left', opacity: 1 }
	        }, null, {
	          'onLoad': function () {
	            return _this2.imageLoaded(tile.key);
	          }
	        }, tile.key);
	      })));
	    }
	  }, {
	    key: 'renderOverlays',
	    value: function () {
	      var _this3 = this;
	
	      var _props = this.props,
	          width = _props.width,
	          height = _props.height;
	      var center = this.state.center;
	
	      var mapState = {
	        bounds: this.getBounds(),
	        zoom: this.zoomPlusDelta(),
	        center: center,
	        width: width,
	        height: height
	      };
	
	      var childrenWithProps = void 0;
	
	      var childrenChecked = this.props.children ? Array.isArray && Array.isArray(this.props.children) ? this.props.children : [].concat(this.props.children) : [];
	
	      childrenWithProps = childrenChecked.map(function (child) {
	        var _child$props2 = child.props,
	            anchor = _child$props2.anchor,
	            position = _child$props2.position,
	            offset = _child$props2.offset;
	
	        var c = _this3.latLngToPixel(anchor || position || center);
	
	        return _infact.Inferno.cloneVNode(child, {
	          left: c[0] - (offset ? offset[0] : 0),
	          top: c[1] - (offset ? offset[1] : 0),
	          latLngToPixel: _this3.latLngToPixel,
	          pixelToLatLng: _this3.pixelToLatLng,
	          mapState: mapState
	        });
	      });
	
	
	      return createVNode(2, 'div', {
	        'style': {
	          position: 'absolute',
	          width: width,
	          height: height,
	          top: 0,
	          left: 0
	        }
	      }, childrenWithProps);
	    }
	  }, {
	    key: 'renderAttribution',
	    value: function () {
	      var _props2 = this.props,
	          attribution = _props2.attribution,
	          attributionPrefix = _props2.attributionPrefix;
	
	      if (attribution === false) {
	        return null;
	      }
	
	      var linkStyle = {
	        color: '#0078A8',
	        textDecoration: 'none'
	      };
	
	      return createVNode(2, 'div', {
	        'className': 'pigeon-attribution',
	        'style': {
	          position: 'absolute',
	          bottom: 0,
	          right: 0,
	          fontSize: '11px',
	          padding: '2px 5px',
	          background: 'rgba(255, 255, 255, 0.7)',
	          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
	          color: '#333'
	        }
	      }, [attributionPrefix === false ? null : createVNode(2, 'span', null, [attributionPrefix || createVNode(2, 'a', {
	        'href': 'https://github.com/mariusandra/pigeon-maps',
	        'style': linkStyle
	      }, 'Pigeon'), ' | ']), attribution || createVNode(2, 'span', null, [' © ', createVNode(2, 'a', {
	        'href': 'https://www.openstreetmap.org/copyright',
	        'style': linkStyle
	      }, 'OpenStreetMap'), ' contributors'])], null, 'attr');
	    }
	  }, {
	    key: 'render',
	    value: function () {
	      var _props3 = this.props,
	          width = _props3.width,
	          height = _props3.height;
	
	      return createVNode(2, 'div', {
	        'style': {
	          width: width,
	          height: height,
	          position: 'relative',
	          display: 'inline-block',
	          overflow: 'hidden',
	          background: '#dddddd'
	        }
	      }, [this.renderTiles(), this.renderOverlays(), this.renderAttribution()], {
	        'onWheel': this.handleWheel
	      }, null, this.setRef);
	    }
	  }]);
	
	  return Map;
	}(_infact.Component);
	
	Map.propTypes = {};
	Map.defaultProps = {
	  animate: true
	};
	exports.default = Map;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// // infact = inferno + react
	
	exports.Inferno = __webpack_require__(3);
	exports.ReactDOM = exports.Inferno;
	exports.Component = __webpack_require__(5);
	exports.PropTypes = {};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parentPosition;
	function parentPosition(element) {
	  var x = 0;
	  var y = 0;
	  var first = true;
	
	  while (element) {
	    x += element.offsetLeft - (first ? 0 : element.scrollLeft) + element.clientLeft;
	    y += element.offsetTop - (first ? 0 : element.scrollTop) + element.clientTop;
	    element = element.offsetParent;
	    first = false;
	  }
	
	  return { x: x, y: y };
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = parentHasClass;
	function parentHasClass(element, className) {
	  while (element) {
	    if (element.classList.contains(className)) {
	      return true;
	    }
	    element = element.offsetParent;
	  }
	
	  return false;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = debounce;
	function debounce(func, wait) {
	  var timeout = void 0;
	  return function () {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    var context = this;
	    clearTimeout(timeout);
	    timeout = setTimeout(function () {
	      return func.apply(context, args);
	    }, wait);
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Cluster = __webpack_require__(15);
	
	var _Cluster2 = _interopRequireDefault(_Cluster);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Cluster2.default;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = Cluster;
	
	var _infact = __webpack_require__(2);
	
	var _supercluster = __webpack_require__(16);
	
	var _supercluster2 = _interopRequireDefault(_supercluster);
	
	var _DefaultClusterMarker = __webpack_require__(21);
	
	var _DefaultClusterMarker2 = _interopRequireDefault(_DefaultClusterMarker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var cloneElement = true ? _infact.Inferno.cloneVNode : _infact.React.cloneElement;
	
	var iLNG = 0,
	    iLAT = 1;
	var createVNode = _infact.Inferno.createVNode;
	function Cluster(props) {
	    if (!Array.isArray(props.children)) {
	        return props.children;
	    }
	    var mapState = props.mapState,
	        pixelToLatLng = props.pixelToLatLng,
	        latLngToPixel = props.latLngToPixel,
	        children = props.children,
	        _props$clusterMarkerR = props.clusterMarkerRadius,
	        clusterMarkerRadius = _props$clusterMarkerR === undefined ? 100 : _props$clusterMarkerR,
	        _props$maxZoom = props.maxZoom,
	        maxZoom = _props$maxZoom === undefined ? 16 : _props$maxZoom;
	
	
	    var markers = children.map(function (marker) {
	        var pixel = latLngToPixel(marker.props.anchor);
	        return cloneElement(marker, {
	            pixelToLatLng: pixelToLatLng,
	            latLngToPixel: latLngToPixel,
	            left: pixel[0],
	            top: pixel[1]
	        });
	    });
	
	    var pointsForClustering = markers.map(function (marker) {
	        return {
	            vNode: marker,
	            geometry: {
	                coordinates: marker.props.anchor
	            }
	        };
	    });
	
	    var index = (0, _supercluster2.default)({
	        radius: clusterMarkerRadius,
	        maxZoom: maxZoom
	    });
	
	    index.load(pointsForClustering);
	    var _mapState$bounds = mapState.bounds,
	        ne = _mapState$bounds.ne,
	        sw = _mapState$bounds.sw;
	    var _ref = [sw[iLNG], sw[iLAT], ne[iLNG], ne[iLAT]],
	        westLng = _ref[0],
	        southLat = _ref[1],
	        eastLng = _ref[2],
	        northLat = _ref[3];
	
	    var markersAndClusters = index.getClusters([westLng, southLat, eastLng, northLat], Math.floor(mapState.zoom));
	
	    var displayElements = markersAndClusters.map(function (markerOrCluster) {
	        var displayElement = void 0;
	        var isCluster = markerOrCluster && markerOrCluster.properties && markerOrCluster.properties.cluster;
	        if (isCluster) {
	            var pixelOffset = latLngToPixel(markerOrCluster.geometry.coordinates);
	            var clusterElementKey = markerOrCluster.geometry.coordinates.toString();
	            displayElement = createVNode(16, _DefaultClusterMarker2.default, {
	                'count': markerOrCluster.properties.point_count,
	                'pixelOffset': pixelOffset
	            }, null, null, clusterElementKey);
	        } else {
	            displayElement = markerOrCluster.vNode;
	        }
	        return displayElement;
	    });
	
	    return createVNode(2, 'div', {
	        'className': props.className || '',
	        'style': { position: 'absolute', height: mapState.height, width: mapState.width }
	    }, displayElements);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var kdbush = __webpack_require__(17);
	
	module.exports = supercluster;
	
	function supercluster(options) {
	    return new SuperCluster(options);
	}
	
	function SuperCluster(options) {
	    this.options = extend(Object.create(this.options), options);
	    this.trees = new Array(this.options.maxZoom + 1);
	}
	
	SuperCluster.prototype = {
	    options: {
	        minZoom: 0,   // min zoom to generate clusters on
	        maxZoom: 16,  // max zoom level to cluster the points on
	        radius: 40,   // cluster radius in pixels
	        extent: 512,  // tile extent (radius is calculated relative to it)
	        nodeSize: 64, // size of the KD-tree leaf node, affects performance
	        log: false    // whether to log timing info
	    },
	
	    load: function (points) {
	        var log = this.options.log;
	
	        if (log) console.time('total time');
	
	        var timerId = 'prepare ' + points.length + ' points';
	        if (log) console.time(timerId);
	
	        this.points = points;
	
	        // generate a cluster object for each point
	        var clusters = points.map(createPointCluster);
	        if (log) console.timeEnd(timerId);
	
	        // cluster points on max zoom, then cluster the results on previous zoom, etc.;
	        // results in a cluster hierarchy across zoom levels
	        for (var z = this.options.maxZoom; z >= this.options.minZoom; z--) {
	            var now = +Date.now();
	
	            // index input points into a KD-tree
	            this.trees[z + 1] = kdbush(clusters, getX, getY, this.options.nodeSize, Float32Array);
	
	            clusters = this._cluster(clusters, z); // create a new set of clusters for the zoom
	
	            if (log) console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now);
	        }
	
	        // index top-level clusters
	        this.trees[this.options.minZoom] = kdbush(clusters, getX, getY, this.options.nodeSize, Float32Array);
	
	        if (log) console.timeEnd('total time');
	
	        return this;
	    },
	
	    getClusters: function (bbox, zoom) {
	        var tree = this.trees[this._limitZoom(zoom)];
	        var ids = tree.range(lngX(bbox[0]), latY(bbox[3]), lngX(bbox[2]), latY(bbox[1]));
	        var clusters = [];
	        for (var i = 0; i < ids.length; i++) {
	            var c = tree.points[ids[i]];
	            clusters.push(c.id !== -1 ? this.points[c.id] : getClusterJSON(c));
	        }
	        return clusters;
	    },
	
	    getTile: function (z, x, y) {
	        var tree = this.trees[this._limitZoom(z)];
	        var z2 = Math.pow(2, z);
	        var extent = this.options.extent;
	        var r = this.options.radius;
	        var p = r / extent;
	        var top = (y - p) / z2;
	        var bottom = (y + 1 + p) / z2;
	
	        var tile = {
	            features: []
	        };
	
	        this._addTileFeatures(
	            tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
	            tree.points, x, y, z2, tile);
	
	        if (x === 0) {
	            this._addTileFeatures(
	                tree.range(1 - p / z2, top, 1, bottom),
	                tree.points, z2, y, z2, tile);
	        }
	        if (x === z2 - 1) {
	            this._addTileFeatures(
	                tree.range(0, top, p / z2, bottom),
	                tree.points, -1, y, z2, tile);
	        }
	
	        return tile.features.length ? tile : null;
	    },
	
	    _addTileFeatures: function (ids, points, x, y, z2, tile) {
	        for (var i = 0; i < ids.length; i++) {
	            var c = points[ids[i]];
	            tile.features.push({
	                type: 1,
	                geometry: [[
	                    Math.round(this.options.extent * (c.x * z2 - x)),
	                    Math.round(this.options.extent * (c.y * z2 - y))
	                ]],
	                tags: c.id !== -1 ? this.points[c.id].properties : getClusterProperties(c)
	            });
	        }
	    },
	
	    _limitZoom: function (z) {
	        return Math.max(this.options.minZoom, Math.min(z, this.options.maxZoom + 1));
	    },
	
	    _cluster: function (points, zoom) {
	        var clusters = [];
	        var r = this.options.radius / (this.options.extent * Math.pow(2, zoom));
	
	        // loop through each point
	        for (var i = 0; i < points.length; i++) {
	            var p = points[i];
	            // if we've already visited the point at this zoom level, skip it
	            if (p.zoom <= zoom) continue;
	            p.zoom = zoom;
	
	            // find all nearby points
	            var tree = this.trees[zoom + 1];
	            var neighborIds = tree.within(p.x, p.y, r);
	
	            var foundNeighbors = false;
	            var numPoints = p.numPoints;
	            var wx = p.x * numPoints;
	            var wy = p.y * numPoints;
	
	            for (var j = 0; j < neighborIds.length; j++) {
	                var b = tree.points[neighborIds[j]];
	                // filter out neighbors that are too far or already processed
	                if (zoom < b.zoom) {
	                    foundNeighbors = true;
	                    b.zoom = zoom; // save the zoom (so it doesn't get processed twice)
	                    wx += b.x * b.numPoints; // accumulate coordinates for calculating weighted center
	                    wy += b.y * b.numPoints;
	                    numPoints += b.numPoints;
	                }
	            }
	
	            clusters.push(foundNeighbors ? createCluster(wx / numPoints, wy / numPoints, numPoints, -1) : p);
	        }
	
	        return clusters;
	    }
	};
	
	function createCluster(x, y, numPoints, id) {
	    return {
	        x: x, // weighted cluster center
	        y: y,
	        zoom: Infinity, // the last zoom the cluster was processed at
	        id: id, // index of the source feature in the original input array
	        numPoints: numPoints
	    };
	}
	
	function createPointCluster(p, i) {
	    var coords = p.geometry.coordinates;
	    return createCluster(lngX(coords[0]), latY(coords[1]), 1, i);
	}
	
	function getClusterJSON(cluster) {
	    return {
	        type: 'Feature',
	        properties: getClusterProperties(cluster),
	        geometry: {
	            type: 'Point',
	            coordinates: [xLng(cluster.x), yLat(cluster.y)]
	        }
	    };
	}
	
	function getClusterProperties(cluster) {
	    var count = cluster.numPoints;
	    var abbrev = count >= 10000 ? Math.round(count / 1000) + 'k' :
	                 count >= 1000 ? (Math.round(count / 100) / 10) + 'k' : count;
	    return {
	        cluster: true,
	        point_count: count,
	        point_count_abbreviated: abbrev
	    };
	}
	
	// longitude/latitude to spherical mercator in [0..1] range
	function lngX(lng) {
	    return lng / 360 + 0.5;
	}
	function latY(lat) {
	    var sin = Math.sin(lat * Math.PI / 180),
	        y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
	    return y < 0 ? 0 :
	           y > 1 ? 1 : y;
	}
	
	// spherical mercator to longitude/latitude
	function xLng(x) {
	    return (x - 0.5) * 360;
	}
	function yLat(y) {
	    var y2 = (180 - y * 360) * Math.PI / 180;
	    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
	}
	
	function extend(dest, src) {
	    for (var id in src) dest[id] = src[id];
	    return dest;
	}
	
	function getX(p) {
	    return p.x;
	}
	function getY(p) {
	    return p.y;
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sort = __webpack_require__(18);
	var range = __webpack_require__(19);
	var within = __webpack_require__(20);
	
	module.exports = kdbush;
	
	function kdbush(points, getX, getY, nodeSize, ArrayType) {
	    return new KDBush(points, getX, getY, nodeSize, ArrayType);
	}
	
	function KDBush(points, getX, getY, nodeSize, ArrayType) {
	    getX = getX || defaultGetX;
	    getY = getY || defaultGetY;
	    ArrayType = ArrayType || Array;
	
	    this.nodeSize = nodeSize || 64;
	    this.points = points;
	
	    this.ids = new ArrayType(points.length);
	    this.coords = new ArrayType(points.length * 2);
	
	    for (var i = 0; i < points.length; i++) {
	        this.ids[i] = i;
	        this.coords[2 * i] = getX(points[i]);
	        this.coords[2 * i + 1] = getY(points[i]);
	    }
	
	    sort(this.ids, this.coords, this.nodeSize, 0, this.ids.length - 1, 0);
	}
	
	KDBush.prototype = {
	    range: function (minX, minY, maxX, maxY) {
	        return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
	    },
	
	    within: function (x, y, r) {
	        return within(this.ids, this.coords, x, y, r, this.nodeSize);
	    }
	};
	
	function defaultGetX(p) { return p[0]; }
	function defaultGetY(p) { return p[1]; }


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = sortKD;
	
	function sortKD(ids, coords, nodeSize, left, right, depth) {
	    if (right - left <= nodeSize) return;
	
	    var m = Math.floor((left + right) / 2);
	
	    select(ids, coords, m, left, right, depth % 2);
	
	    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
	    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
	}
	
	function select(ids, coords, k, left, right, inc) {
	
	    while (right > left) {
	        if (right - left > 600) {
	            var n = right - left + 1;
	            var m = k - left + 1;
	            var z = Math.log(n);
	            var s = 0.5 * Math.exp(2 * z / 3);
	            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
	            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
	            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
	            select(ids, coords, k, newLeft, newRight, inc);
	        }
	
	        var t = coords[2 * k + inc];
	        var i = left;
	        var j = right;
	
	        swapItem(ids, coords, left, k);
	        if (coords[2 * right + inc] > t) swapItem(ids, coords, left, right);
	
	        while (i < j) {
	            swapItem(ids, coords, i, j);
	            i++;
	            j--;
	            while (coords[2 * i + inc] < t) i++;
	            while (coords[2 * j + inc] > t) j--;
	        }
	
	        if (coords[2 * left + inc] === t) swapItem(ids, coords, left, j);
	        else {
	            j++;
	            swapItem(ids, coords, j, right);
	        }
	
	        if (j <= k) left = j + 1;
	        if (k <= j) right = j - 1;
	    }
	}
	
	function swapItem(ids, coords, i, j) {
	    swap(ids, i, j);
	    swap(coords, 2 * i, 2 * j);
	    swap(coords, 2 * i + 1, 2 * j + 1);
	}
	
	function swap(arr, i, j) {
	    var tmp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = tmp;
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = range;
	
	function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
	    var stack = [0, ids.length - 1, 0];
	    var result = [];
	    var x, y;
	
	    while (stack.length) {
	        var axis = stack.pop();
	        var right = stack.pop();
	        var left = stack.pop();
	
	        if (right - left <= nodeSize) {
	            for (var i = left; i <= right; i++) {
	                x = coords[2 * i];
	                y = coords[2 * i + 1];
	                if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[i]);
	            }
	            continue;
	        }
	
	        var m = Math.floor((left + right) / 2);
	
	        x = coords[2 * m];
	        y = coords[2 * m + 1];
	
	        if (x >= minX && x <= maxX && y >= minY && y <= maxY) result.push(ids[m]);
	
	        var nextAxis = (axis + 1) % 2;
	
	        if (axis === 0 ? minX <= x : minY <= y) {
	            stack.push(left);
	            stack.push(m - 1);
	            stack.push(nextAxis);
	        }
	        if (axis === 0 ? maxX >= x : maxY >= y) {
	            stack.push(m + 1);
	            stack.push(right);
	            stack.push(nextAxis);
	        }
	    }
	
	    return result;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = within;
	
	function within(ids, coords, qx, qy, r, nodeSize) {
	    var stack = [0, ids.length - 1, 0];
	    var result = [];
	    var r2 = r * r;
	
	    while (stack.length) {
	        var axis = stack.pop();
	        var right = stack.pop();
	        var left = stack.pop();
	
	        if (right - left <= nodeSize) {
	            for (var i = left; i <= right; i++) {
	                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) result.push(ids[i]);
	            }
	            continue;
	        }
	
	        var m = Math.floor((left + right) / 2);
	
	        var x = coords[2 * m];
	        var y = coords[2 * m + 1];
	
	        if (sqDist(x, y, qx, qy) <= r2) result.push(ids[m]);
	
	        var nextAxis = (axis + 1) % 2;
	
	        if (axis === 0 ? qx - r <= x : qy - r <= y) {
	            stack.push(left);
	            stack.push(m - 1);
	            stack.push(nextAxis);
	        }
	        if (axis === 0 ? qx + r >= x : qy + r >= y) {
	            stack.push(m + 1);
	            stack.push(right);
	            stack.push(nextAxis);
	        }
	    }
	
	    return result;
	}
	
	function sqDist(ax, ay, bx, by) {
	    var dx = ax - bx;
	    var dy = ay - by;
	    return dx * dx + dy * dy;
	}


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = DefaultClusterMarker;
	
	var _infact = __webpack_require__(2);
	
	var colors = {
	    small: ['rgba(181, 226, 140, 0.6)', 'rgba(110, 204, 57, 0.7)'],
	    medium: ['rgba(241, 211, 87, 0.6)', 'rgba(240, 194, 12, 0.7)'],
	    big: ['rgba(253, 156, 115, 0.6)', 'rgba(241, 128, 23, 0.7)']
	};
	var defaultCountToColor = function defaultCountToColor(count) {
	    return count > 20 ? colors.big : count > 7 ? colors.medium : colors.small;
	};
	
	var styleFromCount = function styleFromCount(count) {
	    var colors = defaultCountToColor(count);
	    return {
	        width: 30,
	        height: 30,
	        borderRadius: '50%',
	        borderWidth: 3,
	        borderColor: colors[0],
	        borderStyle: 'solid',
	        background: colors[1],
	        position: 'absolute',
	        display: 'flex',
	        flexDirection: 'column',
	        justifyContent: 'center',
	        textAlign: 'center',
	        cursor: 'default'
	    };
	};
	
	var createVNode = _infact.Inferno.createVNode;
	function DefaultClusterMarker(_ref) {
	    var pixelOffset = _ref.pixelOffset,
	        count = _ref.count;
	
	    return createVNode(2, 'div', {
	        'style': Object.assign(styleFromCount(count), {
	            left: pixelOffset[0],
	            top: pixelOffset[1]
	        })
	    }, count);
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	if (true) {
	  module.exports = __webpack_require__(23)
	}
	if (false) {
	  module.exports = require('./lib/react/index.js')
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _infact = __webpack_require__(24);
	
	var _pin = __webpack_require__(25);
	
	var _pin2 = _interopRequireDefault(_pin);
	
	var _pin2x = __webpack_require__(26);
	
	var _pin2x2 = _interopRequireDefault(_pin2x);
	
	var _pinHover = __webpack_require__(27);
	
	var _pinHover2 = _interopRequireDefault(_pinHover);
	
	var _pinHover2x = __webpack_require__(28);
	
	var _pinHover2x2 = _interopRequireDefault(_pinHover2x);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var imageOffset = {
	  left: 15,
	  top: 31
	};
	
	var createVNode = _infact.Inferno.createVNode;
	
	var Marker = function (_Component) {
	  _inherits(Marker, _Component);
	
	  function Marker(props) {
	    _classCallCheck(this, Marker);
	
	    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props));
	
	    _this.eventParameters = function (event) {
	      return {
	        event: event,
	        anchor: _this.props.anchor,
	        payload: _this.props.payload
	      };
	    };
	
	    _this.handleClick = function () {
	      _this.props.onClick && _this.props.onClick(_this.eventParameters());
	    };
	
	    _this.handleContextMenu = function () {
	      _this.props.onContextMenu && _this.props.onContextMenu(_this.eventParameters());
	    };
	
	    _this.handleMouseOver = function () {
	      _this.props.onMouseOver && _this.props.onMouseOver(_this.eventParameters());
	      _this.setState({ hover: true });
	    };
	
	    _this.handleMouseOut = function () {
	      _this.props.onMouseOut && _this.props.onMouseOut(_this.eventParameters());
	      _this.setState({ hover: false });
	    };
	
	    _this.state = {
	      hover: false
	    };
	    return _this;
	  }
	
	  // what do you expect to get back with the event
	
	
	  _createClass(Marker, [{
	    key: 'isRetina',
	
	    // controls
	    value: function () {
	      return typeof window !== 'undefined' && window.devicePixelRatio >= 2;
	    }
	
	    // modifiers
	
	  }, {
	    key: 'isHover',
	    value: function () {
	      return typeof this.props.hover === 'boolean' ? this.props.hover : this.state.hover;
	    }
	  }, {
	    key: 'image',
	    value: function () {
	      return this.isRetina() ? this.isHover() ? _pinHover2x2.default : _pin2x2.default : this.isHover() ? _pinHover2.default : _pin2.default;
	    }
	
	    // lifecycle
	
	  }, {
	    key: 'componentDidMount',
	    value: function () {
	      var images = this.isRetina() ? [_pin2x2.default, _pinHover2x2.default] : [_pin2.default, _pinHover2.default];
	
	      images.forEach(function (image) {
	        var img = new window.Image();
	        img.src = image;
	      });
	    }
	
	    // delegators
	
	  }, {
	    key: 'render',
	
	    // render
	
	    value: function () {
	      var _props = this.props,
	          left = _props.left,
	          top = _props.top,
	          onClick = _props.onClick;
	
	      var style = {
	        position: 'absolute',
	        transform: 'translate(' + (left - imageOffset.left) + 'px, ' + (top - imageOffset.top) + 'px)',
	        cursor: onClick ? 'pointer' : 'default'
	      };
	
	      return createVNode(2, 'div', {
	        'style': style,
	        'className': 'pigeon-click-block'
	      }, createVNode(2, 'img', {
	        'src': this.image(),
	        'width': 29,
	        'height': 34,
	        'alt': ''
	      }), {
	        'onClick': this.handleClick,
	        'onContextMenu': this.handleContextMenu,
	        'onMouseOver': this.handleMouseOver,
	        'onMouseOut': this.handleMouseOut
	      });
	    }
	  }]);
	
	  return Marker;
	}(_infact.Component);
	
	Marker.propTypes = {};
	exports.default = Marker;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// // infact = inferno + react
	
	exports.Inferno = __webpack_require__(3);
	exports.ReactDOM = exports.Inferno;
	exports.Component = __webpack_require__(5);
	exports.PropTypes = {};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin.png";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin@2x.png";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin-hover.png";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pin-hover@2x.png";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
]);