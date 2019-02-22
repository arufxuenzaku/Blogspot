var exclude = {
    protectedUrl: "google.com,twitter.com,facebook.com,stumbleupon.com,vk.com,reddit.com,linkedin.com,tumblr.com,brainly.com,flikr.com,pinterest.com,whatsapp.com,microsoft.com,skype.com,reverbnation.com,spotify.com,soundcloud.com,kiwi.com,deviantart.com,plus.google.com,youtube.com,vidio.com,blogger.com,blogspot.com,bing.com,sharethis.com,example.com,paypal.com",
    parameter: "?url="
};

function getdom(e) {
    return (-1 < e.indexOf("://") ? e.split("/")[2] : e.split("/")[0]).split(":")[0].split("?")[0]
}

function a_to_fa() {
    new Array;
    return exclude.protectedUrl = exclude.protectedUrl, exclude.protectedUrl.split(",")
}

function convertstr(e) {
    return e.replace(/^\s+/, "").replace(/\s+$/, "")
}
var base64 = {};
! function(r) {
    "use strict";
    r.formatter = {
        prefix: "",
        stringify: function(e) {
            var t = this.prefix;
            return (t += e.salt.toString()) + e.ciphertext.toString()
        },
        parse: function(e) {
            var t = EncryptionLink.lib.CipherParams.create({}),
                r = this.prefix.length;
            return 0 !== e.indexOf(this.prefix) || (t.ciphertext = EncryptionLink.enc.Hex.parse(e.substring(16 + r)), t.salt = EncryptionLink.enc.Hex.parse(e.substring(r, 16 + r))), t
        }
    }, r.encode = function(e, t) {
        try {
            return EncryptionLink.AES.encode(e, t, {
                format: r.formatter
            }).toString()
        } catch (e) {
            return ""
        }
    }, r.decode = function(e, t) {
        try {
            return EncryptionLink.AES.decode(e, t, {
                format: r.formatter
            }).toString(EncryptionLink.enc.Utf8)
        } catch (e) {
            return ""
        }
    }
}(base64), exclude.protectedUrl ? exclude.protectedUrl += "," + window.location.href : exclude.protectedUrl = window.location.href;
var a_to_fa = a_to_fa();

