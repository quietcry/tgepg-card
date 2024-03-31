/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgControls } from '../tgControls.js';
import { tgEpgToolTippDefaults } from "../../defaults_Tooltipp.js";

export class tgEpgTooltipp extends tgControls
	{
	constructor(mode="open", props={})
		{
		super(mode, new tgEpgToolTippDefaults(), props);
		var that=this;
	
		// default Parameter nach Props einlesen
		this["PROPS"]=this._extender(	{},
										this["PROPS"]||{},
										{
										default:	{
													msg:	{
															log:true,
															debug:true,
															error:true
															},
													},
											attr:		this._extender({},tgEpgTooltipp.properties)
											}
										)
			this["PROPS"]["run"]=this._extender	(	this["PROPS"]["default"]||{},
													this["PROPS"]["run"]||{},
													props
												)
			this.app = this.shadowRoot.querySelector('[name="app"]');


		// this._containerWidth=null;
		// this._supermaster=null;
		// this.supressScrollEvent=0;
		// this._scrollWidth=0;
		// this._direction=null;
		// this.container = this.shadowRoot.querySelector('[name="container"]');



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

	//######################################################################################################################################
	//
	// properties()
	// collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
	//
	//######################################################################################################################################
	connectedCallback ()
		{
		var that=this;
		if (this.PROPS.run.connected == 0)
		 	{
		 	this.connected();
		 	}
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	static get properties()
		{
		let defProps=tgEpgToolTippDefaults.properties || {};
		let props= 	{
					timelinestart:null,
					enableTimemarker:false,
					enableToolTipp:false
					};
		let superProps=super.properties||{};
		props=Object.assign(superProps,defProps,props);
		return props;
		}
	//######################################################################################################################################
	static get observedAttributes() 
		{
		let props=Object.keys(tgEpgTooltipp.properties)
        return props;
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
	refresh()
		{
		if (! this.calculateRect()) return
		
		var that=this	
		this.classList.remove("hide")
		let style=this.calculatePos()
		
		console.log(style, this.PROPS.run.data)
		setStyle(style)
		function setStyle(sty)
			{
			var myKeys=Object.keys(sty)
			for (let i = 0; i < myKeys.length; i++)
				{
				that.style[myKeys[i]] = sty[myKeys[i]];
				}
			}

		}	
	calculatePos()
		{
		let style={left:"0px",top:"0px"}	
		let client=this.getBoundingClientRect()
console.log(client)

			// let tmpLeft=basis.x-client.x
			// let tmpRight=(basis.x+basis.width)-(client.x+client.width)
			// let tmpTop=basis.y-client.y
			// let tmpBottom=(basis.y+basis.height)-(client.y+client.height)
			// tmpLeft=(tmpRight<=0)?0:tmpLeft
			// tmpRight=(tmpRight<=0)?0:tmpRight
			// tmpTop=(tmpTop<=0)?0:tmpTop
			// tmpBottom=(tmpBottom<=0)?0:tmpBottom
		return style
		}
	calculateRect()
		{
		if (this.PROPS.run.visibleRect) return true	
		this.PROPS.run.host=this.parentNode
		if (!this.PROPS.run.host)	return false
		if (this._getType(this.PROPS.run.master, "string")) this.PROPS.run.master=this._getMasterElement(this.PROPS.run.master)
		if (! this._getType(this.PROPS.run.master, "nodeElement")) return false

		let host=this.PROPS.run.host.getBoundingClientRect()
		let basis=(this._getType(this.PROPS.run.master, "nodeElement"))?this.PROPS.run.master.getBoundingClientRect():host
		let restr=this.PROPS.run.restrictions||{}
		this.PROPS.run["visibleRect"]=	{
										left:basis.left-host.left+(restr.left||0),
										right:host.right-basis.right+(restr.right||0),
										top:basis.top-host.top+(restr.top||0),
										bottom:host.bottom-basis.bottom+(restr.bottom||0),
										width:basis.width-(restr.left||0)-(restr.right||0),
										height:basis.height-(restr.top||0)-(restr.bottom||0),
										offsetX:basis.x,
										offsetY:basis.y,
										}
		return true
								
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
	get master()
		{
		return this.PROPS.run.master;
		}
	set master(val)
		{
		this.PROPS.run["master"]=val;
		this.calculateRect()
		}
	get restrictions()
		{
		return this.PROPS.run.restrictions;
		}
	set restrictions(val)
		{
		this.PROPS.run["restrictions"]=val;
		this.calculateRect()
		}
	get data()
		{
		return this.PROPS.run.data
		}
	set data(val)
		{
		this.PROPS.run["data"]=val;
		this.refresh()
		}



	//############################################################################################################################################
	//############################################################################################################################################
	}

window.customElements.define('tgepg-tooltipp', tgEpgTooltipp);
