/*! For license information please see 533.617868e8.js.LICENSE.txt */
(self.webpackChunkpython_webpack_boilerplate =
  self.webpackChunkpython_webpack_boilerplate || []).push([
  [533],
  {
    899: function (e, t, n) {
      "use strict";
      function i(e) {
        return e
          .keys()
          .map((t) =>
            (function (e, t) {
              const n = (function (e) {
                const t = (e.match(/^(?:\.\/)?(.+)(?:[_-]controller\..+?)$/) ||
                  [])[1];
                if (t) return t.replace(/_/g, "-").replace(/\//g, "--");
              })(t);
              if (n)
                return (function (e, t) {
                  const n = e.default;
                  if ("function" == typeof n)
                    return { identifier: t, controllerConstructor: n };
                })(e(t), n);
            })(e, t),
          )
          .filter((e) => e);
      }
      n.d(t, {
        Ux: function () {
          return i;
        },
      });
    },
    891: function (e, t, n) {
      "use strict";
      n.d(t, {
        lg: function () {
          return Q;
        },
        xI: function () {
          return re;
        },
      });
      class i {
        constructor(e, t, n) {
          (this.eventTarget = e),
            (this.eventName = t),
            (this.eventOptions = n),
            (this.unorderedBindings = new Set());
        }
        connect() {
          this.eventTarget.addEventListener(
            this.eventName,
            this,
            this.eventOptions,
          );
        }
        disconnect() {
          this.eventTarget.removeEventListener(
            this.eventName,
            this,
            this.eventOptions,
          );
        }
        bindingConnected(e) {
          this.unorderedBindings.add(e);
        }
        bindingDisconnected(e) {
          this.unorderedBindings.delete(e);
        }
        handleEvent(e) {
          const t = (function (e) {
            if ("immediatePropagationStopped" in e) return e;
            {
              const { stopImmediatePropagation: t } = e;
              return Object.assign(e, {
                immediatePropagationStopped: !1,
                stopImmediatePropagation() {
                  (this.immediatePropagationStopped = !0), t.call(this);
                },
              });
            }
          })(e);
          for (const e of this.bindings) {
            if (t.immediatePropagationStopped) break;
            e.handleEvent(t);
          }
        }
        hasBindings() {
          return this.unorderedBindings.size > 0;
        }
        get bindings() {
          return Array.from(this.unorderedBindings).sort((e, t) => {
            const n = e.index,
              i = t.index;
            return n < i ? -1 : n > i ? 1 : 0;
          });
        }
      }
      class r {
        constructor(e) {
          (this.application = e),
            (this.eventListenerMaps = new Map()),
            (this.started = !1);
        }
        start() {
          this.started ||
            ((this.started = !0),
            this.eventListeners.forEach((e) => e.connect()));
        }
        stop() {
          this.started &&
            ((this.started = !1),
            this.eventListeners.forEach((e) => e.disconnect()));
        }
        get eventListeners() {
          return Array.from(this.eventListenerMaps.values()).reduce(
            (e, t) => e.concat(Array.from(t.values())),
            [],
          );
        }
        bindingConnected(e) {
          this.fetchEventListenerForBinding(e).bindingConnected(e);
        }
        bindingDisconnected(e, t = !1) {
          this.fetchEventListenerForBinding(e).bindingDisconnected(e),
            t && this.clearEventListenersForBinding(e);
        }
        handleError(e, t, n = {}) {
          this.application.handleError(e, `Error ${t}`, n);
        }
        clearEventListenersForBinding(e) {
          const t = this.fetchEventListenerForBinding(e);
          t.hasBindings() ||
            (t.disconnect(), this.removeMappedEventListenerFor(e));
        }
        removeMappedEventListenerFor(e) {
          const { eventTarget: t, eventName: n, eventOptions: i } = e,
            r = this.fetchEventListenerMapForEventTarget(t),
            s = this.cacheKey(n, i);
          r.delete(s), 0 == r.size && this.eventListenerMaps.delete(t);
        }
        fetchEventListenerForBinding(e) {
          const { eventTarget: t, eventName: n, eventOptions: i } = e;
          return this.fetchEventListener(t, n, i);
        }
        fetchEventListener(e, t, n) {
          const i = this.fetchEventListenerMapForEventTarget(e),
            r = this.cacheKey(t, n);
          let s = i.get(r);
          return s || ((s = this.createEventListener(e, t, n)), i.set(r, s)), s;
        }
        createEventListener(e, t, n) {
          const r = new i(e, t, n);
          return this.started && r.connect(), r;
        }
        fetchEventListenerMapForEventTarget(e) {
          let t = this.eventListenerMaps.get(e);
          return t || ((t = new Map()), this.eventListenerMaps.set(e, t)), t;
        }
        cacheKey(e, t) {
          const n = [e];
          return (
            Object.keys(t)
              .sort()
              .forEach((e) => {
                n.push(`${t[e] ? "" : "!"}${e}`);
              }),
            n.join(":")
          );
        }
      }
      const s = {
          stop({ event: e, value: t }) {
            return t && e.stopPropagation(), !0;
          },
          prevent({ event: e, value: t }) {
            return t && e.preventDefault(), !0;
          },
          self({ event: e, value: t, element: n }) {
            return !t || n === e.target;
          },
        },
        o =
          /^(?:(?:([^.]+?)\+)?(.+?)(?:\.(.+?))?(?:@(window|document))?->)?(.+?)(?:#([^:]+?))(?::(.+))?$/;
      function a(e) {
        return e.replace(/(?:[_-])([a-z0-9])/g, (e, t) => t.toUpperCase());
      }
      function l(e) {
        return a(e.replace(/--/g, "-").replace(/__/g, "_"));
      }
      function c(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }
      function u(e) {
        return e.replace(/([A-Z])/g, (e, t) => `-${t.toLowerCase()}`);
      }
      function h(e) {
        return null != e;
      }
      function d(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }
      const f = ["meta", "ctrl", "alt", "shift"];
      class p {
        constructor(e, t, n, i) {
          (this.element = e),
            (this.index = t),
            (this.eventTarget = n.eventTarget || e),
            (this.eventName =
              n.eventName ||
              (function (e) {
                const t = e.tagName.toLowerCase();
                if (t in g) return g[t](e);
              })(e) ||
              m("missing event name")),
            (this.eventOptions = n.eventOptions || {}),
            (this.identifier = n.identifier || m("missing identifier")),
            (this.methodName = n.methodName || m("missing method name")),
            (this.keyFilter = n.keyFilter || ""),
            (this.schema = i);
        }
        static forToken(e, t) {
          return new this(
            e.element,
            e.index,
            (function (e) {
              const t = e.trim().match(o) || [];
              let n = t[2],
                i = t[3];
              return (
                i &&
                  !["keydown", "keyup", "keypress"].includes(n) &&
                  ((n += `.${i}`), (i = "")),
                {
                  eventTarget:
                    ((r = t[4]),
                    "window" == r
                      ? window
                      : "document" == r
                      ? document
                      : void 0),
                  eventName: n,
                  eventOptions: t[7]
                    ? ((s = t[7]),
                      s.split(":").reduce(
                        (e, t) =>
                          Object.assign(e, {
                            [t.replace(/^!/, "")]: !/^!/.test(t),
                          }),
                        {},
                      ))
                    : {},
                  identifier: t[5],
                  methodName: t[6],
                  keyFilter: t[1] || i,
                }
              );
              var r, s;
            })(e.content),
            t,
          );
        }
        toString() {
          const e = this.keyFilter ? `.${this.keyFilter}` : "",
            t = this.eventTargetName ? `@${this.eventTargetName}` : "";
          return `${this.eventName}${e}${t}->${this.identifier}#${this.methodName}`;
        }
        shouldIgnoreKeyboardEvent(e) {
          if (!this.keyFilter) return !1;
          const t = this.keyFilter.split("+");
          if (this.keyFilterDissatisfied(e, t)) return !0;
          const n = t.filter((e) => !f.includes(e))[0];
          return (
            !!n &&
            (d(this.keyMappings, n) ||
              m(`contains unknown key filter: ${this.keyFilter}`),
            this.keyMappings[n].toLowerCase() !== e.key.toLowerCase())
          );
        }
        shouldIgnoreMouseEvent(e) {
          if (!this.keyFilter) return !1;
          const t = [this.keyFilter];
          return !!this.keyFilterDissatisfied(e, t);
        }
        get params() {
          const e = {},
            t = new RegExp(`^data-${this.identifier}-(.+)-param$`, "i");
          for (const { name: n, value: i } of Array.from(
            this.element.attributes,
          )) {
            const r = n.match(t),
              s = r && r[1];
            s && (e[a(s)] = v(i));
          }
          return e;
        }
        get eventTargetName() {
          return (e = this.eventTarget) == window
            ? "window"
            : e == document
            ? "document"
            : void 0;
          var e;
        }
        get keyMappings() {
          return this.schema.keyMappings;
        }
        keyFilterDissatisfied(e, t) {
          const [n, i, r, s] = f.map((e) => t.includes(e));
          return (
            e.metaKey !== n ||
            e.ctrlKey !== i ||
            e.altKey !== r ||
            e.shiftKey !== s
          );
        }
      }
      const g = {
        a: () => "click",
        button: () => "click",
        form: () => "submit",
        details: () => "toggle",
        input: (e) => ("submit" == e.getAttribute("type") ? "click" : "input"),
        select: () => "change",
        textarea: () => "input",
      };
      function m(e) {
        throw new Error(e);
      }
      function v(e) {
        try {
          return JSON.parse(e);
        } catch (t) {
          return e;
        }
      }
      class _ {
        constructor(e, t) {
          (this.context = e), (this.action = t);
        }
        get index() {
          return this.action.index;
        }
        get eventTarget() {
          return this.action.eventTarget;
        }
        get eventOptions() {
          return this.action.eventOptions;
        }
        get identifier() {
          return this.context.identifier;
        }
        handleEvent(e) {
          const t = this.prepareActionEvent(e);
          this.willBeInvokedByEvent(e) &&
            this.applyEventModifiers(t) &&
            this.invokeWithEvent(t);
        }
        get eventName() {
          return this.action.eventName;
        }
        get method() {
          const e = this.controller[this.methodName];
          if ("function" == typeof e) return e;
          throw new Error(
            `Action "${this.action}" references undefined method "${this.methodName}"`,
          );
        }
        applyEventModifiers(e) {
          const { element: t } = this.action,
            { actionDescriptorFilters: n } = this.context.application,
            { controller: i } = this.context;
          let r = !0;
          for (const [s, o] of Object.entries(this.eventOptions))
            if (s in n) {
              const a = n[s];
              r =
                r &&
                a({ name: s, value: o, event: e, element: t, controller: i });
            }
          return r;
        }
        prepareActionEvent(e) {
          return Object.assign(e, { params: this.action.params });
        }
        invokeWithEvent(e) {
          const { target: t, currentTarget: n } = e;
          try {
            this.method.call(this.controller, e),
              this.context.logDebugActivity(this.methodName, {
                event: e,
                target: t,
                currentTarget: n,
                action: this.methodName,
              });
          } catch (t) {
            const { identifier: n, controller: i, element: r, index: s } = this,
              o = {
                identifier: n,
                controller: i,
                element: r,
                index: s,
                event: e,
              };
            this.context.handleError(t, `invoking action "${this.action}"`, o);
          }
        }
        willBeInvokedByEvent(e) {
          const t = e.target;
          return (
            !(
              e instanceof KeyboardEvent &&
              this.action.shouldIgnoreKeyboardEvent(e)
            ) &&
            !(
              e instanceof MouseEvent && this.action.shouldIgnoreMouseEvent(e)
            ) &&
            (this.element === t ||
              (t instanceof Element && this.element.contains(t)
                ? this.scope.containsElement(t)
                : this.scope.containsElement(this.action.element)))
          );
        }
        get controller() {
          return this.context.controller;
        }
        get methodName() {
          return this.action.methodName;
        }
        get element() {
          return this.scope.element;
        }
        get scope() {
          return this.context.scope;
        }
      }
      class b {
        constructor(e, t) {
          (this.mutationObserverInit = {
            attributes: !0,
            childList: !0,
            subtree: !0,
          }),
            (this.element = e),
            (this.started = !1),
            (this.delegate = t),
            (this.elements = new Set()),
            (this.mutationObserver = new MutationObserver((e) =>
              this.processMutations(e),
            ));
        }
        start() {
          this.started ||
            ((this.started = !0),
            this.mutationObserver.observe(
              this.element,
              this.mutationObserverInit,
            ),
            this.refresh());
        }
        pause(e) {
          this.started &&
            (this.mutationObserver.disconnect(), (this.started = !1)),
            e(),
            this.started ||
              (this.mutationObserver.observe(
                this.element,
                this.mutationObserverInit,
              ),
              (this.started = !0));
        }
        stop() {
          this.started &&
            (this.mutationObserver.takeRecords(),
            this.mutationObserver.disconnect(),
            (this.started = !1));
        }
        refresh() {
          if (this.started) {
            const e = new Set(this.matchElementsInTree());
            for (const t of Array.from(this.elements))
              e.has(t) || this.removeElement(t);
            for (const t of Array.from(e)) this.addElement(t);
          }
        }
        processMutations(e) {
          if (this.started) for (const t of e) this.processMutation(t);
        }
        processMutation(e) {
          "attributes" == e.type
            ? this.processAttributeChange(e.target, e.attributeName)
            : "childList" == e.type &&
              (this.processRemovedNodes(e.removedNodes),
              this.processAddedNodes(e.addedNodes));
        }
        processAttributeChange(e, t) {
          this.elements.has(e)
            ? this.delegate.elementAttributeChanged && this.matchElement(e)
              ? this.delegate.elementAttributeChanged(e, t)
              : this.removeElement(e)
            : this.matchElement(e) && this.addElement(e);
        }
        processRemovedNodes(e) {
          for (const t of Array.from(e)) {
            const e = this.elementFromNode(t);
            e && this.processTree(e, this.removeElement);
          }
        }
        processAddedNodes(e) {
          for (const t of Array.from(e)) {
            const e = this.elementFromNode(t);
            e &&
              this.elementIsActive(e) &&
              this.processTree(e, this.addElement);
          }
        }
        matchElement(e) {
          return this.delegate.matchElement(e);
        }
        matchElementsInTree(e = this.element) {
          return this.delegate.matchElementsInTree(e);
        }
        processTree(e, t) {
          for (const n of this.matchElementsInTree(e)) t.call(this, n);
        }
        elementFromNode(e) {
          if (e.nodeType == Node.ELEMENT_NODE) return e;
        }
        elementIsActive(e) {
          return (
            e.isConnected == this.element.isConnected &&
            this.element.contains(e)
          );
        }
        addElement(e) {
          this.elements.has(e) ||
            (this.elementIsActive(e) &&
              (this.elements.add(e),
              this.delegate.elementMatched && this.delegate.elementMatched(e)));
        }
        removeElement(e) {
          this.elements.has(e) &&
            (this.elements.delete(e),
            this.delegate.elementUnmatched &&
              this.delegate.elementUnmatched(e));
        }
      }
      class y {
        constructor(e, t, n) {
          (this.attributeName = t),
            (this.delegate = n),
            (this.elementObserver = new b(e, this));
        }
        get element() {
          return this.elementObserver.element;
        }
        get selector() {
          return `[${this.attributeName}]`;
        }
        start() {
          this.elementObserver.start();
        }
        pause(e) {
          this.elementObserver.pause(e);
        }
        stop() {
          this.elementObserver.stop();
        }
        refresh() {
          this.elementObserver.refresh();
        }
        get started() {
          return this.elementObserver.started;
        }
        matchElement(e) {
          return e.hasAttribute(this.attributeName);
        }
        matchElementsInTree(e) {
          const t = this.matchElement(e) ? [e] : [],
            n = Array.from(e.querySelectorAll(this.selector));
          return t.concat(n);
        }
        elementMatched(e) {
          this.delegate.elementMatchedAttribute &&
            this.delegate.elementMatchedAttribute(e, this.attributeName);
        }
        elementUnmatched(e) {
          this.delegate.elementUnmatchedAttribute &&
            this.delegate.elementUnmatchedAttribute(e, this.attributeName);
        }
        elementAttributeChanged(e, t) {
          this.delegate.elementAttributeValueChanged &&
            this.attributeName == t &&
            this.delegate.elementAttributeValueChanged(e, t);
        }
      }
      function w(e, t) {
        let n = e.get(t);
        return n || ((n = new Set()), e.set(t, n)), n;
      }
      class E {
        constructor() {
          this.valuesByKey = new Map();
        }
        get keys() {
          return Array.from(this.valuesByKey.keys());
        }
        get values() {
          return Array.from(this.valuesByKey.values()).reduce(
            (e, t) => e.concat(Array.from(t)),
            [],
          );
        }
        get size() {
          return Array.from(this.valuesByKey.values()).reduce(
            (e, t) => e + t.size,
            0,
          );
        }
        add(e, t) {
          !(function (e, t, n) {
            w(e, t).add(n);
          })(this.valuesByKey, e, t);
        }
        delete(e, t) {
          !(function (e, t, n) {
            w(e, t).delete(n),
              (function (e, t) {
                const n = e.get(t);
                null != n && 0 == n.size && e.delete(t);
              })(e, t);
          })(this.valuesByKey, e, t);
        }
        has(e, t) {
          const n = this.valuesByKey.get(e);
          return null != n && n.has(t);
        }
        hasKey(e) {
          return this.valuesByKey.has(e);
        }
        hasValue(e) {
          return Array.from(this.valuesByKey.values()).some((t) => t.has(e));
        }
        getValuesForKey(e) {
          const t = this.valuesByKey.get(e);
          return t ? Array.from(t) : [];
        }
        getKeysForValue(e) {
          return Array.from(this.valuesByKey)
            .filter(([t, n]) => n.has(e))
            .map(([e, t]) => e);
        }
      }
      class A {
        constructor(e, t, n, i) {
          (this._selector = t),
            (this.details = i),
            (this.elementObserver = new b(e, this)),
            (this.delegate = n),
            (this.matchesByElement = new E());
        }
        get started() {
          return this.elementObserver.started;
        }
        get selector() {
          return this._selector;
        }
        set selector(e) {
          (this._selector = e), this.refresh();
        }
        start() {
          this.elementObserver.start();
        }
        pause(e) {
          this.elementObserver.pause(e);
        }
        stop() {
          this.elementObserver.stop();
        }
        refresh() {
          this.elementObserver.refresh();
        }
        get element() {
          return this.elementObserver.element;
        }
        matchElement(e) {
          const { selector: t } = this;
          if (t) {
            const n = e.matches(t);
            return this.delegate.selectorMatchElement
              ? n && this.delegate.selectorMatchElement(e, this.details)
              : n;
          }
          return !1;
        }
        matchElementsInTree(e) {
          const { selector: t } = this;
          if (t) {
            const n = this.matchElement(e) ? [e] : [],
              i = Array.from(e.querySelectorAll(t)).filter((e) =>
                this.matchElement(e),
              );
            return n.concat(i);
          }
          return [];
        }
        elementMatched(e) {
          const { selector: t } = this;
          t && this.selectorMatched(e, t);
        }
        elementUnmatched(e) {
          const t = this.matchesByElement.getKeysForValue(e);
          for (const n of t) this.selectorUnmatched(e, n);
        }
        elementAttributeChanged(e, t) {
          const { selector: n } = this;
          if (n) {
            const t = this.matchElement(e),
              i = this.matchesByElement.has(n, e);
            t && !i
              ? this.selectorMatched(e, n)
              : !t && i && this.selectorUnmatched(e, n);
          }
        }
        selectorMatched(e, t) {
          this.delegate.selectorMatched(e, t, this.details),
            this.matchesByElement.add(t, e);
        }
        selectorUnmatched(e, t) {
          this.delegate.selectorUnmatched(e, t, this.details),
            this.matchesByElement.delete(t, e);
        }
      }
      class O {
        constructor(e, t) {
          (this.element = e),
            (this.delegate = t),
            (this.started = !1),
            (this.stringMap = new Map()),
            (this.mutationObserver = new MutationObserver((e) =>
              this.processMutations(e),
            ));
        }
        start() {
          this.started ||
            ((this.started = !0),
            this.mutationObserver.observe(this.element, {
              attributes: !0,
              attributeOldValue: !0,
            }),
            this.refresh());
        }
        stop() {
          this.started &&
            (this.mutationObserver.takeRecords(),
            this.mutationObserver.disconnect(),
            (this.started = !1));
        }
        refresh() {
          if (this.started)
            for (const e of this.knownAttributeNames)
              this.refreshAttribute(e, null);
        }
        processMutations(e) {
          if (this.started) for (const t of e) this.processMutation(t);
        }
        processMutation(e) {
          const t = e.attributeName;
          t && this.refreshAttribute(t, e.oldValue);
        }
        refreshAttribute(e, t) {
          const n = this.delegate.getStringMapKeyForAttribute(e);
          if (null != n) {
            this.stringMap.has(e) || this.stringMapKeyAdded(n, e);
            const i = this.element.getAttribute(e);
            if (
              (this.stringMap.get(e) != i &&
                this.stringMapValueChanged(i, n, t),
              null == i)
            ) {
              const t = this.stringMap.get(e);
              this.stringMap.delete(e), t && this.stringMapKeyRemoved(n, e, t);
            } else this.stringMap.set(e, i);
          }
        }
        stringMapKeyAdded(e, t) {
          this.delegate.stringMapKeyAdded &&
            this.delegate.stringMapKeyAdded(e, t);
        }
        stringMapValueChanged(e, t, n) {
          this.delegate.stringMapValueChanged &&
            this.delegate.stringMapValueChanged(e, t, n);
        }
        stringMapKeyRemoved(e, t, n) {
          this.delegate.stringMapKeyRemoved &&
            this.delegate.stringMapKeyRemoved(e, t, n);
        }
        get knownAttributeNames() {
          return Array.from(
            new Set(
              this.currentAttributeNames.concat(this.recordedAttributeNames),
            ),
          );
        }
        get currentAttributeNames() {
          return Array.from(this.element.attributes).map((e) => e.name);
        }
        get recordedAttributeNames() {
          return Array.from(this.stringMap.keys());
        }
      }
      class x {
        constructor(e, t, n) {
          (this.attributeObserver = new y(e, t, this)),
            (this.delegate = n),
            (this.tokensByElement = new E());
        }
        get started() {
          return this.attributeObserver.started;
        }
        start() {
          this.attributeObserver.start();
        }
        pause(e) {
          this.attributeObserver.pause(e);
        }
        stop() {
          this.attributeObserver.stop();
        }
        refresh() {
          this.attributeObserver.refresh();
        }
        get element() {
          return this.attributeObserver.element;
        }
        get attributeName() {
          return this.attributeObserver.attributeName;
        }
        elementMatchedAttribute(e) {
          this.tokensMatched(this.readTokensForElement(e));
        }
        elementAttributeValueChanged(e) {
          const [t, n] = this.refreshTokensForElement(e);
          this.tokensUnmatched(t), this.tokensMatched(n);
        }
        elementUnmatchedAttribute(e) {
          this.tokensUnmatched(this.tokensByElement.getValuesForKey(e));
        }
        tokensMatched(e) {
          e.forEach((e) => this.tokenMatched(e));
        }
        tokensUnmatched(e) {
          e.forEach((e) => this.tokenUnmatched(e));
        }
        tokenMatched(e) {
          this.delegate.tokenMatched(e), this.tokensByElement.add(e.element, e);
        }
        tokenUnmatched(e) {
          this.delegate.tokenUnmatched(e),
            this.tokensByElement.delete(e.element, e);
        }
        refreshTokensForElement(e) {
          const t = this.tokensByElement.getValuesForKey(e),
            n = this.readTokensForElement(e),
            i = (function (e, t) {
              const n = Math.max(e.length, t.length);
              return Array.from({ length: n }, (n, i) => [e[i], t[i]]);
            })(t, n).findIndex(([e, t]) => {
              return (
                (i = t),
                !((n = e) && i && n.index == i.index && n.content == i.content)
              );
              var n, i;
            });
          return -1 == i ? [[], []] : [t.slice(i), n.slice(i)];
        }
        readTokensForElement(e) {
          const t = this.attributeName;
          return (function (e, t, n) {
            return e
              .trim()
              .split(/\s+/)
              .filter((e) => e.length)
              .map((e, i) => ({
                element: t,
                attributeName: n,
                content: e,
                index: i,
              }));
          })(e.getAttribute(t) || "", e, t);
        }
      }
      class C {
        constructor(e, t, n) {
          (this.tokenListObserver = new x(e, t, this)),
            (this.delegate = n),
            (this.parseResultsByToken = new WeakMap()),
            (this.valuesByTokenByElement = new WeakMap());
        }
        get started() {
          return this.tokenListObserver.started;
        }
        start() {
          this.tokenListObserver.start();
        }
        stop() {
          this.tokenListObserver.stop();
        }
        refresh() {
          this.tokenListObserver.refresh();
        }
        get element() {
          return this.tokenListObserver.element;
        }
        get attributeName() {
          return this.tokenListObserver.attributeName;
        }
        tokenMatched(e) {
          const { element: t } = e,
            { value: n } = this.fetchParseResultForToken(e);
          n &&
            (this.fetchValuesByTokenForElement(t).set(e, n),
            this.delegate.elementMatchedValue(t, n));
        }
        tokenUnmatched(e) {
          const { element: t } = e,
            { value: n } = this.fetchParseResultForToken(e);
          n &&
            (this.fetchValuesByTokenForElement(t).delete(e),
            this.delegate.elementUnmatchedValue(t, n));
        }
        fetchParseResultForToken(e) {
          let t = this.parseResultsByToken.get(e);
          return (
            t || ((t = this.parseToken(e)), this.parseResultsByToken.set(e, t)),
            t
          );
        }
        fetchValuesByTokenForElement(e) {
          let t = this.valuesByTokenByElement.get(e);
          return (
            t || ((t = new Map()), this.valuesByTokenByElement.set(e, t)), t
          );
        }
        parseToken(e) {
          try {
            return { value: this.delegate.parseValueForToken(e) };
          } catch (e) {
            return { error: e };
          }
        }
      }
      class T {
        constructor(e, t) {
          (this.context = e),
            (this.delegate = t),
            (this.bindingsByAction = new Map());
        }
        start() {
          this.valueListObserver ||
            ((this.valueListObserver = new C(
              this.element,
              this.actionAttribute,
              this,
            )),
            this.valueListObserver.start());
        }
        stop() {
          this.valueListObserver &&
            (this.valueListObserver.stop(),
            delete this.valueListObserver,
            this.disconnectAllActions());
        }
        get element() {
          return this.context.element;
        }
        get identifier() {
          return this.context.identifier;
        }
        get actionAttribute() {
          return this.schema.actionAttribute;
        }
        get schema() {
          return this.context.schema;
        }
        get bindings() {
          return Array.from(this.bindingsByAction.values());
        }
        connectAction(e) {
          const t = new _(this.context, e);
          this.bindingsByAction.set(e, t), this.delegate.bindingConnected(t);
        }
        disconnectAction(e) {
          const t = this.bindingsByAction.get(e);
          t &&
            (this.bindingsByAction.delete(e),
            this.delegate.bindingDisconnected(t));
        }
        disconnectAllActions() {
          this.bindings.forEach((e) =>
            this.delegate.bindingDisconnected(e, !0),
          ),
            this.bindingsByAction.clear();
        }
        parseValueForToken(e) {
          const t = p.forToken(e, this.schema);
          if (t.identifier == this.identifier) return t;
        }
        elementMatchedValue(e, t) {
          this.connectAction(t);
        }
        elementUnmatchedValue(e, t) {
          this.disconnectAction(t);
        }
      }
      class S {
        constructor(e, t) {
          (this.context = e),
            (this.receiver = t),
            (this.stringMapObserver = new O(this.element, this)),
            (this.valueDescriptorMap = this.controller.valueDescriptorMap);
        }
        start() {
          this.stringMapObserver.start(),
            this.invokeChangedCallbacksForDefaultValues();
        }
        stop() {
          this.stringMapObserver.stop();
        }
        get element() {
          return this.context.element;
        }
        get controller() {
          return this.context.controller;
        }
        getStringMapKeyForAttribute(e) {
          if (e in this.valueDescriptorMap)
            return this.valueDescriptorMap[e].name;
        }
        stringMapKeyAdded(e, t) {
          const n = this.valueDescriptorMap[t];
          this.hasValue(e) ||
            this.invokeChangedCallback(
              e,
              n.writer(this.receiver[e]),
              n.writer(n.defaultValue),
            );
        }
        stringMapValueChanged(e, t, n) {
          const i = this.valueDescriptorNameMap[t];
          null !== e &&
            (null === n && (n = i.writer(i.defaultValue)),
            this.invokeChangedCallback(t, e, n));
        }
        stringMapKeyRemoved(e, t, n) {
          const i = this.valueDescriptorNameMap[e];
          this.hasValue(e)
            ? this.invokeChangedCallback(e, i.writer(this.receiver[e]), n)
            : this.invokeChangedCallback(e, i.writer(i.defaultValue), n);
        }
        invokeChangedCallbacksForDefaultValues() {
          for (const { key: e, name: t, defaultValue: n, writer: i } of this
            .valueDescriptors)
            null == n ||
              this.controller.data.has(e) ||
              this.invokeChangedCallback(t, i(n), void 0);
        }
        invokeChangedCallback(e, t, n) {
          const i = `${e}Changed`,
            r = this.receiver[i];
          if ("function" == typeof r) {
            const i = this.valueDescriptorNameMap[e];
            try {
              const e = i.reader(t);
              let s = n;
              n && (s = i.reader(n)), r.call(this.receiver, e, s);
            } catch (e) {
              throw (
                (e instanceof TypeError &&
                  (e.message = `Stimulus Value "${this.context.identifier}.${i.name}" - ${e.message}`),
                e)
              );
            }
          }
        }
        get valueDescriptors() {
          const { valueDescriptorMap: e } = this;
          return Object.keys(e).map((t) => e[t]);
        }
        get valueDescriptorNameMap() {
          const e = {};
          return (
            Object.keys(this.valueDescriptorMap).forEach((t) => {
              const n = this.valueDescriptorMap[t];
              e[n.name] = n;
            }),
            e
          );
        }
        hasValue(e) {
          const t = `has${c(this.valueDescriptorNameMap[e].name)}`;
          return this.receiver[t];
        }
      }
      class k {
        constructor(e, t) {
          (this.context = e),
            (this.delegate = t),
            (this.targetsByName = new E());
        }
        start() {
          this.tokenListObserver ||
            ((this.tokenListObserver = new x(
              this.element,
              this.attributeName,
              this,
            )),
            this.tokenListObserver.start());
        }
        stop() {
          this.tokenListObserver &&
            (this.disconnectAllTargets(),
            this.tokenListObserver.stop(),
            delete this.tokenListObserver);
        }
        tokenMatched({ element: e, content: t }) {
          this.scope.containsElement(e) && this.connectTarget(e, t);
        }
        tokenUnmatched({ element: e, content: t }) {
          this.disconnectTarget(e, t);
        }
        connectTarget(e, t) {
          var n;
          this.targetsByName.has(t, e) ||
            (this.targetsByName.add(t, e),
            null === (n = this.tokenListObserver) ||
              void 0 === n ||
              n.pause(() => this.delegate.targetConnected(e, t)));
        }
        disconnectTarget(e, t) {
          var n;
          this.targetsByName.has(t, e) &&
            (this.targetsByName.delete(t, e),
            null === (n = this.tokenListObserver) ||
              void 0 === n ||
              n.pause(() => this.delegate.targetDisconnected(e, t)));
        }
        disconnectAllTargets() {
          for (const e of this.targetsByName.keys)
            for (const t of this.targetsByName.getValuesForKey(e))
              this.disconnectTarget(t, e);
        }
        get attributeName() {
          return `data-${this.context.identifier}-target`;
        }
        get element() {
          return this.context.element;
        }
        get scope() {
          return this.context.scope;
        }
      }
      function N(e, t) {
        const n = L(e);
        return Array.from(
          n.reduce(
            (e, n) => (
              (function (e, t) {
                const n = e[t];
                return Array.isArray(n) ? n : [];
              })(n, t).forEach((t) => e.add(t)),
              e
            ),
            new Set(),
          ),
        );
      }
      function L(e) {
        const t = [];
        for (; e; ) t.push(e), (e = Object.getPrototypeOf(e));
        return t.reverse();
      }
      class D {
        constructor(e, t) {
          (this.started = !1),
            (this.context = e),
            (this.delegate = t),
            (this.outletsByName = new E()),
            (this.outletElementsByName = new E()),
            (this.selectorObserverMap = new Map()),
            (this.attributeObserverMap = new Map());
        }
        start() {
          this.started ||
            (this.outletDefinitions.forEach((e) => {
              this.setupSelectorObserverForOutlet(e),
                this.setupAttributeObserverForOutlet(e);
            }),
            (this.started = !0),
            this.dependentContexts.forEach((e) => e.refresh()));
        }
        refresh() {
          this.selectorObserverMap.forEach((e) => e.refresh()),
            this.attributeObserverMap.forEach((e) => e.refresh());
        }
        stop() {
          this.started &&
            ((this.started = !1),
            this.disconnectAllOutlets(),
            this.stopSelectorObservers(),
            this.stopAttributeObservers());
        }
        stopSelectorObservers() {
          this.selectorObserverMap.size > 0 &&
            (this.selectorObserverMap.forEach((e) => e.stop()),
            this.selectorObserverMap.clear());
        }
        stopAttributeObservers() {
          this.attributeObserverMap.size > 0 &&
            (this.attributeObserverMap.forEach((e) => e.stop()),
            this.attributeObserverMap.clear());
        }
        selectorMatched(e, t, { outletName: n }) {
          const i = this.getOutlet(e, n);
          i && this.connectOutlet(i, e, n);
        }
        selectorUnmatched(e, t, { outletName: n }) {
          const i = this.getOutletFromMap(e, n);
          i && this.disconnectOutlet(i, e, n);
        }
        selectorMatchElement(e, { outletName: t }) {
          const n = this.selector(t),
            i = this.hasOutlet(e, t),
            r = e.matches(`[${this.schema.controllerAttribute}~=${t}]`);
          return !!n && i && r && e.matches(n);
        }
        elementMatchedAttribute(e, t) {
          const n = this.getOutletNameFromOutletAttributeName(t);
          n && this.updateSelectorObserverForOutlet(n);
        }
        elementAttributeValueChanged(e, t) {
          const n = this.getOutletNameFromOutletAttributeName(t);
          n && this.updateSelectorObserverForOutlet(n);
        }
        elementUnmatchedAttribute(e, t) {
          const n = this.getOutletNameFromOutletAttributeName(t);
          n && this.updateSelectorObserverForOutlet(n);
        }
        connectOutlet(e, t, n) {
          var i;
          this.outletElementsByName.has(n, t) ||
            (this.outletsByName.add(n, e),
            this.outletElementsByName.add(n, t),
            null === (i = this.selectorObserverMap.get(n)) ||
              void 0 === i ||
              i.pause(() => this.delegate.outletConnected(e, t, n)));
        }
        disconnectOutlet(e, t, n) {
          var i;
          this.outletElementsByName.has(n, t) &&
            (this.outletsByName.delete(n, e),
            this.outletElementsByName.delete(n, t),
            null === (i = this.selectorObserverMap.get(n)) ||
              void 0 === i ||
              i.pause(() => this.delegate.outletDisconnected(e, t, n)));
        }
        disconnectAllOutlets() {
          for (const e of this.outletElementsByName.keys)
            for (const t of this.outletElementsByName.getValuesForKey(e))
              for (const n of this.outletsByName.getValuesForKey(e))
                this.disconnectOutlet(n, t, e);
        }
        updateSelectorObserverForOutlet(e) {
          const t = this.selectorObserverMap.get(e);
          t && (t.selector = this.selector(e));
        }
        setupSelectorObserverForOutlet(e) {
          const t = this.selector(e),
            n = new A(document.body, t, this, { outletName: e });
          this.selectorObserverMap.set(e, n), n.start();
        }
        setupAttributeObserverForOutlet(e) {
          const t = this.attributeNameForOutletName(e),
            n = new y(this.scope.element, t, this);
          this.attributeObserverMap.set(e, n), n.start();
        }
        selector(e) {
          return this.scope.outlets.getSelectorForOutletName(e);
        }
        attributeNameForOutletName(e) {
          return this.scope.schema.outletAttributeForScope(this.identifier, e);
        }
        getOutletNameFromOutletAttributeName(e) {
          return this.outletDefinitions.find(
            (t) => this.attributeNameForOutletName(t) === e,
          );
        }
        get outletDependencies() {
          const e = new E();
          return (
            this.router.modules.forEach((t) => {
              N(t.definition.controllerConstructor, "outlets").forEach((n) =>
                e.add(n, t.identifier),
              );
            }),
            e
          );
        }
        get outletDefinitions() {
          return this.outletDependencies.getKeysForValue(this.identifier);
        }
        get dependentControllerIdentifiers() {
          return this.outletDependencies.getValuesForKey(this.identifier);
        }
        get dependentContexts() {
          const e = this.dependentControllerIdentifiers;
          return this.router.contexts.filter((t) => e.includes(t.identifier));
        }
        hasOutlet(e, t) {
          return !!this.getOutlet(e, t) || !!this.getOutletFromMap(e, t);
        }
        getOutlet(e, t) {
          return this.application.getControllerForElementAndIdentifier(e, t);
        }
        getOutletFromMap(e, t) {
          return this.outletsByName
            .getValuesForKey(t)
            .find((t) => t.element === e);
        }
        get scope() {
          return this.context.scope;
        }
        get schema() {
          return this.context.schema;
        }
        get identifier() {
          return this.context.identifier;
        }
        get application() {
          return this.context.application;
        }
        get router() {
          return this.application.router;
        }
      }
      class M {
        constructor(e, t) {
          (this.logDebugActivity = (e, t = {}) => {
            const { identifier: n, controller: i, element: r } = this;
            (t = Object.assign(
              { identifier: n, controller: i, element: r },
              t,
            )),
              this.application.logDebugActivity(this.identifier, e, t);
          }),
            (this.module = e),
            (this.scope = t),
            (this.controller = new e.controllerConstructor(this)),
            (this.bindingObserver = new T(this, this.dispatcher)),
            (this.valueObserver = new S(this, this.controller)),
            (this.targetObserver = new k(this, this)),
            (this.outletObserver = new D(this, this));
          try {
            this.controller.initialize(), this.logDebugActivity("initialize");
          } catch (e) {
            this.handleError(e, "initializing controller");
          }
        }
        connect() {
          this.bindingObserver.start(),
            this.valueObserver.start(),
            this.targetObserver.start(),
            this.outletObserver.start();
          try {
            this.controller.connect(), this.logDebugActivity("connect");
          } catch (e) {
            this.handleError(e, "connecting controller");
          }
        }
        refresh() {
          this.outletObserver.refresh();
        }
        disconnect() {
          try {
            this.controller.disconnect(), this.logDebugActivity("disconnect");
          } catch (e) {
            this.handleError(e, "disconnecting controller");
          }
          this.outletObserver.stop(),
            this.targetObserver.stop(),
            this.valueObserver.stop(),
            this.bindingObserver.stop();
        }
        get application() {
          return this.module.application;
        }
        get identifier() {
          return this.module.identifier;
        }
        get schema() {
          return this.application.schema;
        }
        get dispatcher() {
          return this.application.dispatcher;
        }
        get element() {
          return this.scope.element;
        }
        get parentElement() {
          return this.element.parentElement;
        }
        handleError(e, t, n = {}) {
          const { identifier: i, controller: r, element: s } = this;
          (n = Object.assign({ identifier: i, controller: r, element: s }, n)),
            this.application.handleError(e, `Error ${t}`, n);
        }
        targetConnected(e, t) {
          this.invokeControllerMethod(`${t}TargetConnected`, e);
        }
        targetDisconnected(e, t) {
          this.invokeControllerMethod(`${t}TargetDisconnected`, e);
        }
        outletConnected(e, t, n) {
          this.invokeControllerMethod(`${l(n)}OutletConnected`, e, t);
        }
        outletDisconnected(e, t, n) {
          this.invokeControllerMethod(`${l(n)}OutletDisconnected`, e, t);
        }
        invokeControllerMethod(e, ...t) {
          const n = this.controller;
          "function" == typeof n[e] && n[e](...t);
        }
      }
      const $ =
          "function" == typeof Object.getOwnPropertySymbols
            ? (e) => [
                ...Object.getOwnPropertyNames(e),
                ...Object.getOwnPropertySymbols(e),
              ]
            : Object.getOwnPropertyNames,
        I = (() => {
          function e(e) {
            function t() {
              return Reflect.construct(e, arguments, new.target);
            }
            return (
              (t.prototype = Object.create(e.prototype, {
                constructor: { value: t },
              })),
              Reflect.setPrototypeOf(t, e),
              t
            );
          }
          try {
            return (
              (function () {
                const t = e(function () {
                  this.a.call(this);
                });
                (t.prototype.a = function () {}), new t();
              })(),
              e
            );
          } catch (e) {
            return (e) => class extends e {};
          }
        })();
      class P {
        constructor(e, t) {
          (this.application = e),
            (this.definition = (function (e) {
              return {
                identifier: e.identifier,
                controllerConstructor:
                  ((t = e.controllerConstructor),
                  (function (e, t) {
                    const n = I(e),
                      i = (function (e, t) {
                        return $(t).reduce((n, i) => {
                          const r = (function (e, t, n) {
                            const i = Object.getOwnPropertyDescriptor(e, n);
                            if (!i || !("value" in i)) {
                              const e = Object.getOwnPropertyDescriptor(
                                t,
                                n,
                              ).value;
                              return (
                                i &&
                                  ((e.get = i.get || e.get),
                                  (e.set = i.set || e.set)),
                                e
                              );
                            }
                          })(e, t, i);
                          return r && Object.assign(n, { [i]: r }), n;
                        }, {});
                      })(e.prototype, t);
                    return Object.defineProperties(n.prototype, i), n;
                  })(
                    t,
                    (function (e) {
                      return N(e, "blessings").reduce((t, n) => {
                        const i = n(e);
                        for (const e in i) {
                          const n = t[e] || {};
                          t[e] = Object.assign(n, i[e]);
                        }
                        return t;
                      }, {});
                    })(t),
                  )),
              };
              var t;
            })(t)),
            (this.contextsByScope = new WeakMap()),
            (this.connectedContexts = new Set());
        }
        get identifier() {
          return this.definition.identifier;
        }
        get controllerConstructor() {
          return this.definition.controllerConstructor;
        }
        get contexts() {
          return Array.from(this.connectedContexts);
        }
        connectContextForScope(e) {
          const t = this.fetchContextForScope(e);
          this.connectedContexts.add(t), t.connect();
        }
        disconnectContextForScope(e) {
          const t = this.contextsByScope.get(e);
          t && (this.connectedContexts.delete(t), t.disconnect());
        }
        fetchContextForScope(e) {
          let t = this.contextsByScope.get(e);
          return t || ((t = new M(this, e)), this.contextsByScope.set(e, t)), t;
        }
      }
      class j {
        constructor(e) {
          this.scope = e;
        }
        has(e) {
          return this.data.has(this.getDataKey(e));
        }
        get(e) {
          return this.getAll(e)[0];
        }
        getAll(e) {
          return (
            (this.data.get(this.getDataKey(e)) || "").match(/[^\s]+/g) || []
          );
        }
        getAttributeName(e) {
          return this.data.getAttributeNameForKey(this.getDataKey(e));
        }
        getDataKey(e) {
          return `${e}-class`;
        }
        get data() {
          return this.scope.data;
        }
      }
      class F {
        constructor(e) {
          this.scope = e;
        }
        get element() {
          return this.scope.element;
        }
        get identifier() {
          return this.scope.identifier;
        }
        get(e) {
          const t = this.getAttributeNameForKey(e);
          return this.element.getAttribute(t);
        }
        set(e, t) {
          const n = this.getAttributeNameForKey(e);
          return this.element.setAttribute(n, t), this.get(e);
        }
        has(e) {
          const t = this.getAttributeNameForKey(e);
          return this.element.hasAttribute(t);
        }
        delete(e) {
          if (this.has(e)) {
            const t = this.getAttributeNameForKey(e);
            return this.element.removeAttribute(t), !0;
          }
          return !1;
        }
        getAttributeNameForKey(e) {
          return `data-${this.identifier}-${u(e)}`;
        }
      }
      class B {
        constructor(e) {
          (this.warnedKeysByObject = new WeakMap()), (this.logger = e);
        }
        warn(e, t, n) {
          let i = this.warnedKeysByObject.get(e);
          i || ((i = new Set()), this.warnedKeysByObject.set(e, i)),
            i.has(t) || (i.add(t), this.logger.warn(n, e));
        }
      }
      function R(e, t) {
        return `[${e}~="${t}"]`;
      }
      class H {
        constructor(e) {
          this.scope = e;
        }
        get element() {
          return this.scope.element;
        }
        get identifier() {
          return this.scope.identifier;
        }
        get schema() {
          return this.scope.schema;
        }
        has(e) {
          return null != this.find(e);
        }
        find(...e) {
          return e.reduce(
            (e, t) => e || this.findTarget(t) || this.findLegacyTarget(t),
            void 0,
          );
        }
        findAll(...e) {
          return e.reduce(
            (e, t) => [
              ...e,
              ...this.findAllTargets(t),
              ...this.findAllLegacyTargets(t),
            ],
            [],
          );
        }
        findTarget(e) {
          const t = this.getSelectorForTargetName(e);
          return this.scope.findElement(t);
        }
        findAllTargets(e) {
          const t = this.getSelectorForTargetName(e);
          return this.scope.findAllElements(t);
        }
        getSelectorForTargetName(e) {
          return R(this.schema.targetAttributeForScope(this.identifier), e);
        }
        findLegacyTarget(e) {
          const t = this.getLegacySelectorForTargetName(e);
          return this.deprecate(this.scope.findElement(t), e);
        }
        findAllLegacyTargets(e) {
          const t = this.getLegacySelectorForTargetName(e);
          return this.scope.findAllElements(t).map((t) => this.deprecate(t, e));
        }
        getLegacySelectorForTargetName(e) {
          const t = `${this.identifier}.${e}`;
          return R(this.schema.targetAttribute, t);
        }
        deprecate(e, t) {
          if (e) {
            const { identifier: n } = this,
              i = this.schema.targetAttribute,
              r = this.schema.targetAttributeForScope(n);
            this.guide.warn(
              e,
              `target:${t}`,
              `Please replace ${i}="${n}.${t}" with ${r}="${t}". The ${i} attribute is deprecated and will be removed in a future version of Stimulus.`,
            );
          }
          return e;
        }
        get guide() {
          return this.scope.guide;
        }
      }
      class q {
        constructor(e, t) {
          (this.scope = e), (this.controllerElement = t);
        }
        get element() {
          return this.scope.element;
        }
        get identifier() {
          return this.scope.identifier;
        }
        get schema() {
          return this.scope.schema;
        }
        has(e) {
          return null != this.find(e);
        }
        find(...e) {
          return e.reduce((e, t) => e || this.findOutlet(t), void 0);
        }
        findAll(...e) {
          return e.reduce((e, t) => [...e, ...this.findAllOutlets(t)], []);
        }
        getSelectorForOutletName(e) {
          const t = this.schema.outletAttributeForScope(this.identifier, e);
          return this.controllerElement.getAttribute(t);
        }
        findOutlet(e) {
          const t = this.getSelectorForOutletName(e);
          if (t) return this.findElement(t, e);
        }
        findAllOutlets(e) {
          const t = this.getSelectorForOutletName(e);
          return t ? this.findAllElements(t, e) : [];
        }
        findElement(e, t) {
          return this.scope
            .queryElements(e)
            .filter((n) => this.matchesElement(n, e, t))[0];
        }
        findAllElements(e, t) {
          return this.scope
            .queryElements(e)
            .filter((n) => this.matchesElement(n, e, t));
        }
        matchesElement(e, t, n) {
          const i = e.getAttribute(this.scope.schema.controllerAttribute) || "";
          return e.matches(t) && i.split(" ").includes(n);
        }
      }
      class V {
        constructor(e, t, n, i) {
          (this.targets = new H(this)),
            (this.classes = new j(this)),
            (this.data = new F(this)),
            (this.containsElement = (e) =>
              e.closest(this.controllerSelector) === this.element),
            (this.schema = e),
            (this.element = t),
            (this.identifier = n),
            (this.guide = new B(i)),
            (this.outlets = new q(this.documentScope, t));
        }
        findElement(e) {
          return this.element.matches(e)
            ? this.element
            : this.queryElements(e).find(this.containsElement);
        }
        findAllElements(e) {
          return [
            ...(this.element.matches(e) ? [this.element] : []),
            ...this.queryElements(e).filter(this.containsElement),
          ];
        }
        queryElements(e) {
          return Array.from(this.element.querySelectorAll(e));
        }
        get controllerSelector() {
          return R(this.schema.controllerAttribute, this.identifier);
        }
        get isDocumentScope() {
          return this.element === document.documentElement;
        }
        get documentScope() {
          return this.isDocumentScope
            ? this
            : new V(
                this.schema,
                document.documentElement,
                this.identifier,
                this.guide.logger,
              );
        }
      }
      class W {
        constructor(e, t, n) {
          (this.element = e),
            (this.schema = t),
            (this.delegate = n),
            (this.valueListObserver = new C(
              this.element,
              this.controllerAttribute,
              this,
            )),
            (this.scopesByIdentifierByElement = new WeakMap()),
            (this.scopeReferenceCounts = new WeakMap());
        }
        start() {
          this.valueListObserver.start();
        }
        stop() {
          this.valueListObserver.stop();
        }
        get controllerAttribute() {
          return this.schema.controllerAttribute;
        }
        parseValueForToken(e) {
          const { element: t, content: n } = e;
          return this.parseValueForElementAndIdentifier(t, n);
        }
        parseValueForElementAndIdentifier(e, t) {
          const n = this.fetchScopesByIdentifierForElement(e);
          let i = n.get(t);
          return (
            i ||
              ((i = this.delegate.createScopeForElementAndIdentifier(e, t)),
              n.set(t, i)),
            i
          );
        }
        elementMatchedValue(e, t) {
          const n = (this.scopeReferenceCounts.get(t) || 0) + 1;
          this.scopeReferenceCounts.set(t, n),
            1 == n && this.delegate.scopeConnected(t);
        }
        elementUnmatchedValue(e, t) {
          const n = this.scopeReferenceCounts.get(t);
          n &&
            (this.scopeReferenceCounts.set(t, n - 1),
            1 == n && this.delegate.scopeDisconnected(t));
        }
        fetchScopesByIdentifierForElement(e) {
          let t = this.scopesByIdentifierByElement.get(e);
          return (
            t || ((t = new Map()), this.scopesByIdentifierByElement.set(e, t)),
            t
          );
        }
      }
      class K {
        constructor(e) {
          (this.application = e),
            (this.scopeObserver = new W(this.element, this.schema, this)),
            (this.scopesByIdentifier = new E()),
            (this.modulesByIdentifier = new Map());
        }
        get element() {
          return this.application.element;
        }
        get schema() {
          return this.application.schema;
        }
        get logger() {
          return this.application.logger;
        }
        get controllerAttribute() {
          return this.schema.controllerAttribute;
        }
        get modules() {
          return Array.from(this.modulesByIdentifier.values());
        }
        get contexts() {
          return this.modules.reduce((e, t) => e.concat(t.contexts), []);
        }
        start() {
          this.scopeObserver.start();
        }
        stop() {
          this.scopeObserver.stop();
        }
        loadDefinition(e) {
          this.unloadIdentifier(e.identifier);
          const t = new P(this.application, e);
          this.connectModule(t);
          const n = e.controllerConstructor.afterLoad;
          n && n.call(e.controllerConstructor, e.identifier, this.application);
        }
        unloadIdentifier(e) {
          const t = this.modulesByIdentifier.get(e);
          t && this.disconnectModule(t);
        }
        getContextForElementAndIdentifier(e, t) {
          const n = this.modulesByIdentifier.get(t);
          if (n) return n.contexts.find((t) => t.element == e);
        }
        proposeToConnectScopeForElementAndIdentifier(e, t) {
          const n = this.scopeObserver.parseValueForElementAndIdentifier(e, t);
          n
            ? this.scopeObserver.elementMatchedValue(n.element, n)
            : console.error(
                `Couldn't find or create scope for identifier: "${t}" and element:`,
                e,
              );
        }
        handleError(e, t, n) {
          this.application.handleError(e, t, n);
        }
        createScopeForElementAndIdentifier(e, t) {
          return new V(this.schema, e, t, this.logger);
        }
        scopeConnected(e) {
          this.scopesByIdentifier.add(e.identifier, e);
          const t = this.modulesByIdentifier.get(e.identifier);
          t && t.connectContextForScope(e);
        }
        scopeDisconnected(e) {
          this.scopesByIdentifier.delete(e.identifier, e);
          const t = this.modulesByIdentifier.get(e.identifier);
          t && t.disconnectContextForScope(e);
        }
        connectModule(e) {
          this.modulesByIdentifier.set(e.identifier, e),
            this.scopesByIdentifier
              .getValuesForKey(e.identifier)
              .forEach((t) => e.connectContextForScope(t));
        }
        disconnectModule(e) {
          this.modulesByIdentifier.delete(e.identifier),
            this.scopesByIdentifier
              .getValuesForKey(e.identifier)
              .forEach((t) => e.disconnectContextForScope(t));
        }
      }
      const z = {
        controllerAttribute: "data-controller",
        actionAttribute: "data-action",
        targetAttribute: "data-target",
        targetAttributeForScope: (e) => `data-${e}-target`,
        outletAttributeForScope: (e, t) => `data-${e}-${t}-outlet`,
        keyMappings: Object.assign(
          Object.assign(
            {
              enter: "Enter",
              tab: "Tab",
              esc: "Escape",
              space: " ",
              up: "ArrowUp",
              down: "ArrowDown",
              left: "ArrowLeft",
              right: "ArrowRight",
              home: "Home",
              end: "End",
              page_up: "PageUp",
              page_down: "PageDown",
            },
            U("abcdefghijklmnopqrstuvwxyz".split("").map((e) => [e, e])),
          ),
          U("0123456789".split("").map((e) => [e, e])),
        ),
      };
      function U(e) {
        return e.reduce(
          (e, [t, n]) => Object.assign(Object.assign({}, e), { [t]: n }),
          {},
        );
      }
      class Q {
        constructor(e = document.documentElement, t = z) {
          (this.logger = console),
            (this.debug = !1),
            (this.logDebugActivity = (e, t, n = {}) => {
              this.debug && this.logFormattedMessage(e, t, n);
            }),
            (this.element = e),
            (this.schema = t),
            (this.dispatcher = new r(this)),
            (this.router = new K(this)),
            (this.actionDescriptorFilters = Object.assign({}, s));
        }
        static start(e, t) {
          const n = new this(e, t);
          return n.start(), n;
        }
        async start() {
          await new Promise((e) => {
            "loading" == document.readyState
              ? document.addEventListener("DOMContentLoaded", () => e())
              : e();
          }),
            this.logDebugActivity("application", "starting"),
            this.dispatcher.start(),
            this.router.start(),
            this.logDebugActivity("application", "start");
        }
        stop() {
          this.logDebugActivity("application", "stopping"),
            this.dispatcher.stop(),
            this.router.stop(),
            this.logDebugActivity("application", "stop");
        }
        register(e, t) {
          this.load({ identifier: e, controllerConstructor: t });
        }
        registerActionOption(e, t) {
          this.actionDescriptorFilters[e] = t;
        }
        load(e, ...t) {
          (Array.isArray(e) ? e : [e, ...t]).forEach((e) => {
            e.controllerConstructor.shouldLoad && this.router.loadDefinition(e);
          });
        }
        unload(e, ...t) {
          (Array.isArray(e) ? e : [e, ...t]).forEach((e) =>
            this.router.unloadIdentifier(e),
          );
        }
        get controllers() {
          return this.router.contexts.map((e) => e.controller);
        }
        getControllerForElementAndIdentifier(e, t) {
          const n = this.router.getContextForElementAndIdentifier(e, t);
          return n ? n.controller : null;
        }
        handleError(e, t, n) {
          var i;
          this.logger.error("%s\n\n%o\n\n%o", t, e, n),
            null === (i = window.onerror) ||
              void 0 === i ||
              i.call(window, t, "", 0, 0, e);
        }
        logFormattedMessage(e, t, n = {}) {
          (n = Object.assign({ application: this }, n)),
            this.logger.groupCollapsed(`${e} #${t}`),
            this.logger.log("details:", Object.assign({}, n)),
            this.logger.groupEnd();
        }
      }
      function X(e, t, n) {
        return e.application.getControllerForElementAndIdentifier(t, n);
      }
      function Y(e, t, n) {
        let i = X(e, t, n);
        return (
          i ||
          (e.application.router.proposeToConnectScopeForElementAndIdentifier(
            t,
            n,
          ),
          (i = X(e, t, n)),
          i || void 0)
        );
      }
      function J([e, t], n) {
        return (function (e) {
          const { token: t, typeDefinition: n } = e,
            i = `${u(t)}-value`,
            r = (function (e) {
              const { controller: t, token: n, typeDefinition: i } = e,
                r = (function (e) {
                  const { controller: t, token: n, typeObject: i } = e,
                    r = h(i.type),
                    s = h(i.default),
                    o = r && s,
                    a = r && !s,
                    l = !r && s,
                    c = Z(i.type),
                    u = G(e.typeObject.default);
                  if (a) return c;
                  if (l) return u;
                  if (c !== u)
                    throw new Error(
                      `The specified default value for the Stimulus Value "${
                        t ? `${t}.${n}` : n
                      }" must match the defined type "${c}". The provided default value of "${
                        i.default
                      }" is of type "${u}".`,
                    );
                  return o ? c : void 0;
                })({ controller: t, token: n, typeObject: i }),
                s = G(i),
                o = Z(i),
                a = r || s || o;
              if (a) return a;
              throw new Error(
                `Unknown value type "${t ? `${t}.${i}` : n}" for "${n}" value`,
              );
            })(e);
          return {
            type: r,
            key: i,
            name: a(i),
            get defaultValue() {
              return (function (e) {
                const t = Z(e);
                if (t) return ee[t];
                const n = d(e, "default"),
                  i = d(e, "type"),
                  r = e;
                if (n) return r.default;
                if (i) {
                  const { type: e } = r,
                    t = Z(e);
                  if (t) return ee[t];
                }
                return e;
              })(n);
            },
            get hasCustomDefaultValue() {
              return void 0 !== G(n);
            },
            reader: te[r],
            writer: ne[r] || ne.default,
          };
        })({ controller: n, token: e, typeDefinition: t });
      }
      function Z(e) {
        switch (e) {
          case Array:
            return "array";
          case Boolean:
            return "boolean";
          case Number:
            return "number";
          case Object:
            return "object";
          case String:
            return "string";
        }
      }
      function G(e) {
        switch (typeof e) {
          case "boolean":
            return "boolean";
          case "number":
            return "number";
          case "string":
            return "string";
        }
        return Array.isArray(e)
          ? "array"
          : "[object Object]" === Object.prototype.toString.call(e)
          ? "object"
          : void 0;
      }
      const ee = {
          get array() {
            return [];
          },
          boolean: !1,
          number: 0,
          get object() {
            return {};
          },
          string: "",
        },
        te = {
          array(e) {
            const t = JSON.parse(e);
            if (!Array.isArray(t))
              throw new TypeError(
                `expected value of type "array" but instead got value "${e}" of type "${G(
                  t,
                )}"`,
              );
            return t;
          },
          boolean(e) {
            return !("0" == e || "false" == String(e).toLowerCase());
          },
          number(e) {
            return Number(e.replace(/_/g, ""));
          },
          object(e) {
            const t = JSON.parse(e);
            if (null === t || "object" != typeof t || Array.isArray(t))
              throw new TypeError(
                `expected value of type "object" but instead got value "${e}" of type "${G(
                  t,
                )}"`,
              );
            return t;
          },
          string(e) {
            return e;
          },
        },
        ne = {
          default: function (e) {
            return `${e}`;
          },
          array: ie,
          object: ie,
        };
      function ie(e) {
        return JSON.stringify(e);
      }
      class re {
        constructor(e) {
          this.context = e;
        }
        static get shouldLoad() {
          return !0;
        }
        static afterLoad(e, t) {}
        get application() {
          return this.context.application;
        }
        get scope() {
          return this.context.scope;
        }
        get element() {
          return this.scope.element;
        }
        get identifier() {
          return this.scope.identifier;
        }
        get targets() {
          return this.scope.targets;
        }
        get outlets() {
          return this.scope.outlets;
        }
        get classes() {
          return this.scope.classes;
        }
        get data() {
          return this.scope.data;
        }
        initialize() {}
        connect() {}
        disconnect() {}
        dispatch(
          e,
          {
            target: t = this.element,
            detail: n = {},
            prefix: i = this.identifier,
            bubbles: r = !0,
            cancelable: s = !0,
          } = {},
        ) {
          const o = new CustomEvent(i ? `${i}:${e}` : e, {
            detail: n,
            bubbles: r,
            cancelable: s,
          });
          return t.dispatchEvent(o), o;
        }
      }
      (re.blessings = [
        function (e) {
          return N(e, "classes").reduce((e, t) => {
            return Object.assign(e, {
              [`${(n = t)}Class`]: {
                get() {
                  const { classes: e } = this;
                  if (e.has(n)) return e.get(n);
                  {
                    const t = e.getAttributeName(n);
                    throw new Error(`Missing attribute "${t}"`);
                  }
                },
              },
              [`${n}Classes`]: {
                get() {
                  return this.classes.getAll(n);
                },
              },
              [`has${c(n)}Class`]: {
                get() {
                  return this.classes.has(n);
                },
              },
            });
            var n;
          }, {});
        },
        function (e) {
          return N(e, "targets").reduce((e, t) => {
            return Object.assign(e, {
              [`${(n = t)}Target`]: {
                get() {
                  const e = this.targets.find(n);
                  if (e) return e;
                  throw new Error(
                    `Missing target element "${n}" for "${this.identifier}" controller`,
                  );
                },
              },
              [`${n}Targets`]: {
                get() {
                  return this.targets.findAll(n);
                },
              },
              [`has${c(n)}Target`]: {
                get() {
                  return this.targets.has(n);
                },
              },
            });
            var n;
          }, {});
        },
        function (e) {
          const t = (function (e, t) {
              return L(e).reduce(
                (e, n) => (
                  e.push(
                    ...(function (e, t) {
                      const n = e[t];
                      return n ? Object.keys(n).map((e) => [e, n[e]]) : [];
                    })(n, t),
                  ),
                  e
                ),
                [],
              );
            })(e, "values"),
            n = {
              valueDescriptorMap: {
                get() {
                  return t.reduce((e, t) => {
                    const n = J(t, this.identifier),
                      i = this.data.getAttributeNameForKey(n.key);
                    return Object.assign(e, { [i]: n });
                  }, {});
                },
              },
            };
          return t.reduce(
            (e, t) =>
              Object.assign(
                e,
                (function (e, t) {
                  const n = J(e, void 0),
                    { key: i, name: r, reader: s, writer: o } = n;
                  return {
                    [r]: {
                      get() {
                        const e = this.data.get(i);
                        return null !== e ? s(e) : n.defaultValue;
                      },
                      set(e) {
                        void 0 === e
                          ? this.data.delete(i)
                          : this.data.set(i, o(e));
                      },
                    },
                    [`has${c(r)}`]: {
                      get() {
                        return this.data.has(i) || n.hasCustomDefaultValue;
                      },
                    },
                  };
                })(t),
              ),
            n,
          );
        },
        function (e) {
          return N(e, "outlets").reduce(
            (e, t) =>
              Object.assign(
                e,
                (function (e) {
                  const t = l(e);
                  return {
                    [`${t}Outlet`]: {
                      get() {
                        const t = this.outlets.find(e),
                          n = this.outlets.getSelectorForOutletName(e);
                        if (t) {
                          const n = Y(this, t, e);
                          if (n) return n;
                          throw new Error(
                            `The provided outlet element is missing an outlet controller "${e}" instance for host controller "${this.identifier}"`,
                          );
                        }
                        throw new Error(
                          `Missing outlet element "${e}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`,
                        );
                      },
                    },
                    [`${t}Outlets`]: {
                      get() {
                        const t = this.outlets.findAll(e);
                        return t.length > 0
                          ? t
                              .map((t) => {
                                const n = Y(this, t, e);
                                if (n) return n;
                                console.warn(
                                  `The provided outlet element is missing an outlet controller "${e}" instance for host controller "${this.identifier}"`,
                                  t,
                                );
                              })
                              .filter((e) => e)
                          : [];
                      },
                    },
                    [`${t}OutletElement`]: {
                      get() {
                        const t = this.outlets.find(e),
                          n = this.outlets.getSelectorForOutletName(e);
                        if (t) return t;
                        throw new Error(
                          `Missing outlet element "${e}" for host controller "${this.identifier}". Stimulus couldn't find a matching outlet element using selector "${n}".`,
                        );
                      },
                    },
                    [`${t}OutletElements`]: {
                      get() {
                        return this.outlets.findAll(e);
                      },
                    },
                    [`has${c(t)}Outlet`]: {
                      get() {
                        return this.outlets.has(e);
                      },
                    },
                  };
                })(t),
              ),
            {},
          );
        },
      ]),
        (re.targets = []),
        (re.outlets = []),
        (re.values = {});
    },
    414: function (e) {
      e.exports = (function () {
        "use strict";
        const e = new Map(),
          t = {
            set(t, n, i) {
              e.has(t) || e.set(t, new Map());
              const r = e.get(t);
              r.has(n) || 0 === r.size
                ? r.set(n, i)
                : console.error(
                    `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                      Array.from(r.keys())[0]
                    }.`,
                  );
            },
            get(t, n) {
              return (e.has(t) && e.get(t).get(n)) || null;
            },
            remove(t, n) {
              if (!e.has(t)) return;
              const i = e.get(t);
              i.delete(n), 0 === i.size && e.delete(t);
            },
          },
          n = "transitionend",
          i = (e) => (
            e &&
              window.CSS &&
              window.CSS.escape &&
              (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
            e
          ),
          r = (e) => {
            e.dispatchEvent(new Event(n));
          },
          s = (e) =>
            !(!e || "object" != typeof e) &&
            (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
          o = (e) =>
            s(e)
              ? e.jquery
                ? e[0]
                : e
              : "string" == typeof e && e.length > 0
              ? document.querySelector(i(e))
              : null,
          a = (e) => {
            if (!s(e) || 0 === e.getClientRects().length) return !1;
            const t =
                "visible" ===
                getComputedStyle(e).getPropertyValue("visibility"),
              n = e.closest("details:not([open])");
            if (!n) return t;
            if (n !== e) {
              const t = e.closest("summary");
              if (t && t.parentNode !== n) return !1;
              if (null === t) return !1;
            }
            return t;
          },
          l = (e) =>
            !e ||
            e.nodeType !== Node.ELEMENT_NODE ||
            !!e.classList.contains("disabled") ||
            (void 0 !== e.disabled
              ? e.disabled
              : e.hasAttribute("disabled") &&
                "false" !== e.getAttribute("disabled")),
          c = (e) => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof e.getRootNode) {
              const t = e.getRootNode();
              return t instanceof ShadowRoot ? t : null;
            }
            return e instanceof ShadowRoot
              ? e
              : e.parentNode
              ? c(e.parentNode)
              : null;
          },
          u = () => {},
          h = (e) => {
            e.offsetHeight;
          },
          d = () =>
            window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
              ? window.jQuery
              : null,
          f = [],
          p = () => "rtl" === document.documentElement.dir,
          g = (e) => {
            var t;
            (t = () => {
              const t = d();
              if (t) {
                const n = e.NAME,
                  i = t.fn[n];
                (t.fn[n] = e.jQueryInterface),
                  (t.fn[n].Constructor = e),
                  (t.fn[n].noConflict = () => (
                    (t.fn[n] = i), e.jQueryInterface
                  ));
              }
            }),
              "loading" === document.readyState
                ? (f.length ||
                    document.addEventListener("DOMContentLoaded", () => {
                      for (const e of f) e();
                    }),
                  f.push(t))
                : t();
          },
          m = (e, t = [], n = e) => ("function" == typeof e ? e(...t) : n),
          v = (e, t, i = !0) => {
            if (!i) return void m(e);
            const s =
              ((e) => {
                if (!e) return 0;
                let { transitionDuration: t, transitionDelay: n } =
                  window.getComputedStyle(e);
                const i = Number.parseFloat(t),
                  r = Number.parseFloat(n);
                return i || r
                  ? ((t = t.split(",")[0]),
                    (n = n.split(",")[0]),
                    1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
                  : 0;
              })(t) + 5;
            let o = !1;
            const a = ({ target: i }) => {
              i === t && ((o = !0), t.removeEventListener(n, a), m(e));
            };
            t.addEventListener(n, a),
              setTimeout(() => {
                o || r(t);
              }, s);
          },
          _ = (e, t, n, i) => {
            const r = e.length;
            let s = e.indexOf(t);
            return -1 === s
              ? !n && i
                ? e[r - 1]
                : e[0]
              : ((s += n ? 1 : -1),
                i && (s = (s + r) % r),
                e[Math.max(0, Math.min(s, r - 1))]);
          },
          b = /[^.]*(?=\..*)\.|.*/,
          y = /\..*/,
          w = /::\d+$/,
          E = {};
        let A = 1;
        const O = { mouseenter: "mouseover", mouseleave: "mouseout" },
          x = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
          ]);
        function C(e, t) {
          return (t && `${t}::${A++}`) || e.uidEvent || A++;
        }
        function T(e) {
          const t = C(e);
          return (e.uidEvent = t), (E[t] = E[t] || {}), E[t];
        }
        function S(e, t, n = null) {
          return Object.values(e).find(
            (e) => e.callable === t && e.delegationSelector === n,
          );
        }
        function k(e, t, n) {
          const i = "string" == typeof t,
            r = i ? n : t || n;
          let s = M(e);
          return x.has(s) || (s = e), [i, r, s];
        }
        function N(e, t, n, i, r) {
          if ("string" != typeof t || !e) return;
          let [s, o, a] = k(t, n, i);
          if (t in O) {
            const e = (e) =>
              function (t) {
                if (
                  !t.relatedTarget ||
                  (t.relatedTarget !== t.delegateTarget &&
                    !t.delegateTarget.contains(t.relatedTarget))
                )
                  return e.call(this, t);
              };
            o = e(o);
          }
          const l = T(e),
            c = l[a] || (l[a] = {}),
            u = S(c, o, s ? n : null);
          if (u) return void (u.oneOff = u.oneOff && r);
          const h = C(o, t.replace(b, "")),
            d = s
              ? (function (e, t, n) {
                  return function i(r) {
                    const s = e.querySelectorAll(t);
                    for (
                      let { target: o } = r;
                      o && o !== this;
                      o = o.parentNode
                    )
                      for (const a of s)
                        if (a === o)
                          return (
                            I(r, { delegateTarget: o }),
                            i.oneOff && $.off(e, r.type, t, n),
                            n.apply(o, [r])
                          );
                  };
                })(e, n, o)
              : (function (e, t) {
                  return function n(i) {
                    return (
                      I(i, { delegateTarget: e }),
                      n.oneOff && $.off(e, i.type, t),
                      t.apply(e, [i])
                    );
                  };
                })(e, o);
          (d.delegationSelector = s ? n : null),
            (d.callable = o),
            (d.oneOff = r),
            (d.uidEvent = h),
            (c[h] = d),
            e.addEventListener(a, d, s);
        }
        function L(e, t, n, i, r) {
          const s = S(t[n], i, r);
          s &&
            (e.removeEventListener(n, s, Boolean(r)), delete t[n][s.uidEvent]);
        }
        function D(e, t, n, i) {
          const r = t[n] || {};
          for (const [s, o] of Object.entries(r))
            s.includes(i) && L(e, t, n, o.callable, o.delegationSelector);
        }
        function M(e) {
          return (e = e.replace(y, "")), O[e] || e;
        }
        const $ = {
          on(e, t, n, i) {
            N(e, t, n, i, !1);
          },
          one(e, t, n, i) {
            N(e, t, n, i, !0);
          },
          off(e, t, n, i) {
            if ("string" != typeof t || !e) return;
            const [r, s, o] = k(t, n, i),
              a = o !== t,
              l = T(e),
              c = l[o] || {},
              u = t.startsWith(".");
            if (void 0 === s) {
              if (u) for (const n of Object.keys(l)) D(e, l, n, t.slice(1));
              for (const [n, i] of Object.entries(c)) {
                const r = n.replace(w, "");
                (a && !t.includes(r)) ||
                  L(e, l, o, i.callable, i.delegationSelector);
              }
            } else {
              if (!Object.keys(c).length) return;
              L(e, l, o, s, r ? n : null);
            }
          },
          trigger(e, t, n) {
            if ("string" != typeof t || !e) return null;
            const i = d();
            let r = null,
              s = !0,
              o = !0,
              a = !1;
            t !== M(t) &&
              i &&
              ((r = i.Event(t, n)),
              i(e).trigger(r),
              (s = !r.isPropagationStopped()),
              (o = !r.isImmediatePropagationStopped()),
              (a = r.isDefaultPrevented()));
            const l = I(new Event(t, { bubbles: s, cancelable: !0 }), n);
            return (
              a && l.preventDefault(),
              o && e.dispatchEvent(l),
              l.defaultPrevented && r && r.preventDefault(),
              l
            );
          },
        };
        function I(e, t = {}) {
          for (const [n, i] of Object.entries(t))
            try {
              e[n] = i;
            } catch (t) {
              Object.defineProperty(e, n, {
                configurable: !0,
                get() {
                  return i;
                },
              });
            }
          return e;
        }
        function P(e) {
          if ("true" === e) return !0;
          if ("false" === e) return !1;
          if (e === Number(e).toString()) return Number(e);
          if ("" === e || "null" === e) return null;
          if ("string" != typeof e) return e;
          try {
            return JSON.parse(decodeURIComponent(e));
          } catch (t) {
            return e;
          }
        }
        function j(e) {
          return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
        }
        const F = {
          setDataAttribute(e, t, n) {
            e.setAttribute(`data-bs-${j(t)}`, n);
          },
          removeDataAttribute(e, t) {
            e.removeAttribute(`data-bs-${j(t)}`);
          },
          getDataAttributes(e) {
            if (!e) return {};
            const t = {},
              n = Object.keys(e.dataset).filter(
                (e) => e.startsWith("bs") && !e.startsWith("bsConfig"),
              );
            for (const i of n) {
              let n = i.replace(/^bs/, "");
              (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
                (t[n] = P(e.dataset[i]));
            }
            return t;
          },
          getDataAttribute(e, t) {
            return P(e.getAttribute(`data-bs-${j(t)}`));
          },
        };
        class B {
          static get Default() {
            return {};
          }
          static get DefaultType() {
            return {};
          }
          static get NAME() {
            throw new Error(
              'You have to implement the static method "NAME", for each component!',
            );
          }
          _getConfig(e) {
            return (
              (e = this._mergeConfigObj(e)),
              (e = this._configAfterMerge(e)),
              this._typeCheckConfig(e),
              e
            );
          }
          _configAfterMerge(e) {
            return e;
          }
          _mergeConfigObj(e, t) {
            const n = s(t) ? F.getDataAttribute(t, "config") : {};
            return {
              ...this.constructor.Default,
              ...("object" == typeof n ? n : {}),
              ...(s(t) ? F.getDataAttributes(t) : {}),
              ...("object" == typeof e ? e : {}),
            };
          }
          _typeCheckConfig(e, t = this.constructor.DefaultType) {
            for (const [i, r] of Object.entries(t)) {
              const t = e[i],
                o = s(t)
                  ? "element"
                  : null == (n = t)
                  ? `${n}`
                  : Object.prototype.toString
                      .call(n)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase();
              if (!new RegExp(r).test(o))
                throw new TypeError(
                  `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${r}".`,
                );
            }
            var n;
          }
        }
        class R extends B {
          constructor(e, n) {
            super(),
              (e = o(e)) &&
                ((this._element = e),
                (this._config = this._getConfig(n)),
                t.set(this._element, this.constructor.DATA_KEY, this));
          }
          dispose() {
            t.remove(this._element, this.constructor.DATA_KEY),
              $.off(this._element, this.constructor.EVENT_KEY);
            for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
          }
          _queueCallback(e, t, n = !0) {
            v(e, t, n);
          }
          _getConfig(e) {
            return (
              (e = this._mergeConfigObj(e, this._element)),
              (e = this._configAfterMerge(e)),
              this._typeCheckConfig(e),
              e
            );
          }
          static getInstance(e) {
            return t.get(o(e), this.DATA_KEY);
          }
          static getOrCreateInstance(e, t = {}) {
            return (
              this.getInstance(e) ||
              new this(e, "object" == typeof t ? t : null)
            );
          }
          static get VERSION() {
            return "5.3.3";
          }
          static get DATA_KEY() {
            return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
          }
          static eventName(e) {
            return `${e}${this.EVENT_KEY}`;
          }
        }
        const H = (e) => {
            let t = e.getAttribute("data-bs-target");
            if (!t || "#" === t) {
              let n = e.getAttribute("href");
              if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
              n.includes("#") &&
                !n.startsWith("#") &&
                (n = `#${n.split("#")[1]}`),
                (t = n && "#" !== n ? n.trim() : null);
            }
            return t
              ? t
                  .split(",")
                  .map((e) => i(e))
                  .join(",")
              : null;
          },
          q = {
            find(e, t = document.documentElement) {
              return [].concat(
                ...Element.prototype.querySelectorAll.call(t, e),
              );
            },
            findOne(e, t = document.documentElement) {
              return Element.prototype.querySelector.call(t, e);
            },
            children(e, t) {
              return [].concat(...e.children).filter((e) => e.matches(t));
            },
            parents(e, t) {
              const n = [];
              let i = e.parentNode.closest(t);
              for (; i; ) n.push(i), (i = i.parentNode.closest(t));
              return n;
            },
            prev(e, t) {
              let n = e.previousElementSibling;
              for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.previousElementSibling;
              }
              return [];
            },
            next(e, t) {
              let n = e.nextElementSibling;
              for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.nextElementSibling;
              }
              return [];
            },
            focusableChildren(e) {
              const t = [
                "a",
                "button",
                "input",
                "textarea",
                "select",
                "details",
                "[tabindex]",
                '[contenteditable="true"]',
              ]
                .map((e) => `${e}:not([tabindex^="-"])`)
                .join(",");
              return this.find(t, e).filter((e) => !l(e) && a(e));
            },
            getSelectorFromElement(e) {
              const t = H(e);
              return t && q.findOne(t) ? t : null;
            },
            getElementFromSelector(e) {
              const t = H(e);
              return t ? q.findOne(t) : null;
            },
            getMultipleElementsFromSelector(e) {
              const t = H(e);
              return t ? q.find(t) : [];
            },
          },
          V = (e, t = "hide") => {
            const n = `click.dismiss${e.EVENT_KEY}`,
              i = e.NAME;
            $.on(document, n, `[data-bs-dismiss="${i}"]`, function (n) {
              if (
                (["A", "AREA"].includes(this.tagName) && n.preventDefault(),
                l(this))
              )
                return;
              const r = q.getElementFromSelector(this) || this.closest(`.${i}`);
              e.getOrCreateInstance(r)[t]();
            });
          },
          W = ".bs.alert",
          K = `close${W}`,
          z = `closed${W}`;
        class U extends R {
          static get NAME() {
            return "alert";
          }
          close() {
            if ($.trigger(this._element, K).defaultPrevented) return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, e);
          }
          _destroyElement() {
            this._element.remove(), $.trigger(this._element, z), this.dispose();
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = U.getOrCreateInstance(this);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e](this);
              }
            });
          }
        }
        V(U, "close"), g(U);
        const Q = '[data-bs-toggle="button"]';
        class X extends R {
          static get NAME() {
            return "button";
          }
          toggle() {
            this._element.setAttribute(
              "aria-pressed",
              this._element.classList.toggle("active"),
            );
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = X.getOrCreateInstance(this);
              "toggle" === e && t[e]();
            });
          }
        }
        $.on(document, "click.bs.button.data-api", Q, (e) => {
          e.preventDefault();
          const t = e.target.closest(Q);
          X.getOrCreateInstance(t).toggle();
        }),
          g(X);
        const Y = ".bs.swipe",
          J = `touchstart${Y}`,
          Z = `touchmove${Y}`,
          G = `touchend${Y}`,
          ee = `pointerdown${Y}`,
          te = `pointerup${Y}`,
          ne = { endCallback: null, leftCallback: null, rightCallback: null },
          ie = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)",
          };
        class re extends B {
          constructor(e, t) {
            super(),
              (this._element = e),
              e &&
                re.isSupported() &&
                ((this._config = this._getConfig(t)),
                (this._deltaX = 0),
                (this._supportPointerEvents = Boolean(window.PointerEvent)),
                this._initEvents());
          }
          static get Default() {
            return ne;
          }
          static get DefaultType() {
            return ie;
          }
          static get NAME() {
            return "swipe";
          }
          dispose() {
            $.off(this._element, Y);
          }
          _start(e) {
            this._supportPointerEvents
              ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
              : (this._deltaX = e.touches[0].clientX);
          }
          _end(e) {
            this._eventIsPointerPenTouch(e) &&
              (this._deltaX = e.clientX - this._deltaX),
              this._handleSwipe(),
              m(this._config.endCallback);
          }
          _move(e) {
            this._deltaX =
              e.touches && e.touches.length > 1
                ? 0
                : e.touches[0].clientX - this._deltaX;
          }
          _handleSwipe() {
            const e = Math.abs(this._deltaX);
            if (e <= 40) return;
            const t = e / this._deltaX;
            (this._deltaX = 0),
              t &&
                m(
                  t > 0
                    ? this._config.rightCallback
                    : this._config.leftCallback,
                );
          }
          _initEvents() {
            this._supportPointerEvents
              ? ($.on(this._element, ee, (e) => this._start(e)),
                $.on(this._element, te, (e) => this._end(e)),
                this._element.classList.add("pointer-event"))
              : ($.on(this._element, J, (e) => this._start(e)),
                $.on(this._element, Z, (e) => this._move(e)),
                $.on(this._element, G, (e) => this._end(e)));
          }
          _eventIsPointerPenTouch(e) {
            return (
              this._supportPointerEvents &&
              ("pen" === e.pointerType || "touch" === e.pointerType)
            );
          }
          static isSupported() {
            return (
              "ontouchstart" in document.documentElement ||
              navigator.maxTouchPoints > 0
            );
          }
        }
        const se = ".bs.carousel",
          oe = ".data-api",
          ae = "next",
          le = "prev",
          ce = "left",
          ue = "right",
          he = `slide${se}`,
          de = `slid${se}`,
          fe = `keydown${se}`,
          pe = `mouseenter${se}`,
          ge = `mouseleave${se}`,
          me = `dragstart${se}`,
          ve = `load${se}${oe}`,
          _e = `click${se}${oe}`,
          be = "carousel",
          ye = "active",
          we = ".active",
          Ee = ".carousel-item",
          Ae = we + Ee,
          Oe = { ArrowLeft: ue, ArrowRight: ce },
          xe = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0,
          },
          Ce = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean",
          };
        class Te extends R {
          constructor(e, t) {
            super(e, t),
              (this._interval = null),
              (this._activeElement = null),
              (this._isSliding = !1),
              (this.touchTimeout = null),
              (this._swipeHelper = null),
              (this._indicatorsElement = q.findOne(
                ".carousel-indicators",
                this._element,
              )),
              this._addEventListeners(),
              this._config.ride === be && this.cycle();
          }
          static get Default() {
            return xe;
          }
          static get DefaultType() {
            return Ce;
          }
          static get NAME() {
            return "carousel";
          }
          next() {
            this._slide(ae);
          }
          nextWhenVisible() {
            !document.hidden && a(this._element) && this.next();
          }
          prev() {
            this._slide(le);
          }
          pause() {
            this._isSliding && r(this._element), this._clearInterval();
          }
          cycle() {
            this._clearInterval(),
              this._updateInterval(),
              (this._interval = setInterval(
                () => this.nextWhenVisible(),
                this._config.interval,
              ));
          }
          _maybeEnableCycle() {
            this._config.ride &&
              (this._isSliding
                ? $.one(this._element, de, () => this.cycle())
                : this.cycle());
          }
          to(e) {
            const t = this._getItems();
            if (e > t.length - 1 || e < 0) return;
            if (this._isSliding)
              return void $.one(this._element, de, () => this.to(e));
            const n = this._getItemIndex(this._getActive());
            if (n === e) return;
            const i = e > n ? ae : le;
            this._slide(i, t[e]);
          }
          dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
          }
          _configAfterMerge(e) {
            return (e.defaultInterval = e.interval), e;
          }
          _addEventListeners() {
            this._config.keyboard &&
              $.on(this._element, fe, (e) => this._keydown(e)),
              "hover" === this._config.pause &&
                ($.on(this._element, pe, () => this.pause()),
                $.on(this._element, ge, () => this._maybeEnableCycle())),
              this._config.touch &&
                re.isSupported() &&
                this._addTouchEventListeners();
          }
          _addTouchEventListeners() {
            for (const e of q.find(".carousel-item img", this._element))
              $.on(e, me, (e) => e.preventDefault());
            const e = {
              leftCallback: () => this._slide(this._directionToOrder(ce)),
              rightCallback: () => this._slide(this._directionToOrder(ue)),
              endCallback: () => {
                "hover" === this._config.pause &&
                  (this.pause(),
                  this.touchTimeout && clearTimeout(this.touchTimeout),
                  (this.touchTimeout = setTimeout(
                    () => this._maybeEnableCycle(),
                    500 + this._config.interval,
                  )));
              },
            };
            this._swipeHelper = new re(this._element, e);
          }
          _keydown(e) {
            if (/input|textarea/i.test(e.target.tagName)) return;
            const t = Oe[e.key];
            t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
          }
          _getItemIndex(e) {
            return this._getItems().indexOf(e);
          }
          _setActiveIndicatorElement(e) {
            if (!this._indicatorsElement) return;
            const t = q.findOne(we, this._indicatorsElement);
            t.classList.remove(ye), t.removeAttribute("aria-current");
            const n = q.findOne(
              `[data-bs-slide-to="${e}"]`,
              this._indicatorsElement,
            );
            n && (n.classList.add(ye), n.setAttribute("aria-current", "true"));
          }
          _updateInterval() {
            const e = this._activeElement || this._getActive();
            if (!e) return;
            const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
            this._config.interval = t || this._config.defaultInterval;
          }
          _slide(e, t = null) {
            if (this._isSliding) return;
            const n = this._getActive(),
              i = e === ae,
              r = t || _(this._getItems(), n, i, this._config.wrap);
            if (r === n) return;
            const s = this._getItemIndex(r),
              o = (t) =>
                $.trigger(this._element, t, {
                  relatedTarget: r,
                  direction: this._orderToDirection(e),
                  from: this._getItemIndex(n),
                  to: s,
                });
            if (o(he).defaultPrevented) return;
            if (!n || !r) return;
            const a = Boolean(this._interval);
            this.pause(),
              (this._isSliding = !0),
              this._setActiveIndicatorElement(s),
              (this._activeElement = r);
            const l = i ? "carousel-item-start" : "carousel-item-end",
              c = i ? "carousel-item-next" : "carousel-item-prev";
            r.classList.add(c), h(r), n.classList.add(l), r.classList.add(l);
            this._queueCallback(
              () => {
                r.classList.remove(l, c),
                  r.classList.add(ye),
                  n.classList.remove(ye, c, l),
                  (this._isSliding = !1),
                  o(de);
              },
              n,
              this._isAnimated(),
            ),
              a && this.cycle();
          }
          _isAnimated() {
            return this._element.classList.contains("slide");
          }
          _getActive() {
            return q.findOne(Ae, this._element);
          }
          _getItems() {
            return q.find(Ee, this._element);
          }
          _clearInterval() {
            this._interval &&
              (clearInterval(this._interval), (this._interval = null));
          }
          _directionToOrder(e) {
            return p() ? (e === ce ? le : ae) : e === ce ? ae : le;
          }
          _orderToDirection(e) {
            return p() ? (e === le ? ce : ue) : e === le ? ue : ce;
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Te.getOrCreateInstance(this, e);
              if ("number" != typeof e) {
                if ("string" == typeof e) {
                  if (
                    void 0 === t[e] ||
                    e.startsWith("_") ||
                    "constructor" === e
                  )
                    throw new TypeError(`No method named "${e}"`);
                  t[e]();
                }
              } else t.to(e);
            });
          }
        }
        $.on(document, _e, "[data-bs-slide], [data-bs-slide-to]", function (e) {
          const t = q.getElementFromSelector(this);
          if (!t || !t.classList.contains(be)) return;
          e.preventDefault();
          const n = Te.getOrCreateInstance(t),
            i = this.getAttribute("data-bs-slide-to");
          return i
            ? (n.to(i), void n._maybeEnableCycle())
            : "next" === F.getDataAttribute(this, "slide")
            ? (n.next(), void n._maybeEnableCycle())
            : (n.prev(), void n._maybeEnableCycle());
        }),
          $.on(window, ve, () => {
            const e = q.find('[data-bs-ride="carousel"]');
            for (const t of e) Te.getOrCreateInstance(t);
          }),
          g(Te);
        const Se = ".bs.collapse",
          ke = `show${Se}`,
          Ne = `shown${Se}`,
          Le = `hide${Se}`,
          De = `hidden${Se}`,
          Me = `click${Se}.data-api`,
          $e = "show",
          Ie = "collapse",
          Pe = "collapsing",
          je = `:scope .${Ie} .${Ie}`,
          Fe = '[data-bs-toggle="collapse"]',
          Be = { parent: null, toggle: !0 },
          Re = { parent: "(null|element)", toggle: "boolean" };
        class He extends R {
          constructor(e, t) {
            super(e, t),
              (this._isTransitioning = !1),
              (this._triggerArray = []);
            const n = q.find(Fe);
            for (const e of n) {
              const t = q.getSelectorFromElement(e),
                n = q.find(t).filter((e) => e === this._element);
              null !== t && n.length && this._triggerArray.push(e);
            }
            this._initializeChildren(),
              this._config.parent ||
                this._addAriaAndCollapsedClass(
                  this._triggerArray,
                  this._isShown(),
                ),
              this._config.toggle && this.toggle();
          }
          static get Default() {
            return Be;
          }
          static get DefaultType() {
            return Re;
          }
          static get NAME() {
            return "collapse";
          }
          toggle() {
            this._isShown() ? this.hide() : this.show();
          }
          show() {
            if (this._isTransitioning || this._isShown()) return;
            let e = [];
            if (
              (this._config.parent &&
                (e = this._getFirstLevelChildren(
                  ".collapse.show, .collapse.collapsing",
                )
                  .filter((e) => e !== this._element)
                  .map((e) => He.getOrCreateInstance(e, { toggle: !1 }))),
              e.length && e[0]._isTransitioning)
            )
              return;
            if ($.trigger(this._element, ke).defaultPrevented) return;
            for (const t of e) t.hide();
            const t = this._getDimension();
            this._element.classList.remove(Ie),
              this._element.classList.add(Pe),
              (this._element.style[t] = 0),
              this._addAriaAndCollapsedClass(this._triggerArray, !0),
              (this._isTransitioning = !0);
            const n = `scroll${t[0].toUpperCase() + t.slice(1)}`;
            this._queueCallback(
              () => {
                (this._isTransitioning = !1),
                  this._element.classList.remove(Pe),
                  this._element.classList.add(Ie, $e),
                  (this._element.style[t] = ""),
                  $.trigger(this._element, Ne);
              },
              this._element,
              !0,
            ),
              (this._element.style[t] = `${this._element[n]}px`);
          }
          hide() {
            if (this._isTransitioning || !this._isShown()) return;
            if ($.trigger(this._element, Le).defaultPrevented) return;
            const e = this._getDimension();
            (this._element.style[e] = `${
              this._element.getBoundingClientRect()[e]
            }px`),
              h(this._element),
              this._element.classList.add(Pe),
              this._element.classList.remove(Ie, $e);
            for (const e of this._triggerArray) {
              const t = q.getElementFromSelector(e);
              t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
            }
            this._isTransitioning = !0;
            (this._element.style[e] = ""),
              this._queueCallback(
                () => {
                  (this._isTransitioning = !1),
                    this._element.classList.remove(Pe),
                    this._element.classList.add(Ie),
                    $.trigger(this._element, De);
                },
                this._element,
                !0,
              );
          }
          _isShown(e = this._element) {
            return e.classList.contains($e);
          }
          _configAfterMerge(e) {
            return (e.toggle = Boolean(e.toggle)), (e.parent = o(e.parent)), e;
          }
          _getDimension() {
            return this._element.classList.contains("collapse-horizontal")
              ? "width"
              : "height";
          }
          _initializeChildren() {
            if (!this._config.parent) return;
            const e = this._getFirstLevelChildren(Fe);
            for (const t of e) {
              const e = q.getElementFromSelector(t);
              e && this._addAriaAndCollapsedClass([t], this._isShown(e));
            }
          }
          _getFirstLevelChildren(e) {
            const t = q.find(je, this._config.parent);
            return q.find(e, this._config.parent).filter((e) => !t.includes(e));
          }
          _addAriaAndCollapsedClass(e, t) {
            if (e.length)
              for (const n of e)
                n.classList.toggle("collapsed", !t),
                  n.setAttribute("aria-expanded", t);
          }
          static jQueryInterface(e) {
            const t = {};
            return (
              "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
              this.each(function () {
                const n = He.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                  if (void 0 === n[e])
                    throw new TypeError(`No method named "${e}"`);
                  n[e]();
                }
              })
            );
          }
        }
        $.on(document, Me, Fe, function (e) {
          ("A" === e.target.tagName ||
            (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
            e.preventDefault();
          for (const e of q.getMultipleElementsFromSelector(this))
            He.getOrCreateInstance(e, { toggle: !1 }).toggle();
        }),
          g(He);
        var qe = "top",
          Ve = "bottom",
          We = "right",
          Ke = "left",
          ze = "auto",
          Ue = [qe, Ve, We, Ke],
          Qe = "start",
          Xe = "end",
          Ye = "clippingParents",
          Je = "viewport",
          Ze = "popper",
          Ge = "reference",
          et = Ue.reduce(function (e, t) {
            return e.concat([t + "-" + Qe, t + "-" + Xe]);
          }, []),
          tt = [].concat(Ue, [ze]).reduce(function (e, t) {
            return e.concat([t, t + "-" + Qe, t + "-" + Xe]);
          }, []),
          nt = "beforeRead",
          it = "read",
          rt = "afterRead",
          st = "beforeMain",
          ot = "main",
          at = "afterMain",
          lt = "beforeWrite",
          ct = "write",
          ut = "afterWrite",
          ht = [nt, it, rt, st, ot, at, lt, ct, ut];
        function dt(e) {
          return e ? (e.nodeName || "").toLowerCase() : null;
        }
        function ft(e) {
          if (null == e) return window;
          if ("[object Window]" !== e.toString()) {
            var t = e.ownerDocument;
            return (t && t.defaultView) || window;
          }
          return e;
        }
        function pt(e) {
          return e instanceof ft(e).Element || e instanceof Element;
        }
        function gt(e) {
          return e instanceof ft(e).HTMLElement || e instanceof HTMLElement;
        }
        function mt(e) {
          return (
            "undefined" != typeof ShadowRoot &&
            (e instanceof ft(e).ShadowRoot || e instanceof ShadowRoot)
          );
        }
        const vt = {
          name: "applyStyles",
          enabled: !0,
          phase: "write",
          fn: function (e) {
            var t = e.state;
            Object.keys(t.elements).forEach(function (e) {
              var n = t.styles[e] || {},
                i = t.attributes[e] || {},
                r = t.elements[e];
              gt(r) &&
                dt(r) &&
                (Object.assign(r.style, n),
                Object.keys(i).forEach(function (e) {
                  var t = i[e];
                  !1 === t
                    ? r.removeAttribute(e)
                    : r.setAttribute(e, !0 === t ? "" : t);
                }));
            });
          },
          effect: function (e) {
            var t = e.state,
              n = {
                popper: {
                  position: t.options.strategy,
                  left: "0",
                  top: "0",
                  margin: "0",
                },
                arrow: { position: "absolute" },
                reference: {},
              };
            return (
              Object.assign(t.elements.popper.style, n.popper),
              (t.styles = n),
              t.elements.arrow &&
                Object.assign(t.elements.arrow.style, n.arrow),
              function () {
                Object.keys(t.elements).forEach(function (e) {
                  var i = t.elements[e],
                    r = t.attributes[e] || {},
                    s = Object.keys(
                      t.styles.hasOwnProperty(e) ? t.styles[e] : n[e],
                    ).reduce(function (e, t) {
                      return (e[t] = ""), e;
                    }, {});
                  gt(i) &&
                    dt(i) &&
                    (Object.assign(i.style, s),
                    Object.keys(r).forEach(function (e) {
                      i.removeAttribute(e);
                    }));
                });
              }
            );
          },
          requires: ["computeStyles"],
        };
        function _t(e) {
          return e.split("-")[0];
        }
        var bt = Math.max,
          yt = Math.min,
          wt = Math.round;
        function Et() {
          var e = navigator.userAgentData;
          return null != e && e.brands && Array.isArray(e.brands)
            ? e.brands
                .map(function (e) {
                  return e.brand + "/" + e.version;
                })
                .join(" ")
            : navigator.userAgent;
        }
        function At() {
          return !/^((?!chrome|android).)*safari/i.test(Et());
        }
        function Ot(e, t, n) {
          void 0 === t && (t = !1), void 0 === n && (n = !1);
          var i = e.getBoundingClientRect(),
            r = 1,
            s = 1;
          t &&
            gt(e) &&
            ((r = (e.offsetWidth > 0 && wt(i.width) / e.offsetWidth) || 1),
            (s = (e.offsetHeight > 0 && wt(i.height) / e.offsetHeight) || 1));
          var o = (pt(e) ? ft(e) : window).visualViewport,
            a = !At() && n,
            l = (i.left + (a && o ? o.offsetLeft : 0)) / r,
            c = (i.top + (a && o ? o.offsetTop : 0)) / s,
            u = i.width / r,
            h = i.height / s;
          return {
            width: u,
            height: h,
            top: c,
            right: l + u,
            bottom: c + h,
            left: l,
            x: l,
            y: c,
          };
        }
        function xt(e) {
          var t = Ot(e),
            n = e.offsetWidth,
            i = e.offsetHeight;
          return (
            Math.abs(t.width - n) <= 1 && (n = t.width),
            Math.abs(t.height - i) <= 1 && (i = t.height),
            { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
          );
        }
        function Ct(e, t) {
          var n = t.getRootNode && t.getRootNode();
          if (e.contains(t)) return !0;
          if (n && mt(n)) {
            var i = t;
            do {
              if (i && e.isSameNode(i)) return !0;
              i = i.parentNode || i.host;
            } while (i);
          }
          return !1;
        }
        function Tt(e) {
          return ft(e).getComputedStyle(e);
        }
        function St(e) {
          return ["table", "td", "th"].indexOf(dt(e)) >= 0;
        }
        function kt(e) {
          return ((pt(e) ? e.ownerDocument : e.document) || window.document)
            .documentElement;
        }
        function Nt(e) {
          return "html" === dt(e)
            ? e
            : e.assignedSlot ||
                e.parentNode ||
                (mt(e) ? e.host : null) ||
                kt(e);
        }
        function Lt(e) {
          return gt(e) && "fixed" !== Tt(e).position ? e.offsetParent : null;
        }
        function Dt(e) {
          for (
            var t = ft(e), n = Lt(e);
            n && St(n) && "static" === Tt(n).position;

          )
            n = Lt(n);
          return n &&
            ("html" === dt(n) ||
              ("body" === dt(n) && "static" === Tt(n).position))
            ? t
            : n ||
                (function (e) {
                  var t = /firefox/i.test(Et());
                  if (
                    /Trident/i.test(Et()) &&
                    gt(e) &&
                    "fixed" === Tt(e).position
                  )
                    return null;
                  var n = Nt(e);
                  for (
                    mt(n) && (n = n.host);
                    gt(n) && ["html", "body"].indexOf(dt(n)) < 0;

                  ) {
                    var i = Tt(n);
                    if (
                      "none" !== i.transform ||
                      "none" !== i.perspective ||
                      "paint" === i.contain ||
                      -1 !==
                        ["transform", "perspective"].indexOf(i.willChange) ||
                      (t && "filter" === i.willChange) ||
                      (t && i.filter && "none" !== i.filter)
                    )
                      return n;
                    n = n.parentNode;
                  }
                  return null;
                })(e) ||
                t;
        }
        function Mt(e) {
          return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
        }
        function $t(e, t, n) {
          return bt(e, yt(t, n));
        }
        function It(e) {
          return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
        }
        function Pt(e, t) {
          return t.reduce(function (t, n) {
            return (t[n] = e), t;
          }, {});
        }
        const jt = {
          name: "arrow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t,
              n = e.state,
              i = e.name,
              r = e.options,
              s = n.elements.arrow,
              o = n.modifiersData.popperOffsets,
              a = _t(n.placement),
              l = Mt(a),
              c = [Ke, We].indexOf(a) >= 0 ? "height" : "width";
            if (s && o) {
              var u = (function (e, t) {
                  return It(
                    "number" !=
                      typeof (e =
                        "function" == typeof e
                          ? e(
                              Object.assign({}, t.rects, {
                                placement: t.placement,
                              }),
                            )
                          : e)
                      ? e
                      : Pt(e, Ue),
                  );
                })(r.padding, n),
                h = xt(s),
                d = "y" === l ? qe : Ke,
                f = "y" === l ? Ve : We,
                p =
                  n.rects.reference[c] +
                  n.rects.reference[l] -
                  o[l] -
                  n.rects.popper[c],
                g = o[l] - n.rects.reference[l],
                m = Dt(s),
                v = m
                  ? "y" === l
                    ? m.clientHeight || 0
                    : m.clientWidth || 0
                  : 0,
                _ = p / 2 - g / 2,
                b = u[d],
                y = v - h[c] - u[f],
                w = v / 2 - h[c] / 2 + _,
                E = $t(b, w, y),
                A = l;
              n.modifiersData[i] =
                (((t = {})[A] = E), (t.centerOffset = E - w), t);
            }
          },
          effect: function (e) {
            var t = e.state,
              n = e.options.element,
              i = void 0 === n ? "[data-popper-arrow]" : n;
            null != i &&
              ("string" != typeof i ||
                (i = t.elements.popper.querySelector(i))) &&
              Ct(t.elements.popper, i) &&
              (t.elements.arrow = i);
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"],
        };
        function Ft(e) {
          return e.split("-")[1];
        }
        var Bt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
        function Rt(e) {
          var t,
            n = e.popper,
            i = e.popperRect,
            r = e.placement,
            s = e.variation,
            o = e.offsets,
            a = e.position,
            l = e.gpuAcceleration,
            c = e.adaptive,
            u = e.roundOffsets,
            h = e.isFixed,
            d = o.x,
            f = void 0 === d ? 0 : d,
            p = o.y,
            g = void 0 === p ? 0 : p,
            m = "function" == typeof u ? u({ x: f, y: g }) : { x: f, y: g };
          (f = m.x), (g = m.y);
          var v = o.hasOwnProperty("x"),
            _ = o.hasOwnProperty("y"),
            b = Ke,
            y = qe,
            w = window;
          if (c) {
            var E = Dt(n),
              A = "clientHeight",
              O = "clientWidth";
            E === ft(n) &&
              "static" !== Tt((E = kt(n))).position &&
              "absolute" === a &&
              ((A = "scrollHeight"), (O = "scrollWidth")),
              (r === qe || ((r === Ke || r === We) && s === Xe)) &&
                ((y = Ve),
                (g -=
                  (h && E === w && w.visualViewport
                    ? w.visualViewport.height
                    : E[A]) - i.height),
                (g *= l ? 1 : -1)),
              (r !== Ke && ((r !== qe && r !== Ve) || s !== Xe)) ||
                ((b = We),
                (f -=
                  (h && E === w && w.visualViewport
                    ? w.visualViewport.width
                    : E[O]) - i.width),
                (f *= l ? 1 : -1));
          }
          var x,
            C = Object.assign({ position: a }, c && Bt),
            T =
              !0 === u
                ? (function (e, t) {
                    var n = e.x,
                      i = e.y,
                      r = t.devicePixelRatio || 1;
                    return { x: wt(n * r) / r || 0, y: wt(i * r) / r || 0 };
                  })({ x: f, y: g }, ft(n))
                : { x: f, y: g };
          return (
            (f = T.x),
            (g = T.y),
            l
              ? Object.assign(
                  {},
                  C,
                  (((x = {})[y] = _ ? "0" : ""),
                  (x[b] = v ? "0" : ""),
                  (x.transform =
                    (w.devicePixelRatio || 1) <= 1
                      ? "translate(" + f + "px, " + g + "px)"
                      : "translate3d(" + f + "px, " + g + "px, 0)"),
                  x),
                )
              : Object.assign(
                  {},
                  C,
                  (((t = {})[y] = _ ? g + "px" : ""),
                  (t[b] = v ? f + "px" : ""),
                  (t.transform = ""),
                  t),
                )
          );
        }
        const Ht = {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              r = void 0 === i || i,
              s = n.adaptive,
              o = void 0 === s || s,
              a = n.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: _t(t.placement),
                variation: Ft(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                Rt(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  }),
                ),
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  Rt(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    }),
                  ),
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        };
        var qt = { passive: !0 };
        const Vt = {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              n = e.instance,
              i = e.options,
              r = i.scroll,
              s = void 0 === r || r,
              o = i.resize,
              a = void 0 === o || o,
              l = ft(t.elements.popper),
              c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              s &&
                c.forEach(function (e) {
                  e.addEventListener("scroll", n.update, qt);
                }),
              a && l.addEventListener("resize", n.update, qt),
              function () {
                s &&
                  c.forEach(function (e) {
                    e.removeEventListener("scroll", n.update, qt);
                  }),
                  a && l.removeEventListener("resize", n.update, qt);
              }
            );
          },
          data: {},
        };
        var Wt = { left: "right", right: "left", bottom: "top", top: "bottom" };
        function Kt(e) {
          return e.replace(/left|right|bottom|top/g, function (e) {
            return Wt[e];
          });
        }
        var zt = { start: "end", end: "start" };
        function Ut(e) {
          return e.replace(/start|end/g, function (e) {
            return zt[e];
          });
        }
        function Qt(e) {
          var t = ft(e);
          return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
        }
        function Xt(e) {
          return Ot(kt(e)).left + Qt(e).scrollLeft;
        }
        function Yt(e) {
          var t = Tt(e),
            n = t.overflow,
            i = t.overflowX,
            r = t.overflowY;
          return /auto|scroll|overlay|hidden/.test(n + r + i);
        }
        function Jt(e) {
          return ["html", "body", "#document"].indexOf(dt(e)) >= 0
            ? e.ownerDocument.body
            : gt(e) && Yt(e)
            ? e
            : Jt(Nt(e));
        }
        function Zt(e, t) {
          var n;
          void 0 === t && (t = []);
          var i = Jt(e),
            r = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
            s = ft(i),
            o = r ? [s].concat(s.visualViewport || [], Yt(i) ? i : []) : i,
            a = t.concat(o);
          return r ? a : a.concat(Zt(Nt(o)));
        }
        function Gt(e) {
          return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height,
          });
        }
        function en(e, t, n) {
          return t === Je
            ? Gt(
                (function (e, t) {
                  var n = ft(e),
                    i = kt(e),
                    r = n.visualViewport,
                    s = i.clientWidth,
                    o = i.clientHeight,
                    a = 0,
                    l = 0;
                  if (r) {
                    (s = r.width), (o = r.height);
                    var c = At();
                    (c || (!c && "fixed" === t)) &&
                      ((a = r.offsetLeft), (l = r.offsetTop));
                  }
                  return { width: s, height: o, x: a + Xt(e), y: l };
                })(e, n),
              )
            : pt(t)
            ? (function (e, t) {
                var n = Ot(e, !1, "fixed" === t);
                return (
                  (n.top = n.top + e.clientTop),
                  (n.left = n.left + e.clientLeft),
                  (n.bottom = n.top + e.clientHeight),
                  (n.right = n.left + e.clientWidth),
                  (n.width = e.clientWidth),
                  (n.height = e.clientHeight),
                  (n.x = n.left),
                  (n.y = n.top),
                  n
                );
              })(t, n)
            : Gt(
                (function (e) {
                  var t,
                    n = kt(e),
                    i = Qt(e),
                    r = null == (t = e.ownerDocument) ? void 0 : t.body,
                    s = bt(
                      n.scrollWidth,
                      n.clientWidth,
                      r ? r.scrollWidth : 0,
                      r ? r.clientWidth : 0,
                    ),
                    o = bt(
                      n.scrollHeight,
                      n.clientHeight,
                      r ? r.scrollHeight : 0,
                      r ? r.clientHeight : 0,
                    ),
                    a = -i.scrollLeft + Xt(e),
                    l = -i.scrollTop;
                  return (
                    "rtl" === Tt(r || n).direction &&
                      (a += bt(n.clientWidth, r ? r.clientWidth : 0) - s),
                    { width: s, height: o, x: a, y: l }
                  );
                })(kt(e)),
              );
        }
        function tn(e, t, n, i) {
          var r =
              "clippingParents" === t
                ? (function (e) {
                    var t = Zt(Nt(e)),
                      n =
                        ["absolute", "fixed"].indexOf(Tt(e).position) >= 0 &&
                        gt(e)
                          ? Dt(e)
                          : e;
                    return pt(n)
                      ? t.filter(function (e) {
                          return pt(e) && Ct(e, n) && "body" !== dt(e);
                        })
                      : [];
                  })(e)
                : [].concat(t),
            s = [].concat(r, [n]),
            o = s[0],
            a = s.reduce(
              function (t, n) {
                var r = en(e, n, i);
                return (
                  (t.top = bt(r.top, t.top)),
                  (t.right = yt(r.right, t.right)),
                  (t.bottom = yt(r.bottom, t.bottom)),
                  (t.left = bt(r.left, t.left)),
                  t
                );
              },
              en(e, o, i),
            );
          return (
            (a.width = a.right - a.left),
            (a.height = a.bottom - a.top),
            (a.x = a.left),
            (a.y = a.top),
            a
          );
        }
        function nn(e) {
          var t,
            n = e.reference,
            i = e.element,
            r = e.placement,
            s = r ? _t(r) : null,
            o = r ? Ft(r) : null,
            a = n.x + n.width / 2 - i.width / 2,
            l = n.y + n.height / 2 - i.height / 2;
          switch (s) {
            case qe:
              t = { x: a, y: n.y - i.height };
              break;
            case Ve:
              t = { x: a, y: n.y + n.height };
              break;
            case We:
              t = { x: n.x + n.width, y: l };
              break;
            case Ke:
              t = { x: n.x - i.width, y: l };
              break;
            default:
              t = { x: n.x, y: n.y };
          }
          var c = s ? Mt(s) : null;
          if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (o) {
              case Qe:
                t[c] = t[c] - (n[u] / 2 - i[u] / 2);
                break;
              case Xe:
                t[c] = t[c] + (n[u] / 2 - i[u] / 2);
            }
          }
          return t;
        }
        function rn(e, t) {
          void 0 === t && (t = {});
          var n = t,
            i = n.placement,
            r = void 0 === i ? e.placement : i,
            s = n.strategy,
            o = void 0 === s ? e.strategy : s,
            a = n.boundary,
            l = void 0 === a ? Ye : a,
            c = n.rootBoundary,
            u = void 0 === c ? Je : c,
            h = n.elementContext,
            d = void 0 === h ? Ze : h,
            f = n.altBoundary,
            p = void 0 !== f && f,
            g = n.padding,
            m = void 0 === g ? 0 : g,
            v = It("number" != typeof m ? m : Pt(m, Ue)),
            _ = d === Ze ? Ge : Ze,
            b = e.rects.popper,
            y = e.elements[p ? _ : d],
            w = tn(
              pt(y) ? y : y.contextElement || kt(e.elements.popper),
              l,
              u,
              o,
            ),
            E = Ot(e.elements.reference),
            A = nn({
              reference: E,
              element: b,
              strategy: "absolute",
              placement: r,
            }),
            O = Gt(Object.assign({}, b, A)),
            x = d === Ze ? O : E,
            C = {
              top: w.top - x.top + v.top,
              bottom: x.bottom - w.bottom + v.bottom,
              left: w.left - x.left + v.left,
              right: x.right - w.right + v.right,
            },
            T = e.modifiersData.offset;
          if (d === Ze && T) {
            var S = T[r];
            Object.keys(C).forEach(function (e) {
              var t = [We, Ve].indexOf(e) >= 0 ? 1 : -1,
                n = [qe, Ve].indexOf(e) >= 0 ? "y" : "x";
              C[e] += S[n] * t;
            });
          }
          return C;
        }
        function sn(e, t) {
          void 0 === t && (t = {});
          var n = t,
            i = n.placement,
            r = n.boundary,
            s = n.rootBoundary,
            o = n.padding,
            a = n.flipVariations,
            l = n.allowedAutoPlacements,
            c = void 0 === l ? tt : l,
            u = Ft(i),
            h = u
              ? a
                ? et
                : et.filter(function (e) {
                    return Ft(e) === u;
                  })
              : Ue,
            d = h.filter(function (e) {
              return c.indexOf(e) >= 0;
            });
          0 === d.length && (d = h);
          var f = d.reduce(function (t, n) {
            return (
              (t[n] = rn(e, {
                placement: n,
                boundary: r,
                rootBoundary: s,
                padding: o,
              })[_t(n)]),
              t
            );
          }, {});
          return Object.keys(f).sort(function (e, t) {
            return f[e] - f[t];
          });
        }
        const on = {
          name: "flip",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name;
            if (!t.modifiersData[i]._skip) {
              for (
                var r = n.mainAxis,
                  s = void 0 === r || r,
                  o = n.altAxis,
                  a = void 0 === o || o,
                  l = n.fallbackPlacements,
                  c = n.padding,
                  u = n.boundary,
                  h = n.rootBoundary,
                  d = n.altBoundary,
                  f = n.flipVariations,
                  p = void 0 === f || f,
                  g = n.allowedAutoPlacements,
                  m = t.options.placement,
                  v = _t(m),
                  _ =
                    l ||
                    (v !== m && p
                      ? (function (e) {
                          if (_t(e) === ze) return [];
                          var t = Kt(e);
                          return [Ut(e), t, Ut(t)];
                        })(m)
                      : [Kt(m)]),
                  b = [m].concat(_).reduce(function (e, n) {
                    return e.concat(
                      _t(n) === ze
                        ? sn(t, {
                            placement: n,
                            boundary: u,
                            rootBoundary: h,
                            padding: c,
                            flipVariations: p,
                            allowedAutoPlacements: g,
                          })
                        : n,
                    );
                  }, []),
                  y = t.rects.reference,
                  w = t.rects.popper,
                  E = new Map(),
                  A = !0,
                  O = b[0],
                  x = 0;
                x < b.length;
                x++
              ) {
                var C = b[x],
                  T = _t(C),
                  S = Ft(C) === Qe,
                  k = [qe, Ve].indexOf(T) >= 0,
                  N = k ? "width" : "height",
                  L = rn(t, {
                    placement: C,
                    boundary: u,
                    rootBoundary: h,
                    altBoundary: d,
                    padding: c,
                  }),
                  D = k ? (S ? We : Ke) : S ? Ve : qe;
                y[N] > w[N] && (D = Kt(D));
                var M = Kt(D),
                  $ = [];
                if (
                  (s && $.push(L[T] <= 0),
                  a && $.push(L[D] <= 0, L[M] <= 0),
                  $.every(function (e) {
                    return e;
                  }))
                ) {
                  (O = C), (A = !1);
                  break;
                }
                E.set(C, $);
              }
              if (A)
                for (
                  var I = function (e) {
                      var t = b.find(function (t) {
                        var n = E.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (O = t), "break";
                    },
                    P = p ? 3 : 1;
                  P > 0 && "break" !== I(P);
                  P--
                );
              t.placement !== O &&
                ((t.modifiersData[i]._skip = !0),
                (t.placement = O),
                (t.reset = !0));
            }
          },
          requiresIfExists: ["offset"],
          data: { _skip: !1 },
        };
        function an(e, t, n) {
          return (
            void 0 === n && (n = { x: 0, y: 0 }),
            {
              top: e.top - t.height - n.y,
              right: e.right - t.width + n.x,
              bottom: e.bottom - t.height + n.y,
              left: e.left - t.width - n.x,
            }
          );
        }
        function ln(e) {
          return [qe, We, Ve, Ke].some(function (t) {
            return e[t] >= 0;
          });
        }
        const cn = {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              s = t.modifiersData.preventOverflow,
              o = rn(t, { elementContext: "reference" }),
              a = rn(t, { altBoundary: !0 }),
              l = an(o, i),
              c = an(a, r, s),
              u = ln(l),
              h = ln(c);
            (t.modifiersData[n] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: u,
              hasPopperEscaped: h,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": u,
                "data-popper-escaped": h,
              }));
          },
        };
        const un = {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.offset,
              s = void 0 === r ? [0, 0] : r,
              o = tt.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var i = _t(e),
                      r = [Ke, qe].indexOf(i) >= 0 ? -1 : 1,
                      s =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      o = s[0],
                      a = s[1];
                    return (
                      (o = o || 0),
                      (a = (a || 0) * r),
                      [Ke, We].indexOf(i) >= 0 ? { x: a, y: o } : { x: o, y: a }
                    );
                  })(n, t.rects, s)),
                  e
                );
              }, {}),
              a = o[t.placement],
              l = a.x,
              c = a.y;
            null != t.modifiersData.popperOffsets &&
              ((t.modifiersData.popperOffsets.x += l),
              (t.modifiersData.popperOffsets.y += c)),
              (t.modifiersData[i] = o);
          },
        };
        const hn = {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = nn({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        };
        const dn = {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              r = n.mainAxis,
              s = void 0 === r || r,
              o = n.altAxis,
              a = void 0 !== o && o,
              l = n.boundary,
              c = n.rootBoundary,
              u = n.altBoundary,
              h = n.padding,
              d = n.tether,
              f = void 0 === d || d,
              p = n.tetherOffset,
              g = void 0 === p ? 0 : p,
              m = rn(t, {
                boundary: l,
                rootBoundary: c,
                padding: h,
                altBoundary: u,
              }),
              v = _t(t.placement),
              _ = Ft(t.placement),
              b = !_,
              y = Mt(v),
              w = "x" === y ? "y" : "x",
              E = t.modifiersData.popperOffsets,
              A = t.rects.reference,
              O = t.rects.popper,
              x =
                "function" == typeof g
                  ? g(Object.assign({}, t.rects, { placement: t.placement }))
                  : g,
              C =
                "number" == typeof x
                  ? { mainAxis: x, altAxis: x }
                  : Object.assign({ mainAxis: 0, altAxis: 0 }, x),
              T = t.modifiersData.offset
                ? t.modifiersData.offset[t.placement]
                : null,
              S = { x: 0, y: 0 };
            if (E) {
              if (s) {
                var k,
                  N = "y" === y ? qe : Ke,
                  L = "y" === y ? Ve : We,
                  D = "y" === y ? "height" : "width",
                  M = E[y],
                  $ = M + m[N],
                  I = M - m[L],
                  P = f ? -O[D] / 2 : 0,
                  j = _ === Qe ? A[D] : O[D],
                  F = _ === Qe ? -O[D] : -A[D],
                  B = t.elements.arrow,
                  R = f && B ? xt(B) : { width: 0, height: 0 },
                  H = t.modifiersData["arrow#persistent"]
                    ? t.modifiersData["arrow#persistent"].padding
                    : { top: 0, right: 0, bottom: 0, left: 0 },
                  q = H[N],
                  V = H[L],
                  W = $t(0, A[D], R[D]),
                  K = b
                    ? A[D] / 2 - P - W - q - C.mainAxis
                    : j - W - q - C.mainAxis,
                  z = b
                    ? -A[D] / 2 + P + W + V + C.mainAxis
                    : F + W + V + C.mainAxis,
                  U = t.elements.arrow && Dt(t.elements.arrow),
                  Q = U
                    ? "y" === y
                      ? U.clientTop || 0
                      : U.clientLeft || 0
                    : 0,
                  X = null != (k = null == T ? void 0 : T[y]) ? k : 0,
                  Y = M + z - X,
                  J = $t(f ? yt($, M + K - X - Q) : $, M, f ? bt(I, Y) : I);
                (E[y] = J), (S[y] = J - M);
              }
              if (a) {
                var Z,
                  G = "x" === y ? qe : Ke,
                  ee = "x" === y ? Ve : We,
                  te = E[w],
                  ne = "y" === w ? "height" : "width",
                  ie = te + m[G],
                  re = te - m[ee],
                  se = -1 !== [qe, Ke].indexOf(v),
                  oe = null != (Z = null == T ? void 0 : T[w]) ? Z : 0,
                  ae = se ? ie : te - A[ne] - O[ne] - oe + C.altAxis,
                  le = se ? te + A[ne] + O[ne] - oe - C.altAxis : re,
                  ce =
                    f && se
                      ? (function (e, t, n) {
                          var i = $t(e, t, n);
                          return i > n ? n : i;
                        })(ae, te, le)
                      : $t(f ? ae : ie, te, f ? le : re);
                (E[w] = ce), (S[w] = ce - te);
              }
              t.modifiersData[i] = S;
            }
          },
          requiresIfExists: ["offset"],
        };
        function fn(e, t, n) {
          void 0 === n && (n = !1);
          var i,
            r,
            s = gt(t),
            o =
              gt(t) &&
              (function (e) {
                var t = e.getBoundingClientRect(),
                  n = wt(t.width) / e.offsetWidth || 1,
                  i = wt(t.height) / e.offsetHeight || 1;
                return 1 !== n || 1 !== i;
              })(t),
            a = kt(t),
            l = Ot(e, o, n),
            c = { scrollLeft: 0, scrollTop: 0 },
            u = { x: 0, y: 0 };
          return (
            (s || (!s && !n)) &&
              (("body" !== dt(t) || Yt(a)) &&
                (c =
                  (i = t) !== ft(i) && gt(i)
                    ? { scrollLeft: (r = i).scrollLeft, scrollTop: r.scrollTop }
                    : Qt(i)),
              gt(t)
                ? (((u = Ot(t, !0)).x += t.clientLeft), (u.y += t.clientTop))
                : a && (u.x = Xt(a))),
            {
              x: l.left + c.scrollLeft - u.x,
              y: l.top + c.scrollTop - u.y,
              width: l.width,
              height: l.height,
            }
          );
        }
        function pn(e) {
          var t = new Map(),
            n = new Set(),
            i = [];
          function r(e) {
            n.add(e.name),
              []
                .concat(e.requires || [], e.requiresIfExists || [])
                .forEach(function (e) {
                  if (!n.has(e)) {
                    var i = t.get(e);
                    i && r(i);
                  }
                }),
              i.push(e);
          }
          return (
            e.forEach(function (e) {
              t.set(e.name, e);
            }),
            e.forEach(function (e) {
              n.has(e.name) || r(e);
            }),
            i
          );
        }
        var gn = { placement: "bottom", modifiers: [], strategy: "absolute" };
        function mn() {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return !t.some(function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
          });
        }
        function vn(e) {
          void 0 === e && (e = {});
          var t = e,
            n = t.defaultModifiers,
            i = void 0 === n ? [] : n,
            r = t.defaultOptions,
            s = void 0 === r ? gn : r;
          return function (e, t, n) {
            void 0 === n && (n = s);
            var r,
              o,
              a = {
                placement: "bottom",
                orderedModifiers: [],
                options: Object.assign({}, gn, s),
                modifiersData: {},
                elements: { reference: e, popper: t },
                attributes: {},
                styles: {},
              },
              l = [],
              c = !1,
              u = {
                state: a,
                setOptions: function (n) {
                  var r = "function" == typeof n ? n(a.options) : n;
                  h(),
                    (a.options = Object.assign({}, s, a.options, r)),
                    (a.scrollParents = {
                      reference: pt(e)
                        ? Zt(e)
                        : e.contextElement
                        ? Zt(e.contextElement)
                        : [],
                      popper: Zt(t),
                    });
                  var o,
                    c,
                    d = (function (e) {
                      var t = pn(e);
                      return ht.reduce(function (e, n) {
                        return e.concat(
                          t.filter(function (e) {
                            return e.phase === n;
                          }),
                        );
                      }, []);
                    })(
                      ((o = [].concat(i, a.options.modifiers)),
                      (c = o.reduce(function (e, t) {
                        var n = e[t.name];
                        return (
                          (e[t.name] = n
                            ? Object.assign({}, n, t, {
                                options: Object.assign(
                                  {},
                                  n.options,
                                  t.options,
                                ),
                                data: Object.assign({}, n.data, t.data),
                              })
                            : t),
                          e
                        );
                      }, {})),
                      Object.keys(c).map(function (e) {
                        return c[e];
                      })),
                    );
                  return (
                    (a.orderedModifiers = d.filter(function (e) {
                      return e.enabled;
                    })),
                    a.orderedModifiers.forEach(function (e) {
                      var t = e.name,
                        n = e.options,
                        i = void 0 === n ? {} : n,
                        r = e.effect;
                      if ("function" == typeof r) {
                        var s = r({
                            state: a,
                            name: t,
                            instance: u,
                            options: i,
                          }),
                          o = function () {};
                        l.push(s || o);
                      }
                    }),
                    u.update()
                  );
                },
                forceUpdate: function () {
                  if (!c) {
                    var e = a.elements,
                      t = e.reference,
                      n = e.popper;
                    if (mn(t, n)) {
                      (a.rects = {
                        reference: fn(t, Dt(n), "fixed" === a.options.strategy),
                        popper: xt(n),
                      }),
                        (a.reset = !1),
                        (a.placement = a.options.placement),
                        a.orderedModifiers.forEach(function (e) {
                          return (a.modifiersData[e.name] = Object.assign(
                            {},
                            e.data,
                          ));
                        });
                      for (var i = 0; i < a.orderedModifiers.length; i++)
                        if (!0 !== a.reset) {
                          var r = a.orderedModifiers[i],
                            s = r.fn,
                            o = r.options,
                            l = void 0 === o ? {} : o,
                            h = r.name;
                          "function" == typeof s &&
                            (a =
                              s({
                                state: a,
                                options: l,
                                name: h,
                                instance: u,
                              }) || a);
                        } else (a.reset = !1), (i = -1);
                    }
                  }
                },
                update:
                  ((r = function () {
                    return new Promise(function (e) {
                      u.forceUpdate(), e(a);
                    });
                  }),
                  function () {
                    return (
                      o ||
                        (o = new Promise(function (e) {
                          Promise.resolve().then(function () {
                            (o = void 0), e(r());
                          });
                        })),
                      o
                    );
                  }),
                destroy: function () {
                  h(), (c = !0);
                },
              };
            if (!mn(e, t)) return u;
            function h() {
              l.forEach(function (e) {
                return e();
              }),
                (l = []);
            }
            return (
              u.setOptions(n).then(function (e) {
                !c && n.onFirstUpdate && n.onFirstUpdate(e);
              }),
              u
            );
          };
        }
        var _n = vn(),
          bn = vn({ defaultModifiers: [Vt, hn, Ht, vt] }),
          yn = vn({ defaultModifiers: [Vt, hn, Ht, vt, un, on, dn, jt, cn] });
        const wn = Object.freeze(
            Object.defineProperty(
              {
                __proto__: null,
                afterMain: at,
                afterRead: rt,
                afterWrite: ut,
                applyStyles: vt,
                arrow: jt,
                auto: ze,
                basePlacements: Ue,
                beforeMain: st,
                beforeRead: nt,
                beforeWrite: lt,
                bottom: Ve,
                clippingParents: Ye,
                computeStyles: Ht,
                createPopper: yn,
                createPopperBase: _n,
                createPopperLite: bn,
                detectOverflow: rn,
                end: Xe,
                eventListeners: Vt,
                flip: on,
                hide: cn,
                left: Ke,
                main: ot,
                modifierPhases: ht,
                offset: un,
                placements: tt,
                popper: Ze,
                popperGenerator: vn,
                popperOffsets: hn,
                preventOverflow: dn,
                read: it,
                reference: Ge,
                right: We,
                start: Qe,
                top: qe,
                variationPlacements: et,
                viewport: Je,
                write: ct,
              },
              Symbol.toStringTag,
              { value: "Module" },
            ),
          ),
          En = "dropdown",
          An = ".bs.dropdown",
          On = ".data-api",
          xn = "ArrowUp",
          Cn = "ArrowDown",
          Tn = `hide${An}`,
          Sn = `hidden${An}`,
          kn = `show${An}`,
          Nn = `shown${An}`,
          Ln = `click${An}${On}`,
          Dn = `keydown${An}${On}`,
          Mn = `keyup${An}${On}`,
          $n = "show",
          In = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
          Pn = `${In}.${$n}`,
          jn = ".dropdown-menu",
          Fn = p() ? "top-end" : "top-start",
          Bn = p() ? "top-start" : "top-end",
          Rn = p() ? "bottom-end" : "bottom-start",
          Hn = p() ? "bottom-start" : "bottom-end",
          qn = p() ? "left-start" : "right-start",
          Vn = p() ? "right-start" : "left-start",
          Wn = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle",
          },
          Kn = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)",
          };
        class zn extends R {
          constructor(e, t) {
            super(e, t),
              (this._popper = null),
              (this._parent = this._element.parentNode),
              (this._menu =
                q.next(this._element, jn)[0] ||
                q.prev(this._element, jn)[0] ||
                q.findOne(jn, this._parent)),
              (this._inNavbar = this._detectNavbar());
          }
          static get Default() {
            return Wn;
          }
          static get DefaultType() {
            return Kn;
          }
          static get NAME() {
            return En;
          }
          toggle() {
            return this._isShown() ? this.hide() : this.show();
          }
          show() {
            if (l(this._element) || this._isShown()) return;
            const e = { relatedTarget: this._element };
            if (!$.trigger(this._element, kn, e).defaultPrevented) {
              if (
                (this._createPopper(),
                "ontouchstart" in document.documentElement &&
                  !this._parent.closest(".navbar-nav"))
              )
                for (const e of [].concat(...document.body.children))
                  $.on(e, "mouseover", u);
              this._element.focus(),
                this._element.setAttribute("aria-expanded", !0),
                this._menu.classList.add($n),
                this._element.classList.add($n),
                $.trigger(this._element, Nn, e);
            }
          }
          hide() {
            if (l(this._element) || !this._isShown()) return;
            const e = { relatedTarget: this._element };
            this._completeHide(e);
          }
          dispose() {
            this._popper && this._popper.destroy(), super.dispose();
          }
          update() {
            (this._inNavbar = this._detectNavbar()),
              this._popper && this._popper.update();
          }
          _completeHide(e) {
            if (!$.trigger(this._element, Tn, e).defaultPrevented) {
              if ("ontouchstart" in document.documentElement)
                for (const e of [].concat(...document.body.children))
                  $.off(e, "mouseover", u);
              this._popper && this._popper.destroy(),
                this._menu.classList.remove($n),
                this._element.classList.remove($n),
                this._element.setAttribute("aria-expanded", "false"),
                F.removeDataAttribute(this._menu, "popper"),
                $.trigger(this._element, Sn, e);
            }
          }
          _getConfig(e) {
            if (
              "object" == typeof (e = super._getConfig(e)).reference &&
              !s(e.reference) &&
              "function" != typeof e.reference.getBoundingClientRect
            )
              throw new TypeError(
                `${En.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`,
              );
            return e;
          }
          _createPopper() {
            if (void 0 === wn)
              throw new TypeError(
                "Bootstrap's dropdowns require Popper (https://popper.js.org)",
              );
            let e = this._element;
            "parent" === this._config.reference
              ? (e = this._parent)
              : s(this._config.reference)
              ? (e = o(this._config.reference))
              : "object" == typeof this._config.reference &&
                (e = this._config.reference);
            const t = this._getPopperConfig();
            this._popper = yn(e, this._menu, t);
          }
          _isShown() {
            return this._menu.classList.contains($n);
          }
          _getPlacement() {
            const e = this._parent;
            if (e.classList.contains("dropend")) return qn;
            if (e.classList.contains("dropstart")) return Vn;
            if (e.classList.contains("dropup-center")) return "top";
            if (e.classList.contains("dropdown-center")) return "bottom";
            const t =
              "end" ===
              getComputedStyle(this._menu)
                .getPropertyValue("--bs-position")
                .trim();
            return e.classList.contains("dropup") ? (t ? Bn : Fn) : t ? Hn : Rn;
          }
          _detectNavbar() {
            return null !== this._element.closest(".navbar");
          }
          _getOffset() {
            const { offset: e } = this._config;
            return "string" == typeof e
              ? e.split(",").map((e) => Number.parseInt(e, 10))
              : "function" == typeof e
              ? (t) => e(t, this._element)
              : e;
          }
          _getPopperConfig() {
            const e = {
              placement: this._getPlacement(),
              modifiers: [
                {
                  name: "preventOverflow",
                  options: { boundary: this._config.boundary },
                },
                { name: "offset", options: { offset: this._getOffset() } },
              ],
            };
            return (
              (this._inNavbar || "static" === this._config.display) &&
                (F.setDataAttribute(this._menu, "popper", "static"),
                (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
              { ...e, ...m(this._config.popperConfig, [e]) }
            );
          }
          _selectMenuItem({ key: e, target: t }) {
            const n = q
              .find(
                ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                this._menu,
              )
              .filter((e) => a(e));
            n.length && _(n, t, e === Cn, !n.includes(t)).focus();
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = zn.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e])
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
          static clearMenus(e) {
            if (2 === e.button || ("keyup" === e.type && "Tab" !== e.key))
              return;
            const t = q.find(Pn);
            for (const n of t) {
              const t = zn.getInstance(n);
              if (!t || !1 === t._config.autoClose) continue;
              const i = e.composedPath(),
                r = i.includes(t._menu);
              if (
                i.includes(t._element) ||
                ("inside" === t._config.autoClose && !r) ||
                ("outside" === t._config.autoClose && r)
              )
                continue;
              if (
                t._menu.contains(e.target) &&
                (("keyup" === e.type && "Tab" === e.key) ||
                  /input|select|option|textarea|form/i.test(e.target.tagName))
              )
                continue;
              const s = { relatedTarget: t._element };
              "click" === e.type && (s.clickEvent = e), t._completeHide(s);
            }
          }
          static dataApiKeydownHandler(e) {
            const t = /input|textarea/i.test(e.target.tagName),
              n = "Escape" === e.key,
              i = [xn, Cn].includes(e.key);
            if (!i && !n) return;
            if (t && !n) return;
            e.preventDefault();
            const r = this.matches(In)
                ? this
                : q.prev(this, In)[0] ||
                  q.next(this, In)[0] ||
                  q.findOne(In, e.delegateTarget.parentNode),
              s = zn.getOrCreateInstance(r);
            if (i)
              return e.stopPropagation(), s.show(), void s._selectMenuItem(e);
            s._isShown() && (e.stopPropagation(), s.hide(), r.focus());
          }
        }
        $.on(document, Dn, In, zn.dataApiKeydownHandler),
          $.on(document, Dn, jn, zn.dataApiKeydownHandler),
          $.on(document, Ln, zn.clearMenus),
          $.on(document, Mn, zn.clearMenus),
          $.on(document, Ln, In, function (e) {
            e.preventDefault(), zn.getOrCreateInstance(this).toggle();
          }),
          g(zn);
        const Un = "backdrop",
          Qn = "show",
          Xn = `mousedown.bs.${Un}`,
          Yn = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body",
          },
          Jn = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)",
          };
        class Zn extends B {
          constructor(e) {
            super(),
              (this._config = this._getConfig(e)),
              (this._isAppended = !1),
              (this._element = null);
          }
          static get Default() {
            return Yn;
          }
          static get DefaultType() {
            return Jn;
          }
          static get NAME() {
            return Un;
          }
          show(e) {
            if (!this._config.isVisible) return void m(e);
            this._append();
            const t = this._getElement();
            this._config.isAnimated && h(t),
              t.classList.add(Qn),
              this._emulateAnimation(() => {
                m(e);
              });
          }
          hide(e) {
            this._config.isVisible
              ? (this._getElement().classList.remove(Qn),
                this._emulateAnimation(() => {
                  this.dispose(), m(e);
                }))
              : m(e);
          }
          dispose() {
            this._isAppended &&
              ($.off(this._element, Xn),
              this._element.remove(),
              (this._isAppended = !1));
          }
          _getElement() {
            if (!this._element) {
              const e = document.createElement("div");
              (e.className = this._config.className),
                this._config.isAnimated && e.classList.add("fade"),
                (this._element = e);
            }
            return this._element;
          }
          _configAfterMerge(e) {
            return (e.rootElement = o(e.rootElement)), e;
          }
          _append() {
            if (this._isAppended) return;
            const e = this._getElement();
            this._config.rootElement.append(e),
              $.on(e, Xn, () => {
                m(this._config.clickCallback);
              }),
              (this._isAppended = !0);
          }
          _emulateAnimation(e) {
            v(e, this._getElement(), this._config.isAnimated);
          }
        }
        const Gn = ".bs.focustrap",
          ei = `focusin${Gn}`,
          ti = `keydown.tab${Gn}`,
          ni = "backward",
          ii = { autofocus: !0, trapElement: null },
          ri = { autofocus: "boolean", trapElement: "element" };
        class si extends B {
          constructor(e) {
            super(),
              (this._config = this._getConfig(e)),
              (this._isActive = !1),
              (this._lastTabNavDirection = null);
          }
          static get Default() {
            return ii;
          }
          static get DefaultType() {
            return ri;
          }
          static get NAME() {
            return "focustrap";
          }
          activate() {
            this._isActive ||
              (this._config.autofocus && this._config.trapElement.focus(),
              $.off(document, Gn),
              $.on(document, ei, (e) => this._handleFocusin(e)),
              $.on(document, ti, (e) => this._handleKeydown(e)),
              (this._isActive = !0));
          }
          deactivate() {
            this._isActive && ((this._isActive = !1), $.off(document, Gn));
          }
          _handleFocusin(e) {
            const { trapElement: t } = this._config;
            if (e.target === document || e.target === t || t.contains(e.target))
              return;
            const n = q.focusableChildren(t);
            0 === n.length
              ? t.focus()
              : this._lastTabNavDirection === ni
              ? n[n.length - 1].focus()
              : n[0].focus();
          }
          _handleKeydown(e) {
            "Tab" === e.key &&
              (this._lastTabNavDirection = e.shiftKey ? ni : "forward");
          }
        }
        const oi = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          ai = ".sticky-top",
          li = "padding-right",
          ci = "margin-right";
        class ui {
          constructor() {
            this._element = document.body;
          }
          getWidth() {
            const e = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - e);
          }
          hide() {
            const e = this.getWidth();
            this._disableOverFlow(),
              this._setElementAttributes(this._element, li, (t) => t + e),
              this._setElementAttributes(oi, li, (t) => t + e),
              this._setElementAttributes(ai, ci, (t) => t - e);
          }
          reset() {
            this._resetElementAttributes(this._element, "overflow"),
              this._resetElementAttributes(this._element, li),
              this._resetElementAttributes(oi, li),
              this._resetElementAttributes(ai, ci);
          }
          isOverflowing() {
            return this.getWidth() > 0;
          }
          _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"),
              (this._element.style.overflow = "hidden");
          }
          _setElementAttributes(e, t, n) {
            const i = this.getWidth();
            this._applyManipulationCallback(e, (e) => {
              if (e !== this._element && window.innerWidth > e.clientWidth + i)
                return;
              this._saveInitialAttribute(e, t);
              const r = window.getComputedStyle(e).getPropertyValue(t);
              e.style.setProperty(t, `${n(Number.parseFloat(r))}px`);
            });
          }
          _saveInitialAttribute(e, t) {
            const n = e.style.getPropertyValue(t);
            n && F.setDataAttribute(e, t, n);
          }
          _resetElementAttributes(e, t) {
            this._applyManipulationCallback(e, (e) => {
              const n = F.getDataAttribute(e, t);
              null !== n
                ? (F.removeDataAttribute(e, t), e.style.setProperty(t, n))
                : e.style.removeProperty(t);
            });
          }
          _applyManipulationCallback(e, t) {
            if (s(e)) t(e);
            else for (const n of q.find(e, this._element)) t(n);
          }
        }
        const hi = ".bs.modal",
          di = `hide${hi}`,
          fi = `hidePrevented${hi}`,
          pi = `hidden${hi}`,
          gi = `show${hi}`,
          mi = `shown${hi}`,
          vi = `resize${hi}`,
          _i = `click.dismiss${hi}`,
          bi = `mousedown.dismiss${hi}`,
          yi = `keydown.dismiss${hi}`,
          wi = `click${hi}.data-api`,
          Ei = "modal-open",
          Ai = "show",
          Oi = "modal-static",
          xi = { backdrop: !0, focus: !0, keyboard: !0 },
          Ci = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean",
          };
        class Ti extends R {
          constructor(e, t) {
            super(e, t),
              (this._dialog = q.findOne(".modal-dialog", this._element)),
              (this._backdrop = this._initializeBackDrop()),
              (this._focustrap = this._initializeFocusTrap()),
              (this._isShown = !1),
              (this._isTransitioning = !1),
              (this._scrollBar = new ui()),
              this._addEventListeners();
          }
          static get Default() {
            return xi;
          }
          static get DefaultType() {
            return Ci;
          }
          static get NAME() {
            return "modal";
          }
          toggle(e) {
            return this._isShown ? this.hide() : this.show(e);
          }
          show(e) {
            this._isShown ||
              this._isTransitioning ||
              $.trigger(this._element, gi, { relatedTarget: e })
                .defaultPrevented ||
              ((this._isShown = !0),
              (this._isTransitioning = !0),
              this._scrollBar.hide(),
              document.body.classList.add(Ei),
              this._adjustDialog(),
              this._backdrop.show(() => this._showElement(e)));
          }
          hide() {
            this._isShown &&
              !this._isTransitioning &&
              ($.trigger(this._element, di).defaultPrevented ||
                ((this._isShown = !1),
                (this._isTransitioning = !0),
                this._focustrap.deactivate(),
                this._element.classList.remove(Ai),
                this._queueCallback(
                  () => this._hideModal(),
                  this._element,
                  this._isAnimated(),
                )));
          }
          dispose() {
            $.off(window, hi),
              $.off(this._dialog, hi),
              this._backdrop.dispose(),
              this._focustrap.deactivate(),
              super.dispose();
          }
          handleUpdate() {
            this._adjustDialog();
          }
          _initializeBackDrop() {
            return new Zn({
              isVisible: Boolean(this._config.backdrop),
              isAnimated: this._isAnimated(),
            });
          }
          _initializeFocusTrap() {
            return new si({ trapElement: this._element });
          }
          _showElement(e) {
            document.body.contains(this._element) ||
              document.body.append(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              this._element.setAttribute("aria-modal", !0),
              this._element.setAttribute("role", "dialog"),
              (this._element.scrollTop = 0);
            const t = q.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0),
              h(this._element),
              this._element.classList.add(Ai);
            this._queueCallback(
              () => {
                this._config.focus && this._focustrap.activate(),
                  (this._isTransitioning = !1),
                  $.trigger(this._element, mi, { relatedTarget: e });
              },
              this._dialog,
              this._isAnimated(),
            );
          }
          _addEventListeners() {
            $.on(this._element, yi, (e) => {
              "Escape" === e.key &&
                (this._config.keyboard
                  ? this.hide()
                  : this._triggerBackdropTransition());
            }),
              $.on(window, vi, () => {
                this._isShown && !this._isTransitioning && this._adjustDialog();
              }),
              $.on(this._element, bi, (e) => {
                $.one(this._element, _i, (t) => {
                  this._element === e.target &&
                    this._element === t.target &&
                    ("static" !== this._config.backdrop
                      ? this._config.backdrop && this.hide()
                      : this._triggerBackdropTransition());
                });
              });
          }
          _hideModal() {
            (this._element.style.display = "none"),
              this._element.setAttribute("aria-hidden", !0),
              this._element.removeAttribute("aria-modal"),
              this._element.removeAttribute("role"),
              (this._isTransitioning = !1),
              this._backdrop.hide(() => {
                document.body.classList.remove(Ei),
                  this._resetAdjustments(),
                  this._scrollBar.reset(),
                  $.trigger(this._element, pi);
              });
          }
          _isAnimated() {
            return this._element.classList.contains("fade");
          }
          _triggerBackdropTransition() {
            if ($.trigger(this._element, fi).defaultPrevented) return;
            const e =
                this._element.scrollHeight >
                document.documentElement.clientHeight,
              t = this._element.style.overflowY;
            "hidden" === t ||
              this._element.classList.contains(Oi) ||
              (e || (this._element.style.overflowY = "hidden"),
              this._element.classList.add(Oi),
              this._queueCallback(() => {
                this._element.classList.remove(Oi),
                  this._queueCallback(() => {
                    this._element.style.overflowY = t;
                  }, this._dialog);
              }, this._dialog),
              this._element.focus());
          }
          _adjustDialog() {
            const e =
                this._element.scrollHeight >
                document.documentElement.clientHeight,
              t = this._scrollBar.getWidth(),
              n = t > 0;
            if (n && !e) {
              const e = p() ? "paddingLeft" : "paddingRight";
              this._element.style[e] = `${t}px`;
            }
            if (!n && e) {
              const e = p() ? "paddingRight" : "paddingLeft";
              this._element.style[e] = `${t}px`;
            }
          }
          _resetAdjustments() {
            (this._element.style.paddingLeft = ""),
              (this._element.style.paddingRight = "");
          }
          static jQueryInterface(e, t) {
            return this.each(function () {
              const n = Ti.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === n[e])
                  throw new TypeError(`No method named "${e}"`);
                n[e](t);
              }
            });
          }
        }
        $.on(document, wi, '[data-bs-toggle="modal"]', function (e) {
          const t = q.getElementFromSelector(this);
          ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            $.one(t, gi, (e) => {
              e.defaultPrevented ||
                $.one(t, pi, () => {
                  a(this) && this.focus();
                });
            });
          const n = q.findOne(".modal.show");
          n && Ti.getInstance(n).hide(), Ti.getOrCreateInstance(t).toggle(this);
        }),
          V(Ti),
          g(Ti);
        const Si = ".bs.offcanvas",
          ki = ".data-api",
          Ni = `load${Si}${ki}`,
          Li = "show",
          Di = "showing",
          Mi = "hiding",
          $i = ".offcanvas.show",
          Ii = `show${Si}`,
          Pi = `shown${Si}`,
          ji = `hide${Si}`,
          Fi = `hidePrevented${Si}`,
          Bi = `hidden${Si}`,
          Ri = `resize${Si}`,
          Hi = `click${Si}${ki}`,
          qi = `keydown.dismiss${Si}`,
          Vi = { backdrop: !0, keyboard: !0, scroll: !1 },
          Wi = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean",
          };
        class Ki extends R {
          constructor(e, t) {
            super(e, t),
              (this._isShown = !1),
              (this._backdrop = this._initializeBackDrop()),
              (this._focustrap = this._initializeFocusTrap()),
              this._addEventListeners();
          }
          static get Default() {
            return Vi;
          }
          static get DefaultType() {
            return Wi;
          }
          static get NAME() {
            return "offcanvas";
          }
          toggle(e) {
            return this._isShown ? this.hide() : this.show(e);
          }
          show(e) {
            if (this._isShown) return;
            if (
              $.trigger(this._element, Ii, { relatedTarget: e })
                .defaultPrevented
            )
              return;
            (this._isShown = !0),
              this._backdrop.show(),
              this._config.scroll || new ui().hide(),
              this._element.setAttribute("aria-modal", !0),
              this._element.setAttribute("role", "dialog"),
              this._element.classList.add(Di);
            this._queueCallback(
              () => {
                (this._config.scroll && !this._config.backdrop) ||
                  this._focustrap.activate(),
                  this._element.classList.add(Li),
                  this._element.classList.remove(Di),
                  $.trigger(this._element, Pi, { relatedTarget: e });
              },
              this._element,
              !0,
            );
          }
          hide() {
            if (!this._isShown) return;
            if ($.trigger(this._element, ji).defaultPrevented) return;
            this._focustrap.deactivate(),
              this._element.blur(),
              (this._isShown = !1),
              this._element.classList.add(Mi),
              this._backdrop.hide();
            this._queueCallback(
              () => {
                this._element.classList.remove(Li, Mi),
                  this._element.removeAttribute("aria-modal"),
                  this._element.removeAttribute("role"),
                  this._config.scroll || new ui().reset(),
                  $.trigger(this._element, Bi);
              },
              this._element,
              !0,
            );
          }
          dispose() {
            this._backdrop.dispose(),
              this._focustrap.deactivate(),
              super.dispose();
          }
          _initializeBackDrop() {
            const e = Boolean(this._config.backdrop);
            return new Zn({
              className: "offcanvas-backdrop",
              isVisible: e,
              isAnimated: !0,
              rootElement: this._element.parentNode,
              clickCallback: e
                ? () => {
                    "static" !== this._config.backdrop
                      ? this.hide()
                      : $.trigger(this._element, Fi);
                  }
                : null,
            });
          }
          _initializeFocusTrap() {
            return new si({ trapElement: this._element });
          }
          _addEventListeners() {
            $.on(this._element, qi, (e) => {
              "Escape" === e.key &&
                (this._config.keyboard
                  ? this.hide()
                  : $.trigger(this._element, Fi));
            });
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Ki.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e](this);
              }
            });
          }
        }
        $.on(document, Hi, '[data-bs-toggle="offcanvas"]', function (e) {
          const t = q.getElementFromSelector(this);
          if (
            (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            l(this))
          )
            return;
          $.one(t, Bi, () => {
            a(this) && this.focus();
          });
          const n = q.findOne($i);
          n && n !== t && Ki.getInstance(n).hide(),
            Ki.getOrCreateInstance(t).toggle(this);
        }),
          $.on(window, Ni, () => {
            for (const e of q.find($i)) Ki.getOrCreateInstance(e).show();
          }),
          $.on(window, Ri, () => {
            for (const e of q.find(
              "[aria-modal][class*=show][class*=offcanvas-]",
            ))
              "fixed" !== getComputedStyle(e).position &&
                Ki.getOrCreateInstance(e).hide();
          }),
          V(Ki),
          g(Ki);
        const zi = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            dd: [],
            div: [],
            dl: [],
            dt: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: [],
          },
          Ui = new Set([
            "background",
            "cite",
            "href",
            "itemtype",
            "longdesc",
            "poster",
            "src",
            "xlink:href",
          ]),
          Qi = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
          Xi = (e, t) => {
            const n = e.nodeName.toLowerCase();
            return t.includes(n)
              ? !Ui.has(n) || Boolean(Qi.test(e.nodeValue))
              : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
          };
        const Yi = {
            allowList: zi,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>",
          },
          Ji = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string",
          },
          Zi = {
            entry: "(string|element|function|null)",
            selector: "(string|element)",
          };
        class Gi extends B {
          constructor(e) {
            super(), (this._config = this._getConfig(e));
          }
          static get Default() {
            return Yi;
          }
          static get DefaultType() {
            return Ji;
          }
          static get NAME() {
            return "TemplateFactory";
          }
          getContent() {
            return Object.values(this._config.content)
              .map((e) => this._resolvePossibleFunction(e))
              .filter(Boolean);
          }
          hasContent() {
            return this.getContent().length > 0;
          }
          changeContent(e) {
            return (
              this._checkContent(e),
              (this._config.content = { ...this._config.content, ...e }),
              this
            );
          }
          toHtml() {
            const e = document.createElement("div");
            e.innerHTML = this._maybeSanitize(this._config.template);
            for (const [t, n] of Object.entries(this._config.content))
              this._setContent(e, n, t);
            const t = e.children[0],
              n = this._resolvePossibleFunction(this._config.extraClass);
            return n && t.classList.add(...n.split(" ")), t;
          }
          _typeCheckConfig(e) {
            super._typeCheckConfig(e), this._checkContent(e.content);
          }
          _checkContent(e) {
            for (const [t, n] of Object.entries(e))
              super._typeCheckConfig({ selector: t, entry: n }, Zi);
          }
          _setContent(e, t, n) {
            const i = q.findOne(n, e);
            i &&
              ((t = this._resolvePossibleFunction(t))
                ? s(t)
                  ? this._putElementInTemplate(o(t), i)
                  : this._config.html
                  ? (i.innerHTML = this._maybeSanitize(t))
                  : (i.textContent = t)
                : i.remove());
          }
          _maybeSanitize(e) {
            return this._config.sanitize
              ? (function (e, t, n) {
                  if (!e.length) return e;
                  if (n && "function" == typeof n) return n(e);
                  const i = new window.DOMParser().parseFromString(
                      e,
                      "text/html",
                    ),
                    r = [].concat(...i.body.querySelectorAll("*"));
                  for (const e of r) {
                    const n = e.nodeName.toLowerCase();
                    if (!Object.keys(t).includes(n)) {
                      e.remove();
                      continue;
                    }
                    const i = [].concat(...e.attributes),
                      r = [].concat(t["*"] || [], t[n] || []);
                    for (const t of i)
                      Xi(t, r) || e.removeAttribute(t.nodeName);
                  }
                  return i.body.innerHTML;
                })(e, this._config.allowList, this._config.sanitizeFn)
              : e;
          }
          _resolvePossibleFunction(e) {
            return m(e, [this]);
          }
          _putElementInTemplate(e, t) {
            if (this._config.html) return (t.innerHTML = ""), void t.append(e);
            t.textContent = e.textContent;
          }
        }
        const er = new Set(["sanitize", "allowList", "sanitizeFn"]),
          tr = "fade",
          nr = "show",
          ir = ".modal",
          rr = "hide.bs.modal",
          sr = "hover",
          or = "focus",
          ar = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: p() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: p() ? "right" : "left",
          },
          lr = {
            allowList: zi,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 6],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template:
              '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus",
          },
          cr = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
          };
        class ur extends R {
          constructor(e, t) {
            if (void 0 === wn)
              throw new TypeError(
                "Bootstrap's tooltips require Popper (https://popper.js.org)",
              );
            super(e, t),
              (this._isEnabled = !0),
              (this._timeout = 0),
              (this._isHovered = null),
              (this._activeTrigger = {}),
              (this._popper = null),
              (this._templateFactory = null),
              (this._newContent = null),
              (this.tip = null),
              this._setListeners(),
              this._config.selector || this._fixTitle();
          }
          static get Default() {
            return lr;
          }
          static get DefaultType() {
            return cr;
          }
          static get NAME() {
            return "tooltip";
          }
          enable() {
            this._isEnabled = !0;
          }
          disable() {
            this._isEnabled = !1;
          }
          toggleEnabled() {
            this._isEnabled = !this._isEnabled;
          }
          toggle() {
            this._isEnabled &&
              ((this._activeTrigger.click = !this._activeTrigger.click),
              this._isShown() ? this._leave() : this._enter());
          }
          dispose() {
            clearTimeout(this._timeout),
              $.off(this._element.closest(ir), rr, this._hideModalHandler),
              this._element.getAttribute("data-bs-original-title") &&
                this._element.setAttribute(
                  "title",
                  this._element.getAttribute("data-bs-original-title"),
                ),
              this._disposePopper(),
              super.dispose();
          }
          show() {
            if ("none" === this._element.style.display)
              throw new Error("Please use show on visible elements");
            if (!this._isWithContent() || !this._isEnabled) return;
            const e = $.trigger(
                this._element,
                this.constructor.eventName("show"),
              ),
              t = (
                c(this._element) || this._element.ownerDocument.documentElement
              ).contains(this._element);
            if (e.defaultPrevented || !t) return;
            this._disposePopper();
            const n = this._getTipElement();
            this._element.setAttribute(
              "aria-describedby",
              n.getAttribute("id"),
            );
            const { container: i } = this._config;
            if (
              (this._element.ownerDocument.documentElement.contains(this.tip) ||
                (i.append(n),
                $.trigger(
                  this._element,
                  this.constructor.eventName("inserted"),
                )),
              (this._popper = this._createPopper(n)),
              n.classList.add(nr),
              "ontouchstart" in document.documentElement)
            )
              for (const e of [].concat(...document.body.children))
                $.on(e, "mouseover", u);
            this._queueCallback(
              () => {
                $.trigger(this._element, this.constructor.eventName("shown")),
                  !1 === this._isHovered && this._leave(),
                  (this._isHovered = !1);
              },
              this.tip,
              this._isAnimated(),
            );
          }
          hide() {
            if (!this._isShown()) return;
            if (
              $.trigger(this._element, this.constructor.eventName("hide"))
                .defaultPrevented
            )
              return;
            if (
              (this._getTipElement().classList.remove(nr),
              "ontouchstart" in document.documentElement)
            )
              for (const e of [].concat(...document.body.children))
                $.off(e, "mouseover", u);
            (this._activeTrigger.click = !1),
              (this._activeTrigger[or] = !1),
              (this._activeTrigger[sr] = !1),
              (this._isHovered = null);
            this._queueCallback(
              () => {
                this._isWithActiveTrigger() ||
                  (this._isHovered || this._disposePopper(),
                  this._element.removeAttribute("aria-describedby"),
                  $.trigger(
                    this._element,
                    this.constructor.eventName("hidden"),
                  ));
              },
              this.tip,
              this._isAnimated(),
            );
          }
          update() {
            this._popper && this._popper.update();
          }
          _isWithContent() {
            return Boolean(this._getTitle());
          }
          _getTipElement() {
            return (
              this.tip ||
                (this.tip = this._createTipElement(
                  this._newContent || this._getContentForTemplate(),
                )),
              this.tip
            );
          }
          _createTipElement(e) {
            const t = this._getTemplateFactory(e).toHtml();
            if (!t) return null;
            t.classList.remove(tr, nr),
              t.classList.add(`bs-${this.constructor.NAME}-auto`);
            const n = ((e) => {
              do {
                e += Math.floor(1e6 * Math.random());
              } while (document.getElementById(e));
              return e;
            })(this.constructor.NAME).toString();
            return (
              t.setAttribute("id", n),
              this._isAnimated() && t.classList.add(tr),
              t
            );
          }
          setContent(e) {
            (this._newContent = e),
              this._isShown() && (this._disposePopper(), this.show());
          }
          _getTemplateFactory(e) {
            return (
              this._templateFactory
                ? this._templateFactory.changeContent(e)
                : (this._templateFactory = new Gi({
                    ...this._config,
                    content: e,
                    extraClass: this._resolvePossibleFunction(
                      this._config.customClass,
                    ),
                  })),
              this._templateFactory
            );
          }
          _getContentForTemplate() {
            return { ".tooltip-inner": this._getTitle() };
          }
          _getTitle() {
            return (
              this._resolvePossibleFunction(this._config.title) ||
              this._element.getAttribute("data-bs-original-title")
            );
          }
          _initializeOnDelegatedTarget(e) {
            return this.constructor.getOrCreateInstance(
              e.delegateTarget,
              this._getDelegateConfig(),
            );
          }
          _isAnimated() {
            return (
              this._config.animation ||
              (this.tip && this.tip.classList.contains(tr))
            );
          }
          _isShown() {
            return this.tip && this.tip.classList.contains(nr);
          }
          _createPopper(e) {
            const t = m(this._config.placement, [this, e, this._element]),
              n = ar[t.toUpperCase()];
            return yn(this._element, e, this._getPopperConfig(n));
          }
          _getOffset() {
            const { offset: e } = this._config;
            return "string" == typeof e
              ? e.split(",").map((e) => Number.parseInt(e, 10))
              : "function" == typeof e
              ? (t) => e(t, this._element)
              : e;
          }
          _resolvePossibleFunction(e) {
            return m(e, [this._element]);
          }
          _getPopperConfig(e) {
            const t = {
              placement: e,
              modifiers: [
                {
                  name: "flip",
                  options: {
                    fallbackPlacements: this._config.fallbackPlacements,
                  },
                },
                { name: "offset", options: { offset: this._getOffset() } },
                {
                  name: "preventOverflow",
                  options: { boundary: this._config.boundary },
                },
                {
                  name: "arrow",
                  options: { element: `.${this.constructor.NAME}-arrow` },
                },
                {
                  name: "preSetPlacement",
                  enabled: !0,
                  phase: "beforeMain",
                  fn: (e) => {
                    this._getTipElement().setAttribute(
                      "data-popper-placement",
                      e.state.placement,
                    );
                  },
                },
              ],
            };
            return { ...t, ...m(this._config.popperConfig, [t]) };
          }
          _setListeners() {
            const e = this._config.trigger.split(" ");
            for (const t of e)
              if ("click" === t)
                $.on(
                  this._element,
                  this.constructor.eventName("click"),
                  this._config.selector,
                  (e) => {
                    this._initializeOnDelegatedTarget(e).toggle();
                  },
                );
              else if ("manual" !== t) {
                const e =
                    t === sr
                      ? this.constructor.eventName("mouseenter")
                      : this.constructor.eventName("focusin"),
                  n =
                    t === sr
                      ? this.constructor.eventName("mouseleave")
                      : this.constructor.eventName("focusout");
                $.on(this._element, e, this._config.selector, (e) => {
                  const t = this._initializeOnDelegatedTarget(e);
                  (t._activeTrigger["focusin" === e.type ? or : sr] = !0),
                    t._enter();
                }),
                  $.on(this._element, n, this._config.selector, (e) => {
                    const t = this._initializeOnDelegatedTarget(e);
                    (t._activeTrigger["focusout" === e.type ? or : sr] =
                      t._element.contains(e.relatedTarget)),
                      t._leave();
                  });
              }
            (this._hideModalHandler = () => {
              this._element && this.hide();
            }),
              $.on(this._element.closest(ir), rr, this._hideModalHandler);
          }
          _fixTitle() {
            const e = this._element.getAttribute("title");
            e &&
              (this._element.getAttribute("aria-label") ||
                this._element.textContent.trim() ||
                this._element.setAttribute("aria-label", e),
              this._element.setAttribute("data-bs-original-title", e),
              this._element.removeAttribute("title"));
          }
          _enter() {
            this._isShown() || this._isHovered
              ? (this._isHovered = !0)
              : ((this._isHovered = !0),
                this._setTimeout(() => {
                  this._isHovered && this.show();
                }, this._config.delay.show));
          }
          _leave() {
            this._isWithActiveTrigger() ||
              ((this._isHovered = !1),
              this._setTimeout(() => {
                this._isHovered || this.hide();
              }, this._config.delay.hide));
          }
          _setTimeout(e, t) {
            clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
          }
          _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0);
          }
          _getConfig(e) {
            const t = F.getDataAttributes(this._element);
            for (const e of Object.keys(t)) er.has(e) && delete t[e];
            return (
              (e = { ...t, ...("object" == typeof e && e ? e : {}) }),
              (e = this._mergeConfigObj(e)),
              (e = this._configAfterMerge(e)),
              this._typeCheckConfig(e),
              e
            );
          }
          _configAfterMerge(e) {
            return (
              (e.container =
                !1 === e.container ? document.body : o(e.container)),
              "number" == typeof e.delay &&
                (e.delay = { show: e.delay, hide: e.delay }),
              "number" == typeof e.title && (e.title = e.title.toString()),
              "number" == typeof e.content &&
                (e.content = e.content.toString()),
              e
            );
          }
          _getDelegateConfig() {
            const e = {};
            for (const [t, n] of Object.entries(this._config))
              this.constructor.Default[t] !== n && (e[t] = n);
            return (e.selector = !1), (e.trigger = "manual"), e;
          }
          _disposePopper() {
            this._popper && (this._popper.destroy(), (this._popper = null)),
              this.tip && (this.tip.remove(), (this.tip = null));
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = ur.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e])
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        g(ur);
        const hr = {
            ...ur.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template:
              '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click",
          },
          dr = { ...ur.DefaultType, content: "(null|string|element|function)" };
        class fr extends ur {
          static get Default() {
            return hr;
          }
          static get DefaultType() {
            return dr;
          }
          static get NAME() {
            return "popover";
          }
          _isWithContent() {
            return this._getTitle() || this._getContent();
          }
          _getContentForTemplate() {
            return {
              ".popover-header": this._getTitle(),
              ".popover-body": this._getContent(),
            };
          }
          _getContent() {
            return this._resolvePossibleFunction(this._config.content);
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = fr.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e])
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        g(fr);
        const pr = ".bs.scrollspy",
          gr = `activate${pr}`,
          mr = `click${pr}`,
          vr = `load${pr}.data-api`,
          _r = "active",
          br = "[href]",
          yr = ".nav-link",
          wr = `${yr}, .nav-item > ${yr}, .list-group-item`,
          Er = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [0.1, 0.5, 1],
          },
          Ar = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array",
          };
        class Or extends R {
          constructor(e, t) {
            super(e, t),
              (this._targetLinks = new Map()),
              (this._observableSections = new Map()),
              (this._rootElement =
                "visible" === getComputedStyle(this._element).overflowY
                  ? null
                  : this._element),
              (this._activeTarget = null),
              (this._observer = null),
              (this._previousScrollData = {
                visibleEntryTop: 0,
                parentScrollTop: 0,
              }),
              this.refresh();
          }
          static get Default() {
            return Er;
          }
          static get DefaultType() {
            return Ar;
          }
          static get NAME() {
            return "scrollspy";
          }
          refresh() {
            this._initializeTargetsAndObservables(),
              this._maybeEnableSmoothScroll(),
              this._observer
                ? this._observer.disconnect()
                : (this._observer = this._getNewObserver());
            for (const e of this._observableSections.values())
              this._observer.observe(e);
          }
          dispose() {
            this._observer.disconnect(), super.dispose();
          }
          _configAfterMerge(e) {
            return (
              (e.target = o(e.target) || document.body),
              (e.rootMargin = e.offset
                ? `${e.offset}px 0px -30%`
                : e.rootMargin),
              "string" == typeof e.threshold &&
                (e.threshold = e.threshold
                  .split(",")
                  .map((e) => Number.parseFloat(e))),
              e
            );
          }
          _maybeEnableSmoothScroll() {
            this._config.smoothScroll &&
              ($.off(this._config.target, mr),
              $.on(this._config.target, mr, br, (e) => {
                const t = this._observableSections.get(e.target.hash);
                if (t) {
                  e.preventDefault();
                  const n = this._rootElement || window,
                    i = t.offsetTop - this._element.offsetTop;
                  if (n.scrollTo)
                    return void n.scrollTo({ top: i, behavior: "smooth" });
                  n.scrollTop = i;
                }
              }));
          }
          _getNewObserver() {
            const e = {
              root: this._rootElement,
              threshold: this._config.threshold,
              rootMargin: this._config.rootMargin,
            };
            return new IntersectionObserver(
              (e) => this._observerCallback(e),
              e,
            );
          }
          _observerCallback(e) {
            const t = (e) => this._targetLinks.get(`#${e.target.id}`),
              n = (e) => {
                (this._previousScrollData.visibleEntryTop = e.target.offsetTop),
                  this._process(t(e));
              },
              i = (this._rootElement || document.documentElement).scrollTop,
              r = i >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = i;
            for (const s of e) {
              if (!s.isIntersecting) {
                (this._activeTarget = null), this._clearActiveClass(t(s));
                continue;
              }
              const e =
                s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
              if (r && e) {
                if ((n(s), !i)) return;
              } else r || e || n(s);
            }
          }
          _initializeTargetsAndObservables() {
            (this._targetLinks = new Map()),
              (this._observableSections = new Map());
            const e = q.find(br, this._config.target);
            for (const t of e) {
              if (!t.hash || l(t)) continue;
              const e = q.findOne(decodeURI(t.hash), this._element);
              a(e) &&
                (this._targetLinks.set(decodeURI(t.hash), t),
                this._observableSections.set(t.hash, e));
            }
          }
          _process(e) {
            this._activeTarget !== e &&
              (this._clearActiveClass(this._config.target),
              (this._activeTarget = e),
              e.classList.add(_r),
              this._activateParents(e),
              $.trigger(this._element, gr, { relatedTarget: e }));
          }
          _activateParents(e) {
            if (e.classList.contains("dropdown-item"))
              q.findOne(
                ".dropdown-toggle",
                e.closest(".dropdown"),
              ).classList.add(_r);
            else
              for (const t of q.parents(e, ".nav, .list-group"))
                for (const e of q.prev(t, wr)) e.classList.add(_r);
          }
          _clearActiveClass(e) {
            e.classList.remove(_r);
            const t = q.find(`${br}.${_r}`, e);
            for (const e of t) e.classList.remove(_r);
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Or.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        $.on(window, vr, () => {
          for (const e of q.find('[data-bs-spy="scroll"]'))
            Or.getOrCreateInstance(e);
        }),
          g(Or);
        const xr = ".bs.tab",
          Cr = `hide${xr}`,
          Tr = `hidden${xr}`,
          Sr = `show${xr}`,
          kr = `shown${xr}`,
          Nr = `click${xr}`,
          Lr = `keydown${xr}`,
          Dr = `load${xr}`,
          Mr = "ArrowLeft",
          $r = "ArrowRight",
          Ir = "ArrowUp",
          Pr = "ArrowDown",
          jr = "Home",
          Fr = "End",
          Br = "active",
          Rr = "fade",
          Hr = "show",
          qr = ".dropdown-toggle",
          Vr = `:not(${qr})`,
          Wr =
            '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
          Kr = `.nav-link${Vr}, .list-group-item${Vr}, [role="tab"]${Vr}, ${Wr}`,
          zr = `.${Br}[data-bs-toggle="tab"], .${Br}[data-bs-toggle="pill"], .${Br}[data-bs-toggle="list"]`;
        class Ur extends R {
          constructor(e) {
            super(e),
              (this._parent = this._element.closest(
                '.list-group, .nav, [role="tablist"]',
              )),
              this._parent &&
                (this._setInitialAttributes(this._parent, this._getChildren()),
                $.on(this._element, Lr, (e) => this._keydown(e)));
          }
          static get NAME() {
            return "tab";
          }
          show() {
            const e = this._element;
            if (this._elemIsActive(e)) return;
            const t = this._getActiveElem(),
              n = t ? $.trigger(t, Cr, { relatedTarget: e }) : null;
            $.trigger(e, Sr, { relatedTarget: t }).defaultPrevented ||
              (n && n.defaultPrevented) ||
              (this._deactivate(t, e), this._activate(e, t));
          }
          _activate(e, t) {
            if (!e) return;
            e.classList.add(Br), this._activate(q.getElementFromSelector(e));
            this._queueCallback(
              () => {
                "tab" === e.getAttribute("role")
                  ? (e.removeAttribute("tabindex"),
                    e.setAttribute("aria-selected", !0),
                    this._toggleDropDown(e, !0),
                    $.trigger(e, kr, { relatedTarget: t }))
                  : e.classList.add(Hr);
              },
              e,
              e.classList.contains(Rr),
            );
          }
          _deactivate(e, t) {
            if (!e) return;
            e.classList.remove(Br),
              e.blur(),
              this._deactivate(q.getElementFromSelector(e));
            this._queueCallback(
              () => {
                "tab" === e.getAttribute("role")
                  ? (e.setAttribute("aria-selected", !1),
                    e.setAttribute("tabindex", "-1"),
                    this._toggleDropDown(e, !1),
                    $.trigger(e, Tr, { relatedTarget: t }))
                  : e.classList.remove(Hr);
              },
              e,
              e.classList.contains(Rr),
            );
          }
          _keydown(e) {
            if (![Mr, $r, Ir, Pr, jr, Fr].includes(e.key)) return;
            e.stopPropagation(), e.preventDefault();
            const t = this._getChildren().filter((e) => !l(e));
            let n;
            if ([jr, Fr].includes(e.key))
              n = t[e.key === jr ? 0 : t.length - 1];
            else {
              const i = [$r, Pr].includes(e.key);
              n = _(t, e.target, i, !0);
            }
            n &&
              (n.focus({ preventScroll: !0 }),
              Ur.getOrCreateInstance(n).show());
          }
          _getChildren() {
            return q.find(Kr, this._parent);
          }
          _getActiveElem() {
            return (
              this._getChildren().find((e) => this._elemIsActive(e)) || null
            );
          }
          _setInitialAttributes(e, t) {
            this._setAttributeIfNotExists(e, "role", "tablist");
            for (const e of t) this._setInitialAttributesOnChild(e);
          }
          _setInitialAttributesOnChild(e) {
            e = this._getInnerElement(e);
            const t = this._elemIsActive(e),
              n = this._getOuterElement(e);
            e.setAttribute("aria-selected", t),
              n !== e &&
                this._setAttributeIfNotExists(n, "role", "presentation"),
              t || e.setAttribute("tabindex", "-1"),
              this._setAttributeIfNotExists(e, "role", "tab"),
              this._setInitialAttributesOnTargetPanel(e);
          }
          _setInitialAttributesOnTargetPanel(e) {
            const t = q.getElementFromSelector(e);
            t &&
              (this._setAttributeIfNotExists(t, "role", "tabpanel"),
              e.id &&
                this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
          }
          _toggleDropDown(e, t) {
            const n = this._getOuterElement(e);
            if (!n.classList.contains("dropdown")) return;
            const i = (e, i) => {
              const r = q.findOne(e, n);
              r && r.classList.toggle(i, t);
            };
            i(qr, Br),
              i(".dropdown-menu", Hr),
              n.setAttribute("aria-expanded", t);
          }
          _setAttributeIfNotExists(e, t, n) {
            e.hasAttribute(t) || e.setAttribute(t, n);
          }
          _elemIsActive(e) {
            return e.classList.contains(Br);
          }
          _getInnerElement(e) {
            return e.matches(Kr) ? e : q.findOne(Kr, e);
          }
          _getOuterElement(e) {
            return e.closest(".nav-item, .list-group-item") || e;
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Ur.getOrCreateInstance(this);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        $.on(document, Nr, Wr, function (e) {
          ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            l(this) || Ur.getOrCreateInstance(this).show();
        }),
          $.on(window, Dr, () => {
            for (const e of q.find(zr)) Ur.getOrCreateInstance(e);
          }),
          g(Ur);
        const Qr = ".bs.toast",
          Xr = `mouseover${Qr}`,
          Yr = `mouseout${Qr}`,
          Jr = `focusin${Qr}`,
          Zr = `focusout${Qr}`,
          Gr = `hide${Qr}`,
          es = `hidden${Qr}`,
          ts = `show${Qr}`,
          ns = `shown${Qr}`,
          is = "hide",
          rs = "show",
          ss = "showing",
          os = { animation: "boolean", autohide: "boolean", delay: "number" },
          as = { animation: !0, autohide: !0, delay: 5e3 };
        class ls extends R {
          constructor(e, t) {
            super(e, t),
              (this._timeout = null),
              (this._hasMouseInteraction = !1),
              (this._hasKeyboardInteraction = !1),
              this._setListeners();
          }
          static get Default() {
            return as;
          }
          static get DefaultType() {
            return os;
          }
          static get NAME() {
            return "toast";
          }
          show() {
            if ($.trigger(this._element, ts).defaultPrevented) return;
            this._clearTimeout(),
              this._config.animation && this._element.classList.add("fade");
            this._element.classList.remove(is),
              h(this._element),
              this._element.classList.add(rs, ss),
              this._queueCallback(
                () => {
                  this._element.classList.remove(ss),
                    $.trigger(this._element, ns),
                    this._maybeScheduleHide();
                },
                this._element,
                this._config.animation,
              );
          }
          hide() {
            if (!this.isShown()) return;
            if ($.trigger(this._element, Gr).defaultPrevented) return;
            this._element.classList.add(ss),
              this._queueCallback(
                () => {
                  this._element.classList.add(is),
                    this._element.classList.remove(ss, rs),
                    $.trigger(this._element, es);
                },
                this._element,
                this._config.animation,
              );
          }
          dispose() {
            this._clearTimeout(),
              this.isShown() && this._element.classList.remove(rs),
              super.dispose();
          }
          isShown() {
            return this._element.classList.contains(rs);
          }
          _maybeScheduleHide() {
            this._config.autohide &&
              (this._hasMouseInteraction ||
                this._hasKeyboardInteraction ||
                (this._timeout = setTimeout(() => {
                  this.hide();
                }, this._config.delay)));
          }
          _onInteraction(e, t) {
            switch (e.type) {
              case "mouseover":
              case "mouseout":
                this._hasMouseInteraction = t;
                break;
              case "focusin":
              case "focusout":
                this._hasKeyboardInteraction = t;
            }
            if (t) return void this._clearTimeout();
            const n = e.relatedTarget;
            this._element === n ||
              this._element.contains(n) ||
              this._maybeScheduleHide();
          }
          _setListeners() {
            $.on(this._element, Xr, (e) => this._onInteraction(e, !0)),
              $.on(this._element, Yr, (e) => this._onInteraction(e, !1)),
              $.on(this._element, Jr, (e) => this._onInteraction(e, !0)),
              $.on(this._element, Zr, (e) => this._onInteraction(e, !1));
          }
          _clearTimeout() {
            clearTimeout(this._timeout), (this._timeout = null);
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = ls.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e])
                  throw new TypeError(`No method named "${e}"`);
                t[e](this);
              }
            });
          }
        }
        return (
          V(ls),
          g(ls),
          {
            Alert: U,
            Button: X,
            Carousel: Te,
            Collapse: He,
            Dropdown: zn,
            Modal: Ti,
            Offcanvas: Ki,
            Popover: fr,
            ScrollSpy: Or,
            Tab: Ur,
            Toast: ls,
            Tooltip: ur,
          }
        );
      })();
    },
    336: function (e, t, n) {
      "use strict";
      n.d(t, {
        y8: function () {
          return cs;
        },
      });
      var i = {};
      n.r(i),
        n.d(i, {
          afterMain: function () {
            return A;
          },
          afterRead: function () {
            return y;
          },
          afterWrite: function () {
            return C;
          },
          applyStyles: function () {
            return M;
          },
          arrow: function () {
            return G;
          },
          auto: function () {
            return l;
          },
          basePlacements: function () {
            return c;
          },
          beforeMain: function () {
            return w;
          },
          beforeRead: function () {
            return _;
          },
          beforeWrite: function () {
            return O;
          },
          bottom: function () {
            return s;
          },
          clippingParents: function () {
            return d;
          },
          computeStyles: function () {
            return ie;
          },
          createPopper: function () {
            return De;
          },
          createPopperBase: function () {
            return Le;
          },
          createPopperLite: function () {
            return Me;
          },
          detectOverflow: function () {
            return _e;
          },
          end: function () {
            return h;
          },
          eventListeners: function () {
            return se;
          },
          flip: function () {
            return be;
          },
          hide: function () {
            return Ee;
          },
          left: function () {
            return a;
          },
          main: function () {
            return E;
          },
          modifierPhases: function () {
            return T;
          },
          offset: function () {
            return Ae;
          },
          placements: function () {
            return v;
          },
          popper: function () {
            return p;
          },
          popperGenerator: function () {
            return Ne;
          },
          popperOffsets: function () {
            return Oe;
          },
          preventOverflow: function () {
            return xe;
          },
          read: function () {
            return b;
          },
          reference: function () {
            return g;
          },
          right: function () {
            return o;
          },
          start: function () {
            return u;
          },
          top: function () {
            return r;
          },
          variationPlacements: function () {
            return m;
          },
          viewport: function () {
            return f;
          },
          write: function () {
            return x;
          },
        });
      var r = "top",
        s = "bottom",
        o = "right",
        a = "left",
        l = "auto",
        c = [r, s, o, a],
        u = "start",
        h = "end",
        d = "clippingParents",
        f = "viewport",
        p = "popper",
        g = "reference",
        m = c.reduce(function (e, t) {
          return e.concat([t + "-" + u, t + "-" + h]);
        }, []),
        v = [].concat(c, [l]).reduce(function (e, t) {
          return e.concat([t, t + "-" + u, t + "-" + h]);
        }, []),
        _ = "beforeRead",
        b = "read",
        y = "afterRead",
        w = "beforeMain",
        E = "main",
        A = "afterMain",
        O = "beforeWrite",
        x = "write",
        C = "afterWrite",
        T = [_, b, y, w, E, A, O, x, C];
      function S(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
      }
      function k(e) {
        if (null == e) return window;
        if ("[object Window]" !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function N(e) {
        return e instanceof k(e).Element || e instanceof Element;
      }
      function L(e) {
        return e instanceof k(e).HTMLElement || e instanceof HTMLElement;
      }
      function D(e) {
        return (
          "undefined" != typeof ShadowRoot &&
          (e instanceof k(e).ShadowRoot || e instanceof ShadowRoot)
        );
      }
      var M = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (e) {
          var t = e.state;
          Object.keys(t.elements).forEach(function (e) {
            var n = t.styles[e] || {},
              i = t.attributes[e] || {},
              r = t.elements[e];
            L(r) &&
              S(r) &&
              (Object.assign(r.style, n),
              Object.keys(i).forEach(function (e) {
                var t = i[e];
                !1 === t
                  ? r.removeAttribute(e)
                  : r.setAttribute(e, !0 === t ? "" : t);
              }));
          });
        },
        effect: function (e) {
          var t = e.state,
            n = {
              popper: {
                position: t.options.strategy,
                left: "0",
                top: "0",
                margin: "0",
              },
              arrow: { position: "absolute" },
              reference: {},
            };
          return (
            Object.assign(t.elements.popper.style, n.popper),
            (t.styles = n),
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function () {
              Object.keys(t.elements).forEach(function (e) {
                var i = t.elements[e],
                  r = t.attributes[e] || {},
                  s = Object.keys(
                    t.styles.hasOwnProperty(e) ? t.styles[e] : n[e],
                  ).reduce(function (e, t) {
                    return (e[t] = ""), e;
                  }, {});
                L(i) &&
                  S(i) &&
                  (Object.assign(i.style, s),
                  Object.keys(r).forEach(function (e) {
                    i.removeAttribute(e);
                  }));
              });
            }
          );
        },
        requires: ["computeStyles"],
      };
      function $(e) {
        return e.split("-")[0];
      }
      var I = Math.max,
        P = Math.min,
        j = Math.round;
      function F() {
        var e = navigator.userAgentData;
        return null != e && e.brands && Array.isArray(e.brands)
          ? e.brands
              .map(function (e) {
                return e.brand + "/" + e.version;
              })
              .join(" ")
          : navigator.userAgent;
      }
      function B() {
        return !/^((?!chrome|android).)*safari/i.test(F());
      }
      function R(e, t, n) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        var i = e.getBoundingClientRect(),
          r = 1,
          s = 1;
        t &&
          L(e) &&
          ((r = (e.offsetWidth > 0 && j(i.width) / e.offsetWidth) || 1),
          (s = (e.offsetHeight > 0 && j(i.height) / e.offsetHeight) || 1));
        var o = (N(e) ? k(e) : window).visualViewport,
          a = !B() && n,
          l = (i.left + (a && o ? o.offsetLeft : 0)) / r,
          c = (i.top + (a && o ? o.offsetTop : 0)) / s,
          u = i.width / r,
          h = i.height / s;
        return {
          width: u,
          height: h,
          top: c,
          right: l + u,
          bottom: c + h,
          left: l,
          x: l,
          y: c,
        };
      }
      function H(e) {
        var t = R(e),
          n = e.offsetWidth,
          i = e.offsetHeight;
        return (
          Math.abs(t.width - n) <= 1 && (n = t.width),
          Math.abs(t.height - i) <= 1 && (i = t.height),
          { x: e.offsetLeft, y: e.offsetTop, width: n, height: i }
        );
      }
      function q(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && D(n)) {
          var i = t;
          do {
            if (i && e.isSameNode(i)) return !0;
            i = i.parentNode || i.host;
          } while (i);
        }
        return !1;
      }
      function V(e) {
        return k(e).getComputedStyle(e);
      }
      function W(e) {
        return ["table", "td", "th"].indexOf(S(e)) >= 0;
      }
      function K(e) {
        return ((N(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function z(e) {
        return "html" === S(e)
          ? e
          : e.assignedSlot || e.parentNode || (D(e) ? e.host : null) || K(e);
      }
      function U(e) {
        return L(e) && "fixed" !== V(e).position ? e.offsetParent : null;
      }
      function Q(e) {
        for (var t = k(e), n = U(e); n && W(n) && "static" === V(n).position; )
          n = U(n);
        return n &&
          ("html" === S(n) || ("body" === S(n) && "static" === V(n).position))
          ? t
          : n ||
              (function (e) {
                var t = /firefox/i.test(F());
                if (/Trident/i.test(F()) && L(e) && "fixed" === V(e).position)
                  return null;
                var n = z(e);
                for (
                  D(n) && (n = n.host);
                  L(n) && ["html", "body"].indexOf(S(n)) < 0;

                ) {
                  var i = V(n);
                  if (
                    "none" !== i.transform ||
                    "none" !== i.perspective ||
                    "paint" === i.contain ||
                    -1 !== ["transform", "perspective"].indexOf(i.willChange) ||
                    (t && "filter" === i.willChange) ||
                    (t && i.filter && "none" !== i.filter)
                  )
                    return n;
                  n = n.parentNode;
                }
                return null;
              })(e) ||
              t;
      }
      function X(e) {
        return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
      }
      function Y(e, t, n) {
        return I(e, P(t, n));
      }
      function J(e) {
        return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
      }
      function Z(e, t) {
        return t.reduce(function (t, n) {
          return (t[n] = e), t;
        }, {});
      }
      var G = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t,
            n = e.state,
            i = e.name,
            l = e.options,
            u = n.elements.arrow,
            h = n.modifiersData.popperOffsets,
            d = $(n.placement),
            f = X(d),
            p = [a, o].indexOf(d) >= 0 ? "height" : "width";
          if (u && h) {
            var g = (function (e, t) {
                return J(
                  "number" !=
                    typeof (e =
                      "function" == typeof e
                        ? e(
                            Object.assign({}, t.rects, {
                              placement: t.placement,
                            }),
                          )
                        : e)
                    ? e
                    : Z(e, c),
                );
              })(l.padding, n),
              m = H(u),
              v = "y" === f ? r : a,
              _ = "y" === f ? s : o,
              b =
                n.rects.reference[p] +
                n.rects.reference[f] -
                h[f] -
                n.rects.popper[p],
              y = h[f] - n.rects.reference[f],
              w = Q(u),
              E = w
                ? "y" === f
                  ? w.clientHeight || 0
                  : w.clientWidth || 0
                : 0,
              A = b / 2 - y / 2,
              O = g[v],
              x = E - m[p] - g[_],
              C = E / 2 - m[p] / 2 + A,
              T = Y(O, C, x),
              S = f;
            n.modifiersData[i] =
              (((t = {})[S] = T), (t.centerOffset = T - C), t);
          }
        },
        effect: function (e) {
          var t = e.state,
            n = e.options.element,
            i = void 0 === n ? "[data-popper-arrow]" : n;
          null != i &&
            ("string" != typeof i ||
              (i = t.elements.popper.querySelector(i))) &&
            q(t.elements.popper, i) &&
            (t.elements.arrow = i);
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"],
      };
      function ee(e) {
        return e.split("-")[1];
      }
      var te = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
      function ne(e) {
        var t,
          n = e.popper,
          i = e.popperRect,
          l = e.placement,
          c = e.variation,
          u = e.offsets,
          d = e.position,
          f = e.gpuAcceleration,
          p = e.adaptive,
          g = e.roundOffsets,
          m = e.isFixed,
          v = u.x,
          _ = void 0 === v ? 0 : v,
          b = u.y,
          y = void 0 === b ? 0 : b,
          w = "function" == typeof g ? g({ x: _, y: y }) : { x: _, y: y };
        (_ = w.x), (y = w.y);
        var E = u.hasOwnProperty("x"),
          A = u.hasOwnProperty("y"),
          O = a,
          x = r,
          C = window;
        if (p) {
          var T = Q(n),
            S = "clientHeight",
            N = "clientWidth";
          T === k(n) &&
            "static" !== V((T = K(n))).position &&
            "absolute" === d &&
            ((S = "scrollHeight"), (N = "scrollWidth")),
            (l === r || ((l === a || l === o) && c === h)) &&
              ((x = s),
              (y -=
                (m && T === C && C.visualViewport
                  ? C.visualViewport.height
                  : T[S]) - i.height),
              (y *= f ? 1 : -1)),
            (l !== a && ((l !== r && l !== s) || c !== h)) ||
              ((O = o),
              (_ -=
                (m && T === C && C.visualViewport
                  ? C.visualViewport.width
                  : T[N]) - i.width),
              (_ *= f ? 1 : -1));
        }
        var L,
          D = Object.assign({ position: d }, p && te),
          M =
            !0 === g
              ? (function (e, t) {
                  var n = e.x,
                    i = e.y,
                    r = t.devicePixelRatio || 1;
                  return { x: j(n * r) / r || 0, y: j(i * r) / r || 0 };
                })({ x: _, y: y }, k(n))
              : { x: _, y: y };
        return (
          (_ = M.x),
          (y = M.y),
          f
            ? Object.assign(
                {},
                D,
                (((L = {})[x] = A ? "0" : ""),
                (L[O] = E ? "0" : ""),
                (L.transform =
                  (C.devicePixelRatio || 1) <= 1
                    ? "translate(" + _ + "px, " + y + "px)"
                    : "translate3d(" + _ + "px, " + y + "px, 0)"),
                L),
              )
            : Object.assign(
                {},
                D,
                (((t = {})[x] = A ? y + "px" : ""),
                (t[O] = E ? _ + "px" : ""),
                (t.transform = ""),
                t),
              )
        );
      }
      var ie = {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = n.gpuAcceleration,
              r = void 0 === i || i,
              s = n.adaptive,
              o = void 0 === s || s,
              a = n.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: $(t.placement),
                variation: ee(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: r,
                isFixed: "fixed" === t.options.strategy,
              };
            null != t.modifiersData.popperOffsets &&
              (t.styles.popper = Object.assign(
                {},
                t.styles.popper,
                ne(
                  Object.assign({}, c, {
                    offsets: t.modifiersData.popperOffsets,
                    position: t.options.strategy,
                    adaptive: o,
                    roundOffsets: l,
                  }),
                ),
              )),
              null != t.modifiersData.arrow &&
                (t.styles.arrow = Object.assign(
                  {},
                  t.styles.arrow,
                  ne(
                    Object.assign({}, c, {
                      offsets: t.modifiersData.arrow,
                      position: "absolute",
                      adaptive: !1,
                      roundOffsets: l,
                    }),
                  ),
                )),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement,
              }));
          },
          data: {},
        },
        re = { passive: !0 },
        se = {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              n = e.instance,
              i = e.options,
              r = i.scroll,
              s = void 0 === r || r,
              o = i.resize,
              a = void 0 === o || o,
              l = k(t.elements.popper),
              c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              s &&
                c.forEach(function (e) {
                  e.addEventListener("scroll", n.update, re);
                }),
              a && l.addEventListener("resize", n.update, re),
              function () {
                s &&
                  c.forEach(function (e) {
                    e.removeEventListener("scroll", n.update, re);
                  }),
                  a && l.removeEventListener("resize", n.update, re);
              }
            );
          },
          data: {},
        },
        oe = { left: "right", right: "left", bottom: "top", top: "bottom" };
      function ae(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return oe[e];
        });
      }
      var le = { start: "end", end: "start" };
      function ce(e) {
        return e.replace(/start|end/g, function (e) {
          return le[e];
        });
      }
      function ue(e) {
        var t = k(e);
        return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
      }
      function he(e) {
        return R(K(e)).left + ue(e).scrollLeft;
      }
      function de(e) {
        var t = V(e),
          n = t.overflow,
          i = t.overflowX,
          r = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + r + i);
      }
      function fe(e) {
        return ["html", "body", "#document"].indexOf(S(e)) >= 0
          ? e.ownerDocument.body
          : L(e) && de(e)
          ? e
          : fe(z(e));
      }
      function pe(e, t) {
        var n;
        void 0 === t && (t = []);
        var i = fe(e),
          r = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
          s = k(i),
          o = r ? [s].concat(s.visualViewport || [], de(i) ? i : []) : i,
          a = t.concat(o);
        return r ? a : a.concat(pe(z(o)));
      }
      function ge(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function me(e, t, n) {
        return t === f
          ? ge(
              (function (e, t) {
                var n = k(e),
                  i = K(e),
                  r = n.visualViewport,
                  s = i.clientWidth,
                  o = i.clientHeight,
                  a = 0,
                  l = 0;
                if (r) {
                  (s = r.width), (o = r.height);
                  var c = B();
                  (c || (!c && "fixed" === t)) &&
                    ((a = r.offsetLeft), (l = r.offsetTop));
                }
                return { width: s, height: o, x: a + he(e), y: l };
              })(e, n),
            )
          : N(t)
          ? (function (e, t) {
              var n = R(e, !1, "fixed" === t);
              return (
                (n.top = n.top + e.clientTop),
                (n.left = n.left + e.clientLeft),
                (n.bottom = n.top + e.clientHeight),
                (n.right = n.left + e.clientWidth),
                (n.width = e.clientWidth),
                (n.height = e.clientHeight),
                (n.x = n.left),
                (n.y = n.top),
                n
              );
            })(t, n)
          : ge(
              (function (e) {
                var t,
                  n = K(e),
                  i = ue(e),
                  r = null == (t = e.ownerDocument) ? void 0 : t.body,
                  s = I(
                    n.scrollWidth,
                    n.clientWidth,
                    r ? r.scrollWidth : 0,
                    r ? r.clientWidth : 0,
                  ),
                  o = I(
                    n.scrollHeight,
                    n.clientHeight,
                    r ? r.scrollHeight : 0,
                    r ? r.clientHeight : 0,
                  ),
                  a = -i.scrollLeft + he(e),
                  l = -i.scrollTop;
                return (
                  "rtl" === V(r || n).direction &&
                    (a += I(n.clientWidth, r ? r.clientWidth : 0) - s),
                  { width: s, height: o, x: a, y: l }
                );
              })(K(e)),
            );
      }
      function ve(e) {
        var t,
          n = e.reference,
          i = e.element,
          l = e.placement,
          c = l ? $(l) : null,
          d = l ? ee(l) : null,
          f = n.x + n.width / 2 - i.width / 2,
          p = n.y + n.height / 2 - i.height / 2;
        switch (c) {
          case r:
            t = { x: f, y: n.y - i.height };
            break;
          case s:
            t = { x: f, y: n.y + n.height };
            break;
          case o:
            t = { x: n.x + n.width, y: p };
            break;
          case a:
            t = { x: n.x - i.width, y: p };
            break;
          default:
            t = { x: n.x, y: n.y };
        }
        var g = c ? X(c) : null;
        if (null != g) {
          var m = "y" === g ? "height" : "width";
          switch (d) {
            case u:
              t[g] = t[g] - (n[m] / 2 - i[m] / 2);
              break;
            case h:
              t[g] = t[g] + (n[m] / 2 - i[m] / 2);
          }
        }
        return t;
      }
      function _e(e, t) {
        void 0 === t && (t = {});
        var n = t,
          i = n.placement,
          a = void 0 === i ? e.placement : i,
          l = n.strategy,
          u = void 0 === l ? e.strategy : l,
          h = n.boundary,
          m = void 0 === h ? d : h,
          v = n.rootBoundary,
          _ = void 0 === v ? f : v,
          b = n.elementContext,
          y = void 0 === b ? p : b,
          w = n.altBoundary,
          E = void 0 !== w && w,
          A = n.padding,
          O = void 0 === A ? 0 : A,
          x = J("number" != typeof O ? O : Z(O, c)),
          C = y === p ? g : p,
          T = e.rects.popper,
          k = e.elements[E ? C : y],
          D = (function (e, t, n, i) {
            var r =
                "clippingParents" === t
                  ? (function (e) {
                      var t = pe(z(e)),
                        n =
                          ["absolute", "fixed"].indexOf(V(e).position) >= 0 &&
                          L(e)
                            ? Q(e)
                            : e;
                      return N(n)
                        ? t.filter(function (e) {
                            return N(e) && q(e, n) && "body" !== S(e);
                          })
                        : [];
                    })(e)
                  : [].concat(t),
              s = [].concat(r, [n]),
              o = s[0],
              a = s.reduce(
                function (t, n) {
                  var r = me(e, n, i);
                  return (
                    (t.top = I(r.top, t.top)),
                    (t.right = P(r.right, t.right)),
                    (t.bottom = P(r.bottom, t.bottom)),
                    (t.left = I(r.left, t.left)),
                    t
                  );
                },
                me(e, o, i),
              );
            return (
              (a.width = a.right - a.left),
              (a.height = a.bottom - a.top),
              (a.x = a.left),
              (a.y = a.top),
              a
            );
          })(N(k) ? k : k.contextElement || K(e.elements.popper), m, _, u),
          M = R(e.elements.reference),
          $ = ve({
            reference: M,
            element: T,
            strategy: "absolute",
            placement: a,
          }),
          j = ge(Object.assign({}, T, $)),
          F = y === p ? j : M,
          B = {
            top: D.top - F.top + x.top,
            bottom: F.bottom - D.bottom + x.bottom,
            left: D.left - F.left + x.left,
            right: F.right - D.right + x.right,
          },
          H = e.modifiersData.offset;
        if (y === p && H) {
          var W = H[a];
          Object.keys(B).forEach(function (e) {
            var t = [o, s].indexOf(e) >= 0 ? 1 : -1,
              n = [r, s].indexOf(e) >= 0 ? "y" : "x";
            B[e] += W[n] * t;
          });
        }
        return B;
      }
      var be = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (e) {
          var t = e.state,
            n = e.options,
            i = e.name;
          if (!t.modifiersData[i]._skip) {
            for (
              var h = n.mainAxis,
                d = void 0 === h || h,
                f = n.altAxis,
                p = void 0 === f || f,
                g = n.fallbackPlacements,
                _ = n.padding,
                b = n.boundary,
                y = n.rootBoundary,
                w = n.altBoundary,
                E = n.flipVariations,
                A = void 0 === E || E,
                O = n.allowedAutoPlacements,
                x = t.options.placement,
                C = $(x),
                T =
                  g ||
                  (C !== x && A
                    ? (function (e) {
                        if ($(e) === l) return [];
                        var t = ae(e);
                        return [ce(e), t, ce(t)];
                      })(x)
                    : [ae(x)]),
                S = [x].concat(T).reduce(function (e, n) {
                  return e.concat(
                    $(n) === l
                      ? (function (e, t) {
                          void 0 === t && (t = {});
                          var n = t,
                            i = n.placement,
                            r = n.boundary,
                            s = n.rootBoundary,
                            o = n.padding,
                            a = n.flipVariations,
                            l = n.allowedAutoPlacements,
                            u = void 0 === l ? v : l,
                            h = ee(i),
                            d = h
                              ? a
                                ? m
                                : m.filter(function (e) {
                                    return ee(e) === h;
                                  })
                              : c,
                            f = d.filter(function (e) {
                              return u.indexOf(e) >= 0;
                            });
                          0 === f.length && (f = d);
                          var p = f.reduce(function (t, n) {
                            return (
                              (t[n] = _e(e, {
                                placement: n,
                                boundary: r,
                                rootBoundary: s,
                                padding: o,
                              })[$(n)]),
                              t
                            );
                          }, {});
                          return Object.keys(p).sort(function (e, t) {
                            return p[e] - p[t];
                          });
                        })(t, {
                          placement: n,
                          boundary: b,
                          rootBoundary: y,
                          padding: _,
                          flipVariations: A,
                          allowedAutoPlacements: O,
                        })
                      : n,
                  );
                }, []),
                k = t.rects.reference,
                N = t.rects.popper,
                L = new Map(),
                D = !0,
                M = S[0],
                I = 0;
              I < S.length;
              I++
            ) {
              var P = S[I],
                j = $(P),
                F = ee(P) === u,
                B = [r, s].indexOf(j) >= 0,
                R = B ? "width" : "height",
                H = _e(t, {
                  placement: P,
                  boundary: b,
                  rootBoundary: y,
                  altBoundary: w,
                  padding: _,
                }),
                q = B ? (F ? o : a) : F ? s : r;
              k[R] > N[R] && (q = ae(q));
              var V = ae(q),
                W = [];
              if (
                (d && W.push(H[j] <= 0),
                p && W.push(H[q] <= 0, H[V] <= 0),
                W.every(function (e) {
                  return e;
                }))
              ) {
                (M = P), (D = !1);
                break;
              }
              L.set(P, W);
            }
            if (D)
              for (
                var K = function (e) {
                    var t = S.find(function (t) {
                      var n = L.get(t);
                      if (n)
                        return n.slice(0, e).every(function (e) {
                          return e;
                        });
                    });
                    if (t) return (M = t), "break";
                  },
                  z = A ? 3 : 1;
                z > 0 && "break" !== K(z);
                z--
              );
            t.placement !== M &&
              ((t.modifiersData[i]._skip = !0),
              (t.placement = M),
              (t.reset = !0));
          }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
      };
      function ye(e, t, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
          }
        );
      }
      function we(e) {
        return [r, o, s, a].some(function (t) {
          return e[t] >= 0;
        });
      }
      var Ee = {
          name: "hide",
          enabled: !0,
          phase: "main",
          requiresIfExists: ["preventOverflow"],
          fn: function (e) {
            var t = e.state,
              n = e.name,
              i = t.rects.reference,
              r = t.rects.popper,
              s = t.modifiersData.preventOverflow,
              o = _e(t, { elementContext: "reference" }),
              a = _e(t, { altBoundary: !0 }),
              l = ye(o, i),
              c = ye(a, r, s),
              u = we(l),
              h = we(c);
            (t.modifiersData[n] = {
              referenceClippingOffsets: l,
              popperEscapeOffsets: c,
              isReferenceHidden: u,
              hasPopperEscaped: h,
            }),
              (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-reference-hidden": u,
                "data-popper-escaped": h,
              }));
          },
        },
        Ae = {
          name: "offset",
          enabled: !0,
          phase: "main",
          requires: ["popperOffsets"],
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              s = n.offset,
              l = void 0 === s ? [0, 0] : s,
              c = v.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var i = $(e),
                      s = [a, r].indexOf(i) >= 0 ? -1 : 1,
                      l =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      c = l[0],
                      u = l[1];
                    return (
                      (c = c || 0),
                      (u = (u || 0) * s),
                      [a, o].indexOf(i) >= 0 ? { x: u, y: c } : { x: c, y: u }
                    );
                  })(n, t.rects, l)),
                  e
                );
              }, {}),
              u = c[t.placement],
              h = u.x,
              d = u.y;
            null != t.modifiersData.popperOffsets &&
              ((t.modifiersData.popperOffsets.x += h),
              (t.modifiersData.popperOffsets.y += d)),
              (t.modifiersData[i] = c);
          },
        },
        Oe = {
          name: "popperOffsets",
          enabled: !0,
          phase: "read",
          fn: function (e) {
            var t = e.state,
              n = e.name;
            t.modifiersData[n] = ve({
              reference: t.rects.reference,
              element: t.rects.popper,
              strategy: "absolute",
              placement: t.placement,
            });
          },
          data: {},
        },
        xe = {
          name: "preventOverflow",
          enabled: !0,
          phase: "main",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              i = e.name,
              l = n.mainAxis,
              c = void 0 === l || l,
              h = n.altAxis,
              d = void 0 !== h && h,
              f = n.boundary,
              p = n.rootBoundary,
              g = n.altBoundary,
              m = n.padding,
              v = n.tether,
              _ = void 0 === v || v,
              b = n.tetherOffset,
              y = void 0 === b ? 0 : b,
              w = _e(t, {
                boundary: f,
                rootBoundary: p,
                padding: m,
                altBoundary: g,
              }),
              E = $(t.placement),
              A = ee(t.placement),
              O = !A,
              x = X(E),
              C = "x" === x ? "y" : "x",
              T = t.modifiersData.popperOffsets,
              S = t.rects.reference,
              k = t.rects.popper,
              N =
                "function" == typeof y
                  ? y(Object.assign({}, t.rects, { placement: t.placement }))
                  : y,
              L =
                "number" == typeof N
                  ? { mainAxis: N, altAxis: N }
                  : Object.assign({ mainAxis: 0, altAxis: 0 }, N),
              D = t.modifiersData.offset
                ? t.modifiersData.offset[t.placement]
                : null,
              M = { x: 0, y: 0 };
            if (T) {
              if (c) {
                var j,
                  F = "y" === x ? r : a,
                  B = "y" === x ? s : o,
                  R = "y" === x ? "height" : "width",
                  q = T[x],
                  V = q + w[F],
                  W = q - w[B],
                  K = _ ? -k[R] / 2 : 0,
                  z = A === u ? S[R] : k[R],
                  U = A === u ? -k[R] : -S[R],
                  J = t.elements.arrow,
                  Z = _ && J ? H(J) : { width: 0, height: 0 },
                  G = t.modifiersData["arrow#persistent"]
                    ? t.modifiersData["arrow#persistent"].padding
                    : { top: 0, right: 0, bottom: 0, left: 0 },
                  te = G[F],
                  ne = G[B],
                  ie = Y(0, S[R], Z[R]),
                  re = O
                    ? S[R] / 2 - K - ie - te - L.mainAxis
                    : z - ie - te - L.mainAxis,
                  se = O
                    ? -S[R] / 2 + K + ie + ne + L.mainAxis
                    : U + ie + ne + L.mainAxis,
                  oe = t.elements.arrow && Q(t.elements.arrow),
                  ae = oe
                    ? "y" === x
                      ? oe.clientTop || 0
                      : oe.clientLeft || 0
                    : 0,
                  le = null != (j = null == D ? void 0 : D[x]) ? j : 0,
                  ce = q + se - le,
                  ue = Y(_ ? P(V, q + re - le - ae) : V, q, _ ? I(W, ce) : W);
                (T[x] = ue), (M[x] = ue - q);
              }
              if (d) {
                var he,
                  de = "x" === x ? r : a,
                  fe = "x" === x ? s : o,
                  pe = T[C],
                  ge = "y" === C ? "height" : "width",
                  me = pe + w[de],
                  ve = pe - w[fe],
                  be = -1 !== [r, a].indexOf(E),
                  ye = null != (he = null == D ? void 0 : D[C]) ? he : 0,
                  we = be ? me : pe - S[ge] - k[ge] - ye + L.altAxis,
                  Ee = be ? pe + S[ge] + k[ge] - ye - L.altAxis : ve,
                  Ae =
                    _ && be
                      ? (function (e, t, n) {
                          var i = Y(e, t, n);
                          return i > n ? n : i;
                        })(we, pe, Ee)
                      : Y(_ ? we : me, pe, _ ? Ee : ve);
                (T[C] = Ae), (M[C] = Ae - pe);
              }
              t.modifiersData[i] = M;
            }
          },
          requiresIfExists: ["offset"],
        };
      function Ce(e, t, n) {
        void 0 === n && (n = !1);
        var i,
          r,
          s = L(t),
          o =
            L(t) &&
            (function (e) {
              var t = e.getBoundingClientRect(),
                n = j(t.width) / e.offsetWidth || 1,
                i = j(t.height) / e.offsetHeight || 1;
              return 1 !== n || 1 !== i;
            })(t),
          a = K(t),
          l = R(e, o, n),
          c = { scrollLeft: 0, scrollTop: 0 },
          u = { x: 0, y: 0 };
        return (
          (s || (!s && !n)) &&
            (("body" !== S(t) || de(a)) &&
              (c =
                (i = t) !== k(i) && L(i)
                  ? { scrollLeft: (r = i).scrollLeft, scrollTop: r.scrollTop }
                  : ue(i)),
            L(t)
              ? (((u = R(t, !0)).x += t.clientLeft), (u.y += t.clientTop))
              : a && (u.x = he(a))),
          {
            x: l.left + c.scrollLeft - u.x,
            y: l.top + c.scrollTop - u.y,
            width: l.width,
            height: l.height,
          }
        );
      }
      function Te(e) {
        var t = new Map(),
          n = new Set(),
          i = [];
        function r(e) {
          n.add(e.name),
            []
              .concat(e.requires || [], e.requiresIfExists || [])
              .forEach(function (e) {
                if (!n.has(e)) {
                  var i = t.get(e);
                  i && r(i);
                }
              }),
            i.push(e);
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            n.has(e.name) || r(e);
          }),
          i
        );
      }
      var Se = { placement: "bottom", modifiers: [], strategy: "absolute" };
      function ke() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return !t.some(function (e) {
          return !(e && "function" == typeof e.getBoundingClientRect);
        });
      }
      function Ne(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.defaultModifiers,
          i = void 0 === n ? [] : n,
          r = t.defaultOptions,
          s = void 0 === r ? Se : r;
        return function (e, t, n) {
          void 0 === n && (n = s);
          var r,
            o,
            a = {
              placement: "bottom",
              orderedModifiers: [],
              options: Object.assign({}, Se, s),
              modifiersData: {},
              elements: { reference: e, popper: t },
              attributes: {},
              styles: {},
            },
            l = [],
            c = !1,
            u = {
              state: a,
              setOptions: function (n) {
                var r = "function" == typeof n ? n(a.options) : n;
                h(),
                  (a.options = Object.assign({}, s, a.options, r)),
                  (a.scrollParents = {
                    reference: N(e)
                      ? pe(e)
                      : e.contextElement
                      ? pe(e.contextElement)
                      : [],
                    popper: pe(t),
                  });
                var o,
                  c,
                  d = (function (e) {
                    var t = Te(e);
                    return T.reduce(function (e, n) {
                      return e.concat(
                        t.filter(function (e) {
                          return e.phase === n;
                        }),
                      );
                    }, []);
                  })(
                    ((o = [].concat(i, a.options.modifiers)),
                    (c = o.reduce(function (e, t) {
                      var n = e[t.name];
                      return (
                        (e[t.name] = n
                          ? Object.assign({}, n, t, {
                              options: Object.assign({}, n.options, t.options),
                              data: Object.assign({}, n.data, t.data),
                            })
                          : t),
                        e
                      );
                    }, {})),
                    Object.keys(c).map(function (e) {
                      return c[e];
                    })),
                  );
                return (
                  (a.orderedModifiers = d.filter(function (e) {
                    return e.enabled;
                  })),
                  a.orderedModifiers.forEach(function (e) {
                    var t = e.name,
                      n = e.options,
                      i = void 0 === n ? {} : n,
                      r = e.effect;
                    if ("function" == typeof r) {
                      var s = r({ state: a, name: t, instance: u, options: i });
                      l.push(s || function () {});
                    }
                  }),
                  u.update()
                );
              },
              forceUpdate: function () {
                if (!c) {
                  var e = a.elements,
                    t = e.reference,
                    n = e.popper;
                  if (ke(t, n)) {
                    (a.rects = {
                      reference: Ce(t, Q(n), "fixed" === a.options.strategy),
                      popper: H(n),
                    }),
                      (a.reset = !1),
                      (a.placement = a.options.placement),
                      a.orderedModifiers.forEach(function (e) {
                        return (a.modifiersData[e.name] = Object.assign(
                          {},
                          e.data,
                        ));
                      });
                    for (var i = 0; i < a.orderedModifiers.length; i++)
                      if (!0 !== a.reset) {
                        var r = a.orderedModifiers[i],
                          s = r.fn,
                          o = r.options,
                          l = void 0 === o ? {} : o,
                          h = r.name;
                        "function" == typeof s &&
                          (a =
                            s({ state: a, options: l, name: h, instance: u }) ||
                            a);
                      } else (a.reset = !1), (i = -1);
                  }
                }
              },
              update:
                ((r = function () {
                  return new Promise(function (e) {
                    u.forceUpdate(), e(a);
                  });
                }),
                function () {
                  return (
                    o ||
                      (o = new Promise(function (e) {
                        Promise.resolve().then(function () {
                          (o = void 0), e(r());
                        });
                      })),
                    o
                  );
                }),
              destroy: function () {
                h(), (c = !0);
              },
            };
          if (!ke(e, t)) return u;
          function h() {
            l.forEach(function (e) {
              return e();
            }),
              (l = []);
          }
          return (
            u.setOptions(n).then(function (e) {
              !c && n.onFirstUpdate && n.onFirstUpdate(e);
            }),
            u
          );
        };
      }
      var Le = Ne(),
        De = Ne({ defaultModifiers: [se, Oe, ie, M, Ae, be, xe, G, Ee] }),
        Me = Ne({ defaultModifiers: [se, Oe, ie, M] });
      const $e = new Map(),
        Ie = {
          set(e, t, n) {
            $e.has(e) || $e.set(e, new Map());
            const i = $e.get(e);
            i.has(t) || 0 === i.size
              ? i.set(t, n)
              : console.error(
                  `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                    Array.from(i.keys())[0]
                  }.`,
                );
          },
          get(e, t) {
            return ($e.has(e) && $e.get(e).get(t)) || null;
          },
          remove(e, t) {
            if (!$e.has(e)) return;
            const n = $e.get(e);
            n.delete(t), 0 === n.size && $e.delete(e);
          },
        },
        Pe = "transitionend",
        je = (e) => (
          e &&
            window.CSS &&
            window.CSS.escape &&
            (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
          e
        ),
        Fe = (e) => {
          e.dispatchEvent(new Event(Pe));
        },
        Be = (e) =>
          !(!e || "object" != typeof e) &&
          (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
        Re = (e) =>
          Be(e)
            ? e.jquery
              ? e[0]
              : e
            : "string" == typeof e && e.length > 0
            ? document.querySelector(je(e))
            : null,
        He = (e) => {
          if (!Be(e) || 0 === e.getClientRects().length) return !1;
          const t =
              "visible" === getComputedStyle(e).getPropertyValue("visibility"),
            n = e.closest("details:not([open])");
          if (!n) return t;
          if (n !== e) {
            const t = e.closest("summary");
            if (t && t.parentNode !== n) return !1;
            if (null === t) return !1;
          }
          return t;
        },
        qe = (e) =>
          !e ||
          e.nodeType !== Node.ELEMENT_NODE ||
          !!e.classList.contains("disabled") ||
          (void 0 !== e.disabled
            ? e.disabled
            : e.hasAttribute("disabled") &&
              "false" !== e.getAttribute("disabled")),
        Ve = (e) => {
          if (!document.documentElement.attachShadow) return null;
          if ("function" == typeof e.getRootNode) {
            const t = e.getRootNode();
            return t instanceof ShadowRoot ? t : null;
          }
          return e instanceof ShadowRoot
            ? e
            : e.parentNode
            ? Ve(e.parentNode)
            : null;
        },
        We = () => {},
        Ke = (e) => {
          e.offsetHeight;
        },
        ze = () =>
          window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
            ? window.jQuery
            : null,
        Ue = [],
        Qe = () => "rtl" === document.documentElement.dir,
        Xe = (e) => {
          var t;
          (t = () => {
            const t = ze();
            if (t) {
              const n = e.NAME,
                i = t.fn[n];
              (t.fn[n] = e.jQueryInterface),
                (t.fn[n].Constructor = e),
                (t.fn[n].noConflict = () => ((t.fn[n] = i), e.jQueryInterface));
            }
          }),
            "loading" === document.readyState
              ? (Ue.length ||
                  document.addEventListener("DOMContentLoaded", () => {
                    for (const e of Ue) e();
                  }),
                Ue.push(t))
              : t();
        },
        Ye = (e, t = [], n = e) => ("function" == typeof e ? e(...t) : n),
        Je = (e, t, n = !0) => {
          if (!n) return void Ye(e);
          const i =
            ((e) => {
              if (!e) return 0;
              let { transitionDuration: t, transitionDelay: n } =
                window.getComputedStyle(e);
              const i = Number.parseFloat(t),
                r = Number.parseFloat(n);
              return i || r
                ? ((t = t.split(",")[0]),
                  (n = n.split(",")[0]),
                  1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
                : 0;
            })(t) + 5;
          let r = !1;
          const s = ({ target: n }) => {
            n === t && ((r = !0), t.removeEventListener(Pe, s), Ye(e));
          };
          t.addEventListener(Pe, s),
            setTimeout(() => {
              r || Fe(t);
            }, i);
        },
        Ze = (e, t, n, i) => {
          const r = e.length;
          let s = e.indexOf(t);
          return -1 === s
            ? !n && i
              ? e[r - 1]
              : e[0]
            : ((s += n ? 1 : -1),
              i && (s = (s + r) % r),
              e[Math.max(0, Math.min(s, r - 1))]);
        },
        Ge = /[^.]*(?=\..*)\.|.*/,
        et = /\..*/,
        tt = /::\d+$/,
        nt = {};
      let it = 1;
      const rt = { mouseenter: "mouseover", mouseleave: "mouseout" },
        st = new Set([
          "click",
          "dblclick",
          "mouseup",
          "mousedown",
          "contextmenu",
          "mousewheel",
          "DOMMouseScroll",
          "mouseover",
          "mouseout",
          "mousemove",
          "selectstart",
          "selectend",
          "keydown",
          "keypress",
          "keyup",
          "orientationchange",
          "touchstart",
          "touchmove",
          "touchend",
          "touchcancel",
          "pointerdown",
          "pointermove",
          "pointerup",
          "pointerleave",
          "pointercancel",
          "gesturestart",
          "gesturechange",
          "gestureend",
          "focus",
          "blur",
          "change",
          "reset",
          "select",
          "submit",
          "focusin",
          "focusout",
          "load",
          "unload",
          "beforeunload",
          "resize",
          "move",
          "DOMContentLoaded",
          "readystatechange",
          "error",
          "abort",
          "scroll",
        ]);
      function ot(e, t) {
        return (t && `${t}::${it++}`) || e.uidEvent || it++;
      }
      function at(e) {
        const t = ot(e);
        return (e.uidEvent = t), (nt[t] = nt[t] || {}), nt[t];
      }
      function lt(e, t, n = null) {
        return Object.values(e).find(
          (e) => e.callable === t && e.delegationSelector === n,
        );
      }
      function ct(e, t, n) {
        const i = "string" == typeof t,
          r = i ? n : t || n;
        let s = ft(e);
        return st.has(s) || (s = e), [i, r, s];
      }
      function ut(e, t, n, i, r) {
        if ("string" != typeof t || !e) return;
        let [s, o, a] = ct(t, n, i);
        if (t in rt) {
          const e = (e) =>
            function (t) {
              if (
                !t.relatedTarget ||
                (t.relatedTarget !== t.delegateTarget &&
                  !t.delegateTarget.contains(t.relatedTarget))
              )
                return e.call(this, t);
            };
          o = e(o);
        }
        const l = at(e),
          c = l[a] || (l[a] = {}),
          u = lt(c, o, s ? n : null);
        if (u) return void (u.oneOff = u.oneOff && r);
        const h = ot(o, t.replace(Ge, "")),
          d = s
            ? (function (e, t, n) {
                return function i(r) {
                  const s = e.querySelectorAll(t);
                  for (let { target: o } = r; o && o !== this; o = o.parentNode)
                    for (const a of s)
                      if (a === o)
                        return (
                          gt(r, { delegateTarget: o }),
                          i.oneOff && pt.off(e, r.type, t, n),
                          n.apply(o, [r])
                        );
                };
              })(e, n, o)
            : (function (e, t) {
                return function n(i) {
                  return (
                    gt(i, { delegateTarget: e }),
                    n.oneOff && pt.off(e, i.type, t),
                    t.apply(e, [i])
                  );
                };
              })(e, o);
        (d.delegationSelector = s ? n : null),
          (d.callable = o),
          (d.oneOff = r),
          (d.uidEvent = h),
          (c[h] = d),
          e.addEventListener(a, d, s);
      }
      function ht(e, t, n, i, r) {
        const s = lt(t[n], i, r);
        s && (e.removeEventListener(n, s, Boolean(r)), delete t[n][s.uidEvent]);
      }
      function dt(e, t, n, i) {
        const r = t[n] || {};
        for (const [s, o] of Object.entries(r))
          s.includes(i) && ht(e, t, n, o.callable, o.delegationSelector);
      }
      function ft(e) {
        return (e = e.replace(et, "")), rt[e] || e;
      }
      const pt = {
        on(e, t, n, i) {
          ut(e, t, n, i, !1);
        },
        one(e, t, n, i) {
          ut(e, t, n, i, !0);
        },
        off(e, t, n, i) {
          if ("string" != typeof t || !e) return;
          const [r, s, o] = ct(t, n, i),
            a = o !== t,
            l = at(e),
            c = l[o] || {},
            u = t.startsWith(".");
          if (void 0 === s) {
            if (u) for (const n of Object.keys(l)) dt(e, l, n, t.slice(1));
            for (const [n, i] of Object.entries(c)) {
              const r = n.replace(tt, "");
              (a && !t.includes(r)) ||
                ht(e, l, o, i.callable, i.delegationSelector);
            }
          } else {
            if (!Object.keys(c).length) return;
            ht(e, l, o, s, r ? n : null);
          }
        },
        trigger(e, t, n) {
          if ("string" != typeof t || !e) return null;
          const i = ze();
          let r = null,
            s = !0,
            o = !0,
            a = !1;
          t !== ft(t) &&
            i &&
            ((r = i.Event(t, n)),
            i(e).trigger(r),
            (s = !r.isPropagationStopped()),
            (o = !r.isImmediatePropagationStopped()),
            (a = r.isDefaultPrevented()));
          const l = gt(new Event(t, { bubbles: s, cancelable: !0 }), n);
          return (
            a && l.preventDefault(),
            o && e.dispatchEvent(l),
            l.defaultPrevented && r && r.preventDefault(),
            l
          );
        },
      };
      function gt(e, t = {}) {
        for (const [n, i] of Object.entries(t))
          try {
            e[n] = i;
          } catch (t) {
            Object.defineProperty(e, n, {
              configurable: !0,
              get() {
                return i;
              },
            });
          }
        return e;
      }
      function mt(e) {
        if ("true" === e) return !0;
        if ("false" === e) return !1;
        if (e === Number(e).toString()) return Number(e);
        if ("" === e || "null" === e) return null;
        if ("string" != typeof e) return e;
        try {
          return JSON.parse(decodeURIComponent(e));
        } catch (t) {
          return e;
        }
      }
      function vt(e) {
        return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
      }
      const _t = {
        setDataAttribute(e, t, n) {
          e.setAttribute(`data-bs-${vt(t)}`, n);
        },
        removeDataAttribute(e, t) {
          e.removeAttribute(`data-bs-${vt(t)}`);
        },
        getDataAttributes(e) {
          if (!e) return {};
          const t = {},
            n = Object.keys(e.dataset).filter(
              (e) => e.startsWith("bs") && !e.startsWith("bsConfig"),
            );
          for (const i of n) {
            let n = i.replace(/^bs/, "");
            (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
              (t[n] = mt(e.dataset[i]));
          }
          return t;
        },
        getDataAttribute(e, t) {
          return mt(e.getAttribute(`data-bs-${vt(t)}`));
        },
      };
      class bt {
        static get Default() {
          return {};
        }
        static get DefaultType() {
          return {};
        }
        static get NAME() {
          throw new Error(
            'You have to implement the static method "NAME", for each component!',
          );
        }
        _getConfig(e) {
          return (
            (e = this._mergeConfigObj(e)),
            (e = this._configAfterMerge(e)),
            this._typeCheckConfig(e),
            e
          );
        }
        _configAfterMerge(e) {
          return e;
        }
        _mergeConfigObj(e, t) {
          const n = Be(t) ? _t.getDataAttribute(t, "config") : {};
          return {
            ...this.constructor.Default,
            ...("object" == typeof n ? n : {}),
            ...(Be(t) ? _t.getDataAttributes(t) : {}),
            ...("object" == typeof e ? e : {}),
          };
        }
        _typeCheckConfig(e, t = this.constructor.DefaultType) {
          for (const [i, r] of Object.entries(t)) {
            const t = e[i],
              s = Be(t)
                ? "element"
                : null == (n = t)
                ? `${n}`
                : Object.prototype.toString
                    .call(n)
                    .match(/\s([a-z]+)/i)[1]
                    .toLowerCase();
            if (!new RegExp(r).test(s))
              throw new TypeError(
                `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${s}" but expected type "${r}".`,
              );
          }
          var n;
        }
      }
      class yt extends bt {
        constructor(e, t) {
          super(),
            (e = Re(e)) &&
              ((this._element = e),
              (this._config = this._getConfig(t)),
              Ie.set(this._element, this.constructor.DATA_KEY, this));
        }
        dispose() {
          Ie.remove(this._element, this.constructor.DATA_KEY),
            pt.off(this._element, this.constructor.EVENT_KEY);
          for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
        }
        _queueCallback(e, t, n = !0) {
          Je(e, t, n);
        }
        _getConfig(e) {
          return (
            (e = this._mergeConfigObj(e, this._element)),
            (e = this._configAfterMerge(e)),
            this._typeCheckConfig(e),
            e
          );
        }
        static getInstance(e) {
          return Ie.get(Re(e), this.DATA_KEY);
        }
        static getOrCreateInstance(e, t = {}) {
          return (
            this.getInstance(e) || new this(e, "object" == typeof t ? t : null)
          );
        }
        static get VERSION() {
          return "5.3.3";
        }
        static get DATA_KEY() {
          return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
          return `.${this.DATA_KEY}`;
        }
        static eventName(e) {
          return `${e}${this.EVENT_KEY}`;
        }
      }
      const wt = (e) => {
          let t = e.getAttribute("data-bs-target");
          if (!t || "#" === t) {
            let n = e.getAttribute("href");
            if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
            n.includes("#") &&
              !n.startsWith("#") &&
              (n = `#${n.split("#")[1]}`),
              (t = n && "#" !== n ? n.trim() : null);
          }
          return t
            ? t
                .split(",")
                .map((e) => je(e))
                .join(",")
            : null;
        },
        Et = {
          find(e, t = document.documentElement) {
            return [].concat(...Element.prototype.querySelectorAll.call(t, e));
          },
          findOne(e, t = document.documentElement) {
            return Element.prototype.querySelector.call(t, e);
          },
          children(e, t) {
            return [].concat(...e.children).filter((e) => e.matches(t));
          },
          parents(e, t) {
            const n = [];
            let i = e.parentNode.closest(t);
            for (; i; ) n.push(i), (i = i.parentNode.closest(t));
            return n;
          },
          prev(e, t) {
            let n = e.previousElementSibling;
            for (; n; ) {
              if (n.matches(t)) return [n];
              n = n.previousElementSibling;
            }
            return [];
          },
          next(e, t) {
            let n = e.nextElementSibling;
            for (; n; ) {
              if (n.matches(t)) return [n];
              n = n.nextElementSibling;
            }
            return [];
          },
          focusableChildren(e) {
            const t = [
              "a",
              "button",
              "input",
              "textarea",
              "select",
              "details",
              "[tabindex]",
              '[contenteditable="true"]',
            ]
              .map((e) => `${e}:not([tabindex^="-"])`)
              .join(",");
            return this.find(t, e).filter((e) => !qe(e) && He(e));
          },
          getSelectorFromElement(e) {
            const t = wt(e);
            return t && Et.findOne(t) ? t : null;
          },
          getElementFromSelector(e) {
            const t = wt(e);
            return t ? Et.findOne(t) : null;
          },
          getMultipleElementsFromSelector(e) {
            const t = wt(e);
            return t ? Et.find(t) : [];
          },
        },
        At = (e, t = "hide") => {
          const n = `click.dismiss${e.EVENT_KEY}`,
            i = e.NAME;
          pt.on(document, n, `[data-bs-dismiss="${i}"]`, function (n) {
            if (
              (["A", "AREA"].includes(this.tagName) && n.preventDefault(),
              qe(this))
            )
              return;
            const r = Et.getElementFromSelector(this) || this.closest(`.${i}`);
            e.getOrCreateInstance(r)[t]();
          });
        },
        Ot = ".bs.alert",
        xt = `close${Ot}`,
        Ct = `closed${Ot}`;
      class Tt extends yt {
        static get NAME() {
          return "alert";
        }
        close() {
          if (pt.trigger(this._element, xt).defaultPrevented) return;
          this._element.classList.remove("show");
          const e = this._element.classList.contains("fade");
          this._queueCallback(() => this._destroyElement(), this._element, e);
        }
        _destroyElement() {
          this._element.remove(), pt.trigger(this._element, Ct), this.dispose();
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = Tt.getOrCreateInstance(this);
            if ("string" == typeof e) {
              if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                throw new TypeError(`No method named "${e}"`);
              t[e](this);
            }
          });
        }
      }
      At(Tt, "close"), Xe(Tt);
      const St = '[data-bs-toggle="button"]';
      class kt extends yt {
        static get NAME() {
          return "button";
        }
        toggle() {
          this._element.setAttribute(
            "aria-pressed",
            this._element.classList.toggle("active"),
          );
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = kt.getOrCreateInstance(this);
            "toggle" === e && t[e]();
          });
        }
      }
      pt.on(document, "click.bs.button.data-api", St, (e) => {
        e.preventDefault();
        const t = e.target.closest(St);
        kt.getOrCreateInstance(t).toggle();
      }),
        Xe(kt);
      const Nt = ".bs.swipe",
        Lt = `touchstart${Nt}`,
        Dt = `touchmove${Nt}`,
        Mt = `touchend${Nt}`,
        $t = `pointerdown${Nt}`,
        It = `pointerup${Nt}`,
        Pt = { endCallback: null, leftCallback: null, rightCallback: null },
        jt = {
          endCallback: "(function|null)",
          leftCallback: "(function|null)",
          rightCallback: "(function|null)",
        };
      class Ft extends bt {
        constructor(e, t) {
          super(),
            (this._element = e),
            e &&
              Ft.isSupported() &&
              ((this._config = this._getConfig(t)),
              (this._deltaX = 0),
              (this._supportPointerEvents = Boolean(window.PointerEvent)),
              this._initEvents());
        }
        static get Default() {
          return Pt;
        }
        static get DefaultType() {
          return jt;
        }
        static get NAME() {
          return "swipe";
        }
        dispose() {
          pt.off(this._element, Nt);
        }
        _start(e) {
          this._supportPointerEvents
            ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
            : (this._deltaX = e.touches[0].clientX);
        }
        _end(e) {
          this._eventIsPointerPenTouch(e) &&
            (this._deltaX = e.clientX - this._deltaX),
            this._handleSwipe(),
            Ye(this._config.endCallback);
        }
        _move(e) {
          this._deltaX =
            e.touches && e.touches.length > 1
              ? 0
              : e.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
          const e = Math.abs(this._deltaX);
          if (e <= 40) return;
          const t = e / this._deltaX;
          (this._deltaX = 0),
            t &&
              Ye(
                t > 0 ? this._config.rightCallback : this._config.leftCallback,
              );
        }
        _initEvents() {
          this._supportPointerEvents
            ? (pt.on(this._element, $t, (e) => this._start(e)),
              pt.on(this._element, It, (e) => this._end(e)),
              this._element.classList.add("pointer-event"))
            : (pt.on(this._element, Lt, (e) => this._start(e)),
              pt.on(this._element, Dt, (e) => this._move(e)),
              pt.on(this._element, Mt, (e) => this._end(e)));
        }
        _eventIsPointerPenTouch(e) {
          return (
            this._supportPointerEvents &&
            ("pen" === e.pointerType || "touch" === e.pointerType)
          );
        }
        static isSupported() {
          return (
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0
          );
        }
      }
      const Bt = ".bs.carousel",
        Rt = ".data-api",
        Ht = "next",
        qt = "prev",
        Vt = "left",
        Wt = "right",
        Kt = `slide${Bt}`,
        zt = `slid${Bt}`,
        Ut = `keydown${Bt}`,
        Qt = `mouseenter${Bt}`,
        Xt = `mouseleave${Bt}`,
        Yt = `dragstart${Bt}`,
        Jt = `load${Bt}${Rt}`,
        Zt = `click${Bt}${Rt}`,
        Gt = "carousel",
        en = "active",
        tn = ".active",
        nn = ".carousel-item",
        rn = tn + nn,
        sn = { ArrowLeft: Wt, ArrowRight: Vt },
        on = {
          interval: 5e3,
          keyboard: !0,
          pause: "hover",
          ride: !1,
          touch: !0,
          wrap: !0,
        },
        an = {
          interval: "(number|boolean)",
          keyboard: "boolean",
          pause: "(string|boolean)",
          ride: "(boolean|string)",
          touch: "boolean",
          wrap: "boolean",
        };
      class ln extends yt {
        constructor(e, t) {
          super(e, t),
            (this._interval = null),
            (this._activeElement = null),
            (this._isSliding = !1),
            (this.touchTimeout = null),
            (this._swipeHelper = null),
            (this._indicatorsElement = Et.findOne(
              ".carousel-indicators",
              this._element,
            )),
            this._addEventListeners(),
            this._config.ride === Gt && this.cycle();
        }
        static get Default() {
          return on;
        }
        static get DefaultType() {
          return an;
        }
        static get NAME() {
          return "carousel";
        }
        next() {
          this._slide(Ht);
        }
        nextWhenVisible() {
          !document.hidden && He(this._element) && this.next();
        }
        prev() {
          this._slide(qt);
        }
        pause() {
          this._isSliding && Fe(this._element), this._clearInterval();
        }
        cycle() {
          this._clearInterval(),
            this._updateInterval(),
            (this._interval = setInterval(
              () => this.nextWhenVisible(),
              this._config.interval,
            ));
        }
        _maybeEnableCycle() {
          this._config.ride &&
            (this._isSliding
              ? pt.one(this._element, zt, () => this.cycle())
              : this.cycle());
        }
        to(e) {
          const t = this._getItems();
          if (e > t.length - 1 || e < 0) return;
          if (this._isSliding)
            return void pt.one(this._element, zt, () => this.to(e));
          const n = this._getItemIndex(this._getActive());
          if (n === e) return;
          const i = e > n ? Ht : qt;
          this._slide(i, t[e]);
        }
        dispose() {
          this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
        }
        _configAfterMerge(e) {
          return (e.defaultInterval = e.interval), e;
        }
        _addEventListeners() {
          this._config.keyboard &&
            pt.on(this._element, Ut, (e) => this._keydown(e)),
            "hover" === this._config.pause &&
              (pt.on(this._element, Qt, () => this.pause()),
              pt.on(this._element, Xt, () => this._maybeEnableCycle())),
            this._config.touch &&
              Ft.isSupported() &&
              this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
          for (const e of Et.find(".carousel-item img", this._element))
            pt.on(e, Yt, (e) => e.preventDefault());
          const e = {
            leftCallback: () => this._slide(this._directionToOrder(Vt)),
            rightCallback: () => this._slide(this._directionToOrder(Wt)),
            endCallback: () => {
              "hover" === this._config.pause &&
                (this.pause(),
                this.touchTimeout && clearTimeout(this.touchTimeout),
                (this.touchTimeout = setTimeout(
                  () => this._maybeEnableCycle(),
                  500 + this._config.interval,
                )));
            },
          };
          this._swipeHelper = new Ft(this._element, e);
        }
        _keydown(e) {
          if (/input|textarea/i.test(e.target.tagName)) return;
          const t = sn[e.key];
          t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
        }
        _getItemIndex(e) {
          return this._getItems().indexOf(e);
        }
        _setActiveIndicatorElement(e) {
          if (!this._indicatorsElement) return;
          const t = Et.findOne(tn, this._indicatorsElement);
          t.classList.remove(en), t.removeAttribute("aria-current");
          const n = Et.findOne(
            `[data-bs-slide-to="${e}"]`,
            this._indicatorsElement,
          );
          n && (n.classList.add(en), n.setAttribute("aria-current", "true"));
        }
        _updateInterval() {
          const e = this._activeElement || this._getActive();
          if (!e) return;
          const t = Number.parseInt(e.getAttribute("data-bs-interval"), 10);
          this._config.interval = t || this._config.defaultInterval;
        }
        _slide(e, t = null) {
          if (this._isSliding) return;
          const n = this._getActive(),
            i = e === Ht,
            r = t || Ze(this._getItems(), n, i, this._config.wrap);
          if (r === n) return;
          const s = this._getItemIndex(r),
            o = (t) =>
              pt.trigger(this._element, t, {
                relatedTarget: r,
                direction: this._orderToDirection(e),
                from: this._getItemIndex(n),
                to: s,
              });
          if (o(Kt).defaultPrevented) return;
          if (!n || !r) return;
          const a = Boolean(this._interval);
          this.pause(),
            (this._isSliding = !0),
            this._setActiveIndicatorElement(s),
            (this._activeElement = r);
          const l = i ? "carousel-item-start" : "carousel-item-end",
            c = i ? "carousel-item-next" : "carousel-item-prev";
          r.classList.add(c),
            Ke(r),
            n.classList.add(l),
            r.classList.add(l),
            this._queueCallback(
              () => {
                r.classList.remove(l, c),
                  r.classList.add(en),
                  n.classList.remove(en, c, l),
                  (this._isSliding = !1),
                  o(zt);
              },
              n,
              this._isAnimated(),
            ),
            a && this.cycle();
        }
        _isAnimated() {
          return this._element.classList.contains("slide");
        }
        _getActive() {
          return Et.findOne(rn, this._element);
        }
        _getItems() {
          return Et.find(nn, this._element);
        }
        _clearInterval() {
          this._interval &&
            (clearInterval(this._interval), (this._interval = null));
        }
        _directionToOrder(e) {
          return Qe() ? (e === Vt ? qt : Ht) : e === Vt ? Ht : qt;
        }
        _orderToDirection(e) {
          return Qe() ? (e === qt ? Vt : Wt) : e === qt ? Wt : Vt;
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = ln.getOrCreateInstance(this, e);
            if ("number" != typeof e) {
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            } else t.to(e);
          });
        }
      }
      pt.on(document, Zt, "[data-bs-slide], [data-bs-slide-to]", function (e) {
        const t = Et.getElementFromSelector(this);
        if (!t || !t.classList.contains(Gt)) return;
        e.preventDefault();
        const n = ln.getOrCreateInstance(t),
          i = this.getAttribute("data-bs-slide-to");
        return i
          ? (n.to(i), void n._maybeEnableCycle())
          : "next" === _t.getDataAttribute(this, "slide")
          ? (n.next(), void n._maybeEnableCycle())
          : (n.prev(), void n._maybeEnableCycle());
      }),
        pt.on(window, Jt, () => {
          const e = Et.find('[data-bs-ride="carousel"]');
          for (const t of e) ln.getOrCreateInstance(t);
        }),
        Xe(ln);
      const cn = ".bs.collapse",
        un = `show${cn}`,
        hn = `shown${cn}`,
        dn = `hide${cn}`,
        fn = `hidden${cn}`,
        pn = `click${cn}.data-api`,
        gn = "show",
        mn = "collapse",
        vn = "collapsing",
        _n = `:scope .${mn} .${mn}`,
        bn = '[data-bs-toggle="collapse"]',
        yn = { parent: null, toggle: !0 },
        wn = { parent: "(null|element)", toggle: "boolean" };
      class En extends yt {
        constructor(e, t) {
          super(e, t), (this._isTransitioning = !1), (this._triggerArray = []);
          const n = Et.find(bn);
          for (const e of n) {
            const t = Et.getSelectorFromElement(e),
              n = Et.find(t).filter((e) => e === this._element);
            null !== t && n.length && this._triggerArray.push(e);
          }
          this._initializeChildren(),
            this._config.parent ||
              this._addAriaAndCollapsedClass(
                this._triggerArray,
                this._isShown(),
              ),
            this._config.toggle && this.toggle();
        }
        static get Default() {
          return yn;
        }
        static get DefaultType() {
          return wn;
        }
        static get NAME() {
          return "collapse";
        }
        toggle() {
          this._isShown() ? this.hide() : this.show();
        }
        show() {
          if (this._isTransitioning || this._isShown()) return;
          let e = [];
          if (
            (this._config.parent &&
              (e = this._getFirstLevelChildren(
                ".collapse.show, .collapse.collapsing",
              )
                .filter((e) => e !== this._element)
                .map((e) => En.getOrCreateInstance(e, { toggle: !1 }))),
            e.length && e[0]._isTransitioning)
          )
            return;
          if (pt.trigger(this._element, un).defaultPrevented) return;
          for (const t of e) t.hide();
          const t = this._getDimension();
          this._element.classList.remove(mn),
            this._element.classList.add(vn),
            (this._element.style[t] = 0),
            this._addAriaAndCollapsedClass(this._triggerArray, !0),
            (this._isTransitioning = !0);
          const n = `scroll${t[0].toUpperCase() + t.slice(1)}`;
          this._queueCallback(
            () => {
              (this._isTransitioning = !1),
                this._element.classList.remove(vn),
                this._element.classList.add(mn, gn),
                (this._element.style[t] = ""),
                pt.trigger(this._element, hn);
            },
            this._element,
            !0,
          ),
            (this._element.style[t] = `${this._element[n]}px`);
        }
        hide() {
          if (this._isTransitioning || !this._isShown()) return;
          if (pt.trigger(this._element, dn).defaultPrevented) return;
          const e = this._getDimension();
          (this._element.style[e] = `${
            this._element.getBoundingClientRect()[e]
          }px`),
            Ke(this._element),
            this._element.classList.add(vn),
            this._element.classList.remove(mn, gn);
          for (const e of this._triggerArray) {
            const t = Et.getElementFromSelector(e);
            t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
          }
          (this._isTransitioning = !0),
            (this._element.style[e] = ""),
            this._queueCallback(
              () => {
                (this._isTransitioning = !1),
                  this._element.classList.remove(vn),
                  this._element.classList.add(mn),
                  pt.trigger(this._element, fn);
              },
              this._element,
              !0,
            );
        }
        _isShown(e = this._element) {
          return e.classList.contains(gn);
        }
        _configAfterMerge(e) {
          return (e.toggle = Boolean(e.toggle)), (e.parent = Re(e.parent)), e;
        }
        _getDimension() {
          return this._element.classList.contains("collapse-horizontal")
            ? "width"
            : "height";
        }
        _initializeChildren() {
          if (!this._config.parent) return;
          const e = this._getFirstLevelChildren(bn);
          for (const t of e) {
            const e = Et.getElementFromSelector(t);
            e && this._addAriaAndCollapsedClass([t], this._isShown(e));
          }
        }
        _getFirstLevelChildren(e) {
          const t = Et.find(_n, this._config.parent);
          return Et.find(e, this._config.parent).filter((e) => !t.includes(e));
        }
        _addAriaAndCollapsedClass(e, t) {
          if (e.length)
            for (const n of e)
              n.classList.toggle("collapsed", !t),
                n.setAttribute("aria-expanded", t);
        }
        static jQueryInterface(e) {
          const t = {};
          return (
            "string" == typeof e && /show|hide/.test(e) && (t.toggle = !1),
            this.each(function () {
              const n = En.getOrCreateInstance(this, t);
              if ("string" == typeof e) {
                if (void 0 === n[e])
                  throw new TypeError(`No method named "${e}"`);
                n[e]();
              }
            })
          );
        }
      }
      pt.on(document, pn, bn, function (e) {
        ("A" === e.target.tagName ||
          (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
          e.preventDefault();
        for (const e of Et.getMultipleElementsFromSelector(this))
          En.getOrCreateInstance(e, { toggle: !1 }).toggle();
      }),
        Xe(En);
      const An = "dropdown",
        On = ".bs.dropdown",
        xn = ".data-api",
        Cn = "ArrowUp",
        Tn = "ArrowDown",
        Sn = `hide${On}`,
        kn = `hidden${On}`,
        Nn = `show${On}`,
        Ln = `shown${On}`,
        Dn = `click${On}${xn}`,
        Mn = `keydown${On}${xn}`,
        $n = `keyup${On}${xn}`,
        In = "show",
        Pn = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        jn = `${Pn}.${In}`,
        Fn = ".dropdown-menu",
        Bn = Qe() ? "top-end" : "top-start",
        Rn = Qe() ? "top-start" : "top-end",
        Hn = Qe() ? "bottom-end" : "bottom-start",
        qn = Qe() ? "bottom-start" : "bottom-end",
        Vn = Qe() ? "left-start" : "right-start",
        Wn = Qe() ? "right-start" : "left-start",
        Kn = {
          autoClose: !0,
          boundary: "clippingParents",
          display: "dynamic",
          offset: [0, 2],
          popperConfig: null,
          reference: "toggle",
        },
        zn = {
          autoClose: "(boolean|string)",
          boundary: "(string|element)",
          display: "string",
          offset: "(array|string|function)",
          popperConfig: "(null|object|function)",
          reference: "(string|element|object)",
        };
      class Un extends yt {
        constructor(e, t) {
          super(e, t),
            (this._popper = null),
            (this._parent = this._element.parentNode),
            (this._menu =
              Et.next(this._element, Fn)[0] ||
              Et.prev(this._element, Fn)[0] ||
              Et.findOne(Fn, this._parent)),
            (this._inNavbar = this._detectNavbar());
        }
        static get Default() {
          return Kn;
        }
        static get DefaultType() {
          return zn;
        }
        static get NAME() {
          return An;
        }
        toggle() {
          return this._isShown() ? this.hide() : this.show();
        }
        show() {
          if (qe(this._element) || this._isShown()) return;
          const e = { relatedTarget: this._element };
          if (!pt.trigger(this._element, Nn, e).defaultPrevented) {
            if (
              (this._createPopper(),
              "ontouchstart" in document.documentElement &&
                !this._parent.closest(".navbar-nav"))
            )
              for (const e of [].concat(...document.body.children))
                pt.on(e, "mouseover", We);
            this._element.focus(),
              this._element.setAttribute("aria-expanded", !0),
              this._menu.classList.add(In),
              this._element.classList.add(In),
              pt.trigger(this._element, Ln, e);
          }
        }
        hide() {
          if (qe(this._element) || !this._isShown()) return;
          const e = { relatedTarget: this._element };
          this._completeHide(e);
        }
        dispose() {
          this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
          (this._inNavbar = this._detectNavbar()),
            this._popper && this._popper.update();
        }
        _completeHide(e) {
          if (!pt.trigger(this._element, Sn, e).defaultPrevented) {
            if ("ontouchstart" in document.documentElement)
              for (const e of [].concat(...document.body.children))
                pt.off(e, "mouseover", We);
            this._popper && this._popper.destroy(),
              this._menu.classList.remove(In),
              this._element.classList.remove(In),
              this._element.setAttribute("aria-expanded", "false"),
              _t.removeDataAttribute(this._menu, "popper"),
              pt.trigger(this._element, kn, e);
          }
        }
        _getConfig(e) {
          if (
            "object" == typeof (e = super._getConfig(e)).reference &&
            !Be(e.reference) &&
            "function" != typeof e.reference.getBoundingClientRect
          )
            throw new TypeError(
              `${An.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`,
            );
          return e;
        }
        _createPopper() {
          if (void 0 === i)
            throw new TypeError(
              "Bootstrap's dropdowns require Popper (https://popper.js.org)",
            );
          let e = this._element;
          "parent" === this._config.reference
            ? (e = this._parent)
            : Be(this._config.reference)
            ? (e = Re(this._config.reference))
            : "object" == typeof this._config.reference &&
              (e = this._config.reference);
          const t = this._getPopperConfig();
          this._popper = De(e, this._menu, t);
        }
        _isShown() {
          return this._menu.classList.contains(In);
        }
        _getPlacement() {
          const e = this._parent;
          if (e.classList.contains("dropend")) return Vn;
          if (e.classList.contains("dropstart")) return Wn;
          if (e.classList.contains("dropup-center")) return "top";
          if (e.classList.contains("dropdown-center")) return "bottom";
          const t =
            "end" ===
            getComputedStyle(this._menu)
              .getPropertyValue("--bs-position")
              .trim();
          return e.classList.contains("dropup") ? (t ? Rn : Bn) : t ? qn : Hn;
        }
        _detectNavbar() {
          return null !== this._element.closest(".navbar");
        }
        _getOffset() {
          const { offset: e } = this._config;
          return "string" == typeof e
            ? e.split(",").map((e) => Number.parseInt(e, 10))
            : "function" == typeof e
            ? (t) => e(t, this._element)
            : e;
        }
        _getPopperConfig() {
          const e = {
            placement: this._getPlacement(),
            modifiers: [
              {
                name: "preventOverflow",
                options: { boundary: this._config.boundary },
              },
              { name: "offset", options: { offset: this._getOffset() } },
            ],
          };
          return (
            (this._inNavbar || "static" === this._config.display) &&
              (_t.setDataAttribute(this._menu, "popper", "static"),
              (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
            { ...e, ...Ye(this._config.popperConfig, [e]) }
          );
        }
        _selectMenuItem({ key: e, target: t }) {
          const n = Et.find(
            ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
            this._menu,
          ).filter((e) => He(e));
          n.length && Ze(n, t, e === Tn, !n.includes(t)).focus();
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = Un.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === t[e])
                throw new TypeError(`No method named "${e}"`);
              t[e]();
            }
          });
        }
        static clearMenus(e) {
          if (2 === e.button || ("keyup" === e.type && "Tab" !== e.key)) return;
          const t = Et.find(jn);
          for (const n of t) {
            const t = Un.getInstance(n);
            if (!t || !1 === t._config.autoClose) continue;
            const i = e.composedPath(),
              r = i.includes(t._menu);
            if (
              i.includes(t._element) ||
              ("inside" === t._config.autoClose && !r) ||
              ("outside" === t._config.autoClose && r)
            )
              continue;
            if (
              t._menu.contains(e.target) &&
              (("keyup" === e.type && "Tab" === e.key) ||
                /input|select|option|textarea|form/i.test(e.target.tagName))
            )
              continue;
            const s = { relatedTarget: t._element };
            "click" === e.type && (s.clickEvent = e), t._completeHide(s);
          }
        }
        static dataApiKeydownHandler(e) {
          const t = /input|textarea/i.test(e.target.tagName),
            n = "Escape" === e.key,
            i = [Cn, Tn].includes(e.key);
          if (!i && !n) return;
          if (t && !n) return;
          e.preventDefault();
          const r = this.matches(Pn)
              ? this
              : Et.prev(this, Pn)[0] ||
                Et.next(this, Pn)[0] ||
                Et.findOne(Pn, e.delegateTarget.parentNode),
            s = Un.getOrCreateInstance(r);
          if (i)
            return e.stopPropagation(), s.show(), void s._selectMenuItem(e);
          s._isShown() && (e.stopPropagation(), s.hide(), r.focus());
        }
      }
      pt.on(document, Mn, Pn, Un.dataApiKeydownHandler),
        pt.on(document, Mn, Fn, Un.dataApiKeydownHandler),
        pt.on(document, Dn, Un.clearMenus),
        pt.on(document, $n, Un.clearMenus),
        pt.on(document, Dn, Pn, function (e) {
          e.preventDefault(), Un.getOrCreateInstance(this).toggle();
        }),
        Xe(Un);
      const Qn = "backdrop",
        Xn = "show",
        Yn = `mousedown.bs.${Qn}`,
        Jn = {
          className: "modal-backdrop",
          clickCallback: null,
          isAnimated: !1,
          isVisible: !0,
          rootElement: "body",
        },
        Zn = {
          className: "string",
          clickCallback: "(function|null)",
          isAnimated: "boolean",
          isVisible: "boolean",
          rootElement: "(element|string)",
        };
      class Gn extends bt {
        constructor(e) {
          super(),
            (this._config = this._getConfig(e)),
            (this._isAppended = !1),
            (this._element = null);
        }
        static get Default() {
          return Jn;
        }
        static get DefaultType() {
          return Zn;
        }
        static get NAME() {
          return Qn;
        }
        show(e) {
          if (!this._config.isVisible) return void Ye(e);
          this._append();
          const t = this._getElement();
          this._config.isAnimated && Ke(t),
            t.classList.add(Xn),
            this._emulateAnimation(() => {
              Ye(e);
            });
        }
        hide(e) {
          this._config.isVisible
            ? (this._getElement().classList.remove(Xn),
              this._emulateAnimation(() => {
                this.dispose(), Ye(e);
              }))
            : Ye(e);
        }
        dispose() {
          this._isAppended &&
            (pt.off(this._element, Yn),
            this._element.remove(),
            (this._isAppended = !1));
        }
        _getElement() {
          if (!this._element) {
            const e = document.createElement("div");
            (e.className = this._config.className),
              this._config.isAnimated && e.classList.add("fade"),
              (this._element = e);
          }
          return this._element;
        }
        _configAfterMerge(e) {
          return (e.rootElement = Re(e.rootElement)), e;
        }
        _append() {
          if (this._isAppended) return;
          const e = this._getElement();
          this._config.rootElement.append(e),
            pt.on(e, Yn, () => {
              Ye(this._config.clickCallback);
            }),
            (this._isAppended = !0);
        }
        _emulateAnimation(e) {
          Je(e, this._getElement(), this._config.isAnimated);
        }
      }
      const ei = ".bs.focustrap",
        ti = `focusin${ei}`,
        ni = `keydown.tab${ei}`,
        ii = "backward",
        ri = { autofocus: !0, trapElement: null },
        si = { autofocus: "boolean", trapElement: "element" };
      class oi extends bt {
        constructor(e) {
          super(),
            (this._config = this._getConfig(e)),
            (this._isActive = !1),
            (this._lastTabNavDirection = null);
        }
        static get Default() {
          return ri;
        }
        static get DefaultType() {
          return si;
        }
        static get NAME() {
          return "focustrap";
        }
        activate() {
          this._isActive ||
            (this._config.autofocus && this._config.trapElement.focus(),
            pt.off(document, ei),
            pt.on(document, ti, (e) => this._handleFocusin(e)),
            pt.on(document, ni, (e) => this._handleKeydown(e)),
            (this._isActive = !0));
        }
        deactivate() {
          this._isActive && ((this._isActive = !1), pt.off(document, ei));
        }
        _handleFocusin(e) {
          const { trapElement: t } = this._config;
          if (e.target === document || e.target === t || t.contains(e.target))
            return;
          const n = Et.focusableChildren(t);
          0 === n.length
            ? t.focus()
            : this._lastTabNavDirection === ii
            ? n[n.length - 1].focus()
            : n[0].focus();
        }
        _handleKeydown(e) {
          "Tab" === e.key &&
            (this._lastTabNavDirection = e.shiftKey ? ii : "forward");
        }
      }
      const ai = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        li = ".sticky-top",
        ci = "padding-right",
        ui = "margin-right";
      class hi {
        constructor() {
          this._element = document.body;
        }
        getWidth() {
          const e = document.documentElement.clientWidth;
          return Math.abs(window.innerWidth - e);
        }
        hide() {
          const e = this.getWidth();
          this._disableOverFlow(),
            this._setElementAttributes(this._element, ci, (t) => t + e),
            this._setElementAttributes(ai, ci, (t) => t + e),
            this._setElementAttributes(li, ui, (t) => t - e);
        }
        reset() {
          this._resetElementAttributes(this._element, "overflow"),
            this._resetElementAttributes(this._element, ci),
            this._resetElementAttributes(ai, ci),
            this._resetElementAttributes(li, ui);
        }
        isOverflowing() {
          return this.getWidth() > 0;
        }
        _disableOverFlow() {
          this._saveInitialAttribute(this._element, "overflow"),
            (this._element.style.overflow = "hidden");
        }
        _setElementAttributes(e, t, n) {
          const i = this.getWidth();
          this._applyManipulationCallback(e, (e) => {
            if (e !== this._element && window.innerWidth > e.clientWidth + i)
              return;
            this._saveInitialAttribute(e, t);
            const r = window.getComputedStyle(e).getPropertyValue(t);
            e.style.setProperty(t, `${n(Number.parseFloat(r))}px`);
          });
        }
        _saveInitialAttribute(e, t) {
          const n = e.style.getPropertyValue(t);
          n && _t.setDataAttribute(e, t, n);
        }
        _resetElementAttributes(e, t) {
          this._applyManipulationCallback(e, (e) => {
            const n = _t.getDataAttribute(e, t);
            null !== n
              ? (_t.removeDataAttribute(e, t), e.style.setProperty(t, n))
              : e.style.removeProperty(t);
          });
        }
        _applyManipulationCallback(e, t) {
          if (Be(e)) t(e);
          else for (const n of Et.find(e, this._element)) t(n);
        }
      }
      const di = ".bs.modal",
        fi = `hide${di}`,
        pi = `hidePrevented${di}`,
        gi = `hidden${di}`,
        mi = `show${di}`,
        vi = `shown${di}`,
        _i = `resize${di}`,
        bi = `click.dismiss${di}`,
        yi = `mousedown.dismiss${di}`,
        wi = `keydown.dismiss${di}`,
        Ei = `click${di}.data-api`,
        Ai = "modal-open",
        Oi = "show",
        xi = "modal-static",
        Ci = { backdrop: !0, focus: !0, keyboard: !0 },
        Ti = {
          backdrop: "(boolean|string)",
          focus: "boolean",
          keyboard: "boolean",
        };
      class Si extends yt {
        constructor(e, t) {
          super(e, t),
            (this._dialog = Et.findOne(".modal-dialog", this._element)),
            (this._backdrop = this._initializeBackDrop()),
            (this._focustrap = this._initializeFocusTrap()),
            (this._isShown = !1),
            (this._isTransitioning = !1),
            (this._scrollBar = new hi()),
            this._addEventListeners();
        }
        static get Default() {
          return Ci;
        }
        static get DefaultType() {
          return Ti;
        }
        static get NAME() {
          return "modal";
        }
        toggle(e) {
          return this._isShown ? this.hide() : this.show(e);
        }
        show(e) {
          this._isShown ||
            this._isTransitioning ||
            pt.trigger(this._element, mi, { relatedTarget: e })
              .defaultPrevented ||
            ((this._isShown = !0),
            (this._isTransitioning = !0),
            this._scrollBar.hide(),
            document.body.classList.add(Ai),
            this._adjustDialog(),
            this._backdrop.show(() => this._showElement(e)));
        }
        hide() {
          this._isShown &&
            !this._isTransitioning &&
            (pt.trigger(this._element, fi).defaultPrevented ||
              ((this._isShown = !1),
              (this._isTransitioning = !0),
              this._focustrap.deactivate(),
              this._element.classList.remove(Oi),
              this._queueCallback(
                () => this._hideModal(),
                this._element,
                this._isAnimated(),
              )));
        }
        dispose() {
          pt.off(window, di),
            pt.off(this._dialog, di),
            this._backdrop.dispose(),
            this._focustrap.deactivate(),
            super.dispose();
        }
        handleUpdate() {
          this._adjustDialog();
        }
        _initializeBackDrop() {
          return new Gn({
            isVisible: Boolean(this._config.backdrop),
            isAnimated: this._isAnimated(),
          });
        }
        _initializeFocusTrap() {
          return new oi({ trapElement: this._element });
        }
        _showElement(e) {
          document.body.contains(this._element) ||
            document.body.append(this._element),
            (this._element.style.display = "block"),
            this._element.removeAttribute("aria-hidden"),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            (this._element.scrollTop = 0);
          const t = Et.findOne(".modal-body", this._dialog);
          t && (t.scrollTop = 0),
            Ke(this._element),
            this._element.classList.add(Oi),
            this._queueCallback(
              () => {
                this._config.focus && this._focustrap.activate(),
                  (this._isTransitioning = !1),
                  pt.trigger(this._element, vi, { relatedTarget: e });
              },
              this._dialog,
              this._isAnimated(),
            );
        }
        _addEventListeners() {
          pt.on(this._element, wi, (e) => {
            "Escape" === e.key &&
              (this._config.keyboard
                ? this.hide()
                : this._triggerBackdropTransition());
          }),
            pt.on(window, _i, () => {
              this._isShown && !this._isTransitioning && this._adjustDialog();
            }),
            pt.on(this._element, yi, (e) => {
              pt.one(this._element, bi, (t) => {
                this._element === e.target &&
                  this._element === t.target &&
                  ("static" !== this._config.backdrop
                    ? this._config.backdrop && this.hide()
                    : this._triggerBackdropTransition());
              });
            });
        }
        _hideModal() {
          (this._element.style.display = "none"),
            this._element.setAttribute("aria-hidden", !0),
            this._element.removeAttribute("aria-modal"),
            this._element.removeAttribute("role"),
            (this._isTransitioning = !1),
            this._backdrop.hide(() => {
              document.body.classList.remove(Ai),
                this._resetAdjustments(),
                this._scrollBar.reset(),
                pt.trigger(this._element, gi);
            });
        }
        _isAnimated() {
          return this._element.classList.contains("fade");
        }
        _triggerBackdropTransition() {
          if (pt.trigger(this._element, pi).defaultPrevented) return;
          const e =
              this._element.scrollHeight >
              document.documentElement.clientHeight,
            t = this._element.style.overflowY;
          "hidden" === t ||
            this._element.classList.contains(xi) ||
            (e || (this._element.style.overflowY = "hidden"),
            this._element.classList.add(xi),
            this._queueCallback(() => {
              this._element.classList.remove(xi),
                this._queueCallback(() => {
                  this._element.style.overflowY = t;
                }, this._dialog);
            }, this._dialog),
            this._element.focus());
        }
        _adjustDialog() {
          const e =
              this._element.scrollHeight >
              document.documentElement.clientHeight,
            t = this._scrollBar.getWidth(),
            n = t > 0;
          if (n && !e) {
            const e = Qe() ? "paddingLeft" : "paddingRight";
            this._element.style[e] = `${t}px`;
          }
          if (!n && e) {
            const e = Qe() ? "paddingRight" : "paddingLeft";
            this._element.style[e] = `${t}px`;
          }
        }
        _resetAdjustments() {
          (this._element.style.paddingLeft = ""),
            (this._element.style.paddingRight = "");
        }
        static jQueryInterface(e, t) {
          return this.each(function () {
            const n = Si.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === n[e])
                throw new TypeError(`No method named "${e}"`);
              n[e](t);
            }
          });
        }
      }
      pt.on(document, Ei, '[data-bs-toggle="modal"]', function (e) {
        const t = Et.getElementFromSelector(this);
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
          pt.one(t, mi, (e) => {
            e.defaultPrevented ||
              pt.one(t, gi, () => {
                He(this) && this.focus();
              });
          });
        const n = Et.findOne(".modal.show");
        n && Si.getInstance(n).hide(), Si.getOrCreateInstance(t).toggle(this);
      }),
        At(Si),
        Xe(Si);
      const ki = ".bs.offcanvas",
        Ni = ".data-api",
        Li = `load${ki}${Ni}`,
        Di = "show",
        Mi = "showing",
        $i = "hiding",
        Ii = ".offcanvas.show",
        Pi = `show${ki}`,
        ji = `shown${ki}`,
        Fi = `hide${ki}`,
        Bi = `hidePrevented${ki}`,
        Ri = `hidden${ki}`,
        Hi = `resize${ki}`,
        qi = `click${ki}${Ni}`,
        Vi = `keydown.dismiss${ki}`,
        Wi = { backdrop: !0, keyboard: !0, scroll: !1 },
        Ki = {
          backdrop: "(boolean|string)",
          keyboard: "boolean",
          scroll: "boolean",
        };
      class zi extends yt {
        constructor(e, t) {
          super(e, t),
            (this._isShown = !1),
            (this._backdrop = this._initializeBackDrop()),
            (this._focustrap = this._initializeFocusTrap()),
            this._addEventListeners();
        }
        static get Default() {
          return Wi;
        }
        static get DefaultType() {
          return Ki;
        }
        static get NAME() {
          return "offcanvas";
        }
        toggle(e) {
          return this._isShown ? this.hide() : this.show(e);
        }
        show(e) {
          this._isShown ||
            pt.trigger(this._element, Pi, { relatedTarget: e })
              .defaultPrevented ||
            ((this._isShown = !0),
            this._backdrop.show(),
            this._config.scroll || new hi().hide(),
            this._element.setAttribute("aria-modal", !0),
            this._element.setAttribute("role", "dialog"),
            this._element.classList.add(Mi),
            this._queueCallback(
              () => {
                (this._config.scroll && !this._config.backdrop) ||
                  this._focustrap.activate(),
                  this._element.classList.add(Di),
                  this._element.classList.remove(Mi),
                  pt.trigger(this._element, ji, { relatedTarget: e });
              },
              this._element,
              !0,
            ));
        }
        hide() {
          this._isShown &&
            (pt.trigger(this._element, Fi).defaultPrevented ||
              (this._focustrap.deactivate(),
              this._element.blur(),
              (this._isShown = !1),
              this._element.classList.add($i),
              this._backdrop.hide(),
              this._queueCallback(
                () => {
                  this._element.classList.remove(Di, $i),
                    this._element.removeAttribute("aria-modal"),
                    this._element.removeAttribute("role"),
                    this._config.scroll || new hi().reset(),
                    pt.trigger(this._element, Ri);
                },
                this._element,
                !0,
              )));
        }
        dispose() {
          this._backdrop.dispose(),
            this._focustrap.deactivate(),
            super.dispose();
        }
        _initializeBackDrop() {
          const e = Boolean(this._config.backdrop);
          return new Gn({
            className: "offcanvas-backdrop",
            isVisible: e,
            isAnimated: !0,
            rootElement: this._element.parentNode,
            clickCallback: e
              ? () => {
                  "static" !== this._config.backdrop
                    ? this.hide()
                    : pt.trigger(this._element, Bi);
                }
              : null,
          });
        }
        _initializeFocusTrap() {
          return new oi({ trapElement: this._element });
        }
        _addEventListeners() {
          pt.on(this._element, Vi, (e) => {
            "Escape" === e.key &&
              (this._config.keyboard
                ? this.hide()
                : pt.trigger(this._element, Bi));
          });
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = zi.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                throw new TypeError(`No method named "${e}"`);
              t[e](this);
            }
          });
        }
      }
      pt.on(document, qi, '[data-bs-toggle="offcanvas"]', function (e) {
        const t = Et.getElementFromSelector(this);
        if (
          (["A", "AREA"].includes(this.tagName) && e.preventDefault(), qe(this))
        )
          return;
        pt.one(t, Ri, () => {
          He(this) && this.focus();
        });
        const n = Et.findOne(Ii);
        n && n !== t && zi.getInstance(n).hide(),
          zi.getOrCreateInstance(t).toggle(this);
      }),
        pt.on(window, Li, () => {
          for (const e of Et.find(Ii)) zi.getOrCreateInstance(e).show();
        }),
        pt.on(window, Hi, () => {
          for (const e of Et.find(
            "[aria-modal][class*=show][class*=offcanvas-]",
          ))
            "fixed" !== getComputedStyle(e).position &&
              zi.getOrCreateInstance(e).hide();
        }),
        At(zi),
        Xe(zi);
      const Ui = {
          "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
          a: ["target", "href", "title", "rel"],
          area: [],
          b: [],
          br: [],
          col: [],
          code: [],
          dd: [],
          div: [],
          dl: [],
          dt: [],
          em: [],
          hr: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          i: [],
          img: ["src", "srcset", "alt", "title", "width", "height"],
          li: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          u: [],
          ul: [],
        },
        Qi = new Set([
          "background",
          "cite",
          "href",
          "itemtype",
          "longdesc",
          "poster",
          "src",
          "xlink:href",
        ]),
        Xi = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
        Yi = (e, t) => {
          const n = e.nodeName.toLowerCase();
          return t.includes(n)
            ? !Qi.has(n) || Boolean(Xi.test(e.nodeValue))
            : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
        },
        Ji = {
          allowList: Ui,
          content: {},
          extraClass: "",
          html: !1,
          sanitize: !0,
          sanitizeFn: null,
          template: "<div></div>",
        },
        Zi = {
          allowList: "object",
          content: "object",
          extraClass: "(string|function)",
          html: "boolean",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          template: "string",
        },
        Gi = {
          entry: "(string|element|function|null)",
          selector: "(string|element)",
        };
      class er extends bt {
        constructor(e) {
          super(), (this._config = this._getConfig(e));
        }
        static get Default() {
          return Ji;
        }
        static get DefaultType() {
          return Zi;
        }
        static get NAME() {
          return "TemplateFactory";
        }
        getContent() {
          return Object.values(this._config.content)
            .map((e) => this._resolvePossibleFunction(e))
            .filter(Boolean);
        }
        hasContent() {
          return this.getContent().length > 0;
        }
        changeContent(e) {
          return (
            this._checkContent(e),
            (this._config.content = { ...this._config.content, ...e }),
            this
          );
        }
        toHtml() {
          const e = document.createElement("div");
          e.innerHTML = this._maybeSanitize(this._config.template);
          for (const [t, n] of Object.entries(this._config.content))
            this._setContent(e, n, t);
          const t = e.children[0],
            n = this._resolvePossibleFunction(this._config.extraClass);
          return n && t.classList.add(...n.split(" ")), t;
        }
        _typeCheckConfig(e) {
          super._typeCheckConfig(e), this._checkContent(e.content);
        }
        _checkContent(e) {
          for (const [t, n] of Object.entries(e))
            super._typeCheckConfig({ selector: t, entry: n }, Gi);
        }
        _setContent(e, t, n) {
          const i = Et.findOne(n, e);
          i &&
            ((t = this._resolvePossibleFunction(t))
              ? Be(t)
                ? this._putElementInTemplate(Re(t), i)
                : this._config.html
                ? (i.innerHTML = this._maybeSanitize(t))
                : (i.textContent = t)
              : i.remove());
        }
        _maybeSanitize(e) {
          return this._config.sanitize
            ? (function (e, t, n) {
                if (!e.length) return e;
                if (n && "function" == typeof n) return n(e);
                const i = new window.DOMParser().parseFromString(
                    e,
                    "text/html",
                  ),
                  r = [].concat(...i.body.querySelectorAll("*"));
                for (const e of r) {
                  const n = e.nodeName.toLowerCase();
                  if (!Object.keys(t).includes(n)) {
                    e.remove();
                    continue;
                  }
                  const i = [].concat(...e.attributes),
                    r = [].concat(t["*"] || [], t[n] || []);
                  for (const t of i) Yi(t, r) || e.removeAttribute(t.nodeName);
                }
                return i.body.innerHTML;
              })(e, this._config.allowList, this._config.sanitizeFn)
            : e;
        }
        _resolvePossibleFunction(e) {
          return Ye(e, [this]);
        }
        _putElementInTemplate(e, t) {
          if (this._config.html) return (t.innerHTML = ""), void t.append(e);
          t.textContent = e.textContent;
        }
      }
      const tr = new Set(["sanitize", "allowList", "sanitizeFn"]),
        nr = "fade",
        ir = "show",
        rr = ".modal",
        sr = "hide.bs.modal",
        or = "hover",
        ar = "focus",
        lr = {
          AUTO: "auto",
          TOP: "top",
          RIGHT: Qe() ? "left" : "right",
          BOTTOM: "bottom",
          LEFT: Qe() ? "right" : "left",
        },
        cr = {
          allowList: Ui,
          animation: !0,
          boundary: "clippingParents",
          container: !1,
          customClass: "",
          delay: 0,
          fallbackPlacements: ["top", "right", "bottom", "left"],
          html: !1,
          offset: [0, 6],
          placement: "top",
          popperConfig: null,
          sanitize: !0,
          sanitizeFn: null,
          selector: !1,
          template:
            '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
          title: "",
          trigger: "hover focus",
        },
        ur = {
          allowList: "object",
          animation: "boolean",
          boundary: "(string|element)",
          container: "(string|element|boolean)",
          customClass: "(string|function)",
          delay: "(number|object)",
          fallbackPlacements: "array",
          html: "boolean",
          offset: "(array|string|function)",
          placement: "(string|function)",
          popperConfig: "(null|object|function)",
          sanitize: "boolean",
          sanitizeFn: "(null|function)",
          selector: "(string|boolean)",
          template: "string",
          title: "(string|element|function)",
          trigger: "string",
        };
      class hr extends yt {
        constructor(e, t) {
          if (void 0 === i)
            throw new TypeError(
              "Bootstrap's tooltips require Popper (https://popper.js.org)",
            );
          super(e, t),
            (this._isEnabled = !0),
            (this._timeout = 0),
            (this._isHovered = null),
            (this._activeTrigger = {}),
            (this._popper = null),
            (this._templateFactory = null),
            (this._newContent = null),
            (this.tip = null),
            this._setListeners(),
            this._config.selector || this._fixTitle();
        }
        static get Default() {
          return cr;
        }
        static get DefaultType() {
          return ur;
        }
        static get NAME() {
          return "tooltip";
        }
        enable() {
          this._isEnabled = !0;
        }
        disable() {
          this._isEnabled = !1;
        }
        toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        }
        toggle() {
          this._isEnabled &&
            ((this._activeTrigger.click = !this._activeTrigger.click),
            this._isShown() ? this._leave() : this._enter());
        }
        dispose() {
          clearTimeout(this._timeout),
            pt.off(this._element.closest(rr), sr, this._hideModalHandler),
            this._element.getAttribute("data-bs-original-title") &&
              this._element.setAttribute(
                "title",
                this._element.getAttribute("data-bs-original-title"),
              ),
            this._disposePopper(),
            super.dispose();
        }
        show() {
          if ("none" === this._element.style.display)
            throw new Error("Please use show on visible elements");
          if (!this._isWithContent() || !this._isEnabled) return;
          const e = pt.trigger(
              this._element,
              this.constructor.eventName("show"),
            ),
            t = (
              Ve(this._element) || this._element.ownerDocument.documentElement
            ).contains(this._element);
          if (e.defaultPrevented || !t) return;
          this._disposePopper();
          const n = this._getTipElement();
          this._element.setAttribute("aria-describedby", n.getAttribute("id"));
          const { container: i } = this._config;
          if (
            (this._element.ownerDocument.documentElement.contains(this.tip) ||
              (i.append(n),
              pt.trigger(
                this._element,
                this.constructor.eventName("inserted"),
              )),
            (this._popper = this._createPopper(n)),
            n.classList.add(ir),
            "ontouchstart" in document.documentElement)
          )
            for (const e of [].concat(...document.body.children))
              pt.on(e, "mouseover", We);
          this._queueCallback(
            () => {
              pt.trigger(this._element, this.constructor.eventName("shown")),
                !1 === this._isHovered && this._leave(),
                (this._isHovered = !1);
            },
            this.tip,
            this._isAnimated(),
          );
        }
        hide() {
          if (
            this._isShown() &&
            !pt.trigger(this._element, this.constructor.eventName("hide"))
              .defaultPrevented
          ) {
            if (
              (this._getTipElement().classList.remove(ir),
              "ontouchstart" in document.documentElement)
            )
              for (const e of [].concat(...document.body.children))
                pt.off(e, "mouseover", We);
            (this._activeTrigger.click = !1),
              (this._activeTrigger[ar] = !1),
              (this._activeTrigger[or] = !1),
              (this._isHovered = null),
              this._queueCallback(
                () => {
                  this._isWithActiveTrigger() ||
                    (this._isHovered || this._disposePopper(),
                    this._element.removeAttribute("aria-describedby"),
                    pt.trigger(
                      this._element,
                      this.constructor.eventName("hidden"),
                    ));
                },
                this.tip,
                this._isAnimated(),
              );
          }
        }
        update() {
          this._popper && this._popper.update();
        }
        _isWithContent() {
          return Boolean(this._getTitle());
        }
        _getTipElement() {
          return (
            this.tip ||
              (this.tip = this._createTipElement(
                this._newContent || this._getContentForTemplate(),
              )),
            this.tip
          );
        }
        _createTipElement(e) {
          const t = this._getTemplateFactory(e).toHtml();
          if (!t) return null;
          t.classList.remove(nr, ir),
            t.classList.add(`bs-${this.constructor.NAME}-auto`);
          const n = ((e) => {
            do {
              e += Math.floor(1e6 * Math.random());
            } while (document.getElementById(e));
            return e;
          })(this.constructor.NAME).toString();
          return (
            t.setAttribute("id", n),
            this._isAnimated() && t.classList.add(nr),
            t
          );
        }
        setContent(e) {
          (this._newContent = e),
            this._isShown() && (this._disposePopper(), this.show());
        }
        _getTemplateFactory(e) {
          return (
            this._templateFactory
              ? this._templateFactory.changeContent(e)
              : (this._templateFactory = new er({
                  ...this._config,
                  content: e,
                  extraClass: this._resolvePossibleFunction(
                    this._config.customClass,
                  ),
                })),
            this._templateFactory
          );
        }
        _getContentForTemplate() {
          return { ".tooltip-inner": this._getTitle() };
        }
        _getTitle() {
          return (
            this._resolvePossibleFunction(this._config.title) ||
            this._element.getAttribute("data-bs-original-title")
          );
        }
        _initializeOnDelegatedTarget(e) {
          return this.constructor.getOrCreateInstance(
            e.delegateTarget,
            this._getDelegateConfig(),
          );
        }
        _isAnimated() {
          return (
            this._config.animation ||
            (this.tip && this.tip.classList.contains(nr))
          );
        }
        _isShown() {
          return this.tip && this.tip.classList.contains(ir);
        }
        _createPopper(e) {
          const t = Ye(this._config.placement, [this, e, this._element]),
            n = lr[t.toUpperCase()];
          return De(this._element, e, this._getPopperConfig(n));
        }
        _getOffset() {
          const { offset: e } = this._config;
          return "string" == typeof e
            ? e.split(",").map((e) => Number.parseInt(e, 10))
            : "function" == typeof e
            ? (t) => e(t, this._element)
            : e;
        }
        _resolvePossibleFunction(e) {
          return Ye(e, [this._element]);
        }
        _getPopperConfig(e) {
          const t = {
            placement: e,
            modifiers: [
              {
                name: "flip",
                options: {
                  fallbackPlacements: this._config.fallbackPlacements,
                },
              },
              { name: "offset", options: { offset: this._getOffset() } },
              {
                name: "preventOverflow",
                options: { boundary: this._config.boundary },
              },
              {
                name: "arrow",
                options: { element: `.${this.constructor.NAME}-arrow` },
              },
              {
                name: "preSetPlacement",
                enabled: !0,
                phase: "beforeMain",
                fn: (e) => {
                  this._getTipElement().setAttribute(
                    "data-popper-placement",
                    e.state.placement,
                  );
                },
              },
            ],
          };
          return { ...t, ...Ye(this._config.popperConfig, [t]) };
        }
        _setListeners() {
          const e = this._config.trigger.split(" ");
          for (const t of e)
            if ("click" === t)
              pt.on(
                this._element,
                this.constructor.eventName("click"),
                this._config.selector,
                (e) => {
                  this._initializeOnDelegatedTarget(e).toggle();
                },
              );
            else if ("manual" !== t) {
              const e =
                  t === or
                    ? this.constructor.eventName("mouseenter")
                    : this.constructor.eventName("focusin"),
                n =
                  t === or
                    ? this.constructor.eventName("mouseleave")
                    : this.constructor.eventName("focusout");
              pt.on(this._element, e, this._config.selector, (e) => {
                const t = this._initializeOnDelegatedTarget(e);
                (t._activeTrigger["focusin" === e.type ? ar : or] = !0),
                  t._enter();
              }),
                pt.on(this._element, n, this._config.selector, (e) => {
                  const t = this._initializeOnDelegatedTarget(e);
                  (t._activeTrigger["focusout" === e.type ? ar : or] =
                    t._element.contains(e.relatedTarget)),
                    t._leave();
                });
            }
          (this._hideModalHandler = () => {
            this._element && this.hide();
          }),
            pt.on(this._element.closest(rr), sr, this._hideModalHandler);
        }
        _fixTitle() {
          const e = this._element.getAttribute("title");
          e &&
            (this._element.getAttribute("aria-label") ||
              this._element.textContent.trim() ||
              this._element.setAttribute("aria-label", e),
            this._element.setAttribute("data-bs-original-title", e),
            this._element.removeAttribute("title"));
        }
        _enter() {
          this._isShown() || this._isHovered
            ? (this._isHovered = !0)
            : ((this._isHovered = !0),
              this._setTimeout(() => {
                this._isHovered && this.show();
              }, this._config.delay.show));
        }
        _leave() {
          this._isWithActiveTrigger() ||
            ((this._isHovered = !1),
            this._setTimeout(() => {
              this._isHovered || this.hide();
            }, this._config.delay.hide));
        }
        _setTimeout(e, t) {
          clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
        }
        _isWithActiveTrigger() {
          return Object.values(this._activeTrigger).includes(!0);
        }
        _getConfig(e) {
          const t = _t.getDataAttributes(this._element);
          for (const e of Object.keys(t)) tr.has(e) && delete t[e];
          return (
            (e = { ...t, ...("object" == typeof e && e ? e : {}) }),
            (e = this._mergeConfigObj(e)),
            (e = this._configAfterMerge(e)),
            this._typeCheckConfig(e),
            e
          );
        }
        _configAfterMerge(e) {
          return (
            (e.container =
              !1 === e.container ? document.body : Re(e.container)),
            "number" == typeof e.delay &&
              (e.delay = { show: e.delay, hide: e.delay }),
            "number" == typeof e.title && (e.title = e.title.toString()),
            "number" == typeof e.content && (e.content = e.content.toString()),
            e
          );
        }
        _getDelegateConfig() {
          const e = {};
          for (const [t, n] of Object.entries(this._config))
            this.constructor.Default[t] !== n && (e[t] = n);
          return (e.selector = !1), (e.trigger = "manual"), e;
        }
        _disposePopper() {
          this._popper && (this._popper.destroy(), (this._popper = null)),
            this.tip && (this.tip.remove(), (this.tip = null));
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = hr.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === t[e])
                throw new TypeError(`No method named "${e}"`);
              t[e]();
            }
          });
        }
      }
      Xe(hr);
      const dr = {
          ...hr.Default,
          content: "",
          offset: [0, 8],
          placement: "right",
          template:
            '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
          trigger: "click",
        },
        fr = { ...hr.DefaultType, content: "(null|string|element|function)" };
      class pr extends hr {
        static get Default() {
          return dr;
        }
        static get DefaultType() {
          return fr;
        }
        static get NAME() {
          return "popover";
        }
        _isWithContent() {
          return this._getTitle() || this._getContent();
        }
        _getContentForTemplate() {
          return {
            ".popover-header": this._getTitle(),
            ".popover-body": this._getContent(),
          };
        }
        _getContent() {
          return this._resolvePossibleFunction(this._config.content);
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = pr.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === t[e])
                throw new TypeError(`No method named "${e}"`);
              t[e]();
            }
          });
        }
      }
      Xe(pr);
      const gr = ".bs.scrollspy",
        mr = `activate${gr}`,
        vr = `click${gr}`,
        _r = `load${gr}.data-api`,
        br = "active",
        yr = "[href]",
        wr = ".nav-link",
        Er = `${wr}, .nav-item > ${wr}, .list-group-item`,
        Ar = {
          offset: null,
          rootMargin: "0px 0px -25%",
          smoothScroll: !1,
          target: null,
          threshold: [0.1, 0.5, 1],
        },
        Or = {
          offset: "(number|null)",
          rootMargin: "string",
          smoothScroll: "boolean",
          target: "element",
          threshold: "array",
        };
      class xr extends yt {
        constructor(e, t) {
          super(e, t),
            (this._targetLinks = new Map()),
            (this._observableSections = new Map()),
            (this._rootElement =
              "visible" === getComputedStyle(this._element).overflowY
                ? null
                : this._element),
            (this._activeTarget = null),
            (this._observer = null),
            (this._previousScrollData = {
              visibleEntryTop: 0,
              parentScrollTop: 0,
            }),
            this.refresh();
        }
        static get Default() {
          return Ar;
        }
        static get DefaultType() {
          return Or;
        }
        static get NAME() {
          return "scrollspy";
        }
        refresh() {
          this._initializeTargetsAndObservables(),
            this._maybeEnableSmoothScroll(),
            this._observer
              ? this._observer.disconnect()
              : (this._observer = this._getNewObserver());
          for (const e of this._observableSections.values())
            this._observer.observe(e);
        }
        dispose() {
          this._observer.disconnect(), super.dispose();
        }
        _configAfterMerge(e) {
          return (
            (e.target = Re(e.target) || document.body),
            (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
            "string" == typeof e.threshold &&
              (e.threshold = e.threshold
                .split(",")
                .map((e) => Number.parseFloat(e))),
            e
          );
        }
        _maybeEnableSmoothScroll() {
          this._config.smoothScroll &&
            (pt.off(this._config.target, vr),
            pt.on(this._config.target, vr, yr, (e) => {
              const t = this._observableSections.get(e.target.hash);
              if (t) {
                e.preventDefault();
                const n = this._rootElement || window,
                  i = t.offsetTop - this._element.offsetTop;
                if (n.scrollTo)
                  return void n.scrollTo({ top: i, behavior: "smooth" });
                n.scrollTop = i;
              }
            }));
        }
        _getNewObserver() {
          const e = {
            root: this._rootElement,
            threshold: this._config.threshold,
            rootMargin: this._config.rootMargin,
          };
          return new IntersectionObserver((e) => this._observerCallback(e), e);
        }
        _observerCallback(e) {
          const t = (e) => this._targetLinks.get(`#${e.target.id}`),
            n = (e) => {
              (this._previousScrollData.visibleEntryTop = e.target.offsetTop),
                this._process(t(e));
            },
            i = (this._rootElement || document.documentElement).scrollTop,
            r = i >= this._previousScrollData.parentScrollTop;
          this._previousScrollData.parentScrollTop = i;
          for (const s of e) {
            if (!s.isIntersecting) {
              (this._activeTarget = null), this._clearActiveClass(t(s));
              continue;
            }
            const e =
              s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
            if (r && e) {
              if ((n(s), !i)) return;
            } else r || e || n(s);
          }
        }
        _initializeTargetsAndObservables() {
          (this._targetLinks = new Map()),
            (this._observableSections = new Map());
          const e = Et.find(yr, this._config.target);
          for (const t of e) {
            if (!t.hash || qe(t)) continue;
            const e = Et.findOne(decodeURI(t.hash), this._element);
            He(e) &&
              (this._targetLinks.set(decodeURI(t.hash), t),
              this._observableSections.set(t.hash, e));
          }
        }
        _process(e) {
          this._activeTarget !== e &&
            (this._clearActiveClass(this._config.target),
            (this._activeTarget = e),
            e.classList.add(br),
            this._activateParents(e),
            pt.trigger(this._element, mr, { relatedTarget: e }));
        }
        _activateParents(e) {
          if (e.classList.contains("dropdown-item"))
            Et.findOne(
              ".dropdown-toggle",
              e.closest(".dropdown"),
            ).classList.add(br);
          else
            for (const t of Et.parents(e, ".nav, .list-group"))
              for (const e of Et.prev(t, Er)) e.classList.add(br);
        }
        _clearActiveClass(e) {
          e.classList.remove(br);
          const t = Et.find(`${yr}.${br}`, e);
          for (const e of t) e.classList.remove(br);
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = xr.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                throw new TypeError(`No method named "${e}"`);
              t[e]();
            }
          });
        }
      }
      pt.on(window, _r, () => {
        for (const e of Et.find('[data-bs-spy="scroll"]'))
          xr.getOrCreateInstance(e);
      }),
        Xe(xr);
      const Cr = ".bs.tab",
        Tr = `hide${Cr}`,
        Sr = `hidden${Cr}`,
        kr = `show${Cr}`,
        Nr = `shown${Cr}`,
        Lr = `click${Cr}`,
        Dr = `keydown${Cr}`,
        Mr = `load${Cr}`,
        $r = "ArrowLeft",
        Ir = "ArrowRight",
        Pr = "ArrowUp",
        jr = "ArrowDown",
        Fr = "Home",
        Br = "End",
        Rr = "active",
        Hr = "fade",
        qr = "show",
        Vr = ".dropdown-toggle",
        Wr = `:not(${Vr})`,
        Kr =
          '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        zr = `.nav-link${Wr}, .list-group-item${Wr}, [role="tab"]${Wr}, ${Kr}`,
        Ur = `.${Rr}[data-bs-toggle="tab"], .${Rr}[data-bs-toggle="pill"], .${Rr}[data-bs-toggle="list"]`;
      class Qr extends yt {
        constructor(e) {
          super(e),
            (this._parent = this._element.closest(
              '.list-group, .nav, [role="tablist"]',
            )),
            this._parent &&
              (this._setInitialAttributes(this._parent, this._getChildren()),
              pt.on(this._element, Dr, (e) => this._keydown(e)));
        }
        static get NAME() {
          return "tab";
        }
        show() {
          const e = this._element;
          if (this._elemIsActive(e)) return;
          const t = this._getActiveElem(),
            n = t ? pt.trigger(t, Tr, { relatedTarget: e }) : null;
          pt.trigger(e, kr, { relatedTarget: t }).defaultPrevented ||
            (n && n.defaultPrevented) ||
            (this._deactivate(t, e), this._activate(e, t));
        }
        _activate(e, t) {
          e &&
            (e.classList.add(Rr),
            this._activate(Et.getElementFromSelector(e)),
            this._queueCallback(
              () => {
                "tab" === e.getAttribute("role")
                  ? (e.removeAttribute("tabindex"),
                    e.setAttribute("aria-selected", !0),
                    this._toggleDropDown(e, !0),
                    pt.trigger(e, Nr, { relatedTarget: t }))
                  : e.classList.add(qr);
              },
              e,
              e.classList.contains(Hr),
            ));
        }
        _deactivate(e, t) {
          e &&
            (e.classList.remove(Rr),
            e.blur(),
            this._deactivate(Et.getElementFromSelector(e)),
            this._queueCallback(
              () => {
                "tab" === e.getAttribute("role")
                  ? (e.setAttribute("aria-selected", !1),
                    e.setAttribute("tabindex", "-1"),
                    this._toggleDropDown(e, !1),
                    pt.trigger(e, Sr, { relatedTarget: t }))
                  : e.classList.remove(qr);
              },
              e,
              e.classList.contains(Hr),
            ));
        }
        _keydown(e) {
          if (![$r, Ir, Pr, jr, Fr, Br].includes(e.key)) return;
          e.stopPropagation(), e.preventDefault();
          const t = this._getChildren().filter((e) => !qe(e));
          let n;
          if ([Fr, Br].includes(e.key)) n = t[e.key === Fr ? 0 : t.length - 1];
          else {
            const i = [Ir, jr].includes(e.key);
            n = Ze(t, e.target, i, !0);
          }
          n &&
            (n.focus({ preventScroll: !0 }), Qr.getOrCreateInstance(n).show());
        }
        _getChildren() {
          return Et.find(zr, this._parent);
        }
        _getActiveElem() {
          return this._getChildren().find((e) => this._elemIsActive(e)) || null;
        }
        _setInitialAttributes(e, t) {
          this._setAttributeIfNotExists(e, "role", "tablist");
          for (const e of t) this._setInitialAttributesOnChild(e);
        }
        _setInitialAttributesOnChild(e) {
          e = this._getInnerElement(e);
          const t = this._elemIsActive(e),
            n = this._getOuterElement(e);
          e.setAttribute("aria-selected", t),
            n !== e && this._setAttributeIfNotExists(n, "role", "presentation"),
            t || e.setAttribute("tabindex", "-1"),
            this._setAttributeIfNotExists(e, "role", "tab"),
            this._setInitialAttributesOnTargetPanel(e);
        }
        _setInitialAttributesOnTargetPanel(e) {
          const t = Et.getElementFromSelector(e);
          t &&
            (this._setAttributeIfNotExists(t, "role", "tabpanel"),
            e.id &&
              this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
        }
        _toggleDropDown(e, t) {
          const n = this._getOuterElement(e);
          if (!n.classList.contains("dropdown")) return;
          const i = (e, i) => {
            const r = Et.findOne(e, n);
            r && r.classList.toggle(i, t);
          };
          i(Vr, Rr),
            i(".dropdown-menu", qr),
            n.setAttribute("aria-expanded", t);
        }
        _setAttributeIfNotExists(e, t, n) {
          e.hasAttribute(t) || e.setAttribute(t, n);
        }
        _elemIsActive(e) {
          return e.classList.contains(Rr);
        }
        _getInnerElement(e) {
          return e.matches(zr) ? e : Et.findOne(zr, e);
        }
        _getOuterElement(e) {
          return e.closest(".nav-item, .list-group-item") || e;
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = Qr.getOrCreateInstance(this);
            if ("string" == typeof e) {
              if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                throw new TypeError(`No method named "${e}"`);
              t[e]();
            }
          });
        }
      }
      pt.on(document, Lr, Kr, function (e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
          qe(this) || Qr.getOrCreateInstance(this).show();
      }),
        pt.on(window, Mr, () => {
          for (const e of Et.find(Ur)) Qr.getOrCreateInstance(e);
        }),
        Xe(Qr);
      const Xr = ".bs.toast",
        Yr = `mouseover${Xr}`,
        Jr = `mouseout${Xr}`,
        Zr = `focusin${Xr}`,
        Gr = `focusout${Xr}`,
        es = `hide${Xr}`,
        ts = `hidden${Xr}`,
        ns = `show${Xr}`,
        is = `shown${Xr}`,
        rs = "hide",
        ss = "show",
        os = "showing",
        as = { animation: "boolean", autohide: "boolean", delay: "number" },
        ls = { animation: !0, autohide: !0, delay: 5e3 };
      class cs extends yt {
        constructor(e, t) {
          super(e, t),
            (this._timeout = null),
            (this._hasMouseInteraction = !1),
            (this._hasKeyboardInteraction = !1),
            this._setListeners();
        }
        static get Default() {
          return ls;
        }
        static get DefaultType() {
          return as;
        }
        static get NAME() {
          return "toast";
        }
        show() {
          pt.trigger(this._element, ns).defaultPrevented ||
            (this._clearTimeout(),
            this._config.animation && this._element.classList.add("fade"),
            this._element.classList.remove(rs),
            Ke(this._element),
            this._element.classList.add(ss, os),
            this._queueCallback(
              () => {
                this._element.classList.remove(os),
                  pt.trigger(this._element, is),
                  this._maybeScheduleHide();
              },
              this._element,
              this._config.animation,
            ));
        }
        hide() {
          this.isShown() &&
            (pt.trigger(this._element, es).defaultPrevented ||
              (this._element.classList.add(os),
              this._queueCallback(
                () => {
                  this._element.classList.add(rs),
                    this._element.classList.remove(os, ss),
                    pt.trigger(this._element, ts);
                },
                this._element,
                this._config.animation,
              )));
        }
        dispose() {
          this._clearTimeout(),
            this.isShown() && this._element.classList.remove(ss),
            super.dispose();
        }
        isShown() {
          return this._element.classList.contains(ss);
        }
        _maybeScheduleHide() {
          this._config.autohide &&
            (this._hasMouseInteraction ||
              this._hasKeyboardInteraction ||
              (this._timeout = setTimeout(() => {
                this.hide();
              }, this._config.delay)));
        }
        _onInteraction(e, t) {
          switch (e.type) {
            case "mouseover":
            case "mouseout":
              this._hasMouseInteraction = t;
              break;
            case "focusin":
            case "focusout":
              this._hasKeyboardInteraction = t;
          }
          if (t) return void this._clearTimeout();
          const n = e.relatedTarget;
          this._element === n ||
            this._element.contains(n) ||
            this._maybeScheduleHide();
        }
        _setListeners() {
          pt.on(this._element, Yr, (e) => this._onInteraction(e, !0)),
            pt.on(this._element, Jr, (e) => this._onInteraction(e, !1)),
            pt.on(this._element, Zr, (e) => this._onInteraction(e, !0)),
            pt.on(this._element, Gr, (e) => this._onInteraction(e, !1));
        }
        _clearTimeout() {
          clearTimeout(this._timeout), (this._timeout = null);
        }
        static jQueryInterface(e) {
          return this.each(function () {
            const t = cs.getOrCreateInstance(this, e);
            if ("string" == typeof e) {
              if (void 0 === t[e])
                throw new TypeError(`No method named "${e}"`);
              t[e](this);
            }
          });
        }
      }
      At(cs), Xe(cs);
    },
    484: function (e, t, n) {
      e.exports = (function (e, t, n, i) {
        "use strict";
        const r = ".bs.alert",
          s = `close${r}`,
          o = `closed${r}`;
        class a extends e {
          static get NAME() {
            return "alert";
          }
          close() {
            if (t.trigger(this._element, s).defaultPrevented) return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, e);
          }
          _destroyElement() {
            this._element.remove(), t.trigger(this._element, o), this.dispose();
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = a.getOrCreateInstance(this);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e](this);
              }
            });
          }
        }
        return n.enableDismissTrigger(a, "close"), i.defineJQueryPlugin(a), a;
      })(n(11), n(956), n(248), n(35));
    },
    11: function (e, t, n) {
      e.exports = (function (e, t, n, i) {
        "use strict";
        return class extends n {
          constructor(t, n) {
            super(),
              (t = i.getElement(t)) &&
                ((this._element = t),
                (this._config = this._getConfig(n)),
                e.set(this._element, this.constructor.DATA_KEY, this));
          }
          dispose() {
            e.remove(this._element, this.constructor.DATA_KEY),
              t.off(this._element, this.constructor.EVENT_KEY);
            for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
          }
          _queueCallback(e, t, n = !0) {
            i.executeAfterTransition(e, t, n);
          }
          _getConfig(e) {
            return (
              (e = this._mergeConfigObj(e, this._element)),
              (e = this._configAfterMerge(e)),
              this._typeCheckConfig(e),
              e
            );
          }
          static getInstance(t) {
            return e.get(i.getElement(t), this.DATA_KEY);
          }
          static getOrCreateInstance(e, t = {}) {
            return (
              this.getInstance(e) ||
              new this(e, "object" == typeof t ? t : null)
            );
          }
          static get VERSION() {
            return "5.3.3";
          }
          static get DATA_KEY() {
            return `bs.${this.NAME}`;
          }
          static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
          }
          static eventName(e) {
            return `${e}${this.EVENT_KEY}`;
          }
        };
      })(n(269), n(956), n(105), n(35));
    },
    269: function (e) {
      e.exports = (function () {
        "use strict";
        const e = new Map();
        return {
          set(t, n, i) {
            e.has(t) || e.set(t, new Map());
            const r = e.get(t);
            r.has(n) || 0 === r.size
              ? r.set(n, i)
              : console.error(
                  `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                    Array.from(r.keys())[0]
                  }.`,
                );
          },
          get(t, n) {
            return (e.has(t) && e.get(t).get(n)) || null;
          },
          remove(t, n) {
            if (!e.has(t)) return;
            const i = e.get(t);
            i.delete(n), 0 === i.size && e.delete(t);
          },
        };
      })();
    },
    956: function (e, t, n) {
      e.exports = (function (e) {
        "use strict";
        const t = /[^.]*(?=\..*)\.|.*/,
          n = /\..*/,
          i = /::\d+$/,
          r = {};
        let s = 1;
        const o = { mouseenter: "mouseover", mouseleave: "mouseout" },
          a = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
          ]);
        function l(e, t) {
          return (t && `${t}::${s++}`) || e.uidEvent || s++;
        }
        function c(e) {
          const t = l(e);
          return (e.uidEvent = t), (r[t] = r[t] || {}), r[t];
        }
        function u(e, t, n = null) {
          return Object.values(e).find(
            (e) => e.callable === t && e.delegationSelector === n,
          );
        }
        function h(e, t, n) {
          const i = "string" == typeof t,
            r = i ? n : t || n;
          let s = g(e);
          return a.has(s) || (s = e), [i, r, s];
        }
        function d(e, n, i, r, s) {
          if ("string" != typeof n || !e) return;
          let [a, d, f] = h(n, i, r);
          if (n in o) {
            const e = (e) =>
              function (t) {
                if (
                  !t.relatedTarget ||
                  (t.relatedTarget !== t.delegateTarget &&
                    !t.delegateTarget.contains(t.relatedTarget))
                )
                  return e.call(this, t);
              };
            d = e(d);
          }
          const p = c(e),
            g = p[f] || (p[f] = {}),
            _ = u(g, d, a ? i : null);
          if (_) return void (_.oneOff = _.oneOff && s);
          const b = l(d, n.replace(t, "")),
            y = a
              ? (function (e, t, n) {
                  return function i(r) {
                    const s = e.querySelectorAll(t);
                    for (
                      let { target: o } = r;
                      o && o !== this;
                      o = o.parentNode
                    )
                      for (const a of s)
                        if (a === o)
                          return (
                            v(r, { delegateTarget: o }),
                            i.oneOff && m.off(e, r.type, t, n),
                            n.apply(o, [r])
                          );
                  };
                })(e, i, d)
              : (function (e, t) {
                  return function n(i) {
                    return (
                      v(i, { delegateTarget: e }),
                      n.oneOff && m.off(e, i.type, t),
                      t.apply(e, [i])
                    );
                  };
                })(e, d);
          (y.delegationSelector = a ? i : null),
            (y.callable = d),
            (y.oneOff = s),
            (y.uidEvent = b),
            (g[b] = y),
            e.addEventListener(f, y, a);
        }
        function f(e, t, n, i, r) {
          const s = u(t[n], i, r);
          s &&
            (e.removeEventListener(n, s, Boolean(r)), delete t[n][s.uidEvent]);
        }
        function p(e, t, n, i) {
          const r = t[n] || {};
          for (const [s, o] of Object.entries(r))
            s.includes(i) && f(e, t, n, o.callable, o.delegationSelector);
        }
        function g(e) {
          return (e = e.replace(n, "")), o[e] || e;
        }
        const m = {
          on(e, t, n, i) {
            d(e, t, n, i, !1);
          },
          one(e, t, n, i) {
            d(e, t, n, i, !0);
          },
          off(e, t, n, r) {
            if ("string" != typeof t || !e) return;
            const [s, o, a] = h(t, n, r),
              l = a !== t,
              u = c(e),
              d = u[a] || {},
              g = t.startsWith(".");
            if (void 0 === o) {
              if (g) for (const n of Object.keys(u)) p(e, u, n, t.slice(1));
              for (const [n, r] of Object.entries(d)) {
                const s = n.replace(i, "");
                (l && !t.includes(s)) ||
                  f(e, u, a, r.callable, r.delegationSelector);
              }
            } else {
              if (!Object.keys(d).length) return;
              f(e, u, a, o, s ? n : null);
            }
          },
          trigger(t, n, i) {
            if ("string" != typeof n || !t) return null;
            const r = e.getjQuery();
            let s = null,
              o = !0,
              a = !0,
              l = !1;
            n !== g(n) &&
              r &&
              ((s = r.Event(n, i)),
              r(t).trigger(s),
              (o = !s.isPropagationStopped()),
              (a = !s.isImmediatePropagationStopped()),
              (l = s.isDefaultPrevented()));
            const c = v(new Event(n, { bubbles: o, cancelable: !0 }), i);
            return (
              l && c.preventDefault(),
              a && t.dispatchEvent(c),
              c.defaultPrevented && s && s.preventDefault(),
              c
            );
          },
        };
        function v(e, t = {}) {
          for (const [n, i] of Object.entries(t))
            try {
              e[n] = i;
            } catch (t) {
              Object.defineProperty(e, n, {
                configurable: !0,
                get() {
                  return i;
                },
              });
            }
          return e;
        }
        return m;
      })(n(35));
    },
    333: function (e) {
      e.exports = (function () {
        "use strict";
        function e(e) {
          if ("true" === e) return !0;
          if ("false" === e) return !1;
          if (e === Number(e).toString()) return Number(e);
          if ("" === e || "null" === e) return null;
          if ("string" != typeof e) return e;
          try {
            return JSON.parse(decodeURIComponent(e));
          } catch (t) {
            return e;
          }
        }
        function t(e) {
          return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
        }
        return {
          setDataAttribute(e, n, i) {
            e.setAttribute(`data-bs-${t(n)}`, i);
          },
          removeDataAttribute(e, n) {
            e.removeAttribute(`data-bs-${t(n)}`);
          },
          getDataAttributes(t) {
            if (!t) return {};
            const n = {},
              i = Object.keys(t.dataset).filter(
                (e) => e.startsWith("bs") && !e.startsWith("bsConfig"),
              );
            for (const r of i) {
              let i = r.replace(/^bs/, "");
              (i = i.charAt(0).toLowerCase() + i.slice(1, i.length)),
                (n[i] = e(t.dataset[r]));
            }
            return n;
          },
          getDataAttribute(n, i) {
            return e(n.getAttribute(`data-bs-${t(i)}`));
          },
        };
      })();
    },
    411: function (e, t, n) {
      e.exports = (function (e) {
        "use strict";
        const t = (t) => {
            let n = t.getAttribute("data-bs-target");
            if (!n || "#" === n) {
              let e = t.getAttribute("href");
              if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
              e.includes("#") &&
                !e.startsWith("#") &&
                (e = `#${e.split("#")[1]}`),
                (n = e && "#" !== e ? e.trim() : null);
            }
            return n
              ? n
                  .split(",")
                  .map((t) => e.parseSelector(t))
                  .join(",")
              : null;
          },
          n = {
            find(e, t = document.documentElement) {
              return [].concat(
                ...Element.prototype.querySelectorAll.call(t, e),
              );
            },
            findOne(e, t = document.documentElement) {
              return Element.prototype.querySelector.call(t, e);
            },
            children(e, t) {
              return [].concat(...e.children).filter((e) => e.matches(t));
            },
            parents(e, t) {
              const n = [];
              let i = e.parentNode.closest(t);
              for (; i; ) n.push(i), (i = i.parentNode.closest(t));
              return n;
            },
            prev(e, t) {
              let n = e.previousElementSibling;
              for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.previousElementSibling;
              }
              return [];
            },
            next(e, t) {
              let n = e.nextElementSibling;
              for (; n; ) {
                if (n.matches(t)) return [n];
                n = n.nextElementSibling;
              }
              return [];
            },
            focusableChildren(t) {
              const n = [
                "a",
                "button",
                "input",
                "textarea",
                "select",
                "details",
                "[tabindex]",
                '[contenteditable="true"]',
              ]
                .map((e) => `${e}:not([tabindex^="-"])`)
                .join(",");
              return this.find(n, t).filter(
                (t) => !e.isDisabled(t) && e.isVisible(t),
              );
            },
            getSelectorFromElement(e) {
              const i = t(e);
              return i && n.findOne(i) ? i : null;
            },
            getElementFromSelector(e) {
              const i = t(e);
              return i ? n.findOne(i) : null;
            },
            getMultipleElementsFromSelector(e) {
              const i = t(e);
              return i ? n.find(i) : [];
            },
          };
        return n;
      })(n(35));
    },
    248: function (e, t, n) {
      !(function (e, t, n, i) {
        "use strict";
        (e.enableDismissTrigger = (e, r = "hide") => {
          const s = `click.dismiss${e.EVENT_KEY}`,
            o = e.NAME;
          t.on(document, s, `[data-bs-dismiss="${o}"]`, function (t) {
            if (
              (["A", "AREA"].includes(this.tagName) && t.preventDefault(),
              i.isDisabled(this))
            )
              return;
            const s = n.getElementFromSelector(this) || this.closest(`.${o}`);
            e.getOrCreateInstance(s)[r]();
          });
        }),
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
      })(t, n(956), n(411), n(35));
    },
    105: function (e, t, n) {
      e.exports = (function (e, t) {
        "use strict";
        return class {
          static get Default() {
            return {};
          }
          static get DefaultType() {
            return {};
          }
          static get NAME() {
            throw new Error(
              'You have to implement the static method "NAME", for each component!',
            );
          }
          _getConfig(e) {
            return (
              (e = this._mergeConfigObj(e)),
              (e = this._configAfterMerge(e)),
              this._typeCheckConfig(e),
              e
            );
          }
          _configAfterMerge(e) {
            return e;
          }
          _mergeConfigObj(n, i) {
            const r = t.isElement(i) ? e.getDataAttribute(i, "config") : {};
            return {
              ...this.constructor.Default,
              ...("object" == typeof r ? r : {}),
              ...(t.isElement(i) ? e.getDataAttributes(i) : {}),
              ...("object" == typeof n ? n : {}),
            };
          }
          _typeCheckConfig(e, n = this.constructor.DefaultType) {
            for (const [i, r] of Object.entries(n)) {
              const n = e[i],
                s = t.isElement(n) ? "element" : t.toType(n);
              if (!new RegExp(r).test(s))
                throw new TypeError(
                  `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${s}" but expected type "${r}".`,
                );
            }
          }
        };
      })(n(333), n(35));
    },
    35: function (e, t) {
      !(function (e) {
        "use strict";
        const t = "transitionend",
          n = (e) => (
            e &&
              window.CSS &&
              window.CSS.escape &&
              (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
            e
          ),
          i = (e) => {
            if (!e) return 0;
            let { transitionDuration: t, transitionDelay: n } =
              window.getComputedStyle(e);
            const i = Number.parseFloat(t),
              r = Number.parseFloat(n);
            return i || r
              ? ((t = t.split(",")[0]),
                (n = n.split(",")[0]),
                1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
              : 0;
          },
          r = (e) => {
            e.dispatchEvent(new Event(t));
          },
          s = (e) =>
            !(!e || "object" != typeof e) &&
            (void 0 !== e.jquery && (e = e[0]), void 0 !== e.nodeType),
          o = (e) => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" == typeof e.getRootNode) {
              const t = e.getRootNode();
              return t instanceof ShadowRoot ? t : null;
            }
            return e instanceof ShadowRoot
              ? e
              : e.parentNode
              ? o(e.parentNode)
              : null;
          },
          a = () =>
            window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
              ? window.jQuery
              : null,
          l = [],
          c = (e) => {
            "loading" === document.readyState
              ? (l.length ||
                  document.addEventListener("DOMContentLoaded", () => {
                    for (const e of l) e();
                  }),
                l.push(e))
              : e();
          },
          u = (e, t = [], n = e) => ("function" == typeof e ? e(...t) : n);
        (e.defineJQueryPlugin = (e) => {
          c(() => {
            const t = a();
            if (t) {
              const n = e.NAME,
                i = t.fn[n];
              (t.fn[n] = e.jQueryInterface),
                (t.fn[n].Constructor = e),
                (t.fn[n].noConflict = () => ((t.fn[n] = i), e.jQueryInterface));
            }
          });
        }),
          (e.execute = u),
          (e.executeAfterTransition = (e, n, s = !0) => {
            if (!s) return void u(e);
            const o = i(n) + 5;
            let a = !1;
            const l = ({ target: i }) => {
              i === n && ((a = !0), n.removeEventListener(t, l), u(e));
            };
            n.addEventListener(t, l),
              setTimeout(() => {
                a || r(n);
              }, o);
          }),
          (e.findShadowRoot = o),
          (e.getElement = (e) =>
            s(e)
              ? e.jquery
                ? e[0]
                : e
              : "string" == typeof e && e.length > 0
              ? document.querySelector(n(e))
              : null),
          (e.getNextActiveElement = (e, t, n, i) => {
            const r = e.length;
            let s = e.indexOf(t);
            return -1 === s
              ? !n && i
                ? e[r - 1]
                : e[0]
              : ((s += n ? 1 : -1),
                i && (s = (s + r) % r),
                e[Math.max(0, Math.min(s, r - 1))]);
          }),
          (e.getTransitionDurationFromElement = i),
          (e.getUID = (e) => {
            do {
              e += Math.floor(1e6 * Math.random());
            } while (document.getElementById(e));
            return e;
          }),
          (e.getjQuery = a),
          (e.isDisabled = (e) =>
            !e ||
            e.nodeType !== Node.ELEMENT_NODE ||
            !!e.classList.contains("disabled") ||
            (void 0 !== e.disabled
              ? e.disabled
              : e.hasAttribute("disabled") &&
                "false" !== e.getAttribute("disabled"))),
          (e.isElement = s),
          (e.isRTL = () => "rtl" === document.documentElement.dir),
          (e.isVisible = (e) => {
            if (!s(e) || 0 === e.getClientRects().length) return !1;
            const t =
                "visible" ===
                getComputedStyle(e).getPropertyValue("visibility"),
              n = e.closest("details:not([open])");
            if (!n) return t;
            if (n !== e) {
              const t = e.closest("summary");
              if (t && t.parentNode !== n) return !1;
              if (null === t) return !1;
            }
            return t;
          }),
          (e.noop = () => {}),
          (e.onDOMContentLoaded = c),
          (e.parseSelector = n),
          (e.reflow = (e) => {
            e.offsetHeight;
          }),
          (e.toType = (e) =>
            null == e
              ? `${e}`
              : Object.prototype.toString
                  .call(e)
                  .match(/\s([a-z]+)/i)[1]
                  .toLowerCase()),
          (e.triggerTransitionEnd = r),
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
      })(t);
    },
    926: function (module, exports) {
      var __WEBPACK_AMD_DEFINE_FACTORY__,
        __WEBPACK_AMD_DEFINE_ARRAY__,
        __WEBPACK_AMD_DEFINE_RESULT__,
        t;
      "undefined" != typeof self && self,
        (t = function () {
          return (function () {
            "use strict";
            var Q = {
                onLoad: B,
                process: zt,
                on: de,
                off: ge,
                trigger: ce,
                ajax: Nr,
                find: C,
                findAll: f,
                closest: v,
                values: function (e, t) {
                  return dr(e, t || "post").values;
                },
                remove: _,
                addClass: z,
                removeClass: n,
                toggleClass: $,
                takeClass: W,
                defineExtension: Ur,
                removeExtension: Fr,
                logAll: V,
                logNone: j,
                logger: null,
                config: {
                  historyEnabled: !0,
                  historyCacheSize: 10,
                  refreshOnHistoryMiss: !1,
                  defaultSwapStyle: "innerHTML",
                  defaultSwapDelay: 0,
                  defaultSettleDelay: 20,
                  includeIndicatorStyles: !0,
                  indicatorClass: "htmx-indicator",
                  requestClass: "htmx-request",
                  addedClass: "htmx-added",
                  settlingClass: "htmx-settling",
                  swappingClass: "htmx-swapping",
                  allowEval: !0,
                  allowScriptTags: !0,
                  inlineScriptNonce: "",
                  attributesToSettle: ["class", "style", "width", "height"],
                  withCredentials: !1,
                  timeout: 0,
                  wsReconnectDelay: "full-jitter",
                  wsBinaryType: "blob",
                  disableSelector: "[hx-disable], [data-hx-disable]",
                  useTemplateFragments: !1,
                  scrollBehavior: "smooth",
                  defaultFocusScroll: !1,
                  getCacheBusterParam: !1,
                  globalViewTransitions: !1,
                  methodsThatUseUrlParams: ["get"],
                  selfRequestsOnly: !1,
                  ignoreTitle: !1,
                  scrollIntoViewOnBoost: !0,
                  triggerSpecsCache: null,
                },
                parseInterval: d,
                _: t,
                createEventSource: function (e) {
                  return new EventSource(e, { withCredentials: !0 });
                },
                createWebSocket: function (e) {
                  var t = new WebSocket(e, []);
                  return (t.binaryType = Q.config.wsBinaryType), t;
                },
                version: "1.9.11",
              },
              r = {
                addTriggerHandler: Lt,
                bodyContains: se,
                canAccessLocalStorage: U,
                findThisElement: xe,
                filterValues: yr,
                hasAttribute: o,
                getAttributeValue: te,
                getClosestAttributeValue: ne,
                getClosestMatch: c,
                getExpressionVars: Hr,
                getHeaders: xr,
                getInputValues: dr,
                getInternalData: ae,
                getSwapSpecification: wr,
                getTriggerSpecs: it,
                getTarget: ye,
                makeFragment: l,
                mergeObjects: le,
                makeSettleInfo: T,
                oobSwap: Ee,
                querySelectorExt: ue,
                selectAndSwap: je,
                settleImmediately: nr,
                shouldCancel: ut,
                triggerEvent: ce,
                triggerErrorEvent: fe,
                withExtensions: R,
              },
              w = ["get", "post", "put", "delete", "patch"],
              i = w
                .map(function (e) {
                  return "[hx-" + e + "], [data-hx-" + e + "]";
                })
                .join(", "),
              S = e("head"),
              q = e("title"),
              H = e("svg", !0);
            function e(e, t = !1) {
              return new RegExp(
                `<${e}(\\s[^>]*>|>)([\\s\\S]*?)<\\/${e}>`,
                t ? "gim" : "im",
              );
            }
            function d(e) {
              if (null == e) return;
              let t = NaN;
              return (
                (t =
                  "ms" == e.slice(-2)
                    ? parseFloat(e.slice(0, -2))
                    : "s" == e.slice(-1)
                    ? 1e3 * parseFloat(e.slice(0, -1))
                    : "m" == e.slice(-1)
                    ? 1e3 * parseFloat(e.slice(0, -1)) * 60
                    : parseFloat(e)),
                isNaN(t) ? void 0 : t
              );
            }
            function ee(e, t) {
              return e.getAttribute && e.getAttribute(t);
            }
            function o(e, t) {
              return (
                e.hasAttribute &&
                (e.hasAttribute(t) || e.hasAttribute("data-" + t))
              );
            }
            function te(e, t) {
              return ee(e, t) || ee(e, "data-" + t);
            }
            function u(e) {
              return e.parentElement;
            }
            function re() {
              return document;
            }
            function c(e, t) {
              for (; e && !t(e); ) e = u(e);
              return e || null;
            }
            function L(e, t, n) {
              var i = te(t, n),
                r = te(t, "hx-disinherit");
              return e !== t && r && ("*" === r || r.split(" ").indexOf(n) >= 0)
                ? "unset"
                : i;
            }
            function ne(e, t) {
              var n = null;
              if (
                (c(e, function (i) {
                  return (n = L(e, i, t));
                }),
                "unset" !== n)
              )
                return n;
            }
            function h(e, t) {
              var n =
                e.matches ||
                e.matchesSelector ||
                e.msMatchesSelector ||
                e.mozMatchesSelector ||
                e.webkitMatchesSelector ||
                e.oMatchesSelector;
              return n && n.call(e, t);
            }
            function A(e) {
              var t = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i.exec(e);
              return t ? t[1].toLowerCase() : "";
            }
            function s(e, t) {
              for (
                var n = new DOMParser().parseFromString(e, "text/html").body;
                t > 0;

              )
                t--, (n = n.firstChild);
              return null == n && (n = re().createDocumentFragment()), n;
            }
            function N(e) {
              return /<body/.test(e);
            }
            function l(e) {
              var t = !N(e),
                n = A(e),
                i = e;
              if (
                ("head" === n && (i = i.replace(S, "")),
                Q.config.useTemplateFragments && t)
              ) {
                var r = s(
                  "<body><template>" + i + "</template></body>",
                  0,
                ).querySelector("template").content;
                return (
                  Q.config.allowScriptTags
                    ? oe(r.querySelectorAll("script"), function (e) {
                        Q.config.inlineScriptNonce &&
                          (e.nonce = Q.config.inlineScriptNonce),
                          (e.htmxExecuted =
                            -1 === navigator.userAgent.indexOf("Firefox"));
                      })
                    : oe(r.querySelectorAll("script"), function (e) {
                        _(e);
                      }),
                  r
                );
              }
              switch (n) {
                case "thead":
                case "tbody":
                case "tfoot":
                case "colgroup":
                case "caption":
                  return s("<table>" + i + "</table>", 1);
                case "col":
                  return s("<table><colgroup>" + i + "</colgroup></table>", 2);
                case "tr":
                  return s("<table><tbody>" + i + "</tbody></table>", 2);
                case "td":
                case "th":
                  return s(
                    "<table><tbody><tr>" + i + "</tr></tbody></table>",
                    3,
                  );
                case "script":
                case "style":
                  return s("<div>" + i + "</div>", 1);
                default:
                  return s(i, 0);
              }
            }
            function ie(e) {
              e && e();
            }
            function I(e, t) {
              return Object.prototype.toString.call(e) === "[object " + t + "]";
            }
            function k(e) {
              return I(e, "Function");
            }
            function P(e) {
              return I(e, "Object");
            }
            function ae(e) {
              var t = "htmx-internal-data",
                n = e[t];
              return n || (n = e[t] = {}), n;
            }
            function M(e) {
              var t = [];
              if (e) for (var n = 0; n < e.length; n++) t.push(e[n]);
              return t;
            }
            function oe(e, t) {
              if (e) for (var n = 0; n < e.length; n++) t(e[n]);
            }
            function X(e) {
              var t = e.getBoundingClientRect(),
                n = t.top,
                i = t.bottom;
              return n < window.innerHeight && i >= 0;
            }
            function se(e) {
              return e.getRootNode &&
                e.getRootNode() instanceof window.ShadowRoot
                ? re().body.contains(e.getRootNode().host)
                : re().body.contains(e);
            }
            function D(e) {
              return e.trim().split(/\s+/);
            }
            function le(e, t) {
              for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
              return e;
            }
            function E(e) {
              try {
                return JSON.parse(e);
              } catch (e) {
                return b(e), null;
              }
            }
            function U() {
              var e = "htmx:localStorageTest";
              try {
                return (
                  localStorage.setItem(e, e), localStorage.removeItem(e), !0
                );
              } catch (e) {
                return !1;
              }
            }
            function F(e) {
              try {
                var t = new URL(e);
                return (
                  t && (e = t.pathname + t.search),
                  /^\/$/.test(e) || (e = e.replace(/\/+$/, "")),
                  e
                );
              } catch (t) {
                return e;
              }
            }
            function t(e) {
              return Tr(re().body, function () {
                return eval(e);
              });
            }
            function B(e) {
              return Q.on("htmx:load", function (t) {
                e(t.detail.elt);
              });
            }
            function V() {
              Q.logger = function (e, t, n) {
                console && console.log(t, e, n);
              };
            }
            function j() {
              Q.logger = null;
            }
            function C(e, t) {
              return t ? e.querySelector(t) : C(re(), e);
            }
            function f(e, t) {
              return t ? e.querySelectorAll(t) : f(re(), e);
            }
            function _(e, t) {
              (e = p(e)),
                t
                  ? setTimeout(function () {
                      _(e), (e = null);
                    }, t)
                  : e.parentElement.removeChild(e);
            }
            function z(e, t, n) {
              (e = p(e)),
                n
                  ? setTimeout(function () {
                      z(e, t), (e = null);
                    }, n)
                  : e.classList && e.classList.add(t);
            }
            function n(e, t, i) {
              (e = p(e)),
                i
                  ? setTimeout(function () {
                      n(e, t), (e = null);
                    }, i)
                  : e.classList &&
                    (e.classList.remove(t),
                    0 === e.classList.length && e.removeAttribute("class"));
            }
            function $(e, t) {
              (e = p(e)).classList.toggle(t);
            }
            function W(e, t) {
              oe((e = p(e)).parentElement.children, function (e) {
                n(e, t);
              }),
                z(e, t);
            }
            function v(e, t) {
              if ((e = p(e)).closest) return e.closest(t);
              do {
                if (null == e || h(e, t)) return e;
              } while ((e = e && u(e)));
              return null;
            }
            function g(e, t) {
              return e.substring(0, t.length) === t;
            }
            function G(e, t) {
              return e.substring(e.length - t.length) === t;
            }
            function J(e) {
              var t = e.trim();
              return g(t, "<") && G(t, "/>") ? t.substring(1, t.length - 2) : t;
            }
            function Z(e, t) {
              return 0 === t.indexOf("closest ")
                ? [v(e, J(t.substr(8)))]
                : 0 === t.indexOf("find ")
                ? [C(e, J(t.substr(5)))]
                : "next" === t
                ? [e.nextElementSibling]
                : 0 === t.indexOf("next ")
                ? [K(e, J(t.substr(5)))]
                : "previous" === t
                ? [e.previousElementSibling]
                : 0 === t.indexOf("previous ")
                ? [Y(e, J(t.substr(9)))]
                : "document" === t
                ? [document]
                : "window" === t
                ? [window]
                : "body" === t
                ? [document.body]
                : re().querySelectorAll(J(t));
            }
            var K = function (e, t) {
                for (
                  var n = re().querySelectorAll(t), i = 0;
                  i < n.length;
                  i++
                ) {
                  var r = n[i];
                  if (
                    r.compareDocumentPosition(e) ===
                    Node.DOCUMENT_POSITION_PRECEDING
                  )
                    return r;
                }
              },
              Y = function (e, t) {
                for (
                  var n = re().querySelectorAll(t), i = n.length - 1;
                  i >= 0;
                  i--
                ) {
                  var r = n[i];
                  if (
                    r.compareDocumentPosition(e) ===
                    Node.DOCUMENT_POSITION_FOLLOWING
                  )
                    return r;
                }
              };
            function ue(e, t) {
              return t ? Z(e, t)[0] : Z(re().body, e)[0];
            }
            function p(e) {
              return I(e, "String") ? C(e) : e;
            }
            function ve(e, t, n) {
              return k(t)
                ? { target: re().body, event: e, listener: t }
                : { target: p(e), event: t, listener: n };
            }
            function de(e, t, n) {
              return (
                jr(function () {
                  var i = ve(e, t, n);
                  i.target.addEventListener(i.event, i.listener);
                }),
                k(t) ? t : n
              );
            }
            function ge(e, t, n) {
              return (
                jr(function () {
                  var i = ve(e, t, n);
                  i.target.removeEventListener(i.event, i.listener);
                }),
                k(t) ? t : n
              );
            }
            var pe = re().createElement("output");
            function me(e, t) {
              var n = ne(e, t);
              if (n) {
                if ("this" === n) return [xe(e, t)];
                var i = Z(e, n);
                return 0 === i.length
                  ? (b(
                      'The selector "' +
                        n +
                        '" on ' +
                        t +
                        " returned no matches!",
                    ),
                    [pe])
                  : i;
              }
            }
            function xe(e, t) {
              return c(e, function (e) {
                return null != te(e, t);
              });
            }
            function ye(e) {
              var t = ne(e, "hx-target");
              return t
                ? "this" === t
                  ? xe(e, "hx-target")
                  : ue(e, t)
                : ae(e).boosted
                ? re().body
                : e;
            }
            function be(e) {
              for (
                var t = Q.config.attributesToSettle, n = 0;
                n < t.length;
                n++
              )
                if (e === t[n]) return !0;
              return !1;
            }
            function we(e, t) {
              oe(e.attributes, function (n) {
                !t.hasAttribute(n.name) &&
                  be(n.name) &&
                  e.removeAttribute(n.name);
              }),
                oe(t.attributes, function (t) {
                  be(t.name) && e.setAttribute(t.name, t.value);
                });
            }
            function Se(e, t) {
              for (var n = Br(t), i = 0; i < n.length; i++) {
                var r = n[i];
                try {
                  if (r.isInlineSwap(e)) return !0;
                } catch (e) {
                  b(e);
                }
              }
              return "outerHTML" === e;
            }
            function Ee(e, t, n) {
              var i = "#" + ee(t, "id"),
                r = "outerHTML";
              "true" === e ||
                (e.indexOf(":") > 0
                  ? ((r = e.substr(0, e.indexOf(":"))),
                    (i = e.substr(e.indexOf(":") + 1, e.length)))
                  : (r = e));
              var s = re().querySelectorAll(i);
              return (
                s
                  ? (oe(s, function (e) {
                      var i,
                        s = t.cloneNode(!0);
                      (i = re().createDocumentFragment()).appendChild(s),
                        Se(r, e) || (i = s);
                      var o = { shouldSwap: !0, target: e, fragment: i };
                      ce(e, "htmx:oobBeforeSwap", o) &&
                        ((e = o.target),
                        o.shouldSwap && Be(r, e, e, i, n),
                        oe(n.elts, function (e) {
                          ce(e, "htmx:oobAfterSwap", o);
                        }));
                    }),
                    t.parentNode.removeChild(t))
                  : (t.parentNode.removeChild(t),
                    fe(re().body, "htmx:oobErrorNoTarget", { content: t })),
                e
              );
            }
            function Ce(e, t, n) {
              var i = ne(e, "hx-select-oob");
              if (i)
                for (var r = i.split(","), s = 0; s < r.length; s++) {
                  var o = r[s].split(":", 2),
                    a = o[0].trim();
                  0 === a.indexOf("#") && (a = a.substring(1));
                  var l = o[1] || "true",
                    c = t.querySelector("#" + a);
                  c && Ee(l, c, n);
                }
              oe(f(t, "[hx-swap-oob], [data-hx-swap-oob]"), function (e) {
                var t = te(e, "hx-swap-oob");
                null != t && Ee(t, e, n);
              });
            }
            function Re(e) {
              oe(f(e, "[hx-preserve], [data-hx-preserve]"), function (e) {
                var t = te(e, "id"),
                  n = re().getElementById(t);
                null != n && e.parentNode.replaceChild(n, e);
              });
            }
            function Te(e, t, n) {
              oe(t.querySelectorAll("[id]"), function (t) {
                var i = ee(t, "id");
                if (i && i.length > 0) {
                  var r = i.replace("'", "\\'"),
                    s = t.tagName.replace(":", "\\:"),
                    o = e.querySelector(s + "[id='" + r + "']");
                  if (o && o !== e) {
                    var a = t.cloneNode();
                    we(t, o),
                      n.tasks.push(function () {
                        we(t, a);
                      });
                  }
                }
              });
            }
            function Oe(e) {
              return function () {
                n(e, Q.config.addedClass),
                  zt(e),
                  Nt(e),
                  qe(e),
                  ce(e, "htmx:load");
              };
            }
            function qe(e) {
              var t = "[autofocus]",
                n = h(e, t) ? e : e.querySelector(t);
              null != n && n.focus();
            }
            function a(e, t, n, i) {
              for (Te(e, n, i); n.childNodes.length > 0; ) {
                var r = n.firstChild;
                z(r, Q.config.addedClass),
                  e.insertBefore(r, t),
                  r.nodeType !== Node.TEXT_NODE &&
                    r.nodeType !== Node.COMMENT_NODE &&
                    i.tasks.push(Oe(r));
              }
            }
            function He(e, t) {
              for (var n = 0; n < e.length; )
                t = ((t << 5) - t + e.charCodeAt(n++)) | 0;
              return t;
            }
            function Le(e) {
              var t = 0;
              if (e.attributes)
                for (var n = 0; n < e.attributes.length; n++) {
                  var i = e.attributes[n];
                  i.value && ((t = He(i.name, t)), (t = He(i.value, t)));
                }
              return t;
            }
            function Ae(e) {
              var t = ae(e);
              if (t.onHandlers) {
                for (var n = 0; n < t.onHandlers.length; n++) {
                  const i = t.onHandlers[n];
                  e.removeEventListener(i.event, i.listener);
                }
                delete t.onHandlers;
              }
            }
            function Ne(e) {
              var t = ae(e);
              t.timeout && clearTimeout(t.timeout),
                t.webSocket && t.webSocket.close(),
                t.sseEventSource && t.sseEventSource.close(),
                t.listenerInfos &&
                  oe(t.listenerInfos, function (e) {
                    e.on && e.on.removeEventListener(e.trigger, e.listener);
                  }),
                Ae(e),
                oe(Object.keys(t), function (e) {
                  delete t[e];
                });
            }
            function m(e) {
              ce(e, "htmx:beforeCleanupElement"),
                Ne(e),
                e.children &&
                  oe(e.children, function (e) {
                    m(e);
                  });
            }
            function Ie(e, t, n) {
              if ("BODY" === e.tagName) return Ue(e, t, n);
              var i,
                r = e.previousSibling;
              for (
                a(u(e), e, t, n),
                  i = null == r ? u(e).firstChild : r.nextSibling,
                  n.elts = n.elts.filter(function (t) {
                    return t != e;
                  });
                i && i !== e;

              )
                i.nodeType === Node.ELEMENT_NODE && n.elts.push(i),
                  (i = i.nextElementSibling);
              m(e), u(e).removeChild(e);
            }
            function ke(e, t, n) {
              return a(e, e.firstChild, t, n);
            }
            function Pe(e, t, n) {
              return a(u(e), e, t, n);
            }
            function Me(e, t, n) {
              return a(e, null, t, n);
            }
            function Xe(e, t, n) {
              return a(u(e), e.nextSibling, t, n);
            }
            function De(e, t, n) {
              return m(e), u(e).removeChild(e);
            }
            function Ue(e, t, n) {
              var i = e.firstChild;
              if ((a(e, i, t, n), i)) {
                for (; i.nextSibling; )
                  m(i.nextSibling), e.removeChild(i.nextSibling);
                m(i), e.removeChild(i);
              }
            }
            function Fe(e, t, n) {
              var i = n || ne(e, "hx-select");
              if (i) {
                var r = re().createDocumentFragment();
                oe(t.querySelectorAll(i), function (e) {
                  r.appendChild(e);
                }),
                  (t = r);
              }
              return t;
            }
            function Be(e, t, n, i, r) {
              switch (e) {
                case "none":
                  return;
                case "outerHTML":
                  return void Ie(n, i, r);
                case "afterbegin":
                  return void ke(n, i, r);
                case "beforebegin":
                  return void Pe(n, i, r);
                case "beforeend":
                  return void Me(n, i, r);
                case "afterend":
                  return void Xe(n, i, r);
                case "delete":
                  return void De(n, i, r);
                default:
                  for (var s = Br(t), o = 0; o < s.length; o++) {
                    var a = s[o];
                    try {
                      var l = a.handleSwap(e, n, i, r);
                      if (l) {
                        if (void 0 !== l.length)
                          for (var c = 0; c < l.length; c++) {
                            var u = l[c];
                            u.nodeType !== Node.TEXT_NODE &&
                              u.nodeType !== Node.COMMENT_NODE &&
                              r.tasks.push(Oe(u));
                          }
                        return;
                      }
                    } catch (e) {
                      b(e);
                    }
                  }
                  "innerHTML" === e
                    ? Ue(n, i, r)
                    : Be(Q.config.defaultSwapStyle, t, n, i, r);
              }
            }
            function Ve(e) {
              if (e.indexOf("<title") > -1) {
                var t = e.replace(H, "").match(q);
                if (t) return t[2];
              }
            }
            function je(e, t, n, i, r, s) {
              r.title = Ve(i);
              var o = l(i);
              if (o)
                return Ce(n, o, r), Re((o = Fe(n, o, s))), Be(e, n, t, o, r);
            }
            function _e(e, t, n) {
              var i = e.getResponseHeader(t);
              if (0 === i.indexOf("{")) {
                var r = E(i);
                for (var s in r)
                  if (r.hasOwnProperty(s)) {
                    var o = r[s];
                    P(o) || (o = { value: o }), ce(n, s, o);
                  }
              } else
                for (var a = i.split(","), l = 0; l < a.length; l++)
                  ce(n, a[l].trim(), []);
            }
            var ze = /\s/,
              x = /[\s,]/,
              $e = /[_$a-zA-Z]/,
              We = /[_$a-zA-Z0-9]/,
              Ge = ['"', "'", "/"],
              Je = /[^\s]/,
              Ze = /[{(]/,
              Ke = /[})]/;
            function Ye(e) {
              for (var t = [], n = 0; n < e.length; ) {
                if ($e.exec(e.charAt(n))) {
                  for (var i = n; We.exec(e.charAt(n + 1)); ) n++;
                  t.push(e.substr(i, n - i + 1));
                } else if (-1 !== Ge.indexOf(e.charAt(n))) {
                  var r = e.charAt(n);
                  for (i = n, n++; n < e.length && e.charAt(n) !== r; )
                    "\\" === e.charAt(n) && n++, n++;
                  t.push(e.substr(i, n - i + 1));
                } else {
                  var s = e.charAt(n);
                  t.push(s);
                }
                n++;
              }
              return t;
            }
            function Qe(e, t, n) {
              return (
                $e.exec(e.charAt(0)) &&
                "true" !== e &&
                "false" !== e &&
                "this" !== e &&
                e !== n &&
                "." !== t
              );
            }
            function et(e, t, n) {
              if ("[" === t[0]) {
                t.shift();
                for (
                  var i = 1,
                    r = " return (function(" + n + "){ return (",
                    s = null;
                  t.length > 0;

                ) {
                  var o = t[0];
                  if ("]" === o) {
                    if (0 == --i) {
                      null === s && (r += "true"), t.shift(), (r += ")})");
                      try {
                        var a = Tr(
                          e,
                          function () {
                            return Function(r)();
                          },
                          function () {
                            return !0;
                          },
                        );
                        return (a.source = r), a;
                      } catch (e) {
                        return (
                          fe(re().body, "htmx:syntax:error", {
                            error: e,
                            source: r,
                          }),
                          null
                        );
                      }
                    }
                  } else "[" === o && i++;
                  Qe(o, s, n)
                    ? (r +=
                        "((" +
                        n +
                        "." +
                        o +
                        ") ? (" +
                        n +
                        "." +
                        o +
                        ") : (window." +
                        o +
                        "))")
                    : (r += o),
                    (s = t.shift());
                }
              }
            }
            function y(e, t) {
              for (var n = ""; e.length > 0 && !t.test(e[0]); ) n += e.shift();
              return n;
            }
            function tt(e) {
              var t;
              return (
                e.length > 0 && Ze.test(e[0])
                  ? (e.shift(), (t = y(e, Ke).trim()), e.shift())
                  : (t = y(e, x)),
                t
              );
            }
            var rt = "input, textarea, select";
            function nt(e, t, n) {
              var i = [],
                r = Ye(t);
              do {
                y(r, Je);
                var s = r.length,
                  o = y(r, /[,\[\s]/);
                if ("" !== o)
                  if ("every" === o) {
                    var a = { trigger: "every" };
                    y(r, Je),
                      (a.pollInterval = d(y(r, /[,\[\s]/))),
                      y(r, Je),
                      (l = et(e, r, "event")) && (a.eventFilter = l),
                      i.push(a);
                  } else if (0 === o.indexOf("sse:"))
                    i.push({ trigger: "sse", sseEvent: o.substr(4) });
                  else {
                    var l,
                      c = { trigger: o };
                    for (
                      (l = et(e, r, "event")) && (c.eventFilter = l);
                      r.length > 0 && "," !== r[0];

                    ) {
                      y(r, Je);
                      var u = r.shift();
                      if ("changed" === u) c.changed = !0;
                      else if ("once" === u) c.once = !0;
                      else if ("consume" === u) c.consume = !0;
                      else if ("delay" === u && ":" === r[0])
                        r.shift(), (c.delay = d(y(r, x)));
                      else if ("from" === u && ":" === r[0]) {
                        if ((r.shift(), Ze.test(r[0]))) var h = tt(r);
                        else if (
                          "closest" === (h = y(r, x)) ||
                          "find" === h ||
                          "next" === h ||
                          "previous" === h
                        ) {
                          r.shift();
                          var f = tt(r);
                          f.length > 0 && (h += " " + f);
                        }
                        c.from = h;
                      } else
                        "target" === u && ":" === r[0]
                          ? (r.shift(), (c.target = tt(r)))
                          : "throttle" === u && ":" === r[0]
                          ? (r.shift(), (c.throttle = d(y(r, x))))
                          : "queue" === u && ":" === r[0]
                          ? (r.shift(), (c.queue = y(r, x)))
                          : "root" === u && ":" === r[0]
                          ? (r.shift(), (c[u] = tt(r)))
                          : "threshold" === u && ":" === r[0]
                          ? (r.shift(), (c[u] = y(r, x)))
                          : fe(e, "htmx:syntax:error", { token: r.shift() });
                    }
                    i.push(c);
                  }
                r.length === s &&
                  fe(e, "htmx:syntax:error", { token: r.shift() }),
                  y(r, Je);
              } while ("," === r[0] && r.shift());
              return n && (n[t] = i), i;
            }
            function it(e) {
              var t = te(e, "hx-trigger"),
                n = [];
              if (t) {
                var i = Q.config.triggerSpecsCache;
                n = (i && i[t]) || nt(e, t, i);
              }
              return n.length > 0
                ? n
                : h(e, "form")
                ? [{ trigger: "submit" }]
                : h(e, 'input[type="button"], input[type="submit"]')
                ? [{ trigger: "click" }]
                : h(e, rt)
                ? [{ trigger: "change" }]
                : [{ trigger: "click" }];
            }
            function at(e) {
              ae(e).cancelled = !0;
            }
            function ot(e, t, n) {
              var i = ae(e);
              i.timeout = setTimeout(function () {
                se(e) &&
                  !0 !== i.cancelled &&
                  (ct(
                    n,
                    e,
                    Wt("hx:poll:trigger", { triggerSpec: n, target: e }),
                  ) || t(e),
                  ot(e, t, n));
              }, n.pollInterval);
            }
            function st(e) {
              return (
                location.hostname === e.hostname &&
                ee(e, "href") &&
                0 !== ee(e, "href").indexOf("#")
              );
            }
            function lt(e, t, n) {
              if (
                ("A" === e.tagName &&
                  st(e) &&
                  ("" === e.target || "_self" === e.target)) ||
                "FORM" === e.tagName
              ) {
                var i, r;
                if (((t.boosted = !0), "A" === e.tagName))
                  (i = "get"), (r = ee(e, "href"));
                else {
                  var s = ee(e, "method");
                  (i = s ? s.toLowerCase() : "get"), (r = ee(e, "action"));
                }
                n.forEach(function (n) {
                  ht(
                    e,
                    function (e, t) {
                      v(e, Q.config.disableSelector) ? m(e) : he(i, r, e, t);
                    },
                    t,
                    n,
                    !0,
                  );
                });
              }
            }
            function ut(e, t) {
              if ("submit" === e.type || "click" === e.type) {
                if ("FORM" === t.tagName) return !0;
                if (
                  h(t, 'input[type="submit"], button') &&
                  null !== v(t, "form")
                )
                  return !0;
                if (
                  "A" === t.tagName &&
                  t.href &&
                  ("#" === t.getAttribute("href") ||
                    0 !== t.getAttribute("href").indexOf("#"))
                )
                  return !0;
              }
              return !1;
            }
            function ft(e, t) {
              return (
                ae(e).boosted &&
                "A" === e.tagName &&
                "click" === t.type &&
                (t.ctrlKey || t.metaKey)
              );
            }
            function ct(e, t, n) {
              var i = e.eventFilter;
              if (i)
                try {
                  return !0 !== i.call(t, n);
                } catch (e) {
                  return (
                    fe(re().body, "htmx:eventFilter:error", {
                      error: e,
                      source: i.source,
                    }),
                    !0
                  );
                }
              return !1;
            }
            function ht(e, t, n, i, r) {
              var s,
                o = ae(e);
              (s = i.from ? Z(e, i.from) : [e]),
                i.changed &&
                  s.forEach(function (e) {
                    ae(e).lastValue = e.value;
                  }),
                oe(s, function (s) {
                  var a = function (n) {
                    if (se(e)) {
                      if (
                        !ft(e, n) &&
                        ((r || ut(n, e)) && n.preventDefault(), !ct(i, e, n))
                      ) {
                        var l = ae(n);
                        if (
                          ((l.triggerSpec = i),
                          null == l.handledFor && (l.handledFor = []),
                          l.handledFor.indexOf(e) < 0)
                        ) {
                          if (
                            (l.handledFor.push(e),
                            i.consume && n.stopPropagation(),
                            i.target && n.target && !h(n.target, i.target))
                          )
                            return;
                          if (i.once) {
                            if (o.triggeredOnce) return;
                            o.triggeredOnce = !0;
                          }
                          if (i.changed) {
                            var c = ae(s);
                            if (c.lastValue === s.value) return;
                            c.lastValue = s.value;
                          }
                          if (
                            (o.delayed && clearTimeout(o.delayed), o.throttle)
                          )
                            return;
                          i.throttle > 0
                            ? o.throttle ||
                              (t(e, n),
                              (o.throttle = setTimeout(function () {
                                o.throttle = null;
                              }, i.throttle)))
                            : i.delay > 0
                            ? (o.delayed = setTimeout(function () {
                                t(e, n);
                              }, i.delay))
                            : (ce(e, "htmx:trigger"), t(e, n));
                        }
                      }
                    } else s.removeEventListener(i.trigger, a);
                  };
                  null == n.listenerInfos && (n.listenerInfos = []),
                    n.listenerInfos.push({
                      trigger: i.trigger,
                      listener: a,
                      on: s,
                    }),
                    s.addEventListener(i.trigger, a);
                });
            }
            var vt = !1,
              dt = null;
            function gt() {
              dt ||
                ((dt = function () {
                  vt = !0;
                }),
                window.addEventListener("scroll", dt),
                setInterval(function () {
                  vt &&
                    ((vt = !1),
                    oe(
                      re().querySelectorAll(
                        "[hx-trigger='revealed'],[data-hx-trigger='revealed']",
                      ),
                      function (e) {
                        pt(e);
                      },
                    ));
                }, 200));
            }
            function pt(e) {
              !o(e, "data-hx-revealed") &&
                X(e) &&
                (e.setAttribute("data-hx-revealed", "true"),
                ae(e).initHash
                  ? ce(e, "revealed")
                  : e.addEventListener(
                      "htmx:afterProcessNode",
                      function (t) {
                        ce(e, "revealed");
                      },
                      { once: !0 },
                    ));
            }
            function mt(e, t, n) {
              for (var i = D(n), r = 0; r < i.length; r++) {
                var s = i[r].split(/:(.+)/);
                "connect" === s[0] && xt(e, s[1], 0), "send" === s[0] && bt(e);
              }
            }
            function xt(e, t, n) {
              if (se(e)) {
                if (0 == t.indexOf("/")) {
                  var i =
                    location.hostname +
                    (location.port ? ":" + location.port : "");
                  "https:" == location.protocol
                    ? (t = "wss://" + i + t)
                    : "http:" == location.protocol && (t = "ws://" + i + t);
                }
                var r = Q.createWebSocket(t);
                (r.onerror = function (t) {
                  fe(e, "htmx:wsError", { error: t, socket: r }), yt(e);
                }),
                  (r.onclose = function (i) {
                    if ([1006, 1012, 1013].indexOf(i.code) >= 0) {
                      var r = wt(n);
                      setTimeout(function () {
                        xt(e, t, n + 1);
                      }, r);
                    }
                  }),
                  (r.onopen = function (e) {
                    n = 0;
                  }),
                  (ae(e).webSocket = r),
                  r.addEventListener("message", function (t) {
                    if (!yt(e)) {
                      var n = t.data;
                      R(e, function (t) {
                        n = t.transformResponse(n, null, e);
                      });
                      for (
                        var i = T(e), r = M(l(n).children), s = 0;
                        s < r.length;
                        s++
                      ) {
                        var o = r[s];
                        Ee(te(o, "hx-swap-oob") || "true", o, i);
                      }
                      nr(i.tasks);
                    }
                  });
              }
            }
            function yt(e) {
              if (!se(e)) return ae(e).webSocket.close(), !0;
            }
            function bt(e) {
              var t = c(e, function (e) {
                return null != ae(e).webSocket;
              });
              t
                ? e.addEventListener(it(e)[0].trigger, function (n) {
                    var i = ae(t).webSocket,
                      r = xr(e, t),
                      s = dr(e, "post"),
                      o = s.errors,
                      a = yr(le(s.values, Hr(e)), e);
                    (a.HEADERS = r),
                      o && o.length > 0
                        ? ce(e, "htmx:validation:halted", o)
                        : (i.send(JSON.stringify(a)),
                          ut(n, e) && n.preventDefault());
                  })
                : fe(e, "htmx:noWebSocketSourceError");
            }
            function wt(e) {
              var t = Q.config.wsReconnectDelay;
              if ("function" == typeof t) return t(e);
              if ("full-jitter" === t) {
                var n = Math.min(e, 6);
                return 1e3 * Math.pow(2, n) * Math.random();
              }
              b(
                'htmx.config.wsReconnectDelay must either be a function or the string "full-jitter"',
              );
            }
            function St(e, t, n) {
              for (var i = D(n), r = 0; r < i.length; r++) {
                var s = i[r].split(/:(.+)/);
                "connect" === s[0] && Et(e, s[1]),
                  "swap" === s[0] && Ct(e, s[1]);
              }
            }
            function Et(e, t) {
              var n = Q.createEventSource(t);
              (n.onerror = function (t) {
                fe(e, "htmx:sseError", { error: t, source: n }), Tt(e);
              }),
                (ae(e).sseEventSource = n);
            }
            function Ct(e, t) {
              var n = c(e, Ot);
              if (n) {
                var i = ae(n).sseEventSource,
                  r = function (s) {
                    if (!Tt(n))
                      if (se(e)) {
                        var o = s.data;
                        R(e, function (t) {
                          o = t.transformResponse(o, null, e);
                        });
                        var a = wr(e),
                          l = ye(e),
                          c = T(e);
                        je(a.swapStyle, l, e, o, c),
                          nr(c.tasks),
                          ce(e, "htmx:sseMessage", s);
                      } else i.removeEventListener(t, r);
                  };
                (ae(e).sseListener = r), i.addEventListener(t, r);
              } else fe(e, "htmx:noSSESourceError");
            }
            function Rt(e, t, n) {
              var i = c(e, Ot);
              if (i) {
                var r = ae(i).sseEventSource,
                  s = function () {
                    Tt(i) || (se(e) ? t(e) : r.removeEventListener(n, s));
                  };
                (ae(e).sseListener = s), r.addEventListener(n, s);
              } else fe(e, "htmx:noSSESourceError");
            }
            function Tt(e) {
              if (!se(e)) return ae(e).sseEventSource.close(), !0;
            }
            function Ot(e) {
              return null != ae(e).sseEventSource;
            }
            function qt(e, t, n, i) {
              var r = function () {
                n.loaded || ((n.loaded = !0), t(e));
              };
              i > 0 ? setTimeout(r, i) : r();
            }
            function Ht(e, t, n) {
              var i = !1;
              return (
                oe(w, function (r) {
                  if (o(e, "hx-" + r)) {
                    var s = te(e, "hx-" + r);
                    (i = !0),
                      (t.path = s),
                      (t.verb = r),
                      n.forEach(function (n) {
                        Lt(e, n, t, function (e, t) {
                          v(e, Q.config.disableSelector)
                            ? m(e)
                            : he(r, s, e, t);
                        });
                      });
                  }
                }),
                i
              );
            }
            function Lt(e, t, n, i) {
              if (t.sseEvent) Rt(e, i, t.sseEvent);
              else if ("revealed" === t.trigger) gt(), ht(e, i, n, t), pt(e);
              else if ("intersect" === t.trigger) {
                var r = {};
                t.root && (r.root = ue(e, t.root)),
                  t.threshold && (r.threshold = parseFloat(t.threshold));
                var s = new IntersectionObserver(function (t) {
                  for (var n = 0; n < t.length; n++)
                    if (t[n].isIntersecting) {
                      ce(e, "intersect");
                      break;
                    }
                }, r);
                s.observe(e), ht(e, i, n, t);
              } else
                "load" === t.trigger
                  ? ct(t, e, Wt("load", { elt: e })) || qt(e, i, n, t.delay)
                  : t.pollInterval > 0
                  ? ((n.polling = !0), ot(e, i, t))
                  : ht(e, i, n, t);
            }
            function At(e) {
              if (
                !e.htmxExecuted &&
                Q.config.allowScriptTags &&
                ("text/javascript" === e.type ||
                  "module" === e.type ||
                  "" === e.type)
              ) {
                var t = re().createElement("script");
                oe(e.attributes, function (e) {
                  t.setAttribute(e.name, e.value);
                }),
                  (t.textContent = e.textContent),
                  (t.async = !1),
                  Q.config.inlineScriptNonce &&
                    (t.nonce = Q.config.inlineScriptNonce);
                var n = e.parentElement;
                try {
                  n.insertBefore(t, e);
                } catch (e) {
                  b(e);
                } finally {
                  e.parentElement && e.parentElement.removeChild(e);
                }
              }
            }
            function Nt(e) {
              h(e, "script") && At(e),
                oe(f(e, "script"), function (e) {
                  At(e);
                });
            }
            function It(e) {
              for (var t = e.attributes, n = 0; n < t.length; n++) {
                var i = t[n].name;
                if (
                  g(i, "hx-on:") ||
                  g(i, "data-hx-on:") ||
                  g(i, "hx-on-") ||
                  g(i, "data-hx-on-")
                )
                  return !0;
              }
              return !1;
            }
            function kt(e) {
              var t = null,
                n = [];
              if ((It(e) && n.push(e), document.evaluate))
                for (
                  var i = document.evaluate(
                    './/*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]',
                    e,
                  );
                  (t = i.iterateNext());

                )
                  n.push(t);
              else
                for (
                  var r = e.getElementsByTagName("*"), s = 0;
                  s < r.length;
                  s++
                )
                  It(r[s]) && n.push(r[s]);
              return n;
            }
            function Pt(e) {
              return e.querySelectorAll
                ? e.querySelectorAll(
                    i +
                      ", [hx-boost] a, [data-hx-boost] a, a[hx-boost], a[data-hx-boost], form, [type='submit'], [hx-sse], [data-hx-sse], [hx-ws], [data-hx-ws], [hx-ext], [data-hx-ext], [hx-trigger], [data-hx-trigger], [hx-on], [data-hx-on]",
                  )
                : [];
            }
            function Mt(e) {
              var t = v(e.target, "button, input[type='submit']"),
                n = Dt(e);
              n && (n.lastButtonClicked = t);
            }
            function Xt(e) {
              var t = Dt(e);
              t && (t.lastButtonClicked = null);
            }
            function Dt(e) {
              var t = v(e.target, "button, input[type='submit']");
              if (t) {
                var n = p("#" + ee(t, "form")) || v(t, "form");
                if (n) return ae(n);
              }
            }
            function Ut(e) {
              e.addEventListener("click", Mt),
                e.addEventListener("focusin", Mt),
                e.addEventListener("focusout", Xt);
            }
            function Ft(e) {
              for (var t = Ye(e), n = 0, i = 0; i < t.length; i++) {
                const e = t[i];
                "{" === e ? n++ : "}" === e && n--;
              }
              return n;
            }
            function Bt(e, t, n) {
              var i,
                r = ae(e);
              Array.isArray(r.onHandlers) || (r.onHandlers = []);
              var s = function (t) {
                return Tr(e, function () {
                  i || (i = new Function("event", n)), i.call(e, t);
                });
              };
              e.addEventListener(t, s),
                r.onHandlers.push({ event: t, listener: s });
            }
            function Vt(e) {
              var t = te(e, "hx-on");
              if (t) {
                for (
                  var n = {}, i = t.split("\n"), r = null, s = 0;
                  i.length > 0;

                ) {
                  var o = i.shift(),
                    a = o.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
                  0 === s && a
                    ? (o.split(":"), (n[(r = a[1].slice(0, -1))] = a[2]))
                    : (n[r] += o),
                    (s += Ft(o));
                }
                for (var l in n) Bt(e, l, n[l]);
              }
            }
            function jt(e) {
              Ae(e);
              for (var t = 0; t < e.attributes.length; t++) {
                var n = e.attributes[t].name,
                  i = e.attributes[t].value;
                if (g(n, "hx-on") || g(n, "data-hx-on")) {
                  var r = n.indexOf("-on") + 3,
                    s = n.slice(r, r + 1);
                  if ("-" === s || ":" === s) {
                    var o = n.slice(r + 1);
                    g(o, ":")
                      ? (o = "htmx" + o)
                      : g(o, "-")
                      ? (o = "htmx:" + o.slice(1))
                      : g(o, "htmx-") && (o = "htmx:" + o.slice(5)),
                      Bt(e, o, i);
                  }
                }
              }
            }
            function _t(e) {
              if (v(e, Q.config.disableSelector)) m(e);
              else {
                var t = ae(e);
                if (t.initHash !== Le(e)) {
                  Ne(e),
                    (t.initHash = Le(e)),
                    Vt(e),
                    ce(e, "htmx:beforeProcessNode"),
                    e.value && (t.lastValue = e.value);
                  var n = it(e);
                  Ht(e, t, n) ||
                    ("true" === ne(e, "hx-boost")
                      ? lt(e, t, n)
                      : o(e, "hx-trigger") &&
                        n.forEach(function (n) {
                          Lt(e, n, t, function () {});
                        })),
                    ("FORM" === e.tagName ||
                      ("submit" === ee(e, "type") && o(e, "form"))) &&
                      Ut(e);
                  var i = te(e, "hx-sse");
                  i && St(e, t, i);
                  var r = te(e, "hx-ws");
                  r && mt(e, t, r), ce(e, "htmx:afterProcessNode");
                }
              }
            }
            function zt(e) {
              v((e = p(e)), Q.config.disableSelector)
                ? m(e)
                : (_t(e),
                  oe(Pt(e), function (e) {
                    _t(e);
                  }),
                  oe(kt(e), jt));
            }
            function $t(e) {
              return e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
            }
            function Wt(e, t) {
              var n;
              return (
                window.CustomEvent && "function" == typeof window.CustomEvent
                  ? (n = new CustomEvent(e, {
                      bubbles: !0,
                      cancelable: !0,
                      detail: t,
                    }))
                  : (n = re().createEvent("CustomEvent")).initCustomEvent(
                      e,
                      !0,
                      !0,
                      t,
                    ),
                n
              );
            }
            function fe(e, t, n) {
              ce(e, t, le({ error: t }, n));
            }
            function Gt(e) {
              return "htmx:afterProcessNode" === e;
            }
            function R(e, t) {
              oe(Br(e), function (e) {
                try {
                  t(e);
                } catch (e) {
                  b(e);
                }
              });
            }
            function b(e) {
              console.error
                ? console.error(e)
                : console.log && console.log("ERROR: ", e);
            }
            function ce(e, t, n) {
              (e = p(e)), null == n && (n = {}), (n.elt = e);
              var i = Wt(t, n);
              Q.logger && !Gt(t) && Q.logger(e, t, n),
                n.error && (b(n.error), ce(e, "htmx:error", { errorInfo: n }));
              var r = e.dispatchEvent(i),
                s = $t(t);
              if (r && s !== t) {
                var o = Wt(s, i.detail);
                r = r && e.dispatchEvent(o);
              }
              return (
                R(e, function (e) {
                  r = r && !1 !== e.onEvent(t, i) && !i.defaultPrevented;
                }),
                r
              );
            }
            var Jt = location.pathname + location.search;
            function Zt() {
              return (
                re().querySelector("[hx-history-elt],[data-hx-history-elt]") ||
                re().body
              );
            }
            function Kt(e, t, n, i) {
              if (U())
                if (Q.config.historyCacheSize <= 0)
                  localStorage.removeItem("htmx-history-cache");
                else {
                  e = F(e);
                  for (
                    var r = E(localStorage.getItem("htmx-history-cache")) || [],
                      s = 0;
                    s < r.length;
                    s++
                  )
                    if (r[s].url === e) {
                      r.splice(s, 1);
                      break;
                    }
                  var o = { url: e, content: t, title: n, scroll: i };
                  for (
                    ce(re().body, "htmx:historyItemCreated", {
                      item: o,
                      cache: r,
                    }),
                      r.push(o);
                    r.length > Q.config.historyCacheSize;

                  )
                    r.shift();
                  for (; r.length > 0; )
                    try {
                      localStorage.setItem(
                        "htmx-history-cache",
                        JSON.stringify(r),
                      );
                      break;
                    } catch (e) {
                      fe(re().body, "htmx:historyCacheError", {
                        cause: e,
                        cache: r,
                      }),
                        r.shift();
                    }
                }
            }
            function Yt(e) {
              if (!U()) return null;
              e = F(e);
              for (
                var t = E(localStorage.getItem("htmx-history-cache")) || [],
                  n = 0;
                n < t.length;
                n++
              )
                if (t[n].url === e) return t[n];
              return null;
            }
            function Qt(e) {
              var t = Q.config.requestClass,
                i = e.cloneNode(!0);
              return (
                oe(f(i, "." + t), function (e) {
                  n(e, t);
                }),
                i.innerHTML
              );
            }
            function er() {
              var e,
                t = Zt(),
                n = Jt || location.pathname + location.search;
              try {
                e = re().querySelector(
                  '[hx-history="false" i],[data-hx-history="false" i]',
                );
              } catch (t) {
                e = re().querySelector(
                  '[hx-history="false"],[data-hx-history="false"]',
                );
              }
              e ||
                (ce(re().body, "htmx:beforeHistorySave", {
                  path: n,
                  historyElt: t,
                }),
                Kt(n, Qt(t), re().title, window.scrollY)),
                Q.config.historyEnabled &&
                  history.replaceState(
                    { htmx: !0 },
                    re().title,
                    window.location.href,
                  );
            }
            function tr(e) {
              Q.config.getCacheBusterParam &&
                (G(
                  (e = e.replace(/org\.htmx\.cache-buster=[^&]*&?/, "")),
                  "&",
                ) ||
                  G(e, "?")) &&
                (e = e.slice(0, -1)),
                Q.config.historyEnabled &&
                  history.pushState({ htmx: !0 }, "", e),
                (Jt = e);
            }
            function rr(e) {
              Q.config.historyEnabled &&
                history.replaceState({ htmx: !0 }, "", e),
                (Jt = e);
            }
            function nr(e) {
              oe(e, function (e) {
                e.call();
              });
            }
            function ir(e) {
              var t = new XMLHttpRequest(),
                n = { path: e, xhr: t };
              ce(re().body, "htmx:historyCacheMiss", n),
                t.open("GET", e, !0),
                t.setRequestHeader("HX-Request", "true"),
                t.setRequestHeader("HX-History-Restore-Request", "true"),
                t.setRequestHeader("HX-Current-URL", re().location.href),
                (t.onload = function () {
                  if (this.status >= 200 && this.status < 400) {
                    ce(re().body, "htmx:historyCacheMissLoad", n);
                    var t = l(this.response);
                    t =
                      t.querySelector(
                        "[hx-history-elt],[data-hx-history-elt]",
                      ) || t;
                    var i = Zt(),
                      r = T(i),
                      s = Ve(this.response);
                    if (s) {
                      var o = C("title");
                      o ? (o.innerHTML = s) : (window.document.title = s);
                    }
                    Ue(i, t, r),
                      nr(r.tasks),
                      (Jt = e),
                      ce(re().body, "htmx:historyRestore", {
                        path: e,
                        cacheMiss: !0,
                        serverResponse: this.response,
                      });
                  } else fe(re().body, "htmx:historyCacheMissLoadError", n);
                }),
                t.send();
            }
            function ar(e) {
              er();
              var t = Yt((e = e || location.pathname + location.search));
              if (t) {
                var n = l(t.content),
                  i = Zt(),
                  r = T(i);
                Ue(i, n, r),
                  nr(r.tasks),
                  (document.title = t.title),
                  setTimeout(function () {
                    window.scrollTo(0, t.scroll);
                  }, 0),
                  (Jt = e),
                  ce(re().body, "htmx:historyRestore", { path: e, item: t });
              } else
                Q.config.refreshOnHistoryMiss
                  ? window.location.reload(!0)
                  : ir(e);
            }
            function or(e) {
              var t = me(e, "hx-indicator");
              return (
                null == t && (t = [e]),
                oe(t, function (e) {
                  var t = ae(e);
                  (t.requestCount = (t.requestCount || 0) + 1),
                    e.classList.add.call(e.classList, Q.config.requestClass);
                }),
                t
              );
            }
            function sr(e) {
              var t = me(e, "hx-disabled-elt");
              return (
                null == t && (t = []),
                oe(t, function (e) {
                  var t = ae(e);
                  (t.requestCount = (t.requestCount || 0) + 1),
                    e.setAttribute("disabled", "");
                }),
                t
              );
            }
            function lr(e, t) {
              oe(e, function (e) {
                var t = ae(e);
                (t.requestCount = (t.requestCount || 0) - 1),
                  0 === t.requestCount &&
                    e.classList.remove.call(e.classList, Q.config.requestClass);
              }),
                oe(t, function (e) {
                  var t = ae(e);
                  (t.requestCount = (t.requestCount || 0) - 1),
                    0 === t.requestCount && e.removeAttribute("disabled");
                });
            }
            function ur(e, t) {
              for (var n = 0; n < e.length; n++)
                if (e[n].isSameNode(t)) return !0;
              return !1;
            }
            function fr(e) {
              return (
                "" !== e.name &&
                null != e.name &&
                !e.disabled &&
                !v(e, "fieldset[disabled]") &&
                "button" !== e.type &&
                "submit" !== e.type &&
                "image" !== e.tagName &&
                "reset" !== e.tagName &&
                "file" !== e.tagName &&
                (("checkbox" !== e.type && "radio" !== e.type) || e.checked)
              );
            }
            function cr(e, t, n) {
              if (null != e && null != t) {
                var i = n[e];
                void 0 === i
                  ? (n[e] = t)
                  : Array.isArray(i)
                  ? Array.isArray(t)
                    ? (n[e] = i.concat(t))
                    : i.push(t)
                  : Array.isArray(t)
                  ? (n[e] = [i].concat(t))
                  : (n[e] = [i, t]);
              }
            }
            function hr(e, t, n, i, r) {
              if (null != i && !ur(e, i)) {
                if ((e.push(i), fr(i))) {
                  var s = ee(i, "name"),
                    o = i.value;
                  i.multiple &&
                    "SELECT" === i.tagName &&
                    (o = M(i.querySelectorAll("option:checked")).map(
                      function (e) {
                        return e.value;
                      },
                    )),
                    i.files && (o = M(i.files)),
                    cr(s, o, t),
                    r && vr(i, n);
                }
                h(i, "form") &&
                  oe(i.elements, function (i) {
                    hr(e, t, n, i, r);
                  });
              }
            }
            function vr(e, t) {
              e.willValidate &&
                (ce(e, "htmx:validation:validate"),
                e.checkValidity() ||
                  (t.push({
                    elt: e,
                    message: e.validationMessage,
                    validity: e.validity,
                  }),
                  ce(e, "htmx:validation:failed", {
                    message: e.validationMessage,
                    validity: e.validity,
                  })));
            }
            function dr(e, t) {
              var n = [],
                i = {},
                r = {},
                s = [],
                o = ae(e);
              o.lastButtonClicked &&
                !se(o.lastButtonClicked) &&
                (o.lastButtonClicked = null);
              var a =
                (h(e, "form") && !0 !== e.noValidate) ||
                "true" === te(e, "hx-validate");
              if (
                (o.lastButtonClicked &&
                  (a = a && !0 !== o.lastButtonClicked.formNoValidate),
                "get" !== t && hr(n, r, s, v(e, "form"), a),
                hr(n, i, s, e, a),
                o.lastButtonClicked ||
                  "BUTTON" === e.tagName ||
                  ("INPUT" === e.tagName && "submit" === ee(e, "type")))
              ) {
                var l = o.lastButtonClicked || e;
                cr(ee(l, "name"), l.value, r);
              }
              return (
                oe(me(e, "hx-include"), function (e) {
                  hr(n, i, s, e, a),
                    h(e, "form") ||
                      oe(e.querySelectorAll(rt), function (e) {
                        hr(n, i, s, e, a);
                      });
                }),
                (i = le(i, r)),
                { errors: s, values: i }
              );
            }
            function gr(e, t, n) {
              "" !== e && (e += "&"),
                "[object Object]" === String(n) && (n = JSON.stringify(n));
              var i = encodeURIComponent(n);
              return e + (encodeURIComponent(t) + "=") + i;
            }
            function pr(e) {
              var t = "";
              for (var n in e)
                if (e.hasOwnProperty(n)) {
                  var i = e[n];
                  Array.isArray(i)
                    ? oe(i, function (e) {
                        t = gr(t, n, e);
                      })
                    : (t = gr(t, n, i));
                }
              return t;
            }
            function mr(e) {
              var t = new FormData();
              for (var n in e)
                if (e.hasOwnProperty(n)) {
                  var i = e[n];
                  Array.isArray(i)
                    ? oe(i, function (e) {
                        t.append(n, e);
                      })
                    : t.append(n, i);
                }
              return t;
            }
            function xr(e, t, n) {
              var i = {
                "HX-Request": "true",
                "HX-Trigger": ee(e, "id"),
                "HX-Trigger-Name": ee(e, "name"),
                "HX-Target": te(t, "id"),
                "HX-Current-URL": re().location.href,
              };
              return (
                Rr(e, "hx-headers", !1, i),
                void 0 !== n && (i["HX-Prompt"] = n),
                ae(e).boosted && (i["HX-Boosted"] = "true"),
                i
              );
            }
            function yr(e, t) {
              var n = ne(t, "hx-params");
              if (n) {
                if ("none" === n) return {};
                if ("*" === n) return e;
                if (0 === n.indexOf("not "))
                  return (
                    oe(n.substr(4).split(","), function (t) {
                      (t = t.trim()), delete e[t];
                    }),
                    e
                  );
                var i = {};
                return (
                  oe(n.split(","), function (t) {
                    (t = t.trim()), (i[t] = e[t]);
                  }),
                  i
                );
              }
              return e;
            }
            function br(e) {
              return ee(e, "href") && ee(e, "href").indexOf("#") >= 0;
            }
            function wr(e, t) {
              var n = t || ne(e, "hx-swap"),
                i = {
                  swapStyle: ae(e).boosted
                    ? "innerHTML"
                    : Q.config.defaultSwapStyle,
                  swapDelay: Q.config.defaultSwapDelay,
                  settleDelay: Q.config.defaultSettleDelay,
                };
              if (
                (Q.config.scrollIntoViewOnBoost &&
                  ae(e).boosted &&
                  !br(e) &&
                  (i.show = "top"),
                n)
              ) {
                var r = D(n);
                if (r.length > 0)
                  for (var s = 0; s < r.length; s++) {
                    var o = r[s];
                    if (0 === o.indexOf("swap:")) i.swapDelay = d(o.substr(5));
                    else if (0 === o.indexOf("settle:"))
                      i.settleDelay = d(o.substr(7));
                    else if (0 === o.indexOf("transition:"))
                      i.transition = "true" === o.substr(11);
                    else if (0 === o.indexOf("ignoreTitle:"))
                      i.ignoreTitle = "true" === o.substr(12);
                    else if (0 === o.indexOf("scroll:")) {
                      var a = (c = o.substr(7).split(":")).pop(),
                        l = c.length > 0 ? c.join(":") : null;
                      (i.scroll = a), (i.scrollTarget = l);
                    } else if (0 === o.indexOf("show:")) {
                      var c,
                        u = (c = o.substr(5).split(":")).pop();
                      (l = c.length > 0 ? c.join(":") : null),
                        (i.show = u),
                        (i.showTarget = l);
                    } else if (0 === o.indexOf("focus-scroll:")) {
                      var h = o.substr(13);
                      i.focusScroll = "true" == h;
                    } else
                      0 == s
                        ? (i.swapStyle = o)
                        : b("Unknown modifier in hx-swap: " + o);
                  }
              }
              return i;
            }
            function Sr(e) {
              return (
                "multipart/form-data" === ne(e, "hx-encoding") ||
                (h(e, "form") && "multipart/form-data" === ee(e, "enctype"))
              );
            }
            function Er(e, t, n) {
              var i = null;
              return (
                R(t, function (r) {
                  null == i && (i = r.encodeParameters(e, n, t));
                }),
                null != i ? i : Sr(t) ? mr(n) : pr(n)
              );
            }
            function T(e) {
              return { tasks: [], elts: [e] };
            }
            function Cr(e, t) {
              var n = e[0],
                i = e[e.length - 1];
              if (t.scroll) {
                var r = null;
                t.scrollTarget && (r = ue(n, t.scrollTarget)),
                  "top" === t.scroll &&
                    (n || r) &&
                    ((r = r || n).scrollTop = 0),
                  "bottom" === t.scroll &&
                    (i || r) &&
                    ((r = r || i).scrollTop = r.scrollHeight);
              }
              if (t.show) {
                if (((r = null), t.showTarget)) {
                  var s = t.showTarget;
                  "window" === t.showTarget && (s = "body"), (r = ue(n, s));
                }
                "top" === t.show &&
                  (n || r) &&
                  (r = r || n).scrollIntoView({
                    block: "start",
                    behavior: Q.config.scrollBehavior,
                  }),
                  "bottom" === t.show &&
                    (i || r) &&
                    (r = r || i).scrollIntoView({
                      block: "end",
                      behavior: Q.config.scrollBehavior,
                    });
              }
            }
            function Rr(e, t, n, i) {
              if ((null == i && (i = {}), null == e)) return i;
              var r = te(e, t);
              if (r) {
                var s,
                  o = r.trim(),
                  a = n;
                if ("unset" === o) return null;
                for (var l in (0 === o.indexOf("javascript:")
                  ? ((o = o.substr(11)), (a = !0))
                  : 0 === o.indexOf("js:") && ((o = o.substr(3)), (a = !0)),
                0 !== o.indexOf("{") && (o = "{" + o + "}"),
                (s = a
                  ? Tr(
                      e,
                      function () {
                        return Function("return (" + o + ")")();
                      },
                      {},
                    )
                  : E(o))))
                  s.hasOwnProperty(l) && null == i[l] && (i[l] = s[l]);
              }
              return Rr(u(e), t, n, i);
            }
            function Tr(e, t, n) {
              return Q.config.allowEval
                ? t()
                : (fe(e, "htmx:evalDisallowedError"), n);
            }
            function Or(e, t) {
              return Rr(e, "hx-vars", !0, t);
            }
            function qr(e, t) {
              return Rr(e, "hx-vals", !1, t);
            }
            function Hr(e) {
              return le(Or(e), qr(e));
            }
            function Lr(e, t, n) {
              if (null !== n)
                try {
                  e.setRequestHeader(t, n);
                } catch (i) {
                  e.setRequestHeader(t, encodeURIComponent(n)),
                    e.setRequestHeader(t + "-URI-AutoEncoded", "true");
                }
            }
            function Ar(e) {
              if (e.responseURL && "undefined" != typeof URL)
                try {
                  var t = new URL(e.responseURL);
                  return t.pathname + t.search;
                } catch (t) {
                  fe(re().body, "htmx:badResponseUrl", { url: e.responseURL });
                }
            }
            function O(e, t) {
              return t.test(e.getAllResponseHeaders());
            }
            function Nr(e, t, n) {
              return (
                (e = e.toLowerCase()),
                n
                  ? n instanceof Element || I(n, "String")
                    ? he(e, t, null, null, {
                        targetOverride: p(n),
                        returnPromise: !0,
                      })
                    : he(e, t, p(n.source), n.event, {
                        handler: n.handler,
                        headers: n.headers,
                        values: n.values,
                        targetOverride: p(n.target),
                        swapOverride: n.swap,
                        select: n.select,
                        returnPromise: !0,
                      })
                  : he(e, t, null, null, { returnPromise: !0 })
              );
            }
            function Ir(e) {
              for (var t = []; e; ) t.push(e), (e = e.parentElement);
              return t;
            }
            function kr(e, t, n) {
              var i, r;
              return (
                "function" == typeof URL
                  ? ((r = new URL(t, document.location.href)),
                    (i = document.location.origin === r.origin))
                  : ((r = t), (i = g(t, document.location.origin))),
                !(Q.config.selfRequestsOnly && !i) &&
                  ce(e, "htmx:validateUrl", le({ url: r, sameHost: i }, n))
              );
            }
            function he(e, t, n, i, r, s) {
              var o = null,
                a = null;
              if (
                (r = null != r ? r : {}).returnPromise &&
                "undefined" != typeof Promise
              )
                var l = new Promise(function (e, t) {
                  (o = e), (a = t);
                });
              null == n && (n = re().body);
              var c = r.handler || Mr,
                u = r.select || null;
              if (!se(n)) return ie(o), l;
              var h = r.targetOverride || ye(n);
              if (null == h || h == pe)
                return (
                  fe(n, "htmx:targetError", { target: te(n, "hx-target") }),
                  ie(a),
                  l
                );
              var d = ae(n),
                f = d.lastButtonClicked;
              if (f) {
                var p = ee(f, "formaction");
                null != p && (t = p);
                var g = ee(f, "formmethod");
                null != g && "dialog" !== g.toLowerCase() && (e = g);
              }
              var m = ne(n, "hx-confirm");
              if (void 0 === s) {
                var v = {
                  target: h,
                  elt: n,
                  path: t,
                  verb: e,
                  triggeringEvent: i,
                  etc: r,
                  issueRequest: function (s) {
                    return he(e, t, n, i, r, !!s);
                  },
                  question: m,
                };
                if (!1 === ce(n, "htmx:confirm", v)) return ie(o), l;
              }
              var _ = n,
                b = ne(n, "hx-sync"),
                y = null,
                w = !1;
              if (b) {
                var E = b.split(":"),
                  A = E[0].trim();
                if (
                  ((_ = "this" === A ? xe(n, "hx-sync") : ue(n, A)),
                  (b = (E[1] || "drop").trim()),
                  (d = ae(_)),
                  "drop" === b && d.xhr && !0 !== d.abortable)
                )
                  return ie(o), l;
                if ("abort" === b) {
                  if (d.xhr) return ie(o), l;
                  w = !0;
                } else
                  "replace" === b
                    ? ce(_, "htmx:abort")
                    : 0 === b.indexOf("queue") &&
                      (y = (b.split(" ")[1] || "last").trim());
              }
              if (d.xhr) {
                if (!d.abortable) {
                  if (null == y) {
                    if (i) {
                      var O = ae(i);
                      O &&
                        O.triggerSpec &&
                        O.triggerSpec.queue &&
                        (y = O.triggerSpec.queue);
                    }
                    null == y && (y = "last");
                  }
                  return (
                    null == d.queuedRequests && (d.queuedRequests = []),
                    ("first" === y && 0 === d.queuedRequests.length) ||
                    "all" === y
                      ? d.queuedRequests.push(function () {
                          he(e, t, n, i, r);
                        })
                      : "last" === y &&
                        ((d.queuedRequests = []),
                        d.queuedRequests.push(function () {
                          he(e, t, n, i, r);
                        })),
                    ie(o),
                    l
                  );
                }
                ce(_, "htmx:abort");
              }
              var x = new XMLHttpRequest();
              (d.xhr = x), (d.abortable = w);
              var C = function () {
                  (d.xhr = null),
                    (d.abortable = !1),
                    null != d.queuedRequests &&
                      d.queuedRequests.length > 0 &&
                      d.queuedRequests.shift()();
                },
                T = ne(n, "hx-prompt");
              if (T) {
                var S = prompt(T);
                if (
                  null === S ||
                  !ce(n, "htmx:prompt", { prompt: S, target: h })
                )
                  return ie(o), C(), l;
              }
              if (m && !s && !confirm(m)) return ie(o), C(), l;
              var k = xr(n, h, S);
              "get" === e ||
                Sr(n) ||
                (k["Content-Type"] = "application/x-www-form-urlencoded"),
                r.headers && (k = le(k, r.headers));
              var N = dr(n, e),
                L = N.errors,
                D = N.values;
              r.values && (D = le(D, r.values));
              var M = le(D, Hr(n)),
                $ = yr(M, n);
              Q.config.getCacheBusterParam &&
                "get" === e &&
                ($["org.htmx.cache-buster"] = ee(h, "id") || "true"),
                (null != t && "" !== t) || (t = re().location.href);
              var I = Rr(n, "hx-request"),
                P = ae(n).boosted,
                j = Q.config.methodsThatUseUrlParams.indexOf(e) >= 0,
                F = {
                  boosted: P,
                  useUrlParams: j,
                  parameters: $,
                  unfilteredParameters: M,
                  headers: k,
                  target: h,
                  verb: e,
                  errors: L,
                  withCredentials:
                    r.credentials || I.credentials || Q.config.withCredentials,
                  timeout: r.timeout || I.timeout || Q.config.timeout,
                  path: t,
                  triggeringEvent: i,
                };
              if (!ce(n, "htmx:configRequest", F)) return ie(o), C(), l;
              if (
                ((t = F.path),
                (e = F.verb),
                (k = F.headers),
                ($ = F.parameters),
                (j = F.useUrlParams),
                (L = F.errors) && L.length > 0)
              )
                return ce(n, "htmx:validation:halted", F), ie(o), C(), l;
              var B = t.split("#"),
                R = B[0],
                H = B[1],
                q = t;
              if (
                (j &&
                  ((q = R),
                  0 !== Object.keys($).length &&
                    (q.indexOf("?") < 0 ? (q += "?") : (q += "&"),
                    (q += pr($)),
                    H && (q += "#" + H))),
                !kr(n, q, F))
              )
                return fe(n, "htmx:invalidPath", F), ie(a), l;
              if (
                (x.open(e.toUpperCase(), q, !0),
                x.overrideMimeType("text/html"),
                (x.withCredentials = F.withCredentials),
                (x.timeout = F.timeout),
                I.noHeaders)
              );
              else
                for (var V in k)
                  if (k.hasOwnProperty(V)) {
                    var W = k[V];
                    Lr(x, V, W);
                  }
              var K = {
                xhr: x,
                target: h,
                requestConfig: F,
                etc: r,
                boosted: P,
                select: u,
                pathInfo: { requestPath: t, finalRequestPath: q, anchor: H },
              };
              if (
                ((x.onload = function () {
                  try {
                    var e = Ir(n);
                    if (
                      ((K.pathInfo.responsePath = Ar(x)),
                      c(n, K),
                      lr(z, U),
                      ce(n, "htmx:afterRequest", K),
                      ce(n, "htmx:afterOnLoad", K),
                      !se(n))
                    ) {
                      for (var t = null; e.length > 0 && null == t; ) {
                        var i = e.shift();
                        se(i) && (t = i);
                      }
                      t &&
                        (ce(t, "htmx:afterRequest", K),
                        ce(t, "htmx:afterOnLoad", K));
                    }
                    ie(o), C();
                  } catch (e) {
                    throw (fe(n, "htmx:onLoadError", le({ error: e }, K)), e);
                  }
                }),
                (x.onerror = function () {
                  lr(z, U),
                    fe(n, "htmx:afterRequest", K),
                    fe(n, "htmx:sendError", K),
                    ie(a),
                    C();
                }),
                (x.onabort = function () {
                  lr(z, U),
                    fe(n, "htmx:afterRequest", K),
                    fe(n, "htmx:sendAbort", K),
                    ie(a),
                    C();
                }),
                (x.ontimeout = function () {
                  lr(z, U),
                    fe(n, "htmx:afterRequest", K),
                    fe(n, "htmx:timeout", K),
                    ie(a),
                    C();
                }),
                !ce(n, "htmx:beforeRequest", K))
              )
                return ie(o), C(), l;
              var z = or(n),
                U = sr(n);
              oe(["loadstart", "loadend", "progress", "abort"], function (e) {
                oe([x, x.upload], function (t) {
                  t.addEventListener(e, function (t) {
                    ce(n, "htmx:xhr:" + e, {
                      lengthComputable: t.lengthComputable,
                      loaded: t.loaded,
                      total: t.total,
                    });
                  });
                });
              }),
                ce(n, "htmx:beforeSend", K);
              var X = j ? null : Er(x, n, $);
              return x.send(X), l;
            }
            function Pr(e, t) {
              var n = t.xhr,
                i = null,
                r = null;
              if (
                (O(n, /HX-Push:/i)
                  ? ((i = n.getResponseHeader("HX-Push")), (r = "push"))
                  : O(n, /HX-Push-Url:/i)
                  ? ((i = n.getResponseHeader("HX-Push-Url")), (r = "push"))
                  : O(n, /HX-Replace-Url:/i) &&
                    ((i = n.getResponseHeader("HX-Replace-Url")),
                    (r = "replace")),
                i)
              )
                return "false" === i ? {} : { type: r, path: i };
              var s = t.pathInfo.finalRequestPath,
                o = t.pathInfo.responsePath,
                a = ne(e, "hx-push-url"),
                l = ne(e, "hx-replace-url"),
                c = ae(e).boosted,
                u = null,
                h = null;
              return (
                a
                  ? ((u = "push"), (h = a))
                  : l
                  ? ((u = "replace"), (h = l))
                  : c && ((u = "push"), (h = o || s)),
                h
                  ? "false" === h
                    ? {}
                    : ("true" === h && (h = o || s),
                      t.pathInfo.anchor &&
                        -1 === h.indexOf("#") &&
                        (h = h + "#" + t.pathInfo.anchor),
                      { type: u, path: h })
                  : {}
              );
            }
            function Mr(e, t) {
              var n = t.xhr,
                i = t.target,
                r = t.etc,
                s = (t.requestConfig, t.select);
              if (ce(e, "htmx:beforeOnLoad", t)) {
                if (
                  (O(n, /HX-Trigger:/i) && _e(n, "HX-Trigger", e),
                  O(n, /HX-Location:/i))
                ) {
                  er();
                  var o = n.getResponseHeader("HX-Location");
                  return (
                    0 === o.indexOf("{") &&
                      ((p = E(o)), (o = p.path), delete p.path),
                    void Nr("GET", o, p).then(function () {
                      tr(o);
                    })
                  );
                }
                var a =
                  O(n, /HX-Refresh:/i) &&
                  "true" === n.getResponseHeader("HX-Refresh");
                if (O(n, /HX-Redirect:/i))
                  return (
                    (location.href = n.getResponseHeader("HX-Redirect")),
                    void (a && location.reload())
                  );
                if (a) location.reload();
                else {
                  O(n, /HX-Retarget:/i) &&
                    ("this" === n.getResponseHeader("HX-Retarget")
                      ? (t.target = e)
                      : (t.target = ue(e, n.getResponseHeader("HX-Retarget"))));
                  var l = Pr(e, t),
                    c = n.status >= 200 && n.status < 400 && 204 !== n.status,
                    u = n.response,
                    h = n.status >= 400,
                    d = Q.config.ignoreTitle,
                    f = le(
                      {
                        shouldSwap: c,
                        serverResponse: u,
                        isError: h,
                        ignoreTitle: d,
                      },
                      t,
                    );
                  if (ce(i, "htmx:beforeSwap", f)) {
                    if (
                      ((i = f.target),
                      (u = f.serverResponse),
                      (h = f.isError),
                      (d = f.ignoreTitle),
                      (t.target = i),
                      (t.failed = h),
                      (t.successful = !h),
                      f.shouldSwap)
                    ) {
                      286 === n.status && at(e),
                        R(e, function (t) {
                          u = t.transformResponse(u, n, e);
                        }),
                        l.type && er();
                      var p,
                        g = r.swapOverride;
                      O(n, /HX-Reswap:/i) &&
                        (g = n.getResponseHeader("HX-Reswap")),
                        (p = wr(e, g)).hasOwnProperty("ignoreTitle") &&
                          (d = p.ignoreTitle),
                        i.classList.add(Q.config.swappingClass);
                      var m = null,
                        v = null,
                        _ = function () {
                          try {
                            var r,
                              o = document.activeElement,
                              a = {};
                            try {
                              a = {
                                elt: o,
                                start: o ? o.selectionStart : null,
                                end: o ? o.selectionEnd : null,
                              };
                            } catch (o) {}
                            s && (r = s),
                              O(n, /HX-Reselect:/i) &&
                                (r = n.getResponseHeader("HX-Reselect")),
                              l.type &&
                                (ce(
                                  re().body,
                                  "htmx:beforeHistoryUpdate",
                                  le({ history: l }, t),
                                ),
                                "push" === l.type
                                  ? (tr(l.path),
                                    ce(re().body, "htmx:pushedIntoHistory", {
                                      path: l.path,
                                    }))
                                  : (rr(l.path),
                                    ce(re().body, "htmx:replacedInHistory", {
                                      path: l.path,
                                    })));
                            var c = T(i);
                            if (
                              (je(p.swapStyle, i, e, u, c, r),
                              a.elt && !se(a.elt) && ee(a.elt, "id"))
                            ) {
                              var h = document.getElementById(ee(a.elt, "id")),
                                f = {
                                  preventScroll:
                                    void 0 !== p.focusScroll
                                      ? !p.focusScroll
                                      : !Q.config.defaultFocusScroll,
                                };
                              if (h) {
                                if (a.start && h.setSelectionRange)
                                  try {
                                    h.setSelectionRange(a.start, a.end);
                                  } catch (o) {}
                                h.focus(f);
                              }
                            }
                            if (
                              (i.classList.remove(Q.config.swappingClass),
                              oe(c.elts, function (e) {
                                e.classList &&
                                  e.classList.add(Q.config.settlingClass),
                                  ce(e, "htmx:afterSwap", t);
                              }),
                              O(n, /HX-Trigger-After-Swap:/i))
                            ) {
                              var g = e;
                              se(e) || (g = re().body),
                                _e(n, "HX-Trigger-After-Swap", g);
                            }
                            var _ = function () {
                              if (
                                (oe(c.tasks, function (e) {
                                  e.call();
                                }),
                                oe(c.elts, function (e) {
                                  e.classList &&
                                    e.classList.remove(Q.config.settlingClass),
                                    ce(e, "htmx:afterSettle", t);
                                }),
                                t.pathInfo.anchor)
                              ) {
                                var i = re().getElementById(t.pathInfo.anchor);
                                i &&
                                  i.scrollIntoView({
                                    block: "start",
                                    behavior: "auto",
                                  });
                              }
                              if (c.title && !d) {
                                var r = C("title");
                                r
                                  ? (r.innerHTML = c.title)
                                  : (window.document.title = c.title);
                              }
                              if (
                                (Cr(c.elts, p),
                                O(n, /HX-Trigger-After-Settle:/i))
                              ) {
                                var s = e;
                                se(e) || (s = re().body),
                                  _e(n, "HX-Trigger-After-Settle", s);
                              }
                              ie(m);
                            };
                            p.settleDelay > 0
                              ? setTimeout(_, p.settleDelay)
                              : _();
                          } catch (o) {
                            throw (fe(e, "htmx:swapError", t), ie(v), o);
                          }
                        },
                        b = Q.config.globalViewTransitions;
                      if (
                        (p.hasOwnProperty("transition") && (b = p.transition),
                        b &&
                          ce(e, "htmx:beforeTransition", t) &&
                          "undefined" != typeof Promise &&
                          document.startViewTransition)
                      ) {
                        var y = new Promise(function (e, t) {
                            (m = e), (v = t);
                          }),
                          w = _;
                        _ = function () {
                          document.startViewTransition(function () {
                            return w(), y;
                          });
                        };
                      }
                      p.swapDelay > 0 ? setTimeout(_, p.swapDelay) : _();
                    }
                    h &&
                      fe(
                        e,
                        "htmx:responseError",
                        le(
                          {
                            error:
                              "Response Status Error Code " +
                              n.status +
                              " from " +
                              t.pathInfo.requestPath,
                          },
                          t,
                        ),
                      );
                  }
                }
              }
            }
            var Xr = {};
            function Dr() {
              return {
                init: function (e) {
                  return null;
                },
                onEvent: function (e, t) {
                  return !0;
                },
                transformResponse: function (e, t, n) {
                  return e;
                },
                isInlineSwap: function (e) {
                  return !1;
                },
                handleSwap: function (e, t, n, i) {
                  return !1;
                },
                encodeParameters: function (e, t, n) {
                  return null;
                },
              };
            }
            function Ur(e, t) {
              t.init && t.init(r), (Xr[e] = le(Dr(), t));
            }
            function Fr(e) {
              delete Xr[e];
            }
            function Br(e, t, n) {
              if (null == e) return t;
              null == t && (t = []), null == n && (n = []);
              var i = te(e, "hx-ext");
              return (
                i &&
                  oe(i.split(","), function (e) {
                    if ("ignore:" != (e = e.replace(/ /g, "")).slice(0, 7)) {
                      if (n.indexOf(e) < 0) {
                        var i = Xr[e];
                        i && t.indexOf(i) < 0 && t.push(i);
                      }
                    } else n.push(e.slice(7));
                  }),
                Br(u(e), t, n)
              );
            }
            var Vr = !1;
            function jr(e) {
              Vr || "complete" === re().readyState
                ? e()
                : re().addEventListener("DOMContentLoaded", e);
            }
            function _r() {
              !1 !== Q.config.includeIndicatorStyles &&
                re().head.insertAdjacentHTML(
                  "beforeend",
                  "<style>                      ." +
                    Q.config.indicatorClass +
                    "{opacity:0}                      ." +
                    Q.config.requestClass +
                    " ." +
                    Q.config.indicatorClass +
                    "{opacity:1; transition: opacity 200ms ease-in;}                      ." +
                    Q.config.requestClass +
                    "." +
                    Q.config.indicatorClass +
                    "{opacity:1; transition: opacity 200ms ease-in;}                    </style>",
                );
            }
            function zr() {
              var e = re().querySelector('meta[name="htmx-config"]');
              return e ? E(e.content) : null;
            }
            function $r() {
              var e = zr();
              e && (Q.config = le(Q.config, e));
            }
            return (
              re().addEventListener("DOMContentLoaded", function () {
                Vr = !0;
              }),
              jr(function () {
                $r(), _r();
                var e = re().body;
                zt(e);
                var t = re().querySelectorAll(
                  "[hx-trigger='restored'],[data-hx-trigger='restored']",
                );
                e.addEventListener("htmx:abort", function (e) {
                  var t = ae(e.target);
                  t && t.xhr && t.xhr.abort();
                });
                const n = window.onpopstate
                  ? window.onpopstate.bind(window)
                  : null;
                (window.onpopstate = function (e) {
                  e.state && e.state.htmx
                    ? (ar(),
                      oe(t, function (e) {
                        ce(e, "htmx:restored", {
                          document: re(),
                          triggerEvent: ce,
                        });
                      }))
                    : n && n(e);
                }),
                  setTimeout(function () {
                    ce(e, "htmx:load", {}), (e = null);
                  }, 0);
              }),
              Q
            );
          })();
        }),
        (__WEBPACK_AMD_DEFINE_ARRAY__ = []),
        void 0 ===
          (__WEBPACK_AMD_DEFINE_RESULT__ =
            "function" == typeof (__WEBPACK_AMD_DEFINE_FACTORY__ = t)
              ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(
                  exports,
                  __WEBPACK_AMD_DEFINE_ARRAY__,
                )
              : __WEBPACK_AMD_DEFINE_FACTORY__) ||
          (module.exports = __WEBPACK_AMD_DEFINE_RESULT__);
    },
  },
]);
//# sourceMappingURL=533.617868e8.js.map
