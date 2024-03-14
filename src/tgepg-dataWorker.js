
import { tgControlsHelperBasic } from "./lib/tgControls.helper_basic.js";
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

export class tgEpgDataService extends tgControlsHelperBasic
    {
    constructor(me=null)
        {
        super();
        this.basicConfig =
            {
			pastTimeSec: (1*60*60),
			previewAll: (7*24*60*60),
			viewAllowedOversize: (0,5*60*60),	
            map:
                {
                duration: ["DURATION", "duration", "DURATION"],
                start: ["START", "start", "START"],
                end: ["END", "end", "END"],
                channelid: ["CHANNELID", "channelID", "CHANNELID"],
				id:["ID", "id", "ID"],
                title: ["TITLE", "TITLE"],
				description:["DESCRIPTION", "DESCRIPTION"]
                },
            showTemplate: `<tgepg-progitem class="TabCell" span="<!DURATION!>" start="<!START!>" end="<!END!>" channelid="<!CHANNELID!>" id="<!ID!>" style="--progItemSpan: <!DURATION!>px;">
							<div slot="titleslot"><!TITLE!></div>
							<div slot="descriptionslot"><!DESCRIPTION!></div>
							</tgepg-progitem>`,
            channelTemplate: `<tgepg-progline class="TabCell" channelid="<!CHANNELID!>" id="<!ID!>"><!SHOWTEMPLATE!></tgepg-progline>`,
            };
		this.me = (me)? me :null	;
        this.channelsHtml = {};
        this.channelsTmpl 	= 	{
								todolist:{delete:[], add:[]},
								data:{}
								};
		this.channelTmpl	= 	{
								todolist:{delete:[], add:[]},
								data:{}
								}
		this.channels 	= 		this._extender({}, this.channelsTmpl)


		//console.debug(this.me)
        }
	sendDataBack(data)
		{
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
		if (!this._getType(data, "hash"))
			{
			this._warn("data: received",this._getType(data), data)
			return null	
			}	
	
		//alert("get request")
        var that = this;
        //###############################
		function _template_mapper(templ, map, source)
			{
			var mapkeys = Object.keys(map);
			var sourcekeys = Object.keys(source);
			mapkeys.forEach(function (k, i)
				{
				let needle=`<!${map[k][0]}!>`
				if (templ.includes(needle))
					{
					for (let p=1; p<map[k].length;p++)
						{
						if (sourcekeys.includes(map[k][p]))
							{
							const regex = new RegExp(needle, "gi");
							templ=templ.replaceAll(regex, source[map[k][1]])
							break
							}
						}

					}
				})
			//console.debug("_template_mapper", source, templ)
			return templ
			}
        //###############################
        //###############################
        function _createShowItem(index, epg, id)
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
					id:			`${id}_${start}`
					})
			item.html=_template_mapper(that.basicConfig.showTemplate, that.basicConfig.map, item)
            return item
            }
        //###############################
        //###############################
		function _cleanTodolist(list={delete:[],replace:[], add:[]})
			{
			// var keys = Object.keys(list);
			// keys.forEach(function (k, i)
			// 	{
			// 	list[k]=[]
			// 	})
			return list
			}
        //###############################
        //###############################
		function _addTodolist(obj=null, key=null, val=null)
			{
			if ( ! obj.todolist) obj["todolist"]=_cleanTodolist()
			if ( ! obj.todolist[key]) obj["todolist"][key]=[]
			obj.todolist[key].push(val)
			return obj
			}
        //###############################
        //###############################
		function _cleanChannel(c, filter)
			{
			var tmp=that._extender({},c.epg||{},c.tmp||{})	
			//console.log("dataworker", "_cleanChannel", c)	
			var keys = Object.keys(c.stock||{});
			keys = keys.sort();
			for (let key of keys)
				{
				if (c.stock[key].end < filter.past-filter.tolerance)
					{
					delete c.stock[key];
					}
				else if (c.stock[key].end >= filter.past && c.stock[key].start <= filter.future)
					{
					tmp[key]=	that._extender({},c.stock[key])
					delete c.stock[key];
					}
				}
			var keys = Object.keys(tmp);
			keys = keys.sort();
			//Aufräumen: abgelaufene Sendungen entfernen
			for (let key of keys)
				{
				tmp[key]=(!tmp[key].start)?_createShowItem(key, tmp[key], c.channelID):tmp[key]	
				
				//console.log("dataworker", "stock", tmp[key] , filter)	

				if (tmp[key].end < filter.past)
					{
					delete tmp[key];
					}
				else if (tmp[key].start > filter.future)
					{
					//console.log("dataworker", "add to stock")	
						
					c.stock[key]=	that._extender({},tmp[key])
					delete tmp[key];
					}
				}
			return tmp
			}

        //###############################
        //###############################
		function _createChannelItem(c, srcChannel, source, tmpl, filter)
			{
			let channelkey = `${source}_${srcChannel.channeldata.channelid}`;
			if (!c.data[channelkey]) c.data[channelkey] = that._extender({}, tmpl)	
			let item=c.data[channelkey]
			item["sourceID"] = source;
			item["channelID"] = srcChannel.channeldata.channelid
			item["name"] = srcChannel.channeldata.name
			item["id"] = channelkey;
			item["epg"] = srcChannel.epg||{};
			item["todolist"]=_cleanTodolist()
			item["preSpan"]=0
			item["postSpan"]=0
			item["stock"]=item.stock||{}

			item["tmp"]=_cleanChannel(item, filter)
			//console.log("dataworker", "_createChannelItem", item)

			let lastUpdate=Math.floor(Date.parse(srcChannel.channeldata.lastUpdate||0)/1000)
			if (((lastUpdate||0) <= (item.lastUpdate||0)) || _isBlacklisted([item["name"], item["channelID"], item["sourceID"] ]))
				{
				return ;	
				}
			item["lastUpdate"]=lastUpdate
			return item
			}		
        // ###############################
        // ###############################
		function _isBlacklisted(stack)
			{
			let blacklist=that._getType(that.basicConfig.blacklist, "array")?that.basicConfig.blacklist:[]
			let bool=null	
			for ( let item of blacklist)
				{
				let myitem=(item.startsWith("<!not>"))?item.slice(6):item
				let re = new RegExp(myitem, "g")
				let str=""
				for ( let hay of stack)
					{
					let _bool=re.test(hay)
					if 	(item==myitem) 
						{	
						if (_bool === true) 
							{
							return true	
							}
						bool=_bool	
						}
					else
						{	
						bool=(bool==null)?_bool:(bool === true)?true:_bool
						}	
					}
				bool=(item==myitem)?bool:(bool)?false:true
				if (bool) return bool	
				}	
			return bool
			}
        // ###############################
        // ###############################
		that.channels["todolist"]=_cleanTodolist()
		console.log("dataworker", "that.channels", that.channels)
        if (data.config && this._getType(data.config, "hash"))
			{
        	this.basicConfig = this._extender(this.basicConfig, data.config);
        	}
		var now = Math.floor(new Date() / 1000);
		var filter=	{
					now: now,
					tolerance: 		parseInt(that.basicConfig.viewAllowedOversize),
					past : 	now - 	parseInt(that.basicConfig.pastTimeSec),
					future: now + 	parseInt(that.basicConfig.previewAll)
					}	

		this._debug("data: basicConfig", this.basicConfig)
		var keys = Object.keys(that.channels.data||{});
        keys.forEach(function (k, i)
			{
			let c=that.channels.data[k]	
			c["todolist"]=_cleanTodolist()
			if (_isBlacklisted([c.name, c.channelID, c.sourceID ]))
				{
				_addTodolist(that.channels, "delete", c.id )
				delete that.channels.data[k]
				return
				}

			_cleanChannel(that.channels.data[k], filter)	

			})
        var keys = Object.keys(data);
        keys.forEach(function (k, i) // alle channels
            {
            let sourceChannel = that._getType(data[k], "jsonstring") ? that._JSONcorrector(data[k]) : "";
            if ( that._getType(sourceChannel, "hash") && sourceChannel.channeldata && sourceChannel.epg && that.basicConfig.source ) // valid channel
                {
				//console.log("dataworker", "sourceChannel", sourceChannel)
				var channel=_createChannelItem(that.channels, sourceChannel, that.basicConfig.source, that.channelTmpl , filter )
				if (!channel)
					{
					return;	
					}
				let keys = Object.keys(channel.tmp);
                for (let key of keys)
                    {
					if (channel.data[key])
						{
						delete channel.data[key]	
						}
					else
						{
						_addTodolist(channel, "add", key)	
						}	
					}
				keys = Object.keys(channel.data);
				for (let key of keys)
					{
					_addTodolist(channel, "delete", key)	
					}
				channel.data=that._extender({},channel.tmp||{})

				//console.log("dataworker", "channel", channel)
	
				keys = Object.keys(channel.data);
				var lastItem=null
                for (let key of keys.sort())
                    {
					var item=channel.data[key]
                    //Aufräumen: abgelaufene Sendungen entfernen
                    if (item.end > filter.past && item.start < filter.past-filter.tolerance)
                        {
						let d=item.end-(filter.past-filter.tolerance)	
						item.html=item.html.replace(/span="\d+"/, `span="${d}"`)
						item["changedStart"]=item.end-d
						//item["tolerance"]=filter.tolerance/60
						_addTodolist(channel, "update", key)	
                        }
                    if (item.start < filter.future && item.end > filter.future+filter.tolerance )
                        {
						//console.log("datetime!!", new Date(filter.future*1000).toLocaleString(), new Date(item.start*1000).toLocaleString(), new Date(item.end*1000).toLocaleString())	
						let d=(filter.future+filter.tolerance)-item.start	
						item.html=item.html.replace(/span="\d+"/, `span="${d}"`)
						item["changedEnd"]=item.start+d
						item["tolerance"]=new Date(filter.future*1000).toLocaleString()
	
						_addTodolist(channel, "update", key)	
                        }
					let diff= (lastItem)?item.start-lastItem.end:0	
					if (diff > 0)
						{
						//create spaceitem
						// eine Lücke
						channel.data[lastItem.end.toString()]=	
							{
							key:		lastItem.end.toString(),
							start:		lastItem.end,
							duration:	diff,
							end:		item.start,
							html:		`<tgepg-progitem class="TabCell" span="${diff}" start="${lastItem.end}" end="${item.start}" channelid="${channel.channelID}" id="${channel.channelID}_${lastItem.end}"></tgepg-progitem>`
							}
						_addTodolist(channel, "add1", lastItem.end.toString() )							
						}
					else if (diff < 0)
						{
						//shorten items
						if (diff < lastItem.duration)
							{
							lastItem.html=lastItem.html.replace(/span="\d+"/, `span="${lastItem.duration+diff}"`)
							_addTodolist(channel, "replace", lastItem.key )
							}
						else
							{
							item.html=item.html.replace(/span="/, `epgerror="time mismatch" span="`)
							_addTodolist(channel, "add2", item.key )
							}						
						}
					else
						{
						_addTodolist(channel, "add3", item.key )
						}	
                    }
				if (that.me)
					{
					let result={todolist: {}, data:{}}
					result.data[channel.id]=that._extender({}, channel)
					delete result.data[channel.id].epg	
					that.sendDataBack(result)	
					}
				}

            });
		console.log("dataworker", "that.channels 2", that.channels)

		let min=null, max=null
		for ( let chankey in that.channels.data)
			{
			let channel=that.channels.data[chankey]
			let indexes=Object.keys(channel.data)
			if (indexes.length>0)
				{
				indexes=indexes.sort()
				let start=(channel.data[indexes[0]].changedStart || channel.data[indexes[0]].start)
				//console.log("changedStart" , channel.name, channel.data[indexes[0]].changedStart, channel.data[indexes[0]].start, start)
				let end=(channel.data[indexes[indexes.length - 1]].changedEnd || channel.data[indexes[indexes.length - 1]].end)
				min=(min===null || min > start )?start:min
				max=(max===null || max < end   )?end:max
				}
			}
		let result={todolist:{}, data:{}}	
		for ( let chankey in that.channels.data)
			{
			let channel=that.channels.data[chankey]
			let indexes=Object.keys(channel.data)
			if (indexes.length>0)
				{
				indexes=indexes.sort()
				result.data[chankey]=(!this.me)?this._extender({},that.channels.data[chankey]):{}
				result.data[chankey]["data"]={}
				result.data[chankey]["id"]=channel.id
	
				if (min && max)
					{
					let start=(channel.data[indexes[0]].changedStart || channel.data[indexes[0]].start)
					let end=(channel.data[indexes[indexes.length - 1]].changedEnd || channel.data[indexes[indexes.length - 1]].end)
					let xend=channel.data[indexes[0]].end
					let xstart=channel.data[indexes[indexes.length - 1]].start
					//let msg1=`${new Date(start * 1000).toLocaleString()} - ${new Date(xend * 1000).toLocaleString()}`
					let msg1=`${new Date(xstart * 1000).toLocaleString()} - ${new Date(end * 1000).toLocaleString()}|`
					let msg2=`${(channel.data[indexes[0]].tolerance)?channel.data[indexes[0]].tolerance:""}|`
					

					result.data[chankey]["preSpan"]=start-min
					result.data[chankey]["postSpan"]=max-end
					//console.log("datetime",  msg1 , msg2, result.data[chankey]["postSpan"], max, end, channel.name, channel.data[indexes[indexes.length - 1]].changedEnd,channel.data[indexes[indexes.length - 1]].end)	

					_addTodolist(result.data[chankey], "manage", chankey)
					}
				delete result.data[chankey].epg	
				}
			else
				{
				_addTodolist(result, "delete", chankey)
				delete that.channels.data[chankey]
				}
			}
		//result["config"]={now:now,min:min,max:max}	
		_addTodolist(result, "manage", {now:now,min:min,max:max})	
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
        }
    }