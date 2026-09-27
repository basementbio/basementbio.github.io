(function () {
  "use strict";

  var root = document.documentElement;

  /* ---------- Theme toggle (light / dark / auto) ---------- */
  var THEME_KEY = "portfolio-theme";
  var saved = localStorage.getItem(THEME_KEY);
  if (saved) root.setAttribute("data-color-mode", saved);

  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-color-mode");
      // If auto, resolve to the opposite of what's currently shown.
      var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      var showingDark = current === "dark" || (current === "auto" && systemDark);
      var next = showingDark ? "light" : "dark";
      root.setAttribute("data-color-mode", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- Mobile sidebar ---------- */
  var menuBtn = document.querySelector("[data-menu-toggle]");
  var sidebar = document.querySelector("[data-sidebar]");
  var scrim = document.querySelector("[data-sidebar-scrim]");
  function closeSidebar() {
    if (sidebar) sidebar.classList.remove("is-open");
    if (scrim) scrim.classList.remove("is-open");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  }
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("is-open");
      if (scrim) scrim.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
    });
  }
  if (scrim) scrim.addEventListener("click", closeSidebar);

  /* ---------- Collapsible nav tree ---------- */
  document.querySelectorAll("[data-tree-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var group = btn.closest(".nav-tree__item--group");
      if (!group) return;
      var open = group.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- Build "In this article" TOC from headings ---------- */
  var tocNav = document.querySelector("[data-toc-nav]");
  var tocAside = document.querySelector("[data-toc]");
  var headings = Array.prototype.slice.call(
    document.querySelectorAll(".markdown-body h2, .markdown-body h3")
  );
  if (tocNav && headings.length) {
    headings.forEach(function (h) {
      if (!h.id) {
        h.id = h.textContent.trim().toLowerCase()
          .replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
      }
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      a.className = "toc--" + h.tagName.toLowerCase();
      a.addEventListener("click", closeSidebar);
      tocNav.appendChild(a);
    });

    // Scroll spy
    var links = Array.prototype.slice.call(tocNav.querySelectorAll("a"));
    var byId = {};
    links.forEach(function (l) { byId[l.getAttribute("href").slice(1)] = l; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          var active = byId[entry.target.id];
          if (active) active.classList.add("is-active");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px", threshold: 0 });
    headings.forEach(function (h) { observer.observe(h); });
  } else if (tocAside) {
    tocAside.style.display = "none";
  }

  /* ---------- Client-side search over search.json ---------- */
  var input = document.querySelector("[data-search-input]");
  var results = document.querySelector("[data-search-results]");
  var index = [];
  var indexLoaded = false;

  function loadIndex() {
    if (indexLoaded) return Promise.resolve();
    var base = (window.SITE_BASEURL || "");
    return fetch(base + "/search.json")
      .then(function (r) { return r.json(); })
      .then(function (data) { index = data; indexLoaded = true; })
      .catch(function () { indexLoaded = true; });
  }

  function render(matches) {
    if (!results) return;
    results.innerHTML = "";
    if (!matches.length) {
      results.innerHTML = '<li class="result__empty">No results found.</li>';
      results.hidden = false;
      return;
    }
    matches.slice(0, 8).forEach(function (m) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = m.url;
      a.innerHTML = '<span class="result__cat">' + (m.category || "Page") +
        '</span>' + m.title;
      li.appendChild(a);
      results.appendChild(li);
    });
    results.hidden = false;
  }

  function search(q) {
    q = q.trim().toLowerCase();
    if (!q) { if (results) results.hidden = true; return; }
    var matches = index.filter(function (item) {
      return (item.title + " " + (item.content || "") + " " + (item.tags || ""))
        .toLowerCase().indexOf(q) !== -1;
    });
    render(matches);
  }

  if (input) {
    input.addEventListener("focus", loadIndex);
    input.addEventListener("input", function () {
      loadIndex().then(function () { search(input.value); });
    });
    document.addEventListener("click", function (e) {
      if (results && !results.contains(e.target) && e.target !== input) {
        results.hidden = true;
      }
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { results.hidden = true; input.blur(); }
    });
  }

  /* ---------- Lightbox for gallery images ---------- */
  var modal = document.querySelector("[data-lightbox-modal]");
  var modalImg = document.querySelector("[data-lightbox-img]");
  var closeBtn = document.querySelector("[data-lightbox-close]");
  function openLightbox(src, alt) {
    if (!modal || !modalImg) return;
    modalImg.src = src; modalImg.alt = alt || "";
    modal.hidden = false;
  }
  function closeLightbox() { if (modal) modal.hidden = true; }
  document.querySelectorAll("[data-lightbox]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var img = link.querySelector("img");
      openLightbox(link.getAttribute("href"), img ? img.alt : "");
    });
  });
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (modal) modal.addEventListener("click", function (e) {
    if (e.target === modal) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();
