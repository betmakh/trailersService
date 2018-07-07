import React from 'react';
// import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    poster: {
        maxWidth: '100%',
        height: 300
    },
    paperBlock: {
        padding: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit
    }
});

class FilmsContainer extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                {this.props.filmsData ? (
                    this.props.filmsData.map(filmData => (
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
                                    <Typography variant="body1" gutterBottom>
                                        {filmData.Year}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))
                ) : (
                    <Typography variant="display3" gutterBottom>
                        No movies found
                    </Typography>
                )}
            </div>
        );
    }
}

FilmsContainer.propTypes = {
    filmsData: PropTypes.array,
    classes: PropTypes.object
};

export default withStyles(styles)(FilmsContainer);
