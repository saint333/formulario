import { connect } from 'react-redux';
import {
  deleteElement,
  deleteUiOrder,
  deleteWidget
} from '../actions';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

// TODO:
// Move inline css to styles file
// fix delete icon position in form title
// show only form title

const FieldTemplate = props => {
  const {
    id,
    label,
    required,
    description,
    children,
    formContext,
    deleteElement,
    deleteUiOrder,
    deleteWidget,
    formId
  } = props;

  const element = id.split('_');
  const elementId = element[1];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}
      >
        {id !== 'root' && (
          <>
            <label>
              {label} {required ? '*' : null}
            </label>
            <div>
              <Link
                to={`/formbuilder/${formId}/${formContext.idPrefix}/${elementId}`}
              >
                <i className='fas fa-edit'></i>
              </Link>
              <>
                <i
                  onClick={() => {
                    deleteElement(elementId, formContext.idPrefix);
                    deleteUiOrder(elementId, formContext.idPrefix);
                    deleteWidget(elementId, formContext.idPrefix);
                  }}
                  className='fas fa-trash-alt'
                ></i>
              </>
            </div>
          </>
        )}
      </div>
      {children}
      {id !== 'root' && description}
    </>
  );
};

FieldTemplate.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  description: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  deleteElement: PropTypes.func.isRequired,
  deleteUiOrder: PropTypes.func.isRequired,
  deleteWidget: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formId: state.form.id
});

// export default connect(null, { deleteElement })(CanvasElementTemplate);

// Add a wrapped to return a class component to prevent warning
// Source: https://github.com/rjsf-team/react-jsonschema-form/issues/1309
var ReduxWrapped = connect(mapStateToProps, {
  deleteElement,
  deleteUiOrder,
  deleteWidget
})(FieldTemplate);
class FieldTemplateWrapper extends React.Component {
  render() {
    return <ReduxWrapped {...this.props} />;
  }
}
export default FieldTemplateWrapper;
