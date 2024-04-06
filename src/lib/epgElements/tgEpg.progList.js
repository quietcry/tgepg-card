/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/
import { channelProgListBasis } from './channelProgList.basis.js';
import { tgEpgProgListDefaults } from "../../defaults_Proglist.js";

export class tgEpgProgList extends channelProgListBasis
	{
	constructor(mode="open", props={})
		{
		super(mode, new tgEpgProgListDefaults());
		var that=this;
		// default Parameter nach Props einlesen
		this["PROPS"]=this._extender
			(
				{},
				this["PROPS"]||{},
				{
				default:	{
							msg:	{
									log:true,
									debug:true,
									error:true
									},
							skale:0,
							firstStart:0,
							lastEnd:0,
							timePosition:0,
							epgEnd:100
							},
				attr:		this._extender({},tgEpgProgList.properties)
				}
			)
		this["PROPS"]["run"]=this._extender	(	this["PROPS"]["default"]||{},
					this["PROPS"]["run"]||{},
					props
				)
		// Props durch im Storage gespeichertes erweitern/anpassen
		this["_drawStart"]=null;
		//this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));

		//this._debug("constructor - Parameters", "props:",this["PROPS"]);

		// data handler init
		this.epgData={};

		this.timeMarker = this._shadowRoot.querySelector('[name="timemarker"]');
		this.init()
		}

	//######################################################################################################################################
	//createChannelLine()
	//fügt einen Channel in die Liste
	//
	//######################################################################################################################################
	createChannelLine(channel)
		{
		var that=this
		var id="progline_"
		var row=null
		//console.log("man", channel)
		if (this.isValidChannel(channel, {data:"hash", id:"string"}) )
			{
			//console.debug("man valid", channel)
	
			id=`${id}${channel.id}`
			row=this.app.querySelector(`[id="${id}"]`)
			if (! row )
				{
				if (Object.keys(channel.data).length == 0)
					{
					return	
					}	
				row =this._htmlToElement(	`<div class="TabRow" id="${id}" >
											<div class="TabCell">
												<div class="Tab Progline">
													<div name="container" class="TabRow">
														<tgepg-progitem class="TabCell" span="" name="startplaceholder"></tgepg-progitem>
														${channel.html}
														<tgepg-progitem class="TabCell" span="" name="endplaceholder"></tgepg-progitem>
													</div>
												</div>
											</div>
										</div>
										`)
				this.app.appendChild(row);
				channel["isNew"]=true
				}
			row=row.querySelector('[name="container"]')
			if (!row) return

			var firstitem= row.querySelector(`[name="startplaceholder"]`)
			var lasttitem= row.querySelector(`[name="endplaceholder"]`)

			if (("preSpan" in channel) && firstitem)
				{
				firstitem.setAttribute("span", channel.preSpan)
				}
			if (("postSpan" in channel) && lasttitem)
				{
				lasttitem.setAttribute("span", channel.postSpan)
				}

			if (channel.todolist && ! channel.isNew)
				{
				let keys=Object.keys(channel.todolist)
				console.log("proglist todo", keys)	
				for (let key of keys)
					{
					if (key.startsWith("d"))
						{
						for ( let index of channel.todolist[key])
							{
							let elem=row.querySelector(`[id="${index}"]`)
							if (elem) elem.remove()
							}
						}
					}
				for (let key of keys)
					{
					if (key.startsWith("r"))
						{
						for ( let index of channel.todolist[key])
							{
							let elem=row.querySelector(`[id="${index}"]`)
							if (elem && channel.data[index]) elem.replaceWith(this._htmlToElement(channel.data[index].html))
							}
						}
					}
				for (let key of keys)
					{
					if (key.startsWith("a"))
						{
						for ( let index of channel.todolist[key])
							{
							let elem=row.querySelector(`[id="${index}"]`)
							if (!elem && lasttitem) lasttitem.insertAdjacentElement("beforebegin", this._htmlToElement(channel.data[index].html))
							}
						}
					}
				for (let key of keys)
					{
					if (key.startsWith("m"))
						{
						//console.debug("proglist manage channel", channel)
						let elem=row.querySelector(`[name="startplaceholder"]`)
						if (channel.preSpan && elem)
							{
							elem.setAttribute('span', channel.preSpan);
	
							//console.debug("manage startplaceholder", elem)
							}
						elem=row.querySelector(`[name="endplaceholder"]`)
						if (channel.postSpan && elem)
							{
							elem.setAttribute('span', channel.postSpan);
	
							//console.debug("manage endplaceholder", elem)
							}
						}
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
		this.initTimemarker()
		}
	//######################################################################################################################################
	//initTimemarker()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	initTimemarker()
		{
		var that=this
		if  ( ( ! this.timeMarker) || ( ! this.PROPS.attr.timelinestart) || (! this.PROPS.attr.enableTimemarker))
			{
			return
			}
		let now=Math.floor(new Date() / 1000);
		let offset=(now - this.PROPS.attr.timelinestart )
		this.timeMarker.style.setProperty('--tgepg-timeMarkerOffset', offset+"px");
		that.timeMarker.classList.remove("hide")

		if ((! this.timeMarker.hasAttribute("hasTimer")) || (parseInt(this.timeMarker.getAttribute("hasTimer")) !== 1) )
		 	{
			that.timeMarker.setAttribute("hasTimer", "1");
			that.PROPS.run["TimeMarkerHandler"]=setInterval(function ()
				{
				that.initTimemarker()
				}, 5000);
			}
		//this.addEventListener("scroll", function(ev){this.timeMarker.style.top=this.scrollTop+"px"})
		}
	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################
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
		let defProps=	tgEpgProgListDefaults.properties || {};
		let props= 	{
					timelinestart:null,
					enableTimemarker:false,
					enableToolTipp:false,
					enableEpgInfo:false
					};
		let superProps=super.properties||{};
		props=Object.assign(superProps,defProps,props);
		return props;
		}
	//######################################################################################################################################
	static get observedAttributes() 
		{
		let props=Object.keys(tgEpgProgList.properties)
        return props;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	attributeChangedCallback(attrName, oldVal, newVal)
		{
		if ( (! newVal) || (! this.PROPS.attr.hasOwnProperty(attrName)) || (this.PROPS.attr[attrName]===newVal)) return;
		oldVal=oldVal || this.PROPS.attr[attrName];
		if (typeof super.attributeChangedCallback == "function")
			{
			super.attributeChangedCallback(attrName, newVal, oldVal );
			}
		//this._debug("change Attribute "+attrName, "from", oldVal, "to" , newVal);
		this.PROPS.attr[attrName]=newVal;
		switch (attrName)
			{
			case "timelinestart":
				this.initTimemarker()	
				break;
			case "enableTimemarker":
				//console.log("enableTimemarker!", newVal)
				this.initTimemarker()	
				break;
			case "enableToolTipp":
				console.log("enableToolTipp!", newVal)
				break;
			case "enableEpgInfo":
				console.log("enableEpgInfo!", newVal)
				break;
			default:
				break;
			}
		}

	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################
	connectedCallback ()
		{
		var that=this;
		if (this.PROPS.run.connected == 0)
		 	{
		 	this.connected();
		 	}
		}
	//######################################################################################################################################
	//setter & getter
	//
	//
	//######################################################################################################################################

	get enableToolTipp()
		{	
		return this.PROPS.attr.enableToolTipp||null;
		}
	set enableToolTipp(val)
		{
		this.attributeChangedCallback("enableToolTipp", this.PROPS.attr.enableToolTipp||null, val)
		}
	get enableEpgInfo()
		{	
		return this.PROPS.attr.enableEpgInfo||null;
		}
	set enableEpgInfo(val)
		{
		this.attributeChangedCallback("enableEpgInfo", this.PROPS.attr.enableEpgInfo||null, val)
		}
	get enableTimemarker()
		{	
		return this.PROPS.attr.enableTimemarker||null;
		}
	set enableTimemarker(val)
		{
		//console.log("enableTimemarker", val)	
		this.attributeChangedCallback("enableTimemarker", this.PROPS.attr.enableTimemarker||null, val)
		}
	get timelinestart()
		{
		return this.PROPS.attr.timelinestart||null;
		}
	set timelinestart(val)
		{
		this.attributeChangedCallback("timelinestart", this.PROPS.attr.timelinestart||null, val)
		}
	get supermaster()
		{
		return this.PROPS.run.supermaster;
		}
	set supermaster(val)
		{
		this.PROPS.run["supermaster"]=val;
		}

//##################################################################


	}

window.customElements.define('tgepg-proglist', tgEpgProgList);
