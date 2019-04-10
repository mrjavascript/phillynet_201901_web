import React, {Component} from 'react';
import Mlb from '../assets/mlb.png'
import ListTeams from "./ListTeams";
import AddTeam from "./AddTeam";

class HomePage extends Component {

    state = {teams: []};

    componentDidMount() {
        const teams = [
            {id: 1, city: 'Baltimore', team: 'Orioles', foreground: '#000000', background: '#DF4601'},
            {id: 2, city: 'New York', team: 'Mets', foreground: '#002D72', background: '#FF5910'},
            {id: 3, city: 'Pittsburgh', team: 'Pirates', foreground: '#27251F', background: '#FDB827'},
            {id: 4, city: 'Oakland', team: 'Athletics', foreground: '#EFB21E', background: '#003831'},
            {id: 5, city: 'Los Angeles', team: 'Dodgers', foreground: '#A5ACAF', background: '#005A9C'},
            {id: 6, city: 'Chicago', team: 'White Sox', foreground: '#C4CED4', background: '#27251F'},
        ];
        this.setState({teams: teams});
    }

    addTeam = (team) => {
        team.id = Math.random();
        let teams = [...this.state.teams, team];
        this.setState({teams: teams});
    };
    deleteTeam = (id) => {
        let teams = this.state.teams.filter(team => {
            return team.id !== id
        });
        this.setState({teams: teams});
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