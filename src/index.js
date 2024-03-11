import { tgEpgCard } from "./tgepg-card";


customElements.define('tgepg-card', tgEpgCard);
window.customCards = window.customCards || [];
window.customCards.push({
type: "tgepg-card",
name: "epg card",
description: "epg card"
});
