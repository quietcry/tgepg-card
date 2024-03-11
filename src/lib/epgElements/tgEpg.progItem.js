/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgControls } from '../tgControls.js';
import { tgEpgProgItemDefaults } from '../../defaults_ProgItem.js';

export class tgEpgProgItem extends tgControls
	{
	constructor(mode="open", props={})
		{
		super(mode, new tgEpgProgItemDefaults());
		var that=this;
		this["PROPS"]=this._extender
			(
				{paras:{}},
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
				attr:		this._extender({},tgEpgProgItem.properties)
				}
			)
		this["PROPS"]["run"]=this._extender	(	this["PROPS"]["default"]||{},
					this["PROPS"]["run"]||{},
					props
				)
		// Props durch im Storage gespeichertes erweitern/anpassen
		//this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));

		//this._debug("constructor - Parameters", "props:",this["PROPS"]);

		// data handler init
		this.epgData={};




		//this.me=new tgEpgHelper(false);

		// this.app = this.shadowRoot.querySelector('[name="app"]');
		// this.titleslot = this.shadowRoot.querySelector('[name="titleslot"]');
		// this.revier={l:80,r:0,t:0,b:0}
		// this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');

		// this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
		// this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
		// this.timeBar = this.shadowRoot.querySelector('[name="timeBar"]');
		// this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
		// this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
		// this.superButton = that.shadowRoot.querySelector('#superbutton');
		// this.floatingMenu = that.shadowRoot.querySelector('[name="app"]>tg-floatingMenu');




/*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */


		// this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
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
		let tmp = tgEpgProgItemDefaults.template;

		return tmp;
		}
	// //######################################################################################################################################
	// //
	// // properties()
	// // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->attr
	// //
	// //######################################################################################################################################
	static get properties()
		{
		let props=	tgEpgProgItemDefaults.properties || {};
		let superProps=super.properties||{};
		props=Object.assign(superProps,props);
		return props;
		}
	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################
	static get observedAttributes()
	 	{
		let props=tgEpgProgItem.properties;
		props=Object.keys(props);
		console.debug("observedAttributes tgEpgProgItem", props)
		return  props;
  	 	}
	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################
	// connectedCallback ()
	// 	{
	// 	var that=this;
	// 	if (this.PROPS.run.connected === 0)
	// 	 	{
	// 		this.activateToolTipp()
	// 	 	this.connected();
	// 	 	}
	// 	}
	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################
	attributeChangedCallback(attrName, oldVal, newVal)
		{
		if (this.getAttribute("name") && this.getAttribute("name").includes("place"))
			{
			console.debug("change Attribute "+attrName, "from", oldVal, "to" , newVal, this.getAttribute("name"), this)
			console.debug( (! newVal), (! this.PROPS.attr.hasOwnProperty(attrName)), (this.PROPS.attr[attrName]===newVal) );
			console.debug(this.PROPS.attr);
			}	
		if ( (! newVal) || (! this.PROPS.attr.hasOwnProperty(attrName)) || (this.PROPS.attr[attrName]===newVal)) return;
		oldVal=oldVal || this.PROPS.attr[attrName];
		if (typeof super.attributeChangedCallback == "function")
			{
			super.attributeChangedCallback(attrName, newVal, oldVal );
			}
		this.PROPS.attr[attrName]=newVal;
		switch (attrName)
			{
			case "span":
					this.style.setProperty('--progItemSpan', (parseInt(this.PROPS.attr.span))+"px");
				break;
			// case "scale":
			// 	if(this.PROPS.attr.duration)
			// 		{
			// 		this.style.setProperty('--progItemWidth', (parseInt(this.PROPS.attr.duration)* parseFloat(this.PROPS.attr.scale))+"px");
			// 		}
				break;
			case "timerowheight":
				//this.timeRow.style.height=parseInt(newVal)+"px";
				break;
			case "data":
				this.PROPS.attr["dataref"]=newVal;
				this.dataHandler.getData(newVal);
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

	// activateToolTipp()
	// 	{
	// 	var that=this;

	// 	//let elems=this.programBox.querySelectorAll('.Sendung');
	// 	// elems.forEach(function (elem)
	// 	// 	{
	// 		if (this.PROPS.run.device.type =="mobile")
	// 			{
	// 			this.addEventListener("touchmove", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			this.addEventListener("touchend", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			this.addEventListener("touchstart", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			this.addEventListener("dblclick", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			}
	// 		else
	// 			{

	// 			this.addEventListener("mouseover", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			this.addEventListener("mouseleave", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			this.addEventListener("click", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			this.addEventListener("dblclick", function(ev){that.manageEvent.call(that,ev)}, false);
	// 			}
	// 		// elem.addEventListener("long-press", function(ev){ev.preventDefault();alert("long-press");that.manageEpgInfo.call(that,ev)}, false);
	// 		// });
	// 	}
	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################

	// manageEvent(ev)
	// 	{
	// 	if (! this.supermaster) return;
	// 	var elem=ev.target;
	// 	var task=ev.type;
	// 	var master=this.supermaster.shadowRoot.querySelector('[name="epgOutBox"]');
	// 	//console.debug("master")

	// 	if (! master) return
	// 	var infobox=null
	// 	switch (task)
	// 		{
	// 		case "mouseleave":
	// 			infobox = master.querySelector("tgepg-tooltipp")
	// 			if (infobox) infobox.style.display="none";
	// 			return;
	// 			break;
	// 		case "mouseover":
	// 			infobox = master.querySelector("tgepg-tooltipp")
	// 			if ( ! infobox )
	// 				{
	// 				infobox=document.createElement("tgepg-tooltipp");
	// 				master.appendChild(infobox)
	// 				}
	// 			infobox.style.display="block";
	// 			break;
	// 		case "click":
	// 			infobox = master.querySelector("tgepg-info")
	// 			if ( ! infobox )
	// 				{
	// 				infobox=document.createElement("tgepg-info");
	// 				master.appendChild(infobox)
	// 				}
	// 			console.log("infobox", infobox)
	// 			infobox.style.display="block";
	// 			break;
	// 		}
	// 	infobox.innerHTML=""
	// 	var slots=this.querySelectorAll('[slot]')
	// 	slots.forEach((slot) =>
	// 		{
	// 		let clone = slot.cloneNode(true);
	// 		infobox.appendChild(clone)
	// 		});
	// 	infobox.setAttribute("start", this.getAttribute("start")||"-")
	// 	infobox.setAttribute("duration", this.getAttribute("duration")||"-")
	// 	infobox.setAttribute("channelid", this.getAttribute("channelid")||"-")
	// 	infobox.setAttribute("eventid", this.getAttribute("eventid")||"-")

	// 	var visibleMaster=getVisible([master.getBoundingClientRect().y,master.getBoundingClientRect().height], [0, document.documentElement.clientHeight])
	// 	visibleMaster=visibleMaster.concat(getVisible([master.getBoundingClientRect().x,master.getBoundingClientRect().width], [0,document.documentElement.clientWidth]));
	// 	visibleMaster={y:(visibleMaster[0]+this.revier.t),h:(visibleMaster[1]-this.revier.t-this.revier.b),x:(visibleMaster[2]+this.revier.l),w:(visibleMaster[3]-this.revier.l-this.revier.r)};
	// 	var maus={x:ev.clientX-visibleMaster.x, y:ev.clientY-visibleMaster.y}

	// 	var visibleItem=getVisible([elem.getBoundingClientRect().y,elem.getBoundingClientRect().height], [visibleMaster.y, visibleMaster.h])
	// 	visibleItem=visibleItem.concat(getVisible([elem.getBoundingClientRect().x,elem.getBoundingClientRect().width], [visibleMaster.x, visibleMaster.w]));
	// 	visibleItem={y:visibleItem[0],h:visibleItem[1],x:visibleItem[2],w:visibleItem[3]};

	// 	var mausquadrant=(maus.x < visibleMaster.w/2)?((maus.y < visibleMaster.h/2)?1:3):((maus.y < visibleMaster.h/2)?2:4)

	// 	let offset=10
	// 	var style={left:"",right:"",top:"",bottom:"",maxHeight:"",width:""}

	// 	if (task == "mouseover")
	// 		{
	// 		if (visibleItem.y > (visibleMaster.h-visibleItem.y-visibleItem.h))
	// 			{
	// 			style['bottom']=visibleMaster.h-visibleItem.y+offset+'px'
	// 			style['maxHeight']=(visibleItem.y-offset)+'px'
	// 			}
	// 		else
	// 			{
	// 			style['top']=visibleItem.y+visibleItem.h+offset+'px'
	// 			style['maxHeight']=(visibleMaster.h-visibleItem.y-visibleItem.h-offset)+'px'
	// 			}
	// 		}
	// 	else
	// 		{
	// 		if (mausquadrant < 3)
	// 			{
	// 			style['bottom']=offset+'px'
	// 			style['maxHeight']=(visibleMaster.h-offset)+'px'
	// 			}
	// 		else
	// 			{
	// 			style['top']=offset+'px'
	// 			style['maxHeight']=(visibleMaster.h-offset)+'px'
	// 			}
	// 		}
	// 	setStyle(infobox, style)
	// 	var boxItem=infobox.getBoundingClientRect()
	// 	if (task == "mouseover")
	// 		{
	// 		let left= (visibleItem.x+visibleItem.w/2)-boxItem.width/2
	// 		left=(left<0)?0:left
	// 		let right= visibleMaster.w-(visibleItem.x+visibleItem.w/2)-boxItem.width/2
	// 		right=(right<0)?0:right
	// 		if ((left > 0) && (right > 0))
	// 			{
	// 			style['left']=left+"px"
	// 			}
	// 		else if ((left == 0) && (right > 0))
	// 			{
	// 			style['left']=left+"px"
	// 			style['width']=(boxItem.width<visibleMaster.w)?boxItem.width:visibleMaster.w+"px"
	// 			}
	// 		else if ((left > 0) && (right == 0))
	// 			{
	// 			style['right']=right+"px"
	// 			style['width']=(boxItem.width<visibleMaster.w)?boxItem.width:visibleMaster.w+"px"
	// 			}
	// 		else
	// 			{
	// 			style['left']="0px"
	// 			style['width']=visibleMaster.w+"px"
	// 			}
	// 		}
	// 	else
	// 		{
	// 		if ((mausquadrant == 2) || (mausquadrant == 4))
	// 			{
	// 			style['left']=offset+'px'
	// 			}
	// 		else
	// 			{
	// 			style['right']=offset+'px'
	// 			}
	// 		}
	// 	setStyle(infobox, style)
	// 	function setStyle(elm, sty)
	// 		{
	// 		var myKeys=Object.keys(sty)
	// 		for (let i = 0; i < myKeys.length; i++)
	// 			{
	// 			elm.style[myKeys[i]] = sty[myKeys[i]];
	// 			}
	// 		}
	// 	function getVisible(master, port)
	// 		{
	// 		var result=[0,0]
	// 		result[0]=master[0]-port[0]

	// 		result[0]=(result[0] < 0)?0:result[0]
	// 		result[1]=(master[0]-port[0] < 0)?master[1]+(master[0]-port[0]):master[1]
	// 		result[1]=((master[0]+master[1]) > (port[0]+port[1]))?result[1]-((master[0]+master[1]) - (port[0]+port[1])):result[1]
	// 		return result
	// 		}
	// 	return
	// 	}
	// //######################################################################################################################################
	// //setter & getter
	// //
	// //
	// //######################################################################################################################################
	// get info()
	// 	{
	// 	return this.PROPS.run.info;
	// 	}
	// set info(val)
	// 	{
	// 	this.PROPS.run["info"]=val
	// 	if ((this.titleslot) && (this.PROPS.run.info.title))
	// 		{
	// 		this.titleslot.innerHTML="<span>"+this.PROPS.run.info.title+"</span>"
	// 		}
	// 	}

	// get supermaster()
	// 	{
	// 	return this.PROPS.run.supermaster;
	// 	}
	// set supermaster(val)
	// 	{
	// 	this.PROPS.run["supermaster"]=val;
	// 	}


	}
window.customElements.define('tgepg-progitem', tgEpgProgItem);
