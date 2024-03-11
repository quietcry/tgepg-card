/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgControls } from '../tgControls.js';

export class tgEpgTooltipp extends tgControls
	{
	constructor(properties)
		{
		super("open");
		var that=this;
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
		this.supressScrollEvent=0;
		this._scrollWidth=0;
		this._direction=null;
		this.container = this.shadowRoot.querySelector('[name="container"]');



/*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */


		//this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
		////this._debug("JSON", this.readOptions(this.PROPS.defaults._storageKey))
		//this.PROPS.run.topElements = [this.app, this.icon];

		//this._log("construction ended", "props:",this.PROPS, "me:", this);
		//this._debug("constructor - constructed");

		}


	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	template()
		{
		let tmp = `
			<style>
			:host
				{
				position:absolute;
				z-index:2001;
				background-color:white;
				max-width:40%;
				max-height:50%;
				padding:4px;
				}
			div
				{
				white-space: normal;
				}
			.hide
				{
				display:none;
				}
			.nowrap
				{
				display: inline-block;
				white-space: nowrap;
				}
			</style>
			<div>
				<slot name="subtitleslot"></slot>
			</div>
			<div>
				<slot name="titleslot"></slot>
			</div>
			<div class="nowrap">
				<slot name="dateslot"></slot><slot name="startslot" class="nowrap"></slot>-<slot name="endslot" class="nowrap"></slot> <slot name="durationslot" class="nowrap"></slot>
			</div>
			`
		return tmp;
		}
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
		return ["direction"];
  	 	}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	connectedCallback ()
		{
		var that=this;
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
			case "direction":
				if ( (newVal == "horizontal") || (newVal == "vertical"))
					{
					this._direction=newVal
					this.init()
					}
				break;
			default:
				break;
			}
		}
	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	init()
		{
		var that=this;
		//var direction=this.getAttribute("direction");
		if ((this._containerWidth) && (this._direction == "horizontal"))
			{
			this.container.style.width=this._containerWidth+"px"
			}
		else if ((this._containerWidth) && (this._direction == "vertical"))
			{
			this.container.style.height=this._containerWidth+"px"
			}
		else
			{
			return;
			}
			if ((! this.hasAttribute("hasScrollHandler")) || (parseInt(this.getAttribute("hasScrollHandler")) !== 1) )
				{
				this.setAttribute("hasScrollHandler", "1");
				this.addEventListener("scroll", function(ev)
					{
					if (that.supressScrollEvent !== 1)
						{
						let offset=(that._direction == "horizontal")?that.scrollLeft:that.scrollTop;
						var ev = new CustomEvent('scrollbar',
								{
								detail:
									{
							  		direction: that._direction,
							  		scrollwidth: offset,
									},
						  		});
						this.dispatchEvent(ev);
						}
					that.supressScrollEvent = 0

					}, false);
				}
		return
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
		if (this.supressScrollEvent == 1)
			{
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
			}
		this.supressScrollEvent = 0
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

	get containerWidth()
		{
		return this._containerWidth;
		}
	set containerWidth(val)
		{
		this._log("containerWidth", val)
		if (parseFloat(val)	!== this._containerWidth)
			{
			this["_containerWidth"]=parseFloat(val)
			this.init()
			}
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
			this.supressScrollEvent=1
			this.scrollIt()
			}
		}


	//############################################################################################################################################
	//############################################################################################################################################
	}

window.customElements.define('tgepg-tooltipp', tgEpgTooltipp);
