import React from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import {AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import InfoIcon from '@material-ui/icons/Info';
import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
    toolbarButtons: {
        marginLeft: 'auto',
      },
});

const LoginLink = (props) => <Link to="/login" {...props} />
const AboutLink = (props) => <Link to="/about" {...props} />
const ProfileLink = (props) => <Link to="/profile" {...props} />

class MenuBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
        };
    }

    render() {
        const { classes, loggedIn } = this.props;
        let logIconButton, profileIconButton;

        if (loggedIn) {
            logIconButton = <IconButton color="inherit" onClick={this.props.onLogoutAction}>
                                <LockOpenIcon />
                            </IconButton>
            profileIconButton = <IconButton color="inherit" component={ProfileLink}>
                                <PersonIcon />
                            </IconButton>
        } else {
            logIconButton = <IconButton color="inherit" component={LoginLink}>
                                <LockIcon />
                            </IconButton>
        }

        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(
                                classes.menuButton,
                                this.state.open && classes.menuButtonHidden,
                            )}
                        >
                        <MenuIcon />
                        </IconButton>
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
