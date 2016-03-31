var crypto = require('crypto');

module.exports = (function() {
	'use strict';
	function EventLogger() {
		this.record = [];
	}

	var p = EventLogger.prototype;

	p.addPlayer = function addPlayer(){
		var name = this.getRandomName();
		return name;
	};

	p.addRecord = function addRecord(msg, username){
		var newRecord = {time:Date.now(), username: username, msg: msg};
		console.log(newRecord);
		this.record.push(newRecord);
	};

	p.getRandomName = function getRandomName(){
		// var current_date = (new Date()).valueOf().toString();
		// var random = Math.random().toString();
		return crypto.createHash('sha1').update(Date.now().toString()).digest('hex').substring(0,8);;
	};

	return new EventLogger();
})();
