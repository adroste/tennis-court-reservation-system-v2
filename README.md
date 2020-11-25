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

* [x] Cookie Notice
* [x] Legal Notice
* [x] Logos
* [x] Size + Code-Splitting
  * [x] react lazy for routes
* [x] Kiosk Mode
  * [x] Clock + Date
  * [x] URL + QR Code
  * [x] Auto day switch
  * [x] highlight current row
  * [ ] auto reload app context (announcements, courts)
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
* [x] Auto refresh reservation data (interval in useWeekReservations, ... hooks)
* [x] disabled dates for reservation < today
* [x] reservations days in advance (implement)
* [x] html editor switch
* [x] editor 16px font-size
* [x] replace antd typography heading
* [x] style h1 / h2 / h3 elements
* [x] navbar replace h1
* [x] my reservations page auto day switch
* [x] my reservations page check for date >= today
* [x] announcements
* [x] login
* [x] registration
* [x] registration step 2/confirm
* [ ] password recovery
* [x] loading gate for appcontext
* [x] login redirect to referrer
* [x] weekpicker fix outside tap
* [x] close sidedrawer on click
* [x] input font-size 16px
* [x] redirect to login on calendar item click
* [x] calendar item click: login required modal
* [x] demo mode
* [x] antd message for reservation successful, change, cancel, ...
* [x] admin cancel reservation => reason 
* [x] reset button for forms
* [x] groupdatesform check tooFarAhead and disabledDates
* [x] fix disabled announcement not showing
* [x] weekpicker => heute button
* [x] isEmpty check for templates
* [ ] test mail template button
* [x] user management sorting
* [x] show npm version
* [x] implement fetch/api routines
* [x] fix demo login button
* [x] fix demo notification overlapping cookie notice on mobile
* [x] bestehende reservierungen bei platzsperre stornieren (hinweis)
  * [ ] implementation
* [ ] datenschutz buttons unter mein benutzerkonto implementieren
* [ ] activity table backend
* [x] verified email state
* [x] set verified=false when changing email via myaccount
* [x] register: check for unique mail
* [x] make delete, put id based param
* [x] daytable loading state
* [x] consistent paths
* [x] reservation error handling
* [ ] week in url
* [x] max reservation count user
* [x] admin/general loop bug
* [x] court config better reason input
* [ ] disable court form/dialog
* [ ] announcement popup
* [ ] color my reservations in calendar
* [ ] better group dates form
* [ ] trainer type
* [x] diesen stornieren / alle zukünftigen stornieren dialog
* [ ] 0 Uhr testen
* [ ] set color global


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