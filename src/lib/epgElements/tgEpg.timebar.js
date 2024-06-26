/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgControls } from "../tgControls.js";
import { tgEpgTimebarDefaults } from "../../defaults_Timebar.js";

export class tgEpgTimebar extends tgControls
	{			
	constructor(mode="open", props={})
		{
		super(mode, new tgEpgTimebarDefaults(), props);
		var that=this;
		// default Parameter nach Props einlesen
		this["PROPS"]=this._extender( 
							{},
							this["PROPS"]||{},
							{
							default:	{
										msg:	{
												log:false,
												debug:true,
												error:true
												},
										skale:0,
										firstStart:0,
										lastEnd:0,
										timePosition:0,
										epgEnd:100
										},
							attr:		this._extender({},tgEpgTimebar.properties)
							});

		this.app = this.shadowRoot.querySelector('[name="app"]');
		//this._log("constructor - constructed", this.app);

		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	static get properties()
		{
		let defProps=	tgEpgTimebarDefaults.properties || {};
		let superProps=super.properties||{};
		let props= 	{
					timelinestart:null,
					timelineend:null,
					enableTimemarker:false
					};
		props=Object.assign(superProps,defProps,props);
		return props;
		}
	//######################################################################################################################################
	static get observedAttributes() 
		{
		let props=Object.keys(tgEpgTimebar.properties)
        return props;
		}

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	connectedCallback ()
		{
		var that=this;
		//console.log(" timebatr connectedCallback", "start");
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
		this._debug("change Attribute "+attrName, "from", oldVal, "to" , newVal);
		this.PROPS.paras[attrName]=newVal;
		switch (attrName)
			{
			case "timerowheight":
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
	get timelinestart()
		{
		return this.PROPS.run.timelinestart;
		}
	set timelinestart(val)
		{
		if (this.PROPS.run.timelinestart != val)
			{
			this.PROPS.run["timelinestart"]=val;
			this.render()
			}
		}
	get timelineend()
		{
		return this.PROPS.run.timelineend;
		}
	set timelineend(val)
		{
		if (this.PROPS.run.timelineend != val)
			{
			this.PROPS.run["timelineend"]=val;
			this.render()
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
	get design_timeFrameStart()
		{
		return this.PROPS.run.timeFrameStart||null;
		}
	set design_timeFrameStart(val)
		{
		//console.info("transer", this.PROPS.run.timeFrameStart, val)

		if (this.PROPS.run.timeFrameStart != val)
			{
			this.PROPS.run["timeFrameStart"]=val;
			}
			//console.info("transer", this.PROPS.run.timeFrameStart, val)
		}
	get design_timeFrameEnd()
		{
		return this.PROPS.run.timeFrameEnd||null;
		}
	set design_timeFrameEnd(val)
		{
		if (this.PROPS.run.timeFrameEnd != val)
			{
			this.PROPS.run["timeFrameEnd"]=val;
			}
		}
	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	render()
		{
		if  ( ( ! this.PROPS.run.timelinestart) || ( ! this.PROPS.run.timelineend) )
			{
			return
			}
		//console.log("trans render", this.PROPS.run.timelinestart, this.PROPS.run.timelineend)
		//this.app.innerHTML=""
		let that=this;
		let test;
		let digitCell=``;
		let barCell=``;
		var root = this;
		while (root.parentNode)
			{
			root = root.parentNode;
			}
		root= root.querySelector('[name="timeBar"]');
		// var cellHeight=	root.clientHeight||this.app.clientHeight || 50
		// cellHeight=cellHeight/5
		//let hours=(this.PROPS.run.previewEnd-this.PROPS.run.previewStart)/3600;
		//this._debug("run", cellHeight, this.app, this.PROPS.run)
		var hourCellContainer=this.app.querySelector('[name="hourCellContainer"]')
		if (! hourCellContainer)
			{
			this.app.innerHTML=`
				<div class="greedyH Tab ">
					<div name="digitline" class="TabRow" style="height:25%">
						<div class="TabCell">
							<!--digitCellFix-->
						</div>
					</div>
					<div name="barline" class="TabRow" style="height:75%">
						<div class="TabCell">
							<div class="Tab greedy" >
								<div name="hourCellContainer" class="TabRow" >
									<!--barCell-->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="Tab free" name="digitline">
					<div name="textCellContainer" class="TabRow">
						<div name="emptyCell" class="TabCell cellwidth2"></div>
						<div name="emptyCell" class="TabCell"></div>
					</div>
				</div>
				`
			hourCellContainer=this.app.querySelector('[name="hourCellContainer"]')
			}
		var textCellContainer=this.app.querySelector('[name="textCellContainer"]')
		var textCellEmptyCell=textCellContainer.querySelector('[name="emptyCell"]:last-of-type')

		var hourCells=[...hourCellContainer.querySelectorAll('[name="hourcell"]')]
		var textCells=[...textCellContainer.querySelectorAll('[name="digitcell"]')]
		var index=1
//this._log("hourCellContainer", hourCellContainer)
		for (let i=this.PROPS.run.timelinestart+3600; i<=this.PROPS.run.timelineend;i+=3600)
			{
			//	this._log("loop", i)
	
			if (textCells.length >= index)
				{
			//	this._log("true", i)
				textCells[index-1].innerHTML=getDigitString(i)
				}
			else
				{
			//	this._log("else", textCellContainer)
	
				let cell =getdigitcell(getDigitString(i))
				textCells.push(cell)
				textCellContainer.insertBefore(cell,textCellEmptyCell)
				}
			if (hourCells.length < index)
				{

				let cell =gethourcell()
				hourCells.push(cell)
				hourCellContainer.append(cell)
				}
			index+=1
			}
		while (textCells.length > index)
			{
			textCells.pop().remove()
			}
		while (hourCells.length > index)
			{
			hourCells.pop().remove()
			}

		return;
		function getDigitString(x)
			{
			let digit= that._get2digit(new Date(x*1000).getHours()+"")+":00"
			//that._log("digit", digit)
			return digit
			}
		function getdigitcell(x)
			{
			return that._htmlToElement(`<div  name="digitcell" class="TabCell cellwidth4">${x}</div>`)
			}
		function gethourcell()
			{
			return that._htmlToElement	(`
										<div name="hourcell" class="TabCell cellwidth4">
											<div class="Tab greedy">
												<div class="TabRow" style="height:*%">
													<div class="TabCell">
														<div class="Tab greedy">
															<div class="TabRow">
																<div name="barlinecell" class="TabCell" style="width:100%"></div>
															</div>
														</div>
													</div>
												</div>
												<div class="TabRow" style="height:33%">
													<div class="TabCell">
														<div class="Tab greedy">
															<div class="TabRow">
																<div name="barlinecell" class="TabCell" style="width:50%"></div>
																<div name="barlinecell" class="TabCell" style="width:50%"></div>
															</div>
														</div>
													</div>
												</div>
												<div class="TabRow" style="height:33%">
													<div class="TabCell">
														<div class="Tab greedy">
															<div class="TabRow">
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										`)
			}

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
		this._debug("refreshAppSizeAfterResizeOrInit")
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
				//this._debug("width", parseInt(myKeys[i]), width)
				if ((parseInt(myKeys[i]) != 0) && (parseInt(myKeys[i]) <= width))
					{
					hours=this.PROPS.run.previewSpans[myKeys[i]]
					//this._debug("hours", myKeys[i], hours)
					}
				else if	(parseInt(myKeys[i]) > width)
					{
					found=1
					//this._debug("found", myKeys[i])
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
		//this._debug("hours", hours, width, this.PROPS.run.scale, this.PROPS.run.previewSpan)
		//this._debug("refreshApp Width", this.buttonCell, this.buttonCell.clientWidth)
		//this._debug("refreshApp Width", this.timeRow, this.timeRow.clientWidth)
		//this._debug("refreshApp Width", this.timeBar, this.timeBar.offsetWidth)
		}


	//#########################################################################################################
	//## buildApp()
	//## richtet die App-Oberfläche ein
	//##
	//##
	//#########################################################################################################
	buildApp()
		{
		this._debug("buildApp:", this.PROPS.run.mode);
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
		this._debug("loadDefaultOptions --", this.PROPS.set)
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
		this._debug("setOptions --", val)
		}
	//#########################################################################################################
	//##
	//##
	//##
	//##
	//#########################################################################################################
	getOptions(opts={})
		{
		this._debug("getOptions --opts", opts);
		let val = this.tgEpgDefaults.getOptions(this, opts);
		this._debug("getOptions --val", val);
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

window.customElements.define('tgepg-timebar', tgEpgTimebar);
