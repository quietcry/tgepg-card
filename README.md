[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
# EPG-Card for Home Assistant as frontend for Klaus Schmidingers VDR
works together with tgvdr-integration https://github.com/quietcry/tgvdr.git
***


* @published: March 2024
* @author: Thomas Geißenhöner
* @workspace: `conf/www/tgepg-card`

this is a very early version! Please be beware.

## Prerequisites

* a running VDR 
* the tgvdr integration

## Basic Configuration (manual)

```yaml
type: custom:tgepg-card
entity: <epg-sensor (e.g sensor.vdr_epg_info)>
```
a lot (at the moment) undocumented configurations are available or planned 


