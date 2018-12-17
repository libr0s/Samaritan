import React from 'react';

import { Paper } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 10,
        width: '90%',
        marginRight: 'auto',
        marginLeft: 'auto',
        height: 1600,
    },
    lcol: {

    }
});

class AboutRoute extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                :)
            </Paper>
        );
    }
}





export default withStyles(styles)(AboutRoute);