import React from 'react';
// import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MovieIcon from '@material-ui/icons/Movie';

const styles = theme => ({
    poster: {
        maxWidth: '100%',
        height: 300
    },
    iconSpace: {
        marginLeft: theme.spacing.unit
    },
    paperBlock: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    }
});

class FilmsContainer extends React.Component {
    render() {
        const { classes, openTrailer, filmsData } = this.props;
        return (
            <div>
                {filmsData && filmsData.length ? (
                    filmsData.map(filmData => (
                        <Paper key={filmData.imdbID} className={classes.paperBlock}>
                            <Grid container spacing={24}>
                                <Grid item xs={4}>
                                    <img
                                        className={classes.poster}
                                        src={filmData.Poster.replace(/^N\/A$/i, '/images/noposter.jpg')}
                                        alt="Poster"
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="display1" gutterBottom>
                                        {filmData.Title}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {filmData.Rated} | {filmData.Runtime} | {filmData.Genre} | {filmData.Released} ({filmData.Country})
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {filmData.Year}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {filmData.Plot}
                                    </Typography>
                                    <br />
                                    {filmData.trailer ? (
                                        <Button
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            onClick={openTrailer(filmData.trailer.id.videoId)}
                                        >
                                            Watch trailer
                                            <MovieIcon className={classes.iconSpace} />
                                        </Button>
                                    ) : (
                                        'No trailer'
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="display2" gutterBottom>
                        No movies found
                    </Typography>
                )}
            </div>
        );
    }
}

FilmsContainer.propTypes = {
    filmsData: PropTypes.array,
    openTrailer: PropTypes.func.isRequired,
    classes: PropTypes.object
};

export default withStyles(styles)(FilmsContainer);
