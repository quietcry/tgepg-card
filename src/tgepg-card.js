import { tgEpgCard } from "./tgepg-card-class";


customElements.define('tgepg-card', tgEpgCard);
window.customCards = window.customCards || [];
window.customCards.push({
type: "tgepg-card",
name: "epg card",
description: "epg card"
});
