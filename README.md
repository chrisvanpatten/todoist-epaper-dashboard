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

## License

Copyeright © 2025 Chris Van Patten. Licensed under the MIT license.
