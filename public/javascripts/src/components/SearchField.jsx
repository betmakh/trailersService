import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import PropTypes from 'prop-types';

const styles = theme => ({
    suggest: {
        marginRight: theme.spacing.unit
    }
});

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: ''
        };
    }
    onInput(event) {
        this.setState({ searchValue: event.target.value });
        this.props.onUpdateQuery(event.target.value);
    }
    searchSuggestion(value) {
        this.setState({ searchValue: value });
        this.props.onUpdateQuery(value);
    }
    render() {
        var { corrections, classes } = this.props;
        return (
            <div>
                <TextField
                    value={this.state.searchValue}
                    fullWidth
                    label="Search movie"
                    onChange={this.onInput.bind(this)}
                    margin="normal"
                />
                {corrections && corrections.length ? (
                    <div>
                        {corrections.map(val => (
                            <Chip
                                className={classes.suggest}
                                label={val}
                                key={val}
                                onClick={() => {
                                    this.searchSuggestion(val);
                                }}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        );
    }
}

SearchField.propTypes = {
    onUpdateQuery: PropTypes.func,
    classes: PropTypes.object,
    corrections: PropTypes.array
};

export default withStyles(styles)(SearchField);
