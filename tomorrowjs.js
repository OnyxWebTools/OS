/*! Tomorrow.io Widget */ ! function(t) {
	var e = {};

	function n(r) {
		if (e[r]) return e[r].exports;
		var o = e[r] = {
			i: r,
			l: !1,
			exports: {}
		};
		return t[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
	}
	n.m = t, n.c = e, n.d = function(t, e, r) {
		n.o(t, e) || Object.defineProperty(t, e, {
			enumerable: !0,
			get: r
		})
	}, n.r = function(t) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
			value: "Module"
		}), Object.defineProperty(t, "__esModule", {
			value: !0
		})
	}, n.t = function(t, e) {
		if (1 & e && (t = n(t)), 8 & e) return t;
		if (4 & e && "object" == typeof t && t && t.__esModule) return t;
		var r = Object.create(null);
		if (n.r(r), Object.defineProperty(r, "default", {
				enumerable: !0,
				value: t
			}), 2 & e && "string" != typeof t)
			for (var o in t) n.d(r, o, function(e) {
				return t[e]
			}.bind(null, o));
		return r
	}, n.n = function(t) {
		var e = t && t.__esModule ? function() {
			return t.default
		} : function() {
			return t
		};
		return n.d(e, "a", e), e
	}, n.o = function(t, e) {
		return Object.prototype.hasOwnProperty.call(t, e)
	}, n.p = "", n(n.s = 6)
}([function(t, e) {
	t.exports = function(t) {
		return t && t.__esModule ? t : {
			default: t
		}
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function(t, e) {
		if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	function n(t, e) {
		for (var n = 0; n < e.length; n++) {
			var r = e[n];
			r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
		}
	}
	t.exports = function(t, e, r) {
		return e && n(t.prototype, e), r && n(t, r), Object.defineProperty(t, "prototype", {
			writable: !1
		}), t
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function(t, e) {
		(null == e || e > t.length) && (e = t.length);
		for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
		return r
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e, n) {
	var r = n(3);
	t.exports = function(t, e) {
		if (t) {
			if ("string" == typeof t) return r(t, e);
			var n = Object.prototype.toString.call(t).slice(8, -1);
			return "Map" === (n = "Object" === n && t.constructor ? t.constructor.name : n) || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? r(t, e) : void 0
		}
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e, n) {
	"use strict";
	n.r(e), n.d(e, "EVENT", (function() {
		return r
	})), n.d(e, "EVENT_PARAMETER", (function() {
		return o
	})), n.d(e, "LINK_VISIBILITY_CHECK_TIMEOUT", (function() {
		return i
	})), n.d(e, "LINK_VISIBILITY_CHECK_INTERVAL", (function() {
		return a
	})), n.d(e, "Analytics", (function() {
		return c
	}));
	const r = {
			SDK_INITIALIZED: "sdk_initialized",
			WIDGET_CONFIG_ERROR: "widget_config_error",
			WIDGET_LOAD_ERROR: "widget_load_error",
			WIDGET_LOAD_SUCCESS: "widget_load_success",
			WIDGET_LINK_ERROR: "widget_link_error",
			WIDGET_LINK_CLICK: "widget_link_click"
		},
		o = {
			WIDGET_TYPE: "widget_type"
		},
		i = 1500,
		a = 6e4,
		u = [];
	class c {
		constructor(t) {
			this.logger = t, this.gtmLoaded = !1, this.iframeWindow = null, this._init = this._init.bind(this), this.sendEvent = this.sendEvent.bind(this), this.sendFromQueue = this.sendFromQueue.bind(this)
		}
		_init(t) {
			this.iframeWindow = t;
			const e = setInterval(() => {
				this.iframeWindow.dataLayer && (this.gtmLoaded = !0, this.logger.debug("Analytics loaded!"), clearInterval(e), this.sendFromQueue())
			}, 100)
		}
		sendEvent(t) {
			this.logger.debug("Sending event", t.event || t), t = "string" == typeof t ? {
				event: t
			} : t, (this.gtmLoaded ? this.iframeWindow.dataLayer : u).push(t)
		}
		sendFromQueue() {
			this.logger.debug("Sending events from queue, events count: ", u.length), u.forEach(this.sendEvent)
		}
	}
}, function(t, e, n) {
	"use strict";
	var r = (i = n(0))(n(7)),
		o = i(n(8)),
		i = i(n(22)),
		a = n(23),
		u = (n = n(5), "true" === (0, a.getQueryStringValue)("debug")),
		c = new i.default({
			prefix: "Tomorrow.io SDK",
			isDebug: u
		}),
		s = (i = (0, a.generateGuid)(), new r.default),
		l = new o.default(c, i);
	u = new n.Analytics(c);

	function d() {
		return c.debug("searching for widgets..."), s.find('.tomorrow[data-widget-type]:not([data-rendered="true"])').then((function(t) {
			return Promise.all([].slice.call(t).map(f))
		}))
	}

	function f(t) {
		return l.render(t).then((function() {
			c.debug("widget render done.")
		})).catch((function(t) {
			c.error("render widget failed. error was:", t)
		}))
	}
	c.debug("starting..."), d(), window.__TOMORROW__ = {
		renderWidget: d
	}, u.sendEvent({
		event: n.EVENT.SDK_INITIALIZED
	})
}, function(t, e, n) {
	"use strict";
	var r = n(0),
		o = (Object.defineProperty(e, "__esModule", {
			value: !0
		}), e.default = void 0, r(n(1))),
		i = r(n(2));
	r = function() {
		function t() {
			var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : window.document,
				n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 200;
			(0, o.default)(this, t), this._doc = e, this._pollingInterval = n, this.find = this.find.bind(this)
		}
		return (0, i.default)(t, [{
			key: "find",
			value: function(t) {
				var e = this;
				return new Promise((function(n) {
					var r = e._doc.querySelectorAll(t);
					if (0 < r.length) return n(r);
					var o = setInterval((function() {
						0 < (r = e._doc.querySelectorAll(t)).length && (clearInterval(o), n(r))
					}), e._pollingInterval);
					return o
				}))
			}
		}]), t
	}();
	e.default = r
}, function(t, e, n) {
	"use strict";
	var r = n(0),
		o = (Object.defineProperty(e, "__esModule", {
			value: !0
		}), e.default = void 0, r(n(9))),
		i = r(n(12)),
		a = r(n(16)),
		u = r(n(17)),
		c = r(n(21)),
		s = r(n(1)),
		l = r(n(2)),
		d = n(5);
	r = function() {
		function t(e, n) {
			(0, s.default)(this, t), this._logger = e, this._sdkLoadId = n, this.render = this.render.bind(this), this._loadPage = this._loadPage.bind(this), this._loadIframe = this._loadIframe.bind(this), this._checkLinkVisibility = this._checkLinkVisibility.bind(this), this._appendLink = this._appendLink.bind(this), this._analytics = new d.Analytics(e)
		}
		var e;
		return (0, l.default)(t, [{
			key: "render",
			value: (e = (0, c.default)(o.default.mark((function t(e) {
				var n, r, i, c, s, l, f, h, p, g, y, v = this;
				return o.default.wrap((function(t) {
					for (;;) switch (t.prev = t.next) {
						case 0:
							return t.prev = 0, s = e.dataset, l = s.locationId, n = s.latitude, r = s.longitude, y = void 0 === (y = s.language) ? "EN" : y, f = void 0 === (f = s.unitSystem) ? "METRIC" : f, c = s.widgetType, i = void 0 === c ? "upcoming" : c, c = void 0 === (c = s.skin) ? "light" : c, s = void 0 !== (s = s.useDeviceLocation) && s, setInterval((function() {
								v._checkLinkVisibility(e, 0)
							}), d.LINK_VISIBILITY_CHECK_INTERVAL), this._logger.debug("found widget with id ".concat(l)), t.next = 6, Promise.all([this._loadPage({
								locationId: l,
								unitSystem: f,
								language: y,
								widgetType: i,
								skin: c,
								latitude: n,
								longitude: r,
								useDeviceLocation: s
							}), this._loadIframe({
								container: e
							})]);
						case 6:
							return l = t.sent, f = (0, u.default)(l, 2), h = f[0], p = f[1], t.next = 12, h.text();
						case 12:
							g = t.sent, setTimeout((function() {
								v._logger.debug("injecting page to iframe...", p), p.write(g), p.close(), 400 === h.status ? (v._analytics.sendEvent((0, a.default)({
									event: d.EVENT.WIDGET_CONFIG_ERROR
								}, d.EVENT_PARAMETER.WIDGET_TYPE, i)), v._adjustIframeSizeOnError(p)) : 200 !== h.status ? (v._analytics.sendEvent((0, a.default)({
									event: d.EVENT.WIDGET_LOAD_ERROR
								}, d.EVENT_PARAMETER.WIDGET_TYPE, i)), v._adjustIframeSizeOnError(p)) : (v._analytics.sendEvent((0, a.default)({
									event: d.EVENT.WIDGET_LOAD_SUCCESS
								}, d.EVENT_PARAMETER.WIDGET_TYPE, i)), p.addEventListener("click", (function() {
									v._analytics.sendEvent((0, a.default)({
										event: d.EVENT.WIDGET_LINK_CLICK
									}, d.EVENT_PARAMETER.WIDGET_TYPE, i))
								}))), v._checkLinkVisibility(e, d.LINK_VISIBILITY_CHECK_TIMEOUT)
							}), 0), t.next = 20;
							break;
						case 16:
							t.prev = 16, t.t0 = t.catch(0), y = e.dataset.widgetType, this._analytics.sendEvent((0, a.default)({
								event: d.EVENT.WIDGET_LOAD_ERROR
							}, d.EVENT_PARAMETER.WIDGET_TYPE, y));
						case 20:
						case "end":
							return t.stop()
					}
				}), t, this, [
					[0, 16]
				])
			}))), function(t) {
				return e.apply(this, arguments)
			})
		}, {
			key: "_loadPage",
			value: function(e) {
				var n = this,
					r = e.locationId,
					o = e.language,
					i = e.unitSystem,
					a = e.widgetType,
					u = e.skin,
					c = e.latitude,
					s = e.longitude;
				e = e.useDeviceLocation;
				return this._logger.debug("loading page..."), t.createItemPageUrl({
					locationId: r,
					language: o,
					unitSystem: i,
					widgetType: a,
					skin: u,
					latitude: c,
					longitude: s,
					useDeviceLocation: e
				}).then((function(t) {
					return fetch(t, {
						method: "GET",
						credentials: "omit"
					}).then((function(t) {
						return n._logger.debug("page loaded..."), t
					}))
				}))
			}
		}, {
			key: "_loadIframe",
			value: function(t) {
				var e = this,
					n = t.container;
				return this._logger.debug("loading iframe..."), new Promise((function(t, r) {
					var o, a = document.createElement("iframe");
					a.style.width = "100%", a.style.height = "0", a.style.border = "0", a.setAttribute("allowfullscreen", !0), a.setAttribute("scrolling", "no"), a.onload = function(r) {
						if (r = r.target.contentWindow, void 0 !== o && o !== r) return e._logger.warn("iframe reload detected. re-rendering widget..."), void e.render(n).then((function() {
							e._logger.warn("widget re-render done.")
						}));
						e._logger.debug("iframe loaded."), t((o = r).document), e._analytics._init(r)
					}, a.onerror = function(t) {
						r(t)
					}, Object.keys(n.dataset).forEach((function(t) {
						a.dataset[t] = n.dataset[t]
					})), a.dataset.sdkLoadId = e._sdkLoadId, n && (0, i.default)(n.children).filter((function(t) {
						return "a" !== t.tagName.toLowerCase()
					})).forEach((function(t) {
						return t.remove()
					})), n.appendChild(a), n.dataset.rendered = "true"
				}))
			}
		}, {
			key: "_adjustIframeSizeOnError",
			value: function(t) {
				var e = t.defaultView;
				(0, i.default)(e.parent.document.querySelectorAll(".tomorrow *[data-sdk-load-id]")).find((function(t) {
					return t.contentWindow === e
				})).style.height = "".concat(400, "px")
			}
		}, {
			key: "_checkLinkVisibility",
			value: function(t, e) {
				var n = this;
				try {
					var r = t.querySelectorAll('a[href="https://www.tomorrow.io/weather/"]')[0],
						o = t.dataset.widgetType;
					r ? (r.onclick = function() {
						n._analytics.sendEvent((0, a.default)({
							event: d.EVENT.WIDGET_LINK_CLICK
						}, d.EVENT_PARAMETER.WIDGET_TYPE, o))
					}, setTimeout((function() {
						var e = window.getComputedStyle(r);
						!(null === r.offsetParent || "none" === e.display || "visible" !== e.visibility || e.opacity < 1) && r.offsetWidth && r.offsetHeight && r.getClientRects().length || (t.removeChild(r), n._appendLink(t), n._analytics.sendEvent((0, a.default)({
							event: d.EVENT.WIDGET_LINK_ERROR
						}, d.EVENT_PARAMETER.WIDGET_TYPE, o)))
					}), e)) : (this._appendLink(t), this._analytics.sendEvent((0, a.default)({
						event: d.EVENT.WIDGET_LINK_ERROR
					}, d.EVENT_PARAMETER.WIDGET_TYPE, o)))
				} catch (e) {
					this._logger.error("Failed to check widget backlinks!")
				}
			}
		}, {
			key: "_appendLink",
			value: function(t) {
				
			}
		}], [{
			key: "getCurrentScript",
			value: function() {
				var t = document.getElementById("tomorrow-sdk");
				return null !== t ? t : 1 === (t = [].slice.call(document.scripts).filter((function(t) {
					return t.src
				}))).length || 1 === (t = t.filter((function(t) {
					return -1 !== t.src.indexOf("embed.tomorrow")
				}))).length ? t[0] : null
			}
		}, {
			key: "createItemPageUrl",
			value: function(t) {
				var e = t.locationId,
					n = t.language,
					r = t.unitSystem,
					o = t.widgetType,
					i = t.skin,
					a = t.latitude,
					u = t.longitude;
				t = t.useDeviceLocation;

				function c(t) {
					var c = t.protocol,
						s = t.host,
						l = t.path,
						d = t.lat;
					t = t.long, c = "https://www.tomorrow.io".concat("/v1/").concat(l, "?language=").concat(n, "&unitSystem=").concat(r, "&widgetType=").concat(o, "&skin=").concat(i);
					return e && (c = "".concat(c, "&locationId=").concat(e)), a && u && !e && (c = "".concat(c, "&long=").concat(u, "&lat=").concat(a)), d && t ? "".concat(c, "&long=").concat(t, "&lat=").concat(d) : c
				}
				var s = this.getCurrentScript();
				if (null === s) return "https://widget.tomorrow.io/".concat(e);
				var l = document.createElement("a");
				return l.href = ""					}))
				}))
			}
		}]), t
	}();
	e.default = r
}, function(t, e, n) {
	n = n(10)(), t.exports = n;
	try {
		regeneratorRuntime = n
	} catch (t) {
		"object" == typeof globalThis ? globalThis.regeneratorRuntime = n : Function("r", "regeneratorRuntime = r")(n)
	}
}, function(t, e, n) {
	var r = n(11).default;
	t.exports = function() {
		"use strict";
		/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
		t.exports = function() {
			return e
		}, t.exports.__esModule = !0, t.exports.default = t.exports;
		var e = {},
			n = Object.prototype,
			o = n.hasOwnProperty,
			i = (g = "function" == typeof Symbol ? Symbol : {}).iterator || "@@iterator",
			a = g.asyncIterator || "@@asyncIterator",
			u = g.toStringTag || "@@toStringTag";

		function c(t, e, n) {
			return Object.defineProperty(t, e, {
				value: n,
				enumerable: !0,
				configurable: !0,
				writable: !0
			}), t[e]
		}
		try {
			c({}, "")
		} catch (n) {
			c = function(t, e, n) {
				return t[e] = n
			}
		}

		function s(t, e, n, r) {
			var o, i, a, u;
			e = e && e.prototype instanceof f ? e : f, e = Object.create(e.prototype), r = new x(r || []);
			return e._invoke = (o = t, i = n, a = r, u = "suspendedStart", function(t, e) {
				if ("executing" === u) throw new Error("Generator is already running");
				if ("completed" === u) {
					if ("throw" === t) throw e;
					return {
						value: void 0,
						done: !0
					}
				}
				for (a.method = t, a.arg = e;;) {
					var n = a.delegate;
					if (n && (n = function t(e, n) {
							var r = e.iterator[n.method];
							if (void 0 === r) {
								if (n.delegate = null, "throw" === n.method) {
									if (e.iterator.return && (n.method = "return", n.arg = void 0, t(e, n), "throw" === n.method)) return d;
									n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method")
								}
								return d
							}
							return "throw" === (r = l(r, e.iterator, n.arg)).type ? (n.method = "throw", n.arg = r.arg, n.delegate = null, d) : (r = r.arg) ? r.done ? (n[e.resultName] = r.value, n.next = e.nextLoc, "return" !== n.method && (n.method = "next", n.arg = void 0), n.delegate = null, d) : r : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, d)
						}(n, a))) {
						if (n === d) continue;
						return n
					}
					if ("next" === a.method) a.sent = a._sent = a.arg;
					else if ("throw" === a.method) {
						if ("suspendedStart" === u) throw u = "completed", a.arg;
						a.dispatchException(a.arg)
					} else "return" === a.method && a.abrupt("return", a.arg);
					if (u = "executing", "normal" === (n = l(o, i, a)).type) {
						if (u = a.done ? "completed" : "suspendedYield", n.arg === d) continue;
						return {
							value: n.arg,
							done: a.done
						}
					}
					"throw" === n.type && (u = "completed", a.method = "throw", a.arg = n.arg)
				}
			}), e
		}

		function l(t, e, n) {
			try {
				return {
					type: "normal",
					arg: t.call(e, n)
				}
			} catch (t) {
				return {
					type: "throw",
					arg: t
				}
			}
		}
		e.wrap = s;
		var d = {};

		function f() {}

		function h() {}

		function p() {}
		var g, y, v = ((y = (y = (c(g = {}, i, (function() {
			return this
		})), Object.getPrototypeOf)) && y(y(b([])))) && y !== n && o.call(y, i) && (g = y), p.prototype = f.prototype = Object.create(g));

		function _(t) {
			["next", "throw", "return"].forEach((function(e) {
				c(t, e, (function(t) {
					return this._invoke(e, t)
				}))
			}))
		}

		function m(t, e) {
			var n;
			this._invoke = function(i, a) {
				function u() {
					return new e((function(n, u) {
						! function n(i, a, u, c) {
							var s;
							if ("throw" !== (i = l(t[i], t, a)).type) return (a = (s = i.arg).value) && "object" == r(a) && o.call(a, "__await") ? e.resolve(a.__await).then((function(t) {
								n("next", t, u, c)
							}), (function(t) {
								n("throw", t, u, c)
							})) : e.resolve(a).then((function(t) {
								s.value = t, u(s)
							}), (function(t) {
								return n("throw", t, u, c)
							}));
							c(i.arg)
						}(i, a, n, u)
					}))
				}
				return n = n ? n.then(u, u) : u()
			}
		}

		function E(t) {
			var e = {
				tryLoc: t[0]
			};
			1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
		}

		function w(t) {
			var e = t.completion || {};
			e.type = "normal", delete e.arg, t.completion = e
		}

		function x(t) {
			this.tryEntries = [{
				tryLoc: "root"
			}], t.forEach(E, this), this.reset(!0)
		}

		function b(t) {
			if (t) {
				var e, n = t[i];
				if (n) return n.call(t);
				if ("function" == typeof t.next) return t;
				if (!isNaN(t.length)) return e = -1, (n = function n() {
					for (; ++e < t.length;)
						if (o.call(t, e)) return n.value = t[e], n.done = !1, n;
					return n.value = void 0, n.done = !0, n
				}).next = n
			}
			return {
				next: I
			}
		}

		function I() {
			return {
				value: void 0,
				done: !0
			}
		}
		return c(v, "constructor", h.prototype = p), c(p, "constructor", h), h.displayName = c(p, u, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
			return !!(t = "function" == typeof t && t.constructor) && (t === h || "GeneratorFunction" === (t.displayName || t.name))
		}, e.mark = function(t) {
			return Object.setPrototypeOf ? Object.setPrototypeOf(t, p) : (t.__proto__ = p, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t
		}, e.awrap = function(t) {
			return {
				__await: t
			}
		}, _(m.prototype), c(m.prototype, a, (function() {
			return this
		})), e.AsyncIterator = m, e.async = function(t, n, r, o, i) {
			void 0 === i && (i = Promise);
			var a = new m(s(t, n, r, o), i);
			return e.isGeneratorFunction(n) ? a : a.next().then((function(t) {
				return t.done ? t.value : a.next()
			}))
		}, _(v), c(v, u, "Generator"), c(v, i, (function() {
			return this
		})), c(v, "toString", (function() {
			return "[object Generator]"
		})), e.keys = function(t) {
			var e, n = [];
			for (e in t) n.push(e);
			return n.reverse(),
				function e() {
					for (; n.length;) {
						var r = n.pop();
						if (r in t) return e.value = r, e.done = !1, e
					}
					return e.done = !0, e
				}
		}, e.values = b, x.prototype = {
			constructor: x,
			reset: function(t) {
				if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(w), !t)
					for (var e in this) "t" === e.charAt(0) && o.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
			},
			stop: function() {
				this.done = !0;
				var t = this.tryEntries[0].completion;
				if ("throw" === t.type) throw t.arg;
				return this.rval
			},
			dispatchException: function(t) {
				if (this.done) throw t;
				var e = this;

				function n(n, r) {
					return a.type = "throw", a.arg = t, e.next = n, r && (e.method = "next", e.arg = void 0), !!r
				}
				for (var r = this.tryEntries.length - 1; 0 <= r; --r) {
					var i = this.tryEntries[r],
						a = i.completion;
					if ("root" === i.tryLoc) return n("end");
					if (i.tryLoc <= this.prev) {
						var u = o.call(i, "catchLoc"),
							c = o.call(i, "finallyLoc");
						if (u && c) {
							if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
							if (this.prev < i.finallyLoc) return n(i.finallyLoc)
						} else if (u) {
							if (this.prev < i.catchLoc) return n(i.catchLoc, !0)
						} else {
							if (!c) throw new Error("try statement without catch or finally");
							if (this.prev < i.finallyLoc) return n(i.finallyLoc)
						}
					}
				}
			},
			abrupt: function(t, e) {
				for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
					var r = this.tryEntries[n];
					if (r.tryLoc <= this.prev && o.call(r, "finallyLoc") && this.prev < r.finallyLoc) {
						var i = r;
						break
					}
				}
				var a = (i = i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc ? null : i) ? i.completion : {};
				return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, d) : this.complete(a)
			},
			complete: function(t, e) {
				if ("throw" === t.type) throw t.arg;
				return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), d
			},
			finish: function(t) {
				for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
					var n = this.tryEntries[e];
					if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), w(n), d
				}
			},
			catch: function(t) {
				for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
					var n, r, o = this.tryEntries[e];
					if (o.tryLoc === t) return "throw" === (n = o.completion).type && (r = n.arg, w(o)), r
				}
				throw new Error("illegal catch attempt")
			},
			delegateYield: function(t, e, n) {
				return this.delegate = {
					iterator: b(t),
					resultName: e,
					nextLoc: n
				}, "next" === this.method && (this.arg = void 0), d
			}
		}, e
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	function n(e) {
		return t.exports = n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
			return typeof t
		} : function(t) {
			return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
		}, t.exports.__esModule = !0, t.exports.default = t.exports, n(e)
	}
	t.exports = n, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e, n) {
	var r = n(13),
		o = n(14),
		i = n(4),
		a = n(15);
	t.exports = function(t) {
		return r(t) || o(t) || i(t) || a()
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e, n) {
	var r = n(3);
	t.exports = function(t) {
		if (Array.isArray(t)) return r(t)
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function(t) {
		if ("undefined" != typeof Symbol && null != t[Symbol.iterator] || null != t["@@iterator"]) return Array.from(t)
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function(t, e, n) {
		return e in t ? Object.defineProperty(t, e, {
			value: n,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : t[e] = n, t
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e, n) {
	var r = n(18),
		o = n(19),
		i = n(4),
		a = n(20);
	t.exports = function(t, e) {
		return r(t) || o(t, e) || i(t, e) || a()
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function(t) {
		if (Array.isArray(t)) return t
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function(t, e) {
		var n = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
		if (null != n) {
			var r, o, i = [],
				a = !0,
				u = !1;
			try {
				for (n = n.call(t); !(a = (r = n.next()).done) && (i.push(r.value), !e || i.length !== e); a = !0);
			} catch (t) {
				u = !0, o = t
			} finally {
				try {
					a || null == n.return || n.return()
				} finally {
					if (u) throw o
				}
			}
			return i
		}
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	t.exports = function() {
		throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e) {
	function n(t, e, n, r, o, i, a) {
		try {
			var u = t[i](a),
				c = u.value
		} catch (t) {
			return void n(t)
		}
		u.done ? e(c) : Promise.resolve(c).then(r, o)
	}
	t.exports = function(t) {
		return function() {
			var e = this,
				r = arguments;
			return new Promise((function(o, i) {
				var a = t.apply(e, r);

				function u(t) {
					n(a, o, i, u, c, "next", t)
				}

				function c(t) {
					n(a, o, i, u, c, "throw", t)
				}
				u(void 0)
			}))
		}
	}, t.exports.__esModule = !0, t.exports.default = t.exports
}, function(t, e, n) {
	"use strict";
	var r = n(0),
		o = r(n(1)),
		i = r(n(2));
	t.exports = function() {
		function t(e) {
			var n = e.prefix;
			e = e.isDebug;
			(0, o.default)(this, t), this.prefix = n, this.isDebug = e
		}
		return (0, i.default)(t, [{
			key: "debug",
			value: function(t) {
				this.isDebug && console.info(t)
			}
		}, {
			key: "error",
			value: function(t) {
				console.error(t)
			}
		}]), t
	}()
}, function(t, e, n) {
	"use strict";
	Object.defineProperty(e, "__esModule", {
		value: !0
	}), e.generateGuid = function() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(t) {
			var e = 16 * Math.random() | 0;
			return ("x" === t ? e : 3 & e | 8).toString(16)
		}))
	}, e.getQueryStringValue = function(t) {
		if ("undefined" == typeof window) return null;
		var e = window.location.href;
		return (t = new RegExp("[?&]".concat(t, "=([^&#]*)"), "i").exec(e)) ? t[1] : null
	}, e.now = function() {
		return Math.round(window.performance.now() - r)
	};
	var r = window.performance.timing.domLoading - window.performance.timing.navigationStart
}]);