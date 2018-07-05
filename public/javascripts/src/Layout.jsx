import React from 'react';
// import { render } from 'react-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/core/styles';

// class Layout extends React.Component {}

const Layout = () => (<div>        <Grid>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Paper>xs=12</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper>xs=12 sm=6</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper>xs=6 sm=3</Paper>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Paper>xs=6 sm=3</Paper>
                </Grid>
            </Grid>
        </Grid></div>);

// const styles = theme => ({
//     root: {
//         flexGrow: 1
//     },
//     paper: {
//         padding: theme.spacing.unit * 2,
//         textAlign: 'center',
//         color: theme.palette.text.secondary
//     }
// });

// var Layout  = () => (<b>asd</b>);

export default Layout;



// export default withStyles(styles)(Layout);