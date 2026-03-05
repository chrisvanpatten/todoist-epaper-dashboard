# Todoist E-Paper Dashboard

A simple Next.js application which connects to the Todoist API and formats your
todo list so it can be displayed on an 800x480px e-paper display, such as the
[Seeed Studio reTerminal E10001](https://www.seeedstudio.com/reTerminal-E1001-p-6534.html).

The layout is a rough imitation of Todoist's
["Upcoming" view](https://www.todoist.com/inspiration/todoist-upcoming-view),
optimized for clean display on a monochrome e-paper screen. There is minimal
use of color, and typography was carefully designed to ensure readability and
clarity on the reTerminal's relatively low DPI display.

I use emoji in my Todoist project names and tasks, however the SenseCraft web
environment (Headless Chrome running on Linux) does not support emoji natively.
I have set up a React implementation of Twemoji to solve for this use-case,
with the important caveat that the emoji imagery is not optimized for black and
white displays.

## Use

Add your personal API token from Todoist's
[Developer settings](https://app.todoist.com/app/settings/integrations/developer)
screen in the `.env` file.

Install the npm dependencies, then run `npm run dev` to start the dev server.

Deploy to the infrastructure of your choice, then enter your URL in SenseCraft
HMI's "web" mode. The refresh in SenseCraft HMI can be set to as low as 5
minutes.

> Note: the display will fully refresh at your configured interval, even if the
> page data has not changed. Hopefully this is addressed in future software
> updates, but it is a limitation of the platform, not this dashboard.

## Custom screenshots and ESPHome deployment

You can also capture your own screenshots and send them to your E10001 by using
the included screenshot script to capture the images and flashing your E10001
with ESPHome and leveraging the "download_image" module to display the image on
your device.

This README will not cover the ESPHome portion as it can be device-specific.
However, to get your screenshots captured, simply call the screenshot.sh shell
script on a recurring basis from `cron`. This will cause the image to be updated
and served out of Next.js, by placing the image asset in the public directory
of Next.js.

```
*/1 * * * * ~/code/epaper-dashboard/src/scripts/screenshot.sh >> ~/code/epaper-dashboard/screenshot.log 2>&1
```

## License

Copyright © 2025 Chris Van Patten. Licensed under the MIT license.
