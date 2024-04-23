/*! For license information please see 740.4c7e34b1.js.LICENSE.txt */
(self.webpackChunkpython_webpack_boilerplate =
  self.webpackChunkpython_webpack_boilerplate || []).push([
  [740],
  {
    899: function (e, t, n) {
      "use strict";
      function r(e) {
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
          return r;
        },
      });
    },
    891: function (e, t, n) {
      "use strict";
      n.d(t, {
        lg: function () {
          return z;
        },
        xI: function () {
          return ie;
        },
      });
      class r {
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
              r = t.index;
            return n < r ? -1 : n > r ? 1 : 0;
          });
        }
      }
      class i {
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
          const { eventTarget: t, eventName: n, eventOptions: r } = e,
            i = this.fetchEventListenerMapForEventTarget(t),
            s = this.cacheKey(n, r);
          i.delete(s), 0 == i.size && this.eventListenerMaps.delete(t);
        }
        fetchEventListenerForBinding(e) {
          const { eventTarget: t, eventName: n, eventOptions: r } = e;
          return this.fetchEventListener(t, n, r);
        }
        fetchEventListener(e, t, n) {
          const r = this.fetchEventListenerMapForEventTarget(e),
            i = this.cacheKey(t, n);
          let s = r.get(i);
          return s || ((s = this.createEventListener(e, t, n)), r.set(i, s)), s;
        }
        createEventListener(e, t, n) {
          const i = new r(e, t, n);
          return this.started && i.connect(), i;
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
        constructor(e, t, n, r) {
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
            (this.schema = r);
        }
        static forToken(e, t) {
          return new this(
            e.element,
            e.index,
            (function (e) {
              const t = e.trim().match(o) || [];
              let n = t[2],
                r = t[3];
              return (
                r &&
                  !["keydown", "keyup", "keypress"].includes(n) &&
                  ((n += `.${r}`), (r = "")),
                {
                  eventTarget:
                    ((i = t[4]),
                    "window" == i
                      ? window
                      : "document" == i
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
                  keyFilter: t[1] || r,
                }
              );
              var i, s;
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
          for (const { name: n, value: r } of Array.from(
            this.element.attributes,
          )) {
            const i = n.match(t),
              s = i && i[1];
            s && (e[a(s)] = v(r));
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
          const [n, r, i, s] = f.map((e) => t.includes(e));
          return (
            e.metaKey !== n ||
            e.ctrlKey !== r ||
            e.altKey !== i ||
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
      class b {
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
            { controller: r } = this.context;
          let i = !0;
          for (const [s, o] of Object.entries(this.eventOptions))
            if (s in n) {
              const a = n[s];
              i =
                i &&
                a({ name: s, value: o, event: e, element: t, controller: r });
            }
          return i;
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
            const { identifier: n, controller: r, element: i, index: s } = this,
              o = {
                identifier: n,
                controller: r,
                element: i,
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
      class y {
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
      class _ {
        constructor(e, t, n) {
          (this.attributeName = t),
            (this.delegate = n),
            (this.elementObserver = new y(e, this));
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
        constructor(e, t, n, r) {
          (this._selector = t),
            (this.details = r),
            (this.elementObserver = new y(e, this)),
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
              r = Array.from(e.querySelectorAll(t)).filter((e) =>
                this.matchElement(e),
              );
            return n.concat(r);
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
              r = this.matchesByElement.has(n, e);
            t && !r
              ? this.selectorMatched(e, n)
              : !t && r && this.selectorUnmatched(e, n);
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
            const r = this.element.getAttribute(e);
            if (
              (this.stringMap.get(e) != r &&
                this.stringMapValueChanged(r, n, t),
              null == r)
            ) {
              const t = this.stringMap.get(e);
              this.stringMap.delete(e), t && this.stringMapKeyRemoved(n, e, t);
            } else this.stringMap.set(e, r);
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
          (this.attributeObserver = new _(e, t, this)),
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
            r = (function (e, t) {
              const n = Math.max(e.length, t.length);
              return Array.from({ length: n }, (n, r) => [e[r], t[r]]);
            })(t, n).findIndex(([e, t]) => {
              return (
                (r = t),
                !((n = e) && r && n.index == r.index && n.content == r.content)
              );
              var n, r;
            });
          return -1 == r ? [[], []] : [t.slice(r), n.slice(r)];
        }
        readTokensForElement(e) {
          const t = this.attributeName;
          return (function (e, t, n) {
            return e
              .trim()
              .split(/\s+/)
              .filter((e) => e.length)
              .map((e, r) => ({
                element: t,
                attributeName: n,
                content: e,
                index: r,
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
          const t = new b(this.context, e);
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
          const r = this.valueDescriptorNameMap[t];
          null !== e &&
            (null === n && (n = r.writer(r.defaultValue)),
            this.invokeChangedCallback(t, e, n));
        }
        stringMapKeyRemoved(e, t, n) {
          const r = this.valueDescriptorNameMap[e];
          this.hasValue(e)
            ? this.invokeChangedCallback(e, r.writer(this.receiver[e]), n)
            : this.invokeChangedCallback(e, r.writer(r.defaultValue), n);
        }
        invokeChangedCallbacksForDefaultValues() {
          for (const { key: e, name: t, defaultValue: n, writer: r } of this
            .valueDescriptors)
            null == n ||
              this.controller.data.has(e) ||
              this.invokeChangedCallback(t, r(n), void 0);
        }
        invokeChangedCallback(e, t, n) {
          const r = `${e}Changed`,
            i = this.receiver[r];
          if ("function" == typeof i) {
            const r = this.valueDescriptorNameMap[e];
            try {
              const e = r.reader(t);
              let s = n;
              n && (s = r.reader(n)), i.call(this.receiver, e, s);
            } catch (e) {
              throw (
                (e instanceof TypeError &&
                  (e.message = `Stimulus Value "${this.context.identifier}.${r.name}" - ${e.message}`),
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
        const n = M(e);
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
      function M(e) {
        const t = [];
        for (; e; ) t.push(e), (e = Object.getPrototypeOf(e));
        return t.reverse();
      }
      class L {
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
          const r = this.getOutlet(e, n);
          r && this.connectOutlet(r, e, n);
        }
        selectorUnmatched(e, t, { outletName: n }) {
          const r = this.getOutletFromMap(e, n);
          r && this.disconnectOutlet(r, e, n);
        }
        selectorMatchElement(e, { outletName: t }) {
          const n = this.selector(t),
            r = this.hasOutlet(e, t),
            i = e.matches(`[${this.schema.controllerAttribute}~=${t}]`);
          return !!n && r && i && e.matches(n);
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
          var r;
          this.outletElementsByName.has(n, t) ||
            (this.outletsByName.add(n, e),
            this.outletElementsByName.add(n, t),
            null === (r = this.selectorObserverMap.get(n)) ||
              void 0 === r ||
              r.pause(() => this.delegate.outletConnected(e, t, n)));
        }
        disconnectOutlet(e, t, n) {
          var r;
          this.outletElementsByName.has(n, t) &&
            (this.outletsByName.delete(n, e),
            this.outletElementsByName.delete(n, t),
            null === (r = this.selectorObserverMap.get(n)) ||
              void 0 === r ||
              r.pause(() => this.delegate.outletDisconnected(e, t, n)));
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
            n = new _(this.scope.element, t, this);
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
      class D {
        constructor(e, t) {
          (this.logDebugActivity = (e, t = {}) => {
            const { identifier: n, controller: r, element: i } = this;
            (t = Object.assign(
              { identifier: n, controller: r, element: i },
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
            (this.outletObserver = new L(this, this));
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
          const { identifier: r, controller: i, element: s } = this;
          (n = Object.assign({ identifier: r, controller: i, element: s }, n)),
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
      class F {
        constructor(e, t) {
          (this.application = e),
            (this.definition = (function (e) {
              return {
                identifier: e.identifier,
                controllerConstructor:
                  ((t = e.controllerConstructor),
                  (function (e, t) {
                    const n = I(e),
                      r = (function (e, t) {
                        return $(t).reduce((n, r) => {
                          const i = (function (e, t, n) {
                            const r = Object.getOwnPropertyDescriptor(e, n);
                            if (!r || !("value" in r)) {
                              const e = Object.getOwnPropertyDescriptor(
                                t,
                                n,
                              ).value;
                              return (
                                r &&
                                  ((e.get = r.get || e.get),
                                  (e.set = r.set || e.set)),
                                e
                              );
                            }
                          })(e, t, r);
                          return i && Object.assign(n, { [r]: i }), n;
                        }, {});
                      })(e.prototype, t);
                    return Object.defineProperties(n.prototype, r), n;
                  })(
                    t,
                    (function (e) {
                      return N(e, "blessings").reduce((t, n) => {
                        const r = n(e);
                        for (const e in r) {
                          const n = t[e] || {};
                          t[e] = Object.assign(n, r[e]);
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
          return t || ((t = new D(this, e)), this.contextsByScope.set(e, t)), t;
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
      class P {
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
          let r = this.warnedKeysByObject.get(e);
          r || ((r = new Set()), this.warnedKeysByObject.set(e, r)),
            r.has(t) || (r.add(t), this.logger.warn(n, e));
        }
      }
      function R(e, t) {
        return `[${e}~="${t}"]`;
      }
      class q {
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
              r = this.schema.targetAttribute,
              i = this.schema.targetAttributeForScope(n);
            this.guide.warn(
              e,
              `target:${t}`,
              `Please replace ${r}="${n}.${t}" with ${i}="${t}". The ${r} attribute is deprecated and will be removed in a future version of Stimulus.`,
            );
          }
          return e;
        }
        get guide() {
          return this.scope.guide;
        }
      }
      class H {
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
          const r = e.getAttribute(this.scope.schema.controllerAttribute) || "";
          return e.matches(t) && r.split(" ").includes(n);
        }
      }
      class V {
        constructor(e, t, n, r) {
          (this.targets = new q(this)),
            (this.classes = new j(this)),
            (this.data = new P(this)),
            (this.containsElement = (e) =>
              e.closest(this.controllerSelector) === this.element),
            (this.schema = e),
            (this.element = t),
            (this.identifier = n),
            (this.guide = new B(r)),
            (this.outlets = new H(this.documentScope, t));
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
      class K {
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
          let r = n.get(t);
          return (
            r ||
              ((r = this.delegate.createScopeForElementAndIdentifier(e, t)),
              n.set(t, r)),
            r
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
      class U {
        constructor(e) {
          (this.application = e),
            (this.scopeObserver = new K(this.element, this.schema, this)),
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
          const t = new F(this.application, e);
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
      const Q = {
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
            W("abcdefghijklmnopqrstuvwxyz".split("").map((e) => [e, e])),
          ),
          W("0123456789".split("").map((e) => [e, e])),
        ),
      };
      function W(e) {
        return e.reduce(
          (e, [t, n]) => Object.assign(Object.assign({}, e), { [t]: n }),
          {},
        );
      }
      class z {
        constructor(e = document.documentElement, t = Q) {
          (this.logger = console),
            (this.debug = !1),
            (this.logDebugActivity = (e, t, n = {}) => {
              this.debug && this.logFormattedMessage(e, t, n);
            }),
            (this.element = e),
            (this.schema = t),
            (this.dispatcher = new i(this)),
            (this.router = new U(this)),
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
          var r;
          this.logger.error("%s\n\n%o\n\n%o", t, e, n),
            null === (r = window.onerror) ||
              void 0 === r ||
              r.call(window, t, "", 0, 0, e);
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
        let r = X(e, t, n);
        return (
          r ||
          (e.application.router.proposeToConnectScopeForElementAndIdentifier(
            t,
            n,
          ),
          (r = X(e, t, n)),
          r || void 0)
        );
      }
      function J([e, t], n) {
        return (function (e) {
          const { token: t, typeDefinition: n } = e,
            r = `${u(t)}-value`,
            i = (function (e) {
              const { controller: t, token: n, typeDefinition: r } = e,
                i = (function (e) {
                  const { controller: t, token: n, typeObject: r } = e,
                    i = h(r.type),
                    s = h(r.default),
                    o = i && s,
                    a = i && !s,
                    l = !i && s,
                    c = Z(r.type),
                    u = G(e.typeObject.default);
                  if (a) return c;
                  if (l) return u;
                  if (c !== u)
                    throw new Error(
                      `The specified default value for the Stimulus Value "${
                        t ? `${t}.${n}` : n
                      }" must match the defined type "${c}". The provided default value of "${
                        r.default
                      }" is of type "${u}".`,
                    );
                  return o ? c : void 0;
                })({ controller: t, token: n, typeObject: r }),
                s = G(r),
                o = Z(r),
                a = i || s || o;
              if (a) return a;
              throw new Error(
                `Unknown value type "${t ? `${t}.${r}` : n}" for "${n}" value`,
              );
            })(e);
          return {
            type: i,
            key: r,
            name: a(r),
            get defaultValue() {
              return (function (e) {
                const t = Z(e);
                if (t) return ee[t];
                const n = d(e, "default"),
                  r = d(e, "type"),
                  i = e;
                if (n) return i.default;
                if (r) {
                  const { type: e } = i,
                    t = Z(e);
                  if (t) return ee[t];
                }
                return e;
              })(n);
            },
            get hasCustomDefaultValue() {
              return void 0 !== G(n);
            },
            reader: te[i],
            writer: ne[i] || ne.default,
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
          array: re,
          object: re,
        };
      function re(e) {
        return JSON.stringify(e);
      }
      class ie {
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
            prefix: r = this.identifier,
            bubbles: i = !0,
            cancelable: s = !0,
          } = {},
        ) {
          const o = new CustomEvent(r ? `${r}:${e}` : e, {
            detail: n,
            bubbles: i,
            cancelable: s,
          });
          return t.dispatchEvent(o), o;
        }
      }
      (ie.blessings = [
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
              return M(e).reduce(
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
                      r = this.data.getAttributeNameForKey(n.key);
                    return Object.assign(e, { [r]: n });
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
                    { key: r, name: i, reader: s, writer: o } = n;
                  return {
                    [i]: {
                      get() {
                        const e = this.data.get(r);
                        return null !== e ? s(e) : n.defaultValue;
                      },
                      set(e) {
                        void 0 === e
                          ? this.data.delete(r)
                          : this.data.set(r, o(e));
                      },
                    },
                    [`has${c(i)}`]: {
                      get() {
                        return this.data.has(r) || n.hasCustomDefaultValue;
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
        (ie.targets = []),
        (ie.outlets = []),
        (ie.values = {});
    },
    414: function (e) {
      e.exports = (function () {
        "use strict";
        const e = new Map(),
          t = {
            set(t, n, r) {
              e.has(t) || e.set(t, new Map());
              const i = e.get(t);
              i.has(n) || 0 === i.size
                ? i.set(n, r)
                : console.error(
                    `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                      Array.from(i.keys())[0]
                    }.`,
                  );
            },
            get(t, n) {
              return (e.has(t) && e.get(t).get(n)) || null;
            },
            remove(t, n) {
              if (!e.has(t)) return;
              const r = e.get(t);
              r.delete(n), 0 === r.size && e.delete(t);
            },
          },
          n = "transitionend",
          r = (e) => (
            e &&
              window.CSS &&
              window.CSS.escape &&
              (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
            e
          ),
          i = (e) => {
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
              ? document.querySelector(r(e))
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
                  r = t.fn[n];
                (t.fn[n] = e.jQueryInterface),
                  (t.fn[n].Constructor = e),
                  (t.fn[n].noConflict = () => (
                    (t.fn[n] = r), e.jQueryInterface
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
          v = (e, t, r = !0) => {
            if (!r) return void m(e);
            const s =
              ((e) => {
                if (!e) return 0;
                let { transitionDuration: t, transitionDelay: n } =
                  window.getComputedStyle(e);
                const r = Number.parseFloat(t),
                  i = Number.parseFloat(n);
                return r || i
                  ? ((t = t.split(",")[0]),
                    (n = n.split(",")[0]),
                    1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
                  : 0;
              })(t) + 5;
            let o = !1;
            const a = ({ target: r }) => {
              r === t && ((o = !0), t.removeEventListener(n, a), m(e));
            };
            t.addEventListener(n, a),
              setTimeout(() => {
                o || i(t);
              }, s);
          },
          b = (e, t, n, r) => {
            const i = e.length;
            let s = e.indexOf(t);
            return -1 === s
              ? !n && r
                ? e[i - 1]
                : e[0]
              : ((s += n ? 1 : -1),
                r && (s = (s + i) % i),
                e[Math.max(0, Math.min(s, i - 1))]);
          },
          y = /[^.]*(?=\..*)\.|.*/,
          _ = /\..*/,
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
          const r = "string" == typeof t,
            i = r ? n : t || n;
          let s = D(e);
          return x.has(s) || (s = e), [r, i, s];
        }
        function N(e, t, n, r, i) {
          if ("string" != typeof t || !e) return;
          let [s, o, a] = k(t, n, r);
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
          if (u) return void (u.oneOff = u.oneOff && i);
          const h = C(o, t.replace(y, "")),
            d = s
              ? (function (e, t, n) {
                  return function r(i) {
                    const s = e.querySelectorAll(t);
                    for (
                      let { target: o } = i;
                      o && o !== this;
                      o = o.parentNode
                    )
                      for (const a of s)
                        if (a === o)
                          return (
                            I(i, { delegateTarget: o }),
                            r.oneOff && $.off(e, i.type, t, n),
                            n.apply(o, [i])
                          );
                  };
                })(e, n, o)
              : (function (e, t) {
                  return function n(r) {
                    return (
                      I(r, { delegateTarget: e }),
                      n.oneOff && $.off(e, r.type, t),
                      t.apply(e, [r])
                    );
                  };
                })(e, o);
          (d.delegationSelector = s ? n : null),
            (d.callable = o),
            (d.oneOff = i),
            (d.uidEvent = h),
            (c[h] = d),
            e.addEventListener(a, d, s);
        }
        function M(e, t, n, r, i) {
          const s = S(t[n], r, i);
          s &&
            (e.removeEventListener(n, s, Boolean(i)), delete t[n][s.uidEvent]);
        }
        function L(e, t, n, r) {
          const i = t[n] || {};
          for (const [s, o] of Object.entries(i))
            s.includes(r) && M(e, t, n, o.callable, o.delegationSelector);
        }
        function D(e) {
          return (e = e.replace(_, "")), O[e] || e;
        }
        const $ = {
          on(e, t, n, r) {
            N(e, t, n, r, !1);
          },
          one(e, t, n, r) {
            N(e, t, n, r, !0);
          },
          off(e, t, n, r) {
            if ("string" != typeof t || !e) return;
            const [i, s, o] = k(t, n, r),
              a = o !== t,
              l = T(e),
              c = l[o] || {},
              u = t.startsWith(".");
            if (void 0 === s) {
              if (u) for (const n of Object.keys(l)) L(e, l, n, t.slice(1));
              for (const [n, r] of Object.entries(c)) {
                const i = n.replace(w, "");
                (a && !t.includes(i)) ||
                  M(e, l, o, r.callable, r.delegationSelector);
              }
            } else {
              if (!Object.keys(c).length) return;
              M(e, l, o, s, i ? n : null);
            }
          },
          trigger(e, t, n) {
            if ("string" != typeof t || !e) return null;
            const r = d();
            let i = null,
              s = !0,
              o = !0,
              a = !1;
            t !== D(t) &&
              r &&
              ((i = r.Event(t, n)),
              r(e).trigger(i),
              (s = !i.isPropagationStopped()),
              (o = !i.isImmediatePropagationStopped()),
              (a = i.isDefaultPrevented()));
            const l = I(new Event(t, { bubbles: s, cancelable: !0 }), n);
            return (
              a && l.preventDefault(),
              o && e.dispatchEvent(l),
              l.defaultPrevented && i && i.preventDefault(),
              l
            );
          },
        };
        function I(e, t = {}) {
          for (const [n, r] of Object.entries(t))
            try {
              e[n] = r;
            } catch (t) {
              Object.defineProperty(e, n, {
                configurable: !0,
                get() {
                  return r;
                },
              });
            }
          return e;
        }
        function F(e) {
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
        const P = {
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
            for (const r of n) {
              let n = r.replace(/^bs/, "");
              (n = n.charAt(0).toLowerCase() + n.slice(1, n.length)),
                (t[n] = F(e.dataset[r]));
            }
            return t;
          },
          getDataAttribute(e, t) {
            return F(e.getAttribute(`data-bs-${j(t)}`));
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
            const n = s(t) ? P.getDataAttribute(t, "config") : {};
            return {
              ...this.constructor.Default,
              ...("object" == typeof n ? n : {}),
              ...(s(t) ? P.getDataAttributes(t) : {}),
              ...("object" == typeof e ? e : {}),
            };
          }
          _typeCheckConfig(e, t = this.constructor.DefaultType) {
            for (const [r, i] of Object.entries(t)) {
              const t = e[r],
                o = s(t)
                  ? "element"
                  : null == (n = t)
                  ? `${n}`
                  : Object.prototype.toString
                      .call(n)
                      .match(/\s([a-z]+)/i)[1]
                      .toLowerCase();
              if (!new RegExp(i).test(o))
                throw new TypeError(
                  `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${o}" but expected type "${i}".`,
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
        const q = (e) => {
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
                  .map((e) => r(e))
                  .join(",")
              : null;
          },
          H = {
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
              let r = e.parentNode.closest(t);
              for (; r; ) n.push(r), (r = r.parentNode.closest(t));
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
              const t = q(e);
              return t && H.findOne(t) ? t : null;
            },
            getElementFromSelector(e) {
              const t = q(e);
              return t ? H.findOne(t) : null;
            },
            getMultipleElementsFromSelector(e) {
              const t = q(e);
              return t ? H.find(t) : [];
            },
          },
          V = (e, t = "hide") => {
            const n = `click.dismiss${e.EVENT_KEY}`,
              r = e.NAME;
            $.on(document, n, `[data-bs-dismiss="${r}"]`, function (n) {
              if (
                (["A", "AREA"].includes(this.tagName) && n.preventDefault(),
                l(this))
              )
                return;
              const i = H.getElementFromSelector(this) || this.closest(`.${r}`);
              e.getOrCreateInstance(i)[t]();
            });
          },
          K = ".bs.alert",
          U = `close${K}`,
          Q = `closed${K}`;
        class W extends R {
          static get NAME() {
            return "alert";
          }
          close() {
            if ($.trigger(this._element, U).defaultPrevented) return;
            this._element.classList.remove("show");
            const e = this._element.classList.contains("fade");
            this._queueCallback(() => this._destroyElement(), this._element, e);
          }
          _destroyElement() {
            this._element.remove(), $.trigger(this._element, Q), this.dispose();
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = W.getOrCreateInstance(this);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e](this);
              }
            });
          }
        }
        V(W, "close"), g(W);
        const z = '[data-bs-toggle="button"]';
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
        $.on(document, "click.bs.button.data-api", z, (e) => {
          e.preventDefault();
          const t = e.target.closest(z);
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
          re = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)",
          };
        class ie extends B {
          constructor(e, t) {
            super(),
              (this._element = e),
              e &&
                ie.isSupported() &&
                ((this._config = this._getConfig(t)),
                (this._deltaX = 0),
                (this._supportPointerEvents = Boolean(window.PointerEvent)),
                this._initEvents());
          }
          static get Default() {
            return ne;
          }
          static get DefaultType() {
            return re;
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
          be = `click${se}${oe}`,
          ye = "carousel",
          _e = "active",
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
              (this._indicatorsElement = H.findOne(
                ".carousel-indicators",
                this._element,
              )),
              this._addEventListeners(),
              this._config.ride === ye && this.cycle();
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
            this._isSliding && i(this._element), this._clearInterval();
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
            const r = e > n ? ae : le;
            this._slide(r, t[e]);
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
                ie.isSupported() &&
                this._addTouchEventListeners();
          }
          _addTouchEventListeners() {
            for (const e of H.find(".carousel-item img", this._element))
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
            this._swipeHelper = new ie(this._element, e);
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
            const t = H.findOne(we, this._indicatorsElement);
            t.classList.remove(_e), t.removeAttribute("aria-current");
            const n = H.findOne(
              `[data-bs-slide-to="${e}"]`,
              this._indicatorsElement,
            );
            n && (n.classList.add(_e), n.setAttribute("aria-current", "true"));
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
              r = e === ae,
              i = t || b(this._getItems(), n, r, this._config.wrap);
            if (i === n) return;
            const s = this._getItemIndex(i),
              o = (t) =>
                $.trigger(this._element, t, {
                  relatedTarget: i,
                  direction: this._orderToDirection(e),
                  from: this._getItemIndex(n),
                  to: s,
                });
            if (o(he).defaultPrevented) return;
            if (!n || !i) return;
            const a = Boolean(this._interval);
            this.pause(),
              (this._isSliding = !0),
              this._setActiveIndicatorElement(s),
              (this._activeElement = i);
            const l = r ? "carousel-item-start" : "carousel-item-end",
              c = r ? "carousel-item-next" : "carousel-item-prev";
            i.classList.add(c), h(i), n.classList.add(l), i.classList.add(l);
            this._queueCallback(
              () => {
                i.classList.remove(l, c),
                  i.classList.add(_e),
                  n.classList.remove(_e, c, l),
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
            return H.findOne(Ae, this._element);
          }
          _getItems() {
            return H.find(Ee, this._element);
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
        $.on(document, be, "[data-bs-slide], [data-bs-slide-to]", function (e) {
          const t = H.getElementFromSelector(this);
          if (!t || !t.classList.contains(ye)) return;
          e.preventDefault();
          const n = Te.getOrCreateInstance(t),
            r = this.getAttribute("data-bs-slide-to");
          return r
            ? (n.to(r), void n._maybeEnableCycle())
            : "next" === P.getDataAttribute(this, "slide")
            ? (n.next(), void n._maybeEnableCycle())
            : (n.prev(), void n._maybeEnableCycle());
        }),
          $.on(window, ve, () => {
            const e = H.find('[data-bs-ride="carousel"]');
            for (const t of e) Te.getOrCreateInstance(t);
          }),
          g(Te);
        const Se = ".bs.collapse",
          ke = `show${Se}`,
          Ne = `shown${Se}`,
          Me = `hide${Se}`,
          Le = `hidden${Se}`,
          De = `click${Se}.data-api`,
          $e = "show",
          Ie = "collapse",
          Fe = "collapsing",
          je = `:scope .${Ie} .${Ie}`,
          Pe = '[data-bs-toggle="collapse"]',
          Be = { parent: null, toggle: !0 },
          Re = { parent: "(null|element)", toggle: "boolean" };
        class qe extends R {
          constructor(e, t) {
            super(e, t),
              (this._isTransitioning = !1),
              (this._triggerArray = []);
            const n = H.find(Pe);
            for (const e of n) {
              const t = H.getSelectorFromElement(e),
                n = H.find(t).filter((e) => e === this._element);
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
                  .map((e) => qe.getOrCreateInstance(e, { toggle: !1 }))),
              e.length && e[0]._isTransitioning)
            )
              return;
            if ($.trigger(this._element, ke).defaultPrevented) return;
            for (const t of e) t.hide();
            const t = this._getDimension();
            this._element.classList.remove(Ie),
              this._element.classList.add(Fe),
              (this._element.style[t] = 0),
              this._addAriaAndCollapsedClass(this._triggerArray, !0),
              (this._isTransitioning = !0);
            const n = `scroll${t[0].toUpperCase() + t.slice(1)}`;
            this._queueCallback(
              () => {
                (this._isTransitioning = !1),
                  this._element.classList.remove(Fe),
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
            if ($.trigger(this._element, Me).defaultPrevented) return;
            const e = this._getDimension();
            (this._element.style[e] = `${
              this._element.getBoundingClientRect()[e]
            }px`),
              h(this._element),
              this._element.classList.add(Fe),
              this._element.classList.remove(Ie, $e);
            for (const e of this._triggerArray) {
              const t = H.getElementFromSelector(e);
              t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
            }
            this._isTransitioning = !0;
            (this._element.style[e] = ""),
              this._queueCallback(
                () => {
                  (this._isTransitioning = !1),
                    this._element.classList.remove(Fe),
                    this._element.classList.add(Ie),
                    $.trigger(this._element, Le);
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
            const e = this._getFirstLevelChildren(Pe);
            for (const t of e) {
              const e = H.getElementFromSelector(t);
              e && this._addAriaAndCollapsedClass([t], this._isShown(e));
            }
          }
          _getFirstLevelChildren(e) {
            const t = H.find(je, this._config.parent);
            return H.find(e, this._config.parent).filter((e) => !t.includes(e));
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
                const n = qe.getOrCreateInstance(this, t);
                if ("string" == typeof e) {
                  if (void 0 === n[e])
                    throw new TypeError(`No method named "${e}"`);
                  n[e]();
                }
              })
            );
          }
        }
        $.on(document, De, Pe, function (e) {
          ("A" === e.target.tagName ||
            (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
            e.preventDefault();
          for (const e of H.getMultipleElementsFromSelector(this))
            qe.getOrCreateInstance(e, { toggle: !1 }).toggle();
        }),
          g(qe);
        var He = "top",
          Ve = "bottom",
          Ke = "right",
          Ue = "left",
          Qe = "auto",
          We = [He, Ve, Ke, Ue],
          ze = "start",
          Xe = "end",
          Ye = "clippingParents",
          Je = "viewport",
          Ze = "popper",
          Ge = "reference",
          et = We.reduce(function (e, t) {
            return e.concat([t + "-" + ze, t + "-" + Xe]);
          }, []),
          tt = [].concat(We, [Qe]).reduce(function (e, t) {
            return e.concat([t, t + "-" + ze, t + "-" + Xe]);
          }, []),
          nt = "beforeRead",
          rt = "read",
          it = "afterRead",
          st = "beforeMain",
          ot = "main",
          at = "afterMain",
          lt = "beforeWrite",
          ct = "write",
          ut = "afterWrite",
          ht = [nt, rt, it, st, ot, at, lt, ct, ut];
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
                r = t.attributes[e] || {},
                i = t.elements[e];
              gt(i) &&
                dt(i) &&
                (Object.assign(i.style, n),
                Object.keys(r).forEach(function (e) {
                  var t = r[e];
                  !1 === t
                    ? i.removeAttribute(e)
                    : i.setAttribute(e, !0 === t ? "" : t);
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
                  var r = t.elements[e],
                    i = t.attributes[e] || {},
                    s = Object.keys(
                      t.styles.hasOwnProperty(e) ? t.styles[e] : n[e],
                    ).reduce(function (e, t) {
                      return (e[t] = ""), e;
                    }, {});
                  gt(r) &&
                    dt(r) &&
                    (Object.assign(r.style, s),
                    Object.keys(i).forEach(function (e) {
                      r.removeAttribute(e);
                    }));
                });
              }
            );
          },
          requires: ["computeStyles"],
        };
        function bt(e) {
          return e.split("-")[0];
        }
        var yt = Math.max,
          _t = Math.min,
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
          var r = e.getBoundingClientRect(),
            i = 1,
            s = 1;
          t &&
            gt(e) &&
            ((i = (e.offsetWidth > 0 && wt(r.width) / e.offsetWidth) || 1),
            (s = (e.offsetHeight > 0 && wt(r.height) / e.offsetHeight) || 1));
          var o = (pt(e) ? ft(e) : window).visualViewport,
            a = !At() && n,
            l = (r.left + (a && o ? o.offsetLeft : 0)) / i,
            c = (r.top + (a && o ? o.offsetTop : 0)) / s,
            u = r.width / i,
            h = r.height / s;
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
            r = e.offsetHeight;
          return (
            Math.abs(t.width - n) <= 1 && (n = t.width),
            Math.abs(t.height - r) <= 1 && (r = t.height),
            { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
          );
        }
        function Ct(e, t) {
          var n = t.getRootNode && t.getRootNode();
          if (e.contains(t)) return !0;
          if (n && mt(n)) {
            var r = t;
            do {
              if (r && e.isSameNode(r)) return !0;
              r = r.parentNode || r.host;
            } while (r);
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
        function Mt(e) {
          return gt(e) && "fixed" !== Tt(e).position ? e.offsetParent : null;
        }
        function Lt(e) {
          for (
            var t = ft(e), n = Mt(e);
            n && St(n) && "static" === Tt(n).position;

          )
            n = Mt(n);
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
                    var r = Tt(n);
                    if (
                      "none" !== r.transform ||
                      "none" !== r.perspective ||
                      "paint" === r.contain ||
                      -1 !==
                        ["transform", "perspective"].indexOf(r.willChange) ||
                      (t && "filter" === r.willChange) ||
                      (t && r.filter && "none" !== r.filter)
                    )
                      return n;
                    n = n.parentNode;
                  }
                  return null;
                })(e) ||
                t;
        }
        function Dt(e) {
          return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
        }
        function $t(e, t, n) {
          return yt(e, _t(t, n));
        }
        function It(e) {
          return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e);
        }
        function Ft(e, t) {
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
              r = e.name,
              i = e.options,
              s = n.elements.arrow,
              o = n.modifiersData.popperOffsets,
              a = bt(n.placement),
              l = Dt(a),
              c = [Ue, Ke].indexOf(a) >= 0 ? "height" : "width";
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
                      : Ft(e, We),
                  );
                })(i.padding, n),
                h = xt(s),
                d = "y" === l ? He : Ue,
                f = "y" === l ? Ve : Ke,
                p =
                  n.rects.reference[c] +
                  n.rects.reference[l] -
                  o[l] -
                  n.rects.popper[c],
                g = o[l] - n.rects.reference[l],
                m = Lt(s),
                v = m
                  ? "y" === l
                    ? m.clientHeight || 0
                    : m.clientWidth || 0
                  : 0,
                b = p / 2 - g / 2,
                y = u[d],
                _ = v - h[c] - u[f],
                w = v / 2 - h[c] / 2 + b,
                E = $t(y, w, _),
                A = l;
              n.modifiersData[r] =
                (((t = {})[A] = E), (t.centerOffset = E - w), t);
            }
          },
          effect: function (e) {
            var t = e.state,
              n = e.options.element,
              r = void 0 === n ? "[data-popper-arrow]" : n;
            null != r &&
              ("string" != typeof r ||
                (r = t.elements.popper.querySelector(r))) &&
              Ct(t.elements.popper, r) &&
              (t.elements.arrow = r);
          },
          requires: ["popperOffsets"],
          requiresIfExists: ["preventOverflow"],
        };
        function Pt(e) {
          return e.split("-")[1];
        }
        var Bt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
        function Rt(e) {
          var t,
            n = e.popper,
            r = e.popperRect,
            i = e.placement,
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
            b = o.hasOwnProperty("y"),
            y = Ue,
            _ = He,
            w = window;
          if (c) {
            var E = Lt(n),
              A = "clientHeight",
              O = "clientWidth";
            E === ft(n) &&
              "static" !== Tt((E = kt(n))).position &&
              "absolute" === a &&
              ((A = "scrollHeight"), (O = "scrollWidth")),
              (i === He || ((i === Ue || i === Ke) && s === Xe)) &&
                ((_ = Ve),
                (g -=
                  (h && E === w && w.visualViewport
                    ? w.visualViewport.height
                    : E[A]) - r.height),
                (g *= l ? 1 : -1)),
              (i !== Ue && ((i !== He && i !== Ve) || s !== Xe)) ||
                ((y = Ke),
                (f -=
                  (h && E === w && w.visualViewport
                    ? w.visualViewport.width
                    : E[O]) - r.width),
                (f *= l ? 1 : -1));
          }
          var x,
            C = Object.assign({ position: a }, c && Bt),
            T =
              !0 === u
                ? (function (e, t) {
                    var n = e.x,
                      r = e.y,
                      i = t.devicePixelRatio || 1;
                    return { x: wt(n * i) / i || 0, y: wt(r * i) / i || 0 };
                  })({ x: f, y: g }, ft(n))
                : { x: f, y: g };
          return (
            (f = T.x),
            (g = T.y),
            l
              ? Object.assign(
                  {},
                  C,
                  (((x = {})[_] = b ? "0" : ""),
                  (x[y] = v ? "0" : ""),
                  (x.transform =
                    (w.devicePixelRatio || 1) <= 1
                      ? "translate(" + f + "px, " + g + "px)"
                      : "translate3d(" + f + "px, " + g + "px, 0)"),
                  x),
                )
              : Object.assign(
                  {},
                  C,
                  (((t = {})[_] = b ? g + "px" : ""),
                  (t[y] = v ? f + "px" : ""),
                  (t.transform = ""),
                  t),
                )
          );
        }
        const qt = {
          name: "computeStyles",
          enabled: !0,
          phase: "beforeWrite",
          fn: function (e) {
            var t = e.state,
              n = e.options,
              r = n.gpuAcceleration,
              i = void 0 === r || r,
              s = n.adaptive,
              o = void 0 === s || s,
              a = n.roundOffsets,
              l = void 0 === a || a,
              c = {
                placement: bt(t.placement),
                variation: Pt(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: i,
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
        var Ht = { passive: !0 };
        const Vt = {
          name: "eventListeners",
          enabled: !0,
          phase: "write",
          fn: function () {},
          effect: function (e) {
            var t = e.state,
              n = e.instance,
              r = e.options,
              i = r.scroll,
              s = void 0 === i || i,
              o = r.resize,
              a = void 0 === o || o,
              l = ft(t.elements.popper),
              c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return (
              s &&
                c.forEach(function (e) {
                  e.addEventListener("scroll", n.update, Ht);
                }),
              a && l.addEventListener("resize", n.update, Ht),
              function () {
                s &&
                  c.forEach(function (e) {
                    e.removeEventListener("scroll", n.update, Ht);
                  }),
                  a && l.removeEventListener("resize", n.update, Ht);
              }
            );
          },
          data: {},
        };
        var Kt = { left: "right", right: "left", bottom: "top", top: "bottom" };
        function Ut(e) {
          return e.replace(/left|right|bottom|top/g, function (e) {
            return Kt[e];
          });
        }
        var Qt = { start: "end", end: "start" };
        function Wt(e) {
          return e.replace(/start|end/g, function (e) {
            return Qt[e];
          });
        }
        function zt(e) {
          var t = ft(e);
          return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
        }
        function Xt(e) {
          return Ot(kt(e)).left + zt(e).scrollLeft;
        }
        function Yt(e) {
          var t = Tt(e),
            n = t.overflow,
            r = t.overflowX,
            i = t.overflowY;
          return /auto|scroll|overlay|hidden/.test(n + i + r);
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
          var r = Jt(e),
            i = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
            s = ft(r),
            o = i ? [s].concat(s.visualViewport || [], Yt(r) ? r : []) : r,
            a = t.concat(o);
          return i ? a : a.concat(Zt(Nt(o)));
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
                    r = kt(e),
                    i = n.visualViewport,
                    s = r.clientWidth,
                    o = r.clientHeight,
                    a = 0,
                    l = 0;
                  if (i) {
                    (s = i.width), (o = i.height);
                    var c = At();
                    (c || (!c && "fixed" === t)) &&
                      ((a = i.offsetLeft), (l = i.offsetTop));
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
                    r = zt(e),
                    i = null == (t = e.ownerDocument) ? void 0 : t.body,
                    s = yt(
                      n.scrollWidth,
                      n.clientWidth,
                      i ? i.scrollWidth : 0,
                      i ? i.clientWidth : 0,
                    ),
                    o = yt(
                      n.scrollHeight,
                      n.clientHeight,
                      i ? i.scrollHeight : 0,
                      i ? i.clientHeight : 0,
                    ),
                    a = -r.scrollLeft + Xt(e),
                    l = -r.scrollTop;
                  return (
                    "rtl" === Tt(i || n).direction &&
                      (a += yt(n.clientWidth, i ? i.clientWidth : 0) - s),
                    { width: s, height: o, x: a, y: l }
                  );
                })(kt(e)),
              );
        }
        function tn(e, t, n, r) {
          var i =
              "clippingParents" === t
                ? (function (e) {
                    var t = Zt(Nt(e)),
                      n =
                        ["absolute", "fixed"].indexOf(Tt(e).position) >= 0 &&
                        gt(e)
                          ? Lt(e)
                          : e;
                    return pt(n)
                      ? t.filter(function (e) {
                          return pt(e) && Ct(e, n) && "body" !== dt(e);
                        })
                      : [];
                  })(e)
                : [].concat(t),
            s = [].concat(i, [n]),
            o = s[0],
            a = s.reduce(
              function (t, n) {
                var i = en(e, n, r);
                return (
                  (t.top = yt(i.top, t.top)),
                  (t.right = _t(i.right, t.right)),
                  (t.bottom = _t(i.bottom, t.bottom)),
                  (t.left = yt(i.left, t.left)),
                  t
                );
              },
              en(e, o, r),
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
            r = e.element,
            i = e.placement,
            s = i ? bt(i) : null,
            o = i ? Pt(i) : null,
            a = n.x + n.width / 2 - r.width / 2,
            l = n.y + n.height / 2 - r.height / 2;
          switch (s) {
            case He:
              t = { x: a, y: n.y - r.height };
              break;
            case Ve:
              t = { x: a, y: n.y + n.height };
              break;
            case Ke:
              t = { x: n.x + n.width, y: l };
              break;
            case Ue:
              t = { x: n.x - r.width, y: l };
              break;
            default:
              t = { x: n.x, y: n.y };
          }
          var c = s ? Dt(s) : null;
          if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (o) {
              case ze:
                t[c] = t[c] - (n[u] / 2 - r[u] / 2);
                break;
              case Xe:
                t[c] = t[c] + (n[u] / 2 - r[u] / 2);
            }
          }
          return t;
        }
        function rn(e, t) {
          void 0 === t && (t = {});
          var n = t,
            r = n.placement,
            i = void 0 === r ? e.placement : r,
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
            v = It("number" != typeof m ? m : Ft(m, We)),
            b = d === Ze ? Ge : Ze,
            y = e.rects.popper,
            _ = e.elements[p ? b : d],
            w = tn(
              pt(_) ? _ : _.contextElement || kt(e.elements.popper),
              l,
              u,
              o,
            ),
            E = Ot(e.elements.reference),
            A = nn({
              reference: E,
              element: y,
              strategy: "absolute",
              placement: i,
            }),
            O = Gt(Object.assign({}, y, A)),
            x = d === Ze ? O : E,
            C = {
              top: w.top - x.top + v.top,
              bottom: x.bottom - w.bottom + v.bottom,
              left: w.left - x.left + v.left,
              right: x.right - w.right + v.right,
            },
            T = e.modifiersData.offset;
          if (d === Ze && T) {
            var S = T[i];
            Object.keys(C).forEach(function (e) {
              var t = [Ke, Ve].indexOf(e) >= 0 ? 1 : -1,
                n = [He, Ve].indexOf(e) >= 0 ? "y" : "x";
              C[e] += S[n] * t;
            });
          }
          return C;
        }
        function sn(e, t) {
          void 0 === t && (t = {});
          var n = t,
            r = n.placement,
            i = n.boundary,
            s = n.rootBoundary,
            o = n.padding,
            a = n.flipVariations,
            l = n.allowedAutoPlacements,
            c = void 0 === l ? tt : l,
            u = Pt(r),
            h = u
              ? a
                ? et
                : et.filter(function (e) {
                    return Pt(e) === u;
                  })
              : We,
            d = h.filter(function (e) {
              return c.indexOf(e) >= 0;
            });
          0 === d.length && (d = h);
          var f = d.reduce(function (t, n) {
            return (
              (t[n] = rn(e, {
                placement: n,
                boundary: i,
                rootBoundary: s,
                padding: o,
              })[bt(n)]),
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
              r = e.name;
            if (!t.modifiersData[r]._skip) {
              for (
                var i = n.mainAxis,
                  s = void 0 === i || i,
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
                  v = bt(m),
                  b =
                    l ||
                    (v !== m && p
                      ? (function (e) {
                          if (bt(e) === Qe) return [];
                          var t = Ut(e);
                          return [Wt(e), t, Wt(t)];
                        })(m)
                      : [Ut(m)]),
                  y = [m].concat(b).reduce(function (e, n) {
                    return e.concat(
                      bt(n) === Qe
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
                  _ = t.rects.reference,
                  w = t.rects.popper,
                  E = new Map(),
                  A = !0,
                  O = y[0],
                  x = 0;
                x < y.length;
                x++
              ) {
                var C = y[x],
                  T = bt(C),
                  S = Pt(C) === ze,
                  k = [He, Ve].indexOf(T) >= 0,
                  N = k ? "width" : "height",
                  M = rn(t, {
                    placement: C,
                    boundary: u,
                    rootBoundary: h,
                    altBoundary: d,
                    padding: c,
                  }),
                  L = k ? (S ? Ke : Ue) : S ? Ve : He;
                _[N] > w[N] && (L = Ut(L));
                var D = Ut(L),
                  $ = [];
                if (
                  (s && $.push(M[T] <= 0),
                  a && $.push(M[L] <= 0, M[D] <= 0),
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
                      var t = y.find(function (t) {
                        var n = E.get(t);
                        if (n)
                          return n.slice(0, e).every(function (e) {
                            return e;
                          });
                      });
                      if (t) return (O = t), "break";
                    },
                    F = p ? 3 : 1;
                  F > 0 && "break" !== I(F);
                  F--
                );
              t.placement !== O &&
                ((t.modifiersData[r]._skip = !0),
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
          return [He, Ke, Ve, Ue].some(function (t) {
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
              r = t.rects.reference,
              i = t.rects.popper,
              s = t.modifiersData.preventOverflow,
              o = rn(t, { elementContext: "reference" }),
              a = rn(t, { altBoundary: !0 }),
              l = an(o, r),
              c = an(a, i, s),
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
              r = e.name,
              i = n.offset,
              s = void 0 === i ? [0, 0] : i,
              o = tt.reduce(function (e, n) {
                return (
                  (e[n] = (function (e, t, n) {
                    var r = bt(e),
                      i = [Ue, He].indexOf(r) >= 0 ? -1 : 1,
                      s =
                        "function" == typeof n
                          ? n(Object.assign({}, t, { placement: e }))
                          : n,
                      o = s[0],
                      a = s[1];
                    return (
                      (o = o || 0),
                      (a = (a || 0) * i),
                      [Ue, Ke].indexOf(r) >= 0 ? { x: a, y: o } : { x: o, y: a }
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
              (t.modifiersData[r] = o);
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
              r = e.name,
              i = n.mainAxis,
              s = void 0 === i || i,
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
              v = bt(t.placement),
              b = Pt(t.placement),
              y = !b,
              _ = Dt(v),
              w = "x" === _ ? "y" : "x",
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
                  N = "y" === _ ? He : Ue,
                  M = "y" === _ ? Ve : Ke,
                  L = "y" === _ ? "height" : "width",
                  D = E[_],
                  $ = D + m[N],
                  I = D - m[M],
                  F = f ? -O[L] / 2 : 0,
                  j = b === ze ? A[L] : O[L],
                  P = b === ze ? -O[L] : -A[L],
                  B = t.elements.arrow,
                  R = f && B ? xt(B) : { width: 0, height: 0 },
                  q = t.modifiersData["arrow#persistent"]
                    ? t.modifiersData["arrow#persistent"].padding
                    : { top: 0, right: 0, bottom: 0, left: 0 },
                  H = q[N],
                  V = q[M],
                  K = $t(0, A[L], R[L]),
                  U = y
                    ? A[L] / 2 - F - K - H - C.mainAxis
                    : j - K - H - C.mainAxis,
                  Q = y
                    ? -A[L] / 2 + F + K + V + C.mainAxis
                    : P + K + V + C.mainAxis,
                  W = t.elements.arrow && Lt(t.elements.arrow),
                  z = W
                    ? "y" === _
                      ? W.clientTop || 0
                      : W.clientLeft || 0
                    : 0,
                  X = null != (k = null == T ? void 0 : T[_]) ? k : 0,
                  Y = D + Q - X,
                  J = $t(f ? _t($, D + U - X - z) : $, D, f ? yt(I, Y) : I);
                (E[_] = J), (S[_] = J - D);
              }
              if (a) {
                var Z,
                  G = "x" === _ ? He : Ue,
                  ee = "x" === _ ? Ve : Ke,
                  te = E[w],
                  ne = "y" === w ? "height" : "width",
                  re = te + m[G],
                  ie = te - m[ee],
                  se = -1 !== [He, Ue].indexOf(v),
                  oe = null != (Z = null == T ? void 0 : T[w]) ? Z : 0,
                  ae = se ? re : te - A[ne] - O[ne] - oe + C.altAxis,
                  le = se ? te + A[ne] + O[ne] - oe - C.altAxis : ie,
                  ce =
                    f && se
                      ? (function (e, t, n) {
                          var r = $t(e, t, n);
                          return r > n ? n : r;
                        })(ae, te, le)
                      : $t(f ? ae : re, te, f ? le : ie);
                (E[w] = ce), (S[w] = ce - te);
              }
              t.modifiersData[r] = S;
            }
          },
          requiresIfExists: ["offset"],
        };
        function fn(e, t, n) {
          void 0 === n && (n = !1);
          var r,
            i,
            s = gt(t),
            o =
              gt(t) &&
              (function (e) {
                var t = e.getBoundingClientRect(),
                  n = wt(t.width) / e.offsetWidth || 1,
                  r = wt(t.height) / e.offsetHeight || 1;
                return 1 !== n || 1 !== r;
              })(t),
            a = kt(t),
            l = Ot(e, o, n),
            c = { scrollLeft: 0, scrollTop: 0 },
            u = { x: 0, y: 0 };
          return (
            (s || (!s && !n)) &&
              (("body" !== dt(t) || Yt(a)) &&
                (c =
                  (r = t) !== ft(r) && gt(r)
                    ? { scrollLeft: (i = r).scrollLeft, scrollTop: i.scrollTop }
                    : zt(r)),
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
            r = [];
          function i(e) {
            n.add(e.name),
              []
                .concat(e.requires || [], e.requiresIfExists || [])
                .forEach(function (e) {
                  if (!n.has(e)) {
                    var r = t.get(e);
                    r && i(r);
                  }
                }),
              r.push(e);
          }
          return (
            e.forEach(function (e) {
              t.set(e.name, e);
            }),
            e.forEach(function (e) {
              n.has(e.name) || i(e);
            }),
            r
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
            r = void 0 === n ? [] : n,
            i = t.defaultOptions,
            s = void 0 === i ? gn : i;
          return function (e, t, n) {
            void 0 === n && (n = s);
            var i,
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
                  var i = "function" == typeof n ? n(a.options) : n;
                  h(),
                    (a.options = Object.assign({}, s, a.options, i)),
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
                      ((o = [].concat(r, a.options.modifiers)),
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
                        r = void 0 === n ? {} : n,
                        i = e.effect;
                      if ("function" == typeof i) {
                        var s = i({
                            state: a,
                            name: t,
                            instance: u,
                            options: r,
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
                        reference: fn(t, Lt(n), "fixed" === a.options.strategy),
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
                      for (var r = 0; r < a.orderedModifiers.length; r++)
                        if (!0 !== a.reset) {
                          var i = a.orderedModifiers[r],
                            s = i.fn,
                            o = i.options,
                            l = void 0 === o ? {} : o,
                            h = i.name;
                          "function" == typeof s &&
                            (a =
                              s({
                                state: a,
                                options: l,
                                name: h,
                                instance: u,
                              }) || a);
                        } else (a.reset = !1), (r = -1);
                    }
                  }
                },
                update:
                  ((i = function () {
                    return new Promise(function (e) {
                      u.forceUpdate(), e(a);
                    });
                  }),
                  function () {
                    return (
                      o ||
                        (o = new Promise(function (e) {
                          Promise.resolve().then(function () {
                            (o = void 0), e(i());
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
        var bn = vn(),
          yn = vn({ defaultModifiers: [Vt, hn, qt, vt] }),
          _n = vn({ defaultModifiers: [Vt, hn, qt, vt, un, on, dn, jt, cn] });
        const wn = Object.freeze(
            Object.defineProperty(
              {
                __proto__: null,
                afterMain: at,
                afterRead: it,
                afterWrite: ut,
                applyStyles: vt,
                arrow: jt,
                auto: Qe,
                basePlacements: We,
                beforeMain: st,
                beforeRead: nt,
                beforeWrite: lt,
                bottom: Ve,
                clippingParents: Ye,
                computeStyles: qt,
                createPopper: _n,
                createPopperBase: bn,
                createPopperLite: yn,
                detectOverflow: rn,
                end: Xe,
                eventListeners: Vt,
                flip: on,
                hide: cn,
                left: Ue,
                main: ot,
                modifierPhases: ht,
                offset: un,
                placements: tt,
                popper: Ze,
                popperGenerator: vn,
                popperOffsets: hn,
                preventOverflow: dn,
                read: rt,
                reference: Ge,
                right: Ke,
                start: ze,
                top: He,
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
          Mn = `click${An}${On}`,
          Ln = `keydown${An}${On}`,
          Dn = `keyup${An}${On}`,
          $n = "show",
          In = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
          Fn = `${In}.${$n}`,
          jn = ".dropdown-menu",
          Pn = p() ? "top-end" : "top-start",
          Bn = p() ? "top-start" : "top-end",
          Rn = p() ? "bottom-end" : "bottom-start",
          qn = p() ? "bottom-start" : "bottom-end",
          Hn = p() ? "left-start" : "right-start",
          Vn = p() ? "right-start" : "left-start",
          Kn = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle",
          },
          Un = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)",
          };
        class Qn extends R {
          constructor(e, t) {
            super(e, t),
              (this._popper = null),
              (this._parent = this._element.parentNode),
              (this._menu =
                H.next(this._element, jn)[0] ||
                H.prev(this._element, jn)[0] ||
                H.findOne(jn, this._parent)),
              (this._inNavbar = this._detectNavbar());
          }
          static get Default() {
            return Kn;
          }
          static get DefaultType() {
            return Un;
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
                P.removeDataAttribute(this._menu, "popper"),
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
            this._popper = _n(e, this._menu, t);
          }
          _isShown() {
            return this._menu.classList.contains($n);
          }
          _getPlacement() {
            const e = this._parent;
            if (e.classList.contains("dropend")) return Hn;
            if (e.classList.contains("dropstart")) return Vn;
            if (e.classList.contains("dropup-center")) return "top";
            if (e.classList.contains("dropdown-center")) return "bottom";
            const t =
              "end" ===
              getComputedStyle(this._menu)
                .getPropertyValue("--bs-position")
                .trim();
            return e.classList.contains("dropup") ? (t ? Bn : Pn) : t ? qn : Rn;
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
                (P.setDataAttribute(this._menu, "popper", "static"),
                (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
              { ...e, ...m(this._config.popperConfig, [e]) }
            );
          }
          _selectMenuItem({ key: e, target: t }) {
            const n = H.find(
              ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
              this._menu,
            ).filter((e) => a(e));
            n.length && b(n, t, e === Cn, !n.includes(t)).focus();
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Qn.getOrCreateInstance(this, e);
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
            const t = H.find(Fn);
            for (const n of t) {
              const t = Qn.getInstance(n);
              if (!t || !1 === t._config.autoClose) continue;
              const r = e.composedPath(),
                i = r.includes(t._menu);
              if (
                r.includes(t._element) ||
                ("inside" === t._config.autoClose && !i) ||
                ("outside" === t._config.autoClose && i)
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
              r = [xn, Cn].includes(e.key);
            if (!r && !n) return;
            if (t && !n) return;
            e.preventDefault();
            const i = this.matches(In)
                ? this
                : H.prev(this, In)[0] ||
                  H.next(this, In)[0] ||
                  H.findOne(In, e.delegateTarget.parentNode),
              s = Qn.getOrCreateInstance(i);
            if (r)
              return e.stopPropagation(), s.show(), void s._selectMenuItem(e);
            s._isShown() && (e.stopPropagation(), s.hide(), i.focus());
          }
        }
        $.on(document, Ln, In, Qn.dataApiKeydownHandler),
          $.on(document, Ln, jn, Qn.dataApiKeydownHandler),
          $.on(document, Mn, Qn.clearMenus),
          $.on(document, Dn, Qn.clearMenus),
          $.on(document, Mn, In, function (e) {
            e.preventDefault(), Qn.getOrCreateInstance(this).toggle();
          }),
          g(Qn);
        const Wn = "backdrop",
          zn = "show",
          Xn = `mousedown.bs.${Wn}`,
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
            return Wn;
          }
          show(e) {
            if (!this._config.isVisible) return void m(e);
            this._append();
            const t = this._getElement();
            this._config.isAnimated && h(t),
              t.classList.add(zn),
              this._emulateAnimation(() => {
                m(e);
              });
          }
          hide(e) {
            this._config.isVisible
              ? (this._getElement().classList.remove(zn),
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
          er = `focusin${Gn}`,
          tr = `keydown.tab${Gn}`,
          nr = "backward",
          rr = { autofocus: !0, trapElement: null },
          ir = { autofocus: "boolean", trapElement: "element" };
        class sr extends B {
          constructor(e) {
            super(),
              (this._config = this._getConfig(e)),
              (this._isActive = !1),
              (this._lastTabNavDirection = null);
          }
          static get Default() {
            return rr;
          }
          static get DefaultType() {
            return ir;
          }
          static get NAME() {
            return "focustrap";
          }
          activate() {
            this._isActive ||
              (this._config.autofocus && this._config.trapElement.focus(),
              $.off(document, Gn),
              $.on(document, er, (e) => this._handleFocusin(e)),
              $.on(document, tr, (e) => this._handleKeydown(e)),
              (this._isActive = !0));
          }
          deactivate() {
            this._isActive && ((this._isActive = !1), $.off(document, Gn));
          }
          _handleFocusin(e) {
            const { trapElement: t } = this._config;
            if (e.target === document || e.target === t || t.contains(e.target))
              return;
            const n = H.focusableChildren(t);
            0 === n.length
              ? t.focus()
              : this._lastTabNavDirection === nr
              ? n[n.length - 1].focus()
              : n[0].focus();
          }
          _handleKeydown(e) {
            "Tab" === e.key &&
              (this._lastTabNavDirection = e.shiftKey ? nr : "forward");
          }
        }
        const or = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
          ar = ".sticky-top",
          lr = "padding-right",
          cr = "margin-right";
        class ur {
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
              this._setElementAttributes(this._element, lr, (t) => t + e),
              this._setElementAttributes(or, lr, (t) => t + e),
              this._setElementAttributes(ar, cr, (t) => t - e);
          }
          reset() {
            this._resetElementAttributes(this._element, "overflow"),
              this._resetElementAttributes(this._element, lr),
              this._resetElementAttributes(or, lr),
              this._resetElementAttributes(ar, cr);
          }
          isOverflowing() {
            return this.getWidth() > 0;
          }
          _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"),
              (this._element.style.overflow = "hidden");
          }
          _setElementAttributes(e, t, n) {
            const r = this.getWidth();
            this._applyManipulationCallback(e, (e) => {
              if (e !== this._element && window.innerWidth > e.clientWidth + r)
                return;
              this._saveInitialAttribute(e, t);
              const i = window.getComputedStyle(e).getPropertyValue(t);
              e.style.setProperty(t, `${n(Number.parseFloat(i))}px`);
            });
          }
          _saveInitialAttribute(e, t) {
            const n = e.style.getPropertyValue(t);
            n && P.setDataAttribute(e, t, n);
          }
          _resetElementAttributes(e, t) {
            this._applyManipulationCallback(e, (e) => {
              const n = P.getDataAttribute(e, t);
              null !== n
                ? (P.removeDataAttribute(e, t), e.style.setProperty(t, n))
                : e.style.removeProperty(t);
            });
          }
          _applyManipulationCallback(e, t) {
            if (s(e)) t(e);
            else for (const n of H.find(e, this._element)) t(n);
          }
        }
        const hr = ".bs.modal",
          dr = `hide${hr}`,
          fr = `hidePrevented${hr}`,
          pr = `hidden${hr}`,
          gr = `show${hr}`,
          mr = `shown${hr}`,
          vr = `resize${hr}`,
          br = `click.dismiss${hr}`,
          yr = `mousedown.dismiss${hr}`,
          _r = `keydown.dismiss${hr}`,
          wr = `click${hr}.data-api`,
          Er = "modal-open",
          Ar = "show",
          Or = "modal-static",
          xr = { backdrop: !0, focus: !0, keyboard: !0 },
          Cr = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean",
          };
        class Tr extends R {
          constructor(e, t) {
            super(e, t),
              (this._dialog = H.findOne(".modal-dialog", this._element)),
              (this._backdrop = this._initializeBackDrop()),
              (this._focustrap = this._initializeFocusTrap()),
              (this._isShown = !1),
              (this._isTransitioning = !1),
              (this._scrollBar = new ur()),
              this._addEventListeners();
          }
          static get Default() {
            return xr;
          }
          static get DefaultType() {
            return Cr;
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
              $.trigger(this._element, gr, { relatedTarget: e })
                .defaultPrevented ||
              ((this._isShown = !0),
              (this._isTransitioning = !0),
              this._scrollBar.hide(),
              document.body.classList.add(Er),
              this._adjustDialog(),
              this._backdrop.show(() => this._showElement(e)));
          }
          hide() {
            this._isShown &&
              !this._isTransitioning &&
              ($.trigger(this._element, dr).defaultPrevented ||
                ((this._isShown = !1),
                (this._isTransitioning = !0),
                this._focustrap.deactivate(),
                this._element.classList.remove(Ar),
                this._queueCallback(
                  () => this._hideModal(),
                  this._element,
                  this._isAnimated(),
                )));
          }
          dispose() {
            $.off(window, hr),
              $.off(this._dialog, hr),
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
            return new sr({ trapElement: this._element });
          }
          _showElement(e) {
            document.body.contains(this._element) ||
              document.body.append(this._element),
              (this._element.style.display = "block"),
              this._element.removeAttribute("aria-hidden"),
              this._element.setAttribute("aria-modal", !0),
              this._element.setAttribute("role", "dialog"),
              (this._element.scrollTop = 0);
            const t = H.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0),
              h(this._element),
              this._element.classList.add(Ar);
            this._queueCallback(
              () => {
                this._config.focus && this._focustrap.activate(),
                  (this._isTransitioning = !1),
                  $.trigger(this._element, mr, { relatedTarget: e });
              },
              this._dialog,
              this._isAnimated(),
            );
          }
          _addEventListeners() {
            $.on(this._element, _r, (e) => {
              "Escape" === e.key &&
                (this._config.keyboard
                  ? this.hide()
                  : this._triggerBackdropTransition());
            }),
              $.on(window, vr, () => {
                this._isShown && !this._isTransitioning && this._adjustDialog();
              }),
              $.on(this._element, yr, (e) => {
                $.one(this._element, br, (t) => {
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
                document.body.classList.remove(Er),
                  this._resetAdjustments(),
                  this._scrollBar.reset(),
                  $.trigger(this._element, pr);
              });
          }
          _isAnimated() {
            return this._element.classList.contains("fade");
          }
          _triggerBackdropTransition() {
            if ($.trigger(this._element, fr).defaultPrevented) return;
            const e =
                this._element.scrollHeight >
                document.documentElement.clientHeight,
              t = this._element.style.overflowY;
            "hidden" === t ||
              this._element.classList.contains(Or) ||
              (e || (this._element.style.overflowY = "hidden"),
              this._element.classList.add(Or),
              this._queueCallback(() => {
                this._element.classList.remove(Or),
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
              const n = Tr.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === n[e])
                  throw new TypeError(`No method named "${e}"`);
                n[e](t);
              }
            });
          }
        }
        $.on(document, wr, '[data-bs-toggle="modal"]', function (e) {
          const t = H.getElementFromSelector(this);
          ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            $.one(t, gr, (e) => {
              e.defaultPrevented ||
                $.one(t, pr, () => {
                  a(this) && this.focus();
                });
            });
          const n = H.findOne(".modal.show");
          n && Tr.getInstance(n).hide(), Tr.getOrCreateInstance(t).toggle(this);
        }),
          V(Tr),
          g(Tr);
        const Sr = ".bs.offcanvas",
          kr = ".data-api",
          Nr = `load${Sr}${kr}`,
          Mr = "show",
          Lr = "showing",
          Dr = "hiding",
          $r = ".offcanvas.show",
          Ir = `show${Sr}`,
          Fr = `shown${Sr}`,
          jr = `hide${Sr}`,
          Pr = `hidePrevented${Sr}`,
          Br = `hidden${Sr}`,
          Rr = `resize${Sr}`,
          qr = `click${Sr}${kr}`,
          Hr = `keydown.dismiss${Sr}`,
          Vr = { backdrop: !0, keyboard: !0, scroll: !1 },
          Kr = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean",
          };
        class Ur extends R {
          constructor(e, t) {
            super(e, t),
              (this._isShown = !1),
              (this._backdrop = this._initializeBackDrop()),
              (this._focustrap = this._initializeFocusTrap()),
              this._addEventListeners();
          }
          static get Default() {
            return Vr;
          }
          static get DefaultType() {
            return Kr;
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
              $.trigger(this._element, Ir, { relatedTarget: e })
                .defaultPrevented
            )
              return;
            (this._isShown = !0),
              this._backdrop.show(),
              this._config.scroll || new ur().hide(),
              this._element.setAttribute("aria-modal", !0),
              this._element.setAttribute("role", "dialog"),
              this._element.classList.add(Lr);
            this._queueCallback(
              () => {
                (this._config.scroll && !this._config.backdrop) ||
                  this._focustrap.activate(),
                  this._element.classList.add(Mr),
                  this._element.classList.remove(Lr),
                  $.trigger(this._element, Fr, { relatedTarget: e });
              },
              this._element,
              !0,
            );
          }
          hide() {
            if (!this._isShown) return;
            if ($.trigger(this._element, jr).defaultPrevented) return;
            this._focustrap.deactivate(),
              this._element.blur(),
              (this._isShown = !1),
              this._element.classList.add(Dr),
              this._backdrop.hide();
            this._queueCallback(
              () => {
                this._element.classList.remove(Mr, Dr),
                  this._element.removeAttribute("aria-modal"),
                  this._element.removeAttribute("role"),
                  this._config.scroll || new ur().reset(),
                  $.trigger(this._element, Br);
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
                      : $.trigger(this._element, Pr);
                  }
                : null,
            });
          }
          _initializeFocusTrap() {
            return new sr({ trapElement: this._element });
          }
          _addEventListeners() {
            $.on(this._element, Hr, (e) => {
              "Escape" === e.key &&
                (this._config.keyboard
                  ? this.hide()
                  : $.trigger(this._element, Pr));
            });
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Ur.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e](this);
              }
            });
          }
        }
        $.on(document, qr, '[data-bs-toggle="offcanvas"]', function (e) {
          const t = H.getElementFromSelector(this);
          if (
            (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            l(this))
          )
            return;
          $.one(t, Br, () => {
            a(this) && this.focus();
          });
          const n = H.findOne($r);
          n && n !== t && Ur.getInstance(n).hide(),
            Ur.getOrCreateInstance(t).toggle(this);
        }),
          $.on(window, Nr, () => {
            for (const e of H.find($r)) Ur.getOrCreateInstance(e).show();
          }),
          $.on(window, Rr, () => {
            for (const e of H.find(
              "[aria-modal][class*=show][class*=offcanvas-]",
            ))
              "fixed" !== getComputedStyle(e).position &&
                Ur.getOrCreateInstance(e).hide();
          }),
          V(Ur),
          g(Ur);
        const Qr = {
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
          Wr = new Set([
            "background",
            "cite",
            "href",
            "itemtype",
            "longdesc",
            "poster",
            "src",
            "xlink:href",
          ]),
          zr = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
          Xr = (e, t) => {
            const n = e.nodeName.toLowerCase();
            return t.includes(n)
              ? !Wr.has(n) || Boolean(zr.test(e.nodeValue))
              : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
          };
        const Yr = {
            allowList: Qr,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>",
          },
          Jr = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string",
          },
          Zr = {
            entry: "(string|element|function|null)",
            selector: "(string|element)",
          };
        class Gr extends B {
          constructor(e) {
            super(), (this._config = this._getConfig(e));
          }
          static get Default() {
            return Yr;
          }
          static get DefaultType() {
            return Jr;
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
              super._typeCheckConfig({ selector: t, entry: n }, Zr);
          }
          _setContent(e, t, n) {
            const r = H.findOne(n, e);
            r &&
              ((t = this._resolvePossibleFunction(t))
                ? s(t)
                  ? this._putElementInTemplate(o(t), r)
                  : this._config.html
                  ? (r.innerHTML = this._maybeSanitize(t))
                  : (r.textContent = t)
                : r.remove());
          }
          _maybeSanitize(e) {
            return this._config.sanitize
              ? (function (e, t, n) {
                  if (!e.length) return e;
                  if (n && "function" == typeof n) return n(e);
                  const r = new window.DOMParser().parseFromString(
                      e,
                      "text/html",
                    ),
                    i = [].concat(...r.body.querySelectorAll("*"));
                  for (const e of i) {
                    const n = e.nodeName.toLowerCase();
                    if (!Object.keys(t).includes(n)) {
                      e.remove();
                      continue;
                    }
                    const r = [].concat(...e.attributes),
                      i = [].concat(t["*"] || [], t[n] || []);
                    for (const t of r)
                      Xr(t, i) || e.removeAttribute(t.nodeName);
                  }
                  return r.body.innerHTML;
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
        const ei = new Set(["sanitize", "allowList", "sanitizeFn"]),
          ti = "fade",
          ni = "show",
          ri = ".modal",
          ii = "hide.bs.modal",
          si = "hover",
          oi = "focus",
          ai = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: p() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: p() ? "right" : "left",
          },
          li = {
            allowList: Qr,
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
          ci = {
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
        class ui extends R {
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
            return li;
          }
          static get DefaultType() {
            return ci;
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
              $.off(this._element.closest(ri), ii, this._hideModalHandler),
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
            const { container: r } = this._config;
            if (
              (this._element.ownerDocument.documentElement.contains(this.tip) ||
                (r.append(n),
                $.trigger(
                  this._element,
                  this.constructor.eventName("inserted"),
                )),
              (this._popper = this._createPopper(n)),
              n.classList.add(ni),
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
              (this._getTipElement().classList.remove(ni),
              "ontouchstart" in document.documentElement)
            )
              for (const e of [].concat(...document.body.children))
                $.off(e, "mouseover", u);
            (this._activeTrigger.click = !1),
              (this._activeTrigger[oi] = !1),
              (this._activeTrigger[si] = !1),
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
            t.classList.remove(ti, ni),
              t.classList.add(`bs-${this.constructor.NAME}-auto`);
            const n = ((e) => {
              do {
                e += Math.floor(1e6 * Math.random());
              } while (document.getElementById(e));
              return e;
            })(this.constructor.NAME).toString();
            return (
              t.setAttribute("id", n),
              this._isAnimated() && t.classList.add(ti),
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
                : (this._templateFactory = new Gr({
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
              (this.tip && this.tip.classList.contains(ti))
            );
          }
          _isShown() {
            return this.tip && this.tip.classList.contains(ni);
          }
          _createPopper(e) {
            const t = m(this._config.placement, [this, e, this._element]),
              n = ai[t.toUpperCase()];
            return _n(this._element, e, this._getPopperConfig(n));
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
                    t === si
                      ? this.constructor.eventName("mouseenter")
                      : this.constructor.eventName("focusin"),
                  n =
                    t === si
                      ? this.constructor.eventName("mouseleave")
                      : this.constructor.eventName("focusout");
                $.on(this._element, e, this._config.selector, (e) => {
                  const t = this._initializeOnDelegatedTarget(e);
                  (t._activeTrigger["focusin" === e.type ? oi : si] = !0),
                    t._enter();
                }),
                  $.on(this._element, n, this._config.selector, (e) => {
                    const t = this._initializeOnDelegatedTarget(e);
                    (t._activeTrigger["focusout" === e.type ? oi : si] =
                      t._element.contains(e.relatedTarget)),
                      t._leave();
                  });
              }
            (this._hideModalHandler = () => {
              this._element && this.hide();
            }),
              $.on(this._element.closest(ri), ii, this._hideModalHandler);
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
            const t = P.getDataAttributes(this._element);
            for (const e of Object.keys(t)) ei.has(e) && delete t[e];
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
              const t = ui.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e])
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        g(ui);
        const hi = {
            ...ui.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template:
              '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click",
          },
          di = { ...ui.DefaultType, content: "(null|string|element|function)" };
        class fi extends ui {
          static get Default() {
            return hi;
          }
          static get DefaultType() {
            return di;
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
              const t = fi.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e])
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        g(fi);
        const pi = ".bs.scrollspy",
          gi = `activate${pi}`,
          mi = `click${pi}`,
          vi = `load${pi}.data-api`,
          bi = "active",
          yi = "[href]",
          _i = ".nav-link",
          wi = `${_i}, .nav-item > ${_i}, .list-group-item`,
          Ei = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [0.1, 0.5, 1],
          },
          Ai = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array",
          };
        class Oi extends R {
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
            return Ei;
          }
          static get DefaultType() {
            return Ai;
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
              ($.off(this._config.target, mi),
              $.on(this._config.target, mi, yi, (e) => {
                const t = this._observableSections.get(e.target.hash);
                if (t) {
                  e.preventDefault();
                  const n = this._rootElement || window,
                    r = t.offsetTop - this._element.offsetTop;
                  if (n.scrollTo)
                    return void n.scrollTo({ top: r, behavior: "smooth" });
                  n.scrollTop = r;
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
              r = (this._rootElement || document.documentElement).scrollTop,
              i = r >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = r;
            for (const s of e) {
              if (!s.isIntersecting) {
                (this._activeTarget = null), this._clearActiveClass(t(s));
                continue;
              }
              const e =
                s.target.offsetTop >= this._previousScrollData.visibleEntryTop;
              if (i && e) {
                if ((n(s), !r)) return;
              } else i || e || n(s);
            }
          }
          _initializeTargetsAndObservables() {
            (this._targetLinks = new Map()),
              (this._observableSections = new Map());
            const e = H.find(yi, this._config.target);
            for (const t of e) {
              if (!t.hash || l(t)) continue;
              const e = H.findOne(decodeURI(t.hash), this._element);
              a(e) &&
                (this._targetLinks.set(decodeURI(t.hash), t),
                this._observableSections.set(t.hash, e));
            }
          }
          _process(e) {
            this._activeTarget !== e &&
              (this._clearActiveClass(this._config.target),
              (this._activeTarget = e),
              e.classList.add(bi),
              this._activateParents(e),
              $.trigger(this._element, gi, { relatedTarget: e }));
          }
          _activateParents(e) {
            if (e.classList.contains("dropdown-item"))
              H.findOne(
                ".dropdown-toggle",
                e.closest(".dropdown"),
              ).classList.add(bi);
            else
              for (const t of H.parents(e, ".nav, .list-group"))
                for (const e of H.prev(t, wi)) e.classList.add(bi);
          }
          _clearActiveClass(e) {
            e.classList.remove(bi);
            const t = H.find(`${yi}.${bi}`, e);
            for (const e of t) e.classList.remove(bi);
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Oi.getOrCreateInstance(this, e);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        $.on(window, vi, () => {
          for (const e of H.find('[data-bs-spy="scroll"]'))
            Oi.getOrCreateInstance(e);
        }),
          g(Oi);
        const xi = ".bs.tab",
          Ci = `hide${xi}`,
          Ti = `hidden${xi}`,
          Si = `show${xi}`,
          ki = `shown${xi}`,
          Ni = `click${xi}`,
          Mi = `keydown${xi}`,
          Li = `load${xi}`,
          Di = "ArrowLeft",
          $i = "ArrowRight",
          Ii = "ArrowUp",
          Fi = "ArrowDown",
          ji = "Home",
          Pi = "End",
          Bi = "active",
          Ri = "fade",
          qi = "show",
          Hi = ".dropdown-toggle",
          Vi = `:not(${Hi})`,
          Ki =
            '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
          Ui = `.nav-link${Vi}, .list-group-item${Vi}, [role="tab"]${Vi}, ${Ki}`,
          Qi = `.${Bi}[data-bs-toggle="tab"], .${Bi}[data-bs-toggle="pill"], .${Bi}[data-bs-toggle="list"]`;
        class Wi extends R {
          constructor(e) {
            super(e),
              (this._parent = this._element.closest(
                '.list-group, .nav, [role="tablist"]',
              )),
              this._parent &&
                (this._setInitialAttributes(this._parent, this._getChildren()),
                $.on(this._element, Mi, (e) => this._keydown(e)));
          }
          static get NAME() {
            return "tab";
          }
          show() {
            const e = this._element;
            if (this._elemIsActive(e)) return;
            const t = this._getActiveElem(),
              n = t ? $.trigger(t, Ci, { relatedTarget: e }) : null;
            $.trigger(e, Si, { relatedTarget: t }).defaultPrevented ||
              (n && n.defaultPrevented) ||
              (this._deactivate(t, e), this._activate(e, t));
          }
          _activate(e, t) {
            if (!e) return;
            e.classList.add(Bi), this._activate(H.getElementFromSelector(e));
            this._queueCallback(
              () => {
                "tab" === e.getAttribute("role")
                  ? (e.removeAttribute("tabindex"),
                    e.setAttribute("aria-selected", !0),
                    this._toggleDropDown(e, !0),
                    $.trigger(e, ki, { relatedTarget: t }))
                  : e.classList.add(qi);
              },
              e,
              e.classList.contains(Ri),
            );
          }
          _deactivate(e, t) {
            if (!e) return;
            e.classList.remove(Bi),
              e.blur(),
              this._deactivate(H.getElementFromSelector(e));
            this._queueCallback(
              () => {
                "tab" === e.getAttribute("role")
                  ? (e.setAttribute("aria-selected", !1),
                    e.setAttribute("tabindex", "-1"),
                    this._toggleDropDown(e, !1),
                    $.trigger(e, Ti, { relatedTarget: t }))
                  : e.classList.remove(qi);
              },
              e,
              e.classList.contains(Ri),
            );
          }
          _keydown(e) {
            if (![Di, $i, Ii, Fi, ji, Pi].includes(e.key)) return;
            e.stopPropagation(), e.preventDefault();
            const t = this._getChildren().filter((e) => !l(e));
            let n;
            if ([ji, Pi].includes(e.key))
              n = t[e.key === ji ? 0 : t.length - 1];
            else {
              const r = [$i, Fi].includes(e.key);
              n = b(t, e.target, r, !0);
            }
            n &&
              (n.focus({ preventScroll: !0 }),
              Wi.getOrCreateInstance(n).show());
          }
          _getChildren() {
            return H.find(Ui, this._parent);
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
            const t = H.getElementFromSelector(e);
            t &&
              (this._setAttributeIfNotExists(t, "role", "tabpanel"),
              e.id &&
                this._setAttributeIfNotExists(t, "aria-labelledby", `${e.id}`));
          }
          _toggleDropDown(e, t) {
            const n = this._getOuterElement(e);
            if (!n.classList.contains("dropdown")) return;
            const r = (e, r) => {
              const i = H.findOne(e, n);
              i && i.classList.toggle(r, t);
            };
            r(Hi, Bi),
              r(".dropdown-menu", qi),
              n.setAttribute("aria-expanded", t);
          }
          _setAttributeIfNotExists(e, t, n) {
            e.hasAttribute(t) || e.setAttribute(t, n);
          }
          _elemIsActive(e) {
            return e.classList.contains(Bi);
          }
          _getInnerElement(e) {
            return e.matches(Ui) ? e : H.findOne(Ui, e);
          }
          _getOuterElement(e) {
            return e.closest(".nav-item, .list-group-item") || e;
          }
          static jQueryInterface(e) {
            return this.each(function () {
              const t = Wi.getOrCreateInstance(this);
              if ("string" == typeof e) {
                if (void 0 === t[e] || e.startsWith("_") || "constructor" === e)
                  throw new TypeError(`No method named "${e}"`);
                t[e]();
              }
            });
          }
        }
        $.on(document, Ni, Ki, function (e) {
          ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            l(this) || Wi.getOrCreateInstance(this).show();
        }),
          $.on(window, Li, () => {
            for (const e of H.find(Qi)) Wi.getOrCreateInstance(e);
          }),
          g(Wi);
        const zi = ".bs.toast",
          Xi = `mouseover${zi}`,
          Yi = `mouseout${zi}`,
          Ji = `focusin${zi}`,
          Zi = `focusout${zi}`,
          Gi = `hide${zi}`,
          es = `hidden${zi}`,
          ts = `show${zi}`,
          ns = `shown${zi}`,
          rs = "hide",
          is = "show",
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
            this._element.classList.remove(rs),
              h(this._element),
              this._element.classList.add(is, ss),
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
            if ($.trigger(this._element, Gi).defaultPrevented) return;
            this._element.classList.add(ss),
              this._queueCallback(
                () => {
                  this._element.classList.add(rs),
                    this._element.classList.remove(ss, is),
                    $.trigger(this._element, es);
                },
                this._element,
                this._config.animation,
              );
          }
          dispose() {
            this._clearTimeout(),
              this.isShown() && this._element.classList.remove(is),
              super.dispose();
          }
          isShown() {
            return this._element.classList.contains(is);
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
            $.on(this._element, Xi, (e) => this._onInteraction(e, !0)),
              $.on(this._element, Yi, (e) => this._onInteraction(e, !1)),
              $.on(this._element, Ji, (e) => this._onInteraction(e, !0)),
              $.on(this._element, Zi, (e) => this._onInteraction(e, !1));
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
            Alert: W,
            Button: X,
            Carousel: Te,
            Collapse: qe,
            Dropdown: Qn,
            Modal: Tr,
            Offcanvas: Ur,
            Popover: fi,
            ScrollSpy: Oi,
            Tab: Wi,
            Toast: ls,
            Tooltip: ui,
          }
        );
      })();
    },
    484: function (e, t, n) {
      e.exports = (function (e, t, n, r) {
        "use strict";
        const i = ".bs.alert",
          s = `close${i}`,
          o = `closed${i}`;
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
        return n.enableDismissTrigger(a, "close"), r.defineJQueryPlugin(a), a;
      })(n(11), n(956), n(248), n(35));
    },
    11: function (e, t, n) {
      e.exports = (function (e, t, n, r) {
        "use strict";
        return class extends n {
          constructor(t, n) {
            super(),
              (t = r.getElement(t)) &&
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
            r.executeAfterTransition(e, t, n);
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
            return e.get(r.getElement(t), this.DATA_KEY);
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
          set(t, n, r) {
            e.has(t) || e.set(t, new Map());
            const i = e.get(t);
            i.has(n) || 0 === i.size
              ? i.set(n, r)
              : console.error(
                  `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                    Array.from(i.keys())[0]
                  }.`,
                );
          },
          get(t, n) {
            return (e.has(t) && e.get(t).get(n)) || null;
          },
          remove(t, n) {
            if (!e.has(t)) return;
            const r = e.get(t);
            r.delete(n), 0 === r.size && e.delete(t);
          },
        };
      })();
    },
    956: function (e, t, n) {
      e.exports = (function (e) {
        "use strict";
        const t = /[^.]*(?=\..*)\.|.*/,
          n = /\..*/,
          r = /::\d+$/,
          i = {};
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
          return (e.uidEvent = t), (i[t] = i[t] || {}), i[t];
        }
        function u(e, t, n = null) {
          return Object.values(e).find(
            (e) => e.callable === t && e.delegationSelector === n,
          );
        }
        function h(e, t, n) {
          const r = "string" == typeof t,
            i = r ? n : t || n;
          let s = g(e);
          return a.has(s) || (s = e), [r, i, s];
        }
        function d(e, n, r, i, s) {
          if ("string" != typeof n || !e) return;
          let [a, d, f] = h(n, r, i);
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
            b = u(g, d, a ? r : null);
          if (b) return void (b.oneOff = b.oneOff && s);
          const y = l(d, n.replace(t, "")),
            _ = a
              ? (function (e, t, n) {
                  return function r(i) {
                    const s = e.querySelectorAll(t);
                    for (
                      let { target: o } = i;
                      o && o !== this;
                      o = o.parentNode
                    )
                      for (const a of s)
                        if (a === o)
                          return (
                            v(i, { delegateTarget: o }),
                            r.oneOff && m.off(e, i.type, t, n),
                            n.apply(o, [i])
                          );
                  };
                })(e, r, d)
              : (function (e, t) {
                  return function n(r) {
                    return (
                      v(r, { delegateTarget: e }),
                      n.oneOff && m.off(e, r.type, t),
                      t.apply(e, [r])
                    );
                  };
                })(e, d);
          (_.delegationSelector = a ? r : null),
            (_.callable = d),
            (_.oneOff = s),
            (_.uidEvent = y),
            (g[y] = _),
            e.addEventListener(f, _, a);
        }
        function f(e, t, n, r, i) {
          const s = u(t[n], r, i);
          s &&
            (e.removeEventListener(n, s, Boolean(i)), delete t[n][s.uidEvent]);
        }
        function p(e, t, n, r) {
          const i = t[n] || {};
          for (const [s, o] of Object.entries(i))
            s.includes(r) && f(e, t, n, o.callable, o.delegationSelector);
        }
        function g(e) {
          return (e = e.replace(n, "")), o[e] || e;
        }
        const m = {
          on(e, t, n, r) {
            d(e, t, n, r, !1);
          },
          one(e, t, n, r) {
            d(e, t, n, r, !0);
          },
          off(e, t, n, i) {
            if ("string" != typeof t || !e) return;
            const [s, o, a] = h(t, n, i),
              l = a !== t,
              u = c(e),
              d = u[a] || {},
              g = t.startsWith(".");
            if (void 0 === o) {
              if (g) for (const n of Object.keys(u)) p(e, u, n, t.slice(1));
              for (const [n, i] of Object.entries(d)) {
                const s = n.replace(r, "");
                (l && !t.includes(s)) ||
                  f(e, u, a, i.callable, i.delegationSelector);
              }
            } else {
              if (!Object.keys(d).length) return;
              f(e, u, a, o, s ? n : null);
            }
          },
          trigger(t, n, r) {
            if ("string" != typeof n || !t) return null;
            const i = e.getjQuery();
            let s = null,
              o = !0,
              a = !0,
              l = !1;
            n !== g(n) &&
              i &&
              ((s = i.Event(n, r)),
              i(t).trigger(s),
              (o = !s.isPropagationStopped()),
              (a = !s.isImmediatePropagationStopped()),
              (l = s.isDefaultPrevented()));
            const c = v(new Event(n, { bubbles: o, cancelable: !0 }), r);
            return (
              l && c.preventDefault(),
              a && t.dispatchEvent(c),
              c.defaultPrevented && s && s.preventDefault(),
              c
            );
          },
        };
        function v(e, t = {}) {
          for (const [n, r] of Object.entries(t))
            try {
              e[n] = r;
            } catch (t) {
              Object.defineProperty(e, n, {
                configurable: !0,
                get() {
                  return r;
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
          setDataAttribute(e, n, r) {
            e.setAttribute(`data-bs-${t(n)}`, r);
          },
          removeDataAttribute(e, n) {
            e.removeAttribute(`data-bs-${t(n)}`);
          },
          getDataAttributes(t) {
            if (!t) return {};
            const n = {},
              r = Object.keys(t.dataset).filter(
                (e) => e.startsWith("bs") && !e.startsWith("bsConfig"),
              );
            for (const i of r) {
              let r = i.replace(/^bs/, "");
              (r = r.charAt(0).toLowerCase() + r.slice(1, r.length)),
                (n[r] = e(t.dataset[i]));
            }
            return n;
          },
          getDataAttribute(n, r) {
            return e(n.getAttribute(`data-bs-${t(r)}`));
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
              let r = e.parentNode.closest(t);
              for (; r; ) n.push(r), (r = r.parentNode.closest(t));
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
              const r = t(e);
              return r && n.findOne(r) ? r : null;
            },
            getElementFromSelector(e) {
              const r = t(e);
              return r ? n.findOne(r) : null;
            },
            getMultipleElementsFromSelector(e) {
              const r = t(e);
              return r ? n.find(r) : [];
            },
          };
        return n;
      })(n(35));
    },
    248: function (e, t, n) {
      !(function (e, t, n, r) {
        "use strict";
        (e.enableDismissTrigger = (e, i = "hide") => {
          const s = `click.dismiss${e.EVENT_KEY}`,
            o = e.NAME;
          t.on(document, s, `[data-bs-dismiss="${o}"]`, function (t) {
            if (
              (["A", "AREA"].includes(this.tagName) && t.preventDefault(),
              r.isDisabled(this))
            )
              return;
            const s = n.getElementFromSelector(this) || this.closest(`.${o}`);
            e.getOrCreateInstance(s)[i]();
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
          _mergeConfigObj(n, r) {
            const i = t.isElement(r) ? e.getDataAttribute(r, "config") : {};
            return {
              ...this.constructor.Default,
              ...("object" == typeof i ? i : {}),
              ...(t.isElement(r) ? e.getDataAttributes(r) : {}),
              ...("object" == typeof n ? n : {}),
            };
          }
          _typeCheckConfig(e, n = this.constructor.DefaultType) {
            for (const [r, i] of Object.entries(n)) {
              const n = e[r],
                s = t.isElement(n) ? "element" : t.toType(n);
              if (!new RegExp(i).test(s))
                throw new TypeError(
                  `${this.constructor.NAME.toUpperCase()}: Option "${r}" provided type "${s}" but expected type "${i}".`,
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
          r = (e) => {
            if (!e) return 0;
            let { transitionDuration: t, transitionDelay: n } =
              window.getComputedStyle(e);
            const r = Number.parseFloat(t),
              i = Number.parseFloat(n);
            return r || i
              ? ((t = t.split(",")[0]),
                (n = n.split(",")[0]),
                1e3 * (Number.parseFloat(t) + Number.parseFloat(n)))
              : 0;
          },
          i = (e) => {
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
                r = t.fn[n];
              (t.fn[n] = e.jQueryInterface),
                (t.fn[n].Constructor = e),
                (t.fn[n].noConflict = () => ((t.fn[n] = r), e.jQueryInterface));
            }
          });
        }),
          (e.execute = u),
          (e.executeAfterTransition = (e, n, s = !0) => {
            if (!s) return void u(e);
            const o = r(n) + 5;
            let a = !1;
            const l = ({ target: r }) => {
              r === n && ((a = !0), n.removeEventListener(t, l), u(e));
            };
            n.addEventListener(t, l),
              setTimeout(() => {
                a || i(n);
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
          (e.getNextActiveElement = (e, t, n, r) => {
            const i = e.length;
            let s = e.indexOf(t);
            return -1 === s
              ? !n && r
                ? e[i - 1]
                : e[0]
              : ((s += n ? 1 : -1),
                r && (s = (s + i) % i),
                e[Math.max(0, Math.min(s, i - 1))]);
          }),
          (e.getTransitionDurationFromElement = r),
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
          (e.triggerTransitionEnd = i),
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
              var r = te(t, n),
                i = te(t, "hx-disinherit");
              return e !== t && i && ("*" === i || i.split(" ").indexOf(n) >= 0)
                ? "unset"
                : r;
            }
            function ne(e, t) {
              var n = null;
              if (
                (c(e, function (r) {
                  return (n = L(e, r, t));
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
                r = e;
              if (
                ("head" === n && (r = r.replace(S, "")),
                Q.config.useTemplateFragments && t)
              ) {
                var i = s(
                  "<body><template>" + r + "</template></body>",
                  0,
                ).querySelector("template").content;
                return (
                  Q.config.allowScriptTags
                    ? oe(i.querySelectorAll("script"), function (e) {
                        Q.config.inlineScriptNonce &&
                          (e.nonce = Q.config.inlineScriptNonce),
                          (e.htmxExecuted =
                            -1 === navigator.userAgent.indexOf("Firefox"));
                      })
                    : oe(i.querySelectorAll("script"), function (e) {
                        _(e);
                      }),
                  i
                );
              }
              switch (n) {
                case "thead":
                case "tbody":
                case "tfoot":
                case "colgroup":
                case "caption":
                  return s("<table>" + r + "</table>", 1);
                case "col":
                  return s("<table><colgroup>" + r + "</colgroup></table>", 2);
                case "tr":
                  return s("<table><tbody>" + r + "</tbody></table>", 2);
                case "td":
                case "th":
                  return s(
                    "<table><tbody><tr>" + r + "</tr></tbody></table>",
                    3,
                  );
                case "script":
                case "style":
                  return s("<div>" + r + "</div>", 1);
                default:
                  return s(r, 0);
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
                r = t.bottom;
              return n < window.innerHeight && r >= 0;
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
            function n(e, t, r) {
              (e = p(e)),
                r
                  ? setTimeout(function () {
                      n(e, t), (e = null);
                    }, r)
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
                  var n = re().querySelectorAll(t), r = 0;
                  r < n.length;
                  r++
                ) {
                  var i = n[r];
                  if (
                    i.compareDocumentPosition(e) ===
                    Node.DOCUMENT_POSITION_PRECEDING
                  )
                    return i;
                }
              },
              Y = function (e, t) {
                for (
                  var n = re().querySelectorAll(t), r = n.length - 1;
                  r >= 0;
                  r--
                ) {
                  var i = n[r];
                  if (
                    i.compareDocumentPosition(e) ===
                    Node.DOCUMENT_POSITION_FOLLOWING
                  )
                    return i;
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
                  var r = ve(e, t, n);
                  r.target.addEventListener(r.event, r.listener);
                }),
                k(t) ? t : n
              );
            }
            function ge(e, t, n) {
              return (
                jr(function () {
                  var r = ve(e, t, n);
                  r.target.removeEventListener(r.event, r.listener);
                }),
                k(t) ? t : n
              );
            }
            var pe = re().createElement("output");
            function me(e, t) {
              var n = ne(e, t);
              if (n) {
                if ("this" === n) return [xe(e, t)];
                var r = Z(e, n);
                return 0 === r.length
                  ? (b(
                      'The selector "' +
                        n +
                        '" on ' +
                        t +
                        " returned no matches!",
                    ),
                    [pe])
                  : r;
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
              for (var n = Br(t), r = 0; r < n.length; r++) {
                var i = n[r];
                try {
                  if (i.isInlineSwap(e)) return !0;
                } catch (e) {
                  b(e);
                }
              }
              return "outerHTML" === e;
            }
            function Ee(e, t, n) {
              var r = "#" + ee(t, "id"),
                i = "outerHTML";
              "true" === e ||
                (e.indexOf(":") > 0
                  ? ((i = e.substr(0, e.indexOf(":"))),
                    (r = e.substr(e.indexOf(":") + 1, e.length)))
                  : (i = e));
              var s = re().querySelectorAll(r);
              return (
                s
                  ? (oe(s, function (e) {
                      var r,
                        s = t.cloneNode(!0);
                      (r = re().createDocumentFragment()).appendChild(s),
                        Se(i, e) || (r = s);
                      var o = { shouldSwap: !0, target: e, fragment: r };
                      ce(e, "htmx:oobBeforeSwap", o) &&
                        ((e = o.target),
                        o.shouldSwap && Be(i, e, e, r, n),
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
              var r = ne(e, "hx-select-oob");
              if (r)
                for (var i = r.split(","), s = 0; s < i.length; s++) {
                  var o = i[s].split(":", 2),
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
                var r = ee(t, "id");
                if (r && r.length > 0) {
                  var i = r.replace("'", "\\'"),
                    s = t.tagName.replace(":", "\\:"),
                    o = e.querySelector(s + "[id='" + i + "']");
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
            function a(e, t, n, r) {
              for (Te(e, n, r); n.childNodes.length > 0; ) {
                var i = n.firstChild;
                z(i, Q.config.addedClass),
                  e.insertBefore(i, t),
                  i.nodeType !== Node.TEXT_NODE &&
                    i.nodeType !== Node.COMMENT_NODE &&
                    r.tasks.push(Oe(i));
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
                  var r = e.attributes[n];
                  r.value && ((t = He(r.name, t)), (t = He(r.value, t)));
                }
              return t;
            }
            function Ae(e) {
              var t = ae(e);
              if (t.onHandlers) {
                for (var n = 0; n < t.onHandlers.length; n++) {
                  const r = t.onHandlers[n];
                  e.removeEventListener(r.event, r.listener);
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
              var r,
                i = e.previousSibling;
              for (
                a(u(e), e, t, n),
                  r = null == i ? u(e).firstChild : i.nextSibling,
                  n.elts = n.elts.filter(function (t) {
                    return t != e;
                  });
                r && r !== e;

              )
                r.nodeType === Node.ELEMENT_NODE && n.elts.push(r),
                  (r = r.nextElementSibling);
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
              var r = e.firstChild;
              if ((a(e, r, t, n), r)) {
                for (; r.nextSibling; )
                  m(r.nextSibling), e.removeChild(r.nextSibling);
                m(r), e.removeChild(r);
              }
            }
            function Fe(e, t, n) {
              var r = n || ne(e, "hx-select");
              if (r) {
                var i = re().createDocumentFragment();
                oe(t.querySelectorAll(r), function (e) {
                  i.appendChild(e);
                }),
                  (t = i);
              }
              return t;
            }
            function Be(e, t, n, r, i) {
              switch (e) {
                case "none":
                  return;
                case "outerHTML":
                  return void Ie(n, r, i);
                case "afterbegin":
                  return void ke(n, r, i);
                case "beforebegin":
                  return void Pe(n, r, i);
                case "beforeend":
                  return void Me(n, r, i);
                case "afterend":
                  return void Xe(n, r, i);
                case "delete":
                  return void De(n, r, i);
                default:
                  for (var s = Br(t), o = 0; o < s.length; o++) {
                    var a = s[o];
                    try {
                      var l = a.handleSwap(e, n, r, i);
                      if (l) {
                        if (void 0 !== l.length)
                          for (var c = 0; c < l.length; c++) {
                            var u = l[c];
                            u.nodeType !== Node.TEXT_NODE &&
                              u.nodeType !== Node.COMMENT_NODE &&
                              i.tasks.push(Oe(u));
                          }
                        return;
                      }
                    } catch (e) {
                      b(e);
                    }
                  }
                  "innerHTML" === e
                    ? Ue(n, r, i)
                    : Be(Q.config.defaultSwapStyle, t, n, r, i);
              }
            }
            function Ve(e) {
              if (e.indexOf("<title") > -1) {
                var t = e.replace(H, "").match(q);
                if (t) return t[2];
              }
            }
            function je(e, t, n, r, i, s) {
              i.title = Ve(r);
              var o = l(r);
              if (o)
                return Ce(n, o, i), Re((o = Fe(n, o, s))), Be(e, n, t, o, i);
            }
            function _e(e, t, n) {
              var r = e.getResponseHeader(t);
              if (0 === r.indexOf("{")) {
                var i = E(r);
                for (var s in i)
                  if (i.hasOwnProperty(s)) {
                    var o = i[s];
                    P(o) || (o = { value: o }), ce(n, s, o);
                  }
              } else
                for (var a = r.split(","), l = 0; l < a.length; l++)
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
                  for (var r = n; We.exec(e.charAt(n + 1)); ) n++;
                  t.push(e.substr(r, n - r + 1));
                } else if (-1 !== Ge.indexOf(e.charAt(n))) {
                  var i = e.charAt(n);
                  for (r = n, n++; n < e.length && e.charAt(n) !== i; )
                    "\\" === e.charAt(n) && n++, n++;
                  t.push(e.substr(r, n - r + 1));
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
                  var r = 1,
                    i = " return (function(" + n + "){ return (",
                    s = null;
                  t.length > 0;

                ) {
                  var o = t[0];
                  if ("]" === o) {
                    if (0 == --r) {
                      null === s && (i += "true"), t.shift(), (i += ")})");
                      try {
                        var a = Tr(
                          e,
                          function () {
                            return Function(i)();
                          },
                          function () {
                            return !0;
                          },
                        );
                        return (a.source = i), a;
                      } catch (e) {
                        return (
                          fe(re().body, "htmx:syntax:error", {
                            error: e,
                            source: i,
                          }),
                          null
                        );
                      }
                    }
                  } else "[" === o && r++;
                  Qe(o, s, n)
                    ? (i +=
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
                    : (i += o),
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
              var r = [],
                i = Ye(t);
              do {
                y(i, Je);
                var s = i.length,
                  o = y(i, /[,\[\s]/);
                if ("" !== o)
                  if ("every" === o) {
                    var a = { trigger: "every" };
                    y(i, Je),
                      (a.pollInterval = d(y(i, /[,\[\s]/))),
                      y(i, Je),
                      (l = et(e, i, "event")) && (a.eventFilter = l),
                      r.push(a);
                  } else if (0 === o.indexOf("sse:"))
                    r.push({ trigger: "sse", sseEvent: o.substr(4) });
                  else {
                    var l,
                      c = { trigger: o };
                    for (
                      (l = et(e, i, "event")) && (c.eventFilter = l);
                      i.length > 0 && "," !== i[0];

                    ) {
                      y(i, Je);
                      var u = i.shift();
                      if ("changed" === u) c.changed = !0;
                      else if ("once" === u) c.once = !0;
                      else if ("consume" === u) c.consume = !0;
                      else if ("delay" === u && ":" === i[0])
                        i.shift(), (c.delay = d(y(i, x)));
                      else if ("from" === u && ":" === i[0]) {
                        if ((i.shift(), Ze.test(i[0]))) var h = tt(i);
                        else if (
                          "closest" === (h = y(i, x)) ||
                          "find" === h ||
                          "next" === h ||
                          "previous" === h
                        ) {
                          i.shift();
                          var f = tt(i);
                          f.length > 0 && (h += " " + f);
                        }
                        c.from = h;
                      } else
                        "target" === u && ":" === i[0]
                          ? (i.shift(), (c.target = tt(i)))
                          : "throttle" === u && ":" === i[0]
                          ? (i.shift(), (c.throttle = d(y(i, x))))
                          : "queue" === u && ":" === i[0]
                          ? (i.shift(), (c.queue = y(i, x)))
                          : "root" === u && ":" === i[0]
                          ? (i.shift(), (c[u] = tt(i)))
                          : "threshold" === u && ":" === i[0]
                          ? (i.shift(), (c[u] = y(i, x)))
                          : fe(e, "htmx:syntax:error", { token: i.shift() });
                    }
                    r.push(c);
                  }
                i.length === s &&
                  fe(e, "htmx:syntax:error", { token: i.shift() }),
                  y(i, Je);
              } while ("," === i[0] && i.shift());
              return n && (n[t] = r), r;
            }
            function it(e) {
              var t = te(e, "hx-trigger"),
                n = [];
              if (t) {
                var r = Q.config.triggerSpecsCache;
                n = (r && r[t]) || nt(e, t, r);
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
              var r = ae(e);
              r.timeout = setTimeout(function () {
                se(e) &&
                  !0 !== r.cancelled &&
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
                var r, i;
                if (((t.boosted = !0), "A" === e.tagName))
                  (r = "get"), (i = ee(e, "href"));
                else {
                  var s = ee(e, "method");
                  (r = s ? s.toLowerCase() : "get"), (i = ee(e, "action"));
                }
                n.forEach(function (n) {
                  ht(
                    e,
                    function (e, t) {
                      v(e, Q.config.disableSelector) ? m(e) : he(r, i, e, t);
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
              var r = e.eventFilter;
              if (r)
                try {
                  return !0 !== r.call(t, n);
                } catch (e) {
                  return (
                    fe(re().body, "htmx:eventFilter:error", {
                      error: e,
                      source: r.source,
                    }),
                    !0
                  );
                }
              return !1;
            }
            function ht(e, t, n, r, i) {
              var s,
                o = ae(e);
              (s = r.from ? Z(e, r.from) : [e]),
                r.changed &&
                  s.forEach(function (e) {
                    ae(e).lastValue = e.value;
                  }),
                oe(s, function (s) {
                  var a = function (n) {
                    if (se(e)) {
                      if (
                        !ft(e, n) &&
                        ((i || ut(n, e)) && n.preventDefault(), !ct(r, e, n))
                      ) {
                        var l = ae(n);
                        if (
                          ((l.triggerSpec = r),
                          null == l.handledFor && (l.handledFor = []),
                          l.handledFor.indexOf(e) < 0)
                        ) {
                          if (
                            (l.handledFor.push(e),
                            r.consume && n.stopPropagation(),
                            r.target && n.target && !h(n.target, r.target))
                          )
                            return;
                          if (r.once) {
                            if (o.triggeredOnce) return;
                            o.triggeredOnce = !0;
                          }
                          if (r.changed) {
                            var c = ae(s);
                            if (c.lastValue === s.value) return;
                            c.lastValue = s.value;
                          }
                          if (
                            (o.delayed && clearTimeout(o.delayed), o.throttle)
                          )
                            return;
                          r.throttle > 0
                            ? o.throttle ||
                              (t(e, n),
                              (o.throttle = setTimeout(function () {
                                o.throttle = null;
                              }, r.throttle)))
                            : r.delay > 0
                            ? (o.delayed = setTimeout(function () {
                                t(e, n);
                              }, r.delay))
                            : (ce(e, "htmx:trigger"), t(e, n));
                        }
                      }
                    } else s.removeEventListener(r.trigger, a);
                  };
                  null == n.listenerInfos && (n.listenerInfos = []),
                    n.listenerInfos.push({
                      trigger: r.trigger,
                      listener: a,
                      on: s,
                    }),
                    s.addEventListener(r.trigger, a);
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
              for (var r = D(n), i = 0; i < r.length; i++) {
                var s = r[i].split(/:(.+)/);
                "connect" === s[0] && xt(e, s[1], 0), "send" === s[0] && bt(e);
              }
            }
            function xt(e, t, n) {
              if (se(e)) {
                if (0 == t.indexOf("/")) {
                  var r =
                    location.hostname +
                    (location.port ? ":" + location.port : "");
                  "https:" == location.protocol
                    ? (t = "wss://" + r + t)
                    : "http:" == location.protocol && (t = "ws://" + r + t);
                }
                var i = Q.createWebSocket(t);
                (i.onerror = function (t) {
                  fe(e, "htmx:wsError", { error: t, socket: i }), yt(e);
                }),
                  (i.onclose = function (r) {
                    if ([1006, 1012, 1013].indexOf(r.code) >= 0) {
                      var i = wt(n);
                      setTimeout(function () {
                        xt(e, t, n + 1);
                      }, i);
                    }
                  }),
                  (i.onopen = function (e) {
                    n = 0;
                  }),
                  (ae(e).webSocket = i),
                  i.addEventListener("message", function (t) {
                    if (!yt(e)) {
                      var n = t.data;
                      R(e, function (t) {
                        n = t.transformResponse(n, null, e);
                      });
                      for (
                        var r = T(e), i = M(l(n).children), s = 0;
                        s < i.length;
                        s++
                      ) {
                        var o = i[s];
                        Ee(te(o, "hx-swap-oob") || "true", o, r);
                      }
                      nr(r.tasks);
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
                    var r = ae(t).webSocket,
                      i = xr(e, t),
                      s = dr(e, "post"),
                      o = s.errors,
                      a = yr(le(s.values, Hr(e)), e);
                    (a.HEADERS = i),
                      o && o.length > 0
                        ? ce(e, "htmx:validation:halted", o)
                        : (r.send(JSON.stringify(a)),
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
              for (var r = D(n), i = 0; i < r.length; i++) {
                var s = r[i].split(/:(.+)/);
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
                var r = ae(n).sseEventSource,
                  i = function (s) {
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
                      } else r.removeEventListener(t, i);
                  };
                (ae(e).sseListener = i), r.addEventListener(t, i);
              } else fe(e, "htmx:noSSESourceError");
            }
            function Rt(e, t, n) {
              var r = c(e, Ot);
              if (r) {
                var i = ae(r).sseEventSource,
                  s = function () {
                    Tt(r) || (se(e) ? t(e) : i.removeEventListener(n, s));
                  };
                (ae(e).sseListener = s), i.addEventListener(n, s);
              } else fe(e, "htmx:noSSESourceError");
            }
            function Tt(e) {
              if (!se(e)) return ae(e).sseEventSource.close(), !0;
            }
            function Ot(e) {
              return null != ae(e).sseEventSource;
            }
            function qt(e, t, n, r) {
              var i = function () {
                n.loaded || ((n.loaded = !0), t(e));
              };
              r > 0 ? setTimeout(i, r) : i();
            }
            function Ht(e, t, n) {
              var r = !1;
              return (
                oe(w, function (i) {
                  if (o(e, "hx-" + i)) {
                    var s = te(e, "hx-" + i);
                    (r = !0),
                      (t.path = s),
                      (t.verb = i),
                      n.forEach(function (n) {
                        Lt(e, n, t, function (e, t) {
                          v(e, Q.config.disableSelector)
                            ? m(e)
                            : he(i, s, e, t);
                        });
                      });
                  }
                }),
                r
              );
            }
            function Lt(e, t, n, r) {
              if (t.sseEvent) Rt(e, r, t.sseEvent);
              else if ("revealed" === t.trigger) gt(), ht(e, r, n, t), pt(e);
              else if ("intersect" === t.trigger) {
                var i = {};
                t.root && (i.root = ue(e, t.root)),
                  t.threshold && (i.threshold = parseFloat(t.threshold));
                var s = new IntersectionObserver(function (t) {
                  for (var n = 0; n < t.length; n++)
                    if (t[n].isIntersecting) {
                      ce(e, "intersect");
                      break;
                    }
                }, i);
                s.observe(e), ht(e, r, n, t);
              } else
                "load" === t.trigger
                  ? ct(t, e, Wt("load", { elt: e })) || qt(e, r, n, t.delay)
                  : t.pollInterval > 0
                  ? ((n.polling = !0), ot(e, r, t))
                  : ht(e, r, n, t);
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
                var r = t[n].name;
                if (
                  g(r, "hx-on:") ||
                  g(r, "data-hx-on:") ||
                  g(r, "hx-on-") ||
                  g(r, "data-hx-on-")
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
                  var r = document.evaluate(
                    './/*[@*[ starts-with(name(), "hx-on:") or starts-with(name(), "data-hx-on:") or starts-with(name(), "hx-on-") or starts-with(name(), "data-hx-on-") ]]',
                    e,
                  );
                  (t = r.iterateNext());

                )
                  n.push(t);
              else
                for (
                  var i = e.getElementsByTagName("*"), s = 0;
                  s < i.length;
                  s++
                )
                  It(i[s]) && n.push(i[s]);
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
              for (var t = Ye(e), n = 0, r = 0; r < t.length; r++) {
                const e = t[r];
                "{" === e ? n++ : "}" === e && n--;
              }
              return n;
            }
            function Bt(e, t, n) {
              var r,
                i = ae(e);
              Array.isArray(i.onHandlers) || (i.onHandlers = []);
              var s = function (t) {
                return Tr(e, function () {
                  r || (r = new Function("event", n)), r.call(e, t);
                });
              };
              e.addEventListener(t, s),
                i.onHandlers.push({ event: t, listener: s });
            }
            function Vt(e) {
              var t = te(e, "hx-on");
              if (t) {
                for (
                  var n = {}, r = t.split("\n"), i = null, s = 0;
                  r.length > 0;

                ) {
                  var o = r.shift(),
                    a = o.match(/^\s*([a-zA-Z:\-\.]+:)(.*)/);
                  0 === s && a
                    ? (o.split(":"), (n[(i = a[1].slice(0, -1))] = a[2]))
                    : (n[i] += o),
                    (s += Ft(o));
                }
                for (var l in n) Bt(e, l, n[l]);
              }
            }
            function jt(e) {
              Ae(e);
              for (var t = 0; t < e.attributes.length; t++) {
                var n = e.attributes[t].name,
                  r = e.attributes[t].value;
                if (g(n, "hx-on") || g(n, "data-hx-on")) {
                  var i = n.indexOf("-on") + 3,
                    s = n.slice(i, i + 1);
                  if ("-" === s || ":" === s) {
                    var o = n.slice(i + 1);
                    g(o, ":")
                      ? (o = "htmx" + o)
                      : g(o, "-")
                      ? (o = "htmx:" + o.slice(1))
                      : g(o, "htmx-") && (o = "htmx:" + o.slice(5)),
                      Bt(e, o, r);
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
                  var r = te(e, "hx-sse");
                  r && St(e, t, r);
                  var i = te(e, "hx-ws");
                  i && mt(e, t, i), ce(e, "htmx:afterProcessNode");
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
              var r = Wt(t, n);
              Q.logger && !Gt(t) && Q.logger(e, t, n),
                n.error && (b(n.error), ce(e, "htmx:error", { errorInfo: n }));
              var i = e.dispatchEvent(r),
                s = $t(t);
              if (i && s !== t) {
                var o = Wt(s, r.detail);
                i = i && e.dispatchEvent(o);
              }
              return (
                R(e, function (e) {
                  i = i && !1 !== e.onEvent(t, r) && !r.defaultPrevented;
                }),
                i
              );
            }
            var Jt = location.pathname + location.search;
            function Zt() {
              return (
                re().querySelector("[hx-history-elt],[data-hx-history-elt]") ||
                re().body
              );
            }
            function Kt(e, t, n, r) {
              if (U())
                if (Q.config.historyCacheSize <= 0)
                  localStorage.removeItem("htmx-history-cache");
                else {
                  e = F(e);
                  for (
                    var i = E(localStorage.getItem("htmx-history-cache")) || [],
                      s = 0;
                    s < i.length;
                    s++
                  )
                    if (i[s].url === e) {
                      i.splice(s, 1);
                      break;
                    }
                  var o = { url: e, content: t, title: n, scroll: r };
                  for (
                    ce(re().body, "htmx:historyItemCreated", {
                      item: o,
                      cache: i,
                    }),
                      i.push(o);
                    i.length > Q.config.historyCacheSize;

                  )
                    i.shift();
                  for (; i.length > 0; )
                    try {
                      localStorage.setItem(
                        "htmx-history-cache",
                        JSON.stringify(i),
                      );
                      break;
                    } catch (e) {
                      fe(re().body, "htmx:historyCacheError", {
                        cause: e,
                        cache: i,
                      }),
                        i.shift();
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
                r = e.cloneNode(!0);
              return (
                oe(f(r, "." + t), function (e) {
                  n(e, t);
                }),
                r.innerHTML
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
                    var r = Zt(),
                      i = T(r),
                      s = Ve(this.response);
                    if (s) {
                      var o = C("title");
                      o ? (o.innerHTML = s) : (window.document.title = s);
                    }
                    Ue(r, t, i),
                      nr(i.tasks),
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
                  r = Zt(),
                  i = T(r);
                Ue(r, n, i),
                  nr(i.tasks),
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
                var r = n[e];
                void 0 === r
                  ? (n[e] = t)
                  : Array.isArray(r)
                  ? Array.isArray(t)
                    ? (n[e] = r.concat(t))
                    : r.push(t)
                  : Array.isArray(t)
                  ? (n[e] = [r].concat(t))
                  : (n[e] = [r, t]);
              }
            }
            function hr(e, t, n, r, i) {
              if (null != r && !ur(e, r)) {
                if ((e.push(r), fr(r))) {
                  var s = ee(r, "name"),
                    o = r.value;
                  r.multiple &&
                    "SELECT" === r.tagName &&
                    (o = M(r.querySelectorAll("option:checked")).map(
                      function (e) {
                        return e.value;
                      },
                    )),
                    r.files && (o = M(r.files)),
                    cr(s, o, t),
                    i && vr(r, n);
                }
                h(r, "form") &&
                  oe(r.elements, function (r) {
                    hr(e, t, n, r, i);
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
                r = {},
                i = {},
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
                "get" !== t && hr(n, i, s, v(e, "form"), a),
                hr(n, r, s, e, a),
                o.lastButtonClicked ||
                  "BUTTON" === e.tagName ||
                  ("INPUT" === e.tagName && "submit" === ee(e, "type")))
              ) {
                var l = o.lastButtonClicked || e;
                cr(ee(l, "name"), l.value, i);
              }
              return (
                oe(me(e, "hx-include"), function (e) {
                  hr(n, r, s, e, a),
                    h(e, "form") ||
                      oe(e.querySelectorAll(rt), function (e) {
                        hr(n, r, s, e, a);
                      });
                }),
                (r = le(r, i)),
                { errors: s, values: r }
              );
            }
            function gr(e, t, n) {
              "" !== e && (e += "&"),
                "[object Object]" === String(n) && (n = JSON.stringify(n));
              var r = encodeURIComponent(n);
              return e + (encodeURIComponent(t) + "=") + r;
            }
            function pr(e) {
              var t = "";
              for (var n in e)
                if (e.hasOwnProperty(n)) {
                  var r = e[n];
                  Array.isArray(r)
                    ? oe(r, function (e) {
                        t = gr(t, n, e);
                      })
                    : (t = gr(t, n, r));
                }
              return t;
            }
            function mr(e) {
              var t = new FormData();
              for (var n in e)
                if (e.hasOwnProperty(n)) {
                  var r = e[n];
                  Array.isArray(r)
                    ? oe(r, function (e) {
                        t.append(n, e);
                      })
                    : t.append(n, r);
                }
              return t;
            }
            function xr(e, t, n) {
              var r = {
                "HX-Request": "true",
                "HX-Trigger": ee(e, "id"),
                "HX-Trigger-Name": ee(e, "name"),
                "HX-Target": te(t, "id"),
                "HX-Current-URL": re().location.href,
              };
              return (
                Rr(e, "hx-headers", !1, r),
                void 0 !== n && (r["HX-Prompt"] = n),
                ae(e).boosted && (r["HX-Boosted"] = "true"),
                r
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
                var r = {};
                return (
                  oe(n.split(","), function (t) {
                    (t = t.trim()), (r[t] = e[t]);
                  }),
                  r
                );
              }
              return e;
            }
            function br(e) {
              return ee(e, "href") && ee(e, "href").indexOf("#") >= 0;
            }
            function wr(e, t) {
              var n = t || ne(e, "hx-swap"),
                r = {
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
                  (r.show = "top"),
                n)
              ) {
                var i = D(n);
                if (i.length > 0)
                  for (var s = 0; s < i.length; s++) {
                    var o = i[s];
                    if (0 === o.indexOf("swap:")) r.swapDelay = d(o.substr(5));
                    else if (0 === o.indexOf("settle:"))
                      r.settleDelay = d(o.substr(7));
                    else if (0 === o.indexOf("transition:"))
                      r.transition = "true" === o.substr(11);
                    else if (0 === o.indexOf("ignoreTitle:"))
                      r.ignoreTitle = "true" === o.substr(12);
                    else if (0 === o.indexOf("scroll:")) {
                      var a = (c = o.substr(7).split(":")).pop(),
                        l = c.length > 0 ? c.join(":") : null;
                      (r.scroll = a), (r.scrollTarget = l);
                    } else if (0 === o.indexOf("show:")) {
                      var c,
                        u = (c = o.substr(5).split(":")).pop();
                      (l = c.length > 0 ? c.join(":") : null),
                        (r.show = u),
                        (r.showTarget = l);
                    } else if (0 === o.indexOf("focus-scroll:")) {
                      var h = o.substr(13);
                      r.focusScroll = "true" == h;
                    } else
                      0 == s
                        ? (r.swapStyle = o)
                        : b("Unknown modifier in hx-swap: " + o);
                  }
              }
              return r;
            }
            function Sr(e) {
              return (
                "multipart/form-data" === ne(e, "hx-encoding") ||
                (h(e, "form") && "multipart/form-data" === ee(e, "enctype"))
              );
            }
            function Er(e, t, n) {
              var r = null;
              return (
                R(t, function (i) {
                  null == r && (r = i.encodeParameters(e, n, t));
                }),
                null != r ? r : Sr(t) ? mr(n) : pr(n)
              );
            }
            function T(e) {
              return { tasks: [], elts: [e] };
            }
            function Cr(e, t) {
              var n = e[0],
                r = e[e.length - 1];
              if (t.scroll) {
                var i = null;
                t.scrollTarget && (i = ue(n, t.scrollTarget)),
                  "top" === t.scroll &&
                    (n || i) &&
                    ((i = i || n).scrollTop = 0),
                  "bottom" === t.scroll &&
                    (r || i) &&
                    ((i = i || r).scrollTop = i.scrollHeight);
              }
              if (t.show) {
                if (((i = null), t.showTarget)) {
                  var s = t.showTarget;
                  "window" === t.showTarget && (s = "body"), (i = ue(n, s));
                }
                "top" === t.show &&
                  (n || i) &&
                  (i = i || n).scrollIntoView({
                    block: "start",
                    behavior: Q.config.scrollBehavior,
                  }),
                  "bottom" === t.show &&
                    (r || i) &&
                    (i = i || r).scrollIntoView({
                      block: "end",
                      behavior: Q.config.scrollBehavior,
                    });
              }
            }
            function Rr(e, t, n, r) {
              if ((null == r && (r = {}), null == e)) return r;
              var i = te(e, t);
              if (i) {
                var s,
                  o = i.trim(),
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
                  s.hasOwnProperty(l) && null == r[l] && (r[l] = s[l]);
              }
              return Rr(u(e), t, n, r);
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
                } catch (r) {
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
              var r, i;
              return (
                "function" == typeof URL
                  ? ((i = new URL(t, document.location.href)),
                    (r = document.location.origin === i.origin))
                  : ((i = t), (r = g(t, document.location.origin))),
                !(Q.config.selfRequestsOnly && !r) &&
                  ce(e, "htmx:validateUrl", le({ url: i, sameHost: r }, n))
              );
            }
            function he(e, t, n, r, i, s) {
              var o = null,
                a = null;
              if (
                (i = null != i ? i : {}).returnPromise &&
                "undefined" != typeof Promise
              )
                var l = new Promise(function (e, t) {
                  (o = e), (a = t);
                });
              null == n && (n = re().body);
              var c = i.handler || Mr,
                u = i.select || null;
              if (!se(n)) return ie(o), l;
              var h = i.targetOverride || ye(n);
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
                  triggeringEvent: r,
                  etc: i,
                  issueRequest: function (s) {
                    return he(e, t, n, r, i, !!s);
                  },
                  question: m,
                };
                if (!1 === ce(n, "htmx:confirm", v)) return ie(o), l;
              }
              var b = n,
                y = ne(n, "hx-sync"),
                _ = null,
                w = !1;
              if (y) {
                var E = y.split(":"),
                  A = E[0].trim();
                if (
                  ((b = "this" === A ? xe(n, "hx-sync") : ue(n, A)),
                  (y = (E[1] || "drop").trim()),
                  (d = ae(b)),
                  "drop" === y && d.xhr && !0 !== d.abortable)
                )
                  return ie(o), l;
                if ("abort" === y) {
                  if (d.xhr) return ie(o), l;
                  w = !0;
                } else
                  "replace" === y
                    ? ce(b, "htmx:abort")
                    : 0 === y.indexOf("queue") &&
                      (_ = (y.split(" ")[1] || "last").trim());
              }
              if (d.xhr) {
                if (!d.abortable) {
                  if (null == _) {
                    if (r) {
                      var O = ae(r);
                      O &&
                        O.triggerSpec &&
                        O.triggerSpec.queue &&
                        (_ = O.triggerSpec.queue);
                    }
                    null == _ && (_ = "last");
                  }
                  return (
                    null == d.queuedRequests && (d.queuedRequests = []),
                    ("first" === _ && 0 === d.queuedRequests.length) ||
                    "all" === _
                      ? d.queuedRequests.push(function () {
                          he(e, t, n, r, i);
                        })
                      : "last" === _ &&
                        ((d.queuedRequests = []),
                        d.queuedRequests.push(function () {
                          he(e, t, n, r, i);
                        })),
                    ie(o),
                    l
                  );
                }
                ce(b, "htmx:abort");
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
                i.headers && (k = le(k, i.headers));
              var N = dr(n, e),
                M = N.errors,
                L = N.values;
              i.values && (L = le(L, i.values));
              var D = le(L, Hr(n)),
                $ = yr(D, n);
              Q.config.getCacheBusterParam &&
                "get" === e &&
                ($["org.htmx.cache-buster"] = ee(h, "id") || "true"),
                (null != t && "" !== t) || (t = re().location.href);
              var I = Rr(n, "hx-request"),
                F = ae(n).boosted,
                j = Q.config.methodsThatUseUrlParams.indexOf(e) >= 0,
                P = {
                  boosted: F,
                  useUrlParams: j,
                  parameters: $,
                  unfilteredParameters: D,
                  headers: k,
                  target: h,
                  verb: e,
                  errors: M,
                  withCredentials:
                    i.credentials || I.credentials || Q.config.withCredentials,
                  timeout: i.timeout || I.timeout || Q.config.timeout,
                  path: t,
                  triggeringEvent: r,
                };
              if (!ce(n, "htmx:configRequest", P)) return ie(o), C(), l;
              if (
                ((t = P.path),
                (e = P.verb),
                (k = P.headers),
                ($ = P.parameters),
                (j = P.useUrlParams),
                (M = P.errors) && M.length > 0)
              )
                return ce(n, "htmx:validation:halted", P), ie(o), C(), l;
              var B = t.split("#"),
                R = B[0],
                q = B[1],
                H = t;
              if (
                (j &&
                  ((H = R),
                  0 !== Object.keys($).length &&
                    (H.indexOf("?") < 0 ? (H += "?") : (H += "&"),
                    (H += pr($)),
                    q && (H += "#" + q))),
                !kr(n, H, P))
              )
                return fe(n, "htmx:invalidPath", P), ie(a), l;
              if (
                (x.open(e.toUpperCase(), H, !0),
                x.overrideMimeType("text/html"),
                (x.withCredentials = P.withCredentials),
                (x.timeout = P.timeout),
                I.noHeaders)
              );
              else
                for (var V in k)
                  if (k.hasOwnProperty(V)) {
                    var K = k[V];
                    Lr(x, V, K);
                  }
              var U = {
                xhr: x,
                target: h,
                requestConfig: P,
                etc: i,
                boosted: F,
                select: u,
                pathInfo: { requestPath: t, finalRequestPath: H, anchor: q },
              };
              if (
                ((x.onload = function () {
                  try {
                    var e = Ir(n);
                    if (
                      ((U.pathInfo.responsePath = Ar(x)),
                      c(n, U),
                      lr(W, z),
                      ce(n, "htmx:afterRequest", U),
                      ce(n, "htmx:afterOnLoad", U),
                      !se(n))
                    ) {
                      for (var t = null; e.length > 0 && null == t; ) {
                        var r = e.shift();
                        se(r) && (t = r);
                      }
                      t &&
                        (ce(t, "htmx:afterRequest", U),
                        ce(t, "htmx:afterOnLoad", U));
                    }
                    ie(o), C();
                  } catch (e) {
                    throw (fe(n, "htmx:onLoadError", le({ error: e }, U)), e);
                  }
                }),
                (x.onerror = function () {
                  lr(W, z),
                    fe(n, "htmx:afterRequest", U),
                    fe(n, "htmx:sendError", U),
                    ie(a),
                    C();
                }),
                (x.onabort = function () {
                  lr(W, z),
                    fe(n, "htmx:afterRequest", U),
                    fe(n, "htmx:sendAbort", U),
                    ie(a),
                    C();
                }),
                (x.ontimeout = function () {
                  lr(W, z),
                    fe(n, "htmx:afterRequest", U),
                    fe(n, "htmx:timeout", U),
                    ie(a),
                    C();
                }),
                !ce(n, "htmx:beforeRequest", U))
              )
                return ie(o), C(), l;
              var W = or(n),
                z = sr(n);
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
                ce(n, "htmx:beforeSend", U);
              var X = j ? null : Er(x, n, $);
              return x.send(X), l;
            }
            function Pr(e, t) {
              var n = t.xhr,
                r = null,
                i = null;
              if (
                (O(n, /HX-Push:/i)
                  ? ((r = n.getResponseHeader("HX-Push")), (i = "push"))
                  : O(n, /HX-Push-Url:/i)
                  ? ((r = n.getResponseHeader("HX-Push-Url")), (i = "push"))
                  : O(n, /HX-Replace-Url:/i) &&
                    ((r = n.getResponseHeader("HX-Replace-Url")),
                    (i = "replace")),
                r)
              )
                return "false" === r ? {} : { type: i, path: r };
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
                r = t.target,
                i = t.etc,
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
                  if (ce(r, "htmx:beforeSwap", f)) {
                    if (
                      ((r = f.target),
                      (u = f.serverResponse),
                      (h = f.isError),
                      (d = f.ignoreTitle),
                      (t.target = r),
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
                        g = i.swapOverride;
                      O(n, /HX-Reswap:/i) &&
                        (g = n.getResponseHeader("HX-Reswap")),
                        (p = wr(e, g)).hasOwnProperty("ignoreTitle") &&
                          (d = p.ignoreTitle),
                        r.classList.add(Q.config.swappingClass);
                      var m = null,
                        v = null,
                        b = function () {
                          try {
                            var i,
                              o = document.activeElement,
                              a = {};
                            try {
                              a = {
                                elt: o,
                                start: o ? o.selectionStart : null,
                                end: o ? o.selectionEnd : null,
                              };
                            } catch (o) {}
                            s && (i = s),
                              O(n, /HX-Reselect:/i) &&
                                (i = n.getResponseHeader("HX-Reselect")),
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
                            var c = T(r);
                            if (
                              (je(p.swapStyle, r, e, u, c, i),
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
                              (r.classList.remove(Q.config.swappingClass),
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
                            var b = function () {
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
                                var r = re().getElementById(t.pathInfo.anchor);
                                r &&
                                  r.scrollIntoView({
                                    block: "start",
                                    behavior: "auto",
                                  });
                              }
                              if (c.title && !d) {
                                var i = C("title");
                                i
                                  ? (i.innerHTML = c.title)
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
                              ? setTimeout(b, p.settleDelay)
                              : b();
                          } catch (o) {
                            throw (fe(e, "htmx:swapError", t), ie(v), o);
                          }
                        },
                        y = Q.config.globalViewTransitions;
                      if (
                        (p.hasOwnProperty("transition") && (y = p.transition),
                        y &&
                          ce(e, "htmx:beforeTransition", t) &&
                          "undefined" != typeof Promise &&
                          document.startViewTransition)
                      ) {
                        var _ = new Promise(function (e, t) {
                            (m = e), (v = t);
                          }),
                          w = b;
                        b = function () {
                          document.startViewTransition(function () {
                            return w(), _;
                          });
                        };
                      }
                      p.swapDelay > 0 ? setTimeout(b, p.swapDelay) : b();
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
                handleSwap: function (e, t, n, r) {
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
              var r = te(e, "hx-ext");
              return (
                r &&
                  oe(r.split(","), function (e) {
                    if ("ignore:" != (e = e.replace(/ /g, "")).slice(0, 7)) {
                      if (n.indexOf(e) < 0) {
                        var r = Xr[e];
                        r && t.indexOf(r) < 0 && t.push(r);
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
//# sourceMappingURL=740.4c7e34b1.js.map
