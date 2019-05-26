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
		document.addEventListener( 'click', this.clickOutside );
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
