/*!
 * @renoirb/polyfill-for-of-example v1.0.0-dev.1
 *
 * Maintainer: Renoir Boulanger <contribs@renoirboulanger.com>
 *
 * UNLICENSED
 *
 * © 2003-2020 Renoir Boulanger
 */
var ForOfExample = (function (exports) {
  'use strict'

  var commonjsGlobal =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : typeof self !== 'undefined'
      ? self
      : {}

  function createCommonjsModule(fn, basedir, module) {
    return (
      (module = {
        path: basedir,
        exports: {},
        require: function (path, base) {
          return commonjsRequire(
            path,
            base === undefined || base === null ? module.path : base,
          )
        },
      }),
      fn(module, module.exports),
      module.exports
    )
  }

  function commonjsRequire() {
    throw new Error(
      'Dynamic requires are not currently supported by @rollup/plugin-commonjs',
    )
  }

  var check = function (it) {
    return it && it.Math == Math && it
  }

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == 'object' && globalThis) ||
    check(typeof window == 'object' && window) ||
    check(typeof self == 'object' && self) ||
    check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')()

  var fails = function (exec) {
    try {
      return !!exec()
    } catch (error) {
      return true
    }
  }

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return (
      Object.defineProperty({}, 1, {
        get: function () {
          return 7
        },
      })[1] != 7
    )
  })

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG =
    getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1)

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f = NASHORN_BUG
    ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V)
        return !!descriptor && descriptor.enumerable
      }
    : nativePropertyIsEnumerable

  var objectPropertyIsEnumerable = {
    f: f,
  }

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value,
    }
  }

  var toString = {}.toString

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1)
  }

  var split = ''.split

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0)
  })
    ? function (it) {
        return classofRaw(it) == 'String' ? split.call(it, '') : Object(it)
      }
    : Object

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it)
    return it
  }

  // toObject with fallback for non-array-like ES3 strings

  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it))
  }

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function'
  }

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input
    var fn, val
    if (
      PREFERRED_STRING &&
      typeof (fn = input.toString) == 'function' &&
      !isObject((val = fn.call(input)))
    )
      return val
    if (
      typeof (fn = input.valueOf) == 'function' &&
      !isObject((val = fn.call(input)))
    )
      return val
    if (
      !PREFERRED_STRING &&
      typeof (fn = input.toString) == 'function' &&
      !isObject((val = fn.call(input)))
    )
      return val
    throw TypeError("Can't convert object to primitive value")
  }

  var hasOwnProperty = {}.hasOwnProperty

  var has = function (it, key) {
    return hasOwnProperty.call(it, key)
  }

  var document = global_1.document
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document) && isObject(document.createElement)

  var documentCreateElement = function (it) {
    return EXISTS ? document.createElement(it) : {}
  }

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine =
    !descriptors &&
    !fails(function () {
      return (
        Object.defineProperty(documentCreateElement('div'), 'a', {
          get: function () {
            return 7
          },
        }).a != 7
      )
    })

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$1 = descriptors
    ? nativeGetOwnPropertyDescriptor
    : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O)
        P = toPrimitive(P, true)
        if (ie8DomDefine)
          try {
            return nativeGetOwnPropertyDescriptor(O, P)
          } catch (error) {
            /* empty */
          }
        if (has(O, P))
          return createPropertyDescriptor(
            !objectPropertyIsEnumerable.f.call(O, P),
            O[P],
          )
      }

  var objectGetOwnPropertyDescriptor = {
    f: f$1,
  }

  var replacement = /#|\.prototype\./

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)]
    return value == POLYFILL
      ? true
      : value == NATIVE
      ? false
      : typeof detection == 'function'
      ? fails(detection)
      : !!detection
  }

  var normalize = (isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase()
  })

  var data = (isForced.data = {})
  var NATIVE = (isForced.NATIVE = 'N')
  var POLYFILL = (isForced.POLYFILL = 'P')

  var isForced_1 = isForced

  var path = {}

  var aFunction = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function')
    }
    return it
  }

  // optional / simple context binding
  var functionBindContext = function (fn, that, length) {
    aFunction(fn)
    if (that === undefined) return fn
    switch (length) {
      case 0:
        return function () {
          return fn.call(that)
        }
      case 1:
        return function (a) {
          return fn.call(that, a)
        }
      case 2:
        return function (a, b) {
          return fn.call(that, a, b)
        }
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c)
        }
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments)
    }
  }

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object')
    }
    return it
  }

  var nativeDefineProperty = Object.defineProperty

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f$2 = descriptors
    ? nativeDefineProperty
    : function defineProperty(O, P, Attributes) {
        anObject(O)
        P = toPrimitive(P, true)
        anObject(Attributes)
        if (ie8DomDefine)
          try {
            return nativeDefineProperty(O, P, Attributes)
          } catch (error) {
            /* empty */
          }
        if ('get' in Attributes || 'set' in Attributes)
          throw TypeError('Accessors not supported')
        if ('value' in Attributes) O[P] = Attributes.value
        return O
      }

  var objectDefineProperty = {
    f: f$2,
  }

  var createNonEnumerableProperty = descriptors
    ? function (object, key, value) {
        return objectDefineProperty.f(
          object,
          key,
          createPropertyDescriptor(1, value),
        )
      }
    : function (object, key, value) {
        object[key] = value
        return object
      }

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f

  var wrapConstructor = function (NativeConstructor) {
    var Wrapper = function (a, b, c) {
      if (this instanceof NativeConstructor) {
        switch (arguments.length) {
          case 0:
            return new NativeConstructor()
          case 1:
            return new NativeConstructor(a)
          case 2:
            return new NativeConstructor(a, b)
        }
        return new NativeConstructor(a, b, c)
      }
      return NativeConstructor.apply(this, arguments)
    }
    Wrapper.prototype = NativeConstructor.prototype
    return Wrapper
  }

  /*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
  var _export = function (options, source) {
    var TARGET = options.target
    var GLOBAL = options.global
    var STATIC = options.stat
    var PROTO = options.proto

    var nativeSource = GLOBAL
      ? global_1
      : STATIC
      ? global_1[TARGET]
      : (global_1[TARGET] || {}).prototype

    var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {})
    var targetPrototype = target.prototype

    var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE
    var key,
      sourceProperty,
      targetProperty,
      nativeProperty,
      resultProperty,
      descriptor

    for (key in source) {
      FORCED = isForced_1(
        GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key,
        options.forced,
      )
      // contains in native
      USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key)

      targetProperty = target[key]

      if (USE_NATIVE)
        if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(nativeSource, key)
          nativeProperty = descriptor && descriptor.value
        } else nativeProperty = nativeSource[key]

      // export native or implementation
      sourceProperty =
        USE_NATIVE && nativeProperty ? nativeProperty : source[key]

      if (USE_NATIVE && typeof targetProperty === typeof sourceProperty)
        continue

      // bind timers to global for call from export context
      if (options.bind && USE_NATIVE)
        resultProperty = functionBindContext(sourceProperty, global_1)
      // wrap global constructors for prevent changs in this version
      else if (options.wrap && USE_NATIVE)
        resultProperty = wrapConstructor(sourceProperty)
      // make static versions for prototype methods
      else if (PROTO && typeof sourceProperty == 'function')
        resultProperty = functionBindContext(Function.call, sourceProperty)
      // default case
      else resultProperty = sourceProperty

      // add a flag to not completely full polyfills
      if (
        options.sham ||
        (sourceProperty && sourceProperty.sham) ||
        (targetProperty && targetProperty.sham)
      ) {
        createNonEnumerableProperty(resultProperty, 'sham', true)
      }

      target[key] = resultProperty

      if (PROTO) {
        VIRTUAL_PROTOTYPE = TARGET + 'Prototype'
        if (!has(path, VIRTUAL_PROTOTYPE)) {
          createNonEnumerableProperty(path, VIRTUAL_PROTOTYPE, {})
        }
        // export virtual prototype methods
        path[VIRTUAL_PROTOTYPE][key] = sourceProperty
        // export real prototype methods
        if (options.real && targetPrototype && !targetPrototype[key]) {
          createNonEnumerableProperty(targetPrototype, key, sourceProperty)
        }
      }
    }
  }

  // `IsArray` abstract operation
  // https://tc39.github.io/ecma262/#sec-isarray
  var isArray =
    Array.isArray ||
    function isArray(arg) {
      return classofRaw(arg) == 'Array'
    }

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument))
  }

  var ceil = Math.ceil
  var floor = Math.floor

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN((argument = +argument))
      ? 0
      : (argument > 0 ? floor : ceil)(argument)
  }

  var min = Math.min

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1fffffffffffff) : 0 // 2 ** 53 - 1 == 9007199254740991
  }

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key)
    if (propertyKey in object)
      objectDefineProperty.f(
        object,
        propertyKey,
        createPropertyDescriptor(0, value),
      )
    else object[propertyKey] = value
  }

  var setGlobal = function (key, value) {
    try {
      createNonEnumerableProperty(global_1, key, value)
    } catch (error) {
      global_1[key] = value
    }
    return value
  }

  var SHARED = '__core-js_shared__'
  var store = global_1[SHARED] || setGlobal(SHARED, {})

  var sharedStore = store

  var shared = createCommonjsModule(function (module) {
    ;(module.exports = function (key, value) {
      return (
        sharedStore[key] ||
        (sharedStore[key] = value !== undefined ? value : {})
      )
    })('versions', []).push({
      version: '3.6.4',
      mode: 'pure',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)',
    })
  })

  var id = 0
  var postfix = Math.random()

  var uid = function (key) {
    return (
      'Symbol(' +
      String(key === undefined ? '' : key) +
      ')_' +
      (++id + postfix).toString(36)
    )
  }

  var nativeSymbol =
    !!Object.getOwnPropertySymbols &&
    !fails(function () {
      // Chrome 38 Symbol has incorrect toString conversion
      // eslint-disable-next-line no-undef
      return !String(Symbol())
    })

  var useSymbolAsUid =
    nativeSymbol &&
    // eslint-disable-next-line no-undef
    !Symbol.sham &&
    // eslint-disable-next-line no-undef
    typeof Symbol.iterator == 'symbol'

  var WellKnownSymbolsStore = shared('wks')
  var Symbol$1 = global_1.Symbol
  var createWellKnownSymbol = useSymbolAsUid
    ? Symbol$1
    : (Symbol$1 && Symbol$1.withoutSetter) || uid

  var wellKnownSymbol = function (name) {
    if (!has(WellKnownSymbolsStore, name)) {
      if (nativeSymbol && has(Symbol$1, name))
        WellKnownSymbolsStore[name] = Symbol$1[name]
      else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name)
    }
    return WellKnownSymbolsStore[name]
  }

  var SPECIES = wellKnownSymbol('species')

  // `ArraySpeciesCreate` abstract operation
  // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
  var arraySpeciesCreate = function (originalArray, length) {
    var C
    if (isArray(originalArray)) {
      C = originalArray.constructor
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
        C = undefined
      else if (isObject(C)) {
        C = C[SPECIES]
        if (C === null) C = undefined
      }
    }
    return new (C === undefined ? Array : C)(length === 0 ? 0 : length)
  }

  var aFunction$1 = function (variable) {
    return typeof variable == 'function' ? variable : undefined
  }

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2
      ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
      : (path[namespace] && path[namespace][method]) ||
          (global_1[namespace] && global_1[namespace][method])
  }

  var engineUserAgent = getBuiltIn('navigator', 'userAgent') || ''

  var process = global_1.process
  var versions = process && process.versions
  var v8 = versions && versions.v8
  var match, version

  if (v8) {
    match = v8.split('.')
    version = match[0] + match[1]
  } else if (engineUserAgent) {
    match = engineUserAgent.match(/Edge\/(\d+)/)
    if (!match || match[1] >= 74) {
      match = engineUserAgent.match(/Chrome\/(\d+)/)
      if (match) version = match[1]
    }
  }

  var engineV8Version = version && +version

  var SPECIES$1 = wellKnownSymbol('species')

  var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/677
    return (
      engineV8Version >= 51 ||
      !fails(function () {
        var array = []
        var constructor = (array.constructor = {})
        constructor[SPECIES$1] = function () {
          return { foo: 1 }
        }
        return array[METHOD_NAME](Boolean).foo !== 1
      })
    )
  }

  var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable')
  var MAX_SAFE_INTEGER = 0x1fffffffffffff
  var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'

  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/679
  var IS_CONCAT_SPREADABLE_SUPPORT =
    engineV8Version >= 51 ||
    !fails(function () {
      var array = []
      array[IS_CONCAT_SPREADABLE] = false
      return array.concat()[0] !== array
    })

  var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat')

  var isConcatSpreadable = function (O) {
    if (!isObject(O)) return false
    var spreadable = O[IS_CONCAT_SPREADABLE]
    return spreadable !== undefined ? !!spreadable : isArray(O)
  }

  var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT

  // `Array.prototype.concat` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.concat
  // with adding support of @@isConcatSpreadable and @@species
  _export(
    { target: 'Array', proto: true, forced: FORCED },
    {
      concat: function concat(arg) {
        // eslint-disable-line no-unused-vars
        var O = toObject(this)
        var A = arraySpeciesCreate(O, 0)
        var n = 0
        var i, k, length, len, E
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i]
          if (isConcatSpreadable(E)) {
            len = toLength(E.length)
            if (n + len > MAX_SAFE_INTEGER)
              throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
            for (k = 0; k < len; k++, n++)
              if (k in E) createProperty(A, n, E[k])
          } else {
            if (n >= MAX_SAFE_INTEGER)
              throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED)
            createProperty(A, n++, E)
          }
        }
        A.length = n
        return A
      },
    },
  )

  var entryVirtual = function (CONSTRUCTOR) {
    return path[CONSTRUCTOR + 'Prototype']
  }

  var concat = entryVirtual('Array').concat

  var ArrayPrototype = Array.prototype

  var concat_1 = function (it) {
    var own = it.concat
    return it === ArrayPrototype ||
      (it instanceof Array && own === ArrayPrototype.concat)
      ? concat
      : own
  }

  var concat$1 = concat_1

  var concat$2 = concat$1

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function')
    }
  }

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  _export(
    { target: 'Object', stat: true, forced: !descriptors, sham: !descriptors },
    {
      defineProperty: objectDefineProperty.f,
    },
  )

  var defineProperty_1 = createCommonjsModule(function (module) {
    var Object = path.Object

    var defineProperty = (module.exports = function defineProperty(
      it,
      key,
      desc,
    ) {
      return Object.defineProperty(it, key, desc)
    })

    if (Object.defineProperty.sham) defineProperty.sham = true
  })

  var defineProperty = defineProperty_1

  var defineProperty$1 = defineProperty

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i]
      descriptor.enumerable = descriptor.enumerable || false
      descriptor.configurable = true
      if ('value' in descriptor) descriptor.writable = true

      defineProperty$1(target, descriptor.key, descriptor)
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps)
    if (staticProps) _defineProperties(Constructor, staticProps)
    return Constructor
  }

  // Private constant, only included from Person class.
  var introductions = {
    fr: 'Bonsoir, mon nom est',
    pt: 'Oi gente, meu nome é',
    en: 'Hello, my name is',
  }
  var Person = /*#__PURE__*/ (function () {
    function Person() {
      var name =
        arguments.length > 0 && arguments[0] !== undefined
          ? arguments[0]
          : 'John Doe'
      var lang =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en'

      _classCallCheck(this, Person)

      this.name = name
      this.lang = lang

      if (lang) {
        this.lang = lang
      }
    }

    _createClass(Person, [
      {
        key: 'talk',
        value: function talk(message) {
          var _context

          var name = this.name
          return concat$2((_context = ''.concat(name, ': '))).call(
            _context,
            message,
          )
        },
      },
      {
        key: 'introduction',
        value: function introduction() {
          var _context2

          var name = this.name
          var _this$lang = this.lang,
            lang = _this$lang === void 0 ? 'en' : _this$lang
          var message =
            lang in introductions ? introductions[lang] : introductions.en
          return this.talk(
            concat$2((_context2 = ''.concat(message, ' '))).call(
              _context2,
              name,
            ),
          )
        },
      },
      {
        key: 'toString',
        value: function toString() {
          return this.introduction()
        },
      },
    ])

    return Person
  })()

  const talk = (args) => {
    const name = typeof args.name === 'string' ? `${args.name}: ` : ''
    const message = typeof args.message === 'string' ? `${args.message}` : '...'
    return `${name}${message}`
  }
  var index = (people = []) => {
    const out = []
    for (const someone of people) {
      const { name = 'John Doe' } = someone || {}
      const message = 'Hiya!'
      out.push(talk({ name, message }))
    }
    return out
  }

  exports.Person = Person
  exports.default = index

  return exports
})({})
/*! Renoir Boulanger  */
//# sourceMappingURL=index.browser.js.map
