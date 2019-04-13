import React, {Component} from 'react';
import Mlb from '../assets/mlb.png'
import ListTeams from "./ListTeams";
import AddTeam from "./AddTeam";
import axios from "axios";

const firebase = require("firebase");

class HomePage extends Component {

    state = {teams: []};
    db = null;

    constructor(props, context) {
        super(props, context);

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyAEaQ24cEP2YiQ9LQ_Lbnmk0_cuIF_ntsw",
            authDomain: "phillynet-mlbteams.firebaseapp.com",
            databaseURL: "https://phillynet-mlbteams.firebaseio.com",
            projectId: "phillynet-mlbteams",
            storageBucket: "phillynet-mlbteams.appspot.com",
            messagingSenderId: "413381829957"
        };
        firebase.initializeApp(config);
        this.db = firebase.firestore();
        // console.log(this.db);
    }

    componentWillMount() {

        //
        //   Firestore
        // this.db.collection("teams").orderBy("city").onSnapshot(snapshot => {
        //
        //     let changes = snapshot.docChanges();
        //     changes.forEach(change => {
        //         console.log(change.doc.data());
        //         if (change.type === 'added') {
        //             let teams = [...this.state.teams, {...change.doc.data(), id: change.doc.id}];
        //             this.setState({teams: teams});
        //         } else if (change.type === 'removed') {
        //             let teams = this.state.teams.filter(team => {
        //                 return team.id !== change.doc.id
        //             });
        //             this.setState({teams: teams});
        //         }
        //     });
        // });

    }

    componentDidMount() {
        const teams = [
            {id: 1, city: 'Baltimore', team: 'Orioles', foreground: '#000000', background: '#DF4601'},
            {id: 2, city: 'New York', team: 'Mets', foreground: '#002D72', background: '#FF5910'},
            {id: 3, city: 'Pittsburgh', team: 'Pirates', foreground: '#27251F', background: '#FDB827'},
            {id: 4, city: 'Oakland', team: 'Athletics', foreground: '#EFB21E', background: '#003831'},
            {id: 5, city: 'Los Angeles', team: 'Dodgers', foreground: '#A5ACAF', background: '#005A9C'},
            {id: 6, city: 'Chicago', team: 'White Sox', foreground: '#C4CED4', background: '#27251F'},
        ];
        // this.setState({teams: teams});

        //
        //  Firestore
        // this.db.collection("teams").orderBy("city").get().then(
        //     snapshot => {
        //         snapshot.docs.forEach(doc => {
        //             console.log(doc.data());
        //             let team = {
        //                 id: doc.id,
        //                 city : doc.data().city,
        //                 foreground : doc.data().foreground,
        //                 background : doc.data().background
        //             };
        //             let teams = [...this.state.teams, team];
        //             this.setState({teams: teams});
        //         })
        //     }
        // );

        //
        //  API
        axios.get("http://localhost/api/firestore").then(
            res => {
                // console.log(res)
                let teams = res.data;
                this.setState({teams: teams});
            }
        );
    }

    addTeam = (team) => {
        team.id = Math.random();
        let teams = [...this.state.teams, team];
        // this.setState({teams: teams});

        //
        //  Firestore
        // this.db.collection("teams").add(team);

        //
        //  API
        axios.post("http://localhost/api/firestore", team).then(
          res => {
              console.log("NEW ID: " + res.data);
              team.id = res.data;
              let teams = [...this.state.teams, team];
              this.setState({teams, teams});
          }
        );
    };

    deleteTeam = (id) => {
        let teams = this.state.teams.filter(team => {
            return team.id !== id
        });
        // this.setState({teams: teams});

        //
        //  Firestore
        // this.db.collection("teams").doc(id).delete();

        //
        //  API
        axios.delete("http://localhost/api/firestore/" + id).then(
            res => {
                let teams = this.state.teams.filter(team => {
                    return team.id !== id
                });
                this.setState({teams: teams});
            }
        )
    };

    render() {
        return (
            <div className="homePage container">
                <img style={{width: '150px', marginRight: '10px'}} src={Mlb} alt="mlb logo" className="left"/>
                <h1>MLB Teams demo</h1>
                <hr/>

                <h2>View Teams</h2>
                <ListTeams teams={this.state.teams} deleteTeam={this.deleteTeam}/>

                <h2>Add New Team</h2>
                <AddTeam addTeam={this.addTeam}/>
            </div>
        );
    }
}

export default HomePage;