# Tennis Court Reservation System v2

*React SPA, PHP 7, MySQL*

*License: AGPL*

🇺🇸 Free, modern, open source tennis court reservation system that works on any cheap web-hosting plan.

🇩🇪 Kostenloses, modernes, Open Source Tennisplatz Reservierungssystem, das mit jedem günstigen Web-Hosting Anbieter funktioniert.



## Languages / Sprachen

* [x] German / Deutsch
* [ ] English (planned)

## Demo

[https://adroste.github.io/tennis-court-reservation-system-v2/client/demo/](https://adroste.github.io/tennis-court-reservation-system-v2/client/demo/)

&nbsp;

# 🇩🇪

## Funktionen

* Kiosk Modus
* // todo

## Systemanforderungen

* Web-Server (Apache, nginx, ...)
* PHP 7
* MySQL Datenbank

## Datenverbrauch im Kioskmodus

Im Kioskmodus wird die Tabelle mit den Reservierungen automatisch aktualisiert.
Im Regelfall ist eine solche Anfrage < 10kB. 
Das Zeitintervall für die Aktualisierungen kann manuell angegeben werden, indem der Kioskmodus mittels `/kiosk?update=x` aufgerufen wird. `x` gibt hierbei die Anzahl der Sekunden an. Der Standardwert ist eine Minute.

Beispiel (x=300): Bei einem Datentarif mit einer Taktung von 10kB ergibt sich für ein Aktualisierungsintervall von `x=300` (5 Minuten) ein Datenverbrauch von ca. 3MB pro Tag.

&nbsp;

# 🇺🇸

## Features

* Kiosk Mode
* // todo

## System requirements

* Web-Server (Apache, nginx, ...)
* PHP 7
* MySQL Database

&nbsp;

# Developer Notes

## notes

* Keine reservation reminder, Reservierungsbestätigungen sind ausreichend
* Keine Reservierungsbestätigungen an admins (unnötig)
* Storniert: wenn selbst storniert und wenn durch admin storniert
* loading indicator ggf mit antd message ersetzen

## todos

* [ ] Analytics
  * [ ] backend: create fingerprint by header + ip, change daily
  * [x] mark user count as predicted
  * [ ] count users
  * [x] configurable time view
  * [x] stats
    * [x] New reservation count
    * [x] reservation count
    * [x] views by page
    * [x] unique users / page views
    * [x] referrer
    * [x] browser
    * [x] os
    * [x] device
* [ ] .htaccess for client side routing
* [ ] password recovery
* [ ] test mail template button
* [x] bestehende reservierungen bei platzsperre stornieren (hinweis)
  * [ ] implementation
* [ ] datenschutz buttons unter mein benutzerkonto implementieren
* [ ] activity table backend
* [ ] trainer type
* [ ] 0 Uhr testen


### tables

reservations
{
  id auto_inc unique primary,
  from,
  to,
  groupId foreign_key(reservation_group.groupId),
  created,
}

reservation_group
{
  groupId auto_inc unique primary,
  courtId,
  userId,
  text,
  type,
}