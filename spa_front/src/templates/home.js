
import React from 'react';
import axios from 'axios'


class Home extends React.Component {
    // _TRANSLATION_URI = process.env.REACT_APP_ROOT_BACKEND_URI + '/query'
    // eslint-disable-next-line no-useless-concat
    _TRANSLATION_URI = 'http://0.0.0.0:8000' + '/query'

    constructor(props) {
        super(props);

        this.state = {
            'query_text': null,
            'translation_text': null
        }
    }

    changeQueryText = (event) => {
        event.preventDefault();

        const {
            query_text,
            // eslint-disable-next-line
            translation_text
        } = this.state;

        axios.get(
            this._TRANSLATION_URI, { params: { query_text: query_text } }
        ).then(response => {
            console.log("SUCCESS", response)
        }).catch(error => {
            console.log(error)
        })

    }

    render() {
        const {
            query_text,
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
                                    id="search-id"
                                    name="query_text"
                                    type="text"
                                    placeholder="Enter text for translation..."
                                    value={ query_text }
                                    onChange={ this.changeQueryText }
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


export default Home;
