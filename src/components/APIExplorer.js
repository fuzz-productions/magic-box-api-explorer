import React from 'react';
import ResourceActions from '../actions/ResourceActionCreators';
import APIExplorerActions from '../actions/APIExplorerActions';
import APIExplorerStore from '../stores/APIExplorerStore';
import Includes from './api-explorer/Includes';
import Filters from './api-explorer/Filters';
import ResourcePicker from './api-explorer/ResourcePicker';
import JSONViewer from './api-explorer/JSONViewer';
import Sorting from './api-explorer/Sorting';
import Paginator from './api-explorer/Paginator';

let MortarJS = require('../bootstrap').MortarJS;
let Br = MortarJS.require('components', 'Form', 'Checkbox', 'Row', 'Column');
let FormStore = MortarJS.Stores.FormStore;

class APIExplorer extends React.Component {
	getResourceAction(resource) {
		return new ResourceActions(resource);
	}

	setResource(resource) {
		APIExplorerActions.setResource(resource);
		this.requestData('listResource');
	}

	refreshData() {
		this.requestData('listResource');
	}

	componentWillMount() {
		this.setResource(this.props.defaultResource);

		APIExplorerStore.addChangeListener(this._onChange.bind(this));
		FormStore.addChangeListener(this._formChanges.bind(this));
	}

	componentWillUnmount() {
		APIExplorerStore.removeChangeListener(this._onChange.bind(this));
		FormStore.removeChangeListener(this._formChanges.bind(this));
	}

	_onChange() {
		this.forceUpdate();
	}

	_formChanges() {

	}

	requestData(method) {
		this.getResourceAction(APIExplorerStore.getResource())[method](APIExplorerStore.getOptions());
	}

	render() {
		let resource = APIExplorerStore.getResource();
		return (
			<section id="api-explorer" className="section">
				<div className="container">

					<Br.Row>
						<Br.Column grid="md" size="12" className="wow fadeIn">
							<div className="section-head">
								<h2 className="heading light-gray">Magic Box API Explorer</h2>
								<h4>
									<span className="sub-heading light-gray">
										Query the FuzzPro CrubClub™ API
								</span>
								</h4>
							</div>
						</Br.Column>
					</Br.Row>

					<Br.Row>
						<Br.Row>
							<ResourcePicker resource={resource} refreshData={this.refreshData.bind(this)} schema={this.props.schema} />
						</Br.Row>

						<Br.Row>
							<Br.Column grid="md" size="5" className="">
								<Filters resource={resource} refreshData={this.refreshData.bind(this)} schema={this.props.schema} />
							</Br.Column>

							<Br.Column grid="md" size="5" classes="col-md-offset-1">
								<Br.Row>
									<Sorting resource={resource} refreshData={this.refreshData.bind(this)} schema={this.props.schema} />
								</Br.Row>
							</Br.Column>
						</Br.Row>

						<br />

						<Br.Row>
							<Br.Column grid="md" size="8" className="">
								<JSONViewer />
								<Paginator resource={resource} refreshData={this.refreshData.bind(this)} schema={this.props.schema} />
							</Br.Column>

							<Br.Column grid="md" size="4" className="">
								<br />
								<Includes resource={resource} refreshData={this.refreshData.bind(this)} schema={this.props.schema} />
							</Br.Column>

							<Br.Column grid="md" size="4" classes="col-md-offset-1">
								<br/>
								<Br.Row>

								</Br.Row>
							</Br.Column>
						</Br.Row>
					</Br.Row>
				</div>
			</section>
		);
	}
}

APIExplorer.propTypes = {
	schema         : React.PropTypes.object.isRequired,
	defaultResource: React.PropTypes.string.isRequired
};

APIExplorer.defaultProps = {
	schema: {}
};

export default APIExplorer;