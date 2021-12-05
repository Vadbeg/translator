import React from 'react';
import axios from "axios";

class App extends React.Component {
    _TRANSLATION_URI = process.env.REACT_APP_ROOT_BACKEND_URI + '/query'

    constructor(props) {
        super(props);

        this.state = {
            'translation_text': null
        }
    }

    changeQueryText = (event) => {
        event.preventDefault();
        let query_text = event.target.value;

        console.log(query_text)

        if (query_text !== undefined) {
            axios.get(
                this._TRANSLATION_URI, {params: {'query_text': query_text}}
            ).then(response => {
                console.log("SUCCESS", response)
                this.setState({translation_text : response.data["translated_text"]});
            }).catch(error => {
                console.log(error)
            })
        }

    }

    render() {
        const {
            // eslint-disable-next-line
            translation_text
        } = this.state

        let queryForm = (
            <div>
                <div className="s003" id="all_info">
                    <div className="inner-form">
                        <form className="search-form" method="post">
                            <div className="input-field second-wrap">
                                <input
                                    id="query_text"
                                    name="query_text"
                                    type="text"
                                    placeholder="Enter text for translation..."
                                    onChange={ this.changeQueryText }
                                />
                            </div>
                        </form>
                        <form className="search-form" method="post">
                            <div className="input-field second-wrap">
                                <input
                                    id="query_text"
                                    name="query_text"
                                    type="text"
                                    disabled="true"
                                    value={ translation_text }
                                    placeholder="Result..."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );

        return queryForm
    }
}

export default App;
