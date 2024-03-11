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

import './tgEpg.tooltipp.js';


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




		//this.me=new tgEpgHelper(false);

		this.app = this.shadowRoot.querySelector('[name="app"]');
		// this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');

		// this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
		// this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
		// this.timeBar = this.shadowRoot.querySelector('[name="timeBar"]');
		// this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
		this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
		// this.superButton = that.shadowRoot.querySelector('#superbutton');
		// this.floatingMenu = that.shadowRoot.querySelector('[name="app"]>tg-floatingMenu');




/*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */


		// this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
		//this._debug("JSON", this.readOptions(this.PROPS.defaults._storageKey))
		//this.PROPS.run.topElements = [this.app, this.icon];

		//this._log("construction ended", "props:",this.PROPS, "me:", this);
		//this._debug("constructor - constructed");

		}

	//######################################################################################################################################
	//renderChannelLine()
	//fügt einen Channel in die Liste
	//
	//######################################################################################################################################
	renderChannelLine(channel)
		{
		var that=this
		var id="progline_"
		var row=null
		//console.debug("man", channel)
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
		//		console.log("renderChannelLine", channel.data)	
				row =this._htmlToElement(	`<div class="TabRow" id="${id}" >
											<div class="TabCell">
												<div class="Tab">
													<div name="container" class="TabRow">
														<tgepg-progitem class="TabCell" span="0" name="startplaceholder">ol8izu		</tgepg-progitem>
														<tgepg-progitem class="TabCell" span="0" name="endplaceholder">dafgfd		</tgepg-progitem>
													</div>
												</div>
											</div>
										</div>
										`)
				this.app.appendChild(row);
				}

			row=row.querySelector('[name="container"]')
			if (!row) return
