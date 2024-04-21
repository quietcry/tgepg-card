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
				attr:		this._extender({},tgEpgProgItem.properties),
				run: 		{
							connected:0,
							msg:	
								{
								log:false,
								},

							}
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
	static get properties()
		{		
		let props= 	{
					_default:null,
					span:false,
					name:"",
					enabletooltipp:false,
					enableepginfo:false,
					mobile:false,
					context:null,
					master:null,
					};
		let superProps=super.properties||{_common:false};
		let defaultProps=tgEpgProgItemDefaults.properties||{};
		props=Object.assign(superProps,defaultProps,props);
		return props;
		}
	//######################################################################################################################################
	static get observedAttributes() 
		{
		let props=Object.keys(tgEpgProgItem.properties)
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
		let box=this.app.querySelector('div[name="genrebox"]')
		let genres=this.app.querySelector('slot[name="genreslot"]').assignedElements()
		let html=(genres[0])?genres[0].innerHTML:""	
		genres=html.replace(/<!--.*?!-->/gm,"").replace(/[^\d|\s|(A-Z0-9)]+/gm,"")
		genres=(genres != "")?genres.split(" "):[]

		for (let genre of genres )
			{
			let gen=this._htmlToElement(`<div name="genre" style="background-color: var( --tgepg-genrecolor-${genre}-org, transparent) "></div>`)
			box.appendChild(gen)
		 	}
		if (this.PROPS.run.connected === 0)
		 	{
			this.activateToolTipp()
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
				if (parseInt(this.PROPS.attr.span) <= 0)
					{
					this.app.classList.add("hide")
					}
				else
					{
					this.app.classList.remove("hide")
					}
				break;
			case "name":
				if (newVal == "startplaceholder" || newVal == "endplaceholder")
					{
					this.app.classList.add("hide")
					}
				else
					{
					this.app.classList.remove("hide")
					}				
				break;
			case "enabletooltipp":
			case "enableepginfo":
					this.PROPS.run["enabletooltipp"]=this._getBoolean(newVal)			
				break;
			case "mobile":
				this.PROPS.run["isMobile"]=this._getBoolean(newVal)			
				break;
			case "context":
				this.PROPS.run["context"]=newVal			
				break;
			case "master":
				this.PROPS.run["master"]=newVal			
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

	activateToolTipp()
		{
		var that=this;
		if (this.PROPS.run.enabletooltipp)
			{
			if (this.PROPS.run.isMobile)
				{
				this.addEventListener("touchmove", function(ev){that.manageEvent.call(that,ev)}, false);
				this.addEventListener("touchend", function(ev){that.manageEvent.call(that,ev)}, false);
				this.addEventListener("touchstart", function(ev){that.manageEvent.call(that,ev)}, false);
				this.addEventListener("dblclick", function(ev){that.manageEvent.call(that,ev)}, false);
				}
			else
				{
				this.addEventListener("mousemove", function(ev){that.manageEvent.call(that,ev)}, true);
				this.addEventListener("mouseover", function(ev){that.manageEvent.call(that,ev)}, true);
				this.addEventListener("mouseleave", function(ev){that.manageEvent.call(that,ev)});
				this.addEventListener("click", function(ev){that.manageEvent.call(that,ev)}, false);
				this.addEventListener("dblclick", function(ev){that.manageEvent.call(that,ev)}, false);
				}
			}
		else
			{
			this.removeEventListener("mousemove", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("touchmove", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("touchend", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("touchstart", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("dblclick", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("mouseover", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("mouseleave", function(ev){that.manageEvent.call(that,ev)}, false);
			this.removeEventListener("click", function(ev){that.manageEvent.call(that,ev)}, false);
			}	
		}
	// //######################################################################################################################################
	// //
	// //
	// //
	// //######################################################################################################################################
	manageEvent(ev)
		{
		var that=this
		if (this._getType(this.PROPS.run.master, "string"))
			{
			this.PROPS.run.master=this._getMasterElement(this, this.PROPS.run.master)	
			}
		if (! this.PROPS.run.master) return;
		if (! this.PROPS.run.data)
			{
			let slots=this.querySelectorAll(`[slot][name]`)
			this.PROPS.run["data"]={}
			for (let slot of slots)
				{
				let format=	(slot.getAttribute("content")||"").toLowerCase()
				let txt=slot.innerHTML
				txt=(format=="time")?getTime(txt):(format=="date")?getDate(txt):txt
				this.PROPS.run.data[slot.getAttribute("name")]=txt
				}	
			}
		let detail={task:ev.type,data:this.PROPS.run["data"], pos: this.getBoundingClientRect(), mouse:{x:ev.clientX||null, y:ev.clientY||null}}
		let event = new CustomEvent('userInteraction', {detail:detail});
		this.PROPS.run.master.dispatchEvent(event);
		function getTime(str)
			{
			let d=new Date(parseInt(str)*1000)
			return `${that._get2digit(d.getHours())}:${that._get2digit(d.getMinutes())}`
			}
		function getDate(str)
			{
			let d=new Date(parseInt(str)*1000)
			return `${that._get2digit(d.getDate())}.${that._get2digit(d.getMonth() + 1)}.${d.getFullYear()}`
			}
		
		//this._log("EVENT", 		detail	)
		return

		}
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
