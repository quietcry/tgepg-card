/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { channelProgListBasis } from './channelProgList.basis.js';
import { tgEpgChannelListDefaults } from "../../defaults_Channellist.js";

export class tgEpgChannelList extends channelProgListBasis
	{
	constructor(mode="open", props={})
		{
		super(mode, new tgEpgChannelListDefaults(), props);
		var that=this;
		console.warn("constr tgEpgChannelList")

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
													skale:0,
													firstStart:0,
													lastEnd:0,
													timePosition:0,
													epgEnd:100
													},
										attr:		this._extender({},tgEpgChannelList.properties)
										}
									)
		this["PROPS"]["run"]=this._extender	(	this["PROPS"]["default"]||{},
												this["PROPS"]["run"]||{},
												props
											)
		this.app = this.shadowRoot.querySelector('[name="app"]');

		}


	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	template()
		{
		let tmp = tgEpgChannelListDefaults.template;
		return tmp;
		}
	//######################################################################################################################################
	//
	// properties()
	// collect name-value pairs to use as observed Attributes and the corresponding this->PROPS->attr
	//
	//######################################################################################################################################
	static get properties()
		{
		let props=	tgEpgChannelListDefaults.properties || {};
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
		let props=tgEpgChannelList.properties;
		props=Object.keys(props);
		return  props;
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
			this.render();
			this.moveToOffset();
		// 	this.init();
		//	this.refreshAppSizeAfterResizeOrInit();
		// 	this.buildApp();
		// 	this.getData();
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
		if ( (! newVal) || (! this.PROPS.paras.hasOwnProperty(attrName)) || (this.PROPS.paras[attrName]===newVal)) return;
		oldVal=oldVal || this.PROPS.paras[attrName];
		super.attributeChangedCallback(attrName, newVal, oldVal );
		//this._debug("change Attribute "+attrName, "from", oldVal, "to" , newVal);
		this.PROPS.paras[attrName]=newVal;
		switch (attrName)
			{
			case "timerowheight":
				//this.timeRow.style.height=parseInt(newVal)+"px";
				break;
			case "channelfilter":
				this.setFilter(newVal)
				//this.timeRow.style.height=parseInt(newVal)+"px";
				break;
			case "data":
				this.PROPS.paras["dataref"]=newVal;
				this.dataHandler.getData(newVal);
				break;
			default:
				break;
			}
		}
	//######################################################################################################################################
	//setter & getter
	//
	//
	//######################################################################################################################################

	get _addCell()
		{
		return this.PROPS.run.previewStart;
		}
	set _addCell(val)
		{
		}

	get supermaster()
		{
		return this.PROPS.run.supermaster;
		}
	set supermaster(val)
		{
		this.PROPS.run["supermaster"]=val;
		}
	//######################################################################################################################################
	//renderChannelLine()
	//fügt einen Channel in die Liste
	//
	//######################################################################################################################################
	renderChannelLine(channel)
		{
		if (this.isValidChannel(channel, {data:"hash", id:"string"}) && ! this.app.querySelector(`[id="${channel.id}"]`))
			{
			if (Object.keys(channel.data).length == 0)
				{
				return	
				}	

			let	html=`<tgepg-channellistitem class="TabCell" ><div slot=channelname>${channel.friendlyName || channel.name || channel.channelID}</div></tgepg-channellistitem>`
			html=this._htmlToElement(html)
			let row=this._htmlToElement(`<div class="TabRow"  id="${channel.id}"></div>`)
			row.appendChild(html)
			this.app.appendChild(row);

			}
		}


	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	addLine(id, rawFilter=[], channel="-",  html="", shown=true)
		{
		id="channel_"+id
		if (this.app.querySelector(`#${id}`) !== null) return
		var filter=rawFilter.join(",")

		if (html === "")
			{
			html=`<tg-epg-channellistitem class="TabCell" ><div slot=channelname>${channel}</div></tg-epg-channellistitem>`
			}
		html=this.htmlToElement(html)
		var row=this.htmlToElement(`<div class="TabRow" filter="${filter}" id="${id}"></div>`)
		if (! shown)
			{
			row.classList.add("hide")
			}
		row.appendChild(html)
		this.app.appendChild(row);

		}
	render()
		{
		if  ( ( ! this.PROPS.run.scale) || ( ! this.PROPS.run.previewEnd) || ( ! this.PROPS.run.previewStart) )
			{
			return
			}
		////this._debug("refreshApp Width", new Date(this.PROPS.run.previewDrawStart*1000), new Date(this.PROPS.run.previewStart*1000), new Date(this.PROPS.run.previewEnd*1000), (this.PROPS.run.previewEnd-this.PROPS.run.previewDrawStart)/3600)

		//this._debug("run", cellHeight, this.app, this.PROPS.run)
		let that=this;
		let test;
		this._log("init App")
		let digitCell=``;
		let barCell=``;
		var root = this;
		while (root.parentNode)
			{
			root = root.parentNode;
			}
		root= root.querySelector('[name="timeBar"]');
		var cellHeight=	root.clientHeight||this.app.clientHeight ||50
		cellHeight=cellHeight/5
		//let hours=(this.PROPS.run.previewEnd-this.PROPS.run.previewStart)/3600;
		//this._debug("run", cellHeight, this.app, this.PROPS.run)
		for (let i=this.PROPS.run.previewDrawStart+3600; i<=this.PROPS.run.previewEnd;i+=3600)
			{
			////this._debug("refreshApp Width i=", i)
			let d=new Date(i*1000);
			let h=d.getHours()+"";
			h=((h.length === 1)?"0"+h:h)+":00";

			digitCell +=`<div class="TabCell">`+h+`</div>`;
			barCell +=`<div name="hourcell" class="TabCell">
							<div class="Tab greedy">
								<div class="TabRow">
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
								</div>
							</div>
						</div>`
			}

		digitCell=`<div class="Tab greedyH" name="digitlinefree"><div class="TabRow"><div class="TabCell"></div>`+digitCell+`<div class="TabCell"></div></div></div>`
		barCell=`<div class="Tab greedyH" ><div class="TabRow">`+barCell+`</div></div>`

		let timebarTab=`
				<div class="greedyH Tab ">
					<div name="digitline" class="TabRow">
						<div class="TabCell">`+
						`<!--digitCell-->` +
						`</div>
					</div>
					<div name="barline" class="TabRow">
						<div class="TabCell">`+
						barCell +
						`</div>
					</div>
				</div>` + digitCell
		this.style.setProperty('--timeBarCellWidth', parseInt(15*60*this.PROPS.run.scale)+"px");
		this.style.setProperty('--timeBarCellHeight', parseInt(cellHeight)+"px");
		this.app.innerHTML=timebarTab;

		// test is mobile or desktop
		// tbd
		//


		this.addEventListener("datareadyforuse",
			function(event)
				{
				this._log("data ready for use", this.dataHandler.data);
				//this._debug("dataHandlerEPG", this.dataHandler.data)
				this.epgData=this.dataHandler.data;
				this._log("EPG eingelesen", Object.keys(this.epgData).length, "Sender");
				this.refreshEpgData();
				});

		this._resizeObserver.observe(this.app);
		this.addEventListener("resize",
			function(ev)
				{
				//that.refreshApp();
				}, false);


		return;
		}
	//#########################################################################################################
	//## refreshAppSizeAfterResizeOrInit()
	//##
	//##
	//##
	//#########################################################################################################
	moveToOffset()
		{

		}
	//#########################################################################################################
	//## refreshAppSizeAfterResizeOrInit()
	//##
	//##
	//##
	//#########################################################################################################
	refreshAppSizeAfterResizeOrInit()
		{
		//this._debug("refreshAppSizeAfterResizeOrInit")
		if ( ( this.buttonCell) && (this.PROPS.paras.timerowheight) )
			{
			this.buttonCell.style.height=parseInt(this.PROPS.paras.timerowheight)+"px";
			}
		if ( ( this.buttonCell) && (this.PROPS.paras.channelcolumnwidth) )
			{
			this.buttonCell.style.width=parseInt(this.PROPS.paras.channelcolumnwidth)+"px";
			}
		var width =	this.timeBar.clientWidth
		var hours=null;
		if (this.PROPS.run.previewSpans && this.getType(this.PROPS.run.previewSpans,"hash"))
			{
			var myKeys=Object.keys(this.PROPS.run.previewSpans)
			myKeys=myKeys.sort()
			var found=0;
			for (let i = 0; i < myKeys.length; i++)
				{
				////this._debug("width", parseInt(myKeys[i]), width)
				if ((parseInt(myKeys[i]) != 0) && (parseInt(myKeys[i]) <= width))
					{
					hours=this.PROPS.run.previewSpans[myKeys[i]]
					////this._debug("hours", myKeys[i], hours)
					}
				else if	(parseInt(myKeys[i]) > width)
					{
					found=1
					////this._debug("found", myKeys[i])
					break
					}
			  	}
			if ((found == null) || (hours == null))
				{
				hours=this.PROPS.run.previewSpans["0"]||10
				}
			}
		this.PROPS.run["previewSpan"]=parseFloat(hours)||1
		this.PROPS.run["scale"]=width/(hours*60)
		////this._debug("hours", hours, width, this.PROPS.run.scale, this.PROPS.run.previewSpan)
		////this._debug("refreshApp Width", this.buttonCell, this.buttonCell.clientWidth)
		////this._debug("refreshApp Width", this.timeRow, this.timeRow.clientWidth)
		////this._debug("refreshApp Width", this.timeBar, this.timeBar.offsetWidth)
		}


	//#########################################################################################################
	//## buildApp()
	//## richtet die App-Oberfläche ein
	//##
	//##
	//#########################################################################################################
	buildApp()
		{
		//this._debug("buildApp:", this.PROPS.run.mode);
		var that=this;
		var timeBar=this.timeBar.querySelector('tg-epg-timebar');
		if (! timeBar)
			{
			//timeBar=document.createElement("tg-epg-timebar");
			//this.timeBar.appendChild(timeBar);
			}

		// // inject CCS-File to <HEAD>
		// let cssLink = document.querySelector('head > [name="tgEpgStyle"]');
		// if (! cssLink)
		// 	{
		// 	let style=document.createElement("link");
		// 	style.setAttribute("rel","stylesheet");
		// 	style.setAttribute("name","tgEpgStyle");
		// 	style.setAttribute("href","tgEpg.hlp.cssInjectToHead.css");
		// 	document.getElementsByTagName("head")[0].appendChild(style);
		// 	}
		if ( (this.superButton) && (! this.superButton.hasAttribute("hasClickHandler") ) )
			{
			this.superButton.addEventListener("click", function(event)
				{
				that.manageToolbar("init", event);
				});
			this.superButton.setAttribute("hasClickHandler", 1);
			}
		return;
		}
	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################
	loadDefaultOptions()
		{
		this._clearOptions(this.PROPS.defaults._storageKey);
		this.PROPS.set = this.extender({}, this.PROPS.defaults, this.readOptions(this.PROPS.defaults._storageKey));
		this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
		//this._debug("loadDefaultOptions --", this.PROPS.set)
		//this.refreshApp();
		}
	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################
	setOptions(opts={})
		{
		let val = this.tgEpgDefaults.setOptions(this, opts);
		this.PROPS.set=this.extender(this.PROPS.set, val);
		this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
		//this._debug("setOptions --", val)
		}
	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################
	getOptions(opts={})
		{
		//this._debug("getOptions --opts", opts);
		let val = this.tgEpgDefaults.getOptions(this, opts);
		//this._debug("getOptions --val", val);
		return val;
		}

	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################

	//############################################################################################################################################
	//############################################################################################################################################
	}

window.customElements.define('tgepg-channellist', tgEpgChannelList);
