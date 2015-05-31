var firebaseUrl = 'https://scorching-heat-8045.firebaseio.com/messages/';

var Container = React.createClass({displayName: "Container",
	render: function () {
		var className = 'container';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				this.props.children
			)
		);
	}
});

var Row = React.createClass({displayName: "Row",
	render: function () {
		var className = 'row';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				this.props.children
			)
		);
	}
});

var Panel = React.createClass({displayName: "Panel",
	render: function () {
		var className = 'panel panel-' + (this.props.panelType ? this.props.panelType : 'default');
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				this.props.children
			)
		);
	}
});

var PanelHeading = React.createClass({displayName: "PanelHeading",
	render: function () {
		var className = 'panel-heading';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				this.props.children
			)
		);
	}
});

var PanelTitle = React.createClass({displayName: "PanelTitle",
	render: function () {
		var className = 'panel-title';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("h3", {className: className}, 
				this.props.children
			)
		);
	}
});

var PanelBody = React.createClass({displayName: "PanelBody",
	render: function () {
		var className = 'panel-body';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				this.props.children
			)
		);
	}
});

var PanelFooter = React.createClass({displayName: "PanelFooter",
	render: function () {
		var className = 'panel-footer';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				this.props.children
			)
		);
	}
});

var Input = React.createClass({displayName: "Input",
	render: function () {
		var type = this.props.type ? this.props.type : 'text';
		var className = 'form-group';
		var inputClassName = 'form-control';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		if (this.props.inputClassName) {
			inputClassName += ' ' + this.props.inputClassName;
		}
		return (
			React.createElement("div", {className: className}, 
				React.createElement("input", {type: type, className: inputClassName, id: this.props.id, placeholder: this.props.placeholder})
			)
		)
	}
});

var Button = React.createClass({displayName: "Button",
	render: function () {
		var className = 'form-group';
		var buttonClassName = 'btn btn-' + (this.props.type ? this.props.type : 'default');
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		if (this.props.buttonClassName) {
			buttonClassName += ' ' + this.props.buttonClassName;
		}
		return (
			React.createElement("div", {className: className}, 
				React.createElement("button", {className: buttonClassName}, this.props.children)
			)
		)
	}
});

var MessageList = React.createClass({displayName: "MessageList",
	render: function () {
		var className = 'message-list';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		var messageNodes = this.props.messages.map(function (message, index) {
			return (
				React.createElement(Message, {author: message.author, timestamp: message.timestamp}, 
					message.text
				)
			);
		});
		return (
			React.createElement("div", {className: className}, 
				messageNodes
			)
		);
	}
});

var Message = React.createClass({displayName: "Message",
	render: function () {
		var className = 'alert alert-' + (this.props.type ? this.props.type : 'info');
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("div", {className: className}, 
				React.createElement("strong", null, React.createElement("em", null, this.props.author)), ": ", this.props.children, React.createElement("br", null), 
				React.createElement(TimeAgo, {className: "text-muted", timestamp: this.props.timestamp})
			)
		);
	}
});

var TimeAgo = React.createClass({displayName: "TimeAgo",
	getInitialState: function () {
		return {timeAgo: moment(this.props.timestamp).fromNow()};
	},
	tick: function () {
		this.setState({timeAgo: moment(this.props.timestamp).fromNow()})
	},
	componentDidMount: function () {
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount: function ()  {
		clearInterval(this.interval);
	},
	render: function () {
		var className = 'time-ago';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("small", {className: className}, React.createElement("em", null, this.state.timeAgo))
		);
	}
});

var MessageForm = React.createClass({displayName: "MessageForm",
	handleSubmit: function (event) {
		var author = document.getElementById('author');
		var text = document.getElementById('text');
		if (!text.value.trim() || !author.value.trim()) {
			return false;
		}
		this.props.onSubmit({
			author: author.value.trim(),
			text: text.value.trim(),
			timestamp: moment().toISOString()
		});
		text.value = '';
		return false;
	},
	render: function () {
		var className = 'message-form';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement("form", {className: className, onSubmit: this.handleSubmit}, 
				React.createElement(Row, null, 
					React.createElement(Input, {className: "col-sm-3", id: "author", placeholder: "Your Name"}), 
					React.createElement(Input, {className: "col-sm-6", id: "text", placeholder: "Your Message"}), 
					React.createElement(Button, {className: "col-sm-3", buttonClassName: "btn-block", type: "success"}, 
						"Send"
					)
				)
			)
		);
	}
});

var ChatApp = React.createClass({displayName: "ChatApp",
	mixins: [ReactFireMixin],
	getInitialState: function () {
		return {messages: []};
	},
	componentWillMount: function () {
		this.bindAsArray(new Firebase(firebaseUrl), 'messages');
	},
	handleSubmit: function (message) {
		var messages = this.state.messages;
		messages.push(message);
		this.setState({messages: messages});
		this.firebaseRefs['messages'].push(message);
	},
	render: function () {
		var className = 'chat-app';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			React.createElement(Container, {className: className}, 
				React.createElement(Row, null, 
					React.createElement("div", {className: "col-md-offset-3 col-md-6"}, 
						React.createElement(Panel, null, 
							React.createElement(PanelHeading, null, 
								React.createElement(PanelTitle, {className: "text-center"}, "ReactFire Chat")
							), 
							React.createElement(PanelBody, null, 
								React.createElement(MessageList, {messages: this.state.messages})
							), 
							React.createElement(PanelFooter, null, 
								React.createElement(MessageForm, {onSubmit: this.handleSubmit})
							)
						)
					)
				)
			)
		);
	}
});

React.render(
	React.createElement(ChatApp, null),
	document.getElementById('app')
);
