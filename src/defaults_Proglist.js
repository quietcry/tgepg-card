import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgProgListDefaults extends tgEpgDefaultsCommon
	{
	thisIsClass=true		
	constructor(that)
		{
		super("open", that);
		this["PROPS"]=
						{
						default: 	this._extender({}, this["PROPS"].default||{},
									{

									}),
						}
		}
	// get properties()
	// 	{
	// 	var props=super.properties||{_common:false};
	// 	props["_default"]=true;
	// 	props["scale"]=null;
	// 	props["timelinestart"]=""+ Math.floor(new Date() / 1000)-(30*60);
	// 	return props;
	// 	}	

	static get template()
		{
		var styles=super.styles||"";
			styles=styles+`
			<style>
			
			:host
				{
				--timeMarkerWidth: 2px;
				display:inline-block;
				font-size:12px;
				overflow-x:auto;
				overflow-y:visible;
				/*
				position:absolute;
				*/
				left:0px;
				top:0px;
				box-sizing: border-box;

				}
			:host::-webkit-scrollbar
				{
				display: none;
				-ms-overflow-style: none;
				scrollbar-width: none;
				}
			[name="app"]
				{
				background-color: gray;
				display:inline-block;
				position:relative;
				}
			.Progline
				{
				height:100% !important;
				max-height:100% !important;
				min-height:100% !important;
				}
			.TabRow
				{
				height:100%;
				}
			[name="app"] > .TabRow
				{
				border-top: 3px solid black;
				border-bottom: 3px solid black;
				min-height: calc( var(--channelRowHeight) * 1 );
				max-height: calc( var(--channelRowHeight) * 1 );
				height: calc( var(--channelRowHeight) * 1 );

				}
			[name="app"] > .TabRow > .TabCell
				{
				height: 100%;
				}
			[name="app"] > .TabRow:nth-child(even)
				{
				background-color: green;
				color: red;
				}
			[name="app"] > .TabRow:nth-child(even) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(even)
				{
				background-color: white;
				color: black;
				}
			[name="app"] > .TabRow:nth-child(even) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(odd)
				{
				background-color: black;
				color: white;
				}
			[name="app"] > .TabRow:nth-child(odd)
				{
				background-color: brown;
				color: yellow;
				}
			[name="app"] > .TabRow:nth-child(odd) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(even)
				{
				background-color: darkgray;
				color: black;
				}
			[name="app"] > .TabRow:nth-child(odd) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(odd)
				{
				background-color: lightgray;
				color: black;
				}

			[name="timemarker"]
				{
				position:absolute;
				width: var( --timeMarkerWidth, 5px);
				background-color: red;
				z-index: 2000;
				top: 0px;
				height: 100%;
				left: calc( var(--timeMarkerOffset) * var(--scale) - calc( var(--timeMarkerWidth) / 2 ))
				}
			[genre="10"]
				{
				background-color:green !important;
				}
			[genre="11"]
				{
				background-color:blue !important;
				}
			[genre="12"]
				{
				background-color:red !important;
				}
			[genre="13"]
				{
				background-color:yellow !important;
				}
			[genre="14"]
				{
				background-color:brown !important;
				}
			tg-epg-progitem
				{
				--progItemScale: var(--channelLineScale):
				}
			.tgEpgTooltip
				{
				position: absolute;
				}


			</style>

			`;
			var tmp=styles+`
			<!-- App -->
			<div name="timemarker" class="hide"></div>
			<div class="tgEpgTooltip hide" data-id="-"></div>
			<div name="app" class="Tab">

				</div>
			<!-- App Ende-->
				`;
			return	tmp;
		}
	}
