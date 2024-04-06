import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgTimebarDefaults extends tgEpgDefaultsCommon
	{
	thisIsClass=true		
	constructor()
		{
		super("open");
		this["PROPS"]=
						{
						default: 	this._extender({}, this["PROPS"].default||{},
									{

									}),
						}

		}
	get properties()
		{
		var props=super.properties||{_common:false};
		props["_default"]=true;
		return props;
		}	
			
	static get template()
		{
		var styles=super.styles||"";
		styles=styles+	`
						<style>
						:host
							{
							--timeBarBorder: 1px solid black;
							--timeBarCellHeight: calc( var( --tgepg-topBarHeight) / 5 );
							display:inline-block;
							height:var( --tgepg-topBarHeight )  !important;
							}
						[name="app"]
							{
							white-space: normal;
							background-color: gray;
							display:inline-block;
							position:relative;
							height:100%;
							}
						[name="digitline"]
							{
							height:var(--timeBarCellHeight) !important;
							min-height: var(--timeBarCellHeight)  !important;
							max-height: var(--timeBarCellHeight) !important;
							}
						[name="digitline"] .TabCell .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: min( var(--timeBarCellHeight) * 2), 12px);
							}
						[name="digitline"] .TabCell .TabCell:not(:first-child)
							{
							width:calc( var(--timeBarCellWidth) * 4) !important;
							min-width: calc( var(--timeBarCellWidth) * 4 );
							max-width: calc( var(--timeBarCellWidth) * 4 );
							}
						[name="digitline"] .TabCell .TabCell:first-child
							{
							width:calc( var(--timeBarCellWidth) * 2) !important;
							min-width: calc( var(--timeBarCellWidth) * 2 );
							max-width: calc( var(--timeBarCellWidth) * 2 );
							}
						[name="digitlinefree"]
							{
							position:absolute;
							left:0px;
							top:0px;
							height:calc( var(--timeBarCellHeight) * 1) !important;
							min-height:calc( var(--timeBarCellHeight) * 1) !important;
							max-height:calc( var(--timeBarCellHeight) * 1) !important;
							}
						[name="digitlinefree"] .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: clamp(10px , calc( var(--timeBarCellHeight) * 1) , 20px);
							}
						[name="digitlinefree"] .TabCell:not(:first-child)
							{
							width:calc( var(--timeBarCellWidth) * 4) !important;
							min-width: calc( var(--timeBarCellWidth) * 4 );
							max-width: calc( var(--timeBarCellWidth) * 4 );
							}
						[name="digitlinefree"] .TabCell:first-child
							{
							width:calc( var(--timeBarCellWidth) * 2) !important;
							min-width: calc( var(--timeBarCellWidth) * 2 );
							max-width: calc( var(--timeBarCellWidth) * 2 );
							}
						[name="barline"]
							{
							height:calc( var(--timeBarCellHeight) * 4) !important;
							}
						[name="hourcell"] .Tab > .TabRow > .TabCell
							{
							vertical-align:top;
							}
						[name="hourcell"] .greedyH > .TabRow:last-child > .TabCell
							{
							border-left: var(--timeBarBorder);
							}
						[name="barlinecell"]
							{
							border-left: var( --timeBarBorder , 1px solid black);
							}				
						.cellwidth1
							{
							width:		calc( var( --tgepg-scale  ) * 15 * 60 * 1px) !important;
							min-width: 	calc( var( --tgepg-scale  ) * 15 * 60 * 1px) !important;
							max-width: 	calc( var( --tgepg-scale  ) * 15 * 60 * 1px) !important;
							}
						.cellwidth2
							{
							width:		calc( var( --tgepg-scale  ) * 15 * 60 * 2px) !important;
							min-width: 	calc( var( --tgepg-scale  ) * 15 * 60 * 2px) !important;
							max-width: 	calc( var( --tgepg-scale  ) * 15 * 60 * 2px) !important;
							}
						.cellwidth4
							{
							width:		calc( var( --tgepg-scale  ) * 15 * 60 * 4px) !important;
							min-width: 	calc( var( --tgepg-scale  ) * 15 * 60 * 4px) !important;
							max-width: 	calc( var( --tgepg-scale  ) * 15 * 60 * 4px) !important;
							}
						[name="digitline"]:not(.free) .TabCell .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: min(calc( var(--tgepg-timeBarLineHeight) * 2), 12px);
							}
						[name="digitline"].free
							{
							position:absolute;
							left:0px;
							top:0px;
							min-height:15px;
							}
						[name="digitline"].free .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: clamp(10px , var(--tgepg-timeBarLineHeight) , 20px);
							}
								
						</style>

						`
		var tmp=styles+	`
						<!-- App -->
						<div name="app" class=""></div>
						<!-- App Ende-->

						`
		return	tmp;
		}
	}
