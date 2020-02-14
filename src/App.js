import React from "react";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";

import "./App.css";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            monsters: [],
            searchField: ""
        };
        // See: https://reactjs.org/docs/handling-events.html
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users", {mode: "no-cors"})
            .then(response => response.json())
            .then(users => this.setState({ monsters: users }));
    }

    /**
     * Method that takes an event and sets the searchField state to the value from input
     * @param {*} e synthetic event
     */
    handleChange = e => {
        this.setState({ searchField: e.target.value });
    };

    render() {
        const { monsters, searchField } = this.state;
        const filteredMonsters = monsters.filter(monster =>
            monster.name.toLowerCase().includes(searchField.toLowerCase())
        );
        return (
            <div className="App">
                <h1>Monsters Rolodex</h1>
                <SearchBox
                    placeholder="search monsters"
                    handleChange={this.handleChange}
                />
                <CardList monsters={filteredMonsters} />
            </div>
        );
    }
}

export default App;
