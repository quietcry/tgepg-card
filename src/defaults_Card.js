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
	static get styles()
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
			/*bottom:50px;*/
			top:0px;
			height:100%;
			display:block;
			overflow:hidden;

			--tgepg-topBarHeight: var( --tgepg-topBarHeight-org, 30px );
			--tgepg-channelRowWidth: var( --tgepg-channelRowWidth-org, 100px );
			--tgepg-channelRowHeight: var( --tgepg-channelRowHeight-org, 40px );
			--tgepg-scale: var( --tgepg-scale-org, 1 );
			--tgepg-appHeight: var( --tgepg-appHeight-calc, 100% ) ;
			--tgepg-maxZindex: var(--tgepg-maxZindex-calc, 0) ;

			--tgepg-bgcolor-primary-dark: var(--tgepg-bgcolor-primary-dark-org, var(--dark-primary-color, #0288d1));
			--tgepg-bgcolor-primary-light: var(--tgepg-bgcolor-primary-light-org, var( --light-primary-color, #b3e5fc));
			--tgepg-textcolor-primary-dark: var(--tgepg-textcolor-primary-dark-org, var( --primary-text-color, #212121));
			--tgepg-textcolor-primary-light: var(--tgepg-textcolor-primary-light-org, var( --primary-text-color, #212121));

			--tgepg-timeBarBorder: var( --tgepg-timeBarBorder-org, 1px solid black);

			--tgepg-scrollbarActiv-BgColor: var( --tgepg-scrollbarActiv-BgColor-org , lightgray); 	
			--tgepg-scrollbarActiv-ThumbColor: var( --tgepg-scrollbarActiv-ThumbColor-org , red transparent); 
			--tgepg-scrollbarActiv-Width: var( --tgepg-scrollbarActiv-Width-org , 15px); 
			--tgepg-scrollbarActiv-Visibility: var( --tgepg-scrollbarActiv-Visibility-org , visible); 
			--tgepg-scrollbarPassive-BgColor: var( --tgepg-scrollbarPassive-BgColor-org , lightgray); 	
			--tgepg-scrollbarPassive-ThumbColor: var( --tgepg-scrollbarPassive-ThumbColor-org , pink transparent); 
			--tgepg-scrollbarPassive-Width: var( --tgepg-scrollbarPassive-Width-org , 6px); 
			--tgepg-scrollbarPassive-ThumbWidth: var( --tgepg-scrollbarPassive-ThumbWidth-org , 3px); 
			--tgepg-scrollbarPassive-Visibility: var( --tgepg-scrollbarPassive-Visibility-org , visible); 

			--tgepg-bgcolor-secondary-dark: var(--tgepg-bgcolor-secondary-dark-org, var( --dark-secondary-color, #727272));
			--tgepg-bgcolor-secondary-light: var(--tgepg-bgcolor-secondary-light-org,  var( --light-secondary-color, #bdbdbd));
			--tgepg-textcolor-secondary-dark: var(--tgepg-textcolor-secondary-dark-org,  var( --primary-text-color, #212121));
			--tgepg-textcolor-secondary-light: var(--tgepg-textcolor-secondary-light-org,  var( --primary-text-color, #212121));
			--tgepg-bgcolor-channel-dark: var(--tgepg-bgcolor-channel-dark-org,  var( --dark-grey-color, #0288d1));
			--tgepg-bgcolor-channel-light: var(--tgepg-bgcolor-channel-light-org,  var( --blue-grey-color, #0288d1));
			--tgepg-textcolor-channel-dark: var(--tgepg-textcolor-channel-dark-org,  var( --text-primary-color, #ffffff));
			--tgepg-textcolor-channel-light: var(--tgepg-textcolor-channel-light-org,  var( --text-primary-color, #ffffff));


			--tgepg-color-divider: var(--tgepg-color-divider-org,  var( --divider-color, rgba(0, 0, 0, 0.12)));
			--tgepg-width-timeMarker: var(--tgepg-width-timeMarker-org,  2px);
			--tgepg-color-timeMarker: var(--tgepg-color-timeMarker-org,  var(--pink-color, red));
			--tgepg-borderheight-channelline: var(--tgepg-borderheight-channelline-org,  3px);
			--tgepg-bordercolor-channelline: var(--tgepg-bordercolor-channelline-org,  var( --input-outlined-idle-border-color, rgba(0, 0, 0, 0.38)));

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
			overflow:hidden;	
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
				"scrollBox scrollBox";
			width: 100%;
			height: var(--tgepg-appHeight);
			overflow:hidden;
			}
		.superbutton { grid-area: superbutton; }
		.timeBar { grid-area: timeBar; }
		.scrollBox { grid-area: scrollBox; }

		[name="timeBar"]
			{
			white-space: nowrap;
			overflow: hidden;
			height: var( --tgepg-topBarHeight )
			}
		[name="superbutton"]
			{
			}
		[name="scrollBox"]
			{
			position:relative;	
			width:100%;
			height:100%;
			overflow: hidden;
			}
		[name="epgOutBox"]
			{
			position:relative;	
			width:100%;
			height:100%;
			overflow: hidden;
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
			overflow-x:hidden;
			overflow-y:auto;
			}
		[name="channelBox"]
			{
			position:relative;
			}
		[name="programBox"]
			{
			top:0px;
			position:relative;
			overflow-x: auto;
			overflow-y: hidden;
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
/*
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
*/
		</style>
		`;
		return styles
		}
	static get template()
		{
		var styles=this.styles;
		var tmp=styles+`
			<!-- App -->
			<ha-card>
			<div name="app" class="card-content gridcontainer">
				<div name="superbutton" class="superbutton"></div>
				<div name="timeBar" class="timeBar"></div>
				<div name="scrollBox" class="scrollBox greedy scrollbar_off">
					<tgcontrol-scrollbar class="scrollbarX hide" pos="bottom"></tgcontrol-scrollbar>
					<tgcontrol-scrollbar class="scrollbarY hide" pos="right"></tgcontrol-scrollbar>
					<div name="epgOutBox" class="epgOutBox scrollbar_off">
						<div name="epgBox" class="epgBox scrollbar_off">
							<div name="channelBox" class=""></div>
							<div name="programBox" class="programBox scrollbar_off">
								<tgepg-proglist class="tgEpgProgList greedyH" name="tgEpgProgList"></tgepg-proglist>
							</div>
						</div>
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
