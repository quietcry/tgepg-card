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
		this["PROPS"]=this._extender( (this["PROPS"] || {}),
						{
						run:	{
								msg:	{
										log:true,
										debug:true,
										error:true
										},
								connected:0,
								restrictions:{left:0, right:0, top:0, bottom:0},
								connectedTo:null,
								observed:{}		
								},
						default:{connected:0},
						paras:this._extender({})
						});

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
			for (let ent of entries)
				{
				this.addToSizeObserver(ent.target)	
				}	
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
		console.log("connectedCallback", "start");
		if (this.PROPS.run.connected == 0)
		 	{
			console.log("init")	
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
	addToSizeObserver(elem, force=false)
		{
		let id=elem.getAttribute("id")||elem.getAttribute("name")||null
		if (id)
			{
			if (id in this.PROPS.run.observed)
				{
				this.PROPS.run.observed[id].elem=elem	
				this.PROPS.run.observed[id].used=true
				return 0
				}	
			this.PROPS.run.observed[id]={id:id, elem:elem, used:true}
			this.myObserver.observe(elem);
			return 1
			}						
		}
	render()
		{
		let keys=Object.keys(this.PROPS.run.observed)	
		for (let key of keys)
			{	
			this.PROPS.run.observed[key]["used"]=false	
			}
		setRestrictions.call(this)
		keys=Object.keys(this.PROPS.run.restrictions)
		for (let key of keys)
			{
			this.style.setProperty(`--scrollbar-restriction-${key}-calc`, `${this.PROPS.run.restrictions[key]}px`);	
			}
		setContainerwidth.call(this)
		this.style.setProperty(`--scrollbar-corresponding-length-calc`, `${this.PROPS.run.containerwidth}px`);
		keys=Object.keys(this.PROPS.run.observed)	
		for (let key of keys)
			{	
			if (this.PROPS.run.observed[key]["used"]==false)
				{
				this.myObserver.unobserve(this.PROPS.run.observed[key].elem)
				delete(this.PROPS.run.observed[key])
				}
			}
		return	
		function setContainerwidth()
			{
			let item=this.PROPS.run.connectedTo
			let width=0

			if (this._getType(item, "number"))
				{
				width=item	
				}
			else if (this._getType(item, "nodeElement"))
				{
				this.addToSizeObserver(item)	
				let rect=item.getBoundingClientRect()	
				width=(["top","bottom"].includes(this._pos))?rect.width:(["left","right"].includes(this._pos))?rect.height:0
				}	
			this.PROPS.run.containerwidth=width
			}	
		function setRestrictions()
			{	
			if (this._getType(this.PROPS.paras.restrictions, "hash"))
				{
				let keys=Object.keys(this.PROPS.paras.restrictions)
				for (let key of keys)
					{
					let rest=0
					let val = (this._getType(this.PROPS.paras.restrictions[key], "array"))?this.PROPS.paras.restrictions[key]:[this.PROPS.paras.restrictions[key]]
					for (let item of val)
						{
	
						if (this._getType(item, "number"))
							{
							rest+=item	
							}
						else if (this._getType(item, "nodeElement"))
							{
							let rect=item.getBoundingClientRect()

	
							rest+=(["top","bottom"].includes(key))?rect.height:(["left","right"].includes(key))?rect.width:0
							}	
						}
					this.PROPS.run["restrictions"][key]=rest	
					}	
				}
			}
		}
	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	init()
		{
		var that=this	
		this.addEventListener("scroll",
			function(ev)
				{
				let masters=this.PROPS.run["master"]||[]
				for (let master of masters)
					{
					if (that._getType(master, "nodeElement"))
						{
						if (["top","bottom"].includes(that._pos))
							{
							master.scrollLeft=that.scrollLeft
							}
						else if (["left","right"].includes(that._pos))
							{
							master.scrollTop=that.scrollTop
							}
						}
					}
				}, false);
		this.addEventListener("resize",
			function(ev)
				{
				that.render();
				}, false);



		this.render()	
		return	
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
	get master()
		{
		return this.PROPS.run.master||null;
		}
	set master(val)
		{
		var that=this
		val=(this._getType(val, "array"))?val:[val]
		let oldMasterReset=false
		for (let elem of val)
			{
			if (this._getType(elem, "nodeElement"))
				{
				if (! oldMasterReset )
					{
					let masters=this.PROPS.run["master"]||[]
					for (let master of masters)
						{
						master.removeEventListener("scroll", handleMasterScrolling, true)	
						}	
					this.PROPS.run["master"]=[]
					oldMasterReset=true
					}	
				this.PROPS.run["master"].push(elem)
				elem.addEventListener("scroll", handleMasterScrolling, true)	
				}
			}	
		function handleMasterScrolling(e)
			{
			if (["top","bottom"].includes(that._pos))
				{
				if (!(that.scrollLeft==this.scrollLeft)) that.scrollLeft=this.scrollLeft
				}
			else if (["left","right"].includes(that._pos))
				{
				if (!(that.scrollTop==this.scrollTop)) that.scrollTop=this.scrollTop
				}
			}		
		}
	get connectedTo()
		{
		return this.PROPS.run.connectedTo;
		}
	set connectedTo(val)
		{
		this.PROPS.run["connectedTo"]=	val
		this.render()
		}
	get restrictions()
		{
		return this.PROPS.run.restrictions;
		}
	set restrictions(val)
		{
		if (this._getType(val, "hash"))
			{
			this.PROPS.paras.restrictions=	{
											left:(val.left)?val.left:0,
											right:(val.right)?val.right:0,
											top:(val.top)?val.top:0,
											bottom:(val.bottom)?val.bottom:0
											}
			}	
		this.render()
		}
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
