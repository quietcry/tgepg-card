
//import { tgControlsHelperBasic } from "./lib/tgControls.helper_basic.js";
// Struktur:
	// 			this.channels=	{
	// 							todolist:	{
	//										delete:[]
	//										},
	//							data		{
	//										<channelid>:	{
	//														sourceID:		"",
	//														channelID:		"",
	//														name:			"",
	//														friendlyName:	"",
	//														preSpan:		0,
	//														postSpan:		0,
	//														epg:			{},
	//														data:			{
	//																		<key>:	{
	//																				start:123,
	//																				end:123;
	//																				duration:123,
	//																				key:"",
	//																				html:"",
	//																				epg:{}
	//																				}
	//																		},
	//														todolist:		{},
	//														}
	//										}
	//							}

export class tgEpgDataService
    {
    constructor(me=null)
        {
        //super();
		this.YES			= [true, "true", 1, "1"];
		this.NO				= [false, "false", 0, "0", null];
		this.PROPS=this._extender(
			{
			run:{
				msg:
					{
					error:true,
					warn:true,
					info:true,
					debug:true,
					log:true
					}
				}
			})
		

        this.basicConfig =
            {
			pastTimeSec: (1*60*60),
			previewAll: (1*24*60*60),
            map:
                {
				duration: ["DURATION", "_duration", "duration", "DURATION"],
                start: ["START", "_start", "start", "START"],
                end: ["END", "_end", "end", "END"],
                CHANNELID: ["CHANNELID", "channelID", "CHANNELID"],
				ID:["ID", "id", "ID"],
                TITLE: ["TITLE", "TITLE"],
                SUBTITLE: ["SUBTITLE", "SUBTITLE"],
				DESCRIPTION:["DESCRIPTION", "DESCRIPTION"],
				adds:["ADDS", "adds", "ADDS"],
                },
            showTemplate: `<tgepg-progitem class="TabCell" span="<!DURATION!>" <!ADDS!> start="<!START!>" end="<!END!>" channelid="<!CHANNELID!>" id="<!ID!>" style="--progItemSpan: <!DURATION!>px;">
							<div name="title" slot="titleslot"><!TITLE!></div>
							<div name="subtitle" slot="subtitleslot"><!SUBTITLE!></div>
							<div name="description" slot="descriptionslot"><!DESCRIPTION!></div>
							<div name="start" slot="startslot" content="time"><!START!></div>
							<div name="end" slot="endslot" content="time"><!END!></div>
							<div name="date" slot="noslot" content="date"><!START!></div>
							</tgepg-progitem>`,
            channelTemplate: `<tgepg-progline class="TabCell" <!ADDS!> channelid="<!CHANNELID!>" id="<!ID!>"><!SHOWTEMPLATE!></tgepg-progline>`,
            };
		this.me = (me)? me :null	;
        this.channelsHtml = {};
        this.channelsTmpl 	= 	{
								data:{}
								};
		this.channelTmpl	= 	{
								sourceID: null,
								channelID: null,
								name: null,
								id: null,
								preSpan:null,
								postSpan:null,
								stock:{},
								usedItems:[],
								data:{},
								epg: {},
								}
		this.channels 	= 		this._extender({}, this.channelsTmpl)


		//console.debug(this.me)
        }
	sendDataBack(data)
		{
	//console.log("dataa", data)
		if (this.me instanceof DedicatedWorkerGlobalScope)
			{

			this.me.postMessage(data) 
			}
		else
			{
			var ev = new CustomEvent('fetchWorkerData', {detail:data});
			this.me.dispatchEvent(ev);	
			}
		}
	addRequest(data)
        {
        var that = this;
		that.channels["todolist"]={}
		var now = Math.floor(new Date() / 1000);

        if (data.config && this._getType(data.config, "hash"))
			{
        	this.basicConfig = this._extender(this.basicConfig, data.config);
        	}
		this._debug("data: basicConfig", this.basicConfig)
		let dp=new Date((now - parseInt(that.basicConfig.pastTimeSec))*1000)
		dp.setMinutes(0,0,0)
		let df=new Date((now + parseInt(that.basicConfig.previewAll))*1000)
		df.setMinutes(60,0,0)

		var filter=	{
					now: now,
					past: dp.getTime()/1000,
					future: df.getTime()/1000
					}
		that.basicConfig.addString=_createAddStringFromConfigAdds(that.basicConfig.adds||{})

		that.basicConfig.showTemplate=(that.basicConfig.showTemplate||"").replace(/\t|\n/g, "")			
		that.basicConfig.showTemplate=(that.basicConfig.showTemplate||"").replace(/\s+/g, " ")
		//console.log(that.basicConfig.showTemplate)			
		// vorhandene Daten aufbereiten				
		_cleanAllChannels(that.channels, filter)
		//this._log("old channels cleaned")
		// neue Daten einfügen
		if (this._getType(data, "hash") && that.basicConfig.source)
			{
			var keys = Object.keys(data);
			keys.forEach(function (k, i) // alle neuen channels
				{
				var channel=_isValidChannel(that.channels, data[k], that.basicConfig.source, that.channelTmpl , filter)
				if (!channel)
					{
					return;	
					}
				})
			}
		//this._log("channel stores updated")

		var result={todolist:that.channels.todolist||{}, data:{}}
		let channels=Object.keys(that.channels.data)
		let min, max=null
		channels.forEach(function (key, i)
			{
			let isError=null
			if (Object.keys(that.channels.data[key].stock).length == 0)
				{
				delete that.channels.data[key]
				return	
				} 	
			//console.log(">>", that.channels.data[key])
	
			while(isError!=0)
				{
				_prepareShows(that.channels.data[key], filter)

				//that._log(`shows prepaired for ${key} `, that.channels.data[key])
				that.channels.data[key]["adds"]=that.basicConfig.addString
				let res=_prepareResult(that.channels.data[key], filter, that.basicConfig.showTemplate, that.basicConfig.map )
				isError=(isError)?0:(!res)?1:0
				if (!res)
					{
					that.channels.data[key].usedItems=[]	
					continue
					}
				that.channels.data[key].epg={}
				min=(!min)?res.min:(min>res.min)?res.min:min
				max=(!max)?res.max:(max<res.max)?res.max:max
				that.channels.data[key]["min"]=res.min	
				that.channels.data[key]["max"]=res.max	
				result.data[key] =	res
				//console.log("result:", res.min, min, res.max,  max, res)	
				if (that.me)
					{
				 	that.sendDataBack(that._extender({}, result))
					result.data={}	
					}								
				//console.log("resault", result)	
				}
			})
		channels=Object.keys(that.channels.data)
		channels.forEach(function (key, i)
			{
			if (!result.data[key])	result.data[key]={id:key, data:{}}
			result.data[key]["preSpan"]=that.channels.data[key].min-min
			result.data[key]["postSpan"]=max-that.channels.data[key].max
			_addTodolist(result, "manage", key)	
			})
		_addTodolist(result, "config", {min:min, max:max, now: filter.now})	

		if (that.me)
			{
			that._debug("dataworker send WorkerData", result)
			that.sendDataBack(result)	
			}
		else
			{
			//that._debug("send WorkerData manager", result)		
			return result	
			}		
		return;

		//###############################
		function _createAddStringFromConfigAdds(adds={})
			{
			var str=""
			let keys=Object.keys(adds)
			for (let key of keys)
				{
				str+=` ${key}='${adds[key]}'`	
				}
			return str
			}
        //###############################
        //###############################
		function _prepareResult(channel, filter, templ, map)
			{
			let stock=channel.stock
			//that._log("chan:", channel)	
			let result=	{
						todolist:channel.todolist, 
						data:{},
						id:channel.id,
						name:channel.name,
						sourceID:channel.sourceID,
						channelID:channel.channelID,
						html:""
						}
			let data=result.data				
			let shows=channel.usedItems.sort()
			var lastShow=null
			let min, max=null
			shows.forEach(function (key, index)
				{
				//that._log(key, channel)	
				let show=stock[key]
				show["html"]=""
				show["_start"]=show.start
				show["_duration"]=show.duration
				show["_end"]=show.end
				show["adds"]=channel.adds


				if (show.end > filter.past && show.start < filter.past)
					{
					show._start=(filter.past)	
					show._duration=show._end-show._start
					}
				if (show.start < filter.future && show.end > filter.future )
					{
					show._end=(filter.future)	
					show._duration=show._end-show._start
					}
				let diff= (lastShow)?show._start-lastShow._end:0	
				if (diff > 0)
					{
					let newItem=	
						{
						key:		lastShow._end.toString(),
						_start:		lastShow._end,
						_duration:	diff,
						_end:		show._start,
						_type: 		"spacer"
						}
					newItem["html"]=_template_mapper(templ, map, newItem)
					data[lastShow._end.toString()]=newItem	
					_addTodolist(result, "addSpacer", newItem.key )							
					}
				else if (diff < 0)
					{
					diff=diff * -1	
					//shorten items
					if (diff < lastShow._duration)
						{
						lastShow._end=show._start	
						lastShow._duration=lastShow._end-lastShow._start	
						lastShow.html=_template_mapper(templ, map, lastShow)
						_addTodolist(result, "replace", lastShow.key )
						}
					else
						{
						lastShow.type="epgerror"
						lastShow._duration=0		
						lastShow.html=_template_mapper(templ, map, lastShow)
						return
						}						
					}						
				show.html=_template_mapper(templ, map, show)
				data[key]=show				
				lastShow=show
				min=(!min)?show._start:(min>show._start)?show._start:min
				max=(!max)?show._end:(max<show._end)?show._end:max
				})
			result["min"]=min	
			result["max"]=max	
			//console.log("result::", result)
			let keys=Object.keys(data).sort()
			for ( let key of keys)
				{
				result.html+=data[key].html	|| ""
				}	
			return result
			}
        //###############################
        //###############################
		function _prepareShows(channel, filter)
			{
			//that._log("prepair", that.channels)	
			let shows=Object.keys(channel.stock).sort()
			shows.forEach(function (show, i)
				{
				//if ((channel.stock[show].end >= filter.past || channel.stock[show].start <= filter.future) && ( !channel.usedItems.includes(show)))
				if (
					(channel.stock[show].end >= filter.past  && channel.stock[show].start <= filter.future) && ( !channel.usedItems.includes(show)))
					{
					channel.usedItems.push(show)
					_addTodolist(channel, "add", show)
					}
				})
			//console.log("toodo _prepareShows", channel)	
			}
        //###############################
        //###############################
		function _isValidChannel(channels, newChannel, source, tmpl, filter)
			{
			let srcData = that._getType(newChannel, "jsonstring") ? that._JSONcorrector(newChannel) : "";
			if ( that._getType(srcData, "hash") && srcData.channeldata && srcData.epg ) // valid channel
				{
				return _createChannelItem(channels, srcData, source, tmpl , filter )
				}
			return false	
			}
        //###############################
        //###############################
		function _cleanChannel(channel, filter, what=[])
			{
			// veraltete Stock-Items aus dem Stock werfen
			if (what.length == 0 || what.includes("stock"))
				{
				var keys = Object.keys(channel.stock||{});
				for (let key of keys)
					{
					let item=channel.stock[key]	
					if (item.end <= filter.past)
						{
						delete channel.stock[key];
						if (channel.usedItems.includes(key) )
							{
							channel.usedItems.splice(channel.usedItems.indexOf(key),1)
							_addTodolist(channel,"delete",key)
							}
						}
					}
				}
			// veraltete EPG.Items entfernen, den Rest zum Stock hinzu
			if (what.length == 0 || what.includes("epg"))
				{
				var keys = Object.keys(channel.epg||{});
				for (let key of keys)
					{
					let reg=new RegExp(/^[0-9]+$/)	
					if (reg.test(key))
						{
						let item=_createShowItem(key, channel.epg[key], channel.id)
						if (item.end > filter.past)
							{
							channel.stock[key]=item	
							}
						}	
					}
				}			
			//channel.epg={}
			}
        //###############################
        //###############################
		function _cleanAllChannels(cs, filter)
			{
			let channels=cs.data||{}
			var keys = Object.keys(channels);
			keys.forEach(function (key, i)
				{
				let channel=channels[key]	
				if (_isBlacklisted([channel.name, channel.channelID, channel.sourceID ]))
					{
					_addTodolist(cs, "delete_blacklist", channel.id )
					delete cs.data[key]
					return
					}
				channel["todolist"]={}
				_cleanChannel(channel, filter)				
				})
			}
        //###############################
        //###############################
		function _template_mapper(templ, map, source)
			{
			var mapkeys = Object.keys(map);
			var sourcekeys = Object.keys(source);
			for (let index of mapkeys)
				{
				const needle = new RegExp(`<!${map[index][0]}!>`, "gi");
				if (needle.test(templ))
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
				}
			return templ
			}
        //###############################
        //###############################
        function _createShowItem(index, epg, channelID)
            {		
			let item=that._extender({},epg)
			let start = (index.match(/^[0-9]+$/g)) ? parseInt(index) : false;
			let duration = epg[that.basicConfig.map.duration[0]] || false
			duration=(duration && duration.match(/^[0-9]+$/g))? parseInt(duration) : false;
            item= that._extender({},item,
					{
					start: 		start,
					duration: 	duration,
					end: 		(!start || !duration)?false:start+duration,
					key:		(start)?start.toString():false,
                    epg:    	that._extender({}, epg),
                    html:  		"",
					id:			`${channelID}_${start}`
					})
			item.html=_template_mapper(that.basicConfig.showTemplate, that.basicConfig.map, item)
            return item
            }
        //###############################
        //###############################
		function _addTodolist(obj=null, key=null, val=null)
			{
			if ( ! obj.todolist) obj["todolist"]={}
			if ( ! obj.todolist[key]) obj["todolist"][key]=[]
			obj.todolist[key].push(val)
			return obj
			}
        //###############################
        //###############################
		function _createChannelItem(channels, srcData, source, tmpl, filter)
			{
			let id = srcData.channeldata.channelid
			let channelkey = `${source}_${id}`;
			if (_isBlacklisted([srcData.channeldata.name, srcData.channeldata.channelid, source ]))
				{
				return false;	
				}
			if (!channels.data[channelkey]) 
				{
				channels.data[channelkey] = that._extender({}, tmpl)
				}
			let channel=channels.data[channelkey]
			channel["sourceID"] = source;
			channel["channelID"] = srcData.channeldata.channelid
			channel["name"] = srcData.channeldata.name
			channel["id"] = channelkey;
			channel["epg"] = srcData.epg||{};
			channel["preSpan"]=0
			channel["postSpan"]=0
			channel["stock"]=channel.stock||{}
			channel["usedItems"]=[]
			_cleanChannel(channel, filter, ["epg"])
			let lastUpdate=Math.floor(Date.parse(srcData.channeldata.lastUpdate||0)/1000)
			if (((lastUpdate||0) <= (channel.lastUpdate||0)))
				{
				return false;	
				}
			channel["lastUpdate"]=lastUpdate
			return channel
			}		
        // ###############################	
        // ###############################
		function _isBlacklisted(stack)
			{
			let blacklist=that._getType(that.basicConfig.blacklist, "array")?that.basicConfig.blacklist:[]
			let stackstring=stack.join("|")	
			for ( let item of blacklist)
				{
				let myitem=(item.startsWith("<!not>"))?item.slice(6):item
				let re = new RegExp(myitem, "g")
				let str=""
				if (re.test(stackstring))
					{
					return 	(item==myitem)?true:false
					}	
				}
			return false
			}
        // ###############################
        // ###############################

		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_message()
		{
		var args = Array.from(arguments);
		var type=args.shift().toLowerCase()
		if (! ["debug","info","warn","log","error"].includes(type)) return;
		if (typeof this.hasAttribute === 'function')
			{
			args.unshift(this.nodeName+((this.hasAttribute("id"))?"("+this.getAttribute("id")+")":"")+":");
			}
		if (this.PROPS.run.msg[type.toLowerCase()] !== false) console[type.toLowerCase()].apply(this,args);
		}
	//######################################################################################################################################
	_debug()
		{
		var args = Array.from(arguments); args.unshift("debug"); this._message.apply(this, args)
		}
	//######################################################################################################################################
	_info()
		{
		var args = Array.from(arguments); args.unshift("info"); this._message.apply(this, args)
		}
	//######################################################################################################################################
	_log()
		{
		var args = Array.from(arguments); args.unshift("log"); this._message.apply(this, args)
		}
	//######################################################################################################################################
	_warn()
		{
		var args = Array.from(arguments); args.unshift("warn"); this._message.apply(this, args)
		}
	//######################################################################################################################################
	_error()
		{
		var args = Array.from(arguments); args.unshift("error"); this._message.apply(this, args)
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_extender () //clone an Object
		{
		for(var i=1; i<arguments.length; i++)
			{
			for(var key in arguments[i])
				{
				var isitArray=false;
				arguments[0][key]=arguments[0][key]||{};
				if (typeof arguments[i][key] === "function")
					{
					arguments[0][key] = arguments[i][key];
					}
				else if ( isObject(arguments[i][key]) )
					{
					arguments[0][key]=(Array.isArray(arguments[i][key]))? arguments[i][key]:this._extender(arguments[0][key],arguments[i][key]);
					}
				else if (Object.prototype.hasOwnProperty.call(arguments[i], key))
					{
					arguments[0][key] = arguments[i][key];
					}
				}
			}
		return arguments[0];
		function isObject(obj)
			{
			return obj === Object(obj);
		  	}
		};
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_getType(obj, types=null)
		{
		let reg=/\s*([|,;\s])\s*/g;
		types= (!types)?null:( (Array.isArray(types))?types: ((!(typeof(types) == "string"))?null:(types == "")?null:types.split(reg)) );

		var t=typeof(obj);
		if (t=="string")
			{
			try
				{
				t="jsonstring"
				JSON.parse(obj);
				}
			catch (e)
				{
				t="string"
				}
			}
		else if (t=="object")
			{
			if (Array.isArray(obj))
				{
				t="array";
				}
			else if (obj===null)
				{
				t="null";
				}
			else if (obj.nodeType !== undefined)
				{
				switch	(obj.nodeType)
					{
					case 1:
						t="nodeElement";
						break;
					case 3:
						t="nodeText";
						break;
					default:
						t="node";
					}
				}
			else if (obj instanceof FormData)
				{
				t="formdata"
				}
			else if ( (Object.getPrototypeOf(obj)) && (obj.length))
				{
				let x=Object.getPrototypeOf(obj);
				x=x.toString();
				let y=x.match(/\s(.+?)\]$/);
				if (y) t="array"+y[1];
				}
			else if (Object.hasOwn(obj,"thisIsClass"))
				{
				t="class";
				}	
			else
				{
				t="hash";
				}
			}
		if ( (types) && (Array.isArray(types)) )
			{
			let q = types.includes(t);
			types.forEach(type =>
				{
				if (q === true) return;
				if ( (type.endsWith(".")) && (type.substr(-1)==t) ) q=true;
				});
			return (q|t);
			}
		return t;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_JSONcorrector(val="[]", splitter=null)
		{
		let org=val;
		if (this._getType(val, "string,jsonstring"))
			{
			try
				{
				val=JSON.parse(val);
				}
			catch
				{
				if (org == "")
					{
					console.debug('%cJSONcorrector: your JSON-Code was empty ', 'background: #222; color: #bada55');
					}
				else
					{
					console.debug('%cToolBar: there was an Error in your JSON Code ', 'background: #222; color: #bada55');
					console.debug('JSON-code: %c'+org, 'background: #222; color: #bada55');
					}
				if (splitter)
					{
					val=val.split(splitter);
					}
				}
			}
		return ( (this._getType(val,"array hash"))?val:[val] );
		}


	_get2digit(dig, len=2)
		{
		dig=dig+""
		while (dig.length<len){dig="0"+dig}
		return dig
		}


    }