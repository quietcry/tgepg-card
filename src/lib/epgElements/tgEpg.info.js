/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgEpgInfoDefaults } from "../../defaults_Info.js";
import { tgEpgTooltipp } from "./tgEpg.tooltipp.js"

export class tgEpgInfo extends tgEpgTooltipp
	{
	constructor(mode="open", defClass=new tgEpgInfoDefaults(), props={})
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
											attr:		this._extender({},tgEpgInfo.properties)
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
	//
	//
	//######################################################################################################################################
	static get properties()
		{
		let defProps=tgEpgInfoDefaults.properties || {};
		let props= 	{
					};
		let superProps=super.properties||{};
		props=Object.assign(superProps,defProps,props);
		return props;
		}
	//######################################################################################################################################
	static get observedAttributes() 
		{
		let props=Object.keys(tgEpgInfo.properties)
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
		this.closeButton=this.container.querySelector('.closeButton');
		if (this.closeButton)
			{
			this.closeButton.addEventListener("click", function(ev){that.classList.add("hide")}, true);	
			}
		this.classList.remove("hide")
		let style=this.calculatePos()
		style["position"]="absolute"
		
		//console.log(style, this.PROPS.run.data)
		this.setStyle(style)
		}	
	calculatePos()
		{
		let client=this.getBoundingClientRect()
		let pos=this.PROPS.run?.data.pos||null
		if (!pos) return false
		let rect=this.PROPS.run.Rect
		let mouse=this.PROPS.run?.data.mouse||null
		let x2=rect.width/2
		let y2=rect.height/2
		let top=0+"px"
		let left=0+"px"
		let right=0+"px"
		let bottom=0+"px"
		let style=(mouse.x <= x2)?((mouse.y <= y2)?
						{left:null,top:null, bottom:bottom, right:right}:{left:null,top:top, bottom:null, right:right})
						:((mouse.y <= y2)?
						{left:left,top:null, bottom:bottom, right:null}:{left:left,top:top, bottom:null, right:null})
		return style
		}

	//############################################################################################################################################
	//############################################################################################################################################
	}

window.customElements.define('tgepg-info', tgEpgInfo);
