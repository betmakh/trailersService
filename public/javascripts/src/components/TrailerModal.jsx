import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { FacebookShareButton, TwitterShareButton, RedditShareButton, FacebookIcon, TwitterIcon } from 'react-share';

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
    shareWrapper: {
        textAlign: 'right'
    },
    shareButton: {
        display: 'inline-block',
        outline: 'none',
        marginLeft: theme.spacing.unit,
        cursor: 'pointer'
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4
    }
});

class TrailerModal extends React.Component {
    render() {
        var { classes, isModalOpen, videoId, handleClose } = this.props,
            videoURL = YOUTUBE_VIDEO_PREFIX + videoId;

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
                    <br />
                    <br />

                    <div className={classes.shareWrapper}>
                        <Typography variant="caption" gutterBottom>
                            Share trailer:
                        </Typography>
                        <FacebookShareButton url={videoURL} className={classes.shareButton}>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={videoURL} className={classes.shareButton}>
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>
                    </div>
                    <Button color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/*<RedditShareButton url={videoURL} />*/}
                    {/*<Button color="primary">Share trailer</Button>*/}
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
