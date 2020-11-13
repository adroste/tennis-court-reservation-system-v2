# Reservierungssystem Tennis v2

*License: AGPL*

Reservation system for tennis courts. Only german at the moment.

# Notes

* I did not use a condensed font for the reservation table cause they are hard to read

# devnotes

* Keine reservation reminder, Reservierungsbestätigungen sind ausreichend
* Keine Reservierungsbestätigungen an admins (unnötig)
* Storniert: wenn selbst storniert und wenn durch admin storniert

# Features

* Kiosk Modus with auto refresh, auto day switch

# Todos

* [ ] Cookie Notice
* [ ] Legal Notice
* [x] Logos
* [ ] Size + Code-Splitting
* [ ] Kiosk Mode
  * [ ] Clock + Date
  * [ ] URL + QR Code
  * [ ] Auto refresh / Auto day switch
* [ ] Analytics
  * [ ] backend: create fingerprint by header + ip, change daily
  * [ ] mark user count as predicted
  * [ ] count users
  * [ ] get geolocation
  * [ ] configurable time view
  * [ ] stats
    * [ ] New reservation count
    * [ ] reservation count
    * [ ] views by page
    * [ ] unique users / page views
    * [ ] referrer
    * [ ] browser
    * [ ] os
    * [ ] device
* [ ] .htaccess for client side routing
* [x] disabled dates for reservation < today
* [x] reservations days in advance (implement)
* [ ] html editor switch
* [ ] editor 16px font-size
* [x] replace antd typography heading
* [x] style h1 / h2 / h3 elements
* [x] navbar replace h1
* [x] my reservations page auto day switch
* [x] my reservations page check for date >= today
* [x] announcements
* [x] login
* [x] registration
* [ ] registration step 2/confirm
* [ ] password recovery
* [x] loading gate for appcontext
* [x] login redirect to referrer
* [x] weekpicker fix outside tap
* [x] close sidedrawer on click
* [x] input font-size 16px
* [x] redirect to login on calendar item click
* [x] calendar item click: login required modal
* [ ] demo mode
* [ ] antd message for reservation successful, change, cancel, ...
* [ ] admin cancel reservation => reason 
* [x] reset button for forms
* [x] groupdatesform check tooFarAhead and disabledDates
* [x] fix disabled announcement not showing
* [ ] weekpicker => heute button
