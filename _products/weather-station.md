---
title: "ESP32 Weather Station"
date: 2024-08-20
featured: true
intro: "A solar-powered weather station logging temperature, humidity, and pressure to the cloud."
thumbnail: /assets/img/placeholder-product.svg
status: "In use"
tools: [ESP32, BME280 sensor, solar panel, LiPo battery, 3D-printed enclosure]
tags: [electronics, IoT, firmware]
link: "https://github.com/your-username/weather-station"
link_label: "Source on GitHub"
images:
  - src: /assets/img/placeholder-product.svg
    alt: "Assembled weather station mounted outdoors"
    caption: "Deployed unit with solar panel and vented enclosure."
  - src: /assets/img/placeholder-product.svg
    alt: "Internal electronics before assembly"
    caption: "ESP32 + BME280 wired on a custom perfboard."
---

## Overview

Replace with your project write-up. This station wakes periodically, reads the
BME280 sensor, publishes over Wi-Fi, then deep-sleeps to conserve power.

## Features

- Solar + LiPo power with deep-sleep between readings
- Publishes to an MQTT broker / cloud dashboard
- Custom 3D-printed, vented, weatherproof enclosure

## Build notes

Describe the wiring, firmware highlights, power budget, and lessons learned.
Link to the repo above and add your own build photos.
