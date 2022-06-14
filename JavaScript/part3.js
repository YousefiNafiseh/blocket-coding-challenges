var Component = function () {
	const events = {};
	const publishedEvents = {};
	let subscribersId = -1;

	function callSubscriber(subscriber, data) {
		subscriber.func(data);
	}

	this.publish = function (event, data) {
		if (!publishedEvents[event]) {
			publishedEvents[event] = [];
		}
		publishedEvents[event].push(data);

		if (!events[event]) {
			return false;
		}

		const subscribers = events[event];
		subscribers.forEach((subscriber) => {
			callSubscriber(subscriber, data);
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
		publishedEvents[event].forEach((data, index) => {
			setTimeout(() => {
				callSubscriber(subscriber, data)
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

