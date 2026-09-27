---
layout: default
title: Contact
intro: Get in touch — I'm happy to talk about experiments, builds, or collaborations.
permalink: /contact/
toc: false
---

## Reach me

<table>
  <tbody>
    <tr><th scope="row">Email</th><td><a href="mailto:{{ site.email }}">{{ site.email }}</a></td></tr>
    {% if site.social.github %}<tr><th scope="row">GitHub</th><td><a href="https://github.com/{{ site.social.github }}">@{{ site.social.github }}</a></td></tr>{% endif %}
    {% if site.social.linkedin %}<tr><th scope="row">LinkedIn</th><td><a href="https://www.linkedin.com/{{ site.social.linkedin }}">linkedin.com/{{ site.social.linkedin }}</a></td></tr>{% endif %}
    {% if site.social.twitter %}<tr><th scope="row">X / Twitter</th><td><a href="https://twitter.com/{{ site.social.twitter }}">@{{ site.social.twitter }}</a></td></tr>{% endif %}
    {% if site.social.scholar %}<tr><th scope="row">Google Scholar</th><td><a href="{{ site.social.scholar }}">Profile</a></td></tr>{% endif %}
    {% if site.social.orcid %}<tr><th scope="row">ORCID</th><td><a href="https://orcid.org/{{ site.social.orcid }}">{{ site.social.orcid }}</a></td></tr>{% endif %}
  </tbody>
</table>

<div class="note" markdown="1">
**Note:** Fill in your links in `_config.yml` under `social:` and `email:`. Rows only
appear when the value is set, so leave the ones you don't use blank.
</div>
