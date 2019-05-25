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
	state ={
		open: false,
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
	render() {
		return (
			<div className='kit-icon-picker' ref={ ( el ) => this.container = el }>
				<button onClick={ this.togglePicker }>Icon</button>
				{
					this.state.open &&
					<IconDropDown />
				}
			</div>
		);
	}
}

export default IconPicker;
