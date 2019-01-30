import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import DateRangeIcon from "@material-ui/icons/DateRange";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Card from "@material-ui/core/Card/Card";
import Spinner from "./Spinner";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Avatar from "@material-ui/core/Avatar/Avatar";
import Chip from "@material-ui/core/Chip/Chip";

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 14 * theme.spacing.unit,
    },
    card: {
        maxWidth: '80vw',
    },
    media: {
        height: 140,
    },
});

const token = 'Bearer ' + localStorage.getItem('access_token');
const reqHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token
});

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: props.lat, lng: props.lng}}
    >
        {<Marker position={{ lat: props.lat, lng: props.lng}} />}
    </GoogleMap>));

class SingleActionRoute extends React.Component {

    state = {
        action: {
            name: '',
            points: 0,
            end_date: '',
        },
        fetching: true,
    };

    componentDidMount() {
        const {id} = this.props;

        console.log(`/action/${id}`);
        fetch(`/action/${id}`, {
            method: 'GET',
            headers: reqHeaders,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({action: json});
                this.setState({fetching: false});
            });
    }

    render() {
        const {classes} = this.props;
        const {action} = this.state;

        return (
            this.state.fetching
                ? <Spinner/>
                : <div className={classes.root}>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <MyMapComponent
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                lng={action.geo_loc.lng}
                                lat={action.geo_loc.lat}/>
                            <CardContent>
                                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {action.name}
                                </Typography>
                                <Chip
                                    color={"default"}
                                    avatar={<Avatar><DateRangeIcon/></Avatar>}
                                    label={action.end_date}
                                    style={{width: 'auto'}}
                                />
                                </div>
                                <Typography component="p">
                                    Kitty loves pigs meowing chowing and wowing, but experiences short bursts of poo-phoria after going to the loo hiding behind the couch until lured out by a feathery toy, wake up wander around the house making large amounts of noise jump on top of your human's bed and fall asleep again stare at ceiling.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Edit
                            </Button>
                            <Button size="small" color="primary">
                                Remove
                            </Button>
                        </CardActions>
                    </Card>
                </div>
        );
    };
}

export default withStyles(styles)(SingleActionRoute);