function geturi(e) {
    for (var t = !1, r = 0, n = a_to_fa.length, i = "", o = "", c = document.getElementsByTagName("a"), s = new Array, a = e.feed.openSearch$totalResults.$t, f = 0; f < a; f++) {
        for (var u, h = 0; h < e.feed.entry[f].link.length; h++)
            if ("alternate" == e.feed.entry[f].link[h].rel) {
                u = e.feed.entry[f].link[h].href;
                break
            }
        s[f] = u;
        var l = Math.random() * s.length;
        l = parseInt(l)
    }
    for (f = 0; f < c.length; f++) {
        for (t = !1, r = 0; 0 == t && r < n;) i = getdom(c[f].href), o = getdom(a_to_fa[r]), i.match(o) && (t = !0), r++;
        0 == t && (c[f].href = s[l] + exclude.parameter + base64.encode(convertstr(c[f].href), convertstr("root")), c[f].rel = "nofollow", c[f].target = "_blank")
    }
}
var EncryptionLink = EncryptionLink || function(u, e) {
    var t = {},
        r = t.lib = {},
        n = r.Base = function() {
            function r() {}
            return {
                extend: function(e) {
                    r.prototype = this;
                    var t = new r;
                    return e && t.mixIn(e), t.hasOwnProperty("init") || (t.init = function() {
                        t.$super.init.apply(this, arguments)
                    }), (t.init.prototype = t).$super = this, t
                },
                create: function() {
                    var e = this.extend();
                    return e.init.apply(e, arguments), e
                },
                init: function() {},
                mixIn: function(e) {
                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                }
            }
        }(),
        h = r.WordArray = n.extend({
            init: function(e, t) {
                e = this.words = e || [], this.sigBytes = null != t ? t : 4 * e.length
            },
            toString: function(e) {
                return (e || o).stringify(this)
            },
            concat: function(e) {
                var t = this.words,
                    r = e.words,
                    n = this.sigBytes,
                    i = e.sigBytes;
                if (this.clamp(), n % 4)
                    for (var o = 0; o < i; o++) {
                        var c = r[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                        t[n + o >>> 2] |= c << 24 - (n + o) % 4 * 8
                    } else if (65535 < r.length)
                        for (o = 0; o < i; o += 4) t[n + o >>> 2] = r[o >>> 2];
                    else t.push.apply(t, r);
                return this.sigBytes += i, this
            },
            clamp: function() {
                var e = this.words,
                    t = this.sigBytes;
                e[t >>> 2] &= 4294967295 << 32 - t % 4 * 8, e.length = u.ceil(t / 4)
            },
            random: function(e) {
                for (var t = [], r = 0; r < e; r += 4) t.push(4294967296 * u.random() | 0);
                return new h.init(t, e)
            }
        }),
        i = t.enc = {},
        o = i.Hex = {
            stringify: function(e) {
                for (var t = e.words, r = e.sigBytes, n = [], i = 0; i < r; i++) {
                    var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    n.push((o >>> 4).toString(16)), n.push((15 & o).toString(16))
                }
                return n.join("")
            },
            parse: function(e) {
                for (var t = e.length, r = [], n = 0; n < t; n += 2) r[n >>> 3] |= parseInt(e.substr(n, 2), 16) << 24 - n % 8 * 4;
                return new h.init(r, t / 2)
            }
        },
        c = i.Latin1 = {
            stringify: function(e) {
                for (var t = e.words, r = e.sigBytes, n = [], i = 0; i < r; i++) {
                    var o = t[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                    n.push(String.fromCharCode(o))
                }
                return n.join("")
            },
            parse: function(e) {
                for (var t = e.length, r = [], n = 0; n < t; n++) r[n >>> 2] |= (255 & e.charCodeAt(n)) << 24 - n % 4 * 8;
                return new h.init(r, t)
            }
        },
        s = i.Utf8 = {
            stringify: function(e) {
                try {
                    return decodeURIComponent(escape(c.stringify(e)))
                } catch (e) {
                    throw new Error("Malformed UTF-8 data")
                }
            },
            parse: function(e) {
                return c.parse(unescape(encodeURIComponent(e)))
            }
        },
        a = r.BufferedBlockAlgorithm = n.extend({
            reset: function() {
                this._data = new h.init, this._nDataBytes = 0
            },
            _append: function(e) {
                "string" == typeof e && (e = s.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
            },
            _process: function(e) {
                var t = this._data,
                    r = t.words,
                    n = t.sigBytes,
                    i = this.blockSize,
                    o = n / (4 * i),
                    c = (o = e ? u.ceil(o) : u.max((0 | o) - this._minBufferSize, 0)) * i,
                    s = u.min(4 * c, n);
                if (c) {
                    for (var a = 0; a < c; a += i) this._doProcessBlock(r, a);
                    var f = r.splice(0, c);
                    t.sigBytes -= s
                }
                return new h.init(f, s)
            },
            _minBufferSize: 0
        }),
        f = (r.Hasher = a.extend({
            cfg: n.extend(),
            init: function(e) {
                this.cfg = this.cfg.extend(e), this.reset()
            },
            reset: function() {
                a.reset.call(this), this._doReset()
            },
            update: function(e) {
                return this._append(e), this._process(), this
            },
            finalize: function(e) {
                return e && this._append(e), this._doFinalize()
            },
            blockSize: 16,
            _createHelper: function(r) {
                return function(e, t) {
                    return new r.init(t).finalize(e)
                }
            },
            _createHmacHelper: function(r) {
                return function(e, t) {
                    return new f.HMAC.init(r, t).finalize(e)
                }
            }
        }), t.algo = {});
    return t
}(Math);
! function() {
    var e = EncryptionLink,
        u = e.lib.WordArray;
    e.enc.Base64 = {
        stringify: function(e) {
            var t = e.words,
                r = e.sigBytes,
                n = this._map;
            e.clamp();
            for (var i = [], o = 0; o < r; o += 3)
                for (var c = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, s = 0; s < 4 && o + .75 * s < r; s++) i.push(n.charAt(c >>> 6 * (3 - s) & 63));
            var a = n.charAt(64);
            if (a)
                for (; i.length % 4;) i.push(a);
            return i.join("")
        },
        parse: function(e) {
            var t = e.length,
                r = this._map,
                n = r.charAt(64);
            if (n) {
                var i = e.indexOf(n); - 1 != i && (t = i)
            }
            for (var o = [], c = 0, s = 0; s < t; s++)
                if (s % 4) {
                    var a = r.indexOf(e.charAt(s - 1)) << s % 4 * 2,
                        f = r.indexOf(e.charAt(s)) >>> 6 - s % 4 * 2;
                    o[c >>> 2] |= (a | f) << 24 - c % 4 * 8, c++
                }
            return u.create(o, c)
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
}(),
function(u) {
    function b(e, t, r, n, i, o, c) {
        var s = e + (t & r | ~t & n) + i + c;
        return (s << o | s >>> 32 - o) + t
    }

    function z(e, t, r, n, i, o, c) {
        var s = e + (t & n | r & ~n) + i + c;
        return (s << o | s >>> 32 - o) + t
    }

    function C(e, t, r, n, i, o, c) {
        var s = e + (t ^ r ^ n) + i + c;
        return (s << o | s >>> 32 - o) + t
    }

    function M(e, t, r, n, i, o, c) {
        var s = e + (r ^ (t | ~n)) + i + c;
        return (s << o | s >>> 32 - o) + t
    }
    var e = EncryptionLink,
        t = e.lib,
        r = t.WordArray,
        n = t.Hasher,
        i = e.algo,
        D = [];
    ! function() {
        for (var e = 0; e < 64; e++) D[e] = 4294967296 * u.abs(u.sin(e + 1)) | 0
    }();
    var o = i.MD5 = n.extend({
        _doReset: function() {
            this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878])
        },
        _doProcessBlock: function(e, t) {
            for (var r = 0; r < 16; r++) {
                var n = t + r,
                    i = e[n];
                e[n] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8)
            }
            var o = this._hash.words,
                c = e[t + 0],
                s = e[t + 1],
                a = e[t + 2],
                f = e[t + 3],
                u = e[t + 4],
                h = e[t + 5],
                l = e[t + 6],
                d = e[t + 7],
                p = e[t + 8],
                v = e[t + 9],
                y = e[t + 10],
                g = e[t + 11],
                _ = e[t + 12],
                m = e[t + 13],
                k = e[t + 14],
                x = e[t + 15],
                B = o[0],
                S = o[1],
                w = o[2],
                E = o[3];
            S = M(S = M(S = M(S = M(S = C(S = C(S = C(S = C(S = z(S = z(S = z(S = z(S = b(S = b(S = b(S = b(S, w = b(w, E = b(E, B = b(B, S, w, E, c, 7, D[0]), S, w, s, 12, D[1]), B, S, a, 17, D[2]), E, B, f, 22, D[3]), w = b(w, E = b(E, B = b(B, S, w, E, u, 7, D[4]), S, w, h, 12, D[5]), B, S, l, 17, D[6]), E, B, d, 22, D[7]), w = b(w, E = b(E, B = b(B, S, w, E, p, 7, D[8]), S, w, v, 12, D[9]), B, S, y, 17, D[10]), E, B, g, 22, D[11]), w = b(w, E = b(E, B = b(B, S, w, E, _, 7, D[12]), S, w, m, 12, D[13]), B, S, k, 17, D[14]), E, B, x, 22, D[15]), w = z(w, E = z(E, B = z(B, S, w, E, s, 5, D[16]), S, w, l, 9, D[17]), B, S, g, 14, D[18]), E, B, c, 20, D[19]), w = z(w, E = z(E, B = z(B, S, w, E, h, 5, D[20]), S, w, y, 9, D[21]), B, S, x, 14, D[22]), E, B, u, 20, D[23]), w = z(w, E = z(E, B = z(B, S, w, E, v, 5, D[24]), S, w, k, 9, D[25]), B, S, f, 14, D[26]), E, B, p, 20, D[27]), w = z(w, E = z(E, B = z(B, S, w, E, m, 5, D[28]), S, w, a, 9, D[29]), B, S, d, 14, D[30]), E, B, _, 20, D[31]), w = C(w, E = C(E, B = C(B, S, w, E, h, 4, D[32]), S, w, p, 11, D[33]), B, S, g, 16, D[34]), E, B, k, 23, D[35]), w = C(w, E = C(E, B = C(B, S, w, E, s, 4, D[36]), S, w, u, 11, D[37]), B, S, d, 16, D[38]), E, B, y, 23, D[39]), w = C(w, E = C(E, B = C(B, S, w, E, m, 4, D[40]), S, w, c, 11, D[41]), B, S, f, 16, D[42]), E, B, l, 23, D[43]), w = C(w, E = C(E, B = C(B, S, w, E, v, 4, D[44]), S, w, _, 11, D[45]), B, S, x, 16, D[46]), E, B, a, 23, D[47]), w = M(w, E = M(E, B = M(B, S, w, E, c, 6, D[48]), S, w, d, 10, D[49]), B, S, k, 15, D[50]), E, B, h, 21, D[51]), w = M(w, E = M(E, B = M(B, S, w, E, _, 6, D[52]), S, w, f, 10, D[53]), B, S, y, 15, D[54]), E, B, s, 21, D[55]), w = M(w, E = M(E, B = M(B, S, w, E, p, 6, D[56]), S, w, x, 10, D[57]), B, S, l, 15, D[58]), E, B, m, 21, D[59]), w = M(w, E = M(E, B = M(B, S, w, E, u, 6, D[60]), S, w, g, 10, D[61]), B, S, a, 15, D[62]), E, B, v, 21, D[63]), o[0] = o[0] + B | 0, o[1] = o[1] + S | 0, o[2] = o[2] + w | 0, o[3] = o[3] + E | 0
        },
        _doFinalize: function() {
            var e = this._data,
                t = e.words,
                r = 8 * this._nDataBytes,
                n = 8 * e.sigBytes;
            t[n >>> 5] |= 128 << 24 - n % 32;
            var i = u.floor(r / 4294967296),
                o = r;
            t[15 + (n + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), t[14 + (n + 64 >>> 9 << 4)] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8), e.sigBytes = 4 * (t.length + 1), this._process();
            for (var c = this._hash, s = c.words, a = 0; a < 4; a++) {
                var f = s[a];
                s[a] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8)
            }
            return c
        }
    });
    e.MD5 = n._createHelper(o), e.HmacMD5 = n._createHmacHelper(o)
}(Math),
function() {
    var e = EncryptionLink,
        t = e.lib,
        r = t.Base,
        u = t.WordArray,
        n = e.algo,
        i = n.MD5,
        o = n.EvpKDF = r.extend({
            cfg: r.extend({
                keySize: 4,
                hasher: i,
                iterations: 1
            }),
            init: function(e) {
                this.cfg = this.cfg.extend(e)
            },
            compute: function(e, t) {
                for (var r = this.cfg, n = r.hasher.create(), i = u.create(), o = i.words, c = r.keySize, s = r.iterations; o.length < c;) {
                    a && n.update(a);
                    var a = n.update(e).finalize(t);
                    n.reset();
                    for (var f = 1; f < s; f++) a = n.finalize(a), n.reset();
                    i.concat(a)
                }
                return i.sigBytes = 4 * c, i
            }
        });
    e.EvpKDF = function(e, t, r) {
        return o.create(r).compute(e, t)
    }
}(), EncryptionLink.lib.Cipher || function(e) {
        var t = EncryptionLink,
            r = t.lib,
            n = r.Base,
            a = r.WordArray,
            i = r.BufferedBlockAlgorithm,
            o = t.enc,
            c = (o.Utf8, o.Base64),
            s = t.algo.EvpKDF,
            f = r.Cipher = i.extend({
                cfg: n.extend(),
                createEncryptor: function(e, t) {
                    return this.create(this._ENC_XFORM_MODE, e, t)
                },
                createDecryptor: function(e, t) {
                    return this.create(this._DEC_XFORM_MODE, e, t)
                },
                init: function(e, t, r) {
                    this.cfg = this.cfg.extend(r), this._xformMode = e, this._key = t, this.reset()
                },
                reset: function() {
                    i.reset.call(this), this._doReset()
                },
                process: function(e) {
                    return this._append(e), this._process()
                },
                finalize: function(e) {
                    return e && this._append(e), this._doFinalize()
                },
                keySize: 4,
                ivSize: 4,
                _ENC_XFORM_MODE: 1,
                _DEC_XFORM_MODE: 2,
                _createHelper: function() {
                    function i(e) {
                        return "string" == typeof e ? _ : y
                    }
                    return function(n) {
                        return {
                            encode: function(e, t, r) {
                                return i(t).encode(n, e, t, r)
                            },
                            decode: function(e, t, r) {
                                return i(t).decode(n, e, t, r)
                            }
                        }
                    }
                }()
            }),
            u = (r.StreamCipher = f.extend({
                _doFinalize: function() {
                    return this._process(!0)
                },
                blockSize: 1
            }), t.mode = {}),
            h = r.BlockCipherMode = n.extend({
                createEncryptor: function(e, t) {
                    return this.Encryptor.create(e, t)
                },
                createDecryptor: function(e, t) {
                    return this.Decryptor.create(e, t)
                },
                init: function(e, t) {
                    this._cipher = e, this._iv = t
                }
            }),
            l = u.CBC = function() {
                function o(e, t, r) {
                    var n = this._iv;
                    if (n) {
                        var i = n;
                        this._iv = void 0
                    } else i = this._prevBlock;
                    for (var o = 0; o < r; o++) e[t + o] ^= i[o]
                }
                var e = h.extend();
                return e.Encryptor = e.extend({
                    processBlock: function(e, t) {
                        var r = this._cipher,
                            n = r.blockSize;
                        o.call(this, e, t, n), r.encryptBlock(e, t), this._prevBlock = e.slice(t, t + n)
                    }
                }), e.Decryptor = e.extend({
                    processBlock: function(e, t) {
                        var r = this._cipher,
                            n = r.blockSize,
                            i = e.slice(t, t + n);
                        r.decryptBlock(e, t), o.call(this, e, t, n), this._prevBlock = i
                    }
                }), e
            }(),
            d = (t.pad = {}).Pkcs7 = {
                pad: function(e, t) {
                    for (var r = 4 * t, n = r - e.sigBytes % r, i = n << 24 | n << 16 | n << 8 | n, o = [], c = 0; c < n; c += 4) o.push(i);
                    var s = a.create(o, n);
                    e.concat(s)
                },
                unpad: function(e) {
                    var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                    e.sigBytes -= t
                }
            },
            p = (r.BlockCipher = f.extend({
                cfg: f.cfg.extend({
                    mode: l,
                    padding: d
                }),
                reset: function() {
                    f.reset.call(this);
                    var e = this.cfg,
                        t = e.iv,
                        r = e.mode;
                    if (this._xformMode == this._ENC_XFORM_MODE) var n = r.createEncryptor;
                    else {
                        n = r.createDecryptor;
                        this._minBufferSize = 1
                    }
                    this._mode = n.call(r, this, t && t.words)
                },
                _doProcessBlock: function(e, t) {
                    this._mode.processBlock(e, t)
                },
                _doFinalize: function() {
                    var e = this.cfg.padding;
                    if (this._xformMode == this._ENC_XFORM_MODE) {
                        e.pad(this._data, this.blockSize);
                        var t = this._process(!0)
                    } else {
                        t = this._process(!0);
                        e.unpad(t)
                    }
                    return t
                },
                blockSize: 4
            }), r.CipherParams = n.extend({
                init: function(e) {
                    this.mixIn(e)
                },
                toString: function(e) {
                    return (e || this.formatter).stringify(this)
                }
            })),
            v = (t.format = {}).OpenSSL = {
                stringify: function(e) {
                    var t = e.ciphertext,
                        r = e.salt;
                    if (r) var n = a.create([1398893684, 1701076831]).concat(r).concat(t);
                    else n = t;
                    return n.toString(c)
                },
                parse: function(e) {
                    var t = c.parse(e),
                        r = t.words;
                    if (1398893684 == r[0] && 1701076831 == r[1]) {
                        var n = a.create(r.slice(2, 4));
                        r.splice(0, 4), t.sigBytes -= 16
                    }
                    return p.create({
                        ciphertext: t,
                        salt: n
                    })
                }
            },
            y = r.SerializableCipher = n.extend({
                cfg: n.extend({
                    format: v
                }),
                encode: function(e, t, r, n) {
                    n = this.cfg.extend(n);
                    var i = e.createEncryptor(r, n),
                        o = i.finalize(t),
                        c = i.cfg;
                    return p.create({
                        ciphertext: o,
                        key: r,
                        iv: c.iv,
                        algorithm: e,
                        mode: c.mode,
                        padding: c.padding,
                        blockSize: e.blockSize,
                        formatter: n.format
                    })
                },
                decode: function(e, t, r, n) {
                    return n = this.cfg.extend(n), t = this._parse(t, n.format), e.createDecryptor(r, n).finalize(t.ciphertext)
                },
                _parse: function(e, t) {
                    return "string" == typeof e ? t.parse(e, this) : e
                }
            }),
            g = (t.kdf = {}).OpenSSL = {
                execute: function(e, t, r, n) {
                    n || (n = a.random(8));
                    var i = s.create({
                            keySize: t + r
                        }).compute(e, n),
                        o = a.create(i.words.slice(t), 4 * r);
                    return i.sigBytes = 4 * t, p.create({
                        key: i,
                        iv: o,
                        salt: n
                    })
                }
            },
            _ = r.PasswordBasedCipher = y.extend({
                cfg: y.cfg.extend({
                    kdf: g
                }),
                encode: function(e, t, r, n) {
                    var i = (n = this.cfg.extend(n)).kdf.execute(r, e.keySize, e.ivSize);
                    n.iv = i.iv;
                    var o = y.encode.call(this, e, t, i.key, n);
                    return o.mixIn(i), o
                },
                decode: function(e, t, r, n) {
                    n = this.cfg.extend(n), t = this._parse(t, n.format);
                    var i = n.kdf.execute(r, e.keySize, e.ivSize, t.salt);
                    return n.iv = i.iv, y.decode.call(this, e, t, i.key, n)
                }
            })
    }(),
    function() {
        var e = EncryptionLink,
            t = e.lib.BlockCipher,
            r = e.algo,
            f = [],
            u = [],
            h = [],
            l = [],
            d = [],
            p = [],
            v = [],
            y = [],
            g = [],
            _ = [];
        ! function() {
            for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
            var r = 0,
                n = 0;
            for (t = 0; t < 256; t++) {
                var i = n ^ n << 1 ^ n << 2 ^ n << 3 ^ n << 4;
                i = i >>> 8 ^ 255 & i ^ 99, f[r] = i;
                var o = e[u[i] = r],
                    c = e[o],
                    s = e[c],
                    a = 257 * e[i] ^ 16843008 * i;
                h[r] = a << 24 | a >>> 8, l[r] = a << 16 | a >>> 16, d[r] = a << 8 | a >>> 24, p[r] = a;
                a = 16843009 * s ^ 65537 * c ^ 257 * o ^ 16843008 * r;
                v[i] = a << 24 | a >>> 8, y[i] = a << 16 | a >>> 16, g[i] = a << 8 | a >>> 24, _[i] = a, r ? (r = o ^ e[e[e[s ^ o]]], n ^= e[e[n]]) : r = n = 1
            }
        }();
        var m = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
            n = r.AES = t.extend({
                _doReset: function() {
                    for (var e = this._key, t = e.words, r = e.sigBytes / 4, n = 4 * ((this._nRounds = r + 6) + 1), i = this._keySchedule = [], o = 0; o < n; o++)
                        if (o < r) i[o] = t[o];
                        else {
                            var c = i[o - 1];
                            o % r ? 6 < r && o % r == 4 && (c = f[c >>> 24] << 24 | f[c >>> 16 & 255] << 16 | f[c >>> 8 & 255] << 8 | f[255 & c]) : (c = f[(c = c << 8 | c >>> 24) >>> 24] << 24 | f[c >>> 16 & 255] << 16 | f[c >>> 8 & 255] << 8 | f[255 & c], c ^= m[o / r | 0] << 24), i[o] = i[o - r] ^ c
                        }
                    for (var s = this._invKeySchedule = [], a = 0; a < n; a++) {
                        o = n - a;
                        if (a % 4) c = i[o];
                        else c = i[o - 4];
                        s[a] = a < 4 || o <= 4 ? c : v[f[c >>> 24]] ^ y[f[c >>> 16 & 255]] ^ g[f[c >>> 8 & 255]] ^ _[f[255 & c]]
                    }
                },
                encryptBlock: function(e, t) {
                    this._doCryptBlock(e, t, this._keySchedule, h, l, d, p, f)
                },
                decryptBlock: function(e, t) {
                    var r = e[t + 1];
                    e[t + 1] = e[t + 3], e[t + 3] = r, this._doCryptBlock(e, t, this._invKeySchedule, v, y, g, _, u);
                    r = e[t + 1];
                    e[t + 1] = e[t + 3], e[t + 3] = r
                },
                _doCryptBlock: function(e, t, r, n, i, o, c, s) {
                    for (var a = this._nRounds, f = e[t] ^ r[0], u = e[t + 1] ^ r[1], h = e[t + 2] ^ r[2], l = e[t + 3] ^ r[3], d = 4, p = 1; p < a; p++) {
                        var v = n[f >>> 24] ^ i[u >>> 16 & 255] ^ o[h >>> 8 & 255] ^ c[255 & l] ^ r[d++],
                            y = n[u >>> 24] ^ i[h >>> 16 & 255] ^ o[l >>> 8 & 255] ^ c[255 & f] ^ r[d++],
                            g = n[h >>> 24] ^ i[l >>> 16 & 255] ^ o[f >>> 8 & 255] ^ c[255 & u] ^ r[d++],
                            _ = n[l >>> 24] ^ i[f >>> 16 & 255] ^ o[u >>> 8 & 255] ^ c[255 & h] ^ r[d++];
                        f = v, u = y, h = g, l = _
                    }
                    v = (s[f >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & l]) ^ r[d++], y = (s[u >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & f]) ^ r[d++], g = (s[h >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & u]) ^ r[d++], _ = (s[l >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & h]) ^ r[d++];
                    e[t] = v, e[t + 1] = y, e[t + 2] = g, e[t + 3] = _
                },
                keySize: 8
            });
        e.AES = t._createHelper(n)
    }();
