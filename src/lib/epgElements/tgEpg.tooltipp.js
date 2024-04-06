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
	constructor(mode="open", defClass=new tgEpgToolTippDefaults(), props={})
		{
		super(mode, defClass, props);
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

		this.container = this._shadowRoot.querySelector('[name="container"]');

		}

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
			case "":
				break;
			default:
				break;
			}
		}
	refresh()
		{
		if (! this.calculateRect()) return
		var that=this
		if (this.PROPS.run.data.task == "mouseleave")
			{
			this.classList.add("hide")
			return
			}

		let txt =this.template_mapper(this.PROPS.run.template, this.PROPS.run.data.data)	
		txt=txt.replaceAll(/<!.+?>/gi, '<div name="empty"></div>')
		this.container.innerHTML=txt	
		this.classList.remove("hide")
		let style=this.calculatePos()
		style["position"]="absolute"

		//console.log(style, this.PROPS.run.data)
		this.setStyle(style)
		}
        //###############################
	setStyle(sty)
		{
		var myKeys=Object.keys(sty)
		for (let i = 0; i < myKeys.length; i++)
			{
			this.style[myKeys[i]] = sty[myKeys[i]];
			}
		}

        //###############################
	template_mapper(templ, source, map=null)
		{
		var mapkeys = (map)?Object.keys(map):Object.keys(source);
		for (let index of mapkeys)
			{
			const needle = new RegExp(`<!${(map)?map[index][0]:index.toUpperCase()}!>`, "gi");
			if (needle.test(templ))
				{
				if (map)
					{	
					for (let p=1; p<map[index].length;	p++)
						{
						if ( ! (map[index][p] in source) ) continue
						let txt=source[map[index][p]]
						let tpl=templ.replaceAll(needle, txt)
						if (tpl != templ)
							{
							templ=tpl
							break	
							}
						}
					}
				else
					{
					let txt=source[index]||""
					templ=templ.replaceAll(needle, txt)
					}	
				}
			}	
		return templ
		}
    //###############################
	calculatePos()
		{
		let style={left:"0px",top:"0px"}	
		let client=this.getBoundingClientRect()
		let pos=this.PROPS.run?.data.pos||null
		if (!pos) return false
		let rect=this.PROPS.run.Rect
		let mouse=this.PROPS.run?.data.mouse||null

		let top=pos.y-client.height-rect.offsetY+this.PROPS.run.host.scrollTop
		let top1=null
		if (top<0)
			{
			top1=pos.y-rect.offsetY+pos.height+this.PROPS.run.host.scrollTop
			top=top1
			}
		style["top"]=`${top}px`
		let left=mouse.x-rect.offsetX-(client.width/2)+this.PROPS.run.host.scrollLeft
		left=(left<rect.left)?rect.left:left
		left=(left+client.width>rect.width)?rect.width-client.width:left
		style["left"]=`${left}px`
		return style
		}
	calculateRect()
		{
		if (this.PROPS.run.Rect) return true	
		let host=(this.parentNode instanceof ShadowRoot)?this.getRootNode().host:this.parentNode
		if (! host)	return false
		this.PROPS.run["host"]=host
		if (this._getType(this.PROPS.run.master, "string")) this.PROPS.run.master=this._getMasterElement(this.PROPS.run.master)
		if (! this._getType(this.PROPS.run.master, "nodeElement")) return false

		host=this.PROPS.run.host.getBoundingClientRect()
		let basis=(this._getType(this.PROPS.run.master, "nodeElement"))?this.PROPS.run.master.getBoundingClientRect():host
		let restr=this.PROPS.run.restrictions||{}
		this.PROPS.run["Rect"]=	{
										left:basis.left-host.left+(restr.left||0),
										right:host.right-basis.right+(restr.right||0),
										top:basis.top-host.top+(restr.top||0),
										bottom:host.bottom-basis.bottom+(restr.bottom||0),
										width:basis.width-(restr.left||0)-(restr.right||0),
										height:basis.height-(restr.top||0)-(restr.bottom||0),
										offsetX:basis.x,
										offsetY:basis.y,
										}
		console.log("RECT", this.PROPS.run["Rect"], this.PROPS.run.master, basis, this.PROPS.run.host, host)								
		return true
								
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
		}
	get restrictions()
		{
		return this.PROPS.run.restrictions;
		}
	set restrictions(val)
		{
		this.PROPS.run["restrictions"]=val;
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
