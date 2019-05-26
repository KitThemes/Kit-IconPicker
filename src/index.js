/**
 * External dependencies
 */
import { h, render } from 'preact';
/**
 * Internal dependencies
 */
import IconPicker from './components/IconPicker';

// TODO: Add custom scrollbar.
// TODO: Add Events options.
// TODO: Add position system.

export default ( element, options ) => {
	if ( typeof element === 'string' ) {
		element = document.querySelector( element );
	} else if ( ! ( element instanceof HTMLElement ) ) {
		return;
	}

	const defaultOptions = {
		icons: [],
		position: 'auto',
		popoverWidth: 272,
		events: {
			change: null,
			init: null,
		},
	};

	options = Object.assign( {}, defaultOptions, options );

	render( <IconPicker options={ options } />, element );
};
