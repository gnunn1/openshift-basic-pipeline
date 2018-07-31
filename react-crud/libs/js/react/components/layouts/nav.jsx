"use strict";

var NavComponent = React.createClass({
    getInitialState: function() {
        return {
            isLoggedIn: '',
            user: ''
        };
    },

    logout: function() {
        $.get('api/logout.php', function(result) {
            if(result == 'ok')
                this.setState({
                    isLoggedIn: 'false'
                });

            window.location.href = "#login";
        }.bind(this));
    },

    componentDidMount: function() {
        this.serverRequest = $.get('api/is_logged_in.php', function(result) {
            this.setState({
                isLoggedIn: result
            });
        }.bind(this));

        this.serverRequest = $.get('api/get_current_user.php', function(result) {
            if(result != '') {
                var u = JSON.parse(result)[0];
                this.setState({
                    user: u
                });
            }
        }.bind(this));
    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        return(
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    {/* Remove comment block below to show change  */}
                    {/*
                    <div className="navbar-header">
                        <a className="navbar-brand" href="http://github.com/gnunn1/openshift-basic-pipeline">
                            <img src="http://icons.iconarchive.com/icons/graphicloads/100-flat/24/phone-icon.png" alt="Best Electronics"/><span>  Best Electronics</span>
                        </a>
                    </div>
                    */}                   
                                        
                    <div className="container">
                        {
                            (this.state.isLoggedIn == 'false') ?
                                <div id="navbar" className="collapse navbar-collapse">
                                    <ul className="nav navbar-nav">
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#login">Sign In</a></li>
                                        <li><a href="#register">Sign Up</a></li>
                                    </ul>
                                </div>
                        :
                                <div id="navbar" className="collapse navbar-collapse">
                                <ul className="nav navbar-nav">
                                    <li><a href="#">Home</a></li>
                                    {
                                        (this.state.user != '') ?
                                        <li><a>Welcome, {this.state.user.email}</a></li>
                                        : null
                                    }
                                    <li><a href="#logout" onClick={this.logout}>Sign Out</a></li>
                                </ul>
                            </div>
                        }
                    </div>
                </nav>
            </div>
        );
    }
});
