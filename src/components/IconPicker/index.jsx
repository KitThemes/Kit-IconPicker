/**
 * External dependencies
 */
import { h, Component } from 'preact';
/**
 * Internal dependencies
 */
import IconDropDown from '../IconDropDown';
import './style.scss';

class IconPicker extends Component {
	state = {
		open: false,
		iconValue: null,
	}
	componentDidMount() {
		const { options, element } = this.props;

		document.addEventListener( 'click', this.clickOutside );

		if ( typeof options.events.init === 'function' ) {
			try {
				options.events.init( element );
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( error );
			}
		}
	}
	componentWillUnmount() {
		document.removeEventListener( 'click', this.clickOutside );
	}
	clickOutside = ( e ) => {
		if ( ! this.container || ! this.container.contains( e.target ) ) {
			this.setState( {
				open: false,
			} );
		}
	}
	togglePicker = () => {
		this.setState( ( state ) => ( {
			open: ! state.open,
		} ) );
	}
	onChange = ( icon ) => {
		const { options } = this.props;

		if ( typeof options.events.change === 'function' ) {
			try {
				options.events.change( icon );
			} catch ( error ) {
				// eslint-disable-next-line no-console
				console.error( error );
			}
		}

		this.setState( {
			iconValue: icon,
			open: false,
		} );
	}
	getIconByData( type = 'class', icon ) {
		switch ( type ) {
			case 'class':
				return <i className={ icon }></i>;
		}
	}
	render() {
		const { options } = this.props;

		return (
			<div className="kit-icon-picker" ref={ ( el ) => this.container = el }>
				<button
					onClick={ this.togglePicker }
					ref={ ( el ) => this.iconHolder = el }
					type="button"
					className="kit-icon-holder">
					{
						this.getIconByData( 'class', this.state.iconValue )
					}
				</button>
				{
					this.state.open &&
					<IconDropDown
						iconValue={ this.state.iconValue }
						icons={ [
							'',
							...options.icons,
						] }
						popoverWidth={ options.popoverWidth }
						onChange={ this.onChange }
						getIconByData={ this.getIconByData }
						iconHolder={ this.iconHolder }
						popoverPos={ options.position } />
				}
			</div>
		);
	}
}

export default IconPicker;
