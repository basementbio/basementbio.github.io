# Portfolio (Jekyll · GitHub Pages)

A personal portfolio for **science experiments** and **products**, styled to
look like the [GitHub Docs](https://docs.github.com) site — three-column docs
layout, left sidebar navigation tree, right "In this article" TOC, client-side
search, light/dark mode, and image lightboxes.

## Quick start (local preview)

```bash
bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000
```

## Make it yours

1. **`_config.yml`** — set `title`, `tagline`, `description`, `author`, `email`,
   the `social:` links, and the `url` / `baseurl` (see below).
2. **`about.md`** and **`contact.md`** — edit the copy.
3. Add your work (next section).

### URL config

- **User site** (repo named `your-username.github.io`):
  ```yaml
  url: "https://your-username.github.io"
  baseurl: ""
  ```
- **Project site** (repo named e.g. `portfolio`):
  ```yaml
  url: "https://your-username.github.io"
  baseurl: "/portfolio"
  ```

## Adding a project

Each project is one Markdown file. Drop it in `_experiments/` or `_products/`
and it automatically appears in the sidebar, the gallery, and search.

```markdown
---
title: "My Experiment"
date: 2025-01-15
featured: true                 # show on the home page
intro: "One-line summary."
thumbnail: /assets/img/my-experiment/thumb.jpg
status: "Complete"
tools: [thing one, thing two]
tags: [physics, DIY]
link: "https://..."            # optional external link
images:
  - src: /assets/img/my-experiment/1.jpg
    alt: "Description"
    caption: "Caption shown under the image."
---

## Overview
Write-up in Markdown…
```

## Adding images

1. Put your photos in `assets/img/<project-name>/`.
2. Reference them in the project's front matter (`thumbnail:` and `images:`).
3. Supported formats: JPG, PNG, WebP, SVG. The sample files use SVG placeholders
   in `assets/img/` — replace them with your real photos.

## How it deploys

Pushing to the default branch triggers the GitHub Actions workflow in
`.github/workflows/pages.yml`, which builds the site with Jekyll and publishes
it to GitHub Pages. In your repo: **Settings → Pages → Build and deployment →
Source → GitHub Actions**.

## Structure

```
_config.yml           Site config + navigation + collections
_experiments/         One .md per experiment
_products/            One .md per product
_layouts/             default.html, project.html
_includes/            header, sidebar, toc, breadcrumbs, footer, gallery
assets/css/style.css  GitHub-Docs-inspired styles (Primer tokens)
assets/js/site.js     Theme toggle, TOC, search, lightbox, mobile nav
assets/img/           Images (replace placeholders with your photos)
search.json           Generated search index
index.md              Home page
about.md, contact.md  Pages
```
