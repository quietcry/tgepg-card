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

				--tgepg-topBarHeight: var( --tgepg-topBarHeight-org, 30px );
				--tgepg-channelRowWidth: var( --tgepg-channelRowWidth-org, 100px );
				--tgepg-channelRowHeight: var( --tgepg-channelRowHeight-org, 40px );
				--tgepg-scale: var( --tgepg-scale-org, 1 );
				--tgepg-appHeight: var( --tgepg-appHeight-org, 100% ) ;
				--tgepg-bgcolor-primary-dark: var( --dark-primary-color, #0288d1);
				--tgepg-bgcolor-primary-light: var( --light-primary-color, #b3e5fc);
				--tgepg-textcolor-primary-dark: var( --primary-text-color, #212121);
				--tgepg-textcolor-primary-light: var( --primary-text-color, #212121);
				--tgepg-bgcolor-secondary-dark: var( --dark-secondary-color, #727272);
				--tgepg-bgcolor-secondary-light: var( --light-secondary-color, #bdbdbd);
				--tgepg-textcolor-secondary-dark: var( --primary-text-color, #212121);
				--tgepg-textcolor-secondary-light: var( --primary-text-color, #212121);
				--tgepg-bgcolor-channel-dark: var( --dark-grey-color, #0288d1);
				--tgepg-bgcolor-channel-light: var( --blue-grey-color, #0288d1);
				--tgepg-textcolor-channel-dark: var( --text-primary-color, #ffffff);
				--tgepg-textcolor-channel-light: var( --text-primary-color, #ffffff);

				--tgepg-color-divider: var( --divider-color, rgba(0, 0, 0, 0.12));
				--tgepg-width-timeMarker: 2px;
				--tgepg-color-timeMarker: var(--pink-color, red);
				--tgepg-borderheight-channelline: 3px;
				--tgepg-bordercolor-channelline: var( --input-outlined-idle-border-color, rgba(0, 0, 0, 0.38));

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
				grid-template-columns: var(--tgepg-channelRowWidth) 1fr;
				grid-template-rows: var(--tgepg-topBarHeight) calc(100% - var(--tgepg-topBarHeight));
				gap: 0px 0px;
				grid-template-areas:
					"superbutton timeBar"
					"epgOutBox epgOutBox";
				width: 100%;
				height: var(--tgepg-appHeight);

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
				height: var( --tgepg-topBarHeight )
				}
			[name="superbutton"]
				{
				background-color: yellow;
				}
			[name="epgOutBox"]
				{
				position:relative;	
				background-color: pink;
				width:100%;
				height:100%;
				overflow-x: hidden;
				}

			[name="epgBox"]
				{
				display: grid;
				grid-auto-rows: 1fr;
				grid-template-columns: var( --tgepg-channelRowWidth ) 1fr;
				grid-template-rows: minmax(min-content, max-content) ;
				gap: 0px 0px;
				grid-template-areas:
					"channelBox programBox";
				width:100%;
				height:100%;
				grid-auto-flow: dense;
				}
			[name="channelBox"]
				{
				background-color: lightblue;
				position:relative;
				}
			[name="programBox"]
				{
				top:0px;
				background-color: darkred;
				position:relative;
				overflow-x: auto;
				overflow-y: hidden;

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
				--timeBarHeight: var( --tgepg-topBarHeight );
				--timeBarScale:  var( --tgepg-scale );
				}
			tg-epg-proglist, tg-epg-channellist
				{
				--channelLineHeight: var( --channelRowHeight);
				--channelLineScale:  var( --tgepg-scale);
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
