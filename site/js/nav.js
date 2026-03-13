(function () {
  const nav = [
    { heading: "Develop" },
    { label: "Build and evaluate agentic systems", href: "/index.html" },
    { label: "Agentic AI overview", href: "/pages/overview.html", sub: true },
    { label: "Set up LLM access", href: "/pages/llm-setup.html", sub: true },
    { label: "Develop agentic systems", href: "/pages/develop.html", sub: true },
    { label: "Experiment Manager", href: "/pages/experiment.html", sub: true },
    { label: "Deploy agentic systems", href: "/pages/deploy.html", sub: true },
    { label: "Monitor agentic systems", href: "/pages/monitor.html", sub: true },
    { heading: "API Reference" },
    { label: "Python SDK: Agents", href: "/pages/sdk-reference.html" },
  ];

  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const basePath = document.querySelector("meta[name='base-path']");
  const base = basePath ? basePath.content : ".";

  const currentPath = window.location.pathname;

  let html = "";
  nav.forEach(function (item) {
    if (item.heading) {
      html += '<div class="sidebar-group"><div class="sidebar-heading">' + item.heading + "</div>";
      return;
    }
    const resolvedHref = base + item.href;
    const isActive = currentPath.endsWith(item.href) ||
      (item.href === "/index.html" && (currentPath.endsWith("/") || currentPath.endsWith("/index.html")));
    const cls = (item.sub ? "sub" : "") + (isActive ? " active" : "");
    html += '<a href="' + resolvedHref + '"' + (cls ? ' class="' + cls.trim() + '"' : "") + ">" + item.label + "</a>";
  });
  html += "</div>";
  sidebar.innerHTML = html;

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.closest(".tab-group");
      group.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      group.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      group.querySelector("#" + btn.dataset.tab).classList.add("active");
    });
  });
  // ─── Diff Mode Toggle ───
  var topbar = document.querySelector(".topbar");
  if (topbar && document.querySelectorAll(".changed").length > 0) {
    var rightSection = document.createElement("div");
    rightSection.className = "topbar-right";
    var btn = document.createElement("button");
    btn.className = "diff-toggle";
    btn.innerHTML = '<span class="diff-toggle-dot"></span>Diff mode';
    btn.addEventListener("click", function () {
      document.body.classList.toggle("diff-mode");
      btn.classList.toggle("active");
    });
    rightSection.appendChild(btn);
    topbar.appendChild(rightSection);
  }

  // ─── Change Tracking ───
  var tooltip = null;

  document.querySelectorAll(".changed").forEach(function (el) {
    var marker = document.createElement("div");
    marker.className = "change-marker";
    el.insertBefore(marker, el.firstChild);

    var tpl = el.querySelector("template.old-content");
    var label = el.getAttribute("data-change-label") || (tpl ? "Modified" : "New content");
    var oldHtml = tpl ? tpl.innerHTML.trim() : null;

    marker.addEventListener("mouseenter", function (e) {
      if (tooltip) tooltip.remove();
      tooltip = document.createElement("div");
      tooltip.className = "change-tooltip";
      var preview = "";
      if (oldHtml) {
        var tmp = document.createElement("div");
        tmp.innerHTML = oldHtml;
        preview = tmp.textContent.replace(/\s+/g, " ").trim();
        if (preview.length > 140) preview = preview.substring(0, 140) + "\u2026";
      }
      tooltip.innerHTML =
        '<div class="tt-label">' + label + "</div>" +
        (preview
          ? '<div class="tt-preview">' + preview + "</div>"
          : '<div class="tt-preview" style="color:#86EFAC">New content</div>') +
        '<div class="tt-hint">Click to view diff</div>';
      document.body.appendChild(tooltip);
      var r = marker.getBoundingClientRect();
      tooltip.style.left = r.right + 14 + "px";
      tooltip.style.top = r.top + "px";
      var tr = tooltip.getBoundingClientRect();
      if (tr.bottom > window.innerHeight - 8)
        tooltip.style.top = window.innerHeight - tr.height - 8 + "px";
      if (tr.right > window.innerWidth - 8)
        tooltip.style.left = r.left - tr.width - 14 + "px";
    });

    marker.addEventListener("mouseleave", function () {
      if (tooltip) { tooltip.remove(); tooltip = null; }
    });

    marker.addEventListener("click", function (e) {
      e.stopPropagation();
      if (tooltip) { tooltip.remove(); tooltip = null; }
      showDiff(label, oldHtml, getNewHtml(el));
    });
  });

  function getNewHtml(el) {
    var c = el.cloneNode(true);
    var m = c.querySelector(".change-marker");
    if (m) m.remove();
    var t = c.querySelector("template.old-content");
    if (t) t.remove();
    return c.innerHTML.trim();
  }

  function showDiff(label, oldHtml, newHtml) {
    var bd = document.createElement("div");
    bd.className = "diff-backdrop";
    var modal = document.createElement("div");
    modal.className = "diff-modal";
    var hdr =
      '<div class="diff-header"><div class="diff-header-text"><h3>Changes</h3>' +
      '<div class="diff-label">' + label + "</div></div>" +
      '<button class="diff-close">&times;</button></div>';
    var body;
    if (!oldHtml) {
      body =
        '<div class="diff-body">' +
        '<div class="diff-added-banner">This content is new &mdash; it does not exist in the current documentation.</div>' +
        '<div class="diff-added-content">' + newHtml + "</div></div>";
    } else {
      body =
        '<div class="diff-body"><div class="diff-columns">' +
        '<div class="diff-old"><div class="diff-col-header">Original</div><div class="diff-col-content">' + oldHtml + "</div></div>" +
        '<div class="diff-new"><div class="diff-col-header">Revised</div><div class="diff-col-content">' + newHtml + "</div></div>" +
        "</div></div>";
    }
    modal.innerHTML = hdr + body;
    bd.appendChild(modal);
    document.body.appendChild(bd);
    bd.addEventListener("click", function (e) { if (e.target === bd) bd.remove(); });
    modal.querySelector(".diff-close").addEventListener("click", function () { bd.remove(); });
    var esc = function (e) { if (e.key === "Escape") { bd.remove(); document.removeEventListener("keydown", esc); } };
    document.addEventListener("keydown", esc);
  }
})();
