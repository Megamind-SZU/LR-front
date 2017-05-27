'use static';
var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
class Index extends React.Component{
    render(){
        return(
            <div className="productBox">
                <Panel>hello</Panel>
                <Button bsStyle="primary">hello world</Button>
            </div>
        );
    }
};
module.exports = Index;
