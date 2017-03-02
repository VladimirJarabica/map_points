exports.fetch = ((self) ->

  normalizeName = (name) ->
    if typeof name != 'string'
      name = String(name)
    if /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)
      throw new TypeError('Invalid character in header field name')
    name.toLowerCase()

  normalizeValue = (value) ->
    if typeof value != 'string'
      value = String(value)
    value

  # Build a destructive iterator for the value list

  iteratorFor = (items) ->
    iterator = next: ->
      value = items.shift()
      {
        done: value == undefined
        value: value
      }
    if support.iterable

      iterator[Symbol.iterator] = ->
        iterator

    iterator

  Headers = (headers) ->
    @map = {}
    if headers instanceof Headers
      headers.forEach ((value, name) ->
        @append name, value
        return
      ), this
    else if headers
      Object.getOwnPropertyNames(headers).forEach ((name) ->
        @append name, headers[name]
        return
      ), this
    return

  consumed = (body) ->
    if body.bodyUsed
      return Promise.reject(new TypeError('Already read'))
    body.bodyUsed = true
    return

  fileReaderReady = (reader) ->
    new Promise((resolve, reject) ->

      reader.onload = ->
        resolve reader.result
        return

      reader.onerror = ->
        reject reader.error
        return

      return
    )

  readBlobAsArrayBuffer = (blob) ->
    reader = new FileReader
    promise = fileReaderReady(reader)
    reader.readAsArrayBuffer blob
    promise

  readBlobAsText = (blob) ->
    reader = new FileReader
    promise = fileReaderReady(reader)
    reader.readAsText blob
    promise

  readArrayBufferAsText = (buf) ->
    view = new Uint8Array(buf)
    chars = new Array(view.length)
    i = 0
    while i < view.length
      chars[i] = String.fromCharCode(view[i])
      i++
    chars.join ''

  bufferClone = (buf) ->
    if buf.slice
      buf.slice 0
    else
      view = new Uint8Array(buf.byteLength)
      view.set new Uint8Array(buf)
      view.buffer

  Body = ->
    @bodyUsed = false

    @_initBody = (body) ->
      @_bodyInit = body
      if !body
        @_bodyText = ''
      else if typeof body == 'string'
        @_bodyText = body
      else if support.blob and Blob::isPrototypeOf(body)
        @_bodyBlob = body
      else if support.formData and FormData::isPrototypeOf(body)
        @_bodyFormData = body
      else if support.searchParams and URLSearchParams::isPrototypeOf(body)
        @_bodyText = body.toString()
      else if support.arrayBuffer and support.blob and isDataView(body)
        @_bodyArrayBuffer = bufferClone(body.buffer)
        # IE 10-11 can't handle a DataView body.
        @_bodyInit = new Blob([ @_bodyArrayBuffer ])
      else if support.arrayBuffer and (ArrayBuffer::isPrototypeOf(body) or isArrayBufferView(body))
        @_bodyArrayBuffer = bufferClone(body)
      else
        throw new Error('unsupported BodyInit type')
      if !@headers.get('content-type')
        if typeof body == 'string'
          @headers.set 'content-type', 'text/plain;charset=UTF-8'
        else if @_bodyBlob and @_bodyBlob.type
          @headers.set 'content-type', @_bodyBlob.type
        else if support.searchParams and URLSearchParams::isPrototypeOf(body)
          @headers.set 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8'
      return

    if support.blob

      @blob = ->
        rejected = consumed(this)
        if rejected
          return rejected
        if @_bodyBlob
          return Promise.resolve(@_bodyBlob)
        else if @_bodyArrayBuffer
          return Promise.resolve(new Blob([ @_bodyArrayBuffer ]))
        else if @_bodyFormData
          throw new Error('could not read FormData body as blob')
        else
          return Promise.resolve(new Blob([ @_bodyText ]))
        return

      @arrayBuffer = ->
        if @_bodyArrayBuffer
          consumed(this) or Promise.resolve(@_bodyArrayBuffer)
        else
          @blob().then readBlobAsArrayBuffer

    @text = ->
      rejected = consumed(this)
      if rejected
        return rejected
      if @_bodyBlob
        return readBlobAsText(@_bodyBlob)
      else if @_bodyArrayBuffer
        return Promise.resolve(readArrayBufferAsText(@_bodyArrayBuffer))
      else if @_bodyFormData
        throw new Error('could not read FormData body as text')
      else
        return Promise.resolve(@_bodyText)
      return

    if support.formData

      @formData = ->
        @text().then decode

    @json = ->
      @text().then JSON.parse

    this

  normalizeMethod = (method) ->
    upcased = method.toUpperCase()
    if methods.indexOf(upcased) > -1 then upcased else method

  Request = (input, options) ->
    options = options or {}
    body = options.body
    if input instanceof Request
      if input.bodyUsed
        throw new TypeError('Already read')
      @url = input.url
      @credentials = input.credentials
      if !options.headers
        @headers = new Headers(input.headers)
      @method = input.method
      @mode = input.mode
      if !body and input._bodyInit != null
        body = input._bodyInit
        input.bodyUsed = true
    else
      @url = String(input)
    @credentials = options.credentials or @credentials or 'omit'
    if options.headers or !@headers
      @headers = new Headers(options.headers)
    @method = normalizeMethod(options.method or @method or 'GET')
    @mode = options.mode or @mode or null
    @referrer = null
    if (@method == 'GET' or @method == 'HEAD') and body
      throw new TypeError('Body not allowed for GET or HEAD requests')
    @_initBody body
    return

  decode = (body) ->
    form = new FormData
    body.trim().split('&').forEach (bytes) ->
      if bytes
        split = bytes.split('=')
        name = split.shift().replace(/\+/g, ' ')
        value = split.join('=').replace(/\+/g, ' ')
        form.append decodeURIComponent(name), decodeURIComponent(value)
      return
    form

  parseHeaders = (rawHeaders) ->
    headers = new Headers
    rawHeaders.split(/\r?\n/).forEach (line) ->
      parts = line.split(':')
      key = parts.shift().trim()
      if key
        value = parts.join(':').trim()
        headers.append key, value
      return
    headers

  Response = (bodyInit, options) ->
    if !options
      options = {}
    @type = 'default'
    @status = if 'status' of options then options.status else 200
    @ok = @status >= 200 and @status < 300
    @statusText = if 'statusText' of options then options.statusText else 'OK'
    @headers = new Headers(options.headers)
    @url = options.url or ''
    @_initBody bodyInit
    return

  'use strict'
  if self.fetch
    return
  support =
    searchParams: 'URLSearchParams' of self
    iterable: 'Symbol' of self and 'iterator' of Symbol
    blob: 'FileReader' of self and 'Blob' of self and do ->
      try
        new Blob
        return true
      catch e
        return false
      return
    formData: 'FormData' of self
    arrayBuffer: 'ArrayBuffer' of self
  if support.arrayBuffer
    viewClasses = [
      '[object Int8Array]'
      '[object Uint8Array]'
      '[object Uint8ClampedArray]'
      '[object Int16Array]'
      '[object Uint16Array]'
      '[object Int32Array]'
      '[object Uint32Array]'
      '[object Float32Array]'
      '[object Float64Array]'
    ]

    isDataView = (obj) ->
      obj and DataView::isPrototypeOf(obj)

    isArrayBufferView = ArrayBuffer.isView or (obj) ->
      obj and viewClasses.indexOf(Object::toString.call(obj)) > -1

  Headers::append = (name, value) ->
    name = normalizeName(name)
    value = normalizeValue(value)
    oldValue = @map[name]
    @map[name] = if oldValue then oldValue + ',' + value else value
    return

  Headers.prototype['delete'] = (name) ->
    delete @map[normalizeName(name)]
    return

  Headers::get = (name) ->
    name = normalizeName(name)
    if @has(name) then @map[name] else null

  Headers::has = (name) ->
    @map.hasOwnProperty normalizeName(name)

  Headers::set = (name, value) ->
    @map[normalizeName(name)] = normalizeValue(value)
    return

  Headers::forEach = (callback, thisArg) ->
    for name of @map
      if @map.hasOwnProperty(name)
        callback.call thisArg, @map[name], name, this
    return

  Headers::keys = ->
    items = []
    @forEach (value, name) ->
      items.push name
      return
    iteratorFor items

  Headers::values = ->
    items = []
    @forEach (value) ->
      items.push value
      return
    iteratorFor items

  Headers::entries = ->
    items = []
    @forEach (value, name) ->
      items.push [
        name
        value
      ]
      return
    iteratorFor items

  if support.iterable
    Headers.prototype[Symbol.iterator] = Headers::entries
  # HTTP methods whose capitalization should be normalized
  methods = [
    'DELETE'
    'GET'
    'HEAD'
    'OPTIONS'
    'POST'
    'PUT'
  ]

  Request::clone = ->
    new Request(this, body: @_bodyInit)

  Body.call Request.prototype
  Body.call Response.prototype

  Response::clone = ->
    new Response(@_bodyInit,
      status: @status
      statusText: @statusText
      headers: new Headers(@headers)
      url: @url)

  Response.error = ->
    response = new Response(null,
      status: 0
      statusText: '')
    response.type = 'error'
    response

  redirectStatuses = [
    301
    302
    303
    307
    308
  ]

  Response.redirect = (url, status) ->
    if redirectStatuses.indexOf(status) == -1
      throw new RangeError('Invalid status code')
    new Response(null,
      status: status
      headers: location: url)

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = (input, init) ->
    new Promise((resolve, reject) ->
      request = new Request(input, init)
      xhr = new XMLHttpRequest

      xhr.onload = ->
        options =
          status: xhr.status
          statusText: xhr.statusText
          headers: parseHeaders(xhr.getAllResponseHeaders() or '')
        options.url = if 'responseURL' of xhr then xhr.responseURL else options.headers.get('X-Request-URL')
        body = if 'response' of xhr then xhr.response else xhr.responseText
        resolve new Response(body, options)
        return

      xhr.onerror = ->
        reject new TypeError('Network request failed')
        return

      xhr.ontimeout = ->
        reject new TypeError('Network request failed')
        return

      xhr.open request.method, request.url, true
      if request.credentials == 'include'
        xhr.withCredentials = true
      if 'responseType' of xhr and support.blob
        xhr.responseType = 'blob'
      request.headers.forEach (value, name) ->
        xhr.setRequestHeader name, value
        return
      xhr.send if typeof request._bodyInit == 'undefined' then null else request._bodyInit
      return
    )

  self.fetch.polyfill = true
  return
) if typeof self != 'undefined' then self else this
