import { tgEpgCard } from "./tgepg-card-class.js";


customElements.define('tgepg-card', tgEpgCard);
window.customCards = window.customCards || [];
window.customCards.push({
type: "tgepg-card",
name: "tgepg-card",
description: "epg card"
});