
import { tgControls } from "./lib/tgControls.js";
import { tgEpgCardDefaults } from "./defaults_Card.js"
import { tgEpgDataService } from "./tgepg-dataWorker.js"
//import { tgControlsHelperBasic } from "./lib/tgControls.helper_basic.js";

import './lib/epgElements/tgEpg.timebar.js';
import './lib/epgElements/tgEpg.channelList.js';
import './lib/epgElements/tgEpg.channelListItem.js';
import './lib/epgElements/tgEpg.progList.js';
import './lib/epgElements/tgEpg.progItem.js';
//import './lib/tgControls.FloatingMenu.js';
import './lib/tgControls.Scrollbar.js';
import './lib/epgElements/tgEpg.tooltipp.js';
import './lib/epgElements/tgEpg.info.js';


export class tgEpgCard extends tgControls
	{
	thisIsClass=true		
	// private properties
	_config;
	_hass;
	_elements = {};
	_lastUpdateHass=0;
	_EPG=null;
	_isConstructed=false;
	_entities={}
	_profile={}
	_configProfile={}
	_user={name:null, id:null}
	_enable_FloatingMnu=false
	_enable_TimeBar=true
	_enable_Scrollbar=true
	_enable_DataWorker=true
	_enable_DataService=false
	_enable_channelList=true
	_enable_progList=true
	_enable_timemarker=true
	_enable_tooltipp=true
	_enable_epgInfo=true
	_dataLoopsAllowed=-1
	// lifecycle
	constructor(mode="open")
		{
		super(mode, new tgEpgCardDefaults());
		var now= new Date()
		this._info("under construction ;-)", now)
		var that=this
		this.detectENV()
		this.PROPS.run=this._extender(this.PROPS.run||{}, 
				{
				zIndexFilter:[]
				})
		this.PROPS.run["profiles"]=(this.PROPS.run.profiles)?this.PROPS.run.profiles:{}	
		this.PROPS.run.profiles["default"]=this._extender({},this.PROPS.defaults.profiles.default)
		
		if (this._enable_DataWorker)
			{
			function startworker () 
				{
				var workerstringified=""
				workerstringified=workerstringified+"; "+ tgEpgDataService.toString()
				workerstringified=workerstringified+"; "+workerRunnerAsString() 
				var workerBlob = new Blob( [workerstringified], { type:'text/javascript' } );
				var workerBlobUrl = URL.createObjectURL(workerBlob);
				that.dataWorker = new Worker(workerBlobUrl);
				that.dataWorker.onmessage = function(event) 
					{
					that.renderChannels(event.data)
					that.scrollbarX.restrictions={left:[that.channelBox]}		
					};
				function workerRunnerAsString()
					{
					var workerrunner=`	
					const workerclass= new tgEpgDataService(this) 	
					self.onmessage = function(event) 
						{
						workerclass.addRequest(event.data)
						}
					`
					return workerrunner	
					};
				};	
			startworker()
			}			
		else if (this._enable_DataService)
			{
			this.dataWorker = new tgEpgDataService (this)
			var runloop=0
			this.addEventListener("fetchWorkerData", function(event)
				{
				runloop++
				let ev = event.detail
				console.log("proglist - todo", (this._dataLoopsAllowed != -1 && runloop > this._dataLoopsAllowed && !ev?.todolist?.manage))
				if (this._dataLoopsAllowed != -1 && runloop > this._dataLoopsAllowed && !ev?.todolist?.manage) return
				console.log("data", ev)	
				that.renderChannels(ev)
				})
			}	
		this.addEventListener("connected", refreshMe)
		this.addEventListener("profiled", refreshMe)
		this.addEventListener("resize", refreshMe)
		this.addEventListener("refresh", refreshMe)
		this.addEventListener("rotate", refreshMe)
		this.dependedApps=[]
		this.doQueryElements()
		this.PROPS.run["tooltippmaster"]=this
		function refreshMe(event)
			{
			that.refresh(event.type)	
			}
		this.connected()
		}

	refresh(event="")
		{
		var that=this

		this._log("refresh event", event)	
		let connected=this.PROPS.run?.states?.connected||false
		let constructed=this.PROPS.run?.states?.constructed||false
		let profiled=this.PROPS.run?.states?.profiled||false
		if (!profiled || !connected || !this.app) return
		this.PROPS.run["currentProfile"]=this._extender({}, this.setCurrentProfile(this.PROPS.run))
		let css=this.PROPS.run["currentProfile"].design.css||{}
		for (let key of Object.keys(css))
			{
			this.style.setProperty(`--tgepg-${key}-org`, `${css[key]}`);
			}

		if (!constructed)
			{
			this.init()		
			}
		switch (event)
			{
			case "resize":
				let viewport=document.documentElement;
				if (viewport)
					{
					this.PROPS.run["appHeight"]=viewport.getBoundingClientRect().height-this.getBoundingClientRect().top	-5	
					}		
				break;
			case "refresh":
				this.PROPS.run.timers=this.PROPS.run.timers||{}
				for (let ID of Object.keys(this.PROPS.run.timers))
					{
					let item=this.progList._shadowRoot.querySelector(`tgepg-progitem[entitie="${this.PROPS.run.timers[ID]["entitie"]}"][eventid="${this.PROPS.run.timers[ID]["eventid"]}"]`)	
					if (item)
						{
						if (this.PROPS.run.timers[ID]["isUsed"])
							{
							item.classList.add("record")
							}
						else
							{
							item.classList.remove("record")	
							}
						this._log("recorditem", item)		
						}
					}
				break;	
			case "profiled":
				let genres=this.PROPS.run?.currentProfile?.design?.genre||{}
				for (let key of Object.keys(genres))
					{
					this.style.setProperty(`--tgepg-genrecolor-${key.toUpperCase()}-org`, `${genres[key]}`);
					}
				break;
				
			}
		if (event=="resize")
			{
			}	
		this.calculate()
		this.refreshAppSizeAfterResizeOrInit()
		this.updateScrollbars("horizontal" );

			
	
		}
	calculate()
		{
		let run=this.PROPS.run	
		let width=parseInt(this.app.clientWidth)-parseInt(run.currentProfile.design.channelRowWidth)
		run.currentProfile.design["scale"]=width/parseInt(run.currentProfile.design.previewSpan)
		let height=parseInt(run.appHeight)||null
		if (height && height > 0 )
			{
			this.style.setProperty('--tgepg-appHeight-calc', `${height}px`);
			}
		run["now"]= Math.floor(new Date() / 1000);
		if ( run.min && run.max)
			{
			run["scrollOffset"]=(run.scrollOffsetAbsolute && run.scrollOffsetAbsolute < run.now-run.currentProfile.design.setOfSpan)?
			run.scrollOffsetAbsolute-run.min:run.now-run.min-run.currentProfile.design.setOfSpan	
			run["scrollOffsetAbsolute"]=run.min+run["scrollOffset"]
			//let min= new Date(run.min*1000).toLocaleDateString("de-DE")	+ new Date(run.min*1000).toLocaleTimeString("de-DE")
			//let max= new Date(run.max*1000).toLocaleDateString("de-DE")	+ new Date(run.max*1000).toLocaleTimeString("de-DE")
			//console.log("run", min, max, run.currentProfile.design.setOfSpan)
			}
		this.style.setProperty('--tgepg-maxZindex-calc', `${this._maxZindex(this, this.PROPS.run.zIndexFilter)}`);
		}
	setCurrentProfile(run)
		{
		var that=this
		let profile=this._extender({},run.profiles.default, ((this._getBoolean(run.profiles.user.exclusive))?{}:run.profiles.custom), run.profiles.user)

		if (profile.options.useOrientationDetection)
			{
			profile=this._extender(profile, profile[run.orientationObserver.orientation]||{})
			delete profile.portait	
			delete profile.landscape	
			}
		if (profile.options.useWidthDetection)
			{
			profile=this._extender(profile, getwidthProfile(profile.design||{}))
			delete profile.size	
			}

		that._log("setCurrentProfile profile", profile)
		return profile

		function getwidthProfile(profile)
			{
			let sizes=Object.keys(profile.size||{})
			let width=that.app.clientWidth;
			sizes = sizes.map((size) => {
										return parseInt(size.replace(/^_/, ""))
										}).sort((a, b) => a - b);							
			let detectedSize=null	
			for (let size of sizes)
				{
				if (size<width) detectedSize=size
				}
			return (profile?.size)?profile.size[`_${detectedSize}`] || {}:{}
			}
		}
	//#########################################################################################################
	//## updateScrollbars()
	//## richtet die Scrollbars ein und hält sie aktuell
	//##
	//##
	//#########################################################################################################
	updateScrollbars(direction="", scrollwidth=null, initiator="scrollbar")
		{
		if (! this._enable_Scrollbar)	return
		var that=this;
		switch (direction)
			{
			case "horizontal":

				if (scrollwidth === null)
					{
					if ( !that.PROPS.run.scrollOffset) return	
					//console.debug("scroller", this.PROPS.run)	
					//that.PROPS.run.previewOffset=(that.PROPS.run.previewOffset)?that.PROPS.run.previewOffset:that.PROPS.run.now-that.PROPS.run._design.design_timeFrameStart
					scrollwidth=that.PROPS.run.scrollOffset*that.PROPS.run.currentProfile.design.scale
					//console.log("scroller",scrollwidth, that.PROPS.run.scrollOffset, that.PROPS.run.currentProfile.design.scale)
					}
				else
					{
					that.PROPS.run.scrollOffset=(scrollwidth/that.PROPS.run.currentProfile.design.scale)
					that.PROPS.run.scrollOffsetAbsolute=that.PROPS.run.min+that.PROPS.run.scrollOffset
					}
				if (initiator !== "app") this.programBox.scrollLeft =scrollwidth
				this.timeBar.scrollLeft =scrollwidth
				break;
			case "vertical":
				console.log("scrollerY")
				if (initiator !== "app") this.progListApp.scrollTop =scrollwidth
				this.channelBox.scrollTop =scrollwidth
				break;
			default:
				break;
			}
		}				
	//#########################################################################################################
	//## renderChannels()
	//## richtet die channelList und die ProgList ein und stößt die Aktualisierung an
	//##
	//##
	//#########################################################################################################
	renderChannels(data)
		{
		var that = this
		if (!this.app) return
		//console.info("rendering", this.channelListApp, this.progListApp)
		if (data.todolist)
			{
			let keys=Object.keys(data.todolist).filter((key) => key.startsWith("d")).sort()
			for (let key of keys)
				{
				for ( let index of data.todolist[key])
					{
					if (this.channelListApp) this.channelListApp.deleteChannel=index
					if (this.progListApp)    this.progListApp.deleteChannel=index
					}
				}
			}
		let keys=Object.keys(data.data)

		for (let key of keys)
			{
			if (data.data[key].data )
				{		
				if (this.channelListApp) this.channelListApp.setChannel=data.data[key]
				if (this.progListApp) this.progListApp.setChannel=data.data[key]
				}
			}
		if (data.todolist)
			{
			let keys=Object.keys(data.todolist).filter((key) => key.startsWith("m")).sort()
			let refresh=false
			for (let key of keys)
				{
				let indexes=Object.keys(data.data)	
				for ( let index of data.todolist[key])
					{
					if (this.progListApp)    this.progListApp.setChannel=data.data[index]
					}					
				}
			keys=Object.keys(data.todolist).filter((key) => key.startsWith("c")).sort()

			for (let key of keys)
				{
				let config=	data.todolist[key][0]||false
				if (this._getType(config, "hash"))
					{
					refresh=true
					this.PROPS.run=this._extender(this.PROPS.run, config)
					}	
				}
			if (refresh)
				{
				var ev = new CustomEvent('refresh');
				this.dispatchEvent(ev);
							
				}	
			}

		return;

		}

	doQueryElements()
		{
		var that=this
		this.card			= this._shadowRoot.querySelector("ha-card") || this._shadowRoot
		this.app 			= this.card.querySelector('[name="app"]');
		if (this.app)
			{
			this.timeBar 		= this.app.querySelector('[name="timeBar"]');
			this.timeBarApp 	= null;
			this.superButton 	= this.app.querySelector('[name="superbutton"]');
			this.channelBox 	= this.app.querySelector('[name="channelBox"]');
			this.programBox 	= this.app.querySelector('[name="programBox"]');
			this.progList 	 	= this.programBox.querySelector('[name="tgEpgProgList"]');
			this.scrollBox 		= this.app.querySelector('[name="scrollBox"]');
			this.epgOutBox 		= this.app.querySelector('[name="epgOutBox"]');
			this.epgBox 		= this.app.querySelector('[name="epgBox"]');
			this.scrollbarX		= this.app.querySelector('.scrollbarX');
			this.scrollbarY		= this.app.querySelector('.scrollbarY');
			this.floatingMenu 	= this._shadowRoot.querySelector('tg-floatingMenu');
			this.workerSource 	= this._shadowRoot.querySelector('[name="worker"]');
			this.epgTooltipp	= null
			this.epgInfo		= null
			}
		this.PROPS.run.zIndexFilter=[this.scrollbarX, this.scrollbarY]



		}
			
	detectENV()
		{
		this.PROPS.run["ENV"]=	{
								context:		"panel",
								mobile:			false,
								touch: 			(('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)),
								}
			
		
		}	
	manageEPGInfoEvent(event)
		{
		let details=event.detail
		if (["mouseover", "mouseleave", "mousemove"].includes(details.task) && this.epgTooltipp && this._enable_tooltipp)
			{
			this.epgTooltipp.data=event.detail	
			}
		if (["click", "dblclick"].includes(details.task) && this.epgInfo && this._enable_epgInfo)
			{
			console.log("manageEPGInfoEvent", details)
			this.epgInfo.data=event.detail	
			}
		}		
	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	init()
		{
		this._log("init")	
	
		let that=this;
		let test;
		if (this._enable_TimeBar) 		activateTimeBar.call(this);
		if (this._enable_FloatingMnu) 	activateFloatingMenu.call(this);
		if (this._enable_Scrollbar) 	activateScrollbars.call(this)
		if (this._enable_channelList)	activateChannellist.call(this)
		if (this._enable_progList)		activateProglist.call(this)
		if (this._enable_timemarker)    activateTimemarker.call(this)
		if (this._enable_tooltipp )    	activateToolTipp.call(this)
		if (this._enable_epgInfo)    	activateEpgInfo.call(this)


		let viewport=document.documentElement;
		if (viewport) this._resizeObserver.observe(viewport)


		this.PROPS.run["states"]["constructed"]=true
		return;
		
		function _connectToInfoTooltipp(needle, master , shadow=true)
			{
			let elem=master.querySelector(needle);
			if (! elem)
				{
				elem=document.createElement(needle);
				elem.classList.add("hide");
				elem.setAttribute("name", needle);
				if (shadow && master._shadowRoot)
					{
					master._shadowRoot.appendChild(elem);
					}
				else
					{
					master.appendChild(elem);
					}					
				elem.master=master
				elem.restrictions={left:that.channelBox.getBoundingClientRect().width}
				if (!that.PROPS.run["toolTippListener"])
					{
					that.PROPS.run["toolTippListener"]=true	
					master.addEventListener("userInteraction", function(ev){that.manageEPGInfoEvent.call(that,ev)}, false);	
					}
				}
			return elem
			}
		function activateToolTipp()
			{
			this.progListApp.enableToolTipp = this._enable_tooltipp
			if (this._enable_tooltipp)
				{
				this.epgTooltipp=_connectToInfoTooltipp('tgepg-tooltipp', this);
				this.PROPS.run.zIndexFilter.push(this.epgTooltipp)
				}
			}
		function activateEpgInfo()
			{
			this.progListApp.enableEpgInfo = this._enable_epgInfo
			if (this._enable_epgInfo)
				{
				this.epgInfo=_connectToInfoTooltipp('tgepg-info', this);
				this.PROPS.run.zIndexFilter.push(this.epgInfo)			
				}
			}
		function activateTimemarker()
			{
			this.progListApp.enableTimemarker = this._enable_timemarker
			this.PROPS.run.zIndexFilter.push(this.progListApp.timeMarker)	
			}
		function activateChannellist()
			{
			this.channelListApp=this.channelBox.querySelector('tgepg-channellist');
			if (! this.channelListApp)
				{
				this.channelListApp=document.createElement("tgepg-channellist");
				this.channelBox.appendChild(this.channelListApp);
				this.dependedApps.push({app:this.channelListApp});
				}
			}
		function activateProglist()
			{
			this.progListApp=this.programBox.querySelector('tgepg-proglist');
			if (! this.progListApp)
				{
				this.progListApp=document.createElement("tgepg-proglist");
				this.progListApp.classList.add("tgEpgProgList", "greedyH");
				this.progListApp.setAttribute("name","tgEpgProgList");
				//console.debug("renderer", this.PROPS.run)
				//this.progListApp.scale=this.PROPS.run.currentProfile.scale||1;
				this.progListApp.supermaster=this
				this.programBox.appendChild(this.progListApp);
				this.dependedApps.push({app:this.progListApp});
				}
			}
		function activateTimeBar()
			{
			var that=this;
			let tb=that.timeBar.querySelector('tgepg-timebar')
			if (! tb)
				{
				tb=document.createElement("tgepg-timebar")
				that.timeBar.appendChild(tb)
				tb.classList.add("greedy")
				that.dependedApps.push(tb)
				}
			that.timeBarApp	= tb
			}

		function activateFloatingMenu()
			{
			var that=this;
			//console.log("floatingMenu",this.floatingMenu)
			this.floatingMenu.classList.remove("hide")
			if ( (this.floatingMenu) && (! this.floatingMenu.hasAttribute("hasConnectedHandler")))
				{
				//console.log("floatingMenu2",this.floatingMenu)
				this.floatingMenu.setAttribute("stylesrc", "lib/tgControls.component.css;lib/tgFloatingMenu/tgFloatingMenu.component.css");
				this.floatingMenu.setAttribute("hasConnectedHandler", "1");
				if (this.floatingMenu.connect)
					{
					that.manageFloatingMenu("connected");
					}
				else
					{
					this.floatingMenu.addEventListener("connected", function(event)
						{
						that.manageFloatingMenu("connected");
						});
					}
				}
			}
		function activateScrollbars()
			{
			var that=this
			if (this.scrollbarX)
				{
				this.scrollbarX.classList.remove("hide")
				this.scrollbarX.restrictions={left:[this.channelBox]}		
				this.scrollbarX.connectedTo=this.progList
				this.scrollbarX.master=[this.programBox, that.timeBar]		
				this.dependedApps.push({app:this.scrollbarX});
				}
			if (this.scrollbarY)
				{
				this.scrollbarY.classList.remove("hide")
				this.scrollbarY.restrictions={right:0}		
				this.scrollbarY.connectedTo=this.progList	
				this.scrollbarY.master=this.epgBox		
				this.dependedApps.push({app:this.scrollbarY});
				}
			}

		}
	refreshAppSizeAfterResizeOrInit()
		{
		this.setCssProps(this.PROPS.run.currentProfile.design)
		if (this.progListApp && this.PROPS.run.min)
			{
			this.progListApp.timelinestart= parseInt(this.PROPS.run.min)
			//this.progListApp.scale= parseFloat(profile.scale);
			//console.log("progListApp attributeChangedCallback", this.progListApp)	
			}
		if (this.timeBarApp && this.PROPS.run.min)
			{
			//console.log("profile", this.PROPS.run)	
			this.timeBarApp.timelinestart= parseInt(this.PROPS.run.min)
			this.timeBarApp.timelineend= parseInt(this.PROPS.run.max)
			//this.progListApp.scale= parseFloat(profile.scale);
			//console.log("progListApp attributeChangedCallback", this.progListApp)	
			}
		//this.renderSubApp()
		//this._debug("refreshAppSizeAfterResizeOrInit")
		// this.style.setProperty('--first-row-height', parseInt(this.PROPS.run.firstRowHeight)+"px");
		// this.style.setProperty('--first-col-width', parseInt(this.PROPS.run.firstColWidth)+"px");
		// this.style.setProperty('--channelRowHeight', parseInt(this.PROPS.run.channelRowHeight)+"px");
		// this.style.setProperty('--scale', parseFloat(this.PROPS.run._design.design_scale));

		// // gib Attribute weiter
		// 	var keys=Object.keys(this.PROPS.run);
		// 	for (var k in childElements)
		// 		{
		// 		for (var i in keys)
		// 			{
		// 			if (Object.getPrototypeOf(childElements[k]).hasOwnProperty(keys[i]) )
		// 				{
		// 				this._debug("set in", childElements[k], keys[i], "to", this.PROPS.run[keys[i]])
		// 				childElements[k][keys[i]]=this.PROPS.run[keys[i]]
		// 				}
		// 			}
		// 		}
		return
		}
	//#########################################################################################################
	//## setCssProps()
	//##
	//##
	//##
	//#########################################################################################################
	setCssProps(profile)
		{
		//console.warn(profile)	
		this.style.setProperty('--tgepg-topBarHeight-org', parseInt(profile.topBarHeight)+"px");
		this.style.setProperty('--tgepg-channelRowWidth-org', parseInt(profile.channelRowWidth)+"px");
		this.style.setProperty('--tgepg-channelRowHeight-org', parseInt(profile.channelRowHeight)+"px");
		this.style.setProperty('--tgepg-genreStripeWidth-org', parseInt(profile.genreStripeWidth)+"px");
		this.style.setProperty('--tgepg-scale-calc', parseFloat(profile.scale));
		}
	//#########################################################################################################
	//## renderSubApp()
	//##
	//##
	//##
	renderSubApp(subApp=null)
		{
		var status="ok"
		var teststatus=status
		var that=this
		if (this.getType(subApp, "nodeElement"))
			{
			teststatus="+"
			render (subApp)
			return
			}
		else if(this.getType(subApp, "string"))
			{
			teststatus=subApp
			}

		for (var x in this.dependedApps)
			{
			render (this.dependedApps[x])
			}


		function render(app)
			{

			if (typeof app.render === "function")
				{
				renderme(app)
				}
			else if	(typeof app.app.render === "function")
				{
				renderme(app["app"])
				app["status"]=status
				}


			function renderme(me, status="ok")
				{

				if (teststatus !== "!")
					{
					status=that.transferPROPS(that, me)
					}
				if ((teststatus === "!") || (teststatus === "+" ) || (status !== "ok" ))
					{
					me.render()
					}
				}

			}
		}

	getEntityID()
		{
		ent=this._config.entities || []
		return this._config.entity;
		}

	getState(ent)
		{
		return this._hass.states[ent]||null;
		}
	getLastChanged(ent)
		{
		ent=getState(ent)	
		return ent.last_changed||null;
		}
	getEntityID(ent)
		{
		ent=getState(ent)	
		return ent.entity_id||null;
		}
	getAttributes()
		{
			return this.getState().attributes
		}
	setConfig(config)
		{
		this._info("setConfig")
		this._config = config;
		this.doCheckConfig();
		this.doUpdateConfig();
		}

	set hass(hass)
		{
		this._info("set hass", hass)
		this.doUpdateHass(hass)
		}
	// jobs
	doCheckConfig()
		{
		this._info("doCheckConfig")
		setEntity.apply(this, [this._config.entity, this._config.entities])
		function setEntity()
			{	
			for (let i = 0; i < arguments.length; i++) 
				{
				let arr=(this._getType(arguments[i], "string"))?[arguments[i]]:(this._getType(arguments[i], "array"))?arguments[i]:[]
				for (let ent of arr)
					{
					if (!this._entities[ent])	
					this._entities[ent]={name:ent, state:null, id:null, attributes:{}, last_changed:null}	
					}	
				}
			}
		if (Object.keys(this._entities).length === 0)
			{
			throw new Error('Please define an entity!');
			}
		else
			this._debug("ents", this._entities)
		}

	doUpdateConfig()
		{
		// for (let attr in this.getAttributes())
		// 	{}
		this._info("doUpdateConfig")

		}

	doUpdateHass(hass)
		{
		this._hass = hass;
		this.PROPS.run["doUpdateEnts"]=[]
		this._info("doUpdateHasss", hass)
		var that=this
		if (that._hass.user.id !== that.PROPS.run.userid)
			{
			that.PROPS.run.userid=that._hass.user.id	
			that.PROPS.run.username=that._hass.user.name
			this.PROPS.run.profiles["custom"]=this._extender({}, this._config?.profile||{})
			this.PROPS.run.profiles["user"]=this._extender({}, this._config?.profile?.users[that._hass.user.name]||{})
			this.PROPS.run.states["profiled"] =true;
			this.refresh("profiled")
			}		
		for (let ent of Object.keys(this._entities))
			{
			let state=this.getState(ent)
			if (!state)
				{
				// this._elements.error.textContent = `${ent} is unavailable.`;
				// this._elements.error.classList.remove("hidden");
				// this._elements.dl.classList.add("hidden");
				}
			else if (!this.PROPS.run.currentProfile)
				{
				return
				}	
			else if (state.last_changed !== that._entities[ent].last_changed)
				{
				this._debug("doUpdateHass update detected", that._entities[ent].last_changed, state.last_changed)	
				that._entities[ent].last_changed=state.last_changed
				that._entities[ent].id=state.entity_id
				that._entities[ent].attributes=that._extender({},state.attributes||{})
				if ( !this.PROPS.run.doUpdateEnts.includes(ent))
					{
					this.PROPS.run.doUpdateEnts.push(ent)
					this.PROPS.run.timers=this.PROPS.run.timers||{}
					for ( let key of Object.keys(this.PROPS.run.timers))
						{
						if (key.startsWith(ent))
							{
							this.PROPS.run.timers[key]["isUsed"]=false
							}
						}
					let timers=this._JSONcorrector(this._entities[ent].attributes.timers||"[]")	
					for ( let timer of timers)
						{
						let id=`${ent}_${timer.eventid||"noID"}`
						this._log("timers", this.PROPS.run.timers)
						this.PROPS.run.timers[id]=this._extender({},timer,{isUsed:true, entitie:ent})
						}
					}
				}
			}

		this.sendDataToWorker()	
		this._debug("doUpdateHass profile", this.PROPS.run.currentProfile)	
		}

	//######################################################################################################################################
	//sendDataToWorker()
	//
	//
	//######################################################################################################################################


	sendDataToWorker(now=new Date())
		{
		if ( !this.dataWorker || ( !this._enable_DataWorker && !this._enable_DataService))	return;
		let interval=100
		let maxTimespan=60*1000
		let _now=new Date()

		if 	((!this.PROPS.run?.states?.constructed) && (_now-now < maxTimespan))
			{
			setInterval(this.sendDataToWorker, interval, now)
			return	
			}

		let master=(this.PROPS.run.tooltippmaster)?
			(this.PROPS.run.tooltippmaster.getAttribute("id"))?`[id=\"${this.PROPS.run.tooltippmaster.getAttribute("id")}\"]`:
			(this.PROPS.run.tooltippmaster.getAttribute("name"))?`[name=\"${this.PROPS.run.tooltippmaster.getAttribute("name")}\"]`:
			this.PROPS.run.tooltippmaster.nodeName.toLowerCase():
			null
	
		let configs=this._extender({},this.PROPS.run.currentProfile.dataWorker||{}, {adds:this._extender({enableToolTipp:this._enable_tooltipp, master: master}, this.PROPS.run.ENV)})
		let ents=[...this.PROPS.run.doUpdateEnts||[]]
		for (let ent of ents)
			{
			this.PROPS.run.doUpdateEnts = this.PROPS.run.doUpdateEnts.filter(function(e) { return e !== ent })			
			configs=this._extender(configs,{source:ent, state:this.getState(ent)})
			//this._log("configs profile", configs)
			let workerdata=this._extender(this._entities[ent].attributes, {config:configs})
			//this._log("sendDataToWorker doUpdateHass run update", ent, `${Object.keys(workerdata).length-1} channels`, workerdata)	
			if (this._enable_DataWorker)
				{
				//console.debug(this.dataWorker)	
				this.dataWorker.postMessage(workerdata)
				}
			else if (this._enable_DataService)
				{
				this.dataWorker.addRequest(workerdata)
				}
			}
		}	





onClicked() {
	this.doToggle();
}

// accessors
isOff() {
	return this.getState().state === 'off';
}

isOn() {
	return this.getState().state === 'on';
}

getHeader() {
	return this._config.header;
}

getEntityID() {
	return this._config.entity;
}

	getState(ent) {
	//console.debug("staa", ent, this.getEntityID())
	return this._hass.states[this.getEntityID()];
}



getName(ent) {
	const friendlyName = this.getAttributes(ent).friendly_name;
	return friendlyName ? friendlyName : this.getEntityID();
}




// doListen() {
// 	this._elements.dl.addEventListener("click", this.onClicked.bind(this), false);
// }



doToggle() {
	this._hass.callService('input_boolean', 'toggle', {
		entity_id: this.getEntityID()
	});
}

// configuration defaults
static getStubConfig() {
	return { entity: "input_boolean.tcwsd" }
}
	}