// //console.debug(row)
//console.log("renderChannelLine xx", channel.data)	

			var firstitem= row.querySelector(`[name="startplaceholder"]`)
			var lasttitem= row.querySelector(`[name="endplaceholder"]`)
			if (channel.preSpan && firstitem)
				{
				firstitem.setAttribute("span", channel.preSpan)
				}
			if (channel.postSpan && lasttitem)
				{
				lasttitem.setAttribute("span", channel.postSpan)
				}

			if (channel.todolist)
				{
				let keys=Object.keys(channel.todolist)
				console.debug("proglist todo", keys)	
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
						console.debug("proglist manage channel", channel)
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
	addLine(id, rawFilter=[], item={}, that, html="", shown=true)
		{
		////console.debug("addline", html)
		var that=this
		id="progline_"+id
		var filter=rawFilter.join(",")
		var row =this.app.querySelector(`#${id}`)
		if (! row)
			{
			row=this.htmlToElement(	`<div class="TabRow" filter="${filter}" id="${id}" >
										<div class="TabCell">
											<div class="Tab">
												<div name="container" class="TabRow">
													<tgepg-progitem class="TabCell" span="0" name="startplaceholder"><tgepg-progitem>
													<tgepg-progitem class="TabCell" span="0" name="endplaceholder"><tgepg-progitem>
												</div>
											</div>
										</div>
									</div>
									`)
			this.app.appendChild(row);
			}
		if (!shown) row.classList.add("hide")
		row=row.querySelector('[name="container"]')

		var cells=row.querySelectorAll('tgepg-progitem:not([usedfor])')
		if (cells.length === 0)
			{
			row.innerHTML=html
			}
		else
			{
			var newCells=[]
			var cell=cells[cells.length-1]
			cell.setAttribute("span",cell.getAttribute("duration"))
			this.htmlToElements(html).forEach(element => { if (that.getType(element, "nodeElement")) newCells.push(element) });
			newCells.forEach(newCell =>
				{
				var start=parseInt(cell.getAttribute("start"))
				var end=parseInt(cell.getAttribute("end"))
				var newstart=parseInt(newCell.getAttribute("start"))
				var newend=parseInt(newCell.getAttribute("end"))
				var span=newstart-end
				if ( span === 0 )
					{
					cell.after(newCell)
					cell=newCell
					}
				else if ( span > 0 )
					{
					cell.after(this.htmlToElement(`
					<tg-epg-progitem class="TabCell"
					span="${span}"
					start="${end}"
					end="${newstart}"
					channelid="${id}"
					id="${id}_${end}"
						></tg-epg-progitem>`
					), newCell)
					cell=newCell
					}
				else if (( span < 0) && (newend <= end))
					{

					}
				else if (( span < 0) && (newend > end))
					{
					cell.setAttribute("span", newstart-start)
					cell=newCell
					}

				})
			}
		cells=row.querySelectorAll('tg-epg-progitem:not([usedfor]):not([status])')
		cells.forEach(cell =>
			{
			that.transferPROPS(that, cell)
			})



		return
		}

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	template()
		{
		let tmp = tgEpgProgListDefaults.template;

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
		let props=	tgEpgProgListDefaults.properties || {};
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
		let props=tgEpgProgList.properties;
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
		if (typeof super.attributeChangedCallback == "function")
			{
			super.attributeChangedCallback(attrName, newVal, oldVal );
			}
		//this._debug("change Attribute "+attrName, "from", oldVal, "to" , newVal);
		this.PROPS.paras[attrName]=newVal;
		switch (attrName)
			{
			case "timerowheight":
				//this.timeRow.style.height=parseInt(newVal)+"px";
				break;
			case "channelfilter":
				this.setFilter(newVal)
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
	get design_timeFrameStart()
		{
		////console.debug("render Appp getter", this.PROPS.run)
		return this.PROPS.run.timeFrameStart||null;
		}
	set design_timeFrameStart(val)
		{
		// if (this.PROPS.run.timeFrameStart != val)
		// 	{
		// 	this.PROPS.run["timeFrameStart"]=val;
		// 	}
		}
	get design_timeFrameEnd()
		{
		return this.PROPS.run.timeFrameEnd||null;
		}
	set design_timeFrameEnd(val)
		{
		// if (this.PROPS.run.timeFrameEnd != val)
		// 	{
		// 	this.PROPS.run["timeFrameEnd"]=val;
		// 	}
		}
	get design_SpanTime()
		{
		return this.PROPS.run.SpanTime||null;
		}
	set design_SpanTime(val)
		{
		if (this.PROPS.run.SpanTime != val)
			{
			this.PROPS.run["SpanTime"]=val;
			}
		}
	get design_SpanTimeAll()
		{
		return this.PROPS.run.SpanTimeAll||null;
		}
	set design_SpanTimeAll(val)
		{
		if (this.PROPS.run.SpanTimeAll != val)
			{
			this.PROPS.run["SpanTimeAll"]=val;
			}
		}
	get design_PastOffsetTime()
		{
		return this.PROPS.run.PastOffsetTime||null;
		}
	set design_PastOffsetTime(val)
		{
		if (this.PROPS.run.PastOffsetTime != val)
			{
			this.PROPS.run["PastOffsetTime"]=val;
			}
		}
	get now()
		{
		return this.PROPS.run.now||null;
		}
	set now(val)
		{
		if (this.PROPS.run.now != val)
			{
			this.PROPS.run["now"]=val;
			}
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

	// get epgPastSpanHours()
	// 	{
	// 	return this.PROPS.run.epgPastSpanHours||null;
	// 	}
	// set epgPastSpanHours(val)
	// 	{
	// 	if (this.PROPS.run.epgPastSpanHours != val)
	// 		{
	// 		this.PROPS.run["epgPastSpanHours"]=val;
	// 		}
	// 	}

	// get epgFutureSpanHoursAll()
	// 	{
	// 	return this.PROPS.run.epgFutureSpanHoursAll||null;
	// 	}
	// set epgFutureSpanHoursAll(val)
	// 	{
	// 	if (this.PROPS.run.epgFutureSpanHoursAll != val)
	// 		{
	// 		this.PROPS.run["epgFutureSpanHoursAll"]=val;
	// 		}
	// 	}
	// get scale()
	// 	{
	// 	return this.PROPS.run.scale||null;
	// 	}
	// set scale(val)
	// 	{
	// 	if (this.PROPS.run.scale != val)
	// 		{
	// 		this.PROPS.run["scale"]=val;
	// 		}
	// 	}



	render()
		{
		var that=this
		let selector='.TabRow[filter] [name="container"]';
		var rows=this.app.querySelectorAll(`${selector}`)
		const styles=getComputedStyle(this)
		this.PROPS.run["scale"]=parseFloat(styles.getPropertyValue('--scale'))||0

		rows.forEach(function(row)
			{
			var cells=row.querySelectorAll('tg-epg-progitem[usedfor="emptyStartCell"],tg-epg-progitem[usedfor="emptyEndCell"]')
			cells.forEach(function(cell)
				{
				cell.remove()
				})
			})
		selector=`${selector} > tg-epg-progitem`
		this.PROPS.run["timeFrameStart"]=getMinMaxTime	("min",
														this.PROPS.run.now -this.PROPS.run.epgPastSpanHours*3600,
														`${selector}:first-of-type`
														)
		this.PROPS.run["timeFrameEnd"]	=getMinMaxTime	("max",
														this.PROPS.run.now + (this.PROPS.run.epgFutureSpanHours+this.PROPS.run.epgFutureSpanHoursAll)*3600,
														`${selector}:last-of-type`
														)
		rows.forEach(function(row)
			{
			var firstCell=row.querySelector('tg-epg-progitem:not([usedfor]):first-of-type')
			while ((firstCell) && (parseInt(firstCell.getAttribute("end")) < that.PROPS.run.timeFrameStart))
				{
				firstCell.remove()
				firstCell=row.querySelector('tg-epg-progitem:not([usedfor]):first-of-type')
				}

			var lastCell=row.querySelector('tg-epg-progitem:not([usedfor]):last-of-type')
			while ((lastCell) && (parseInt(lastCell.getAttribute("start")) > that.PROPS.run.timeFrameEnd))
				{
				lastCell.remove()
				lastCell=row.querySelector('tg-epg-progitem:not([usedfor]):last-of-type')
				}
			firstCell=row.querySelector('tg-epg-progitem:not([usedfor]):first-of-type')
			lastCell=row.querySelector('tg-epg-progitem:not([usedfor]):last-of-type')
			if (firstCell)
				{
				firstCell.setAttribute("span", parseInt(firstCell.getAttribute("duration")) )
				lastCell.setAttribute("span", parseInt(lastCell.getAttribute("duration")) )

				let x=parseInt(firstCell.getAttribute("start"))
				let y=that.PROPS.run.timeFrameStart-x
				if (y>=0)
					{
					firstCell.setAttribute("span", parseInt(firstCell.getAttribute("span")-y) )
					y=0
					}
				else
					{
					y=-1*y
					}
				row.prepend(that.htmlToElement	(
					`
					<tg-epg-progitem usedfor="emptyStartCell" class="usedfor" span="${y}">
					</tg-epg-progitem>
					`))
				x=parseInt(lastCell.getAttribute("end"))
				y=x-that.PROPS.run.timeFrameEnd
				if (y>=0)
					{
					lastCell.setAttribute("span", parseInt(firstCell.getAttribute("span")-y) )
					y=0
					}
				else
					{
					y=-1*y
					}
			// 	////console.debug("proglistrender", y, new Date(that.PROPS.run.timeFrameStart*1000), new Date(that.PROPS.run.timeFrameEnd*1000))

				row.append(that.htmlToElement	(
					`
					<tg-epg-progitem usedfor="emptyEndCell"  class="usedfor" span="${y}">
					</tg-epg-progitem>
					`
					))
				}
			})
		this.initTimemarker()

		function getMinMaxTime(minOrMax="min", border, selector)
			{
			var cells=that.app.querySelectorAll(selector)
			// //console.debug("proglistrenderxxx", that.app, minOrMax, cells.length)

			var pos=null
			cells.forEach(function(cell)
				{
				if (minOrMax === "min")
					{
					let x=parseInt(cell.getAttribute("start"))
					pos=( (pos === null) || (pos > x))?x:pos
					pos=(pos<border)?border:pos
					}
				else
					{
					let x=parseInt(cell.getAttribute("end"))
					pos=( (pos === null) || (pos < x))?x:pos
					pos=(pos > border)?border:pos
					// //console.debug("proglistrenderx", new Date(border*1000), new Date(pos*1000))

					}
				})
			return Math.round(new Date(((pos === null)?border:pos)*1000).floorHours().getTime()/1000)
			}

		}
	addEmptyCellsOnStartAndEnd(row, start, end)
		{
		var sCell=row.querySelector('tg-epg-progitem[usedfor="emptyStartCell"]')
		if (! sCell)
			{
			sCell=this.htmlToElement	(
									`
									<tg-epg-progitem usedfor="emptyStartCell">
									</tg-epg-progitem>
									`
									)
			row.prepend(sCell)
			}
		var eCell=row.querySelector('tg-epg-progitem[usedfor="emptyEndCell"]')
		if (! eCell)
			{
			eCell=this.htmlToElement	(
									`
									<tg-epg-progitem usedfor="emptyEndCell">
									</tg-epg-progitem>
									`
									)
			row.append(eCell)
			}
		var brother =sCell.nextElementSibling
		if (brother)
			{
			let nextStart=parseInt(brother.getAttribute("start") || end)
			let duration=nextStart-start
			sCell.setAttribute("duration", duration)
			sCell.setAttribute("start", start)
			sCell.setAttribute("end", nextStart)
			}
		//console.debug("addEmptyCellsOnStartAndEnd", start, end, row,"\n", sCell,"\n", brother)

		var brother =eCell.previousElementSibling
		if (brother)
			{
			let beforeEnd=parseInt(brother.getAttribute("end") || end)
			let duration=end - beforeEnd
			eCell.setAttribute("duration", duration)
			eCell.setAttribute("start", start)
			eCell.setAttribute("end", beforeEnd)
			}
		//console.debug("addEmptyCellsOnStartAndEnd","\n", brother)

		// 	let duration=parseInt(item.nextSibling.getAttribute("start"))-start



		// var items=this.shadowRoot.querySelectorAll('tg-epg-progitem[usedfor="emptyStartCell"]:not([duration])');
		// items.forEach((item) =>
		// 	{
		// 	let duration=parseInt(item.nextSibling.getAttribute("start"))-start
		// 	item.setAttribute("duration", duration)
		//   	});
		// items=this.shadowRoot.querySelectorAll('tg-epg-progitem');
		// items.forEach((item) =>
		// 	{
		// 	item.supermaster=this._supermaster
		// 	});
		// this.drawStart=start
		}

	initTimemarker()
		{
		var that=this
		if  ( ( ! this.timeMarker) || ( ! this.PROPS.run.scale) || ( ! this.PROPS.run.timeFrameStart) )
			{
			return
			}
		var now=new Date()
		now=now.getTime()/1000;
		var width=parseFloat(that.timeMarker.offsetWidth)
		var halberTimeMarker =  width / 2;
		let pos=(now - this.PROPS.run.timeFrameStart )*that.PROPS.run.scale -halberTimeMarker;
		that.timeMarker.style.left=pos+"px";
		that.timeMarker.style.width=width+"px";
		if ((! this.timeMarker.hasAttribute("hasTimer")) || (parseInt(this.timeMarker.getAttribute("hasTimer")) !== 1) )
			{
			that.setAttribute("hasTimer", "1");
			that.PROPS.run["TimeMarkerHandler"]=setInterval(function ()
				{
				that.initTimemarker()
				}, 5000);
			}
		this.addEventListener("scroll", function(ev){this.timeMarker.style.top=this.scrollTop+"px"})
		}
	//#########################################################################################################
	//## refreshAppSizeAfterResizeOrInit()
	//##
	//##
	//##
	//#########################################################################################################
	resize(scale)
		{
		var oldScale=parseFloat(this.PROPS.run.scale)
		var oldScroll=parseFloat(this.scrollLeft)
		var timeOffset=oldScroll/oldScale
		this.PROPS.run.scale=scale
		if 	(this.PROPS.run.scale !== oldScale)
			{
			var progItems=this.shadowRoot.querySelectorAll("tg-epg-progitem")
			progItems.forEach(item =>
				{
				item.setAttribute("scale", this.PROPS.run.scale)
				})
			this.scrollLeft=timeOffset*scale
			this.initTimemarker()
			}
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

window.customElements.define('tgepg-proglist', tgEpgProgList);
