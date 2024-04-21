import { tgControlsHelperBasic } from './tgControls.helper_basic.js';

export class tgControls extends HTMLElement
	{
	constructor(mode="open", defaultClass=null)
		{
		super(mode);
		this.helper = new tgControlsHelperBasic();
		this.YES=this.helper.YES; this.NO=this.helper.NO
		//if (!defaultClass) this._warn("defaultClass", mode, defaultClass)

		this.defaultClass=(this._getType(defaultClass,'class' )==1)?defaultClass:null;
		//this._observedAttributes = this.getAttributeNames()
		var attr=(this.defaultClass)?this.defaultClass?.properties||{_default:"wrong"}:{_default:false}
		this._observedAttributes = Object.keys(attr).filter((item) => !item.startsWith('_'))
		this._shadowRoot = createShadow.call(this, ((mode) ? mode : "closed"));

		this.PROPS 	=this._extender(
					{
					defaults:	{msg:{log:false, warn:false, error:false, debug:false, showid:false}	},
					run:		this._extender({},{states:{}, orientationObserver:{orientation:screen.orientation.type.replace(/-.+$/g, ""), angle:0, orientationExact:""}, sizeObserver:{dir:"xy", width:0,height:0,orientation:"" }},tgControls.properties)
					},
					(this.defaultClass)?this.defaultClass?.getPROPS||{}:{},
					{attr:attr}
					);
		//console.log("PROPS", this.PROPS)			
		this.PROPS.run=this._extender(	this.PROPS.run,
											this.PROPS.defaults,
											((! mode) || (mode != "closed"))?{msg:{debug:true,log:true,error:true,warn:true,showid:true}}:{})

		this._resizeObserver = new ResizeObserver(changes =>
			{
			for(const change of changes)
				{
				switch (this.PROPS.run.sizeObserver.dir)
					{
					case "x":
						if (change.contentRect.width === this.PROPS.run.sizeObserver.width) return;
						break
					case "y":
						if (change.contentRect.height === this.PROPS.run.sizeObserver.height) return;
						break
					default:
						if ((change.contentRect.width === this.PROPS.run.sizeObserver.width) && (change.contentRect.height === this.PROPS.run.sizeObserver.height) )return
					}
				this.PROPS.run.sizeObserver.width = change.contentRect.width
				this.PROPS.run.sizeObserver.height = change.contentRect.height
				this.PROPS.run.sizeObserver.orientation=(this.PROPS.run.sizeObserver.height < this.PROPS.run.sizeObserver.width)?"landscape":"portait"
				var ev = new CustomEvent('resize');
				this.dispatchEvent(ev);
				}
			})
			screen.orientation.addEventListener("change", (event) => {
				const type = event.target.type;
				const angle = event.target.angle;
				const orient= type.replace(/-.+$/g, "");
				this.PROPS.run.orientationObserver.orientationExact=type
				this.PROPS.run.orientationObserver.angle=angle
				if (this.PROPS.run.orientationObserver.orientation !== orient)
					{
					var ev = new CustomEvent('rotate');
					that.dispatchEvent(ev);		
					}
			  });
					  
			function createShadow()
				{
				let shadow = this.attachShadow({ mode: mode });
				let template=null

				if (typeof this.template === 'function')
					{
					template = this.template();
					}
				else if (this.defaultClass)
					{
					template = ((typeof this.defaultClass.template === "function")?this.defaultClass.template():null)||this.defaultClass.constructor.template||null;
					}
				let tmp = document.createElement("div");
				template = (!template) ? null : (Array.isArray(template)) ? template : (typeof template === "string") ? [template] : null
				if (template)
					{
					for (let elem of template)
						{
						if (typeof elem === "string")
							{
							tmp.innerHTML = elem;
							while(tmp.firstChild)
								{
								shadow.appendChild(tmp.removeChild(tmp.lastChild));
								}
							tmp.innerHTML=""
							}
						else if (typeof elem == "undefined")
							{
							continue;
							}
						else
							{
							shadow.appendChild(elem);
							}

						}
					}
				return shadow;
				}

			}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	static get properties()
		{
		return {};
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	// static get observedAttributes() 
	// 	{
	// 	console.log("this._observedAttributes", this)	
    //     return this._observedAttributes;
	// 	}
	// static get observedAttributes()
	//  	{
			
	// 	let props=properties;
	// 	props=Object.keys(props);
	// 	return  props;
  	//  	}

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	attributeChangedCallback(attrName, oldVal, newVal)
		{
		if ( (oldVal === newVal) || (! newVal) || (! this.PROPS.run.hasOwnProperty(attrName)) || (this.PROPS.run[attrName]===newVal)) return false;
		this.PROPS.run[attrName]=newVal;

		switch (attrName)
			{
			case "log":
				this.PROPS.run.msg.log=this.getBoolean(newVal);
				break;
			case "info":
				this.PROPS.run.msg.info=this.getBoolean(newVal);
				break;
			case "debug":
				this.PROPS.run.msg.debug=this.getBoolean(newVal);
				break;
			case "error":
				this.PROPS.run.msg.error=this.getBoolean(newVal);
				break;
			case "warn":
				this.PROPS.run.msg.warn=this.getBoolean(newVal);
				break;
			case "showid":
				this.PROPS.run.msg.showid=this.getBoolean(newVal);
				break;
			case "stylesrc":
				if (this._shadowRoot)
					{
					while (this._shadowRoot.querySelector("[css_import]"))
						{
						this._shadowRoot.querySelector("[css_import]").remove()
						}
					let tmp=document.createElement("div");
					var styles=newVal.split(";")
					var innerHTML=""
					var that=this
					styles.forEach(function(val)
						{
						let name=that.tagName.toLowerCase().replace(/[-\.]/g,'');
						let srcname = val.substring(val.lastIndexOf('/')+1).toLowerCase().replace(/[-\.]/g,'');
						if ((srcname.startsWith(name)) || (srcname.startsWith("common")) || (srcname.includes("tgcontrol")) )
							{
							innerHTML+='<style> @import "'+val+'"; </style>'
							}
						})
					tmp.innerHTML=innerHTML;
					while(tmp.firstChild)
						{
						let lastChild=tmp.lastChild
						lastChild.setAttribute("css_import","true")
						this._shadowRoot.insertBefore(tmp.removeChild(lastChild), this._shadowRoot.firstChild)
						}
					tmp.remove();
					}
				break;

			case "left":
			case "right":
			case "top":
			case "bottom":
			case "width":
			case "height":
				break;
			}
		return true
		}

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	connected()
		{
		//console.debug("is connected - now fire connected event", this)
		this._log("is connected - now fire connected event")
		this.PROPS.run["states"]["connected"] =true;
		var ev = new CustomEvent('connected');
		this.dispatchEvent(ev);
		}
	//######################################################################################################################################
	//
	// Weiterleitungen an die helper Klasse
	//
	//######################################################################################################################################



	//######################################################################################################################################
	_extender() 				{ return this.helper._extender.apply(this.helper, arguments);};
	//######################################################################################################################################
	_debug()					{ var args = Array.from(arguments); args.unshift("debug"); 	this.helper._message.apply(this, args);}
	//######################################################################################################################################
	_info()						{ var args = Array.from(arguments); args.unshift("info"); 	this.helper._message.apply(this, args);}
	//######################################################################################################################################
	_log()						{ var args = Array.from(arguments); args.unshift("log"); 	this.helper._message.apply(this, args);}
	//######################################################################################################################################
	_warn()						{ var args = Array.from(arguments); args.unshift("warn"); 	this.helper._message.apply(this, args);}
	//######################################################################################################################################
	_error()					{ var args = Array.from(arguments); args.unshift("error"); 	this.helper._message.apply(this, args);}
	//######################################################################################################################################
	_htmlToElements()			{ return this.helper._htmlToElements.apply(this.helper, arguments);}
	//######################################################################################################################################
	_htmlToElement()				{ return this.helper._htmlToElement.apply(this.helper, arguments);}
	//######################################################################################################################################
	_getType()					{ return this.helper._getType.apply(this.helper, arguments);}
	//######################################################################################################################################
	_get2digit()				{ return this.helper._get2digit.apply(this.helper, arguments);}
	//######################################################################################################################################
	_getBoolean()				{ return this.helper._getBoolean.apply(this.helper, arguments);}
	//######################################################################################################################################
	_getMasterElement()				{ return this.helper._getMasterElement.apply(this.helper, arguments);}
	//######################################################################################################################################
	_createID()				{ return this.helper._createID.apply(this.helper, arguments);}
	//######################################################################################################################################
	_maxZindex()				{ return this.helper._maxZindex.apply(this.helper, arguments);}
	//######################################################################################################################################
	_JSONcorrector()				{ return this.helper._JSONcorrector.apply(this.helper, arguments);}
	//######################################################################################################################################


	}
