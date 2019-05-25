/**
 * External dependencies
 */
import { h, Component } from 'preact';

/**
 * Internal dependencies
 */
import './style.scss';

class IconDropDown extends Component {
	render() {
		return (
			<div className='kit-icons-dropdown'>
				<div className='kit-icon-picker-header'>
					<input
						type='text'
						className='bb-icon-picker-search'
						placeholder='Search Icon...'
						onKeyDown={ () => {
						} }
						onChange={ () => {
						} } />
				</div>
				<div className='kit-icon-dropdown-icons'>
					Icons
				</div>
			</div>
		);
	}
}

export default IconDropDown;
