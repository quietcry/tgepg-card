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
						run:		{
									template:	`
												<div class="nowrap"><!DATE!> | <!START!> - <!END!></div>
												<br>
												<div class="nowrap title"><!TITLE!></div>
												<br>
												<div class="nowrap"><!SUBTITLE!></div>
												`
									}			
						}
		}
	get properties()
		{
		var props=super.properties||{_common:false};
		return props;
		}	

	static get styles()
		{
		var styles=super.styles||"";
			styles=styles+`
			<style>
			:host
				{
				position:absolute;
				z-index: calc( var(--tgepg-maxZindex-org, 0) + 2 );
				}
			div
				{
				white-space: normal;
				}
			[name="container"]
				{
				background-color:white;
				margin:4px;
				padding:3px;
				border: solid black 1px;
				border-radius:8px;	
				}	
			.nowrap
				{
				display: inline-block;
				white-space: nowrap;
				}
			.title
				{
				font-weight: bold;
				}
			div:has(> div[name="empty"])
				{
				display:none;	
				}	
			</style>
			`;
		return styles	
		}
	static get template()
		{
		var styles=this.styles;
		var tmp=styles+
			`
			<!-- App -->
			<div name="container"></div>
			<!-- App Ende-->
			`;	
			return	tmp;
		}
	}
