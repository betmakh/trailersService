import React from 'react';
// import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
    }
    onInput(event) {
        // this.setState({
        //     query: event.target.value
        // });

        this.props.onUpdateQuery(event.target.value);
    }
    render() {
        return <TextField label="Search movie" onChange={this.onInput.bind(this)} margin="normal" />;
    }
}

SearchField.propTypes = {
    onUpdateQuery: PropTypes.func
};

export default SearchField;
