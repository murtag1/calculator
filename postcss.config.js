function compare(a, b) {
	a = a.match(/\d+/ig);
	b = b.match(/\d+/ig);
	if (a && b) {
		if (+a[0] > +b[0]) return -1;
  	if (+a[0] < +b[0]) return 1;
	}
}

module.exports = {
	plugins: [
		require('autoprefixer'),
		require('css-mqpacker')({
			sort: compare,
		}),
		require('cssnano')({
			preset: [
				'default', {
					discardComments: {
						removeAll: true,
					}
				}
			]
		})
	]
}