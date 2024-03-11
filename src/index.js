import { tgEpgCard } from "./tgepg-card";


customElements.define('tg-epgcard', tgEpgCard);
window.customCards = window.customCards || [];
window.customCards.push({
type: "tg-epgcard",
name: "epg card",
description: "epg card"
});
