import React, { Component, PropTypes } from "react";
import Navigator from './components/Navigator';
import MoreMenu from './components/MoreMenu';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import VoterStore from './stores/VoterStore';

export default class Application extends Component {
  static propTypes = {
    children: PropTypes.object,
    voter: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
        voter: {}
    };
  }

  componentDidMount() {
    console.log("Application: About to initialize VoterStore");
    VoterStore.signInStatus((voter) => {
        //console.log(voter, 'voter is your object')
        this.setState({voter});
    });
  }

  render() {
    var { voter } = this.state;

    return (
    <div className="app-base">
      <div className="container-fluid">
        <div className="row">
          <Header />
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <SubHeader />
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-4 col-sm-4 col-md-4 no-show">
            {
                voter ?
                <div>
                    <MoreMenu {...voter} />
                </div>
                :
                <span></span>
            }
          </div>
          <div className="col-xs-8 col-sm-8 col-md-8">
            { this.props.children }
          </div>
        </div>
      </div>
        <Navigator />
    </div>
  );
  }
}
