import { tgEpgDefaultsCommon }  from "./defaults_Common.js"

export class tgEpgToolTippDefaults extends tgEpgDefaultsCommon
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
		var props=super.properties||{_common:false};
		return props;
		}	

	static get template()
		{
		var styles=super.styles||"";
			styles=styles+`
			<style>
			:host
				{
				position:absolute;
				z-index:2001;
				background-color:white;
				max-width:40%;
				max-height:50%;
				padding:4px;
				}
			div
				{
				white-space: normal;
				}
			.hide
				{
				display:none;
				}
			.nowrap
				{
				display: inline-block;
				white-space: nowrap;
				}
			</style>
			`;
			var tmp=styles+`
			<!-- App -->
			Tooltip
			<div>
				<slot name="subtitleslot"></slot>
			</div>
			<div>
				<slot name="titleslot"></slot>
			</div>
			<div class="nowrap">
				<slot name="dateslot"></slot><slot name="startslot" class="nowrap"></slot>-<slot name="endslot" class="nowrap"></slot> <slot name="durationslot" class="nowrap"></slot>
			</div>
			<!-- App Ende-->
				`;
			return	tmp;
		}
	}
