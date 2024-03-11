import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgChannelListDefaults extends tgEpgDefaultsCommon
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
		props["dataref"]=null;
		props["timerowheight"]="50";
		props["channelrowheight"]="50";
		props["channelcolumnwidth"]="150";

		return props;
		}

	static get template()
		{
		var styles=super.styles||"";
		styles=styles+  `
						<style>
						:host
						{
						display:inline-block;
						/*
						position:absolute;
						*/
						left:0px;
						top:0px;
						box-sizing: border-box;
						width:100%;
			
						}
					[name="app"]
						{
						white-space: normal;
						background-color: gray;
						display:inline-block;
						position:relative;
						width: var(--channelRowWidth-used);
						min-width: var(--channelRowWidth-used);
						max-width: var(--channelRowWidth-used);
						}
					.TabRow
						{
						height: var(--channelRowHeight-used);
						min-height: var(--channelRowHeight-used);
						max-height: var(--channelRowHeight-used);
						}
					.TabCell
						{
						vertical-align: middle;
						text-align:left;
						border-top: 3px solid black;
						border-bottom: 3px solid black;
			
						}
					.TabRow:nth-child(even) .TabCell
						{
						background-color: green;
						color: red;
						}
					.TabRow:nth-child(odd) .TabCell
						{
						background-color: blue;
						color: yellow;
						}

			
						</style>
						`
		let html =  `${styles}
					<div name="app" class="Tab">
					<!-- App -->
					<!-- App Ende-->
					</div>
					`;

		return html
		}



	}
