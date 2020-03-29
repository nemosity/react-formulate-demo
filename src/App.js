import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.scss';

import ReactFormulateForm from './containers/ReactFormulateForm';

import sample1 from './mocks/schemas/sample_1.json';
import sample2 from './mocks/schemas/sample_2.json';
import { updateSchema } from './actions/schemaActions';
import { clearForm } from './actions/formActions';
import MaterialUI from './components/MaterialUI';

const { Button, Textarea } = MaterialUI;

class App extends Component {

  componentDidMount() {
    this.props.onSchemaUpdate(JSON.stringify(sample1, null, 4))
  }

  renderProgressBar() {
    let parsedSchema;
    let valid;
    try {
      parsedSchema = JSON.parse(this.props.schema);
      valid = true;
    }
    catch (e) {
      valid = false;
    }
    if (valid && parsedSchema.config.paginated) {
      return (
        <div className="progress rounded-0">
          <div className="progress-bar" role="progressbar" style={{ width: `${(this.props.form.step + 1) / parsedSchema.schema.length * 100}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="http://nemosity.github.io">
            <img src={logo} width="40" height="40" className="d-inline-block align-top App-logo" alt="logo" />
            <span className="navbar-brand mb-0 h1">React Formulate</span>
          </a>
          <span className="navbar-brand mb-0">v0.0.2</span>
        </nav>
        {this.renderProgressBar()}
        <div className="App">
          <div className="container">
            <div className="row">
            <div className="col">
                <div>
                  <h2>{(this.props.valid && this.props.parsedSchema.config.name) || 'Dynamic Form'}</h2>
                </div>
                <div className="dynamic-form">
                  <ReactFormulateForm />
                </div>
              </div>
              <div className="col">
                <div className="content-panel">
                  <h2>Schema</h2>
                  <div className="code">
                    <Textarea
                      id="textarea"
                      rows={8}
                      onChange={this.props.onSchemaUpdate}
                      value={this.props.schema}
                    />
                  </div>
                  <div className="buttonGroup">
                    <Button tracking="eg1" onClick={() => this.props.onSchemaUpdate(JSON.stringify(sample1, null, 4))} primary="true">
                      ONLINE QUOTE
                    </Button>
                    <Button name="eg2" onClick={() => this.props.onSchemaUpdate(JSON.stringify(sample2, null, 4))} primary="true">
                      ONLINE CLAIM
                    </Button>
                  </div>
                </div>
                <div className="content-panel">
                  <div className="">
                    <h2>Generated Payload</h2>
                  </div>
                  <div className="code">
                    <Textarea
                      id="formoutput"
                      rows={8}
                      value={JSON.stringify(this.props.form.input, null, 4)}
                      readOnly
                    />
                  </div>
                  <div className="buttonGroup">
                    <Button tracking="clearForm" onClick={() => this.props.onClearForm()} primary="true">
                      Reset Form
                  </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ form, schema }) => ({
  form,
  schema: schema.rawSchema,
  parsedSchema: schema.parsedSchema,
  valid: schema.valid
});

const mapDispatchToProps = dispatch => ({
  onSchemaUpdate: (value) => dispatch(updateSchema(value)),
  onClearForm: () => dispatch(clearForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)
