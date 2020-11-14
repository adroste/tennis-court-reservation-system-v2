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

* [x] Cookie Notice
* [x] Legal Notice
* [x] Logos
* [ ] Size + Code-Splitting
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
* [ ] Auto refresh reservation data (interval in useWeekReservations, ... hooks)
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
* [x] weekpicker => heute button
* [x] isEmpty check for templates
* [ ] test mail template button
* [x] user management sorting
