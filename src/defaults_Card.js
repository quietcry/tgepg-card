import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgCardDefaults extends tgEpgDefaultsCommon
	{
	constructor()
		{
		super("open");
		this["PROPS"]=
						{
						defaults: 	this._extender({}, this["PROPS"].defaults||{},
							{
							profiles:
								{
								default:
									{
									options:
										{
										useOrientationDetection:false,	
										useWidthDetection:false,	
										},	
									dataWorker:
										{
										pastTimeSec: (1*60*60),
										previewAll: (0.5*24*60*60),
										viewAllowedOversize: (0.5*60*60)	
										},			
									designOrientations:["portait", "landscape"],	
									design:
										{
										previewSpan:14400,  //tatsächlich angezeigten Minuten im Fenster
										setOfSpan:1800, //Versatz der Ansicht nach rechts damit der Zeitzeiger nicht am Fensterand steht

										channelRowWidth:120,
										channelRowHeight:35,								
										channelStyle:"icon|text",

										topBarHeight:50,

										loadReview: 7200,
										loadPreview: 604800,
										dw_loadPreviewUnits: ["last", "now", "next", "hour", "today", "tomorow", "hourly"],
										dw_useLoadUnits: true

										}
									}
								}
							}),
						}
		}
	get properties()
		{
		var props=super.properties||{_common:false};
		props["default"]=true;
		return props;
		}		

	static get template()
		{
			var styles=super.styles||"";
			styles=styles+`
			<style>
			:host
				{
				position:relative;	
				padding:0px;
				margin:0px;
				width:100%;
				bottom:50px;
				top:0px;
				/*height:100%;*/
				display:block;
				--topBarHeight-used: calc( var(--topBarHeight,45px) * 1);
				--channelRowWidth-used: calc( var(--channelRowWidth,100px) *1);
				--channelRowHeight-used: calc( var(--channelRowHeight,40px) * 1);
				--scale-used: calc( var(--scale, 1) * 1);
				--appHeight-used: calc( var(--appHeight, 100%) * 1);

				}
			div
				{
				padding: 0px;
				margin: 0px;
				box-sizing: border-box;
				display:inline-block;
				}
			ha-card
				{
				display:block;
				height:100%;	
				}	
			.gridcontainer
				{
				display: grid;
				grid-auto-rows: 1fr;
				grid-template-columns: var(--channelRowWidth-used) 1fr;
				grid-template-rows: var(--topBarHeight-used) calc(100% - var(--topBarHeight-used));
				gap: 0px 0px;
				grid-template-areas:
					"superbutton timeBar"
					"epgOutBox epgOutBox";
				width: 100%;
				height: var(--appHeight-used);

				}
			.superbutton { grid-area: superbutton; }
			.timeBar { grid-area: timeBar; }
			.epgOutBox { grid-area: epgOutBox; }


			/* [name="app"]
				{
				top:0px;
				left:0px;
				overflow: hidden;
				}
			*/
			[name="timeBar"]
				{
				background-color: lightgray;
				white-space: nowrap;
				overflow: hidden;
				}
			[name="superbutton"]
				{
				background-color: yellow;
				}
			[name="epgOutBox"]
				{
				background-color: pink;
				width:100%;
				height:100%;
				/*overflow-y: hidden;*/
				overflow-x: hidden;
				}

			[name="epgBox"]
				{
				display: grid;
				grid-auto-rows: 1fr;
				grid-template-columns: var(--channelRowWidth, 99px) 1fr;
				grid-template-rows: minmax(min-content, max-content) ;
				gap: 0px 0px;
				grid-template-areas:
					"channelBox programBox";
				width:100%;
				/*position: absolute;*/
				height:100%;
				grid-auto-flow: dense;*/
				}
			[name="channelBox"]
				{
				/*position: absolute;*/
				background-color: lightblue;
				position:relative;
				/*
				overflow-x:hidden;
				overflow-y:visible !important;*/
				}
			[name="programBox"]
				{
				top:0px;
				background-color: darkred;
				position:relative;
				overflow-x: auto;
				overflow-y: visible;

				}
			/*hide scrollbar*/
			[name="programBox"]
				{
				-ms-overflow-style: none;
				scrollbar-width: none;
				}
			[name="programBox"]::-webkit-scrollbar
				{
				display: none;
				  }
			.Tab
				{
				display:table;
				border-collapse: collapse;
				}
			.TabRow
				{
				display:table-row;
				}
			.TabCell
				{
				display:table-cell;
				vertical-align:top;
				}
			.optionBox
				{
				position:absolute;
				left:0px;
				top:0px;
				height:100%;
				width:100%;
				background-color:gray;
				z-Index:3000;
				}
			tg-epg-timebar
				{
				--timeBarBorder: 1px solid black;
				--timeBarHeight: var(--topBarHeight, 50px);
				--timeBarScale:  var(--scale, 0.1);
				}
			tg-epg-proglist, tg-epg-channellist
				{
				--channelLineHeight: var(--channelRowHeight, 50px);
				--channelLineScale:  var(--scale, 0.1);
				}

			</style>
			`;
			var tmp=styles+`
			<!-- App -->
			<ha-card>
			<div name="app" class="card-content gridcontainer">
				<div name="superbutton" class="superbutton"></div>
				<div name="timeBar" class="timeBar"></div>
				<div name="epgOutBox" class="epgOutBox">
					<tgcontrol-scrollbar class="tgcontrolscrollbarx hide" pos="bottom" getsizefrom='.tgEpgProgList' getxsizefrom="" getysizefrom=""></tgcontrol-scrollbar>
					<div name="epgBox" class="epgBox">
						<div name="channelBox" class=""></div>
						<div name="programBox" class="programBox"></div>
					</div>
				</div>
			</div>

			<!-- App Ende-->
			<tg-epg-options name="optionBox" class="optionBox hide" ></tg-epg-options>
			<tg-floatingMenu pos="brv" folded="folded"  class="hide">
				<button class="tground  black" name="blupd" id="floatingMenuTimer">T</button>
				<button class="tground  black" name="blupd" id="floatingMenuGroups">G</button>
				<button class="tground  black" name="blupd" id="floatingMenuFilter">F</button>
				<button class="tground  black" name="ButtoSave" id="floatingMenuOptions">O</button>
			</tg-floatingMenu>
			</ha-card>
			`;

			return	tmp;

		}
	}
