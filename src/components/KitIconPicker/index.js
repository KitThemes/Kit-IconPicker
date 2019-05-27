/**
 * External dependencies
 */
import { h, render } from 'preact';

/**
 * Internal dependencies
 */
import IconPicker from '../IconPicker';

class KitIconPicker {
	defaultOptions = {
		default: '',
		icons: [],
		position: 'auto',
		popoverWidth: 272,
		events: {
			change: null,
			init: null,
		},
	};
	options = {};
	#initDone = false;
	element = null;
	#iconValue = '';
	#setValue = null;
	constructor( element, options ) {
		this.options = Object.assign( {}, this.defaultOptions, options );
		this.element = element;
		this.#iconValue = this.options.default;

		this.init();
	}
	init() {
		if ( this.#initDone === true ) {
			return false;
		}

		render( <IconPicker options={ this.options } setValue={ this.#setValueCB } element={ this.element } />, this.element );
		this.#initDone = true;

		return true;
	}
	#setValueCB = ( callback ) => {
		this.#setValue = callback;
	}
	destroy() {
		const Nothing = () => null;
		render( <Nothing />, this.element, this.element.children[ 0 ] );
		this.#initDone = false;
	}
	value( newValue, force = false ) {
		if ( newValue === undefined ) {
			return this.#iconValue;
		}

		this.#setValue( newValue, force );
	}
}

export default KitIconPicker;
