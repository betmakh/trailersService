import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const YOUTUBE_VIDEO_PREFIX = 'https://www.youtube.com/embed/';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4
    }
});

class TrailerModal extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.handleClose = this.handleClose.bind(this);
    // }

    render() {
        const { classes, isModalOpen, videoId, handleClose } = this.props;

        return (
            <Modal
                aria-labelledby="Trailer"
                aria-describedby="Modal with movie trailer video"
                open={isModalOpen}
                onClose={handleClose}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    {isModalOpen && (
                        <iframe
                            width="100%"
                            height="315"
                            src={YOUTUBE_VIDEO_PREFIX + videoId}
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    )}
                    <Typography variant="title" id="modal-title">
                        Text in a modal
                    </Typography>
                    <Typography variant="subheading" id="simple-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </div>
            </Modal>
        );
    }
}

TrailerModal.propTypes = {
    classes: PropTypes.object.isRequired,
    videoId: PropTypes.string.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
};

const TrailerModalStyled = withStyles(styles)(TrailerModal);

export default TrailerModalStyled;
