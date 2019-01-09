import React from 'react';

import { Paper } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography/Typography";
import Logo from '../assets/img/logo.png';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing.unit * 16,
        width: '90%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: theme.spacing.unit * 6,
        textAlign: 'justify',
    },
    title: {
        textAlign: 'center',
        paddingBottom: theme.spacing.unit * 2,
    },
    logo: {
        margin: 'auto',
        display: 'block',
        '@media(max-width: 605px)': {
            display: 'none'
        }
    }
});

class AboutRoute extends React.Component {

    render() {
        const {classes} = this.props;

        return (
            <Paper className={classes.paper}>
                <Typography className={classes.title} variant={"display2"}>
                    Aim of the project
                </Typography>
                <img alt="logo" src={Logo} className={classes.logo}/>
                <Typography variant={"body1"}>
                Celem projektu jest stworzenie aplikacji zrzeszającej wolontariuszy i osoby organizujące wolontariaty. Aplikacja ma za zadanie ułatwić komunikację między potencjalnymi uczestnikami, a organizatorami, tym samym przyczyniając się do wzrostu popularności akcji charytatywnych. Aplikacja ma być dostępna poprzez stronę internetową oraz aplikację mobilną. Dostosowanie się do przedziału wiekowego osób korzystających z platformy wymaga rozdzielenia funkcji aplikacji mobilnej i internetowej. Wolontariusze to zwykle osoby młode, które prawdopodobnie częściej używają telefonów komórkowych, niż komputerów osobistych. Dlatego aplikacja mobilna ma być przeznaczona dla nich - osób zapisujących się na różnego rodzaju akcje charytatywne i społecznościowe. Przedstawiciele organizacji pozyskujących nowych, chętnych do pomocy ludzi, są zwykle etatowymi pracownikami. O wiele bardziej przystępną formą korzystania z platformy byłoby dla nich używanie komputerów osobistych - stąd strona internetowa. Wygoda korzystania z aplikacji mobilnej oraz intuicyjny proces zapisu na wydarzenia mogą zachęcić nowe osoby do wolontariatu.
                </Typography>
            </Paper>
        );
    }
}





export default withStyles(styles)(AboutRoute);
