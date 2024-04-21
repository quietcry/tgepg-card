import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgProgItemDefaults extends tgEpgDefaultsCommon
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
		props["span"]=null;
		return props;
		}

	static get template()
		{
		var styles=super.styles||"";
			styles=styles+`
			<style>
			:host
				{
				display:inline-block;
				width:     calc( var(--progItemSpan, 0) *  var(--tgepg-scale) ) !important;
				max-width: calc( var(--progItemSpan, 0) *  var(--tgepg-scale) ) !important;
				min-width: calc( var(--progItemSpan, 0) *  var(--tgepg-scale) ) !important;
				--padding: 2px;
				--paddingLeft: var(--padding);
				--paddingRight: var(--padding);
				--paddingTop: var(--padding);
				--paddingBottom: var(--padding);
				white-space: nowrap;
				margin:0px;
				padding:0px;
				box-sizing: border-box;

				overflow: hidden;
				white-space: nowrap;
				text-overflow:clip;
				text-align:center;
				vertical-align: middle;
				text-align:center;
				height: 100%;
				max-height: 100%;
				}
			:host(.record)
				{
				background-color: red !important;	
				}
			[name="app"]
				{
				position: relative;	
				overflow:hidden;
				display:inline-box;
				/*width:100%;*/
				height:100%;
				border-radius: 1;
				border-right: 1px solid black;
				vertical-align: middle;
				padding:var(--paddingLeft) var(--paddingRight) var(--paddingTop) var(--paddingBottom);
				}
				
			[name="app"]>slot
				{
				position:relative;
				margin:0px;
				padding:0px;
				z-index:1;
				}
			[name="genrebox"],
			slot[name="titleslot"]
				{
				width: calc(100% - var(--paddingLeft) - var(--paddingRight));
				}
			[name="genrebox"]
				{
				width: calc(100% - var(--paddingLeft) - var(--paddingRight));
				top: 2px;
				position:absolute;
				display: block;
				z-index:0;
				}
			[name="genrebox"] > div[name="genre"]
				{
				width:100%;
				height: var(--tgepg-genreStripeWidth-org, 1px);
				position:relative;
				margin: 1px auto auto auto;
				}
			slot[name="genreslot"]
				{
				top: 0px;
				left:0px;
				position: absolute;	
				}
			slot[name="titleslot"]
				{
				height: calc(100% - var(--paddingTop) - var(--paddingBottom));
				text-align: center;
				vertical-align: middle;
				display:flex;
				text-overflow:clip;
				justify-content: center; align-items: center;
				}
			[name="app"]>slot>span
				{
				text-overflow:clip;
				overflow:hidden;
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
				vertical-align: middle;
				text-align:center;

				}
			</style>

			`;
			var tmp=styles+`
			<!-- App -->
				<div name="app">
					<slot name="titleslot"></slot>
					<slot name="genreslot" class="hide"></slot>
					<div name="genrebox"></div>								
				</div>
			<!-- App Ende-->
					`;
			return	tmp;
		}
	}
