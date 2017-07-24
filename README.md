# wp_gulp
Gulp installation with wordpress and xampp

### Installation
`npm install`

### Gulpfile
The gulpfile is pretty straight forward. So far, what I change is the url for static and dev servers.

### Serve Static
##### Currently not working - check next section
This task will serve a **static server** in your browser with browser-sync. This has nothing to do with your wordpress site. You can design your site in php (or html) like you would normally (by linking styles and javascript etc in your html/php files).
However, you would need to change a thing or two (depending on your work) in the `gulp.task('serverstatic')`.

1. Change the url to your site
  * `proxy: 'localhost/link-to-your-sitefolder/wp-content/themes/your-theme-name/'`
  *  **Note:** I added `wp-content/themes/` because this is what keeps the server static.
2. Add HTML watcher
  * `gulp.watch('./*.html').on('change', browserSync.reload)`
3. Change folder hierarchy how it suites you

### Serve Dev
This task will be the one which connects your with xampp server. To customize according to your needs, follow the following instructions:

1. Change the url to your site
  * `proxy: "localhost/link-to-your/sitefolder/",`
2. Change the port (default is 80)
  * `port: 80`
3. Change the folder hierarchy


### Copyright(c) 2017, Mali Naeemi

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

Source: [ISC](http://opensource.org/licenses/ISC)
