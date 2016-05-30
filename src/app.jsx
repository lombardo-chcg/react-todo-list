var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://learning-react-1875b.firebaseio.com/';


var App = React.createClass({
  mixins: [ReactFire],
  getInitialState: function() {
    return {
      items: {},
      loaded: false
    }
  },
  componentWillMount: function() {
    this.firebase = new Firebase(rootUrl + 'items/');
    this.bindAsObject(this.firebase, 'items');
    this.firebase.on('value', this.handleDataLoaded);
  },
  render: function() {
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">
          To-Do List
        </h2>
          <Header itemsStore={this.firebaseRefs.items}/>
        <hr />
        <div className={"content " + (this.state.loaded ? 'loaded' : "")}>
          <List items={this.state.items} />
          {this.deleteButton()}
        </div>  
      </div>
    </div>
  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  },
  deleteButton: function() {
    if (!this.state.loaded) {
      return
    } else {
      return <div className="text-center clear-complete">
        <hr />
        <button 
          type="button"
          onClick={this.onDeleteDoneClick}
          className="btn btn-default"
        > 
          Clear Completed
        </button>
      </div>
    }
  },
  onDeleteDoneClick: function() {
    for (var key in this.state.items) {
      if (this.state.items[key].done === true) {
        this.firebase.child(key).remove();
      }
    }
  }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
