import React, { Fragment } from 'react';
import JSONPretty from 'react-json-prettify';
import { github } from 'react-json-prettify/dist/themes';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const SchemaViewer = ({ form }) => {
    console.log(form);
    return (
        <Fragment>
            <div id="json-viewer" className="well">
                <fieldset>
                    <legend>JSON Schema</legend>
                    <JSONPretty json={form} theme={github} padding={1} />
                </fieldset>
            </div>
        </Fragment>
    )
};


SchemaViewer.propTypes = {
    form: PropTypes.any.isRequired
};

// const mapStateToProps = (state) => ({
//     form: state.form
// });

// export default connect(mapStateToProps)(SchemaViewer);
export default SchemaViewer;
