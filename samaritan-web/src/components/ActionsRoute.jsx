import React from 'react';
import {Link} from 'react-router-dom';

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
import InfoIcon from '@material-ui/icons/MoreHoriz';
import IconButton from "@material-ui/core/IconButton/IconButton";
import {Link} from "react-router-dom";
import MapComponent from "./MapComponent";
import {getHeaders} from "../utils"


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


const DetailsLink = (props) => <Link to="/details" {...props} />;

class ActionsRoute extends React.Component {

    state = {
        actions: undefined,
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
        this.setState({ open: false });
        this.fetchAccounts();
    };

    onActionSelected = account => (e) => {
        this.props.onActionSelected(account);
    }

    onActionRemoved = account => (e) => {
        fetch('/action/' + account.id, {
            method: 'DELETE',
            headers: getHeaders(),
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.fetchAccounts();
            });
    }

    fetchAccounts = () => {

        fetch('/actions', {
            method: 'GET',
            headers: getHeaders(),
        })
            .then(response => response.json())
            .then(json => {
                console.log("ACTIONS JSON ", json);
                if (json)
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


    componentDidMount() {
       this.fetchAccounts();
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
                    {actions && actions.length == 0  && <Typography variant="display1">There are no actions to look for in here</Typography>}
                    {actions && actions.map((action, id) => (
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
                                            label={action.end_date.substr(0,10)}
                                            style={{width: 'auto'}}
                                        />
                                    </div>
                                    <div style={{displayy: 'flex', flexDirection: 'column',marginLeft:"auto", marginRight:"auto"}}>
                                    <Button
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.onActionSelected(action)}
                                        style={{maxWidth:200}}
                                        component={DetailsLink}
                                    >
                                        EDIT
                                    </Button>
                                        <Button
                                        variant="extendedFab" color="primary"
                                        className={classes.button}
                                        onClick={this.onActionSelected(action)}
                                        style={{maxWidth:200}}
                                        component={DetailsLink}
                                    >
                                        DETAILS
                                    </Button>
                                    <Button
                                        color="primary"
                                        className={classes.button}
                                        onClick={this.onActionRemoved(action)}
                                        style={{maxWidth:200}}
                                    >
                                        REMOVE
                                    </Button>
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
                            style={{position: 'fixed', bottom: '2em', right: '2em', margin: '1em', width: '12em'}}
                            variant="extendedFab" color="primary"
                            aria-label="Add"
                            className={classes.button}>
                            <AddIcon/>
                            NEW EVENT
                        </Button>
                        <NewAction handleClose={this.handleClose} open={this.state.open} />
                    </div>
                </div>
            </div>
        );
    };
}

export default withStyles(styles)(ActionsRoute);
