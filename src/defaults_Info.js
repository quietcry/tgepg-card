import { tgEpgToolTippDefaults }  from "./defaults_Tooltipp.js"

export class tgEpgInfoDefaults extends tgEpgToolTippDefaults
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
												<div class="Tab greedyW">
													<div class="TabRow">
														<div class="TabCell greedyW"></div>
														<div class="TabCell">Rec</div>
														<div class="TabCell closeButton">XXX</div>
													</div>
												</div>
												<hr>
												<div class=""><!DESCRIPTION!></div>
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
			{ max-width:40%;}
			</style>
			`;
		return styles	
		}

	static get template()
		{
		var styles=this.styles||"";
		var tmp=styles+
			`
			<!-- App -->
			<div name="container"></div>
			<!-- App Ende-->
			`;
			return	tmp;
		}
	}
