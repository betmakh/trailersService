import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
    }
    onInput(event) {
        this.props.onUpdateQuery(event.target.value);
    }
    render() {
        return <TextField fullWidth label="Search movie" onChange={this.onInput.bind(this)} margin="normal" />;
    }
}

SearchField.propTypes = {
    onUpdateQuery: PropTypes.func
};

export default SearchField;
