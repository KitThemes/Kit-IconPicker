/**
 * External dependencies
 */
import { h, Component } from 'preact';

/**
 * Internal dependencies
 */
import './style.scss';

class IconDropDown extends Component {
	state = {
		paged: 0,
		currentCategory: 0,
		search: '',
		iconIndex: false,
		maxPaged: 0,
	}
	perRow = 5;
	getIconsAfterFilter( filterOnly = false ) {
		const { icons } = this.props;
		const numRow = 7;
		const start = this.state.paged * this.perRow;
		const end = start + ( this.perRow * numRow );

		let filteredIcons = [
			...icons,
		];

		const regExp = new RegExp( this.state.search );

		filteredIcons = filteredIcons.filter( ( icon ) => {
			if ( icon.match( regExp ) ) {
				return true;
			}

			return false;
		} );

		if ( ! filterOnly ) {
			filteredIcons = [
				...filteredIcons.slice( start, end ),
			];
		}

		return filteredIcons;
	}
	heightOfIcons() {
		const icons = this.getIconsAfterFilter( true ).length;

		let rows = Math.round( icons / this.perRow );
		if ( icons % this.perRow ) {
			rows++;
		}

		return rows * 50;
	}
	render() {
		const { iconValue, onChange, getIconByData } = this.props;

		return (
			<div className="kit-icons-dropdown">
				<div className="kit-icon-picker-header">
					<input
						type="text"
						value={ this.state.search }
						className="kit-icon-picker-search"
						placeholder="Search Icon..."
						onKeyDown={ () => {
						} }
						onKeyUp={ ( e ) => {
							if ( this.state.search !== e.target.value ) {
								this.setState( {
									search: e.target.value,
									paged: 0,
								} );
							}
						} } />
				</div>
				<div className="kit-icon-dropdown-icons-wrap">
					<div
						className="kit-icon-dropdown-icons"
						onScroll={ ( e ) => {
							this.setState( {
								paged: parseInt( ( e.target.scrollTop / 50 ) - 0.4 ),
							} );
						} }>
						<div
							className="kit-icon-dropdown-icons-inner"
							style={ {
								height: ( this.heightOfIcons() - ( this.state.paged * 50 ) ) + 'px',
							} }>
							<ul style={ {
								marginTop: ( this.state.paged * 50 ) + 'px',
							} }>
								{
									this.getIconsAfterFilter().map( ( icon ) => {
										const isSelected = ( icon === iconValue );
										return (
											<li key={ icon } className={ `${ isSelected ? 'kit-icon-selected' : '' }` }>
												<div
													className="kit-icon-inner"
													onClick={ ( e ) => {
														e.preventDefault();

														onChange( icon );
													} }>
													<div className="kit-icon-picker-icon">
														{ getIconByData( 'class', icon ) }
													</div>
												</div>
											</li>
										);
									} )
								}
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default IconDropDown;
