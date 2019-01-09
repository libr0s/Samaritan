import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';
import Button from "@material-ui/core/Button/Button";

const styles = theme => ({
    toolbarButtons: {
        marginLeft: 'auto',
        '& > a': {
            margin: theme.spacing.unit,
        }
      },
});

const LoginLink = (props) => <Link to="/login" {...props} />;
const AboutLink = (props) => <Link to="/about" {...props} />;
const ProfileLink = (props) => <Link to="/profile" {...props} />;
const ActionsLink = (props) => <Link to="/actions" {...props} />;

class MenuBar extends React.Component {

    render() {
        const { classes, loggedIn } = this.props;
        let logIconButton, profileIconButton;
        const myActionsButton = <Button variant={"outlined"} color="inherit" component={ActionsLink}>Events</Button>;

        if (loggedIn) {
            logIconButton = <IconButton color="inherit" onClick={this.props.onLogoutAction}>
                                <LockOpenIcon />
                            </IconButton>;
            profileIconButton = <IconButton color="inherit" component={ProfileLink}>
                                <PersonIcon />
                            </IconButton>;
        } else {
            logIconButton = <Button variant={"outlined"} color="inherit" component={LoginLink}>
                                Sign In
                            </Button>;
        }

        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar)}
                >
                    <Toolbar className={classes.toolbar}>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            className={classes.title}
                        >
                            Samaritan
                        </Typography>
                        <IconButton color="inherit" component={AboutLink}>
                            <InfoIcon />
                        </IconButton>
                        <div className={classes.toolbarButtons}>
                            {profileIconButton}
                            {myActionsButton}
                            {logIconButton}
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuBar);
