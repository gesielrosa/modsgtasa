// https://www.minifier.org/

var distPageNo,
    postLabel,
    isIndex,
    pgnMemo = { t: "2.1.0", g: -1, o: null },
    pgnUtils = {
        p: function (e, n) {
            for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
            return e;
        },
        i: function (e) {
            e = e.replace(/[\[\]]/g, "\\$&");
            var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)"),
                e = window.location.href,
                e = n.exec(e);
            return e ? (e[2] ? decodeURIComponent(e[2].replace(/\+/g, " ")) : "") : null;
        },
        l: function (e, n) {
            setTimeout(console[e].bind(console, n));
        },
        u: function (e, n) {
            pgnMemo.o && 4 !== pgnMemo.o.readyState && pgnMemo.o.abort(),
                (pgnMemo.o = new XMLHttpRequest()),
                pgnMemo.o.open("GET", e, !0),
                (pgnMemo.o.onreadystatechange = function () {
                    4 === pgnMemo.o.readyState && "function" == typeof n && n(pgnMemo.o.status, pgnMemo.o.responseText);
                }),
                pgnMemo.o.send(null);
        },
    },
    cdtPgn = {
        m: function (e) {
            (e = e.feed.entry[0]),
                (e = encodeURIComponent(e.published.$t.replace(/\.\d+/, ""))),
                (e = isIndex ? "/search?updated-max=" + e + "&page=" + distPageNo + "&max-results=" + perPage : "/search/label/" + postLabel + "?updated-max=" + e + "&page=" + distPageNo + "&max-results=" + perPage);
            location.href = e;
        },
        N: function (e) {
            e = parseInt(e.feed.openSearch$totalResults.$t);
            e <= perPage || currentPageNo > Math.ceil(e / perPage) ? pgnFns.P("") : (pgnSettings.updateTitle && 1 < currentPageNo && (document.title += " -  " + pgnSettings.text_page + " " + currentPageNo), pgnFns.S(e));
        },
        v: {
            selector: "blog-pager",
            text_page: "páginas",
            text_of: "de",
            perPage: 6,
            showPageOf: !1,
            showNav: !0,
            showNavPrev: !0,
            showNavNext: !0,
            showNavFirst: false,
            showNavLast: false,
            navPrevContent: "<i class=\"fas fa-angle-left\"></i>",
            navNextContent: "<i class=\"fas fa-angle-right\"></i>",
            navFirstContent: "<i class=\"fas fa-angle-double-left\"></i>",
            navLastContent: "<i class=\"fas fa-angle-double-right\"></i>",
            showEllipsis: !0,
            showLastPage: !0,
            ellipsis: "...",
            updateTitle: !1,
        },
    },
    pgnSettings = pgnUtils.p(cdtPgn.v, void 0 !== window.paginationConfig ? paginationConfig : {}),
    locationURL = window.location.href,
    currentPageNo = 1,
    perPage = pgnSettings.perPage,
    pgnFns = {
        P: function (e) {
            var n = document.getElementById(pgnSettings.selector);
            if ((n && ((n.innerHTML = e), n.setAttribute("data-loaded", "1")), "" !== e))
                for (var t = n.querySelectorAll("a[data-page]"), a = 0; a < t.length; a++)
                    !(function () {
                        var n = t[a];
                        n.addEventListener("click", function (e) {
                            e.preventDefault();
                            e = n.getAttribute("data-page");
                            isNaN(e) || isNaN(parseFloat(e)) ? pgnUtils.l("error", "data-page is not a page number") : pgnFns.h(parseInt(e));
                        });
                    })();
        },
        U: function () {
            if ((setTimeout(console.log.bind(console, "⚡ %ccdt-pagination", "color: #3074d4;", pgnMemo.t)), !document.getElementById(pgnSettings.selector))) return pgnUtils.l("error", pgnSettings.selector + " id not found"), !1;
            var e,
                n = !pgnUtils.i("q"),
                t = -1 === locationURL.indexOf("archive.html"),
                a = !/\d{4}\/(?!lebal\/hcraes)/.test(locationURL.split("").reverse().join(""));
            n && t && a
                ? (pgnUtils.i("page") && (currentPageNo = parseInt(pgnUtils.i("page")) || 1),
                    (e =
                        -1 === locationURL.indexOf("/search/label/")
                            ? ((isIndex = !0), (perPage = parseInt(pgnUtils.i("max-results")) || perPage), "/feeds/posts/summary?max-results=1&alt=json")
                            : ((isIndex = !1),
                                (perPage =
                                    1 < locationURL.split("?").length
                                        ? ((postLabel = locationURL.substring(locationURL.indexOf("/search/label/") + 14, locationURL.indexOf("?"))), parseInt(pgnUtils.i("max-results")) || 20)
                                        : ((postLabel = locationURL.substring(locationURL.indexOf("/search/label/") + 14, locationURL.match(/\?|#|&|$/).index)), 20)),
                            "/feeds/posts/summary/-/" + postLabel + "?alt=json&max-results=1")),
                    pgnUtils.u(e, function (e, n) {
                        200 === e ? cdtPgn.N(JSON.parse(n)) : pgnUtils.l("log", n);
                    }))
                : (e = document.getElementById(pgnSettings.selector)) && e.setAttribute("data-loaded", "1");
        },
        S: function (e) {
            var n = "",
                t = Math.ceil(e / perPage);
            pgnSettings.showPageOf && (n += "<span class='showPageOf'>" + pgnSettings.text_page + " " + currentPageNo + " " + pgnSettings.text_of + " " + t + "</span>"),
            pgnSettings.showNav || (pgnSettings.showNavFirst = pgnSettings.showNavPrev = pgnSettings.showNavNext = pgnSettings.showNavLast = !1);
            for (var a = 1; a <= t; a++) {
                var s = {
                        a: !pgnSettings.showNavFirst && 1 === a,
                        b: !pgnSettings.showNavLast && pgnSettings.showLastPage && a === t,
                        c: currentPageNo < 6 && a < 6,
                        d: currentPageNo - 2 <= a && a <= currentPageNo + 2,
                        e: pgnSettings.showLastPage && t - 5 < currentPageNo && t - 5 < a,
                    },
                    g = s.a || s.b || s.c || s.d || s.e;
                pgnSettings.showNav &&
                1 === a &&
                (pgnSettings.showNavFirst &&
                5 < currentPageNo &&
                (n += isIndex
                    ? '<a class="pageNum pgnNav first" href="/">' + pgnSettings.navFirstContent + "</a>"
                    : '<a class="pageNum pgnNav first" href="/search/label/' + postLabel + "?max-results=" + perPage + '">' + pgnSettings.navFirstContent + "</a>"),
                pgnSettings.showNavPrev &&
                1 < currentPageNo &&
                (n +=
                    2 === currentPageNo
                        ? isIndex
                        ? '<a class="pageNum pgnNav prev" href="/">' + pgnSettings.navPrevContent + "</a>"
                        : '<a class="pageNum pgnNav prev" href="/search/label/' + postLabel + "?max-results=" + perPage + '">' + pgnSettings.navPrevContent + "</a>"
                        : '<a class="pageNum pgnNav prev" href="#" data-page="' + (currentPageNo - 1) + '">' + pgnSettings.navPrevContent + "</a>")),
                g &&
                (n +=
                    currentPageNo === a
                        ? '<span class="pageNum current">' + a + "</span>"
                        : 1 === a
                        ? isIndex
                            ? '<a class="pageNum" href="/">1</a>'
                            : '<a class="pageNum" href="/search/label/' + postLabel + "?max-results=" + perPage + '">1</a>'
                        : '<a class="pageNum" href="#" data-page="' + a + '">' + a + "</a>"),
                pgnSettings.showEllipsis &&
                ((s = 3 === a && !pgnSettings.showNavFirst && !g),
                    (g = a === t - 1 && pgnSettings.showLastPage && !pgnSettings.showNavLast && !g),
                (s || g) && (n += '<span class="pageNum delimiter"> ' + pgnSettings.ellipsis + " </span>")),
                pgnSettings.showNav &&
                a === t &&
                (pgnSettings.showNavNext && a !== currentPageNo && (n += '<a class="pageNum pgnNav next" href="#" data-page="' + (currentPageNo + 1) + '">' + pgnSettings.navNextContent + "</a>"),
                pgnSettings.showNavLast && currentPageNo < t - 4 && (n += '<a class="pageNum pgnNav last" href="#" data-page="' + t + '">' + pgnSettings.navLastContent + "</a>"));
            }
            pgnFns.P(n);
        },
        h: function (e) {
            pgnMemo.g !== e
                ? (pgnMemo.o && 4 !== pgnMemo.o.readyState && pgnMemo.o.abort(),
                    (pgnMemo.g = e),
                    (e = "&start-index=" + ((distPageNo = e) - 1) * perPage),
                    (e = isIndex ? "/feeds/posts/summary?max-results=1" + e + "&alt=json" : "/feeds/posts/summary/-/" + postLabel + "?max-results=1" + e + "&alt=json"),
                    pgnUtils.u(e, function (e, n) {
                        200 === e ? cdtPgn.m(JSON.parse(pgnMemo.o.responseText)) : (pgnUtils.l("log", "An error occurred"), (pgnMemo.g = -1));
                    }))
                : pgnUtils.l("log", "same request already loading");
        },
    };
pgnFns.U();
