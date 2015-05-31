var firebaseUrl = 'https://scorching-heat-8045.firebaseio.com/messages/';

var Container = React.createClass({
	render: function () {
		var className = 'container';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
});

var Row = React.createClass({
	render: function () {
		var className = 'row';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
});

var Panel = React.createClass({
	render: function () {
		var className = 'panel panel-' + (this.props.panelType ? this.props.panelType : 'default');
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
});

var PanelHeading = React.createClass({
	render: function () {
		var className = 'panel-heading';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
});

var PanelTitle = React.createClass({
	render: function () {
		var className = 'panel-title';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<h3 className={className}>
				{this.props.children}
			</h3>
		);
	}
});

var PanelBody = React.createClass({
	render: function () {
		var className = 'panel-body';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
});

var PanelFooter = React.createClass({
	render: function () {
		var className = 'panel-footer';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.children}
			</div>
		);
	}
});

var Input = React.createClass({
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
			<div className={className}>
				<input type={type} className={inputClassName} id={this.props.id} placeholder={this.props.placeholder} />
			</div>
		)
	}
});

var Button = React.createClass({
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
			<div className={className}>
				<button className={buttonClassName}>{this.props.children}</button>
			</div>
		)
	}
});

var MessageList = React.createClass({
	render: function () {
		var className = 'message-list';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				{this.props.messages.map(function (message, index) {
					return (
						<Message author={message.author} timestamp={message.timestamp}>
							{message.text}
						</Message>
					);
				})}
			</div>
		);
	}
});

var Message = React.createClass({
	render: function () {
		var className = 'alert alert-' + (this.props.type ? this.props.type : 'info');
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<div className={className}>
				<strong><em>{this.props.author}</em></strong>: {this.props.children}<br />
				<TimeAgo className="text-muted" timestamp={this.props.timestamp} />
			</div>
		);
	}
});

var TimeAgo = React.createClass({
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
			<small className={className}><em>{this.state.timeAgo}</em></small>
		);
	}
});

var MessageForm = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function () {
		return {messages: []};
	},
	componentWillMount: function () {
		this.bindAsArray(new Firebase(firebaseUrl), 'messages');
	},
	handleSubmit: function (event) {
		event.preventDefault();
		var author = document.getElementById('author');
		var text = document.getElementById('text');
		if (!text.value.trim() || !author.value.trim()) {
			return;
		}
		this.firebaseRefs['messages'].push({
			author: author.value.trim(),
			text: text.value.trim(),
			timestamp: moment().toISOString()
		});
		text.value = '';
		return;
	},
	render: function () {
		var className = 'message-form';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<form className={className} onSubmit={this.handleSubmit}>
				<Row>
					<Input className="col-sm-3" id="author" placeholder="Your Name" />
					<Input className="col-sm-6" id="text" placeholder="Your Message" />
					<Button className="col-sm-3" buttonClassName="btn-block" type="success">
						Send #{this.state.messages.length + 1}
					</Button>
				</Row>
			</form>
		);
	}
});

var ChatApp = React.createClass({
	mixins: [ReactFireMixin],
	getInitialState: function () {
		return {messages: []};
	},
	componentWillMount: function () {
		this.bindAsArray(new Firebase(firebaseUrl), 'messages');
	},
	render: function () {
		var className = 'chat-app';
		if (this.props.className) {
			className += ' ' + this.props.className;
		}
		return (
			<Container className={className}>
				<Row>
					<div className="col-md-offset-3 col-md-6">
						<Panel>
							<PanelHeading>
								<PanelTitle className="text-center">ReactFire Chat</PanelTitle>
							</PanelHeading>
							<PanelBody>
								<MessageList messages={this.state.messages} />
							</PanelBody>
							<PanelFooter>
								<MessageForm />
							</PanelFooter>
						</Panel>
					</div>
				</Row>
			</Container>
		);
	}
});

React.render(<ChatApp />, document.getElementById('chat'));
