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

			[name="app"]
				{
				overflow:hidden;
				display:inline-box;
				/*width:100%;*/
				height:100%;
				border-radius: 1;
				border-right: 1px solid black;
				vertical-align: middle;
				padding:2px;
				}
			[name="app"]>slot
				{
				width:100%;
				height:100%;
				text-align: center;
				position:relative;
				vertical-align: middle;
				display:flex;
				text-overflow:clip;
				justify-content: center; align-items: center;
				margin:0px;
				padding:0px;
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
				</div>
			<!-- App Ende-->
					`;
			return	tmp;
		}
	}
