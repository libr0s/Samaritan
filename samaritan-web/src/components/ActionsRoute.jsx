import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from "@material-ui/core/Avatar/Avatar";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AddIcon from "@material-ui/icons/Add";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Chip from "@material-ui/core/Chip/Chip";
import Button from "@material-ui/core/Button/Button";
import NewAction from "./NewAction";
import Spinner from "./Spinner";

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 8,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    panelSummary: {
        '& > div': {
            display: 'flex',
            justifyContent: 'space-between',
        }
    }
});

const token = 'Bearer ' + localStorage.getItem('access_token');
const reqHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token
});

class ActionsRoute extends React.Component {

    state = {
        actions: [],
        sentences: [],
        expanded: false,
        open: false,
        fetching: true,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    componentDidMount() {
        fetch('/actions', {
            method: 'GET',
            headers: reqHeaders,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({actions: json});
            });
        fetch('https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=json', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({sentences: json});
                this.setState({fetching: false});
            });
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const {classes} = this.props;
        const {sentences, expanded, actions} = this.state;

        return (
            this.state.fetching
                ? <Spinner/>
                : <div>
                    <div className={classes.root}>
                        {actions.map((action, id) => (
                            <ExpansionPanel key={id} expanded={expanded === `panel${id}`}
                                            onChange={this.handleChange(`panel${id}`)}>
                                <ExpansionPanelSummary
                                    className={classes.panelSummary}
                                    expandIcon={<ExpandMoreIcon/>}>
                                    <div>
                                        <Typography className={classes.heading}>{action.name}</Typography>
                                        <Typography
                                            className={classes.secondaryHeading}>{action.organisation.name}</Typography>
                                    </div>
                                    <div>
                                        <Chip
                                            color={"primary"}
                                            avatar={<Avatar><AssessmentIcon/></Avatar>}
                                            label={`${action.points} pkt`}
                                        />
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                        <Typography>
                                            {sentences[id]}
                                        </Typography>
                                        <div style={{marginTop: '1em'}}>
                                            <Chip
                                                color={"default"}
                                                avatar={<Avatar><DateRangeIcon/></Avatar>}
                                                label={action.end_date}
                                                style={{width: 'auto'}}
                                            />
                                        </div>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}>
                            <Button
                                onClick={this.handleClickOpen}
                                style={{position: 'fixed', bottom: '2em', margin: '1em', width: '12em'}}
                                variant="extendedFab" color="primary"
                                aria-label="Add"
                                className={classes.button}>
                                <AddIcon/>
                                NEW EVENT
                            </Button>
                            <NewAction handleClose={this.handleClose} open={this.state.open}/>
                        </div>
                    </div>
                </div>
        );
    };
}

export default withStyles(styles)(ActionsRoute);
