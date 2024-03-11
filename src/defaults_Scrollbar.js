import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgDefaultsScrollbar extends tgEpgDefaultsCommon
	{
	
	constructor(that)
		{
		super("open", that);
		this["PROPS"]=
						{
						default: 	this._extender({}, this["PROPS"].default||{},
									{

									}),
						}
		}
	static get template()

			{
			let tmp = `
				<style>
				:host
					{
					--scrollbarBgColor: lightgray;
					--scrollbarColor: pink transparent;
					--scrollbarSleepingWidth: 6px;
					--scrollBarWidth:12px;
	
					position:absolute;
					scrollbar-color: transparent transparent; /* thumb and track color */
					scrollbar-width: thin;
					z-index:100;
					overflow: hidden;
					}
				:host(:hover)
					{
					background-color: var(--scrollbarBgColor);
					scrollbar-color: var(--scrollbarColor);
					scrollbar-width: var(--scrollBarWidth);
					}
	
				:host([direction="vertical"],[pos="left"],[pos="right"])
					{
					top: 0px;
					bottom: 0px;
					width:var(--scrollbarSleepingWidth);
					}
				:host([pos="left"])
					{
					left:0px;
					}
				:host([direction="vertical"],[pos="right"])
					{
					right: 0px;
					}
				:host([direction="vertical"],[pos="left"],[pos="right"]) div
					{
					width:1px;
					}
				:host([direction="vertical"],[pos="left"],[pos="right"]:hover)
					{
					width: var(--scrollBarWidth);
					overflow-y: auto;
					}
				:host([direction="horizontal"]),
				:host([pos="top"]),
				:host([pos="bottom"])
					{
					height:var(--scrollbarSleepingWidth);
					}
				:host([direction="horizontal"]),
				:host([pos="bottom"])
					{
					bottom:0px;
					}
				:host([pos="top"])
					{
					top: 0px;
					}
				:host([direction="horizontal"]) div,
				:host([pos="top"]) div,
				:host([pos="bottom"]) div
					{
					height: 1px;
					}
				:host([direction="horizontal"]:hover),
				:host([pos="top"]:hover),
				:host([pos="bottom"]:hover)
					{
					height: var(--scrollBarWidth);
					overflow-x: auto;
					}
	
				</style>
				<div name="container"></div>`;
			return tmp;
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
