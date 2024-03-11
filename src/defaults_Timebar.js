import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgTimebarDefaults extends tgEpgDefaultsCommon
	{
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

	static get properties()
		{
		var props=super.properties||{};
		props["previewSpan"]=null;
		props["previewOffset"]=null;
		props["previewStart"]=null;
		props["previewEnd"]=null;
		props["scale"]=null;
		props["supermaster"]=null;
		console.debug("get properties fct in defaults timebar:", props)
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
							display:inline-block;
							height:calc( var(--timeBarCellHeight) * 4) !important;
							}
						[name="app"]
							{
							white-space: normal;
							background-color: gray;
							display:inline-block;
							position:relative;
							}
						[name="digitline"]
							{
							height:calc( var(--timeBarCellHeight) * 1) !important;
							min-height:calc( var(--timeBarCellHeight) * 1) !important;
							max-height:calc( var(--timeBarCellHeight) * 1) !important;
							}
						[name="digitline"] .TabCell .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: min(calc( var(--timeBarCellHeight) * 2), 12px);
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
						[name="hourcell"]
							{
							width:calc( var(--timeBarCellWidth) * 4) !important;
							min-width: calc( var(--timeBarCellWidth) * 4 );
							max-width: calc( var(--timeBarCellWidth) * 4 );
							}
						[name="hourcell"] .Tab > .TabRow > .TabCell
							{
							vertical-align:top;
							}
						[name="barlinecell"]
							{
							width:calc( var(--timeBarCellWidth) * 1) !important;
							min-width: calc( var(--timeBarCellWidth) * 1 );
							max-width: calc( var(--timeBarCellWidth) * 1 );
							}
						[name="hourcell"] .greedyH > .TabRow:last-child > .TabCell
							{
							border-left: var(--timeBarBorder);
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
