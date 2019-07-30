import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';

import { moveBack, submit, updateForm, validateForm, validateElement } from '../actions/formActions';
import { DynamicForm } from '@nemosity/react-formulate';
import { StatefulDynamicForm } from '@nemosity/react-formulate';

import Progress from '../components/MaterialUI/Progress';

import components from '../utils/componentMapMaterialUI';

const { Button } = components;

class ChromaDynamicForm extends Component {

  renderAlert = () => (
    <div id="successLozenge" icon="icon__attention" type={this.props.valid ? 'success' : 'warning'} className="u-mar-b--3" inline >
      <p>{this.props.valid ? 'Valid schema' : 'Enter a valid schema or select a schema to load'}</p>
    </div>
  )
  render() {

    if (!this.props.valid) {
      return this.renderAlert();
    }

    if (this.props.schema.config.paginated) {
      return (
        <div className="form-container">
          <Progress steps={this.props.schema.schema.map(page => page.pageId)} activeStep={this.props.step} />
          <ReactCSSTransitionGroup transitionName="background" transitionEnterTimeout={700} transitionLeaveTimeout={1}>
            {this.props.schema.schema.map((page, i) => {
              if (this.props.step === i) {
                return (
                  <div className="form-slide">
                    <DynamicForm
                      schema={page.content}
                      data={this.props.form}
                      onUpdate={this.props.onUpdateForm}
                      errors={this.props.errors}
                      onValidateElement={this.props.onValidateElement}
                      widgets={components}
                      config={this.props.schema.config || {}}
                      i18n={(label, params = {}) => `${label}: ${JSON.stringify(params)}`}
                    />
                    <div className="buttonGroup">
                      <Button tracking="eg1" onClick={() => this.props.onMoveBack()} variant="outlined" disabled={this.props.step - 1 < 0}>
                        Back
                      </Button>
                      <Button name="eg2" onClick={() => this.props.onValidateForm(this.props.step)} primary disabled={this.props.step + 1 > this.props.schema.schema.length - 1}>
                        Next
                      </Button>
                    </div>
                  </div>
                )
              } else {
                return null;
              }
            }
            )}
          </ReactCSSTransitionGroup>
        </div>
      )
    }

    return (
      <div className="form-container">
        <StatefulDynamicForm
          schema={this.props.schema.schema}
          data={this.props.form}
          errors={this.props.errors}
          onSubmit={this.props.onSubmit}
          widgets={components}
          config={this.props.schema.config || {}}
        />
      </div>
    );
  };
}

const mapStateToProps = ({ form, schema }) => {
  return {
    errors: form.errors,
    form: form.input,
    step: form.step,
    schema: schema.parsedSchema,
    valid: schema.valid
  }
};

const mapDispatchToProps = dispatch => ({
  onUpdateForm: (path, data) => dispatch(updateForm({ path, data })),
  onMoveBack: step => dispatch(moveBack(step)),
  onValidateForm: step => dispatch(validateForm(step)),
  onValidateElement: (schema, path) => dispatch(validateElement({ schema, path })),
  onSubmit: (data) => dispatch(submit(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChromaDynamicForm);
