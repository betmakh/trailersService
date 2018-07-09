import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';
import RefreshIcon from '@material-ui/icons/Refresh';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import SearchField from './components/SearchField.jsx';
import FilmsList from './components/FilmsList.jsx';
import TrailerModal from './components/TrailerModal.jsx';
import { searchFilms } from './utils/filmsAPI';

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmsData: null,
            trailerId: '',
            isModalOpen: false,
            isLoading: false,
            searchQuery: '',
            page: 1
        };
        this.updateQuery = _.debounce(this.updateQuery.bind(this), 300);
        this.openTrailerModal = this.openTrailerModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    updateQuery(query) {
        if (query && query.trim().length > 2) {
            this.setState({
                searchQuery: query,
                isLoading: true,
                filmsData: null,
                page: 1
            });
            this.requestMovies(query, 1);
        }
    }
    requestMovies(query = this.state.searchQuery, page = this.state.page) {
        this.setState({
            isLoading: true
        });
        searchFilms(query, page).then(data => {
            var { filmsData } = this.state;

            if (filmsData && data.Search && filmsData.Search && filmsData.Search.length) {
                filmsData.Search = filmsData.Search.concat(data.Search);
            } else {
                filmsData = data;
            }
            this.setState({ filmsData, isLoading: false });
        });
    }
    loadMore() {
        var page = this.state.page + 1;
        this.setState({ page });
        this.requestMovies(undefined, page);
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
        var { filmsData, searchQuery, isLoading } = this.state;
        var totalResults = filmsData && Number(filmsData.totalResults);
        var showMoreButton = null;
        if (filmsData && filmsData.Search && totalResults > filmsData.Search.length) {
            showMoreButton = (
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Button onClick={this.loadMore.bind(this)} variant="contained" color="primary" size="large">
                        Load more results <RefreshIcon />
                    </Button>
                </Grid>
            );
        }
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
                        {!isLoading && totalResults ? (
                            <Typography variant="display1" gutterBottom>
                                Total movies found: {totalResults}
                            </Typography>
                        ) : (
                            searchQuery &&
                            !isLoading && (
                                <Typography variant="display2" gutterBottom>
                                    No movies found
                                </Typography>
                            )
                        )}
                        <FilmsList filmsData={filmsData && filmsData.Search} openTrailer={this.openTrailerModal} />
                        {isLoading && <LinearProgress variant="query" />}
                    </Grid>
                    {showMoreButton}
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
