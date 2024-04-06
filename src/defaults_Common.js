import { tgControlsHelperBasic } from './lib/tgControls.helper_basic.js';

export class tgEpgDefaultsCommon
	{
	thisIsClass=true	
	constructor()
		{
		this.helper = new tgControlsHelperBasic();

		this["PROPS"]=
			{

			}
		}
	get getPROPS()
		{
		return this._extender({}, this.PROPS||{false:""});
		}

	get properties()
		{
		return {_common:true};
		}

	static get styles()
		{
		return 	`
				<style>
				:host
					{
					}
				:host .greedy
					{
					height: 100%;
					width: 100%;
					}
				:host .greedyW
					{
					width: 100%;
					}
				:host .greedyH
					{
					height: 100%;
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
					}
				.hide
					{
					display:none;
					}
	
				tg-epg-proglist, tg-epg-channellist
					{
					--channelLineScale:  var(--tgepg-scale);
					}		
				</style>
				`	
		}	
	//######################################################################################################################################
	//
	// Weiterleitungen an die helper Klasse
	//
	//######################################################################################################################################
	//######################################################################################################################################
	_extender() 				{ return this.helper._extender.apply(this.helper, arguments);};
	//######################################################################################################################################

	}
