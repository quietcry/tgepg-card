import { tgControls } from "../tgControls.js";

export class channelProgListBasis extends tgControls
	{
	constructor(mode="open", defaultclass, properties)
		{
		super(mode, defaultclass, properties);
		var that=this;
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
		// Zeiger auf Elemente aus dem Template
		this.app = this._shadowRoot.querySelector('[name="app"]');


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
		if ( super.attributeChangedCallback(attrName, oldVal, newVal ) === false) return;
		if ( this.PROPS.run.connected)
			{
			this.attributeChangedAction(attrName, oldVal, newVal );
			}
		}

	attributeChangedAction(attrName, oldVal, newVal )
		{
		switch (attrName)
			{
			case "xxx":
				break;
			default:
				//this.PROPS.paras[attrName]=newVal;
				//this.control.setAttribute(attrName, newVal);
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
		return
		}
		//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	setFilter(rawFilter=[])
		{
		var that=this
		rawFilter=(this.getType(rawFilter,"array"))?rawFilter:(this.getType(rawFilter,"string"))?[rawFilter]:[]
		this.PROPS.paras["channelfilter"]=rawFilter
		var filterStyles=this._shadowRoot.querySelectorAll('style[name="filter"]')
		filterStyles.forEach(function(style)
			{
			style.remove()
			})

		if (rawFilter.length > 0)
			{
			var styleEl = document.createElement("style");
			this._shadowRoot.appendChild(styleEl)
			styleEl.setAttribute("name","filter")
			var filter=""
			rawFilter.forEach(function(item)
				{
				if (that.getBoolean(item.activ))
					{
					filter=(filter=="")?`[filter*="whitelist"]`:filter
					var x=`[filter*="${item.id}"]`
					filter=`${filter}${(filter==="")?"":","}${x}`
					}
				})
			let rule=(filter !="")?`.TabRow[filter]:not(${filter}){	display:none; }`:""
			styleEl.innerHTML=rule
			}
		}
	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################
	isValidChannel(channel={}, mustHaveKeys={})
		{
		let keys=Object.keys(mustHaveKeys)
		for (let key of keys)
			{
			if ( !channel[key] || !this._getType(channel[key], mustHaveKeys[key]))
				{
				return false
				}
			}
		return true
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
	get channelfilter()
		{
		return this.PROPS.paras.channelfilter;
		}
	set channelfilter(val)
		{
		console.log("setFilter c", val)
		this.setFilter(val)
		}
	set setChannel(val)
		{
		//console.debug("setchannel c", val)
		this.createChannelLine(val)
		}
	set deleteChannel(val)
		{
		//console.log("delchannel c", val)
		}


	//############################################################################################################################################
	//############################################################################################################################################
	}

