import React, {Component} from 'react'

class AddTeam extends Component {

    state = {
        city: '',
        team: '',
        foreground: '',
        background: '',
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTeam(this.state);

        //  clear form
        this.setState({
            city: '',
            team: '',
            foreground: '',
            background: '',
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" onChange={this.handleChange} value={this.state.city}/>
                    <label htmlFor="team">Team:</label>
                    <input type="text" id="team" onChange={this.handleChange} value={this.state.team}/>
                    <label htmlFor="foreground">Foreground Color:</label>
                    <input type="text" id="foreground" onChange={this.handleChange} value={this.state.foreground}/>
                    <label htmlFor="background">Background Color:</label>
                    <input type="text" id="background" onChange={this.handleChange} value={this.state.background}/>
                    <button className="btn black white-text">Submit</button>
                </form>
            </div>
        )
    }
}

export default AddTeam;