import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgChannelListDefaults extends tgEpgDefaultsCommon
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
		//console.log("tgEpgChannelListDefaults", "constructed")				
		}
	
	get properties()
		{
		var props=super.properties||{_common:false};
		props["_default"]=true;
		return props;
		}

	static get template()
		{
		//console.log("tgEpgChannelListDefaults", "template")				
	
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
						width: var(--tgepg-channelRowWidth);
						min-width: var(--tgepg-channelRowWidth);
						max-width: var(--tgepg-channelRowWidth);
						}
					.TabRow
						{
						height: var(--tgepg-channelRowHeight);
						min-height: var(--tgepg-channelRowHeight);
						max-height: var(--tgepg-channelRowHeight);
						}
					.TabCell
						{
						vertical-align: middle;
						text-align:left;
						border-top: var(--tgepg-borderheight-channelline) solid var(--tgepg-bordercolor-channelline);
						border-bottom: var(--tgepg-borderheight-channelline) solid var(--tgepg-bordercolor-channelline);					
						}
					.TabRow:nth-child(even) .TabCell
						{
						background-color: var(--tgepg-bgcolor-channel-dark);
						color: var(--tgepg-textcolor-channel-dark);
						}
					.TabRow:nth-child(odd) .TabCell
						{
						background-color: var(--tgepg-bgcolor-channel-light);
						color: var(--tgepg-textcolor-channel-light);
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
