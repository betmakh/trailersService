import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import LinearProgress from '@material-ui/core/LinearProgress';

import SearchField from './components/SearchField.jsx';
import FilmsList from './components/FilmsList.jsx';
import TrailerModal from './components/TrailerModal.jsx';
import { searchFilms } from './utils/filmsAPI';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmsList: null,
            trailerId: '',
            isModalOpen: false,
            isLoading: false
        };
        this.updateQuery = _.debounce(this.updateQuery.bind(this), 300);
        this.openTrailerModal = this.openTrailerModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    updateQuery(query) {
        if (query && query.trim().length > 2) {
            this.setState({
                isLoading: true
            });
            searchFilms(query).then(data => this.setState({ filmsList: data, isLoading: false }));
        }
    }
    openTrailerModal(id) {
        return () => {
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
                        {' '}
                        <Typography variant="display3" gutterBottom>
                            Search movie trailers here!
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <SearchField onUpdateQuery={this.updateQuery} />
                    </Grid>
                    <Grid item xs={12}>
                        {this.state.isLoading ? (
                            <LinearProgress variant="query" />
                        ) : (
                            <FilmsList filmsData={this.state.filmsList} openTrailer={this.openTrailerModal} />
                        )}
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
