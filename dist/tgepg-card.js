// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"02s2e":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "835a2044d8e780af";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"ciLff":[function(require,module,exports) {
var _tgepgCardClass = require("./tgepg-card-class");
customElements.define("tgepg-card", (0, _tgepgCardClass.tgEpgCard));
window.customCards = window.customCards || [];
window.customCards.push({
    type: "tgepg-card",
    name: "epg card",
    description: "epg card"
});

},{"./tgepg-card-class":"873X9"}],"873X9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgCard", ()=>tgEpgCard);
var _tgControlsJs = require("./lib/tgControls.js");
var _defaultsCardJs = require("./defaults_Card.js");
var _tgepgDataWorkerJs = require("./tgepg-dataWorker.js");
var _tgEpgTimebarJs = require("./lib/epgElements/tgEpg.timebar.js");
var _tgEpgChannelListJs = require("./lib/epgElements/tgEpg.channelList.js");
var _tgEpgChannelListItemJs = require("./lib/epgElements/tgEpg.channelListItem.js");
var _tgEpgProgListJs = require("./lib/epgElements/tgEpg.progList.js");
var _tgEpgProgItemJs = require("./lib/epgElements/tgEpg.progItem.js");
//import './lib/tgControls.FloatingMenu.js';
var _tgControlsScrollbarJs = require("./lib/tgControls.Scrollbar.js");
class tgEpgCard extends (0, _tgControlsJs.tgControls) {
    // private properties
    _config;
    _hass;
    _elements = {};
    _lastUpdateHass = 0;
    _EPG = null;
    _isConstructed = false;
    _entities = {};
    _profile = {};
    _configProfile = {};
    _user = {
        name: null,
        id: null
    };
    _enable_FloatingMnu = false;
    _enable_TimeBar = false;
    _enable_Scrollbar = true;
    _enable_DataWorker = true;
    _enable_channelList = true;
    _enable_progList = true;
    _dataLoopsAllowed = -1;
    // lifecycle
    constructor(mode = "open"){
        super(mode, new (0, _defaultsCardJs.tgEpgCardDefaults)());
        var now = new Date();
        this._info("under construction ;-)", now);
        var that = this;
        //this.card =
        if (this._enable_DataWorker) {
            this.dataWorker = new (0, _tgepgDataWorkerJs.tgEpgDataService)(this);
            var runloop = 0;
            this.addEventListener("fetchWorkerData", function(event) {
                runloop++;
                let ev = event.detail;
                console.log("proglist - todo", this._dataLoopsAllowed != -1 && runloop > this._dataLoopsAllowed && !ev?.todolist?.manage);
                if (this._dataLoopsAllowed != -1 && runloop > this._dataLoopsAllowed && !ev?.todolist?.manage) return;
                console.log("data", ev);
                that.renderChannels(ev);
            });
        }
        this.addEventListener("connected", refreshMe);
        this.addEventListener("profiled", refreshMe);
        this.addEventListener("resize", refreshMe);
        this.addEventListener("refresh", refreshMe);
        this.addEventListener("rotate", refreshMe);
        function refreshMe(event) {
            that.refresh(event.type);
        }
        //["connected"].forEach(evname => my.addEventListener( evname, function(event){alert("event")}))
        this.dependedApps = [];
        this.doQueryElements();
        // this.dataWorker = new Worker("tgepg-dataWorker.js", {type: 'module'});
        // this.dataWorker.addEventListener("message", function(messageEvent)
        // 	{
        // 	var ev = new CustomEvent('message', { detail: messageEvent?.data });
        // 	console.debug("received from worker", ev )
        // 	})
        //this.doQueryElements();
        //this.doListen();
        this.connected();
    }
    refresh(event = "") {
        var that = this;
        this._debug("event", event);
        let connected = this.PROPS.run?.states?.connected || false;
        let constructed = this.PROPS.run?.states?.constructed || false;
        let profiled = this.PROPS.run?.states?.profiled || false;
        if (!profiled || !connected || !this.app) return;
        this.PROPS.run["currentProfile"] = this._extender({}, this.setCurrentProfile(this.PROPS.run), {
            scale: 1
        });
        if (!constructed) this.init();
        if (event == "resize") {
            let viewport = document.documentElement;
            if (viewport) //				this._info("event resize detected", this.app.offsetHeight || null, viewport.getBoundingClientRect(), this.getBoundingClientRect())	
            this.PROPS.run["appHeight"] = viewport.getBoundingClientRect().height - this.getBoundingClientRect().top - 5;
        }
        this.calculate();
        this.updateScrollbars("horizontal");
        this.refreshAppSizeAfterResizeOrInit();
    }
    calculate() {
        let run = this.PROPS.run;
        let width = parseInt(this.app.clientWidth) - parseInt(run.currentProfile.design.channelRowWidth);
        run.currentProfile.design["scale"] = width / parseInt(run.currentProfile.design.previewSpan);
        let height = parseInt(run.appHeight) || null;
        if (height && height > 0) this.style.setProperty("--appHeight", `${height}px`);
        run["now"] = Math.floor(new Date() / 1000);
        if (run.min && run.max) {
            run["scrollOffset"] = run.scrollOffsetAbsolute && run.scrollOffsetAbsolute < run.now - run.currentProfile.design.setOfSpan ? run.scrollOffsetAbsolute - run.min : run.now - run.min - run.currentProfile.design.setOfSpan;
            run["scrollOffsetAbsolute"] = run.min + run["scrollOffset"];
            let min = new Date(run.min * 1000).toLocaleDateString("de-DE") + new Date(run.min * 1000).toLocaleTimeString("de-DE");
            let max = new Date(run.max * 1000).toLocaleDateString("de-DE") + new Date(run.max * 1000).toLocaleTimeString("de-DE");
            console.log("run", min, max, run.currentProfile.design.setOfSpan);
        }
    }
    setCurrentProfile(run) {
        var that = this;
        let userprofile = run.profiles?.users[run.username] || {};
        let profile = this._extender({}, run.profiles, userprofile);
        delete profile.users;
        let options = profile.options || {};
        let design = this._extender({}, profile.design.default);
        //that._debug("setCurrentProfile profile", profile, design)
        if (options.useOrientationDetection) design = this._extender({}, design, getwidthProfile(options.useWidthDetection || false, profile.design[run.orientationObserver.orientation]));
        else design = this._extender({}, design, getwidthProfile(options.useWidthDetection || false, profile.design));
        profile["design"] = design;
        let keys = Object.keys(profile);
        for (let key of keys)if (![
            "design",
            "dataWorker",
            "options"
        ].includes(key)) delete profile[key];
        keys = Object.keys(profile.design);
        for (let key of keys){
            if (key.startsWith("dw_")) {
                let newKey = key.slice(3);
                if (!profile.dataWorker) profile["dataWorker"] = {};
                profile.dataWorker[newKey] = profile.design[key];
                delete profile.design[key];
                that._debug("setCurrentProfile key", newKey);
            }
            if (key.startsWith("op_")) {
                let newKey = key.slice(3);
                if (!profile.options) profile["options"] = {};
                profile.options[newKey] = profile.design[key];
                delete profile.design[key];
                that._debug("setCurrentProfile key", newKey);
            }
        }
        that._debug("setCurrentProfile profile2", profile);
        return profile;
        function getwidthProfile(yesNo, profile) {
            let p = that._extender({}, profile.default);
            let sizes = [];
            let noSize = {};
            let width = that.app.clientWidth;
            let keys = Object.keys(profile);
            for (let key of keys){
                if (key.match(/^_\d.*$/)) sizes.push(parseInt(key.slice(1)));
                if (key !== "default" && key !== "portait" && key !== "landscape") noSize[key] = profile[key];
            }
            sizes.sort();
            let detectedSize = null;
            if (yesNo) {
                for (let size of sizes)if (size < width) detectedSize = size;
                if (detectedSize) p = that._extender(p, profile[`_${detectedSize}`]);
            }
            if (!detectedSize) p = that._extender(p, noSize);
            return p;
        }
    }
    //#########################################################################################################
    //## updateScrollbars()
    //## richtet die Scrollbars ein und hält sie aktuell
    //##
    //##
    //#########################################################################################################
    updateScrollbars(direction = "", scrollwidth = null, initiator = "scrollbar") {
        if (!this._enable_Scrollbar) return;
        var that = this;
        switch(direction){
            case "horizontal":
                if (scrollwidth === null) {
                    if (!that.PROPS.run.scrollOffset) return;
                    //console.debug("scroller", this.PROPS.run)	
                    //that.PROPS.run.previewOffset=(that.PROPS.run.previewOffset)?that.PROPS.run.previewOffset:that.PROPS.run.now-that.PROPS.run._design.design_timeFrameStart
                    scrollwidth = that.PROPS.run.scrollOffset * that.PROPS.run.currentProfile.design.scale;
                //console.log("scroller",scrollwidth, that.PROPS.run.scrollOffset, that.PROPS.run.currentProfile.design.scale)
                } else {
                    that.PROPS.run.scrollOffset = scrollwidth / that.PROPS.run.currentProfile.design.scale;
                    that.PROPS.run.scrollOffsetAbsolute = that.PROPS.run.min + that.PROPS.run.scrollOffset;
                }
                if (initiator !== "app") this.programBox.scrollLeft = scrollwidth;
                this.timeBar.scrollLeft = scrollwidth;
                break;
            case "vertical":
                if (initiator !== "app") this.progListApp.scrollTop = scrollwidth;
                this.channelBox.scrollTop = scrollwidth;
                break;
            default:
                break;
        }
    }
    //#########################################################################################################
    //## renderChannels()
    //## richtet die channelList und die ProgList ein und stößt die Aktualisierung an
    //##
    //##
    //#########################################################################################################
    renderChannels(data) {
        var that = this;
        if (!this.app) return;
        //console.debug("start rendering", data)
        //console.info("rendering", this.channelListApp, this.progListApp)
        if (data.todolist) {
            let keys = Object.keys(data.todolist);
            for (let key of keys){
                if (key.startsWith("d")) for (let index of data.todolist[key]){
                    if (this.channelListApp) this.channelListApp.deleteChannel = index;
                    if (this.progListApp) this.progListApp.deleteChannel = index;
                }
            }
        }
        let keys = Object.keys(data.data);
        //if(keys.length>1) console.clear()
        for (let key of keys)if (data.data[key].data) {
            if (this.channelListApp) this.channelListApp.setChannel = data.data[key];
            if (this.progListApp) this.progListApp.setChannel = data.data[key];
        }
        if (data.todolist) {
            let keys = Object.keys(data.todolist);
            let refresh = false;
            console.log("proglist run todo", data.todolist);
            for (let key of keys)if (key.startsWith("m")) {
                for (let config of data.todolist[key])if (this._getType(config, "hash")) {
                    refresh = true;
                    this.PROPS.run = this._extender(this.PROPS.run, config);
                }
            }
            if (refresh) {
                var ev = new CustomEvent("refresh");
                this.dispatchEvent(ev);
            }
        }
        return;
    }
    doQueryElements() {
        this.card = this._shadowRoot.querySelector("ha-card") || this._shadowRoot;
        this.app = this.card.querySelector('[name="app"]');
        if (this.app) {
            this.timeBar = this.app.querySelector('[name="timeBar"]');
            this.timeBarApp = null;
            this.superButton = this.app.querySelector('[name="superbutton"]');
            this.channelBox = this.app.querySelector('[name="channelBox"]');
            this.programBox = this.app.querySelector('[name="programBox"]');
            this.scrollbarX = this._shadowRoot.querySelector(".tgcontrolscrollbarx");
            this.scrollbarY = null;
            this.floatingMenu = this._shadowRoot.querySelector("tg-floatingMenu");
        }
    //console.debug("query", this.channelBox || "none")
    // this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');
    // this.epgBox = this.shadowRoot.querySelector('[name="epgBox"]');
    // this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
    // this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
    // this.channelListApp = null;
    // this.progListApp = null;
    // this.optionBox = this.shadowRoot.querySelector('[name="optionBox"]');
    // this.scrollbarX = this.shadowRoot.querySelector('.tgcontrolscrollbarx');;
    // this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
    // this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
    // this.timebar = card.querySelector(".error")
    // this._elements.dl = card.querySelector(".dl")
    // this._elements.topic = card.querySelector(".dt")
    // this._elements.toggle = card.querySelector(".toggle")
    // this._elements.value = card.querySelector(".value")
    }
    detectENV() {
        this.PROPS.run["ENV"] = {
            context: "panel",
            mobile: false
        };
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    init() {
        let that = this;
        let test;
        this.detectENV();
        if (this._enable_TimeBar) activateTimeBar.call(this);
        if (this._enable_FloatingMnu) activateFloatingMenu.call(this);
        if (this._enable_Scrollbar) activateScrollbars.call(this);
        if (this._enable_channelList) activateChannellist.call(this);
        if (this._enable_progList) activateProglist.call(this);
        let viewport = document.documentElement;
        if (viewport) this._resizeObserver.observe(viewport);
        this.PROPS.run["states"]["constructed"] = true;
        return;
        function activateChannellist() {
            this.channelListApp = this.channelBox.querySelector("tgepg-channellist");
            if (!this.channelListApp) {
                this.channelListApp = document.createElement("tgepg-channellist");
                this.channelBox.appendChild(this.channelListApp);
                this.dependedApps.push({
                    app: this.channelListApp
                });
            }
        }
        function activateProglist() {
            this.progListApp = this.programBox.querySelector("tgepg-proglist");
            if (!this.progListApp) {
                this.progListApp = document.createElement("tgepg-proglist");
                this.progListApp.classList.add("tgEpgProgList", "greedyH");
                this.progListApp.setAttribute("name", "tgEpgProgList");
                //console.debug("renderer", this.PROPS.run)
                this.progListApp.scale = this.PROPS.run.currentProfile.scale || 1;
                this.progListApp.supermaster = this;
                this.programBox.appendChild(this.progListApp);
                this.dependedApps.push({
                    app: this.progListApp
                });
            }
        }
        function activateTimeBar() {
            var that = this;
            let tb = that.timeBar.querySelector("tgepg-timebar");
            if (!tb) {
                tb = document.createElement("tgepg-timebar");
                that.timeBar.appendChild(tb);
                tb.classList.add("greedy");
                that.dependedApps.push(tb);
            }
            that.timeBarApp = tb;
        }
        function activateFloatingMenu() {
            var that = this;
            //console.log("floatingMenu",this.floatingMenu)
            this.floatingMenu.classList.remove("hide");
            if (this.floatingMenu && !this.floatingMenu.hasAttribute("hasConnectedHandler")) {
                //console.log("floatingMenu2",this.floatingMenu)
                this.floatingMenu.setAttribute("stylesrc", "lib/tgControls.component.css;lib/tgFloatingMenu/tgFloatingMenu.component.css");
                this.floatingMenu.setAttribute("hasConnectedHandler", "1");
                if (this.floatingMenu.connect) that.manageFloatingMenu("connected");
                else this.floatingMenu.addEventListener("connected", function(event) {
                    that.manageFloatingMenu("connected");
                });
            }
        }
        function activateScrollbars() {
            var that = this;
            this.scrollbarX.classList.remove("hide");
            this.scrollbarX.addEventListener("scrolled", function(event) {
                that.updateScrollbars("horizontal", this.scrollLeft, "app");
            });
            this.dependedApps.push({
                app: this.scrollbarX
            });
        }
    }
    refreshAppSizeAfterResizeOrInit() {
        this.setCssProps(this.PROPS.run.currentProfile.design);
        //this.renderSubApp()
        //this._debug("refreshAppSizeAfterResizeOrInit")
        // this.style.setProperty('--first-row-height', parseInt(this.PROPS.run.firstRowHeight)+"px");
        // this.style.setProperty('--first-col-width', parseInt(this.PROPS.run.firstColWidth)+"px");
        // this.style.setProperty('--channelRowHeight', parseInt(this.PROPS.run.channelRowHeight)+"px");
        // this.style.setProperty('--scale', parseFloat(this.PROPS.run._design.design_scale));
        // // gib Attribute weiter
        // 	var keys=Object.keys(this.PROPS.run);
        // 	for (var k in childElements)
        // 		{
        // 		for (var i in keys)
        // 			{
        // 			if (Object.getPrototypeOf(childElements[k]).hasOwnProperty(keys[i]) )
        // 				{
        // 				this._debug("set in", childElements[k], keys[i], "to", this.PROPS.run[keys[i]])
        // 				childElements[k][keys[i]]=this.PROPS.run[keys[i]]
        // 				}
        // 			}
        // 		}
        return;
    }
    //#########################################################################################################
    //## setCssProps()
    //##
    //##
    //##
    //#########################################################################################################
    setCssProps(profile) {
        //console.warn(profile)	
        this.style.setProperty("--topBarHeight", parseInt(profile.topBarHeight) + "px");
        this.style.setProperty("--channelRowWidth", parseInt(profile.channelRowWidth) + "px");
        this.style.setProperty("--channelRowHeight", parseInt(profile.channelRowHeight) + "px");
        this.style.setProperty("--scale", parseFloat(profile.scale));
    }
    //#########################################################################################################
    //## renderSubApp()
    //##
    //##
    //##
    renderSubApp(subApp = null) {
        var status = "ok";
        var teststatus = status;
        var that = this;
        if (this.getType(subApp, "nodeElement")) {
            teststatus = "+";
            render(subApp);
            return;
        } else if (this.getType(subApp, "string")) teststatus = subApp;
        for(var x in this.dependedApps)render(this.dependedApps[x]);
        function render(app) {
            if (typeof app.render === "function") renderme(app);
            else if (typeof app.app.render === "function") {
                renderme(app["app"]);
                app["status"] = status;
            }
            function renderme(me, status = "ok") {
                if (teststatus !== "!") status = that.transferPROPS(that, me);
                if (teststatus === "!" || teststatus === "+" || status !== "ok") me.render();
            }
        }
    }
    getEntityID() {
        ent = this._config.entities || [];
        return this._config.entity;
    }
    getState(ent1) {
        return this._hass.states[ent1] || null;
    }
    getLastChanged(ent1) {
        ent1 = getState(ent1);
        return ent1.last_changed || null;
    }
    getEntityID(ent1) {
        ent1 = getState(ent1);
        return ent1.entity_id || null;
    }
    getAttributes() {
        return this.getState().attributes;
    }
    setConfig(config) {
        this._info("setConfig");
        this._config = config;
        this.doCheckConfig();
        this.doUpdateConfig();
    }
    set hass(hass) {
        this._info("set hass", hass);
        this.doUpdateHass(hass);
    }
    // jobs
    doCheckConfig() {
        this._info("doCheckConfig");
        setEntity.apply(this, [
            this._config.entity,
            this._config.entities
        ]);
        function setEntity() {
            for(let i = 0; i < arguments.length; i++){
                let arr = this._getType(arguments[i], "string") ? [
                    arguments[i]
                ] : this._getType(arguments[i], "array") ? arguments[i] : [];
                for (let ent1 of arr)if (!this._entities[ent1]) this._entities[ent1] = {
                    name: ent1,
                    state: null,
                    id: null,
                    attributes: {},
                    last_changed: null
                };
            }
        }
        if (Object.keys(this._entities).length === 0) throw new Error("Please define an entity!");
        else this._debug("ents", this._entities);
    }
    doUpdateConfig() {
        // for (let attr in this.getAttributes())
        // 	{}
        this._info("doUpdateConfig");
    }
    doUpdateHass(hass) {
        this._hass = hass;
        this.PROPS.run["doUpdateEnts"] = [];
        this._info("doUpdateHasss", hass);
        var that = this;
        if (that._hass.user.id !== that.PROPS.run.userid) {
            that.PROPS.run.userid = that._hass.user.id;
            that.PROPS.run.username = that._hass.user.name;
            that.setProfile();
        }
        for (let ent1 of Object.keys(this._entities)){
            let state = this.getState(ent1);
            this._debug("state:", state);
            if (!state) ;
            else if (!this.PROPS.run.currentProfile) return;
            else if (state.last_changed !== that._entities[ent1].last_changed) {
                this._debug("doUpdateHass update detected", that._entities[ent1].last_changed, state.last_changed);
                that._entities[ent1].last_changed = state.last_changed;
                that._entities[ent1].id = state.entity_id;
                that._entities[ent1].attributes = that._extender({}, state.attributes || {});
                if (!this.PROPS.run.doUpdateEnts.includes(ent1)) this.PROPS.run.doUpdateEnts.push(ent1);
            }
        }
        this.sendDataToWorker();
        this._debug("doUpdateHass profile", this.PROPS.run.currentProfile);
    }
    sendDataToWorker(now = new Date()) {
        if (!this._enable_DataWorker || !this.dataWorker) return;
        let interval = 100;
        let maxTimespan = 60000;
        let _now = new Date();
        //console.info("sendDataToWorker", "prepair")	
        if (!this.PROPS.run?.states?.constructed && _now - now < maxTimespan) {
            //console.info("sendDataToWorker", "start interval")	
            setInterval(this.sendDataToWorker, interval, now);
            return;
        }
        // else 
        // if ( !this.PROPS.run.doUpdateEnts || this.PROPS.run.doUpdateEnts.length == 0)
        // 	{
        // 	console.info("sendDataToWorker", "no updates")	
        // 	return	
        // 	}
        let configs = this._extender({}, this.PROPS.run.currentProfile.dataWorker || {});
        let ents = [
            ...this.PROPS.run.doUpdateEnts || []
        ];
        for (let ent1 of ents){
            this.PROPS.run.doUpdateEnts = this.PROPS.run.doUpdateEnts.filter(function(e) {
                return e !== ent1;
            });
            configs = this._extender(configs, {
                source: ent1,
                state: this.getState(ent1)
            });
            let workerdata = this._extender(this._entities[ent1].attributes, {
                config: configs
            });
            this._info("sendDataToWorker doUpdateHass run update", ent1, `${Object.keys(workerdata).length - 1} channels`, workerdata);
            this.dataWorker.addRequest(workerdata);
        }
    }
    setProfile() {
        let width = window.screen.width;
        let height = window.screen.height;
        var defaultProfil = this.PROPS.defaults.profiles.default;
        let design = this._extender({
            default: defaultProfil.design
        });
        for (let ori of defaultProfil.designOrientations)design[ori] = this._extender({
            default: defaultProfil.design
        });
        design = this._extender(design, this._config?.profile?.design || {});
        this.PROPS.run.profiles = this._extender({}, defaultProfil, this._config?.profile || {});
        this.PROPS.run.profiles["design"] = design;
        this.PROPS.run["states"]["profiled"] = true;
        var ev = new CustomEvent("profiled");
        this.dispatchEvent(ev);
    }
    onClicked() {
        this.doToggle();
    }
    // accessors
    isOff() {
        return this.getState().state === "off";
    }
    isOn() {
        return this.getState().state === "on";
    }
    getHeader() {
        return this._config.header;
    }
    getEntityID() {
        return this._config.entity;
    }
    getState(ent1) {
        //console.debug("staa", ent, this.getEntityID())
        return this._hass.states[this.getEntityID()];
    }
    getName(ent1) {
        const friendlyName = this.getAttributes(ent1).friendly_name;
        return friendlyName ? friendlyName : this.getEntityID();
    }
    // doListen() {
    // 	this._elements.dl.addEventListener("click", this.onClicked.bind(this), false);
    // }
    doToggle() {
        this._hass.callService("input_boolean", "toggle", {
            entity_id: this.getEntityID()
        });
    }
    // configuration defaults
    static getStubConfig() {
        return {
            entity: "input_boolean.tcwsd"
        };
    }
}

},{"./lib/tgControls.js":"5PP50","./defaults_Card.js":"1MdrO","./tgepg-dataWorker.js":"jckaK","./lib/epgElements/tgEpg.timebar.js":"j75MS","./lib/epgElements/tgEpg.channelList.js":"hFcgl","./lib/epgElements/tgEpg.channelListItem.js":"aLlUv","./lib/epgElements/tgEpg.progList.js":"aIXjC","./lib/epgElements/tgEpg.progItem.js":"4puUn","./lib/tgControls.Scrollbar.js":"cWkM0","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5PP50":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgControls", ()=>tgControls);
var _tgControlsHelperBasicJs = require("./tgControls.helper_basic.js");
class tgControls extends HTMLElement {
    constructor(mode, defaultClass = null){
        mode = mode ? mode : "closed";
        super(mode);
        this.helper = new (0, _tgControlsHelperBasicJs.tgControlsHelperBasic)();
        this.YES = this.helper.YES;
        this.NO = this.helper.NO;
        //if (!defaultClass) this._warn("defaultClass", mode, defaultClass)
        this.defaultClass = this._getType(defaultClass, "class") == 1 ? defaultClass : null;
        this._shadowRoot = createShadow.call(this, mode ? mode : "closed");
        this.PROPS = this._extender({
            defaults: {
                msg: {
                    log: false,
                    warn: false,
                    error: false,
                    debug: false,
                    showid: false
                }
            },
            run: this._extender({}, {
                states: {},
                orientationObserver: {
                    orientation: screen.orientation.type.replace(/-.+$/g, ""),
                    angle: 0,
                    orientationExact: ""
                },
                sizeObserver: {
                    dir: "xy",
                    width: 0,
                    height: 0,
                    orientation: ""
                }
            }, tgControls.properties)
        }, this.defaultClass ? this.defaultClass?.getPROPS || {} : {});
        this.PROPS.run = this._extender(this.PROPS.run, this.PROPS.defaults, !mode || mode != "closed" ? {
            msg: {
                debug: true,
                log: true,
                error: true,
                warn: true,
                showid: true
            }
        } : {});
        this._resizeObserver = new ResizeObserver((changes)=>{
            for (const change of changes){
                switch(this.PROPS.run.sizeObserver.dir){
                    case "x":
                        if (change.contentRect.width === this.PROPS.run.sizeObserver.width) return;
                        break;
                    case "y":
                        if (change.contentRect.height === this.PROPS.run.sizeObserver.height) return;
                        break;
                    default:
                        if (change.contentRect.width === this.PROPS.run.sizeObserver.width && change.contentRect.height === this.PROPS.run.sizeObserver.height) return;
                }
                this.PROPS.run.sizeObserver.width = change.contentRect.width;
                this.PROPS.run.sizeObserver.height = change.contentRect.height;
                this.PROPS.run.sizeObserver.orientation = this.PROPS.run.sizeObserver.height < this.PROPS.run.sizeObserver.width ? "landscape" : "portait";
                var ev = new CustomEvent("resize");
                this.dispatchEvent(ev);
            }
        });
        screen.orientation.addEventListener("change", (event)=>{
            const type = event.target.type;
            const angle = event.target.angle;
            const orient = type.replace(/-.+$/g, "");
            this.PROPS.run.orientationObserver.orientationExact = type;
            this.PROPS.run.orientationObserver.angle = angle;
            if (this.PROPS.run.orientationObserver.orientation !== orient) {
                var ev = new CustomEvent("rotate");
                that.dispatchEvent(ev);
            }
        });
        function createShadow() {
            let shadow = this.attachShadow({
                mode: mode
            });
            let template = null;
            if (typeof this.template === "function") template = this.template();
            else if (this.defaultClass) template = (typeof this.defaultClass.template === "function" ? this.defaultClass.template() : null) || this.defaultClass.constructor.template || null;
            let tmp = document.createElement("div");
            template = !template ? null : Array.isArray(template) ? template : typeof template === "string" ? [
                template
            ] : null;
            if (template) for (let elem of template){
                if (typeof elem === "string") {
                    tmp.innerHTML = elem;
                    while(tmp.firstChild)shadow.appendChild(tmp.removeChild(tmp.lastChild));
                    tmp.innerHTML = "";
                } else if (typeof elem == "undefined") continue;
                else shadow.appendChild(elem);
            }
            return shadow;
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal || !newVal || !this.PROPS.run.hasOwnProperty(attrName) || this.PROPS.run[attrName] === newVal) return false;
        this.PROPS.run[attrName] = newVal;
        switch(attrName){
            case "log":
                this.PROPS.run.msg.log = this.getBoolean(newVal);
                break;
            case "info":
                this.PROPS.run.msg.info = this.getBoolean(newVal);
                break;
            case "debug":
                this.PROPS.run.msg.debug = this.getBoolean(newVal);
                break;
            case "error":
                this.PROPS.run.msg.error = this.getBoolean(newVal);
                break;
            case "warn":
                this.PROPS.run.msg.warn = this.getBoolean(newVal);
                break;
            case "showid":
                this.PROPS.run.msg.showid = this.getBoolean(newVal);
                break;
            case "stylesrc":
                if (this._shadowRoot) {
                    while(this._shadowRoot.querySelector("[css_import]"))this._shadowRoot.querySelector("[css_import]").remove();
                    let tmp = document.createElement("div");
                    var styles = newVal.split(";");
                    var innerHTML = "";
                    var that1 = this;
                    styles.forEach(function(val) {
                        let name = that1.tagName.toLowerCase().replace(/[-\.]/g, "");
                        let srcname = val.substring(val.lastIndexOf("/") + 1).toLowerCase().replace(/[-\.]/g, "");
                        if (srcname.startsWith(name) || srcname.startsWith("common") || srcname.includes("tgcontrol")) innerHTML += '<style> @import "' + val + '"; </style>';
                    });
                    tmp.innerHTML = innerHTML;
                    while(tmp.firstChild){
                        let lastChild = tmp.lastChild;
                        lastChild.setAttribute("css_import", "true");
                        this._shadowRoot.insertBefore(tmp.removeChild(lastChild), this._shadowRoot.firstChild);
                    }
                    tmp.remove();
                }
                break;
            case "left":
            case "right":
            case "top":
            case "bottom":
            case "width":
            case "height":
                break;
        }
        return true;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connected() {
        //console.debug("is connected - now fire connected event", this)
        this._debug("is connected - now fire connected event");
        this.PROPS.run["states"]["connected"] = true;
        var ev = new CustomEvent("connected");
        this.dispatchEvent(ev);
    }
    //######################################################################################################################################
    //
    // Weiterleitungen an die helper Klasse
    //
    //######################################################################################################################################
    //######################################################################################################################################
    _extender() {
        return this.helper._extender.apply(this.helper, arguments);
    }
    //######################################################################################################################################
    _debug() {
        var args = Array.from(arguments);
        args.unshift("debug");
        this.helper._message.apply(this, args);
    }
    //######################################################################################################################################
    _info() {
        var args = Array.from(arguments);
        args.unshift("info");
        this.helper._message.apply(this, args);
    }
    //######################################################################################################################################
    _log() {
        var args = Array.from(arguments);
        args.unshift("log");
        this.helper._message.apply(this, args);
    }
    //######################################################################################################################################
    _warn() {
        var args = Array.from(arguments);
        args.unshift("warn");
        this.helper._message.apply(this, args);
    }
    //######################################################################################################################################
    _error() {
        var args = Array.from(arguments);
        args.unshift("error");
        this.helper._message.apply(this, args);
    }
    //######################################################################################################################################
    _htmlToElements() {
        return this.helper._htmlToElements.apply(this.helper, arguments);
    }
    //######################################################################################################################################
    _htmlToElement() {
        return this.helper._htmlToElement.apply(this.helper, arguments);
    }
    //######################################################################################################################################
    _getType() {
        return this.helper._getType.apply(this.helper, arguments);
    }
}

},{"./tgControls.helper_basic.js":"dF8RS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dF8RS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgControlsHelperBasic", ()=>tgControlsHelperBasic);
class tgControlsHelperBasic {
    constructor(props = {}){
        this.extendDateObject();
        this.YES = [
            true,
            "true",
            1,
            "1"
        ];
        this.NO = [
            false,
            "false",
            0,
            "0",
            null
        ];
        this.PROPS = this._extender({
            run: {
                msg: {
                    error: true,
                    warn: true,
                    info: true,
                    debug: true,
                    log: true
                }
            }
        }, props);
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _fetch(opt) {
        if (!this._getType(opt, "hash")) {
            console.error("format for _fetch was no hash");
            return;
        }
        var that = this;
        var callback = opt.callback;
        console.debug("fetcherzx", opt);
        opt = this._extender({}, {
            startdelay: 0,
            outputdelay: 0,
            url: null,
            method: "get",
            data: null,
            callback: null,
            timeout: 5000,
            id: this._createID(),
            headers: {},
            fetchopt: {},
            interpretAs: null
        }, opt, {
            timestamp: null,
            duration: null,
            result: null,
            status: "init",
            errortext: null
        });
        opt.callback = callback;
        console.debug("fetcherx", opt);
        opt.fetchopt = this._extender(opt.fetchopt, {
            method: opt.method,
            headers: opt.headers
        });
        if (opt.data && opt.data !== null) {
            opt.fetchopt.method = "post";
            switch(this._getType(opt.data)){
                case "string":
                    opt.fetchopt.headers = this._extender(opt.fetchopt.headers, {
                        "Content-Type": "application/text"
                    });
                    break;
                case "jsonstring":
                    opt.fetchopt.headers = this._extender(opt.fetchopt.headers, {
                        "Content-Type": "application/json"
                    });
                    break;
                case "formdata":
                    break;
                default:
                    opt.fetchopt.body = JSON.stringify(opt.data);
                    opt.fetchopt.headers = this._extender(opt.fetchopt.headers, {
                        "Content-Type": "application/json"
                    });
                    break;
            }
        }
        opt.timestamp = Date.now();
        //this.fetchDataStack[opt.id]=opt
        //#################################################################################################
        function runCallback(opt) {
            if (typeof opt.callback === "function") opt.callback(opt);
        }
        //#################################################################################################
        const delay = (mseconds)=>{
            return new Promise((resolve)=>setTimeout(resolve, mseconds));
        };
        //#################################################################################################
        const fetcher = async ()=>{
            that._debug("fetcher start inside", opt);
            await delay(opt.startdelay);
            fetch(opt.url, opt.fetchopt).then((response)=>{
                if (response.ok) {
                    if (opt.interpretAs && opt.interpretAs !== null) {
                        opt.fetchopt["interpretAs"] = opt.interpretAs;
                        return response[opt.interpretAs]();
                    } else return response.text();
                } else return Promise.reject("error: " + response.status);
            }).then(function(response) {
                opt["result"] = response;
                opt["duration"] = Date.now() - opt.timestamp;
                opt["status"] = "done";
                if (!opt.fetchopt.interpretAs) {
                    if (that._getType(response, "jsonstring")) {
                        opt.fetchopt["interpretAs"] = "json";
                        opt["result"] = JSON.parse(response) || response;
                    } else opt.fetchopt["interpretAs"] = "text";
                }
                runCallback(opt);
            }).catch(function(error) {
                opt["status"] = "error";
                opt["errortext"] = error;
                that._error("method _fetch:", error, "\nurl=" + opt.url);
                runCallback(opt);
            });
        };
        //#################################################################################################
        fetcher();
        return;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _message() {
        var args = Array.from(arguments);
        var type = args.shift().toLowerCase();
        if (![
            "debug",
            "info",
            "warn",
            "log",
            "error"
        ].includes(type)) return;
        if (typeof this.hasAttribute === "function") args.unshift(this.nodeName + (this.hasAttribute("id") ? "(" + this.getAttribute("id") + ")" : "") + ":");
        if (this.PROPS.run.msg[type.toLowerCase()] !== false) console[type.toLowerCase()].apply(this, args);
    }
    //######################################################################################################################################
    _debug() {
        var args = Array.from(arguments);
        args.unshift("debug");
        this._message.apply(this, args);
    }
    //######################################################################################################################################
    _info() {
        var args = Array.from(arguments);
        args.unshift("info");
        this._message.apply(this, args);
    }
    //######################################################################################################################################
    _log() {
        var args = Array.from(arguments);
        args.unshift("log");
        this._message.apply(this, args);
    }
    //######################################################################################################################################
    _warn() {
        var args = Array.from(arguments);
        args.unshift("warn");
        this._message.apply(this, args);
    }
    //######################################################################################################################################
    _error() {
        var args = Array.from(arguments);
        args.unshift("error");
        this._message.apply(this, args);
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _getBoolean(val) {
        val = this._getType(val, "string") ? val.toLowerCase() : val;
        return this.YES.includes(val);
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _extender() {
        for(var i = 1; i < arguments.length; i++)for(var key in arguments[i]){
            var isitArray = false;
            arguments[0][key] = arguments[0][key] || {};
            if (typeof arguments[i][key] === "function") arguments[0][key] = arguments[i][key];
            else if (isObject(arguments[i][key])) arguments[0][key] = Array.isArray(arguments[i][key]) ? arguments[i][key] : this._extender(arguments[0][key], arguments[i][key]);
            else if (Object.prototype.hasOwnProperty.call(arguments[i], key)) arguments[0][key] = arguments[i][key];
        }
        return arguments[0];
        function isObject(obj) {
            return obj === Object(obj);
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _show(elem) {
        let myElem = elem ? this._getType(elem, "nodeElement") ? elem : null : this && this._getType(this, "nodeElement") ? this : null;
        if (myElem) {
            //this._debug("show "+ myElem.tagName, myElem);
            myElem.classList.remove("hide");
            myElem.classList.add("show");
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _hide(elem) {
        let myElem = elem ? this._getType(elem, "nodeElement") ? elem : null : this && this._getType(this, "nodeElement") ? this : null;
        if (myElem) {
            //this._debug("hide "+ myElem.tagName, myElem);
            myElem.classList.remove("show");
            myElem.classList.add("hide");
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _htmlToElements(html) {
        var template = document.createElement("template");
        template.innerHTML = html;
        return template.content.childNodes;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _htmlToElement(html) {
        var template = document.createElement("template");
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _createID(node = null) {
        let id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        if (this._getType(node, "nodeElement")) node.setAttribute("id", id);
        return id;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _getType(obj, types = null) {
        let reg = /\s*([|,;\s])\s*/g;
        types = !types ? null : Array.isArray(types) ? types : !(typeof types == "string") ? null : types == "" ? null : types.split(reg);
        var t = typeof obj;
        if (t == "string") try {
            t = "jsonstring";
            JSON.parse(obj);
        } catch (e) {
            t = "string";
        }
        else if (t == "object") {
            if (Array.isArray(obj)) t = "array";
            else if (obj === null) t = "null";
            else if (obj.nodeType !== undefined) switch(obj.nodeType){
                case 1:
                    t = "nodeElement";
                    break;
                case 3:
                    t = "nodeText";
                    break;
                default:
                    t = "node";
            }
            else if (obj instanceof FormData) t = "formdata";
            else if (Object.getPrototypeOf(obj) && obj.length) {
                let x = Object.getPrototypeOf(obj);
                x = x.toString();
                let y = x.match(/\s(.+?)\]$/);
                if (y) t = "array" + y[1];
            } else if (Object.hasOwn(obj, "thisIsClass")) t = "class";
            else t = "hash";
        }
        if (types && Array.isArray(types)) {
            let q = types.includes(t);
            types.forEach((type)=>{
                if (q === true) return;
                if (type.endsWith(".") && type.substr(-1) == t) q = true;
            });
            return q | t;
        }
        return t;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _JSONcorrector(val = "[]", splitter = null) {
        let org = val;
        if (this._getType(val, "string,jsonstring")) try {
            val = JSON.parse(val);
        } catch  {
            if (org == "") console.debug("%cJSONcorrector: your JSON-Code was empty ", "background: #222; color: #bada55");
            else {
                console.debug("%cToolBar: there was an Error in your JSON Code ", "background: #222; color: #bada55");
                console.debug("JSON-code: %c" + org, "background: #222; color: #bada55");
            }
            if (splitter) val = val.split(splitter);
        }
        return this._getType(val, "array hash") ? val : [
            val
        ];
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _get2digit(dig, len = 2) {
        dig = dig + "";
        while(dig.length < len)dig = "0" + dig;
        return dig;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    extendDateObject() {
        if (typeof Date.prototype.addHours === "undefined") Date.prototype.addHours = function(h) {
            this.setTime(this.getTime() + h * 3600000);
            return this;
        };
        if (typeof Date.prototype.addMinutes === "undefined") Date.prototype.addMinutes = function(m) {
            this.setTime(this.getTime() + m * 60000);
            return this;
        };
        if (typeof Date.prototype.addSeconds === "undefined") Date.prototype.addSeconds = function(m) {
            this.setTime(this.getTime() + m * 1000);
            return this;
        };
        if (typeof Date.prototype.floorHours === "undefined") Date.prototype.floorHours = function() {
            let month = this.getMonth() + 1 + "";
            while(month.length < 2)month = "0" + month;
            let day = this.getDate() + "";
            while(day.length < 2)day = "0" + day;
            let hour = this.getHours() + "";
            while(hour.length < 2)hour = "0" + hour;
            this.setTime(Date.parse(`${this.getFullYear()}-${month}-${day}T${hour}:00:00.000`));
            return this;
        };
        if (typeof Date.prototype.ceilHours === "undefined") Date.prototype.ceilHours = function() {
            let month = this.getMonth() + 1 + "";
            while(month.length < 2)month = "0" + month;
            let day = this.getDate() + "";
            while(day.length < 2)day = "0" + day;
            let hour = this.getHours() + "";
            while(hour.length < 2)hour = "0" + hour;
            this.setTime(Date.parse(`${this.getFullYear()}-${month}-${day}T${hour}:00:00.000`) + 3600000);
            return this;
        };
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _readFromStorage(app = null) {
        let opt = localStorage.getItem(app) || "{}";
        return JSON.parse(opt) || opt;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _clearStorage(app = null) {
        localStorage.removeItem(app);
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    _writeToStorage(app, opt = {}) {
        //opt=this._extender({}, opt);
        for(let prop in opt)if (prop.startsWith("_")) delete opt[prop];
        var org = this._readOptionsFromStorage(app);
        var keys = Object.keys(opt);
        keys.forEach(function(key, index) {
            org[key] = opt[key];
        });
        opt = JSON.stringify(org);
        localStorage.setItem(app, opt);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"1MdrO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgCardDefaults", ()=>tgEpgCardDefaults);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgEpgCardDefaults extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(){
        super("open");
        this["PROPS"] = {
            defaults: this._extender({}, this["PROPS"].defaults || {}, {
                profiles: {
                    default: {
                        options: {
                            useOrientationDetection: false,
                            useWidthDetection: false
                        },
                        dataWorker: {
                            pastTimeSec: 3600,
                            previewAll: 43200,
                            viewAllowedOversize: 1800
                        },
                        designOrientations: [
                            "portait",
                            "landscape"
                        ],
                        design: {
                            previewSpan: 14400,
                            setOfSpan: 1800,
                            channelRowWidth: 120,
                            channelRowHeight: 35,
                            channelStyle: "icon|text",
                            topBarHeight: 50,
                            loadReview: 7200,
                            loadPreview: 604800,
                            dw_loadPreviewUnits: [
                                "last",
                                "now",
                                "next",
                                "hour",
                                "today",
                                "tomorow",
                                "hourly"
                            ],
                            dw_useLoadUnits: true
                        }
                    }
                }
            })
        };
    }
    static get properties() {
        var props = super.properties || {};
        props["dataref"] = null;
        props["timerowheight"] = "50";
        props["channelrowheight"] = "50";
        props["channelcolumnwidth"] = "150";
        console.debug("get properties fct in defaults card:", props);
        return props;
    }
    static get template() {
        var styles = super.styles || "";
        styles = styles + `
			<style>
			:host
				{
				position:relative;	
				padding:0px;
				margin:0px;
				width:100%;
				bottom:50px;
				top:0px;
				/*height:100%;*/
				display:block;
				--topBarHeight-used: calc( var(--topBarHeight,45px) * 1);
				--channelRowWidth-used: calc( var(--channelRowWidth,100px) *1);
				--channelRowHeight-used: calc( var(--channelRowHeight,40px) * 1);
				--scale-used: calc( var(--scale, 1) * 1);
				--appHeight-used: calc( var(--appHeight, 100%) * 1);

				}
			div
				{
				padding: 0px;
				margin: 0px;
				box-sizing: border-box;
				display:inline-block;
				}
			ha-card
				{
				display:block;
				height:100%;	
				}	
			.gridcontainer
				{
				display: grid;
				grid-auto-rows: 1fr;
				grid-template-columns: var(--channelRowWidth-used) 1fr;
				grid-template-rows: var(--topBarHeight-used) calc(100% - var(--topBarHeight-used));
				gap: 0px 0px;
				grid-template-areas:
					"superbutton timeBar"
					"epgOutBox epgOutBox";
				width: 100%;
				height: var(--appHeight-used);

				}
			.superbutton { grid-area: superbutton; }
			.timeBar { grid-area: timeBar; }
			.epgOutBox { grid-area: epgOutBox; }


			/* [name="app"]
				{
				top:0px;
				left:0px;
				overflow: hidden;
				}
			*/
			[name="timeBar"]
				{
				background-color: lightgray;
				white-space: nowrap;
				overflow: hidden;
				}
			[name="superbutton"]
				{
				background-color: yellow;
				}
			[name="epgOutBox"]
				{
				background-color: pink;
				width:100%;
				height:100%;
				/*overflow-y: hidden;*/
				overflow-x: hidden;
				}

			[name="epgBox"]
				{
				display: grid;
				grid-auto-rows: 1fr;
				grid-template-columns: var(--channelRowWidth, 99px) 1fr;
				grid-template-rows: minmax(min-content, max-content) ;
				gap: 0px 0px;
				grid-template-areas:
					"channelBox programBox";
				width:100%;
				/*position: absolute;*/
				height:100%;
				grid-auto-flow: dense;*/
				}
			[name="channelBox"]
				{
				/*position: absolute;*/
				background-color: lightblue;
				position:relative;
				/*
				overflow-x:hidden;
				overflow-y:visible !important;*/
				}
			[name="programBox"]
				{
				top:0px;
				background-color: darkred;
				position:relative;
				overflow-x: auto;
				overflow-y: visible;

				}
			/*hide scrollbar*/
			[name="programBox"]
				{
				-ms-overflow-style: none;
				scrollbar-width: none;
				}
			[name="programBox"]::-webkit-scrollbar
				{
				display: none;
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
				vertical-align:top;
				}
			.optionBox
				{
				position:absolute;
				left:0px;
				top:0px;
				height:100%;
				width:100%;
				background-color:gray;
				z-Index:3000;
				}
			tg-epg-timebar
				{
				--timeBarBorder: 1px solid black;
				--timeBarHeight: var(--topBarHeight, 50px);
				--timeBarScale:  var(--scale, 0.1);
				}
			tg-epg-proglist, tg-epg-channellist
				{
				--channelLineHeight: var(--channelRowHeight, 50px);
				--channelLineScale:  var(--scale, 0.1);
				}

			</style>
			`;
        var tmp = styles + `
			<!-- App -->
			<ha-card>
			<div name="app" class="card-content gridcontainer">
				<div name="superbutton" class="superbutton"></div>
				<div name="timeBar" class="timeBar"></div>
				<div name="epgOutBox" class="epgOutBox">
					<tgcontrol-scrollbar class="tgcontrolscrollbarx hide" pos="bottom" getsizefrom='.tgEpgProgList' getxsizefrom="" getysizefrom=""></tgcontrol-scrollbar>
					<div name="epgBox" class="epgBox">
						<div name="channelBox" class=""></div>
						<div name="programBox" class="programBox"></div>
					</div>
				</div>
			</div>
			<!-- App Ende-->
			<tg-epg-options name="optionBox" class="optionBox hide" ></tg-epg-options>
			<tg-floatingMenu pos="brv" folded="folded"  class="hide">
				<button class="tground  black" name="blupd" id="floatingMenuTimer">T</button>
				<button class="tground  black" name="blupd" id="floatingMenuGroups">G</button>
				<button class="tground  black" name="blupd" id="floatingMenuFilter">F</button>
				<button class="tground  black" name="ButtoSave" id="floatingMenuOptions">O</button>
			</tg-floatingMenu>
			</ha-card>
			`;
        return tmp;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3eZWv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgDefaultsCommon", ()=>tgEpgDefaultsCommon);
var _tgControlsHelperBasicJs = require("./lib/tgControls.helper_basic.js");
class tgEpgDefaultsCommon {
    thisIsClass = true;
    constructor(){
        this.helper = new (0, _tgControlsHelperBasicJs.tgControlsHelperBasic)();
        this["PROPS"] = {};
    }
    get getPROPS() {
        return this._extender({}, this.PROPS || {
            false: ""
        });
    }
    static get properties() {
        var props = {};
        return props;
    }
    static get styles() {
        return `
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
					--channelLineScale:  var(--scale, 0.1);
					}		
				</style>
				`;
    }
    //######################################################################################################################################
    //
    // Weiterleitungen an die helper Klasse
    //
    //######################################################################################################################################
    //######################################################################################################################################
    _extender() {
        return this.helper._extender.apply(this.helper, arguments);
    }
}

},{"./lib/tgControls.helper_basic.js":"dF8RS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jckaK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// Struktur:
// 			this.channels=	{
// 							todolist:	{
//										delete:[]
//										},
//							data		{
//										<channelid>:	{
//														sourceID:		"",
//														channelID:		"",
//														name:			"",
//														friendlyName:	"",
//														preSpan:		0,
//														postSpan:		0,
//														epg:			{},
//														data:			{
//																		<key>:	{
//																				start:123,
//																				end:123;
//																				duration:123,
//																				key:"",
//																				html:"",
//																				epg:{}
//																				}
//																		},
//														todolist:		{},
//														}
//										}
//							}
parcelHelpers.export(exports, "tgEpgDataService", ()=>tgEpgDataService);
var _tgControlsHelperBasicJs = require("./lib/tgControls.helper_basic.js");
class tgEpgDataService extends (0, _tgControlsHelperBasicJs.tgControlsHelperBasic) {
    constructor(me = null){
        super();
        this.basicConfig = {
            pastTimeSec: 3600,
            previewAll: 604800,
            viewAllowedOversize: 18000,
            map: {
                duration: [
                    "DURATION",
                    "duration",
                    "DURATION"
                ],
                start: [
                    "START",
                    "start",
                    "START"
                ],
                end: [
                    "END",
                    "end",
                    "END"
                ],
                channelid: [
                    "CHANNELID",
                    "channelID",
                    "CHANNELID"
                ],
                id: [
                    "ID",
                    "id",
                    "ID"
                ],
                title: [
                    "TITLE",
                    "TITLE"
                ],
                description: [
                    "DESCRIPTION",
                    "DESCRIPTION"
                ]
            },
            showTemplate: `<tgepg-progitem class="TabCell" span="<!DURATION!>" start="<!START!>" end="<!END!>" channelid="<!CHANNELID!>" id="<!ID!>" style="--progItemSpan: <!DURATION!>px;">
							<div slot="titleslot"><!TITLE!></div>
							<div slot="descriptionslot"><!DESCRIPTION!></div>
							</tgepg-progitem>`,
            channelTemplate: `<tgepg-progline class="TabCell" channelid="<!CHANNELID!>" id="<!ID!>"><!SHOWTEMPLATE!></tgepg-progline>`
        };
        this.me = me ? me : null;
        this.channelsHtml = {};
        this.channelsTmpl = {
            todolist: {
                delete: [],
                add: []
            },
            data: {}
        };
        this.channelTmpl = {
            todolist: {
                delete: [],
                add: []
            },
            data: {}
        };
        this.channels = this._extender({}, this.channelsTmpl);
    //console.debug(this.me)
    }
    addRequest(data) {
        this._warn("data: received", this._getType(data));
        if (!this._getType(data, "hash")) return null;
        //alert("get request")
        var that = this;
        //###############################
        function _template_mapper(templ, map, source) {
            var mapkeys = Object.keys(map);
            var sourcekeys = Object.keys(source);
            mapkeys.forEach(function(k, i) {
                let needle = `<!${map[k][0]}!>`;
                if (templ.includes(needle)) {
                    for(let p = 1; p < map[k].length; p++)if (sourcekeys.includes(map[k][p])) {
                        const regex = new RegExp(needle, "gi");
                        templ = templ.replaceAll(regex, source[map[k][1]]);
                        break;
                    }
                }
            });
            //console.debug("_template_mapper", source, templ)
            return templ;
        }
        //###############################
        //###############################
        function _createShowItem(index, epg, id) {
            let item = that._extender({}, epg);
            let start = index.match(/^[0-9]+$/g) ? parseInt(index) : false;
            let duration = epg[that.basicConfig.map.duration[0]] || false;
            duration = duration && duration.match(/^[0-9]+$/g) ? parseInt(duration) : false;
            item = that._extender({}, item, {
                start: start,
                duration: duration,
                end: !start || !duration ? false : start + duration,
                key: start ? start.toString() : false,
                epg: that._extender({}, epg),
                html: "",
                id: `${id}_${start}`
            });
            item.html = _template_mapper(that.basicConfig.showTemplate, that.basicConfig.map, item);
            return item;
        }
        //###############################
        //###############################
        function _cleanTodolist(list = {
            delete: [],
            replace: [],
            add: []
        }) {
            // var keys = Object.keys(list);
            // keys.forEach(function (k, i)
            // 	{
            // 	list[k]=[]
            // 	})
            return list;
        }
        //###############################
        //###############################
        function _addTodolist(obj = null, key = null, val = null) {
            if (!obj.todolist) obj["todolist"] = _cleanTodolist();
            if (!obj.todolist[key]) obj["todolist"][key] = [];
            obj.todolist[key].push(val);
            return obj;
        }
        //###############################
        //###############################
        function _cleanChannel(c, filter) {
            var tmp = that._extender({}, c.epg || {}, c.tmp || {});
            //console.log("dataworker", "_cleanChannel", c)	
            var keys = Object.keys(c.stock || {});
            keys = keys.sort();
            for (let key of keys){
                if (c.stock[key].end < filter.past - filter.tolerance) delete c.stock[key];
                else if (c.stock[key].end >= filter.past && c.stock[key].start <= filter.future) {
                    tmp[key] = that._extender({}, c.stock[key]);
                    delete c.stock[key];
                }
            }
            var keys = Object.keys(tmp);
            keys = keys.sort();
            //Aufräumen: abgelaufene Sendungen entfernen
            for (let key of keys){
                tmp[key] = !tmp[key].start ? _createShowItem(key, tmp[key], c.channelID) : tmp[key];
                //console.log("dataworker", "stock", tmp[key] , filter)	
                if (tmp[key].end < filter.past) delete tmp[key];
                else if (tmp[key].start > filter.future) {
                    //console.log("dataworker", "add to stock")	
                    c.stock[key] = that._extender({}, tmp[key]);
                    delete tmp[key];
                }
            }
            return tmp;
        }
        //###############################
        //###############################
        function _createChannelItem(c, srcChannel, source, tmpl, filter) {
            let channelkey = `${source}_${srcChannel.channeldata.channelid}`;
            if (!c.data[channelkey]) c.data[channelkey] = that._extender({}, tmpl);
            let item = c.data[channelkey];
            item["sourceID"] = source;
            item["channelID"] = srcChannel.channeldata.channelid;
            item["name"] = srcChannel.channeldata.name;
            item["id"] = channelkey;
            item["epg"] = srcChannel.epg || {};
            item["todolist"] = _cleanTodolist();
            item["preSpan"] = 0;
            item["postSpan"] = 0;
            item["stock"] = item.stock || {};
            item["tmp"] = _cleanChannel(item, filter);
            //console.log("dataworker", "_createChannelItem", item)
            let lastUpdate = Math.floor(Date.parse(srcChannel.channeldata.lastUpdate || 0) / 1000);
            if ((lastUpdate || 0) <= (item.lastUpdate || 0) || _isBlacklisted([
                item["name"],
                item["channelID"],
                item["sourceID"]
            ])) return;
            item["lastUpdate"] = lastUpdate;
            return item;
        }
        // ###############################
        // ###############################
        function _isBlacklisted(stack) {
            let blacklist = that._getType(that.basicConfig.blacklist, "array") ? that.basicConfig.blacklist : [];
            let bool = null;
            for (let item of blacklist){
                let myitem = item.startsWith("<!not>") ? item.slice(6) : item;
                let re = new RegExp(myitem, "g");
                let str = "";
                for (let hay of stack){
                    let _bool = re.test(hay);
                    if (item == myitem) {
                        if (_bool === true) return true;
                        bool = _bool;
                    } else bool = bool == null ? _bool : bool === true ? true : _bool;
                }
                bool = item == myitem ? bool : bool ? false : true;
                if (bool) return bool;
            }
            return bool;
        }
        // ###############################
        // ###############################
        that.channels["todolist"] = _cleanTodolist();
        console.log("dataworker", "that.channels", that.channels);
        if (data.config && this._getType(data.config, "hash")) this.basicConfig = this._extender(this.basicConfig, data.config);
        var now = Math.floor(new Date() / 1000);
        var filter = {
            now: now,
            tolerance: parseInt(that.basicConfig.viewAllowedOversize),
            past: now - parseInt(that.basicConfig.pastTimeSec),
            future: now + parseInt(that.basicConfig.previewAll)
        };
        this._debug("data: basicConfig", this.basicConfig);
        var keys = Object.keys(that.channels.data || {});
        keys.forEach(function(k, i) {
            let c = that.channels.data[k];
            c["todolist"] = _cleanTodolist();
            if (_isBlacklisted([
                c.name,
                c.channelID,
                c.sourceID
            ])) {
                _addTodolist(that.channels, "delete", c.id);
                delete that.channels.data[k];
                return;
            }
            _cleanChannel(that.channels.data[k], filter);
        });
        var keys = Object.keys(data);
        keys.forEach(function(k, i) {
            let sourceChannel = that._getType(data[k], "jsonstring") ? that._JSONcorrector(data[k]) : "";
            if (that._getType(sourceChannel, "hash") && sourceChannel.channeldata && sourceChannel.epg && that.basicConfig.source) {
                //console.log("dataworker", "sourceChannel", sourceChannel)
                var channel = _createChannelItem(that.channels, sourceChannel, that.basicConfig.source, that.channelTmpl, filter);
                if (!channel) return;
                let keys = Object.keys(channel.tmp);
                for (let key of keys)if (channel.data[key]) delete channel.data[key];
                else _addTodolist(channel, "add", key);
                keys = Object.keys(channel.data);
                for (let key of keys)_addTodolist(channel, "delete", key);
                channel.data = that._extender({}, channel.tmp || {});
                //console.log("dataworker", "channel", channel)
                keys = Object.keys(channel.data);
                var lastItem = null;
                for (let key of keys.sort()){
                    var item = channel.data[key];
                    //Aufräumen: abgelaufene Sendungen entfernen
                    if (item.end > filter.past && item.start < filter.past - filter.tolerance) {
                        let d = item.end - (filter.past - filter.tolerance);
                        item.html = item.html.replace(/span="\d+"/, `span="${d}"`);
                        item["changedStart"] = item.end - d;
                        //item["tolerance"]=filter.tolerance/60
                        _addTodolist(channel, "update", key);
                    }
                    if (item.start < filter.future && item.end > filter.future + filter.tolerance) {
                        //console.log("datetime!!", new Date(filter.future*1000).toLocaleString(), new Date(item.start*1000).toLocaleString(), new Date(item.end*1000).toLocaleString())	
                        let d = filter.future + filter.tolerance - item.start;
                        item.html = item.html.replace(/span="\d+"/, `span="${d}"`);
                        item["changedEnd"] = item.start + d;
                        item["tolerance"] = new Date(filter.future * 1000).toLocaleString();
                        _addTodolist(channel, "update", key);
                    }
                    let diff = lastItem ? item.start - lastItem.end : 0;
                    if (diff > 0) {
                        //create spaceitem
                        // eine Lücke
                        channel.data[lastItem.end.toString()] = {
                            key: lastItem.end.toString(),
                            start: lastItem.end,
                            duration: diff,
                            end: item.start,
                            html: `<tgepg-progitem class="TabCell" span="${diff}" start="${lastItem.end}" end="${item.start}" channelid="${channel.channelID}" id="${channel.channelID}_${lastItem.end}"></tgepg-progitem>`
                        };
                        _addTodolist(channel, "add1", lastItem.end.toString());
                    } else if (diff < 0) {
                        //shorten items
                        if (diff < lastItem.duration) {
                            lastItem.html = lastItem.html.replace(/span="\d+"/, `span="${lastItem.duration + diff}"`);
                            _addTodolist(channel, "replace", lastItem.key);
                        } else {
                            item.html = item.html.replace(/span="/, `epgerror="time mismatch" span="`);
                            _addTodolist(channel, "add2", item.key);
                        }
                    } else _addTodolist(channel, "add3", item.key);
                }
                if (that.me) {
                    let result = {
                        todolist: {},
                        data: {}
                    };
                    result.data[channel.id] = that._extender({}, channel);
                    delete result.data[channel.id].epg;
                    //that._debug("send WorkerData", result)	
                    var ev = new CustomEvent("fetchWorkerData", {
                        detail: result
                    });
                    that.me.dispatchEvent(ev);
                }
            }
        });
        console.log("dataworker", "that.channels 2", that.channels);
        let min = null, max = null;
        for(let chankey in that.channels.data){
            let channel = that.channels.data[chankey];
            let indexes = Object.keys(channel.data);
            if (indexes.length > 0) {
                indexes = indexes.sort();
                let start = channel.data[indexes[0]].changedStart || channel.data[indexes[0]].start;
                //console.log("changedStart" , channel.name, channel.data[indexes[0]].changedStart, channel.data[indexes[0]].start, start)
                let end = channel.data[indexes[indexes.length - 1]].changedEnd || channel.data[indexes[indexes.length - 1]].end;
                min = min === null || min > start ? start : min;
                max = max === null || max < end ? end : max;
            }
        }
        let result = {
            todolist: {},
            data: {}
        };
        for(let chankey in that.channels.data){
            let channel = that.channels.data[chankey];
            let indexes = Object.keys(channel.data);
            if (indexes.length > 0) {
                indexes = indexes.sort();
                result.data[chankey] = !this.me ? this._extender({}, that.channels.data[chankey]) : {};
                result.data[chankey]["data"] = {};
                result.data[chankey]["id"] = channel.id;
                if (min && max) {
                    let start = channel.data[indexes[0]].changedStart || channel.data[indexes[0]].start;
                    let end = channel.data[indexes[indexes.length - 1]].changedEnd || channel.data[indexes[indexes.length - 1]].end;
                    let xend = channel.data[indexes[0]].end;
                    let xstart = channel.data[indexes[indexes.length - 1]].start;
                    //let msg1=`${new Date(start * 1000).toLocaleString()} - ${new Date(xend * 1000).toLocaleString()}`
                    let msg1 = `${new Date(xstart * 1000).toLocaleString()} - ${new Date(end * 1000).toLocaleString()}|`;
                    let msg2 = `${channel.data[indexes[0]].tolerance ? channel.data[indexes[0]].tolerance : ""}|`;
                    result.data[chankey]["preSpan"] = start - min;
                    result.data[chankey]["postSpan"] = max - end;
                    //console.log("datetime",  msg1 , msg2, result.data[chankey]["postSpan"], max, end, channel.name, channel.data[indexes[indexes.length - 1]].changedEnd,channel.data[indexes[indexes.length - 1]].end)	
                    _addTodolist(result.data[chankey], "manage", chankey);
                }
                delete result.data[chankey].epg;
            } else {
                _addTodolist(result, "delete", chankey);
                delete that.channels.data[chankey];
            }
        }
        //result["config"]={now:now,min:min,max:max}	
        _addTodolist(result, "manage", {
            now: now,
            min: min,
            max: max
        });
        if (that.me) {
            that._debug("dataworker send WorkerData", result);
            var ev = new CustomEvent("fetchWorkerData", {
                detail: result
            });
            that.me.dispatchEvent(ev);
        } else //that._debug("send WorkerData manager", result)		
        return result;
    }
}

},{"./lib/tgControls.helper_basic.js":"dF8RS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j75MS":[function(require,module,exports) {
/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgTimebar", ()=>tgEpgTimebar);
var _tgControlsJs = require("../tgControls.js");
var _defaultsTimebarJs = require("../../defaults_Timebar.js");
class tgEpgTimebar extends (0, _tgControlsJs.tgControls) {
    constructor(properties){
        super("open");
        var that = this;
        // default Parameter nach Props einlesen
        this.tgEpgDefaults = new (0, _defaultsTimebarJs.tgEpgTimebarDefaults)(this);
        this["PROPS"] = this._extender(this["PROPS"] || {}, {
        });
        // Props durch hartcodierte Werte erweitern/anpassen
        this["PROPS"] = this._extender(this["PROPS"] || {}, {
            run: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                },
                skale: 0,
                firstStart: 0,
                lastEnd: 0,
                timePosition: 0,
                epgEnd: 100
            },
            default: {
                connected: 0
            },
            paras: this._extender({}, tgEpgTimebar.properties)
        });
        // Props durch im Storage gespeichertes erweitern/anpassen
        //this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));
        this._debug("constructor - Parameters", "props:", this["PROPS"]);
        // data handler init
        this.epgData = {};
        //this.me=new tgEpgHelper(false);
        this.app = this.shadowRoot.querySelector('[name="app"]');
        // this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');
        // this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
        // this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
        // this.timeBar = this.shadowRoot.querySelector('[name="timeBar"]');
        // this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
        // this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
        // this.superButton = that.shadowRoot.querySelector('#superbutton');
        // this.floatingMenu = that.shadowRoot.querySelector('[name="app"]>tg-floatingMenu');
        /*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */ // this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
        //this._debug("JSON", this.readOptions(this.PROPS.defaults._storageKey))
        //this.PROPS.run.topElements = [this.app, this.icon];
        //this._log("construction ended", "props:",this.PROPS, "me:", this);
        this._debug("constructor - constructed");
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = (0, _defaultsTimebarJs.tgEpgTimebarDefaults).template;
        return tmp;
    }
    //######################################################################################################################################
    //
    // properties()
    // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
    //
    //######################################################################################################################################
    static get properties() {
        let props = (0, _defaultsTimebarJs.tgEpgTimebarDefaults).properties || {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    static get observedAttributes() {
        let props = tgEpgTimebar.properties;
        props = Object.keys(props);
        console.debug("observedAttributes::", "prop:", props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connectedCallback() {
        var that = this;
        console.debug("connectedCallback", "start");
        if (this.PROPS.run.connected == 0) {
            this.render();
            this.moveToOffset();
            // 	this.init();
            //	this.refreshAppSizeAfterResizeOrInit();
            // 	this.buildApp();
            // 	this.getData();
            this.connected();
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (!newVal || !this.PROPS.paras.hasOwnProperty(attrName) || this.PROPS.paras[attrName] === newVal) return;
        oldVal = oldVal || this.PROPS.paras[attrName];
        super.attributeChangedCallback(attrName, newVal, oldVal);
        this._debug("change Attribute " + attrName, "from", oldVal, "to", newVal);
        this.PROPS.paras[attrName] = newVal;
        switch(attrName){
            case "timerowheight":
                break;
            case "data":
                this.PROPS.paras["dataref"] = newVal;
                this.dataHandler.getData(newVal);
                break;
            default:
                break;
        }
    }
    //######################################################################################################################################
    //setter & getter
    //
    //
    //######################################################################################################################################
    get supermaster() {
        return this.PROPS.run.supermaster;
    }
    set supermaster(val) {
        this.PROPS.run["supermaster"] = val;
    }
    get design_timeFrameStart() {
        return this.PROPS.run.timeFrameStart || null;
    }
    set design_timeFrameStart(val) {
        console.info("transer", this.PROPS.run.timeFrameStart, val);
        if (this.PROPS.run.timeFrameStart != val) this.PROPS.run["timeFrameStart"] = val;
        console.info("transer", this.PROPS.run.timeFrameStart, val);
    }
    get design_timeFrameEnd() {
        return this.PROPS.run.timeFrameEnd || null;
    }
    set design_timeFrameEnd(val) {
        if (this.PROPS.run.timeFrameEnd != val) this.PROPS.run["timeFrameEnd"] = val;
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    render() {
        if (!this.PROPS.run.timeFrameStart || !this.PROPS.run.timeFrameEnd) return;
        console.info("trans render", this.PROPS.run.timeFrameStart, this.PROPS.run.timeFrameEnd);
        //this.app.innerHTML=""
        let that = this;
        let test;
        let digitCell = ``;
        let barCell = ``;
        var root = this;
        while(root.parentNode)root = root.parentNode;
        root = root.querySelector('[name="timeBar"]');
        var cellHeight = root.clientHeight || this.app.clientHeight || 50;
        cellHeight = cellHeight / 5;
        //let hours=(this.PROPS.run.previewEnd-this.PROPS.run.previewStart)/3600;
        //this._debug("run", cellHeight, this.app, this.PROPS.run)
        var hourCellContainer = this.app.querySelector('[name="hourCellContainer"]');
        if (!hourCellContainer) {
            this.app.innerHTML = `
				<div class="greedyH Tab ">
					<div name="digitline" class="TabRow" style="height:25%">
						<div class="TabCell">
							<!--digitCellFix-->
						</div>
					</div>
					<div name="barline" class="TabRow" style="height:75%">
						<div class="TabCell">
							<div class="Tab greedy" >
								<div name="hourCellContainer" class="TabRow" >
									<!--barCell-->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="Tab free" name="digitline">
					<div name="textCellContainer" class="TabRow">
						<div name="emptyCell" class="TabCell cellwidth2"></div>
						<div name="emptyCell" class="TabCell"></div>
					</div>
				</div>
				`;
            hourCellContainer = this.app.querySelector('[name="hourCellContainer"]');
        }
        var textCellContainer = this.app.querySelector('[name="textCellContainer"]');
        var textCellEmptyCell = textCellContainer.querySelector('[name="emptyCell"]:last-of-type');
        var hourCells = [
            ...hourCellContainer.querySelectorAll('[name="hourcell"]')
        ];
        var textCells = [
            ...textCellContainer.querySelectorAll('[name="digitcell"]')
        ];
        function getDigitString(x) {
            return that._get2digit(new Date(x * 1000).getHours() + "") + ":00";
        }
        function getdigitcell(x) {
            return that.htmlToElement(`<div  name="digitcell" class="TabCell cellwidth4">${x}</div>`);
        }
        function gethourcell() {
            return that.htmlToElement(`
										<div name="hourcell" class="TabCell cellwidth4">
											<div class="Tab greedy">
												<div class="TabRow" style="height:*%">
													<div class="TabCell">
														<div class="Tab greedy">
															<div class="TabRow">
																<div name="barlinecell" class="TabCell" style="width:100%"></div>
															</div>
														</div>
													</div>
												</div>
												<div class="TabRow" style="height:33%">
													<div class="TabCell">
														<div class="Tab greedy">
															<div class="TabRow">
																<div name="barlinecell" class="TabCell" style="width:50%"></div>
																<div name="barlinecell" class="TabCell" style="width:50%"></div>
															</div>
														</div>
													</div>
												</div>
												<div class="TabRow" style="height:33%">
													<div class="TabCell">
														<div class="Tab greedy">
															<div class="TabRow">
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
																<div name="barlinecell" class="TabCell" style="width:25%"></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										`);
        }
        var index = 1;
        for(let i = this.PROPS.run.timeFrameStart + 3600; i <= this.PROPS.run.timeFrameEnd; i += 3600){
            if (textCells.length >= index) textCells[index - 1].innerHTML = getDigitString(i);
            else {
                let cell = getdigitcell(getDigitString(i));
                textCells.push(cell);
                textCellContainer.insertBefore(cell, textCellEmptyCell);
            }
            if (hourCells.length < index) {
                let cell = gethourcell();
                hourCells.push(cell);
                hourCellContainer.append(cell);
                console;
            }
            index += 1;
        }
        while(textCells.length > index)textCells.pop().remove();
        while(hourCells.length > index)hourCells.pop().remove();
        return;
    }
    //#########################################################################################################
    //## refreshAppSizeAfterResizeOrInit()
    //##
    //##
    //##
    //#########################################################################################################
    moveToOffset() {}
    //#########################################################################################################
    //## refreshAppSizeAfterResizeOrInit()
    //##
    //##
    //##
    //#########################################################################################################
    refreshAppSizeAfterResizeOrInit() {
        this._debug("refreshAppSizeAfterResizeOrInit");
        if (this.buttonCell && this.PROPS.paras.timerowheight) this.buttonCell.style.height = parseInt(this.PROPS.paras.timerowheight) + "px";
        if (this.buttonCell && this.PROPS.paras.channelcolumnwidth) this.buttonCell.style.width = parseInt(this.PROPS.paras.channelcolumnwidth) + "px";
        var width = this.timeBar.clientWidth;
        var hours = null;
        if (this.PROPS.run.previewSpans && this.getType(this.PROPS.run.previewSpans, "hash")) {
            var myKeys = Object.keys(this.PROPS.run.previewSpans);
            myKeys = myKeys.sort();
            var found = 0;
            for(let i = 0; i < myKeys.length; i++){
                //this._debug("width", parseInt(myKeys[i]), width)
                if (parseInt(myKeys[i]) != 0 && parseInt(myKeys[i]) <= width) hours = this.PROPS.run.previewSpans[myKeys[i]];
                else if (parseInt(myKeys[i]) > width) {
                    found = 1;
                    break;
                }
            }
            if (found == null || hours == null) hours = this.PROPS.run.previewSpans["0"] || 10;
        }
        this.PROPS.run["previewSpan"] = parseFloat(hours) || 1;
        this.PROPS.run["scale"] = width / (hours * 60);
    //this._debug("hours", hours, width, this.PROPS.run.scale, this.PROPS.run.previewSpan)
    //this._debug("refreshApp Width", this.buttonCell, this.buttonCell.clientWidth)
    //this._debug("refreshApp Width", this.timeRow, this.timeRow.clientWidth)
    //this._debug("refreshApp Width", this.timeBar, this.timeBar.offsetWidth)
    }
    //#########################################################################################################
    //## buildApp()
    //## richtet die App-Oberfläche ein
    //##
    //##
    //#########################################################################################################
    buildApp() {
        this._debug("buildApp:", this.PROPS.run.mode);
        var that = this;
        var timeBar = this.timeBar.querySelector("tg-epg-timebar");
        timeBar;
        // // inject CCS-File to <HEAD>
        // let cssLink = document.querySelector('head > [name="tgEpgStyle"]');
        // if (! cssLink)
        // 	{
        // 	let style=document.createElement("link");
        // 	style.setAttribute("rel","stylesheet");
        // 	style.setAttribute("name","tgEpgStyle");
        // 	style.setAttribute("href","tgEpg.hlp.cssInjectToHead.css");
        // 	document.getElementsByTagName("head")[0].appendChild(style);
        // 	}
        if (this.superButton && !this.superButton.hasAttribute("hasClickHandler")) {
            this.superButton.addEventListener("click", function(event) {
                that.manageToolbar("init", event);
            });
            this.superButton.setAttribute("hasClickHandler", 1);
        }
        return;
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    loadDefaultOptions() {
        this._clearOptions(this.PROPS.defaults._storageKey);
        this.PROPS.set = this.extender({}, this.PROPS.defaults, this.readOptions(this.PROPS.defaults._storageKey));
        this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
        this._debug("loadDefaultOptions --", this.PROPS.set);
    //this.refreshApp();
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    setOptions(opts = {}) {
        let val = this.tgEpgDefaults.setOptions(this, opts);
        this.PROPS.set = this.extender(this.PROPS.set, val);
        this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
        this._debug("setOptions --", val);
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    getOptions(opts = {}) {
        this._debug("getOptions --opts", opts);
        let val = this.tgEpgDefaults.getOptions(this, opts);
        this._debug("getOptions --val", val);
        return val;
    }
}
window.customElements.define("tgepg-timebar", tgEpgTimebar);

},{"../tgControls.js":"5PP50","../../defaults_Timebar.js":"hGSxU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hGSxU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgTimebarDefaults", ()=>tgEpgTimebarDefaults);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgEpgTimebarDefaults extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(){
        super("open");
        this["PROPS"] = {
            default: this._extender({}, this["PROPS"].default || {}, {})
        };
    }
    static get properties() {
        var props = super.properties || {};
        props["previewSpan"] = null;
        props["previewOffset"] = null;
        props["previewStart"] = null;
        props["previewEnd"] = null;
        props["scale"] = null;
        props["supermaster"] = null;
        console.debug("get properties fct in defaults timebar:", props);
        return props;
    }
    static get template() {
        var styles = super.styles || "";
        styles = styles + `
						<style>
						:host
							{
							--timeBarBorder: 1px solid black;
							display:inline-block;
							height:calc( var(--timeBarCellHeight) * 4) !important;
							}
						[name="app"]
							{
							white-space: normal;
							background-color: gray;
							display:inline-block;
							position:relative;
							}
						[name="digitline"]
							{
							height:calc( var(--timeBarCellHeight) * 1) !important;
							min-height:calc( var(--timeBarCellHeight) * 1) !important;
							max-height:calc( var(--timeBarCellHeight) * 1) !important;
							}
						[name="digitline"] .TabCell .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: min(calc( var(--timeBarCellHeight) * 2), 12px);
							}
						[name="digitline"] .TabCell .TabCell:not(:first-child)
							{
							width:calc( var(--timeBarCellWidth) * 4) !important;
							min-width: calc( var(--timeBarCellWidth) * 4 );
							max-width: calc( var(--timeBarCellWidth) * 4 );
							}
						[name="digitline"] .TabCell .TabCell:first-child
							{
							width:calc( var(--timeBarCellWidth) * 2) !important;
							min-width: calc( var(--timeBarCellWidth) * 2 );
							max-width: calc( var(--timeBarCellWidth) * 2 );
							}
						[name="digitlinefree"]
							{
							position:absolute;
							left:0px;
							top:0px;
							height:calc( var(--timeBarCellHeight) * 1) !important;
							min-height:calc( var(--timeBarCellHeight) * 1) !important;
							max-height:calc( var(--timeBarCellHeight) * 1) !important;
							}
						[name="digitlinefree"] .TabCell
							{
							vertical-align: middle;
							text-align:center;
							font-size: clamp(10px , calc( var(--timeBarCellHeight) * 1) , 20px);
							}
						[name="digitlinefree"] .TabCell:not(:first-child)
							{
							width:calc( var(--timeBarCellWidth) * 4) !important;
							min-width: calc( var(--timeBarCellWidth) * 4 );
							max-width: calc( var(--timeBarCellWidth) * 4 );
							}
						[name="digitlinefree"] .TabCell:first-child
							{
							width:calc( var(--timeBarCellWidth) * 2) !important;
							min-width: calc( var(--timeBarCellWidth) * 2 );
							max-width: calc( var(--timeBarCellWidth) * 2 );
							}
						[name="barline"]
							{
							height:calc( var(--timeBarCellHeight) * 4) !important;
							}
						[name="hourcell"]
							{
							width:calc( var(--timeBarCellWidth) * 4) !important;
							min-width: calc( var(--timeBarCellWidth) * 4 );
							max-width: calc( var(--timeBarCellWidth) * 4 );
							}
						[name="hourcell"] .Tab > .TabRow > .TabCell
							{
							vertical-align:top;
							}
						[name="barlinecell"]
							{
							width:calc( var(--timeBarCellWidth) * 1) !important;
							min-width: calc( var(--timeBarCellWidth) * 1 );
							max-width: calc( var(--timeBarCellWidth) * 1 );
							}
						[name="hourcell"] .greedyH > .TabRow:last-child > .TabCell
							{
							border-left: var(--timeBarBorder);
							}

						</style>

						`;
        var tmp = styles + `
						<!-- App -->
						<div name="app" class=""></div>
						<!-- App Ende-->

						`;
        return tmp;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hFcgl":[function(require,module,exports) {
/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgChannelList", ()=>tgEpgChannelList);
var _channelProgListBasisJs = require("./channelProgList.basis.js");
var _defaultsChannellistJs = require("../../defaults_Channellist.js");
class tgEpgChannelList extends (0, _channelProgListBasisJs.channelProgListBasis) {
    constructor(mode = "open", props = {}){
        super(mode, new (0, _defaultsChannellistJs.tgEpgChannelListDefaults)(), props);
        var that = this;
        console.warn("constr tgEpgChannelList");
        // default Parameter nach Props einlesen
        this["PROPS"] = this._extender({}, this["PROPS"] || {}, {
            default: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                },
                skale: 0,
                firstStart: 0,
                lastEnd: 0,
                timePosition: 0,
                epgEnd: 100
            },
            attr: this._extender({}, tgEpgChannelList.properties)
        });
        this["PROPS"]["run"] = this._extender(this["PROPS"]["default"] || {}, this["PROPS"]["run"] || {}, props);
        this.app = this.shadowRoot.querySelector('[name="app"]');
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = (0, _defaultsChannellistJs.tgEpgChannelListDefaults).template;
        return tmp;
    }
    //######################################################################################################################################
    //
    // properties()
    // collect name-value pairs to use as observed Attributes and the corresponding this->PROPS->attr
    //
    //######################################################################################################################################
    static get properties() {
        let props = (0, _defaultsChannellistJs.tgEpgChannelListDefaults).properties || {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    static get observedAttributes() {
        let props = tgEpgChannelList.properties;
        props = Object.keys(props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connectedCallback() {
        var that = this;
        if (this.PROPS.run.connected == 0) {
            this.render();
            this.moveToOffset();
            // 	this.init();
            //	this.refreshAppSizeAfterResizeOrInit();
            // 	this.buildApp();
            // 	this.getData();
            this.connected();
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (!newVal || !this.PROPS.paras.hasOwnProperty(attrName) || this.PROPS.paras[attrName] === newVal) return;
        oldVal = oldVal || this.PROPS.paras[attrName];
        super.attributeChangedCallback(attrName, newVal, oldVal);
        //this._debug("change Attribute "+attrName, "from", oldVal, "to" , newVal);
        this.PROPS.paras[attrName] = newVal;
        switch(attrName){
            case "timerowheight":
                break;
            case "channelfilter":
                this.setFilter(newVal);
                break;
            case "data":
                this.PROPS.paras["dataref"] = newVal;
                this.dataHandler.getData(newVal);
                break;
            default:
                break;
        }
    }
    //######################################################################################################################################
    //setter & getter
    //
    //
    //######################################################################################################################################
    get _addCell() {
        return this.PROPS.run.previewStart;
    }
    set _addCell(val) {}
    get supermaster() {
        return this.PROPS.run.supermaster;
    }
    set supermaster(val) {
        this.PROPS.run["supermaster"] = val;
    }
    //######################################################################################################################################
    //renderChannelLine()
    //fügt einen Channel in die Liste
    //
    //######################################################################################################################################
    renderChannelLine(channel) {
        if (this.isValidChannel(channel, {
            data: "hash",
            id: "string"
        }) && !this.app.querySelector(`[id="${channel.id}"]`)) {
            if (Object.keys(channel.data).length == 0) return;
            let html = `<tgepg-channellistitem class="TabCell" ><div slot=channelname>${channel.friendlyName || channel.name || channel.channelID}</div></tgepg-channellistitem>`;
            html = this._htmlToElement(html);
            let row = this._htmlToElement(`<div class="TabRow"  id="${channel.id}"></div>`);
            row.appendChild(html);
            this.app.appendChild(row);
        }
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    addLine(id, rawFilter = [], channel = "-", html = "", shown = true) {
        id = "channel_" + id;
        if (this.app.querySelector(`#${id}`) !== null) return;
        var filter = rawFilter.join(",");
        if (html === "") html = `<tg-epg-channellistitem class="TabCell" ><div slot=channelname>${channel}</div></tg-epg-channellistitem>`;
        html = this.htmlToElement(html);
        var row = this.htmlToElement(`<div class="TabRow" filter="${filter}" id="${id}"></div>`);
        if (!shown) row.classList.add("hide");
        row.appendChild(html);
        this.app.appendChild(row);
    }
    render() {
        if (!this.PROPS.run.scale || !this.PROPS.run.previewEnd || !this.PROPS.run.previewStart) return;
        ////this._debug("refreshApp Width", new Date(this.PROPS.run.previewDrawStart*1000), new Date(this.PROPS.run.previewStart*1000), new Date(this.PROPS.run.previewEnd*1000), (this.PROPS.run.previewEnd-this.PROPS.run.previewDrawStart)/3600)
        //this._debug("run", cellHeight, this.app, this.PROPS.run)
        let that = this;
        let test;
        this._log("init App");
        let digitCell = ``;
        let barCell = ``;
        var root = this;
        while(root.parentNode)root = root.parentNode;
        root = root.querySelector('[name="timeBar"]');
        var cellHeight = root.clientHeight || this.app.clientHeight || 50;
        cellHeight = cellHeight / 5;
        //let hours=(this.PROPS.run.previewEnd-this.PROPS.run.previewStart)/3600;
        //this._debug("run", cellHeight, this.app, this.PROPS.run)
        for(let i = this.PROPS.run.previewDrawStart + 3600; i <= this.PROPS.run.previewEnd; i += 3600){
            ////this._debug("refreshApp Width i=", i)
            let d = new Date(i * 1000);
            let h = d.getHours() + "";
            h = (h.length === 1 ? "0" + h : h) + ":00";
            digitCell += `<div class="TabCell">` + h + `</div>`;
            barCell += `<div name="hourcell" class="TabCell">
							<div class="Tab greedy">
								<div class="TabRow">
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
									<div class="TabCell">
										<div class="Tab greedyH">
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
											<div class="TabRow"><div name="barlinecell" class="TabCell"></div></div>
										</div>
									</div>
								</div>
							</div>
						</div>`;
        }
        digitCell = `<div class="Tab greedyH" name="digitlinefree"><div class="TabRow"><div class="TabCell"></div>` + digitCell + `<div class="TabCell"></div></div></div>`;
        barCell = `<div class="Tab greedyH" ><div class="TabRow">` + barCell + `</div></div>`;
        let timebarTab = `
				<div class="greedyH Tab ">
					<div name="digitline" class="TabRow">
						<div class="TabCell">` + `<!--digitCell-->` + `</div>
					</div>
					<div name="barline" class="TabRow">
						<div class="TabCell">` + barCell + `</div>
					</div>
				</div>` + digitCell;
        this.style.setProperty("--timeBarCellWidth", parseInt(900 * this.PROPS.run.scale) + "px");
        this.style.setProperty("--timeBarCellHeight", parseInt(cellHeight) + "px");
        this.app.innerHTML = timebarTab;
        // test is mobile or desktop
        // tbd
        //
        this.addEventListener("datareadyforuse", function(event) {
            this._log("data ready for use", this.dataHandler.data);
            //this._debug("dataHandlerEPG", this.dataHandler.data)
            this.epgData = this.dataHandler.data;
            this._log("EPG eingelesen", Object.keys(this.epgData).length, "Sender");
            this.refreshEpgData();
        });
        this._resizeObserver.observe(this.app);
        this.addEventListener("resize", function(ev) {
        //that.refreshApp();
        }, false);
        return;
    }
    //#########################################################################################################
    //## refreshAppSizeAfterResizeOrInit()
    //##
    //##
    //##
    //#########################################################################################################
    moveToOffset() {}
    //#########################################################################################################
    //## refreshAppSizeAfterResizeOrInit()
    //##
    //##
    //##
    //#########################################################################################################
    refreshAppSizeAfterResizeOrInit() {
        //this._debug("refreshAppSizeAfterResizeOrInit")
        if (this.buttonCell && this.PROPS.paras.timerowheight) this.buttonCell.style.height = parseInt(this.PROPS.paras.timerowheight) + "px";
        if (this.buttonCell && this.PROPS.paras.channelcolumnwidth) this.buttonCell.style.width = parseInt(this.PROPS.paras.channelcolumnwidth) + "px";
        var width = this.timeBar.clientWidth;
        var hours = null;
        if (this.PROPS.run.previewSpans && this.getType(this.PROPS.run.previewSpans, "hash")) {
            var myKeys = Object.keys(this.PROPS.run.previewSpans);
            myKeys = myKeys.sort();
            var found = 0;
            for(let i = 0; i < myKeys.length; i++){
                ////this._debug("width", parseInt(myKeys[i]), width)
                if (parseInt(myKeys[i]) != 0 && parseInt(myKeys[i]) <= width) hours = this.PROPS.run.previewSpans[myKeys[i]];
                else if (parseInt(myKeys[i]) > width) {
                    found = 1;
                    break;
                }
            }
            if (found == null || hours == null) hours = this.PROPS.run.previewSpans["0"] || 10;
        }
        this.PROPS.run["previewSpan"] = parseFloat(hours) || 1;
        this.PROPS.run["scale"] = width / (hours * 60);
    ////this._debug("hours", hours, width, this.PROPS.run.scale, this.PROPS.run.previewSpan)
    ////this._debug("refreshApp Width", this.buttonCell, this.buttonCell.clientWidth)
    ////this._debug("refreshApp Width", this.timeRow, this.timeRow.clientWidth)
    ////this._debug("refreshApp Width", this.timeBar, this.timeBar.offsetWidth)
    }
    //#########################################################################################################
    //## buildApp()
    //## richtet die App-Oberfläche ein
    //##
    //##
    //#########################################################################################################
    buildApp() {
        //this._debug("buildApp:", this.PROPS.run.mode);
        var that = this;
        var timeBar = this.timeBar.querySelector("tg-epg-timebar");
        timeBar;
        // // inject CCS-File to <HEAD>
        // let cssLink = document.querySelector('head > [name="tgEpgStyle"]');
        // if (! cssLink)
        // 	{
        // 	let style=document.createElement("link");
        // 	style.setAttribute("rel","stylesheet");
        // 	style.setAttribute("name","tgEpgStyle");
        // 	style.setAttribute("href","tgEpg.hlp.cssInjectToHead.css");
        // 	document.getElementsByTagName("head")[0].appendChild(style);
        // 	}
        if (this.superButton && !this.superButton.hasAttribute("hasClickHandler")) {
            this.superButton.addEventListener("click", function(event) {
                that.manageToolbar("init", event);
            });
            this.superButton.setAttribute("hasClickHandler", 1);
        }
        return;
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    loadDefaultOptions() {
        this._clearOptions(this.PROPS.defaults._storageKey);
        this.PROPS.set = this.extender({}, this.PROPS.defaults, this.readOptions(this.PROPS.defaults._storageKey));
        this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
    //this._debug("loadDefaultOptions --", this.PROPS.set)
    //this.refreshApp();
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    setOptions(opts = {}) {
        let val = this.tgEpgDefaults.setOptions(this, opts);
        this.PROPS.set = this.extender(this.PROPS.set, val);
        this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
    //this._debug("setOptions --", val)
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    getOptions(opts = {}) {
        //this._debug("getOptions --opts", opts);
        let val = this.tgEpgDefaults.getOptions(this, opts);
        //this._debug("getOptions --val", val);
        return val;
    }
}
window.customElements.define("tgepg-channellist", tgEpgChannelList);

},{"./channelProgList.basis.js":"13lHo","../../defaults_Channellist.js":"1XbEO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"13lHo":[function(require,module,exports) {
/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "channelProgListBasis", ()=>channelProgListBasis) //window.customElements.define('tg-template', webcomponentTemplate);
;
var _tgControlsJs = require("../tgControls.js");
class channelProgListBasis extends (0, _tgControlsJs.tgControls) {
    constructor(defaultclass, properties){
        super("open", defaultclass);
        var that = this;
        this["PROPS"] = this._extender(this["PROPS"] || {}, {
            run: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                }
            },
            default: {
                connected: 0
            },
            paras: this._extender({})
        });
        // Zeiger auf Elemente aus dem Template
        this.app = this.shadowRoot.querySelector('[name="app"]');
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = `
			<style>
			:host
				{
				background-color:red;
				}
			.hide
				{
				display:none;
				}
			</style>
			<div name="app">
			</div>
			`;
        return tmp;
    }
    //######################################################################################################################################
    //
    // properties()
    // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
    //
    //######################################################################################################################################
    static get properties() {
        //let props=	tgEpgChannelListDefaults.properties || {};
        let props = {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    static get observedAttributes() {
        // let props=super.observedAttributes||[];
        // props.push("direction")
        return [
            "direction"
        ];
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connectedCallback() {
        var that = this;
        if (this.PROPS.run.connected == 0) {
            this.init();
            // this.refreshAppSizeAfterResizeOrInit();
            // this.buildApp();
            this.connected();
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (super.attributeChangedCallback(attrName, oldVal, newVal) === false) return;
        if (this.PROPS.run.connected) this.attributeChangedAction(attrName, oldVal, newVal);
    }
    attributeChangedAction(attrName, oldVal, newVal) {
        attrName;
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    init() {
        var that = this;
        return;
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    setFilter(rawFilter = []) {
        var that = this;
        rawFilter = this.getType(rawFilter, "array") ? rawFilter : this.getType(rawFilter, "string") ? [
            rawFilter
        ] : [];
        this.PROPS.paras["channelfilter"] = rawFilter;
        var filterStyles = this._shadowRoot.querySelectorAll('style[name="filter"]');
        filterStyles.forEach(function(style) {
            style.remove();
        });
        if (rawFilter.length > 0) {
            var styleEl = document.createElement("style");
            this._shadowRoot.appendChild(styleEl);
            styleEl.setAttribute("name", "filter");
            var filter = "";
            rawFilter.forEach(function(item) {
                if (that.getBoolean(item.activ)) {
                    filter = filter == "" ? `[filter*="whitelist"]` : filter;
                    var x = `[filter*="${item.id}"]`;
                    filter = `${filter}${filter === "" ? "" : ","}${x}`;
                }
            });
            let rule = filter != "" ? `.TabRow[filter]:not(${filter}){	display:none; }` : "";
            styleEl.innerHTML = rule;
        }
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    isValidChannel(channel = {}, mustHaveKeys = {}) {
        let keys = Object.keys(mustHaveKeys);
        for (let key of keys){
            if (!channel[key] || !this._getType(channel[key], mustHaveKeys[key])) return false;
        }
        return true;
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    get supermaster() {
        return this._supermaster;
    }
    set supermaster(val) {
        this["_supermaster"] = val;
    }
    get channelfilter() {
        return this.PROPS.paras.channelfilter;
    }
    set channelfilter(val) {
        console.log("setFilter c", val);
        this.setFilter(val);
    }
    set setChannel(val) {
        //console.debug("setchannel c", val)
        this.renderChannelLine(val);
    }
    set deleteChannel(val) {
    //console.log("delchannel c", val)
    }
}

},{"../tgControls.js":"5PP50","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1XbEO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgChannelListDefaults", ()=>tgEpgChannelListDefaults);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgEpgChannelListDefaults extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(){
        super("open");
        this["PROPS"] = {
            default: this._extender({}, this["PROPS"].default || {}, {})
        };
    }
    static get properties() {
        var props = super.properties || {};
        props["dataref"] = null;
        props["timerowheight"] = "50";
        props["channelrowheight"] = "50";
        props["channelcolumnwidth"] = "150";
        return props;
    }
    static get template() {
        var styles = super.styles || "";
        styles = styles + `
						<style>
						:host
						{
						display:inline-block;
						/*
						position:absolute;
						*/
						left:0px;
						top:0px;
						box-sizing: border-box;
						width:100%;
			
						}
					[name="app"]
						{
						white-space: normal;
						background-color: gray;
						display:inline-block;
						position:relative;
						width: var(--channelRowWidth-used);
						min-width: var(--channelRowWidth-used);
						max-width: var(--channelRowWidth-used);
						}
					.TabRow
						{
						height: var(--channelRowHeight-used);
						min-height: var(--channelRowHeight-used);
						max-height: var(--channelRowHeight-used);
						}
					.TabCell
						{
						vertical-align: middle;
						text-align:left;
						border-top: 3px solid black;
						border-bottom: 3px solid black;
			
						}
					.TabRow:nth-child(even) .TabCell
						{
						background-color: green;
						color: red;
						}
					.TabRow:nth-child(odd) .TabCell
						{
						background-color: blue;
						color: yellow;
						}

			
						</style>
						`;
        let html = `${styles}
					<div name="app" class="Tab">
					<!-- App -->
					<!-- App Ende-->
					</div>
					`;
        return html;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aLlUv":[function(require,module,exports) {
/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgChannelListItem", ()=>tgEpgChannelListItem);
var _tgControlsJs = require("../tgControls.js");
var _defaultsChannellistItemJs = require("../../defaults_ChannellistItem.js");
class tgEpgChannelListItem extends (0, _tgControlsJs.tgControls) {
    constructor(mode = "open", props = {}){
        super("open");
        var that = this;
        // default Parameter nach Props einlesen
        this.tgEpgDefaults = new (0, _defaultsChannellistItemJs.tgEpgChannelListItemDefaults)(this);
    //this.tgEpgDefaults=new tgEpgChannelListDefaults(this);
    // this["PROPS"]=this._extender(	{},
    // 								this["PROPS"]||{},
    // 								this.tgEpgDefaults.getProps,
    // 								{
    // 								default:	{
    // 											msg:	{
    // 													log:true,
    // 													debug:true,
    // 													error:true
    // 													},
    // 											skale:0,
    // 											firstStart:0,
    // 											lastEnd:0,
    // 											timePosition:0,
    // 											epgEnd:100
    // 											},
    // 								attr:		this._extender({},tgEpgChannelList.properties)
    // 								}
    // 							)
    // this["PROPS"]["run"]=this._extender	(	this["PROPS"]["default"]||{},
    // 										this["PROPS"]["run"]||{},
    // 										props
    // 									)
    // this._debug("constructor - Parameters", "props:",this["PROPS"]);
    // // data handler init
    // this.epgData={};
    // //this.me=new tgEpgHelper(false);
    // this.app = this.shadowRoot.querySelector('[name="app"]');
    // this._debug("constructor - constructed");
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = (0, _defaultsChannellistItemJs.tgEpgChannelListItemDefaults).template;
        return tmp || "";
    }
}
window.customElements.define("tgepg-channellistitem", tgEpgChannelListItem);

},{"../tgControls.js":"5PP50","../../defaults_ChannellistItem.js":"3WNwR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3WNwR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgChannelListItemDefaults", ()=>tgEpgChannelListItemDefaults);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgEpgChannelListItemDefaults extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(){
        super("open");
        this["PROPS"] = {
            default: this._extender({}, this["PROPS"].default || {}, {})
        };
    }
    static get template() {
        var styles = super.styles || "";
        styles = styles + `
			<style>
			:host
				{
				display:inline-block;
				box-sizing: border-box;

				}
			[name="app"]
				{
				white-space: normal;
				display:inline-block;
				position:relative;
				}
			.TabCell
				{
				white-space: nowrap;
				}
			</style>

			`;
        var tmp = styles + `
			<!-- App -->
				<div name="app" class="Tab">
					<div class="TabRow">
						<div class="TabCell">
						</div>
						<div class="TabCell">
							<slot name="channelname"></slot>
						</div>
						<div class="TabCell">
							<slot name="channelicon"></slot>
						</div>
					</div>
				</div>
			<!-- App Ende-->
			`;
        return tmp;
    }
    static get properties() {
        var props = super.properties || {};
        props["dataref"] = null;
        props["timerowheight"] = "50";
        props["channelrowheight"] = "50";
        props["channelcolumnwidth"] = "150";
        return props;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aIXjC":[function(require,module,exports) {
/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgProgList", ()=>tgEpgProgList);
var _channelProgListBasisJs = require("./channelProgList.basis.js");
var _defaultsProglistJs = require("../../defaults_Proglist.js");
var _tgEpgTooltippJs = require("./tgEpg.tooltipp.js");
class tgEpgProgList extends (0, _channelProgListBasisJs.channelProgListBasis) {
    constructor(mode = "open", props = {}){
        super(mode, new (0, _defaultsProglistJs.tgEpgProgListDefaults)());
        var that = this;
        // default Parameter nach Props einlesen
        this["PROPS"] = this._extender({}, this["PROPS"] || {}, {
            default: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                },
                skale: 0,
                firstStart: 0,
                lastEnd: 0,
                timePosition: 0,
                epgEnd: 100
            },
            attr: this._extender({}, tgEpgProgList.properties)
        });
        this["PROPS"]["run"] = this._extender(this["PROPS"]["default"] || {}, this["PROPS"]["run"] || {}, props);
        // Props durch im Storage gespeichertes erweitern/anpassen
        this["_drawStart"] = null;
        //this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));
        //this._debug("constructor - Parameters", "props:",this["PROPS"]);
        // data handler init
        this.epgData = {};
        //this.me=new tgEpgHelper(false);
        this.app = this.shadowRoot.querySelector('[name="app"]');
        // this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');
        // this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
        // this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
        // this.timeBar = this.shadowRoot.querySelector('[name="timeBar"]');
        // this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
        this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
    // this.superButton = that.shadowRoot.querySelector('#superbutton');
    // this.floatingMenu = that.shadowRoot.querySelector('[name="app"]>tg-floatingMenu');
    /*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */ // this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
    //this._debug("JSON", this.readOptions(this.PROPS.defaults._storageKey))
    //this.PROPS.run.topElements = [this.app, this.icon];
    //this._log("construction ended", "props:",this.PROPS, "me:", this);
    //this._debug("constructor - constructed");
    }
    //######################################################################################################################################
    //renderChannelLine()
    //fügt einen Channel in die Liste
    //
    //######################################################################################################################################
    renderChannelLine(channel) {
        var that = this;
        var id = "progline_";
        var row = null;
        //console.debug("man", channel)
        if (this.isValidChannel(channel, {
            data: "hash",
            id: "string"
        })) {
            //console.debug("man valid", channel)
            id = `${id}${channel.id}`;
            row = this.app.querySelector(`[id="${id}"]`);
            if (!row) {
                if (Object.keys(channel.data).length == 0) return;
                //		console.log("renderChannelLine", channel.data)	
                row = this._htmlToElement(`<div class="TabRow" id="${id}" >
											<div class="TabCell">
												<div class="Tab">
													<div name="container" class="TabRow">
														<tgepg-progitem class="TabCell" span="0" name="startplaceholder">ol8izu		</tgepg-progitem>
														<tgepg-progitem class="TabCell" span="0" name="endplaceholder">dafgfd		</tgepg-progitem>
													</div>
												</div>
											</div>
										</div>
										`);
                this.app.appendChild(row);
            }
            row = row.querySelector('[name="container"]');
            if (!row) return;
            // //console.debug(row)
            //console.log("renderChannelLine xx", channel.data)	
            var firstitem = row.querySelector(`[name="startplaceholder"]`);
            var lasttitem = row.querySelector(`[name="endplaceholder"]`);
            if (channel.preSpan && firstitem) firstitem.setAttribute("span", channel.preSpan);
            if (channel.postSpan && lasttitem) lasttitem.setAttribute("span", channel.postSpan);
            if (channel.todolist) {
                let keys = Object.keys(channel.todolist);
                console.debug("proglist todo", keys);
                for (let key of keys){
                    if (key.startsWith("d")) for (let index of channel.todolist[key]){
                        let elem = row.querySelector(`[id="${index}"]`);
                        if (elem) elem.remove();
                    }
                }
                for (let key of keys){
                    if (key.startsWith("r")) for (let index of channel.todolist[key]){
                        let elem = row.querySelector(`[id="${index}"]`);
                        if (elem && channel.data[index]) elem.replaceWith(this._htmlToElement(channel.data[index].html));
                    }
                }
                for (let key of keys){
                    if (key.startsWith("a")) for (let index of channel.todolist[key]){
                        let elem = row.querySelector(`[id="${index}"]`);
                        if (!elem && lasttitem) lasttitem.insertAdjacentElement("beforebegin", this._htmlToElement(channel.data[index].html));
                    }
                }
                for (let key of keys)if (key.startsWith("m")) {
                    console.debug("proglist manage channel", channel);
                    let elem = row.querySelector(`[name="startplaceholder"]`);
                    if (channel.preSpan && elem) elem.setAttribute("span", channel.preSpan);
                    elem = row.querySelector(`[name="endplaceholder"]`);
                    if (channel.postSpan && elem) elem.setAttribute("span", channel.postSpan);
                }
            }
        }
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    addLine(id, rawFilter = [], item = {}, that, html = "", shown = true) {
        ////console.debug("addline", html)
        var that = this;
        id = "progline_" + id;
        var filter = rawFilter.join(",");
        var row = this.app.querySelector(`#${id}`);
        if (!row) {
            row = this.htmlToElement(`<div class="TabRow" filter="${filter}" id="${id}" >
										<div class="TabCell">
											<div class="Tab">
												<div name="container" class="TabRow">
													<tgepg-progitem class="TabCell" span="0" name="startplaceholder"><tgepg-progitem>
													<tgepg-progitem class="TabCell" span="0" name="endplaceholder"><tgepg-progitem>
												</div>
											</div>
										</div>
									</div>
									`);
            this.app.appendChild(row);
        }
        if (!shown) row.classList.add("hide");
        row = row.querySelector('[name="container"]');
        var cells = row.querySelectorAll("tgepg-progitem:not([usedfor])");
        if (cells.length === 0) row.innerHTML = html;
        else {
            var newCells = [];
            var cell = cells[cells.length - 1];
            cell.setAttribute("span", cell.getAttribute("duration"));
            this.htmlToElements(html).forEach((element)=>{
                if (that.getType(element, "nodeElement")) newCells.push(element);
            });
            newCells.forEach((newCell)=>{
                var start = parseInt(cell.getAttribute("start"));
                var end = parseInt(cell.getAttribute("end"));
                var newstart = parseInt(newCell.getAttribute("start"));
                var newend = parseInt(newCell.getAttribute("end"));
                var span = newstart - end;
                if (span === 0) {
                    cell.after(newCell);
                    cell = newCell;
                } else if (span > 0) {
                    cell.after(this.htmlToElement(`
					<tg-epg-progitem class="TabCell"
					span="${span}"
					start="${end}"
					end="${newstart}"
					channelid="${id}"
					id="${id}_${end}"
						></tg-epg-progitem>`), newCell);
                    cell = newCell;
                } else if (span < 0 && newend <= end) ;
                else if (span < 0 && newend > end) {
                    cell.setAttribute("span", newstart - start);
                    cell = newCell;
                }
            });
        }
        cells = row.querySelectorAll("tg-epg-progitem:not([usedfor]):not([status])");
        cells.forEach((cell)=>{
            that.transferPROPS(that, cell);
        });
        return;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = (0, _defaultsProglistJs.tgEpgProgListDefaults).template;
        return tmp;
    }
    //######################################################################################################################################
    //
    // properties()
    // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
    //
    //######################################################################################################################################
    static get properties() {
        let props = (0, _defaultsProglistJs.tgEpgProgListDefaults).properties || {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    static get observedAttributes() {
        let props = tgEpgProgList.properties;
        props = Object.keys(props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connectedCallback() {
        var that = this;
        if (this.PROPS.run.connected == 0) this.connected();
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (!newVal || !this.PROPS.paras.hasOwnProperty(attrName) || this.PROPS.paras[attrName] === newVal) return;
        oldVal = oldVal || this.PROPS.paras[attrName];
        if (typeof super.attributeChangedCallback == "function") super.attributeChangedCallback(attrName, newVal, oldVal);
        //this._debug("change Attribute "+attrName, "from", oldVal, "to" , newVal);
        this.PROPS.paras[attrName] = newVal;
        switch(attrName){
            case "timerowheight":
                break;
            case "channelfilter":
                this.setFilter(newVal);
                break;
            case "data":
                this.PROPS.paras["dataref"] = newVal;
                this.dataHandler.getData(newVal);
                break;
            default:
                break;
        }
    }
    //######################################################################################################################################
    //setter & getter
    //
    //
    //######################################################################################################################################
    get design_timeFrameStart() {
        ////console.debug("render Appp getter", this.PROPS.run)
        return this.PROPS.run.timeFrameStart || null;
    }
    set design_timeFrameStart(val) {
    // if (this.PROPS.run.timeFrameStart != val)
    // 	{
    // 	this.PROPS.run["timeFrameStart"]=val;
    // 	}
    }
    get design_timeFrameEnd() {
        return this.PROPS.run.timeFrameEnd || null;
    }
    set design_timeFrameEnd(val) {
    // if (this.PROPS.run.timeFrameEnd != val)
    // 	{
    // 	this.PROPS.run["timeFrameEnd"]=val;
    // 	}
    }
    get design_SpanTime() {
        return this.PROPS.run.SpanTime || null;
    }
    set design_SpanTime(val) {
        if (this.PROPS.run.SpanTime != val) this.PROPS.run["SpanTime"] = val;
    }
    get design_SpanTimeAll() {
        return this.PROPS.run.SpanTimeAll || null;
    }
    set design_SpanTimeAll(val) {
        if (this.PROPS.run.SpanTimeAll != val) this.PROPS.run["SpanTimeAll"] = val;
    }
    get design_PastOffsetTime() {
        return this.PROPS.run.PastOffsetTime || null;
    }
    set design_PastOffsetTime(val) {
        if (this.PROPS.run.PastOffsetTime != val) this.PROPS.run["PastOffsetTime"] = val;
    }
    get now() {
        return this.PROPS.run.now || null;
    }
    set now(val) {
        if (this.PROPS.run.now != val) this.PROPS.run["now"] = val;
    }
    get supermaster() {
        return this.PROPS.run.supermaster;
    }
    set supermaster(val) {
        this.PROPS.run["supermaster"] = val;
    }
    //##################################################################
    // get epgPastSpanHours()
    // 	{
    // 	return this.PROPS.run.epgPastSpanHours||null;
    // 	}
    // set epgPastSpanHours(val)
    // 	{
    // 	if (this.PROPS.run.epgPastSpanHours != val)
    // 		{
    // 		this.PROPS.run["epgPastSpanHours"]=val;
    // 		}
    // 	}
    // get epgFutureSpanHoursAll()
    // 	{
    // 	return this.PROPS.run.epgFutureSpanHoursAll||null;
    // 	}
    // set epgFutureSpanHoursAll(val)
    // 	{
    // 	if (this.PROPS.run.epgFutureSpanHoursAll != val)
    // 		{
    // 		this.PROPS.run["epgFutureSpanHoursAll"]=val;
    // 		}
    // 	}
    // get scale()
    // 	{
    // 	return this.PROPS.run.scale||null;
    // 	}
    // set scale(val)
    // 	{
    // 	if (this.PROPS.run.scale != val)
    // 		{
    // 		this.PROPS.run["scale"]=val;
    // 		}
    // 	}
    render() {
        var that = this;
        let selector = '.TabRow[filter] [name="container"]';
        var rows = this.app.querySelectorAll(`${selector}`);
        const styles = getComputedStyle(this);
        this.PROPS.run["scale"] = parseFloat(styles.getPropertyValue("--scale")) || 0;
        rows.forEach(function(row) {
            var cells = row.querySelectorAll('tg-epg-progitem[usedfor="emptyStartCell"],tg-epg-progitem[usedfor="emptyEndCell"]');
            cells.forEach(function(cell) {
                cell.remove();
            });
        });
        selector = `${selector} > tg-epg-progitem`;
        this.PROPS.run["timeFrameStart"] = getMinMaxTime("min", this.PROPS.run.now - this.PROPS.run.epgPastSpanHours * 3600, `${selector}:first-of-type`);
        this.PROPS.run["timeFrameEnd"] = getMinMaxTime("max", this.PROPS.run.now + (this.PROPS.run.epgFutureSpanHours + this.PROPS.run.epgFutureSpanHoursAll) * 3600, `${selector}:last-of-type`);
        rows.forEach(function(row) {
            var firstCell = row.querySelector("tg-epg-progitem:not([usedfor]):first-of-type");
            while(firstCell && parseInt(firstCell.getAttribute("end")) < that.PROPS.run.timeFrameStart){
                firstCell.remove();
                firstCell = row.querySelector("tg-epg-progitem:not([usedfor]):first-of-type");
            }
            var lastCell = row.querySelector("tg-epg-progitem:not([usedfor]):last-of-type");
            while(lastCell && parseInt(lastCell.getAttribute("start")) > that.PROPS.run.timeFrameEnd){
                lastCell.remove();
                lastCell = row.querySelector("tg-epg-progitem:not([usedfor]):last-of-type");
            }
            firstCell = row.querySelector("tg-epg-progitem:not([usedfor]):first-of-type");
            lastCell = row.querySelector("tg-epg-progitem:not([usedfor]):last-of-type");
            if (firstCell) {
                firstCell.setAttribute("span", parseInt(firstCell.getAttribute("duration")));
                lastCell.setAttribute("span", parseInt(lastCell.getAttribute("duration")));
                let x = parseInt(firstCell.getAttribute("start"));
                let y = that.PROPS.run.timeFrameStart - x;
                if (y >= 0) {
                    firstCell.setAttribute("span", parseInt(firstCell.getAttribute("span") - y));
                    y = 0;
                } else y = -1 * y;
                row.prepend(that.htmlToElement(`
					<tg-epg-progitem usedfor="emptyStartCell" class="usedfor" span="${y}">
					</tg-epg-progitem>
					`));
                x = parseInt(lastCell.getAttribute("end"));
                y = x - that.PROPS.run.timeFrameEnd;
                if (y >= 0) {
                    lastCell.setAttribute("span", parseInt(firstCell.getAttribute("span") - y));
                    y = 0;
                } else y = -1 * y;
                // 	////console.debug("proglistrender", y, new Date(that.PROPS.run.timeFrameStart*1000), new Date(that.PROPS.run.timeFrameEnd*1000))
                row.append(that.htmlToElement(`
					<tg-epg-progitem usedfor="emptyEndCell"  class="usedfor" span="${y}">
					</tg-epg-progitem>
					`));
            }
        });
        this.initTimemarker();
        function getMinMaxTime(minOrMax = "min", border, selector) {
            var cells = that.app.querySelectorAll(selector);
            // //console.debug("proglistrenderxxx", that.app, minOrMax, cells.length)
            var pos = null;
            cells.forEach(function(cell) {
                if (minOrMax === "min") {
                    let x = parseInt(cell.getAttribute("start"));
                    pos = pos === null || pos > x ? x : pos;
                    pos = pos < border ? border : pos;
                } else {
                    let x = parseInt(cell.getAttribute("end"));
                    pos = pos === null || pos < x ? x : pos;
                    pos = pos > border ? border : pos;
                // //console.debug("proglistrenderx", new Date(border*1000), new Date(pos*1000))
                }
            });
            return Math.round(new Date((pos === null ? border : pos) * 1000).floorHours().getTime() / 1000);
        }
    }
    addEmptyCellsOnStartAndEnd(row, start, end) {
        var sCell = row.querySelector('tg-epg-progitem[usedfor="emptyStartCell"]');
        if (!sCell) {
            sCell = this.htmlToElement(`
									<tg-epg-progitem usedfor="emptyStartCell">
									</tg-epg-progitem>
									`);
            row.prepend(sCell);
        }
        var eCell = row.querySelector('tg-epg-progitem[usedfor="emptyEndCell"]');
        if (!eCell) {
            eCell = this.htmlToElement(`
									<tg-epg-progitem usedfor="emptyEndCell">
									</tg-epg-progitem>
									`);
            row.append(eCell);
        }
        var brother = sCell.nextElementSibling;
        if (brother) {
            let nextStart = parseInt(brother.getAttribute("start") || end);
            let duration = nextStart - start;
            sCell.setAttribute("duration", duration);
            sCell.setAttribute("start", start);
            sCell.setAttribute("end", nextStart);
        }
        //console.debug("addEmptyCellsOnStartAndEnd", start, end, row,"\n", sCell,"\n", brother)
        var brother = eCell.previousElementSibling;
        if (brother) {
            let beforeEnd = parseInt(brother.getAttribute("end") || end);
            let duration = end - beforeEnd;
            eCell.setAttribute("duration", duration);
            eCell.setAttribute("start", start);
            eCell.setAttribute("end", beforeEnd);
        }
    //console.debug("addEmptyCellsOnStartAndEnd","\n", brother)
    // 	let duration=parseInt(item.nextSibling.getAttribute("start"))-start
    // var items=this.shadowRoot.querySelectorAll('tg-epg-progitem[usedfor="emptyStartCell"]:not([duration])');
    // items.forEach((item) =>
    // 	{
    // 	let duration=parseInt(item.nextSibling.getAttribute("start"))-start
    // 	item.setAttribute("duration", duration)
    //   	});
    // items=this.shadowRoot.querySelectorAll('tg-epg-progitem');
    // items.forEach((item) =>
    // 	{
    // 	item.supermaster=this._supermaster
    // 	});
    // this.drawStart=start
    }
    initTimemarker() {
        var that = this;
        if (!this.timeMarker || !this.PROPS.run.scale || !this.PROPS.run.timeFrameStart) return;
        var now = new Date();
        now = now.getTime() / 1000;
        var width = parseFloat(that.timeMarker.offsetWidth);
        var halberTimeMarker = width / 2;
        let pos = (now - this.PROPS.run.timeFrameStart) * that.PROPS.run.scale - halberTimeMarker;
        that.timeMarker.style.left = pos + "px";
        that.timeMarker.style.width = width + "px";
        if (!this.timeMarker.hasAttribute("hasTimer") || parseInt(this.timeMarker.getAttribute("hasTimer")) !== 1) {
            that.setAttribute("hasTimer", "1");
            that.PROPS.run["TimeMarkerHandler"] = setInterval(function() {
                that.initTimemarker();
            }, 5000);
        }
        this.addEventListener("scroll", function(ev) {
            this.timeMarker.style.top = this.scrollTop + "px";
        });
    }
    //#########################################################################################################
    //## refreshAppSizeAfterResizeOrInit()
    //##
    //##
    //##
    //#########################################################################################################
    resize(scale) {
        var oldScale = parseFloat(this.PROPS.run.scale);
        var oldScroll = parseFloat(this.scrollLeft);
        var timeOffset = oldScroll / oldScale;
        this.PROPS.run.scale = scale;
        if (this.PROPS.run.scale !== oldScale) {
            var progItems = this.shadowRoot.querySelectorAll("tg-epg-progitem");
            progItems.forEach((item)=>{
                item.setAttribute("scale", this.PROPS.run.scale);
            });
            this.scrollLeft = timeOffset * scale;
            this.initTimemarker();
        }
    }
}
window.customElements.define("tgepg-proglist", tgEpgProgList);

},{"./channelProgList.basis.js":"13lHo","../../defaults_Proglist.js":"1kOv6","./tgEpg.tooltipp.js":"75Vup","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1kOv6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgProgListDefaults", ()=>tgEpgProgListDefaults);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgEpgProgListDefaults extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(that){
        super("open", that);
        this["PROPS"] = {
            default: this._extender({}, this["PROPS"].default || {}, {})
        };
    }
    static get template() {
        var styles = super.styles || "";
        styles = styles + `
			<style>
			:host
				{
				display:inline-block;
				font-size:12px;
				overflow-x:auto;
				overflow-y:visible;
				/*
				position:absolute;
				*/
				left:0px;
				top:0px;
				box-sizing: border-box;

				}
			:host::-webkit-scrollbar
				{
				display: none;
				-ms-overflow-style: none;
				scrollbar-width: none;
				}
			[name="app"]
				{
				background-color: gray;
				display:inline-block;
				position:relative;
				}
			.TabCell > .Tab
				{
				height:100%;
				}
			.TabRow
				{
				height:100%;
				}
			[name="app"] > .TabRow
				{
				border-top: 3px solid black;
				border-bottom: 3px solid black;
				min-height: calc( var(--channelRowHeight) * 1 );
				max-height: calc( var(--channelRowHeight) * 1 );
				height: calc( var(--channelRowHeight) * 1 );

				}
			[name="app"] > .TabRow > .TabCell
				{
				height: 100%;
				}
			[name="app"] > .TabRow:nth-child(even)
				{
				background-color: green;
				color: red;
				}
			[name="app"] > .TabRow:nth-child(even) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(even)
				{
				background-color: white;
				color: black;
				}
			[name="app"] > .TabRow:nth-child(even) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(odd)
				{
				background-color: black;
				color: white;
				}
			[name="app"] > .TabRow:nth-child(odd)
				{
				background-color: brown;
				color: yellow;
				}
			[name="app"] > .TabRow:nth-child(odd) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(even)
				{
				background-color: darkgray;
				color: black;
				}
			[name="app"] > .TabRow:nth-child(odd) > .TabCell > .Tab > .TabRow > .TabCell:nth-child(odd)
				{
				background-color: lightgray;
				color: black;
				}

			[name="timemarker"]
				{
				position:absolute;
				width:2px;
				background-color: red;
				z-index: 2000;
				top: 0px;
				height: 100%
				}
			[genre="10"]
				{
				background-color:green !important;
				}
			[genre="11"]
				{
				background-color:blue !important;
				}
			[genre="12"]
				{
				background-color:red !important;
				}
			[genre="13"]
				{
				background-color:yellow !important;
				}
			[genre="14"]
				{
				background-color:brown !important;
				}
			tg-epg-progitem
				{
				--progItemScale: var(--channelLineScale):
				}
			.tgEpgTooltip
				{
				position: absolute;
				}


			</style>

			`;
        var tmp = styles + `
			<!-- App -->
			<div name="timemarker" class="hide"></div>
			<div class="tgEpgTooltip hide" data-id="-"></div>
			<div name="app" class="Tab">

				</div>
			<!-- App Ende-->
				`;
        return tmp;
    }
    static get properties() {
        var props = super.properties || {};
        props["dataref"] = null;
        props["timerowheight"] = "50";
        props["channelrowheight"] = "50";
        props["channelcolumnwidth"] = "150";
        return props;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"75Vup":[function(require,module,exports) {
/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgTooltipp", ()=>tgEpgTooltipp);
var _tgControlsJs = require("../tgControls.js");
class tgEpgTooltipp extends (0, _tgControlsJs.tgControls) {
    constructor(properties){
        super("open");
        var that = this;
        // default Parameter nach Props einlesen
        //this.tgEpgDefaults=new tgEpgAppDefaults(this);
        // this["PROPS"]=this._extender( (this["PROPS"] || {}),
        // 				{
        // 				defaults:this.tgEpgDefaults.loadDefaults(),
        // 				run:this.tgEpgDefaults.loadRun(),
        // 				set:this.tgEpgDefaults.loadSet()
        // 				});
        // Props durch hartcodierte Werte erweitern/anpassen
        this["PROPS"] = this._extender(this["PROPS"] || {}, {
            run: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                }
            },
            default: {
                connected: 0
            },
            paras: this._extender({})
        });
        // Props durch im Storage gespeichertes erweitern/anpassen
        // this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));
        //this._debug("constructor - Parameters", "props:",this["PROPS"]);
        this._containerWidth = null;
        this._supermaster = null;
        this.supressScrollEvent = 0;
        this._scrollWidth = 0;
        this._direction = null;
        this.container = this.shadowRoot.querySelector('[name="container"]');
    /*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */ //this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
    ////this._debug("JSON", this.readOptions(this.PROPS.defaults._storageKey))
    //this.PROPS.run.topElements = [this.app, this.icon];
    //this._log("construction ended", "props:",this.PROPS, "me:", this);
    //this._debug("constructor - constructed");
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = `
			<style>
			:host
				{
				position:absolute;
				z-index:2001;
				background-color:white;
				max-width:40%;
				max-height:50%;
				padding:4px;
				}
			div
				{
				white-space: normal;
				}
			.hide
				{
				display:none;
				}
			.nowrap
				{
				display: inline-block;
				white-space: nowrap;
				}
			</style>
			<div>
				<slot name="subtitleslot"></slot>
			</div>
			<div>
				<slot name="titleslot"></slot>
			</div>
			<div class="nowrap">
				<slot name="dateslot"></slot><slot name="startslot" class="nowrap"></slot>-<slot name="endslot" class="nowrap"></slot> <slot name="durationslot" class="nowrap"></slot>
			</div>
			`;
        return tmp;
    }
    //######################################################################################################################################
    //
    // properties()
    // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
    //
    //######################################################################################################################################
    static get properties() {
        let props = tgEpgAppDefaults.properties || {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    static get observedAttributes() {
        // let props=super.observedAttributes||[];
        // props.push("direction")
        return [
            "direction"
        ];
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connectedCallback() {
        var that = this;
        if (this.PROPS.run.connected == 0) {
            this.init();
            // this.refreshAppSizeAfterResizeOrInit();
            // this.buildApp();
            this.connected();
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal) return;
        oldVal = oldVal || this.PROPS.paras[attrName];
        super.attributeChangedCallback(attrName, newVal, oldVal);
        this.PROPS.paras[attrName] = newVal;
        switch(attrName){
            case "direction":
                if (newVal == "horizontal" || newVal == "vertical") {
                    this._direction = newVal;
                    this.init();
                }
                break;
            default:
                break;
        }
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    init() {
        var that = this;
        //var direction=this.getAttribute("direction");
        if (this._containerWidth && this._direction == "horizontal") this.container.style.width = this._containerWidth + "px";
        else if (this._containerWidth && this._direction == "vertical") this.container.style.height = this._containerWidth + "px";
        else return;
        if (!this.hasAttribute("hasScrollHandler") || parseInt(this.getAttribute("hasScrollHandler")) !== 1) {
            this.setAttribute("hasScrollHandler", "1");
            this.addEventListener("scroll", function(ev) {
                if (that.supressScrollEvent !== 1) {
                    let offset = that._direction == "horizontal" ? that.scrollLeft : that.scrollTop;
                    var ev = new CustomEvent("scrollbar", {
                        detail: {
                            direction: that._direction,
                            scrollwidth: offset
                        }
                    });
                    this.dispatchEvent(ev);
                }
                that.supressScrollEvent = 0;
            }, false);
        }
        return;
    }
    //######################################################################################################################################
    //scrollIt()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    scrollIt() {
        var that = this;
        var direction = this.getAttribute("direction");
        if (this.supressScrollEvent == 1) switch(direction){
            case "horizontal":
                this.scrollLeft = this._scrollWidth;
                break;
            case "vertical":
                this.scrollTop = this._scrollWidth;
                break;
            default:
                break;
        }
        this.supressScrollEvent = 0;
        return;
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    get supermaster() {
        return this._supermaster;
    }
    set supermaster(val) {
        this["_supermaster"] = val;
    }
    get containerWidth() {
        return this._containerWidth;
    }
    set containerWidth(val) {
        this._log("containerWidth", val);
        if (parseFloat(val) !== this._containerWidth) {
            this["_containerWidth"] = parseFloat(val);
            this.init();
        }
    }
    get scrollWidth() {
        return this._scrollWidth;
    }
    set scrollWidth(val) {
        if (parseFloat(val) !== this._scrollWidth) {
            this["_scrollWidth"] = parseFloat(val);
            this.supressScrollEvent = 1;
            this.scrollIt();
        }
    }
}
window.customElements.define("tgepg-tooltipp", tgEpgTooltipp);

},{"../tgControls.js":"5PP50","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4puUn":[function(require,module,exports) {
/*refr
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgProgItem", ()=>tgEpgProgItem);
var _tgControlsJs = require("../tgControls.js");
var _defaultsProgItemJs = require("../../defaults_ProgItem.js");
class tgEpgProgItem extends (0, _tgControlsJs.tgControls) {
    constructor(mode = "open", props = {}){
        super(mode, new (0, _defaultsProgItemJs.tgEpgProgItemDefaults)());
        var that = this;
        this["PROPS"] = this._extender({
            paras: {}
        }, this["PROPS"] || {}, {
            default: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                },
                skale: 0,
                firstStart: 0,
                lastEnd: 0,
                timePosition: 0,
                epgEnd: 100
            },
            attr: this._extender({}, tgEpgProgItem.properties)
        });
        this["PROPS"]["run"] = this._extender(this["PROPS"]["default"] || {}, this["PROPS"]["run"] || {}, props);
        // Props durch im Storage gespeichertes erweitern/anpassen
        //this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));
        //this._debug("constructor - Parameters", "props:",this["PROPS"]);
        // data handler init
        this.epgData = {};
    //this.me=new tgEpgHelper(false);
    // this.app = this.shadowRoot.querySelector('[name="app"]');
    // this.titleslot = this.shadowRoot.querySelector('[name="titleslot"]');
    // this.revier={l:80,r:0,t:0,b:0}
    // this.buttonCell = this.shadowRoot.querySelector('[name="buttonCell"]');
    // this.channelBox = this.shadowRoot.querySelector('[name="channelBox"]');
    // this.programBox = this.shadowRoot.querySelector('[name="programBox"]');
    // this.timeBar = this.shadowRoot.querySelector('[name="timeBar"]');
    // this.timeRow = this.shadowRoot.querySelector('[name="timeRow"]');
    // this.timeMarker = that.shadowRoot.querySelector('[name="timemarker"]');
    // this.superButton = that.shadowRoot.querySelector('#superbutton');
    // this.floatingMenu = that.shadowRoot.querySelector('[name="app"]>tg-floatingMenu');
    /*
		let body=document.querySelector("body");
													`<div name="EpgInfoBox" class="hide"></div>`
		this.EpgInfoBox = this.shadowRoot.querySelector('[name="EpgInfoBox"]');

 */ // this._writeOptions(this.PROPS.defaults._storageKey, this.PROPS.set);
    ////this._debug("JSON", this.readOptions(this.PROPS.defaults._storageKey))
    //this.PROPS.run.topElements = [this.app, this.icon];
    //this._log("construction ended", "props:",this.PROPS, "me:", this);
    //this._debug("constructor - constructed");
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    template() {
        let tmp = (0, _defaultsProgItemJs.tgEpgProgItemDefaults).template;
        return tmp;
    }
    // //######################################################################################################################################
    // //
    // // properties()
    // // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->attr
    // //
    // //######################################################################################################################################
    static get properties() {
        let props = (0, _defaultsProgItemJs.tgEpgProgItemDefaults).properties || {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    // //######################################################################################################################################
    // //
    // //
    // //
    // //######################################################################################################################################
    static get observedAttributes() {
        let props = tgEpgProgItem.properties;
        props = Object.keys(props);
        console.debug("observedAttributes tgEpgProgItem", props);
        return props;
    }
    // //######################################################################################################################################
    // //
    // //
    // //
    // //######################################################################################################################################
    // connectedCallback ()
    // 	{
    // 	var that=this;
    // 	if (this.PROPS.run.connected === 0)
    // 	 	{
    // 		this.activateToolTipp()
    // 	 	this.connected();
    // 	 	}
    // 	}
    // //######################################################################################################################################
    // //
    // //
    // //
    // //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (this.getAttribute("name") && this.getAttribute("name").includes("place")) {
            console.debug("change Attribute " + attrName, "from", oldVal, "to", newVal, this.getAttribute("name"), this);
            console.debug(!newVal, !this.PROPS.attr.hasOwnProperty(attrName), this.PROPS.attr[attrName] === newVal);
            console.debug(this.PROPS.attr);
        }
        if (!newVal || !this.PROPS.attr.hasOwnProperty(attrName) || this.PROPS.attr[attrName] === newVal) return;
        oldVal = oldVal || this.PROPS.attr[attrName];
        if (typeof super.attributeChangedCallback == "function") super.attributeChangedCallback(attrName, newVal, oldVal);
        this.PROPS.attr[attrName] = newVal;
        switch(attrName){
            case "span":
                this.style.setProperty("--progItemSpan", parseInt(this.PROPS.attr.span) + "px");
                break;
            case "timerowheight":
                break;
            case "data":
                this.PROPS.attr["dataref"] = newVal;
                this.dataHandler.getData(newVal);
                break;
            default:
                break;
        }
    }
}
window.customElements.define("tgepg-progitem", tgEpgProgItem);

},{"../tgControls.js":"5PP50","../../defaults_ProgItem.js":"aKQDv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aKQDv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgEpgProgItemDefaults", ()=>tgEpgProgItemDefaults);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgEpgProgItemDefaults extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(){
        super("open");
        this["PROPS"] = {
            default: this._extender({}, this["PROPS"].default || {}, {})
        };
    }
    static get template() {
        var styles = super.styles || "";
        styles = styles + `
			<style>
			:host
				{
				display:inline-block;
				width:     calc( var(--progItemSpan) *  var(--scale-used) ) !important;
				max-width: calc( var(--progItemSpan) *  var(--scale-used) ) !important;
				min-width: calc( var(--progItemSpan) *  var(--scale-used) ) !important;
				white-space: nowrap;
				margin:0px;
				padding:0px;
				box-sizing: border-box;

				overflow: hidden;
				white-space: nowrap;
				text-overflow:clip;
				text-align:center;
				vertical-align: middle;
				text-align:center;
				height: 100%;
				max-height: 100%;
				}

			[name="app"]
				{
				overflow:hidden;
				display:inline-box;
				/*width:100%;*/
				height:100%;
				border-radius: 1;
				border-right: 1px solid black;
				vertical-align: middle;
				padding:2px;
				}
			[name="app"]>slot
				{
				width:100%;
				height:100%;
				text-align: center;
				position:relative;
				vertical-align: middle;
				display:flex;
				text-overflow:clip;
				justify-content: center; align-items: center;
				margin:0px;
				padding:0px;
				}
			[name="app"]>slot>span
				{
				text-overflow:clip;
				overflow:hidden;
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
				vertical-align: middle;
				text-align:center;

				}
			</style>

			`;
        var tmp = styles + `
			<!-- App -->
				<div name="app">
					<slot name="titleslot"></slot>
				</div>
			<!-- App Ende-->
					`;
        return tmp;
    }
    static get properties() {
        var props = super.properties || {};
        props["span"] = null;
        props["channelrowheight"] = "50";
        return props;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cWkM0":[function(require,module,exports) {
/*
* tgEPG component
*
* Copyright (c) 2020-2021 Thomas Geißenhöner <quietcry@gmx.de>
* Under MIT License (http://www.opensource.org/licenses/mit-license.php)
*
*
*/ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgControlScrollbar", ()=>tgControlScrollbar);
var _tgControlsJs = require("./tgControls.js");
var _defaultsScrollbarJs = require("../defaults_Scrollbar.js");
class tgControlScrollbar extends (0, _tgControlsJs.tgControls) {
    constructor(mode = "open", props = {}){
        super(mode, new (0, _defaultsScrollbarJs.tgDefaultsScrollbar)());
        var that = this;
        // default Parameter nach Props einlesen
        //this.tgEpgDefaults=new tgDefaultsScrollbar(this);
        // default Parameter nach Props einlesen
        //this.tgEpgDefaults=new tgEpgAppDefaults(this);
        // this["PROPS"]=this._extender( (this["PROPS"] || {}),
        // 				{
        // 				defaults:this.tgEpgDefaults.loadDefaults(),
        // 				run:this.tgEpgDefaults.loadRun(),
        // 				set:this.tgEpgDefaults.loadSet()
        // 				});
        // Props durch hartcodierte Werte erweitern/anpassen
        this["PROPS"] = this._extender(this["PROPS"] || {}, {
            run: {
                msg: {
                    log: true,
                    debug: true,
                    error: true
                }
            },
            default: {
                connected: 0
            },
            paras: this._extender({})
        });
        // Props durch im Storage gespeichertes erweitern/anpassen
        // this.PROPS.set = this._extender({}, (this.PROPS.defaults || {}), (this.PROPS.set || {}), (this._readOptions(this.PROPS.defaults._storageKey) || {}));
        //this._debug("constructor - Parameters", "props:",this["PROPS"]);
        this._containerWidth = null;
        this._supermaster = null;
        this.supressScrollEvent = false;
        this._scrollWidth = 0;
        this._direction = null;
        this._pos = "bottom";
        this._reportto = null;
        this._reporttoElement = null;
        this._getSizeXFromElement = null;
        this._getSizeYFromElement = null;
        this.container = this._shadowRoot.querySelector('[name="container"]');
        this._parent = this.parentNode;
        this._ChildVisibleRect = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.myObserver = new ResizeObserver((entries)=>{
            var ev = new CustomEvent("resize");
            this.dispatchEvent(ev);
        });
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    //######################################################################################################################################
    //
    // properties()
    // collect name-value pairs to use as observed Atrributes and the corresponding this->PROPS->paras
    //
    //######################################################################################################################################
    static get properties() {
        let props = tgEpgAppDefaults.properties || {};
        let superProps = super.properties || {};
        props = Object.assign(superProps, props);
        return props;
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    static get observedAttributes() {
        // let props=super.observedAttributes||[];
        // props.push("direction")
        return [
            "pos",
            "reportto",
            "getsizefrom",
            "getxsizefrom",
            "getysizefrom"
        ];
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    connectedCallback() {
        var that = this;
        console.debug("connectedCallback", "start");
        if (this.PROPS.run.connected == 0) {
            this.init();
            // this.refreshAppSizeAfterResizeOrInit();
            // this.buildApp();
            this.connected();
        }
    }
    //######################################################################################################################################
    //
    //
    //
    //######################################################################################################################################
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal === newVal) return;
        oldVal = oldVal || this.PROPS.paras[attrName];
        super.attributeChangedCallback(attrName, newVal, oldVal);
        this.PROPS.paras[attrName] = newVal;
        switch(attrName){
            case "pos":
                if (newVal == "top" || newVal == "bottom" || newVal == "left" || newVal == "right") {
                    this._pos = newVal;
                    this._direction = newVal == "top" || newVal == "bottom" ? "horizontal" : newVal == "left" || newVal == "right" ? "vertical" : this._direction;
                    this.init();
                }
                break;
            case "reportto":
                this._reporttoElement = getParent.call(this, newVal);
                break;
            case "getsizefrom":
                if (newVal != "") {
                    this._getSizeXFromElement = getParent.call(this, newVal);
                    this._getSizeYFromElement = this._getSizeXFromElement;
                }
                break;
            case "getxsizefrom":
                if (newVal != "") this._getSizeXFromElement = getParent.call(this, newVal);
                break;
            case "getysizefrom":
                if (newVal != "") this._getSizeYFromElement = getParent.call(this, newVal);
                break;
            default:
                break;
        }
        function getParent(selector = "body") {
            var root = this;
            while(root.parentNode){
                if (root.querySelector(selector)) return root.querySelector(selector);
                root = root.parentNode;
            }
            return root.querySelector(selector);
        }
    }
    //######################################################################################################################################
    getParent(selector = "body") {
        var root = this;
        while(root.parentNode){
            if (root.querySelector(selector)) return root.querySelector(selector);
            root = root.parentNode;
        }
        return root.querySelector(selector);
    }
    render() {
        this.init();
    }
    //######################################################################################################################################
    //init()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    init() {
        var that = this;
        var sbo = "scrollbarobserver";
        if (!this._parent.hasAttribute(sbo)) {
            this.myObserver.observe(this._parent);
            this.addEventListener("resize", function(ev) {
                this.init();
            }, false);
            this._parent.setAttribute(sbo, "1");
        }
        var parent = this._parent.getBoundingClientRect();
        //this.getParent('[name="tgEpgProgList"]')
        if (this.PROPS.paras["getsizefrom"]) {
            this._getSizeXFromElement = this.getParent(this.PROPS.paras["getsizefrom"]);
            this._getSizeYFromElement = this._getSizeXFromElement;
        }
        if (this.PROPS.paras["getxsizefrom"]) this._getSizeXFromElement = this.getParent(this.PROPS.paras["getxsizefrom"]);
        if (this.PROPS.paras["getysizefrom"]) this._getSizeYFromElement = this.getParent(this.PROPS.paras["getysizefrom"]);
        if (!this._direction || this._direction == "horizontal" && !this._getSizeXFromElement || this._direction == "vertical" && !this._getSizeYFromElement) return;
        if (this._direction == "horizontal") {
            if (!this._getSizeXFromElement.hasAttribute(sbo)) {
                this.myObserver.observe(this._getSizeXFromElement);
                this._getSizeXFromElement.setAttribute(sbo, "1");
            }
            this.style.right = "0px";
            this.style.width = parent.width - (this._getSizeXFromElement.getBoundingClientRect().x + this._getSizeXFromElement.parentNode.scrollLeft - parent.x) + "px";
            this.container.style.width = this._getSizeXFromElement.getBoundingClientRect().width + "px";
            this.style.display = this.offsetWidth > this.container.offsetWidth ? "none" : "";
            this.supressScrollEvent = true;
            this.scrollLeft = this._getSizeXFromElement.parentNode.scrollLeft;
        } else if (this._direction == "vertical") {
            if (!this._getSizeYFromElement.hasAttribute(sbo)) {
                this.myObserver.observe(this._getSizeYFromElement);
                this._getSizeYFromElement.setAttribute(sbo, "1");
            }
            this.style.bottom = "0px";
            this.style.height = parent.height - (this._getSizeXFromElement.getBoundingClientRect().y - parent.y) + "px";
            this.container.style.height = this._getSizeXFromElement.getBoundingClientRect().height + "px";
            this.style.display = this.offsetHeight > this.container.offsetHeight ? "none" : "";
            this.scrollTop = this._getSizeXFromElement.scrollTop;
        }
        if (!this.hasAttribute("hasScrollHandler") || parseInt(this.getAttribute("hasScrollHandler")) !== 1) {
            this.setAttribute("hasScrollHandler", "1");
            this.addEventListener("scroll", function(ev) {
                if (!that.supressScrollEvent) {
                    let offset = that._direction == "horizontal" ? that.scrollLeft : that.scrollTop;
                    var ev = new CustomEvent("scrolled", {
                        detail: {
                            direction: that._direction,
                            scrollwidth: offset
                        }
                    });
                    //console.log("scrollevent",this, this._getSizeXFromElement.parentNode)
                    if (this._reporttoElement) this._reporttoElement.dispatchEvent(ev);
                    else {
                        this._getSizeXFromElement.parentNode.scrollLeft = offset;
                        this.dispatchEvent(ev);
                    }
                }
                that.supressScrollEvent = false;
            }, false);
        }
        return;
    }
    //######################################################################################################################################
    //scrollIt()
    //prüft die Umgebung und passt Parameter entsprechend an
    //
    //######################################################################################################################################
    scrollIt() {
        var that = this;
        var direction = this.getAttribute("direction");
        switch(direction){
            case "horizontal":
                this.scrollLeft = this._scrollWidth;
                break;
            case "vertical":
                this.scrollTop = this._scrollWidth;
                break;
            default:
                break;
        }
        //this.supressScrollEvent = false
        return;
    }
    //#########################################################################################################
    //##
    //##
    //##
    //##
    //#########################################################################################################
    get supermaster() {
        return this._supermaster;
    }
    set supermaster(val) {
        this["_supermaster"] = val;
    }
    get scrollWidth() {
        return this._scrollWidth;
    }
    set scrollWidth(val) {
        if (parseFloat(val) !== this._scrollWidth) {
            this["_scrollWidth"] = parseFloat(val);
            this.supressScrollEvent = true;
            this.scrollIt();
        }
    }
}
window.customElements.define("tgcontrol-scrollbar", tgControlScrollbar);

},{"./tgControls.js":"5PP50","../defaults_Scrollbar.js":"i55GM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i55GM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "tgDefaultsScrollbar", ()=>tgDefaultsScrollbar);
var _defaultsCommonJs = require("./defaults_Common.js");
class tgDefaultsScrollbar extends (0, _defaultsCommonJs.tgEpgDefaultsCommon) {
    constructor(that){
        super("open", that);
        this["PROPS"] = {
            default: this._extender({}, this["PROPS"].default || {}, {})
        };
    }
    static get template() {
        let tmp = `
				<style>
				:host
					{
					--scrollbarBgColor: lightgray;
					--scrollbarColor: pink transparent;
					--scrollbarSleepingWidth: 6px;
					--scrollBarWidth:12px;
	
					position:absolute;
					scrollbar-color: transparent transparent; /* thumb and track color */
					scrollbar-width: thin;
					z-index:100;
					overflow: hidden;
					}
				:host(:hover)
					{
					background-color: var(--scrollbarBgColor);
					scrollbar-color: var(--scrollbarColor);
					scrollbar-width: var(--scrollBarWidth);
					}
	
				:host([direction="vertical"],[pos="left"],[pos="right"])
					{
					top: 0px;
					bottom: 0px;
					width:var(--scrollbarSleepingWidth);
					}
				:host([pos="left"])
					{
					left:0px;
					}
				:host([direction="vertical"],[pos="right"])
					{
					right: 0px;
					}
				:host([direction="vertical"],[pos="left"],[pos="right"]) div
					{
					width:1px;
					}
				:host([direction="vertical"],[pos="left"],[pos="right"]:hover)
					{
					width: var(--scrollBarWidth);
					overflow-y: auto;
					}
				:host([direction="horizontal"]),
				:host([pos="top"]),
				:host([pos="bottom"])
					{
					height:var(--scrollbarSleepingWidth);
					}
				:host([direction="horizontal"]),
				:host([pos="bottom"])
					{
					bottom:0px;
					}
				:host([pos="top"])
					{
					top: 0px;
					}
				:host([direction="horizontal"]) div,
				:host([pos="top"]) div,
				:host([pos="bottom"]) div
					{
					height: 1px;
					}
				:host([direction="horizontal"]:hover),
				:host([pos="top"]:hover),
				:host([pos="bottom"]:hover)
					{
					height: var(--scrollBarWidth);
					overflow-x: auto;
					}
	
				</style>
				<div name="container"></div>`;
        return tmp;
    }
    static get properties() {
        var props = super.properties || {};
        props["dataref"] = null;
        props["timerowheight"] = "50";
        props["channelrowheight"] = "50";
        props["channelcolumnwidth"] = "150";
        return props;
    }
}

},{"./defaults_Common.js":"3eZWv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["02s2e","ciLff"], "ciLff", "parcelRequire94c2")

//# sourceMappingURL=tgepg-card.js.map
