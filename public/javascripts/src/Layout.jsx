import React from 'react';
// import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import SearchField from './components/SearchField.jsx';
import FilmsList from './components/FilmsList.jsx';
import { searchFilms } from './utils/filmsAPI';

// import { withStyles } from '@material-ui/core/styles';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmsList: []
        };
        this.updateQuery = _.debounce(this.updateQuery.bind(this), 300);
    }
    updateQuery(query) {
        console.log('query', query);
        if (query && query.trim().length > 2) {
            searchFilms(query).then(data => this.setState({ filmsList: data.Search }));
        }
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <SearchField onUpdateQuery={this.updateQuery} />
                    </Grid>
                    <Grid item xs={12}>
                        <FilmsList filmsData={this.state.filmsList} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Layout;
