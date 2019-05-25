/**
 * External dependencies
 */
import { h, render } from 'preact';
/**
 * Internal dependencies
 */
import IconPicker from './components/IconPicker';

export default ( element, options ) => {
	if ( typeof element === 'string' ) {
		element = document.querySelector( element );
	} else if ( element instanceof HTMLElement ) {
	} else {
		return;
	}

	render( <IconPicker />, element );
};
