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

		if ( ! filterOnly ) {
			filteredIcons = [
				...filteredIcons.slice( start, end ),
			];
		}

		return filteredIcons;
	}
	getIconByData( type = 'class', icon ) {
		switch ( type ) {
			case 'class':
				return <i className={ icon }></i>;
		}
	}
	heightOfIcons() {
		const icons = this.getIconsAfterFilter( true ).length;

		console.log( icons );

		let rows = Math.round( icons / this.perRow );
		if ( icons % this.perRow ) {
			rows++;
		}

		return rows * 50;
	}
	render() {
		return (
			<div className="kit-icons-dropdown">
				<div className="kit-icon-picker-header">
					<input
						type="text"
						className="bb-icon-picker-search"
						placeholder="Search Icon..."
						onKeyDown={ () => {
						} }
						onChange={ () => {
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
										return (
											<li key={ icon }>
												<div className="kit-icon-inner">
													<div className="kit-icon-picker-icon">
														{ this.getIconByData( 'class', icon ) }
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
