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
import {getHeaders} from "../utils"
import EditAction from "./EditAction";
import TextField from "@material-ui/core/TextField/TextField";


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
    },
    textField: {
        margin: '1em',
    }
});


const DetailsLink = (props) => <Link to="/details" {...props} />;

class ActionsRoute extends React.Component {

    state = {
        editedAction: {name: '', description: '', points: '', startDate: '', endDate: '', failedFetch: '', city: '', address: '', postalCode: '', geocode: ''},
        actions: undefined,
        sentences: [],
        expanded: false,
        open: false,
        openEdit: false,
        fetching: true,
        search: '',
        dateSortState: true,
        pointsSortState: true,
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        this.fetchAccounts();
    };

    handleOpenEditAction = (action) => {
        this.setState({editedAction: action, openEdit: true});
    };

    handleCloseEditAction = () => {
        this.setState({openEdit: false});
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

    sortByDate = (a1, a2) => ((a1.end_date > a2.end_date) && this.state.dateSortState) ? 1 : -1;
    sortByPoints = (a1, a2) => ((a1.points > a2.points) && this.state.pointsSortState) ? 1 : -1;

    render() {
        const {classes} = this.props;
        const {sentences, expanded, actions} = this.state;

        return (
            this.state.fetching
            ? <Spinner/>
            : <div>
                <div className={classes.root}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            id="outlined-search"
                            label="Search for events"
                            type="search"
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            value={this.state.search}
                            onChange={(e) => {this.setState({search: e.target.value})}}
                        />
                        <Button
                            variant={"outlined"}
                            style={{height: '1.5em', margin: '1em'}}
                            onClick={() => this.setState({actions: this.state.actions.sort(this.sortByDate), dateSortState: !this.state.dateSortState})}
                        >
                            Sort by date
                        </Button>
                        <Button
                            variant={"outlined"}
                            style={{height: '1.5em', margin: '1em'}}
                            onClick={() => this.setState({actions: this.state.actions.sort(this.sortByPoints), pointsSortState: !this.state.pointsSortState})}
                        >
                            Sort by points
                        </Button>
                    </div>
                    {actions && actions.length === 0 && <Typography variant="display1">There are no actions to look for in here</Typography>}
                    {actions && actions.filter((a) => JSON.stringify(a).toLowerCase().includes(this.state.search.toLowerCase())).map((action, id) => (
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
                                        onClick={() => this.handleOpenEditAction(action)}
                                        style={{maxWidth:200}}
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
                        <EditAction action={this.state.editedAction} handleClose={this.handleCloseEditAction} open={this.state.openEdit} />
                    </div>
                </div>
            </div>
        );
    };
}

export default withStyles(styles)(ActionsRoute);
