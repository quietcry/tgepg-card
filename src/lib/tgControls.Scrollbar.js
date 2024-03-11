/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgControls } from "./tgControls.js";
import { tgDefaultsScrollbar } from '../defaults_Scrollbar.js';


export class tgControlScrollbar extends tgControls
	{
	constructor(mode="open", props={})
		{
		super(mode, new tgDefaultsScrollbar());
		var that=this;
		// default Parameter nach Props einlesen
		//this.tgEpgDefaults=new tgDefaultsScrollbar(this);
		// default Parameter nach Props einlesen
		//this.tgEpgDefaults=new tgEpgAppDefaults(this);
		// this["PROPS"]=this._extender( (this["PROPS"] || {}),
		// 				{
		// 				defaults:this.tgEpgDefaults.loadDefaults(),
		// 				run:this.tgEpgDefaults.loadRun(),
		// 				set:this.tgEpgDefaults.loadSet()
		// 				});
		// Props durch hartcodierte Werte erweitern/anpassen
		this["PROPS"]=this._extender( (this["PROPS"] || {}),
						{
						run:	{
								msg:	{
										log:true,
										debug:true,
										error:true
										},
								},
						default:{connected:0},
						paras:this._extender({})
						});
		// Props durch im Storage gespeichertes erweitern/anpassen
		// this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));

		//this._debug("constructor - Parameters", "props:",this["PROPS"]);




		this._containerWidth=null;
		this._supermaster=null;
		this.supressScrollEvent=false;
		this._scrollWidth=0;
		this._direction=null;
		this._pos="bottom";
		this._reportto=null;
		this._reporttoElement=null;
		this._getSizeXFromElement=null;
		this._getSizeYFromElement=null;
		this.container = this._shadowRoot.querySelector('[name="container"]');
		this._parent=this.parentNode;
		this._ChildVisibleRect={x:0,y:0,width:0,height:0};
		this.myObserver = new ResizeObserver(entries =>
			{
			var ev = new CustomEvent('resize');
			this.dispatchEvent(ev);
		  	});

		}


	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################

		
	//######################################################################################################################################
	//
	// properties()
	// collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
	//
	//######################################################################################################################################
	static get properties()
		{
		let props=	tgEpgAppDefaults.properties || {};
		let superProps=super.properties||{};
		props=Object.assign(superProps,props);
		return props;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	static get observedAttributes()
	 	{
		// let props=super.observedAttributes||[];
		// props.push("direction")
		return ["pos","reportto","getsizefrom","getxsizefrom","getysizefrom"];
  	 	}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	connectedCallback ()
		{
		var that=this;
		console.debug("connectedCallback", "start");
		if (this.PROPS.run.connected == 0)
		 	{
		 	this.init();
			// this.refreshAppSizeAfterResizeOrInit();
		 	// this.buildApp();
		 	this.connected();
		 	}
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	attributeChangedCallback(attrName, oldVal, newVal)
		{
		if ( oldVal===newVal) return;
		oldVal=oldVal || this.PROPS.paras[attrName];
		super.attributeChangedCallback(attrName, newVal, oldVal );
		this.PROPS.paras[attrName]=newVal;
		switch (attrName)
			{
			case "pos":
				if ( (newVal == "top") || (newVal == "bottom") || (newVal == "left") || (newVal == "right"))
					{
					this._pos=newVal
					this._direction=( (newVal == "top") || (newVal == "bottom"))?"horizontal":((newVal == "left") || (newVal == "right"))?"vertical":this._direction;
					this.init()
					}
				break;
			case "reportto":
				this._reporttoElement=getParent.call(this,newVal)
				break;
			case "getsizefrom":

				if (newVal != "")
					{
					this._getSizeXFromElement=getParent.call(this,newVal)
					this._getSizeYFromElement=this._getSizeXFromElement;
					}
				break;
			case "getxsizefrom":
				if (newVal != "")
					{
					this._getSizeXFromElement=getParent.call(this,newVal)
					}
				break;
			case "getysizefrom":
				if (newVal != "")
					{
					this._getSizeYFromElement=getParent.call(this,newVal)
					}
				break;
			default:
				break;
			}
		function getParent(selector="body")
			{
			var root = this;
			while (root.parentNode)
				{
				if (root.querySelector(selector))
					{
					return root.querySelector(selector);
					}
				root = root.parentNode;
				}
			return root.querySelector(selector)
			}

		}
	//######################################################################################################################################
	getParent(selector="body")
		{
		var root = this;
		while (root.parentNode)
			{
			if (root.querySelector(selector))
				{
				return root.querySelector(selector);
				}
			root = root.parentNode;
			}
		return root.querySelector(selector)
		}
	render()
		{
		this.init()
		}
	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	init()
		{
		var that=this;
		var sbo="scrollbarobserver"
		if (! this._parent.hasAttribute(sbo))
			{
			this.myObserver.observe(this._parent);
			this.addEventListener("resize",
			function(ev)
				{
				this.init();
				}, false);

			this._parent.setAttribute(sbo,"1")
			}
		var parent=this._parent.getBoundingClientRect()
		//this.getParent('[name="tgEpgProgList"]')
		if (this.PROPS.paras["getsizefrom"])
			{
			this._getSizeXFromElement=this.getParent(this.PROPS.paras["getsizefrom"])
			this._getSizeYFromElement=this._getSizeXFromElement
			}
		if (this.PROPS.paras["getxsizefrom"])
			{
			this._getSizeXFromElement=this.getParent(this.PROPS.paras["getxsizefrom"])
			}
		if (this.PROPS.paras["getysizefrom"])
			{
			this._getSizeYFromElement=this.getParent(this.PROPS.paras["getysizefrom"])
			}
		if (( ! this._direction)
			|| ((this._direction=="horizontal") && ( ! this._getSizeXFromElement))
			|| ((this._direction=="vertical") && ( ! this._getSizeYFromElement)))
			return;

		if (this._direction=="horizontal")
			{
			if (! this._getSizeXFromElement.hasAttribute(sbo))
				{
				this.myObserver.observe(this._getSizeXFromElement);
				this._getSizeXFromElement.setAttribute(sbo,"1")
				}
			this.style.right="0px";
			this.style.width=(parent.width-((this._getSizeXFromElement.getBoundingClientRect().x+this._getSizeXFromElement.parentNode.scrollLeft)-parent.x))+"px"
			this.container.style.width=this._getSizeXFromElement.getBoundingClientRect().width+"px"
			this.style.display=(this.offsetWidth>this.container.offsetWidth)?"none":""
			this.supressScrollEvent=true
			this.scrollLeft=this._getSizeXFromElement.parentNode.scrollLeft
			}
		else if (this._direction=="vertical")
			{
			if (! this._getSizeYFromElement.hasAttribute(sbo))
				{
				this.myObserver.observe(this._getSizeYFromElement);
				this._getSizeYFromElement.setAttribute(sbo,"1")
				}

			this.style.bottom="0px";
			this.style.height=(parent.height-(this._getSizeXFromElement.getBoundingClientRect().y-parent.y))+"px"
			this.container.style.height=this._getSizeXFromElement.getBoundingClientRect().height+"px"
			this.style.display=(this.offsetHeight>this.container.offsetHeight)?"none":""
			this.scrollTop=this._getSizeXFromElement.scrollTop
			}
		if ((! this.hasAttribute("hasScrollHandler")) || (parseInt(this.getAttribute("hasScrollHandler")) !== 1) )
			{
			this.setAttribute("hasScrollHandler", "1");
			this.addEventListener("scroll", function(ev)
				{
				if ( ! that.supressScrollEvent )
					{
					let offset=(that._direction == "horizontal")?that.scrollLeft:that.scrollTop;
					var ev = new CustomEvent('scrolled',
						{
						detail:
							{
							direction: that._direction,
							scrollwidth: offset,
							},
						});
					//console.log("scrollevent",this, this._getSizeXFromElement.parentNode)
					if (this._reporttoElement)
						{
						this._reporttoElement.dispatchEvent(ev);
						}
					else
						{
						this._getSizeXFromElement.parentNode.scrollLeft=offset;
						this.dispatchEvent(ev);
						}
					}
				that.supressScrollEvent = false

				}, false);
			}

		return;
		}
	//######################################################################################################################################
	//scrollIt()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	scrollIt()
		{
		var that=this;
		var direction=this.getAttribute("direction");
			switch (direction)
				{
				case "horizontal":
					this.scrollLeft =this._scrollWidth
					break;
				case "vertical":
					this.scrollTop =this._scrollWidth
					break;
				default:
					break;
				}
		//this.supressScrollEvent = false
		return
		}

	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################
	get supermaster()
		{
		return this._supermaster;
		}
	set supermaster(val)
		{
		this["_supermaster"]=val;
		}
	get scrollWidth()
		{
		return this._scrollWidth;
		}
	set scrollWidth(val)
		{
		if (parseFloat(val)	!== this._scrollWidth)
			{
			this["_scrollWidth"]=parseFloat(val)
			this.supressScrollEvent=true
			this.scrollIt()
			}
		}


	//############################################################################################################################################
	//############################################################################################################################################
	}

window.customElements.define('tgcontrol-scrollbar', tgControlScrollbar);
