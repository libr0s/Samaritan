import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper, CssBaseline, Typography } from '@material-ui/core';


const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },
});

class ProfileRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            points: 0,
            rank: '',
        };

        this.getProfileInfo();
    }

    getProfileInfo = () => {
        const token = 'Bearer ' + localStorage.getItem('access_token');
        const reqHeaders = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        fetch('/profile', {
            method: 'GET',
            headers: reqHeaders,
        })
        .then( response => response.json())
        .then (json => {
            console.log(json)
            this.setState({
                name: json.name,
                surname: json.surname,
                points: json.points,
                rank: json.rank,
            });
        });
    }

    render() {
        const { classes } = this.props;

        return(
            <React.Fragment>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography variant="h2">
                        {this.state.name}
                    </Typography>
                    <Typography variant="display1">
                        {this.state.points + ' pkt'}
                    </Typography>
                </Paper>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(ProfileRoute);
