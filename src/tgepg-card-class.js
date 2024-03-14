
import { tgControls } from "./lib/tgControls.js";
import { tgEpgCardDefaults } from "./defaults_Card.js"
import { tgEpgDataService } from "./tgepg-dataWorker.js"
import { tgControlsHelperBasic } from "./lib/tgControls.helper_basic.js";

import './lib/epgElements/tgEpg.timebar.js';
import './lib/epgElements/tgEpg.channelList.js';
import './lib/epgElements/tgEpg.channelListItem.js';
import './lib/epgElements/tgEpg.progList.js';
import './lib/epgElements/tgEpg.progItem.js';
//import './lib/tgControls.FloatingMenu.js';
import './lib/tgControls.Scrollbar.js';

export class tgEpgCard extends tgControls
	{
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
	_enable_TimeBar=false
	_enable_Scrollbar=true
	_enable_DataWorker=true
	_enable_DataService=false
	_enable_channelList=true
	_enable_progList=true
	_dataLoopsAllowed=-1
	// lifecycle
	constructor(mode="open")
		{
		super(mode, new tgEpgCardDefaults());
		var now= new Date()
		this._info("under construction ;-)", now)
		var that=this
		if (this._enable_DataWorker)
			{
			function startworker () 
				{
				var workerstringified=tgControlsHelperBasic.toString()+" "+ tgEpgDataService.toString()
				workerstringified=workerstringified+" "+workerRunner.toString().replace(/^function .+[\n\s\t]*\{/g, '').replace(/\}$/g, '')  

				var workerBlob = new Blob( [workerstringified], { type:'text/javascript' } );
				var workerBlobUrl = URL.createObjectURL(workerBlob);
				that.dataWorker = new Worker(workerBlobUrl);
				that.dataWorker.onmessage = function(event) 
					{
					that.renderChannels(event.data)
					};
				function workerRunner()
					{
					const workerclass= new tgEpgDataService(this) 	
					self.onmessage = function(event) 
						{
						workerclass.addRequest(event.data)
						}
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

		function refreshMe(event)
			{
			that.refresh(event.type)	
			}
	
		// if (this.workerSource)
		// 	{
		// 	let workerBlob = new Blob([this.workerSource.text], { type: "application/javascript" });
		// 	let workerUrl = URL.createObjectURL(workerBlob);
		// 	let worker = new Worker(workerUrl);
		// 	URL.revokeObjectURL(workerUrl)
		// 	console.log("wörker", worker)
		 
		// 		worker.addEventListener("message", function(messageEvent) {
		// 				   console.warn("Der Wörker sagt: " + messageEvent.data);
		// 				});	
		
		// 	}	
		
		//["connected"].forEach(evname => my.addEventListener( evname, function(event){alert("event")}))


		// this.dataWorker = new Worker("tgepg-dataWorker.js", {type: 'module'});
		// this.dataWorker.addEventListener("message", function(messageEvent)
		// 	{
		// 	var ev = new CustomEvent('message', { detail: messageEvent?.data });
		// 	console.debug("received from worker", ev )
		// 	})
		//this.doQueryElements();
		//this.doListen();
		this.connected()
		}

	refresh(event="")
		{
		var that=this

		this._debug("event", event)	
		let connected=this.PROPS.run?.states?.connected||false
		let constructed=this.PROPS.run?.states?.constructed||false
		let profiled=this.PROPS.run?.states?.profiled||false
		if (!profiled || !connected || !this.app) return
		this.PROPS.run["currentProfile"]=this._extender({}, this.setCurrentProfile(this.PROPS.run), {scale:1})

		if (!constructed)
			{
			this.init()		
			}

		if (event=="resize")
			{
			let viewport=document.documentElement;
			if (viewport)
				{
//				this._info("event resize detected", this.app.offsetHeight || null, viewport.getBoundingClientRect(), this.getBoundingClientRect())	
				this.PROPS.run["appHeight"]=viewport.getBoundingClientRect().height-this.getBoundingClientRect().top	-5	
				}	
			}	
		this.calculate()
		this.updateScrollbars("horizontal" );

			
		this.refreshAppSizeAfterResizeOrInit()
	
		}
	calculate()
		{
		let run=this.PROPS.run	
		let width=parseInt(this.app.clientWidth)-parseInt(run.currentProfile.design.channelRowWidth)
		run.currentProfile.design["scale"]=width/parseInt(run.currentProfile.design.previewSpan)
		let height=parseInt(run.appHeight)||null
		if (height && height > 0 )
			{
			this.style.setProperty('--appHeight', `${height}px`);
			}
		run["now"]= Math.floor(new Date() / 1000);
		if ( run.min && run.max)
			{
			run["scrollOffset"]=(run.scrollOffsetAbsolute && run.scrollOffsetAbsolute < run.now-run.currentProfile.design.setOfSpan)?
			run.scrollOffsetAbsolute-run.min:run.now-run.min-run.currentProfile.design.setOfSpan	
			run["scrollOffsetAbsolute"]=run.min+run["scrollOffset"]
			let min= new Date(run.min*1000).toLocaleDateString("de-DE")	+ new Date(run.min*1000).toLocaleTimeString("de-DE")
			let max= new Date(run.max*1000).toLocaleDateString("de-DE")	+ new Date(run.max*1000).toLocaleTimeString("de-DE")
			console.log("run", min, max, run.currentProfile.design.setOfSpan)
			}

		}
	setCurrentProfile(run)
		{
		var that=this	
		let userprofile=(run.username && run.profiles?.users )? run.profiles.users[run.username]||{}:{}
		let profile=this._extender({},run.profiles, userprofile)
		delete profile.users
		let options=profile.options||{}
		let design=this._extender({}, profile.design.default)
		//that._debug("setCurrentProfile profile", profile, design)
		if (options.useOrientationDetection)
			{
			design=this._extender({}, design, getwidthProfile(options.useWidthDetection||false, profile.design[run.orientationObserver.orientation]))	
			}
		else
			{
			design=this._extender({}, design, getwidthProfile(options.useWidthDetection||false, profile.design))
			}
		profile["design"]=design
		let keys=Object.keys(profile)
		for (let key of keys)
			{
			if 	(!["design", "dataWorker", "options"].includes(key))
				{
				delete profile[key]	
				}
			}
		keys=Object.keys(profile.design)
		for (let key of keys)
			{
			if 	(key.startsWith("dw_"))
				{
				let newKey=	key.slice(3)
				if (! profile.dataWorker) profile["dataWorker"]={}
				profile.dataWorker[newKey]=profile.design[key]
				delete profile.design[key]
				that._debug("setCurrentProfile key", newKey)
				}
			if 	(key.startsWith("op_"))
				{
				let newKey=	key.slice(3)
				if (! profile.options) profile["options"]={}
				profile.options[newKey]=profile.design[key]
				delete profile.design[key]
				that._debug("setCurrentProfile key", newKey)
				}
			}

		that._debug("setCurrentProfile profile2", profile)
		return profile

		function getwidthProfile(yesNo, profile)
			{
			let p=that._extender({}, profile.default)
			let sizes=[]
			let noSize={}
			let width=that.app.clientWidth;
			let keys=Object.keys(profile)
			for ( let key of keys)
				{
				if (key.match(/^_\d.*$/))
					{
					sizes.push(parseInt(key.slice(1)))	
					}
				if ( key !== "default" && key !== "portait" && key !== "landscape")	
					{
					noSize[key]=profile[key]	
					}
				}
			sizes.sort()
			let detectedSize=null	
			if (yesNo)
				{
				for (let size of sizes)
					{
					if (size<width) detectedSize=size
					}
				if (detectedSize) 
					{
					p=that._extender(p, profile[`_${detectedSize}`])
					}
				}
			if (!detectedSize) p=that._extender(p, noSize)
			return p
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
		//console.debug("start rendering", data)
		//console.info("rendering", this.channelListApp, this.progListApp)
		if (data.todolist)
			{
			let keys=Object.keys(data.todolist)
			for (let key of keys)
				{
				if (key.startsWith("d"))
					{
					for ( let index of data.todolist[key])
						{
						if (this.channelListApp) this.channelListApp.deleteChannel=index
						if (this.progListApp)    this.progListApp.deleteChannel=index
						}
					}
				}
			}
		let keys=Object.keys(data.data)
		//if(keys.length>1) console.clear()

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
			let keys=Object.keys(data.todolist)
			let refresh=false
			console.log("proglist run todo", data.todolist)
			for (let key of keys)
				{
				if (key.startsWith("m"))
					{
					for ( let config of data.todolist[key])
						{
						if (this._getType(config, "hash"))
							{
							refresh=true
							this.PROPS.run=this._extender(this.PROPS.run, config)
							}	
						}
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
	
		this.card			= this._shadowRoot.querySelector("ha-card") || this._shadowRoot
		this.app 			= this.card.querySelector('[name="app"]');
		if (this.app)
			{
			this.timeBar 		= this.app.querySelector('[name="timeBar"]');
			this.timeBarApp 	= null;
			this.superButton 	= this.app.querySelector('[name="superbutton"]');
			this.channelBox 	= this.app.querySelector('[name="channelBox"]');
			this.programBox 	= this.app.querySelector('[name="programBox"]');
			this.scrollbarX		= this._shadowRoot.querySelector('.tgcontrolscrollbarx');;
			this.scrollbarY 	= null;
			this.floatingMenu 	= this._shadowRoot.querySelector('tg-floatingMenu');
			this.workerSource 	= this._shadowRoot.querySelector('[name="worker"]');

			}
		//console.debug("query", this.channelBox || "none")
		// this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');

		// this.epgBox = this.shadowRoot.querySelector('[name="epgBox"]');
		// this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
		// this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
		// this.channelListApp = null;
		// this.progListApp = null;
		// this.optionBox = this.shadowRoot.querySelector('[name="optionBox"]');
		// this.scrollbarX = this.shadowRoot.querySelector('.tgcontrolscrollbarx');;
		// this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
		// this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
		// this.timebar = card.querySelector(".error")
		// this._elements.dl = card.querySelector(".dl")
		// this._elements.topic = card.querySelector(".dt")
		// this._elements.toggle = card.querySelector(".toggle")
		// this._elements.value = card.querySelector(".value")
		}
			
	detectENV()
		{
		this.PROPS.run["ENV"]={context:"panel", mobile:false}
			
		
		}	
		
	//######################################################################################################################################
	//init()
	//prüft die Umgebung und passt Parameter entsprechend an
	//
	//######################################################################################################################################
	init()
		{
		let that=this;
		let test;
		this.detectENV()
		if (this._enable_TimeBar) 		activateTimeBar.call(this);
		if (this._enable_FloatingMnu) 	activateFloatingMenu.call(this);
		if (this._enable_Scrollbar) 	activateScrollbars.call(this)
		if (this._enable_channelList)	activateChannellist.call(this)
		if (this._enable_progList)		activateProglist.call(this)
		let viewport=document.documentElement;
		if (viewport) this._resizeObserver.observe(viewport)

		this.PROPS.run["states"]["constructed"]=true

		return;
		
		
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
				this.progListApp.scale=this.PROPS.run.currentProfile.scale||1;
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
			this.scrollbarX.classList.remove("hide")
			this.scrollbarX.addEventListener("scrolled",
				function(event)
					{
					that.updateScrollbars("horizontal", this.scrollLeft, "app");
					});
			this.dependedApps.push({app:this.scrollbarX});
			}

		}
	refreshAppSizeAfterResizeOrInit()
		{
		this.setCssProps(this.PROPS.run.currentProfile.design)
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
		this.style.setProperty('--topBarHeight', parseInt(profile.topBarHeight)+"px");
		this.style.setProperty('--channelRowWidth', parseInt(profile.channelRowWidth)+"px");
		this.style.setProperty('--channelRowHeight', parseInt(profile.channelRowHeight)+"px");
		this.style.setProperty('--scale', parseFloat(profile.scale));
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
			that.setProfile()	
			}		
		for (let ent of Object.keys(this._entities))
			{
			let state=this.getState(ent)
			this._debug("state:", state)
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
		//console.info("sendDataToWorker", "prepair")	
		if 	((!this.PROPS.run?.states?.constructed) && (_now-now < maxTimespan))
			{
			//console.info("sendDataToWorker", "start interval")	
			setInterval(this.sendDataToWorker, interval, now)
			return	
			}
		// else 
		// if ( !this.PROPS.run.doUpdateEnts || this.PROPS.run.doUpdateEnts.length == 0)
		// 	{
		// 	console.info("sendDataToWorker", "no updates")	
		// 	return	
		// 	}
		let configs=this._extender({},this.PROPS.run.currentProfile.dataWorker||{})
		let ents=[...this.PROPS.run.doUpdateEnts||[]]
		for (let ent of ents)
			{
			this.PROPS.run.doUpdateEnts = this.PROPS.run.doUpdateEnts.filter(function(e) { return e !== ent })			
			configs=this._extender(configs,{source:ent, state:this.getState(ent)})
			let workerdata=this._extender(this._entities[ent].attributes, {config:configs})
			this._info("sendDataToWorker doUpdateHass run update", ent, `${Object.keys(workerdata).length-1} channels`, workerdata)	
			if (this._enable_DataWorker)
				{
				console.debug(this.dataWorker)	
				this.dataWorker.postMessage(workerdata)
				}
			else if (this._enable_DataService)
				{
				this.dataWorker.addRequest(workerdata)
				}
			}
	

		}	
	setProfile()
		{
		let width=window.screen.width
		let height=window.screen.height
		var defaultProfil=this.PROPS.defaults.profiles.default
		let design=this._extender({default:defaultProfil.design})
		for ( let ori of defaultProfil.designOrientations)
			{
			design[ori]=this._extender({default:defaultProfil.design})
			}
		design=this._extender(design, this._config?.profile?.design||{})
		this.PROPS.run.profiles=this._extender({},defaultProfil,this._config?.profile||{})
		this.PROPS.run.profiles["design"]=design
		this.PROPS.run["states"]["profiled"] =true;
		var ev = new CustomEvent('profiled');
		this.dispatchEvent(ev);

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
