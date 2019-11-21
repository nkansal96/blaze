// This file is auto generated by the protocol-buffers compiler

/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-redeclare */
/* eslint-disable camelcase */

// Remember to `npm install --save protocol-buffers-encodings`
var encodings = require('protocol-buffers-encodings')
var varint = encodings.varint
var skip = encodings.skip

var HTTPMessage = exports.HTTPMessage = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

var HTTPHeader = exports.HTTPHeader = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

var RequestResponse = exports.RequestResponse = {
  buffer: true,
  encodingLength: null,
  encode: null,
  decode: null
}

defineHTTPMessage()
defineHTTPHeader()
defineRequestResponse()

function defineHTTPMessage () {
  var enc = [
    encodings.bytes,
    HTTPHeader
  ]

  HTTPMessage.encodingLength = encodingLength
  HTTPMessage.encode = encode
  HTTPMessage.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (defined(obj.first_line)) {
      var len = enc[0].encodingLength(obj.first_line)
      length += 1 + len
    }
    if (defined(obj.header)) {
      for (var i = 0; i < obj.header.length; i++) {
        if (!defined(obj.header[i])) continue
        var len = enc[1].encodingLength(obj.header[i])
        length += varint.encodingLength(len)
        length += 1 + len
      }
    }
    if (defined(obj.body)) {
      var len = enc[0].encodingLength(obj.body)
      length += 1 + len
    }
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (defined(obj.first_line)) {
      buf[offset++] = 10
      enc[0].encode(obj.first_line, buf, offset)
      offset += enc[0].encode.bytes
    }
    if (defined(obj.header)) {
      for (var i = 0; i < obj.header.length; i++) {
        if (!defined(obj.header[i])) continue
        buf[offset++] = 18
        varint.encode(enc[1].encodingLength(obj.header[i]), buf, offset)
        offset += varint.encode.bytes
        enc[1].encode(obj.header[i], buf, offset)
        offset += enc[1].encode.bytes
      }
    }
    if (defined(obj.body)) {
      buf[offset++] = 26
      enc[0].encode(obj.body, buf, offset)
      offset += enc[0].encode.bytes
    }
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      first_line: null,
      header: [],
      body: null
    }
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.first_line = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        break
        case 2:
        var len = varint.decode(buf, offset)
        offset += varint.decode.bytes
        obj.header.push(enc[1].decode(buf, offset, offset + len))
        offset += enc[1].decode.bytes
        break
        case 3:
        obj.body = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defineHTTPHeader () {
  var enc = [
    encodings.bytes
  ]

  HTTPHeader.encodingLength = encodingLength
  HTTPHeader.encode = encode
  HTTPHeader.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (defined(obj.key)) {
      var len = enc[0].encodingLength(obj.key)
      length += 1 + len
    }
    if (defined(obj.value)) {
      var len = enc[0].encodingLength(obj.value)
      length += 1 + len
    }
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (defined(obj.key)) {
      buf[offset++] = 10
      enc[0].encode(obj.key, buf, offset)
      offset += enc[0].encode.bytes
    }
    if (defined(obj.value)) {
      buf[offset++] = 18
      enc[0].encode(obj.value, buf, offset)
      offset += enc[0].encode.bytes
    }
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      key: null,
      value: null
    }
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.key = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        break
        case 2:
        obj.value = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defineRequestResponse () {
  RequestResponse.Scheme = {
  "HTTP": 1,
  "HTTPS": 2
}

  var enc = [
    encodings.string,
    encodings.varint,
    encodings.enum,
    HTTPMessage
  ]

  RequestResponse.encodingLength = encodingLength
  RequestResponse.encode = encode
  RequestResponse.decode = decode

  function encodingLength (obj) {
    var length = 0
    if (defined(obj.ip)) {
      var len = enc[0].encodingLength(obj.ip)
      length += 1 + len
    }
    if (defined(obj.port)) {
      var len = enc[1].encodingLength(obj.port)
      length += 1 + len
    }
    if (defined(obj.scheme)) {
      var len = enc[2].encodingLength(obj.scheme)
      length += 1 + len
    }
    if (defined(obj.request)) {
      var len = enc[3].encodingLength(obj.request)
      length += varint.encodingLength(len)
      length += 1 + len
    }
    if (defined(obj.response)) {
      var len = enc[3].encodingLength(obj.response)
      length += varint.encodingLength(len)
      length += 1 + len
    }
    return length
  }

  function encode (obj, buf, offset) {
    if (!offset) offset = 0
    if (!buf) buf = Buffer.allocUnsafe(encodingLength(obj))
    var oldOffset = offset
    if (defined(obj.ip)) {
      buf[offset++] = 10
      enc[0].encode(obj.ip, buf, offset)
      offset += enc[0].encode.bytes
    }
    if (defined(obj.port)) {
      buf[offset++] = 16
      enc[1].encode(obj.port, buf, offset)
      offset += enc[1].encode.bytes
    }
    if (defined(obj.scheme)) {
      buf[offset++] = 24
      enc[2].encode(obj.scheme, buf, offset)
      offset += enc[2].encode.bytes
    }
    if (defined(obj.request)) {
      buf[offset++] = 34
      varint.encode(enc[3].encodingLength(obj.request), buf, offset)
      offset += varint.encode.bytes
      enc[3].encode(obj.request, buf, offset)
      offset += enc[3].encode.bytes
    }
    if (defined(obj.response)) {
      buf[offset++] = 42
      varint.encode(enc[3].encodingLength(obj.response), buf, offset)
      offset += varint.encode.bytes
      enc[3].encode(obj.response, buf, offset)
      offset += enc[3].encode.bytes
    }
    encode.bytes = offset - oldOffset
    return buf
  }

  function decode (buf, offset, end) {
    if (!offset) offset = 0
    if (!end) end = buf.length
    if (!(end <= buf.length && offset <= buf.length)) throw new Error("Decoded message is not valid")
    var oldOffset = offset
    var obj = {
      ip: "",
      port: 0,
      scheme: 1,
      request: null,
      response: null
    }
    while (true) {
      if (end <= offset) {
        decode.bytes = offset - oldOffset
        return obj
      }
      var prefix = varint.decode(buf, offset)
      offset += varint.decode.bytes
      var tag = prefix >> 3
      switch (tag) {
        case 1:
        obj.ip = enc[0].decode(buf, offset)
        offset += enc[0].decode.bytes
        break
        case 2:
        obj.port = enc[1].decode(buf, offset)
        offset += enc[1].decode.bytes
        break
        case 3:
        obj.scheme = enc[2].decode(buf, offset)
        offset += enc[2].decode.bytes
        break
        case 4:
        var len = varint.decode(buf, offset)
        offset += varint.decode.bytes
        obj.request = enc[3].decode(buf, offset, offset + len)
        offset += enc[3].decode.bytes
        break
        case 5:
        var len = varint.decode(buf, offset)
        offset += varint.decode.bytes
        obj.response = enc[3].decode(buf, offset, offset + len)
        offset += enc[3].decode.bytes
        break
        default:
        offset = skip(prefix & 7, buf, offset)
      }
    }
  }
}

function defined (val) {
  return val !== null && val !== undefined && (typeof val !== 'number' || !isNaN(val))
}