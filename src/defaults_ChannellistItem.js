import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgChannelListItemDefaults extends tgEpgDefaultsCommon
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

	}
