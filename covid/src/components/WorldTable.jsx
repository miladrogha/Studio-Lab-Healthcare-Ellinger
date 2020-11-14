import React from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

class WorldTable extends React.Component {
	constructor(props) {
		super(props);
		this.tableRef = React.createRef();
	}
	state = {
		stats: [],
		loading: false
	};

	getMuiTheme = () =>
		createMuiTheme({
			overrides: {
				MUIDataTable: {
					root: {
						backgroundColor: 'inherit'
					},
					paper: {
						boxShadow: 'none'
					}
				},
				MUIDataTableBodyCell: {
					root: {
						backgroundColor: 'none'
					}
				}
			}
		});

	componentDidMount() {
		this.setState({ loading: true });
		fetch('https://corona.lmao.ninja/v2/countries') //data source
			.then((response) => response.json())
			.then((res) => {
				this.setState({ stats: res, loading: false }, () => console.log(res));
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<React.Fragment>
				<div style={{ marginLeft: '5px', marginRight: '5px' }}>
					<br />

					<MuiThemeProvider theme={this.getMuiTheme()}>
						<MUIDataTable
							title={
								<h6 style={{ float: 'left', color: '#3f51b5' }}>Data Explorer</h6>
							}
							isLoading={this.state.loading}
							columns={[
								{
									name: 'country',
									label: 'Country',
									options: {
										filter: true,
										sort: true
									}
								},
								{
									name: 'cases',
									label: 'Total Cases',
									options: {
										filter: true,
										sort: false
									}
								},
								{
									name: 'todayCases',
									label: 'Current Cases',
									options: {
										filter: true,
										sort: false
									}
								},
								{
									name: 'deaths',
									label: 'Total Deaths',
									options: {
										filter: true,
										sort: false
									}
								},
								{
									name: 'todayDeaths',
									label: 'Current Deaths',
									options: {
										filter: true,
										sort: false
									}
								},
								{
									name: 'recovered',
									label: 'Recovered Patients',
									options: {
										filter: true,
										sort: false
									}
								},
								{
									name: 'active',
									label: 'Active Cases',
									options: {
										filter: true,
										sort: false
									}
								},
								{
									name: 'critical',
									label: 'Critical Patients',
									options: {
										filter: true,
										sort: false
									}
								}
							]}
							data={this.state.stats}
							options={{
								filter: true,

								rowHover: true,
								downloadOptions: { filename: 'CovidData.csv', separator: ',' },
								filterType: 'dropdown',
								selectableRows: true,
								responsive: 'stacked',
								tableBodyHeight: '300px',
								rowsPerPageOptions: [ 5, 10, 15 ]
							}}
						/>
					</MuiThemeProvider>
				</div>
			</React.Fragment>
		);
	}
}

export default WorldTable;
