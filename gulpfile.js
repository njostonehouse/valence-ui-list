var gulp = require( 'gulp' ),
	del = require( 'del' ),
	vui = require( 'vui-helpers' );

console = process.stderr;

gulp.task( 'clean', function( cb ) {
	del([ 'list.css' ], ['test/output'], cb);
} );

gulp.task( 'css', function () {
	return vui.makeCss( 
		'list.css.less',
		'list.css',
		{ 'lintOpts' : '.csslintrc' }
	);
} );

gulp.task( 'default', [ 'clean' ], function() {
	gulp.start( 'css' );
} );

gulp.task( 'test', function () {
	return vui.test( {
		files: [
			'test/**/*Spec.js',
			'list.css'
		],
		directivesPreprocess: {
			flags: {
				'js' : { ER_GEN: true }
			}
		}		
	} ) ;
} );

gulp.task( 'ergen', function() {
	return vui.test(
			'test/karma.conf.js',
			'test/listSpec.js',
			'*.css'
		);
});