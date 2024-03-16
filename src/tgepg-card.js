/*
* tgEPG web component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/

import { tgEpgCard } from "./tgepg-card-class.js";


customElements.define('tgepg-card', tgEpgCard);
window.customCards = window.customCards || [];
window.customCards.push({
type: "tgepg-card",
name: "tgepg-card",
description: "epg card"
});