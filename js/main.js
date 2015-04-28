$( document ).ready(function() {
   // Create an immediately invoked functional expression to wrap our code
(function() {

  // Define our constructor 
  this.Modal = function() {

    // Create global element references
    this.closeButton = null;
    this.modal = null;
    this.overlay = null;

    // Determine proper prefix
    this.transitionEnd = transitionSelect();

    // Define option defaults 
    var defaults = {
      autoOpen: false,
      className: 'fade-and-drop',
      closeButton: true,
      content: "",
      maxWidth: 600,
      minWidth: 280,
      overlay: true
    }

    // Create options by extending defaults with the passed in arugments
    if (arguments[0] && typeof arguments[0] === "object") {
      this.options = extendDefaults(defaults, arguments[0]);
    }

    if(this.options.autoOpen === true) this.open();

  }

  // Public Methods

  Modal.prototype.close = function() {
    var _ = this;
    this.modal.className = this.modal.className.replace(" scotch-open", "");
    this.overlay.className = this.overlay.className.replace(" scotch-open",
      "");
    this.modal.addEventListener(this.transitionEnd, function() {
      _.modal.parentNode.removeChild(_.modal);
    });
    this.overlay.addEventListener(this.transitionEnd, function() {
      if(_.overlay.parentNode) _.overlay.parentNode.removeChild(_.overlay);
    });
  }

  Modal.prototype.open = function() {
    buildOut.call(this);
    initializeEvents.call(this);
    window.getComputedStyle(this.modal).height;
    this.modal.className = this.modal.className +
      (this.modal.offsetHeight > window.innerHeight ?
        " scotch-open scotch-anchored" : " scotch-open");
    this.overlay.className = this.overlay.className + " scotch-open";
  }

  // Private Methods

  function buildOut() {

    var content, contentHolder, docFrag;

    /*
     * If content is an HTML string, append the HTML string.
     * If content is a domNode, append its content.
     */

    if (typeof this.options.content === "string") {
      content = this.options.content;
    } else {
      content = this.options.content.innerHTML;
    }

    // Create a DocumentFragment to build with
    docFrag = document.createDocumentFragment();

    // Create modal element
    this.modal = document.createElement("div");
    this.modal.className = "scotch-modal " + this.options.className;
    this.modal.style.minWidth = this.options.minWidth + "px";
    this.modal.style.maxWidth = this.options.maxWidth + "px";

    // If closeButton option is true, add a close button
    if (this.options.closeButton === true) {
      this.closeButton = document.createElement("button");
      this.closeButton.className = "scotch-close close-button";
      this.closeButton.innerHTML = "&times;";
      this.modal.appendChild(this.closeButton);
    }

    // If overlay is true, add one
    if (this.options.overlay === true) {
      this.overlay = document.createElement("div");
      this.overlay.className = "scotch-overlay " + this.options.className;
      docFrag.appendChild(this.overlay);
    }

    // Create content area and append to modal
    contentHolder = document.createElement("div");
    contentHolder.className = "scotch-content";
    contentHolder.innerHTML = content;
    this.modal.appendChild(contentHolder);

    // Append modal to DocumentFragment
    docFrag.appendChild(this.modal);

    // Append DocumentFragment to body
    document.body.appendChild(docFrag);

  }

  function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
  }

  function initializeEvents() {

    if (this.closeButton) {
      this.closeButton.addEventListener('click', this.close.bind(this));
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.close.bind(this));
    }

  }

  function transitionSelect() {
    var el = document.createElement("div");
    if (el.style.WebkitTransition) return "webkitTransitionEnd";
    if (el.style.OTransition) return "oTransitionEnd";
    return 'transitionend';
  }

}());

var myContent = document.getElementById('content');

var myModal = new Modal({
  content: myContent
});

// Functions and arrays to choose event listener options

function getRandomInt(max, min) {                    
	// console.log ('max & min ', max, min);
	var integ = Math.floor(Math.random() * (max - min)) + min;
	// console.log('array index is '+integ);
  return integ
};

var docSelectors = ["getElementById", "getElementByClassName", "querySelector"];
var docEls = ["h1", "p", "a"];

var ids = ['trigger', 'content'];
var classes = ['trigger-button', 'whatever'];


function getChoice (arr) {
	// debugger
	// console.log(arr);
	// console.log(arr.length);
  var choice = arr[getRandomInt(arr.length,0)];
  return choice
};

// Variables to point to event listener options
var selector = getChoice(docSelectors);
	console.log('selector is '+selector);



var docEl = getChoice(docEls);
	console.log('docEl is '+docEl);
var theID = getChoice(ids);
	console.log('theID is '+theID);
var theClass = getChoice(classes);
	console.log('theClass is '+theClass);

var selectorOptions = new Array (theID, theClass, docEl );

// **Need to re-assign trigger button to random document event listeners
// key events, scroll events, change events, mouse clicks, mouse motion events , focus events
//set timeout, waiting x ms with no activity, 
// document., 
// getElementById, class, tag
var assemble = function (selector) {
	
	function matchSelector (selector) {
		for (i=0; i < docSelectors.length; i++){
			if (selector === docSelectors[i]){
				console.log ('selector '+selector+' is matched to '+docSelectors[i]+' returning index '+i)
				return i
			}
		}
	};
	
	function getRelatedItem (i){
		var itemType = selectorOptions[i];  
			console.log('item type is '+itemType);
			// debugger
			return itemType
	};
	var itemType = getRelatedItem(matchSelector(selector));

	var trigger = document[selector](itemType);
	console.log('trigger is '+trigger);
	return trigger
}

var funTriggerButton = assemble(selector);
console.log('fun trigger button is '+funTriggerButton);

funTriggerButton.addEventListener('click', function() {
  myModal.open();
});

var triggerButton = document.getElementById('trigger');

triggerButton.addEventListener('click', function() {
  myModal.open();
});

});
