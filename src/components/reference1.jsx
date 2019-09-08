import React from 'react';
import Main from './Main';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderHeader() {
        return <div
            onClick={e => {
                this.setState({
                    pageName: 'here'
                })
            }}
        />
    }

    renderBody() {
        const pageName = this.state.pageName;
        if (pageName === '') {}
    }

    render() {
        const Header = renderHeader();
        const Body = renderBody();
        return (
            <div>
                <Header />
                <Toolbar />
                <Body />
            </div>
        );
    }
}

export default App;
