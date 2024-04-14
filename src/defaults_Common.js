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
				/* Scrollbars custom design */
				/* width */
				:host.scrollbar_on.scrolling_passive::-webkit-scrollbar,
				.scrollbar_on.scrolling_passive::-webkit-scrollbar 
					{
					 width: 3px;
					}	
				/* width */
				:host.scrollbar_on::-webkit-scrollbar,
				.scrollbar_on::-webkit-scrollbar 
					{
					 width: 15px;
					}	
				/* Track */
				:host.scrollbar_on::-webkit-scrollbar-track,
				.scrollbar_on::-webkit-scrollbar-track
					{
					box-shadow: inset 0 0 5px grey;
					-webkit-box-shadow: none !important; 
					border-radius: 10px;
					background: none;
					}
					 
				/* Handle */
				:host.scrollbar_on::-webkit-scrollbar-thumb,
				.scrollbar_on::-webkit-scrollbar-thumb 
					{
					background: red; 
					border-radius: 5px;
					}
					
				/* Handle on hover */
				:host.scrollbar_on::-webkit-scrollbar-thumb:hover,
				.scrollbar_on::-webkit-scrollbar-thumb:hover 
					{
					background: #b30000;
					width:25px;
					}
				/* Handle on hover */
				:host.scrollbar_on::-webkit-scrollbar:hover,
				.scrollbar_on::-webkit-scrollbar:hover 
					{
					background: #b30000;
					width:25px;
					}
				/*scrollbar off*/		
				:host.scrollbar_off,
				.scrollbar_off
					{
					-ms-overflow-style: none;
					scrollbar-width: none;
					}
				:host.scrollbar_off::-webkit-scrollbar,
				.scrollbar_off::-webkit-scrollbar
					{
					display: none;
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
