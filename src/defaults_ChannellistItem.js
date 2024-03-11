import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgChannelListItemDefaults extends tgEpgDefaultsCommon
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
	static get template()
		{
		var styles=super.styles||"";
			styles=styles+`
			<style>
			:host
				{
				display:inline-block;
				box-sizing: border-box;

				}
			[name="app"]
				{
				white-space: normal;
				display:inline-block;
				position:relative;
				}
			.TabCell
				{
				white-space: nowrap;
				}
			</style>

			`;
			var tmp=styles+`
			<!-- App -->
				<div name="app" class="Tab">
					<div class="TabRow">
						<div class="TabCell">
						</div>
						<div class="TabCell">
							<slot name="channelname"></slot>
						</div>
						<div class="TabCell">
							<slot name="channelicon"></slot>
						</div>
					</div>
				</div>
			<!-- App Ende-->
			`;
			return	tmp;
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

	}
