# Saiku UI Plugin Boilerplate [![Build Status](https://travis-ci.org/brenopolanski/saiku-plugin-boilerplate.svg?branch=master)](https://travis-ci.org/brenopolanski/saiku-plugin-boilerplate)

<img src="https://raw.githubusercontent.com/brenopolanski/saiku-plugin-boilerplate/gh-assets/saiku-plugin-boilerplate.png" alt="Saiku UI Plugin Boilerplate" align="right" />

### A jump-start for Saiku UI plugins development

[Saiku](http://www.meteorite.bi/saiku) is an open source analytics client developed by [meteorite](http://www.meteorite.bi/). A user interface for the analytical tool.

This project won't seek to provide a perfect solution to every possible pattern, but will attempt to cover a simple template for beginners and above.

## Usage

1. Include **NamePlugin** folder in:

	
  ```
  ├── saiku-ui/
  │   └── js/
  │       └── saiku/
  │           └── plugins/
  │               └── NamePlugin/
  │                   └── image/
  │                       └── plugin.png
  │                   └── plugin.js
  ```

2. Edit the file saiku-ui/index.html, insert the code below:

	```html
	<script type="text/javascript" src="js/saiku/plugins/NamePlugin/plugin.js" defer></script>
	```
	> look for ***Saiku plugins*** comment in index.html.
	
## Contributing

Check [CONTRIBUTING.md](https://github.com/brenopolanski/saiku-plugin-boilerplate/blob/master/CONTRIBUTING.md) for more information.

## History

For detailed changelog, check [Releases](https://github.com/brenopolanski/saiku-plugin-boilerplate/releases).

## Credits

I gratefully acknowledge the following open source projects:

* [Saiku UI](https://github.com/OSBI/saiku-ui) - A user interface for the Saiku analytical tool (Apache license version 2).
* [Saiku Chart Plus](https://github.com/it4biz/SaikuChartPlus) - Create other types of charts and maps based on Saiku Project, Highcharts and Google Maps. (Apache license version 2).

## License

[MIT License](https://brenopolanski.mit-license.org/) © Breno Polanski
