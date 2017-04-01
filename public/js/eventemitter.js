class EventEmitter {
	constructor(){
		this._subs = {};
	}

	on(type, cb) {
		this._subs['_on' + type] = this._subs['_on' + type] || [];
		this._subs['_on' + type].push(cb);
	}

	emit(type, args) {
		this._subs['_on' + type] && this._subs['_on' + type].forEach((cb) => { cb(args) });
	}
}