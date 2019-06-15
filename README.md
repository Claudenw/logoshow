This is a script and html page to display logos and project info from http://apache.org/logos

## Setup

Run the `update.py` script to download the data from http://apache.org/logos.  The script must be run before the first loading of index.html

    python update.py

## Display the page

Load the `index.html` file in a browser and it will cycle through the logos and some information about the project.

 * Only projects with logos will be displayed.
 * Logos will be scaled to fit the screen if necessary.

## Update 

The update.py script may be run at any time to update the data from http://apache.org/logos.  It may be run while the page is being displayed.

## Changing the display

 * The length of display can be changed by changing the `await sleep(15000);` in `rs/base.js`.  The value is in milliseconds and the default is 15 seconds.
 * The positioning and other HTML attributes may be changed by editiong the `style.css` file.
 * 