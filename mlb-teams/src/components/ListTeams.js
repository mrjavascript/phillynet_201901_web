import React from 'react'

const ListTeams = ({teams, deleteTeam}) => {

    const li = (teams.length > 0) ? teams.map((team) =>
            <li style={{backgroundColor: team.background, color: team.foreground}}
                className="collection-item"
                key={team.id}>
                <button onClick={() => {
                    deleteTeam(team.id)
                }} className="btn secondary-content black white-text">X
                </button>
                <p>{team.city} {team.team}</p>
            </li>
        )
        : <li className="collection-item">No teams</li>;
    return (
        <ul className="teams collection">{li}</ul>
    )

};

export default ListTeams;