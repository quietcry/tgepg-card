import { tgControlsHelperBasic } from './lib/tgControls.helper_basic.js';

export class tgDefaultsFloatingMenu
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
	static get properties()
		{
		var props={};
		return props;
		}

	static get template()
		{
		var styles=super.styles||"";
		styles=styles+`
				<style>
				:host
				{
				--app-bgcolor:rgba(114, 202, 74, 0.8);
				--app-width: 100%;
				--app-margin: 30px;
				--button-count: 2;
				--button-margin: 5px;
				--button-width: 40px;
				--control-height: 50px;
				--control-margin-w:4px;
				--control-margin-h:5px;
				position: absolute;
				left: var(--app-margin);
				top: var(--app-margin);
				z-index: 10000;
				}
			
			:host([pos*="l"])
				{
				left:var(--app-margin);
				right: unset;
				}
			:host([pos*="r"])
				{
				left:unset;
				right: var(--app-margin);
				}
			:host([pos*="t"])
				{
				top:var(--app-margin);
				bottom: unset;
				}
			:host([pos*="b"])
				{
				top:unset;
				bottom: var(--app-margin);
				}
			div[name="app"]
				{
				/* width: calc(var(--button-width) + 2 * var(--button-margin)); */
				display: flex;
				flex-direction: row;
				justify-content: center;
				}
			
			:host([pos*="h"]) div[name="app"]
				{
				flex-direction: row;
				}
			:host([pos*="v"]) div[name="app"]
				{
				flex-direction: column;
				}
			:host([pos*="h"][pos*="x"]) div[name="app"]
				{
				flex-direction: row-reverse;
				}
			:host([pos*="v"][pos*="x"]) div[name="app"]
				{
				flex-direction: column-reverse;
				}
			
			div[name="app"][open="true"]
				{
				/* width: calc(var(--button-width) * var(--button-count) + 2 * var(--button-margin) * (var(--button-count) + 1)); */
				}
			
			div[name="app"] > [name="floatingbutton"]
				{
				flex: auto;
				display: flex;
				justify-content: center;
				align-items: center;
				width: calc(var(--button-width) + 2 * var(--button-margin));
				height: var(--button-width);
				/* background-color: yellowgreen; */
				margin: 0px var(--button-margin);
				border-radius: calc( var(--button-width) / 2);
				border:black solid 2px;
				text-align :center;
				z-index: 44;
				}
			
			:host([pos*="h"]) div[name="app"] > [name="floatingbutton"]
				{
				margin: 0px var(--button-margin);
				width: calc(var(--button-width) + 2 * var(--button-margin));
				height: var(--button-width);
				}
			:host([pos*="v"]) div[name="app"] > [name="floatingbutton"]
				{
				margin: var(--button-margin) 0px ;
				width: var(--button-width);
				height: calc(var(--button-width));
			
				}
			
				</style>
				`	
		var tmp=styles+	`
						<div class="" name="app">
							<slot class="hide" id="buttonSlot" ></slot>
						</div>
						`
		return	tmp;				
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
