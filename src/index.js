/**
 * Internal dependencies
 */
import KitIconPicker from './components/KitIconPicker';

// TODO: Add custom scrollbar.
// TODO: Add Events options.
// TODO: Add position system.

export default ( element, options ) => {
	if ( typeof element === 'string' ) {
		element = document.querySelector( element );
	} else if ( ! ( element instanceof HTMLElement ) ) {
		return;
	}

	const iconPicker = new KitIconPicker( element, options );

	element.kitIconPicker = iconPicker;

	return iconPicker;
};
