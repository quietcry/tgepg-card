import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgDefaultsScrollbar extends tgEpgDefaultsCommon
	{
	thisIsClass=true	
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
	get properties()
		{
		var props=super.properties||{common:false};
		props["_default"]=true;
		return props;
		}

	static get styles()
		{
		var styles=super.styles||"";
			styles=styles+`
			<style>
			:host
				{
				position: absolute;
				z-index: calc( var(--tgepg-maxZindex) + 4 );

				--scrollbar-restriction-top: var(--scrollbar-restriction-top-calc , 0px);
				--scrollbar-restriction-left: var(--scrollbar-restriction-left-calc , 0px);
				--scrollbar-restriction-right: var(--scrollbar-restriction-right-calc , 0px);
				--scrollbar-restriction-bottom: var(--scrollbar-restriction-bottom-calc , 0px);

				--scrollbar-corresponding-length: var(--scrollbar-corresponding-length-calc, 0px);

				scrollbar-color: var(--tgepg-scrollbarPassive-ThumbColor);
				scrollbar-width: thin;
				}
			:host(:hover)
				{
				background-color: var(--tgepg-scrollbarActiv-BgColor);
				scrollbar-color: var(--tgepg-scrollbarActiv-ThumbColor);
				scrollbar-width: auto;
				}
		
	
			:host([pos="left"]),
			:host([pos="right"])
				{
				top: var(--scrollbar-restriction-top);
				bottom: var(--scrollbar-restriction-bottom);
				width:var(--tgepg-scrollbarPassive-Width);
				overflow-x: hidden;
				}
			:host([pos="left"])
				{
				left: var(--scrollbar-restriction-left);
				}
			:host([pos="right"])
				{
				right: var(--scrollbar-restriction-right);
				}
			:host([pos="left"]) div,
			:host([pos="right"]) div				{
				width:0.1px;
				height:var(--scrollbar-corresponding-length);
				}
			:host([pos="left"]:hover),
			:host([pos="right"]:hover)
				{
				width: var(--tgepg-scrollbarActiv-Width);
				overflow-y: auto;
				}
			:host([pos="top"]),
			:host([pos="bottom"])
				{
				left: var(--scrollbar-restriction-left);
				right: var(--scrollbar-restriction-right);
				height: var(--tgepg-scrollbarPassive-Width);
				overflow-y: hidden;

				}
			:host([pos="bottom"])
				{
				bottom: var(--scrollbar-restriction-bottom);
				}
			:host([pos="top"])
				{
				top: var(--scrollbar-restriction-top);
				}
			:host([pos="top"]) div,
			:host([pos="bottom"]) div
				{
				height: 0.1px;
				width: var(--scrollbar-corresponding-length);
				}
			:host([pos="top"]:hover),
			:host([pos="bottom"]:hover)
				{
				height: var(--tgepg-scrollbarActiv-Width);
				overflow-x: auto;
				}

			</style>
		`;
		return styles	
		}
	static get template()
		{
		var styles=this.styles;
		var tmp=styles+	`
						<div name="container"></div>
						`;
		return tmp;
		}
	}
