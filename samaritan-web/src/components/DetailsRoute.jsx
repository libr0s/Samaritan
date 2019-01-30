import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from "@material-ui/core/Button/Button";
import MapComponent from "./MapComponent";
import {getHeaders} from "../utils"

const styles = theme => ({
    info: {
        marginTop: theme.spacing.unit * 10,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    card: {
        marginTop: theme.spacing.unit * 4,
    },
    buttons: {
        display: 'flex',

    },
    paper: {
        maxHeight: 580, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

class DetailsRoute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            action: this.props.action,
            volunteers: undefined,
            open: false
        }
        console.log("[DETAILS] contructor ", this.state.action);
    }
    

    handleConfirm = () => {
    
    }

    handleClose = () => {
    };

    handleClickOpen = () => {
    };

    componentDidMount() {
        this.getVolunteersList();
    }

    getVolunteersList = () => {
        fetch('/participations/' + this.state.action.id, {
            method: 'GET',
            headers: getHeaders(),
        })
            .then(response => { 
                console.log("[DETAILS] Response: ", response);
                return response.json();
            })
            .then(json => {
                console.log("[DETAILS] Json: ", json);
                this.setState({volunteers: json})
            })
    }

    //TODO: SERVER CRASHES WHEN REFRESHIND DETAILS PAGE
    render() {
        const {classes} = this.props;
        const {volunteers, action} = this.state;
        
        console.log("[DETAILS] Render");

        return (
            <div>
                <MapComponent
                    isMarkerShown="true"
                    lat={action.geo_loc.lat}
                    lng={action.geo_loc.lng}
                />       
                <div className={classes.info}>
                
                    <Paper className={classes.paper}>
                        <Typography variant="h2">
                            {action.name}
                        </Typography>
                        <Typography variant="h4">
                            {action.organisation.name}
                        </Typography>
                        
                        <Typography variant="caption">
                            {action.startDate && 'Start Date: ' + action.startDate.substr(0, 10)}
                        </Typography>
                        
                        <Typography variant="caption">
                            {'End Date: ' + action.end_date.substr(0, 10)}
                        </Typography>

                        <hr />
                        <Typography variant="text">
                            {action.geo_loc.name}
                        </Typography>
                        <Typography variant="text">
                            {action.geo_loc.address}
                        </Typography>

                    </Paper>
                    <Paper className={classes.paper}>
                        <div>
                            {volunteers ? volunteers.map((volunteer, id) => 
                            <div className={classes.card}>
                                <div>
                                    <Typography variant="title">{volunteer.name} {volunteer.surname}</Typography>
                                    <Typography variant="body">{volunteer.rank}, {volunteer.points} pkt.</Typography>
                                </div>
                                <div className={classes.buttons}>
                                    <Button>PROFIL</Button>
                                    <Button>ODRZUĆ</Button>
                                </div>
                            </div>
                            ) : <Typography variant="display1">Brak uczestników</Typography>}</div>
                    </Paper>
                    
                </div>    
            </div>
        );
    }
} 



export default withStyles(styles)(DetailsRoute);
