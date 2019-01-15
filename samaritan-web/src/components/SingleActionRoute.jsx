import React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import CardActions from "@material-ui/core/CardActions/CardActions";
import Button from "@material-ui/core/Button/Button";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea/CardActionArea";
import Card from "@material-ui/core/Card/Card";
import Spinner from "./Spinner";

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 14 * theme.spacing.unit,
    },
    card: {},
    media: {
        height: 140,
    },
});

const token = 'Bearer ' + localStorage.getItem('access_token');
const reqHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': token
});

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
                            <CardMedia
                                className={classes.media}
                                image="/static/images/cards/contemplative-reptile.jpg"
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {action.name}
                                </Typography>
                                <Typography component="p">
                                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                    across all continents except Antarctica
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                </div>
        );
    };
}

export default withStyles(styles)(SingleActionRoute);
