import React from 'react';
// import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';

import SearchField from './components/SearchField.jsx';
import FilmsList from './components/FilmsList.jsx';
import TrailerModal from './components/TrailerModal.jsx';
import { searchFilms } from './utils/filmsAPI';

// import { withStyles } from '@material-ui/core/styles';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmsList: [],
            trailerId: '',
            isModalOpen: false
        };
        this.updateQuery = _.debounce(this.updateQuery.bind(this), 300);
        this.openTrailerModal = this.openTrailerModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    updateQuery(query) {
        if (query && query.trim().length > 2) {
            searchFilms(query).then(data => this.setState({ filmsList: data }));
        }
    }
    openTrailerModal(id) {
        return () => {
            console.log('id', id);
            console.log('this', this);
            this.setState({ trailerId: id, isModalOpen: true });
        };
    }
    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        return (
            <div>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <SearchField onUpdateQuery={this.updateQuery} />
                    </Grid>
                    <Grid item xs={12}>
                        <FilmsList filmsData={this.state.filmsList} openTrailer={this.openTrailerModal} />
                    </Grid>
                </Grid>
                <TrailerModal
                    videoId={this.state.trailerId}
                    isModalOpen={this.state.isModalOpen}
                    handleClose={this.closeModal}
                />
            </div>
        );
    }
}

export default Layout;
