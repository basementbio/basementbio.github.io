---
layout: default
title: null
breadcrumbs: false
toc: false
---

<section class="hero">
  <h1>{{ site.title }}</h1>
  <p class="hero__tagline">{{ site.tagline }}</p>
  <p class="section-lead">{{ site.description }}</p>
  <p><a class="hero__cta" href="{{ '/experiments/' | relative_url }}">Browse the work →</a></p>
</section>

## Featured work

A selection of recent experiments and builds. Browse the full galleries from the sidebar.

{% assign featured = site.experiments | concat: site.products | where: "featured", true | sort: "date" | reverse %}
{% if featured.size > 0 %}
{% include gallery.html items=featured %}
{% else %}
{% assign recent = site.experiments | concat: site.products | sort: "date" | reverse %}
{% include gallery.html items=recent %}
{% endif %}

## Explore

<div class="cards">
  <a class="card" href="{{ '/experiments/' | relative_url }}">
    <div class="card__body">
      <h3 class="card__title">🔬 Experiments</h3>
      <p class="card__desc">Documented science experiments — setups, methods, results, and photos.</p>
    </div>
  </a>
  <a class="card" href="{{ '/products/' | relative_url }}">
    <div class="card__body">
      <h3 class="card__title">🛠️ Products</h3>
      <p class="card__desc">Things I've designed and built — hardware, software, and everything between.</p>
    </div>
  </a>
  <a class="card" href="{{ '/about/' | relative_url }}">
    <div class="card__body">
      <h3 class="card__title">👋 About</h3>
      <p class="card__desc">Background, skills, and how to get in touch.</p>
    </div>
  </a>
</div>
