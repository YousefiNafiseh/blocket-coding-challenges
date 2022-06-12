var Component = function () {
	const events = {};
	const publishedEvents = [];
	let subscribersId = -1;

	function callSubscriber(subscriber, data) {
		subscriber.func(data);
	}

	this.publish = function (event, data) {
		if (!events[event]) {
			return false;
		}

		const subscribers = events[event];
		subscribers.forEach((subscriber) => {
			callSubscriber(subscriber, data);
		});
		publishedEvents.push({
			event,
			data
		});
		return true;
	}

	this.subscribe = function (event, func) {
		if (!events[event]) {
			events[event] = [];
		}

		subscribersId += 1;
		const token = subscribersId.toString();
		const subscriber = {
			token,
			func
		};
		events[event].push(subscriber);
		publishedEvents.filter((item) => item.event === event).
			forEach((item, index) => {
				setTimeout(() => {
					callSubscriber(subscriber, item.data)
				}, (index + 1) * 2000);
			});
		return token;
	}

	this.unsubscribe = function (token) {
		const found = Object.keys(events).some((event) => events[event].some((subscriber, index) => {
			const areEqual = subscriber.token === token.toString();
			if (areEqual) {
				events[event].splice(index, 1);
			}
			return areEqual;
		}));

		return found ? token : null;
	}

}

function CustomComponent() {
	Component.call(this);
	this.eventValue = {};
}

CustomComponent.prototype = Object.create(Component.prototype);
CustomComponent.prototype.setValue = function (event, value) {
	this.publish(event, {
		value,
		oldValue: this.eventValue[event] || null
	});
	this.eventValue[event] = value;
}
