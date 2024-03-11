import { tgControls } from "./tgControls.js";
import { tgDefaultsFloatingMenu } from '../defaults_FloatingMenu.js';

export class tgFloatingMenu extends tgControls
	{
	constructor(mode="open", props={})
		{
		super(mode);
		var that=this;
		// default Parameter nach Props einlesen
		this.tgEpgDefaults=new tgDefaultsFloatingMenu(this);

		this.app			= this._shadowRoot.querySelector('[name="app"]');
		this.buttonSlot		= this._shadowRoot.querySelector('slot[id="buttonSlot"]');
		let myprops = 	{
						run:	{buttons:[]},
						default:{connected:0, controls:{}},
						paras:this._extender({},tgFloatingMenu.properties)
						};
		//myprops.paras.pos=[];
		console.debug(this["PROPS"]);
		this["PROPS"]=( (this.hasOwnProperty("PROPS"))?this._extender(this["PROPS"],myprops):this["PROPS"]=myprops );
		this.PROPS.run.status="closed";
		this.PROPS.run.msg.log=true;
		this.PROPS.run.msg.debug=true;
		this.PROPS.run.msg.error=true;
		this.addEventListener("focus", function(ev)
			{
			alert("focus")
			this.refreshApp();
			})
		this.addEventListener("blur", function(ev)
			{
			alert("blur")
			this.refreshApp();
			})
		this.addEventListener("focusout", function(ev)
			{
			alert("focusout")
			this.refreshApp();
			})
		if (! mode)	this._log("constructed", "props:",this["PROPS"]);
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	static get observedAttributes()
	 	{
		return  Object.keys(tgFloatingMenu.properties);
  	 	}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	static get properties()
		{
		let props=	{
					pos:			"rbh",
					folded: 		"folded",
					autoclose:		"true"
					};
		props=Object.assign((super.properties||{}),props);
		return props;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	buttonTemplate()
		{
		return	`
					<div class="$class! hide" name="floatingbutton" id=$id! >
						<div style="z-index:88">$inner!</div>
					</div>
				`;
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
		return;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	close()
		{
		this.PROPS.run.status =	(this.PROPS.paras.folded != "folded")?"opened":"closed";
		this.refreshApp();
		return;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	open()
		{
		this.PROPS.run.status =	"opened";
		this.refreshApp();
		return;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	attributeChangedAction(attrName, oldVal, newVal )
		{
		let newpreval="";
		let oldpreval="";
		let writeable=true;
		this._debug("set "+attrName+" to "+newVal);
		var that=this;
		switch (attrName)
			{
			default:
				this.PROPS.paras[attrName]=newVal;
				break;
			}
		if (typeof this.isAttributeChanged === "function")
			{
			this.isAttributeChanged(attrName,newVal);
			}
		return;
		//#######################################################
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	refreshApp ()
		{
		var that=this;
		let elems=this.PROPS.run.buttons;
		this.app.innerHTML="";
		this.app.setAttribute("open", (this.PROPS.run.status == "opened")?true:false);
		this.setAttribute("pos", this.PROPS.paras.pos);
		for (let i=0; i<elems.length;i++ )
			{
			let data=elems[i];
			let button = this.htmlToElement(this.fillDataToTemplate(data, this.buttonTemplate()));
			if ( ( (i==0) && (this.PROPS.paras.folded == "folded") && (this.PROPS.run.status != "opened")) || ( (i > 0) && (this.PROPS.run.status == "opened") ) || ( this.PROPS.paras.folded != "folded" ) || ( elems.length == 1 ) )
				{
				button.classList.add("show");
				button.classList.remove("hide");
				}
			else
				{
				button.classList.add("hide");
				button.classList.remove("show");
				}
			this.app.appendChild(button);
			button.addEventListener("click", function(ev)
				{
				let detail={id:data.associatedID};
				var event = new CustomEvent('click', { detail: detail, bubbles: true, });
				if (that.getType(data.associated, "nodeElement")) data.associated.dispatchEvent(event);
				event = new CustomEvent('menuaction', { detail: detail, bubbles: true, });
				that.dispatchEvent(event);

				if (((i == 0) && (that.PROPS.paras.folded == "folded")) || (that.getBoolean(that.PROPS.paras.autoclose)))
					{
					that.PROPS.run.status =	(that.PROPS.run.status == "opened")?"closed":"opened";
					}

				that.refreshApp();
				});
			}
		this._debug("maxZindex:", this.maxZindex(this));
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	isConnected ()
		{
		var that=this;
		if (this.buttonSlot)
			{
			let elems=that.buttonSlot.assignedNodes();
			let hasMenu=false;
			for (let i=0; i<elems.length;i++ )
				{
				if (elems[i].tagName)
					{
					let x={};
					if (! elems[i].hasAttribute("id")) elems[i].setAttribute("id",this.createID());
					x.class=getClasses(elems[i].className);
					x.inner=elems[i].innerHTML;
					x.name=elems[i].getAttribute("name");
					x.associated=elems[i];
					x.associatedID=elems[i].getAttribute("id");
					x.id=this.createID();
					if ( (x.name.startsWith("floatingmenu")) && (! hasMenu ) )
						{
						hasMenu=x;
						}
					else
						{
						this.PROPS.run.buttons.push(x);
						}
					}
				}
			let x={id:this.createID(), name:"menu", inner:"M"};
			if (this.PROPS.run.buttons.length > 1)this.PROPS.run.buttons.unshift(hasMenu || x);
			this._debug("sloted", that.PROPS.run.buttons);
			}

		let orgProps=tgFloatingMenu.properties;
		Object.entries(this.PROPS.paras).forEach(([key, val]) =>
			{
			if (orgProps[key])
				{
				that.attributeChangedAction(key, orgProps[key], this.PROPS.paras[key] )
				}
			});
		this.refreshApp();
		this.connected();
		function getClasses(cNames)
			{
			let c=cNames.split(" ");
			let needle="tg"
			for (let i=0; i<c.length;i++)
				{
				c[i]=c[i].trim();
				if (! c[i].startsWith(needle))
					{
					c.splice(i,1);
					i--;
					}
				else
					{
					c[i]=c[i].substring(needle.length);
					}
				}
			return c.join(" ");
			}
		}
//######################################################################################################################################
  	}
customElements.define("tg-floatingmenu", tgFloatingMenu);


