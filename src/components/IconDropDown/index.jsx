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
	};
	perRow = 5;
	updateByKey = false;
	forceUpdateScroll = false;
	componentDidMount() {
		this.setDataAtChangeData();
		this.setScrollTop( this.state.paged );

		if ( this.searchBox !== undefined ) {
			this.searchBox.focus();
		}
	}
	setScrollTop( paged ) {
		if ( this.scrollContainer !== undefined ) {
			this.scrollContainer.scrollTop = paged * 50;

			// if ( this.state.maxPaged === paged ) {
			// 	this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
			// }
		}
	}
	componentDidUpdate( prevProps, prevState ) {
		if ( ( prevState.paged !== this.state.paged && this.forceUpdateScroll ) || ( this.forceUpdateScroll && ( this.state.paged === 0 || this.state.paged === 1 || this.state.paged === 2 ) ) ) {
			this.setScrollTop( this.state.paged );
			this.forceUpdateScroll = false;
		}
		if ( this.props.iconValue !== prevProps.iconValue && this.updateByKey ) {
			this.setDataAtChangeData();
			this.updateByKey = false;
		}
	}
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
	setDataAtChangeData() {
		const { iconValue } = this.props;
		const perRow = this.perRow;
		let paged = 0;
		let iconIndex = false;
		const icons = this.getIconsAfterFilter( true );
		let maxPaged = parseInt( icons.length / perRow );
		maxPaged = icons.length % perRow ? maxPaged + 1 : maxPaged;
		maxPaged -= 6;
		maxPaged = maxPaged < 0 ? 0 : maxPaged;

		icons.some( ( icon, iconId ) => {
			if ( icon === iconValue ) {
				iconIndex = iconId;
				paged = parseInt( iconId / perRow ) - 2;
				return true;
			}

			return false;
		} );

		paged = paged > 0 ? paged : 0;
		paged = paged > maxPaged ? maxPaged : paged;

		this.setState( {
			paged,
			iconIndex,
			maxPaged,
		} );
		this.forceUpdateScroll = true;
	}
	render() {
		const { iconValue, onChange, getIconByData } = this.props;

		return (
			<div className="kit-icons-dropdown">
				<div className="kit-icon-picker-header">
					<input
						type="text"
						value={ this.state.search }
						ref={ ( el ) => this.searchBox = el }
						className="kit-icon-picker-search"
						placeholder="Search Icon..."
						onKeyDown={ () => {
						} }
						onKeyUp={ ( e ) => {
							if ( this.state.search !== e.target.value ) {
								this.setScrollTop( 0 );
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
						ref={ ( el ) => this.scrollContainer = el }
						onScroll={ ( e ) => {
							let paged = parseInt( ( e.target.scrollTop / 50 ) - 0.4 );
							if ( paged === -0 ) {
								paged = 0;
							}

							this.setState( {
								paged,
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
												<button
													className="kit-icon-inner"
													onClick={ ( e ) => {
														e.preventDefault();

														onChange( icon );
													} }>
													<div className="kit-icon-picker-icon">
														{ getIconByData( 'class', icon ) }
													</div>
												</button>
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
