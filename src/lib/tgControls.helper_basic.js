export class tgControlsHelperBasic
	{
	constructor(props={})
		{
		this.extendDateObject()
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
			}, props)
		}

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_fetch(opt)
		{
		if ( ! this._getType(opt, "hash")) {console.error("format for _fetch was no hash"); return;}
		var that=this;
		var callback=opt.callback
		console.debug("fetcherzx", opt)
		opt=this._extender(
			{},
			{
			startdelay:0,
			outputdelay:0,
			url:null,
			method:"get",
			data:null,
			callback:null,
			timeout:5000,
			id:this._createID(),
			headers:{},
			fetchopt:{},
			interpretAs:null
			},
			opt,
			{
			timestamp:null,
			duration:null,
			result:null,
			status: "init",
			errortext:null
			}
			)
		opt.callback=callback
		console.debug("fetcherx", opt)
		opt.fetchopt=this._extender(opt.fetchopt,{method:opt.method, headers:opt.headers})
		if ((opt.data) && (opt.data !== null))
			{
			opt.fetchopt.method="post"
			switch (this._getType(opt.data))
				{
				case "string":
					opt.fetchopt.headers=this._extender(opt.fetchopt.headers, {'Content-Type' : 'application/text'})
					break;
				case "jsonstring":
					opt.fetchopt.headers=this._extender(opt.fetchopt.headers, {'Content-Type' : 'application/json'})
					break;
				case "formdata":
					//opt.fetchopt.headers=this._extender(opt.fetchopt.headers, {'Content-Type' : 'application/json'})
					break;
				default:
					opt.fetchopt.body= JSON.stringify(opt.data)
					opt.fetchopt.headers=this._extender(opt.fetchopt.headers, {'Content-Type' : 'application/json'})
					break;
				}
			}
		opt.timestamp=Date.now()

		//this.fetchDataStack[opt.id]=opt
		//#################################################################################################
		function runCallback(opt)
			{
			if (typeof opt.callback === "function")
				{
				opt.callback(opt)
				}
			}

		//#################################################################################################
		const delay = mseconds =>
				{
				return new Promise 	(
									resolve => setTimeout (resolve, mseconds )
									)
				};
		//#################################################################################################
		const fetcher = async () =>
				{
				that._debug("fetcher start inside", opt)
				await delay (opt.startdelay);
				fetch( opt.url, opt.fetchopt)
				.then((response) => {
									if (response.ok)
										{
										if ((opt.interpretAs) && (opt.interpretAs !== null))
											{
											opt.fetchopt["interpretAs"]=opt.interpretAs
											return response[opt.interpretAs]()
											}
										else
											{
											return response.text()
											}
										}
									else
										{
										return Promise.reject('error: ' + response.status)
										}
									})
				.then(function(response)
					{
					opt["result"]=response
					opt["duration"]=Date.now()-opt.timestamp
					opt["status"]="done"
					if (! opt.fetchopt.interpretAs)
						{
						if (that._getType(response, "jsonstring"))
							{
							opt.fetchopt["interpretAs"]="json"
							opt["result"]=JSON.parse(response) || response;
							}
						else
							{
							opt.fetchopt["interpretAs"]="text"
							}
						}
					runCallback(opt)
					})
				.catch(function(error)
					{
					opt["status"]="error"
					opt["errortext"]=error
					that._error("method _fetch:",error,"\nurl="+(opt.url));
					runCallback(opt)
					});
				}
		//#################################################################################################
		fetcher()
		return;
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
	_getBoolean(val)
		{
		val=(this._getType(val, "string"))?val.toLowerCase():val;
		return this.YES.includes(val);
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
	_show(elem)
		{
		let myElem	=  (elem)?(this._getType(elem, "nodeElement"))?elem:null:( (this) && (this._getType(this, "nodeElement")) )?this:null;
		if (myElem)
			{
			//this._debug("show "+ myElem.tagName, myElem);
			myElem.classList.remove("hide");
			myElem.classList.add("show");
			}
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_hide(elem)
		{
		let myElem	=  (elem)?(this._getType(elem, "nodeElement"))?elem:null:( (this) && (this._getType(this, "nodeElement")) )?this:null;
		if (myElem)
			{
			//this._debug("hide "+ myElem.tagName, myElem);
			myElem.classList.remove("show");
			myElem.classList.add("hide");
			}
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_htmlToElements(html)
		{
		var template = document.createElement('template');
		template.innerHTML = html;
		return template.content.childNodes;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_htmlToElement(html)
		{
		var template = document.createElement('template');
		html = html.trim(); // Never return a text node of whitespace as the result
		template.innerHTML = html;
		return template.content.firstChild;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_createID(node=null)
		{
		let id = Date.now().toString(36) + Math.random().toString(36).substr(2);
		if (this._getType(node, "nodeElement")) node.setAttribute("id", id);
		return id;
		}
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

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_get2digit(dig, len=2)
		{
		dig=dig+""
		while (dig.length<len){dig="0"+dig}
		return dig
		}

	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	extendDateObject()
		{
		if( typeof Date.prototype.addHours === 'undefined' )
			{
			Date.prototype.addHours = function(h)
				{
				this.setTime(this.getTime() + (h*60*60*1000));
				return this;
				}
			}
		if( typeof Date.prototype.addMinutes === 'undefined' )
			{
			Date.prototype.addMinutes = function(m)
				{
				this.setTime(this.getTime() + (m*60*1000));
				return this;
				}
			}
		if( typeof Date.prototype.addSeconds === 'undefined' )
			{
			Date.prototype.addSeconds = function(m)
				{
				this.setTime(this.getTime() + (m*1000));
				return this;
				}
			}
		if( typeof Date.prototype.floorHours === 'undefined' )
			{
			Date.prototype.floorHours = function()
				{
				let month=(this.getMonth()+1)+""; while (month.length<2){month="0"+month}
				let day=(this.getDate())+""; while (day.length<2){day="0"+day}
				let hour=(this.getHours())+""; while (hour.length<2){hour="0"+hour}
				this.setTime(Date.parse(`${this.getFullYear()}-${month}-${day}T${hour}:00:00.000`))

				return this;
				}
			}
		if( typeof Date.prototype.ceilHours === 'undefined' )
			{
			Date.prototype.ceilHours = function()
				{
				let month=(this.getMonth()+1)+""; while (month.length<2){month="0"+month}
				let day=(this.getDate())+""; while (day.length<2){day="0"+day}
				let hour=(this.getHours())+""; while (hour.length<2){hour="0"+hour}
				this.setTime(Date.parse(`${this.getFullYear()}-${month}-${day}T${hour}:00:00.000`)+3600000)
				return this;
				}
			}
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_readFromStorage(app=null)
		{
		let opt=localStorage.getItem(app) || "{}";
		return JSON.parse(opt) || opt;
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_clearStorage(app=null)
		{
		localStorage.removeItem(app);
		}
	//######################################################################################################################################
	//
	//
	//
	//######################################################################################################################################
	_writeToStorage(app, opt={})
		{
		//opt=this._extender({}, opt);
		for (let prop in opt)
			{
			if (prop.startsWith("_")) delete opt[prop];
			}
		var org=this._readOptionsFromStorage(app)
		var keys=Object.keys(opt);
		keys.forEach(function(key, index)
			{
			org[key]=opt[key]
			})
		opt=JSON.stringify(org);
		localStorage.setItem(app, opt);
		}

	}