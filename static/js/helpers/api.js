// api.js
// helpers
// VRO Web
// Initially created by Leonard Pauli, sep 2016

// Usage:
// var api = new API('/api')
// api.myEndpoint = function(value, callback) {
// 	this.get('my-endpoint', {value:value}, function(res) {
// 		console.log(res)
// 		if (res.error) return callback(null);
// 		callback(res.value)
// 	})
// }
// api.myEndpoint("text", function(res) {console.log(res)})
// res -> {
// 	error: null/false | true/"msg", status:200 (http OK),
// 	value: "response from server as string"
// 	(or rest of json if json is sent from server)
// }
var API = function(domain) {
	this.domain = (domain || '')+'/'

	// jsonToQueryString
	// {key:"the value",k2:9} -> key=the%20value&k2=9
	// Todo: arrays? {k:["v1","v2"]} -> k[]=v1&k[]=v2
	// Todo: multilevel objects? {k:{k:"v"}} -> k=encodeURIComponent(JSON.stringify({k:"v"}))
	this.jsonToQueryString = function(parameters) {
		var queryString = ""
		Object.keys(parameters).map(function(key) {
			var value = parameters[key]
			if (queryString.length) queryString += '&'
			queryString += encodeURIComponent(key)+'='+encodeURIComponent(value)
		})
		return queryString;
	}

	// Prepare a restfull request
	this.restRequest = function(method, url, parameters, headers) {
		if (parameters) url += '?'+this.jsonToQueryString(parameters);
		
		// Init request
		var httpRequest = new XMLHttpRequest()
		httpRequest.open(method, url, true)

		// Set headers
		headers = headers | {}
		for (var key in headers) if (headers.hasOwnProperty(key))
			httpRequest.setRequestHeader(key, headers[key]);

		return httpRequest;
	}


	// 
	this.parsedResponse = function(res) {
		var response = res.responseText
		var contentType = res.getResponseHeader('Content-Type')
		if (contentType.indexOf('application/json')===0) {
			try {
				response = JSON.parse(response)
			} catch (e) {}
		}

		return response
	}

	// Send a restfull get request
	this.get = function(endpoint, parameters, callback, headers) {
		var me = this
		var url = this.domain + endpoint

		// Prepare request
		var req = this.restRequest('GET', url, parameters, headers)
		req.onreadystatechange = function(e) {
			// Wait for it to finish
			if (req.readyState !== XMLHttpRequest.DONE) return;

			// Make sure res is JSON
			var res = me.parsedResponse(req)
			if (typeof res !== "object") res = {value:res}
			res.status = req.status
			if (!req.error && res.status !== 200) req.error = "Status: "+res.status
      
      // Call back
      callback(res)
		}

		// Send request
		req.send()
	}


	// Send a restfull post request
	this.post = function(endpoint, parameters, data, callback, headers) {
		var url = this.domain + endpoint

		// Content-Type
		headers = headers | {}
		var ctKey = 'Content-Type'
		if (!headers[ctKey] && typeof data == "object")
			headers[ctKey] = 'application/json'

		// Prepare request
		var req = this.restRequest('POST', url, parameters, headers)
		req.onreadystatechange = function(res) {
			// Wait for it to finish
			if (req.readyState !== XMLHttpRequest.DONE) return;

			// Make sure res is JSON
			var res = me.parsedResponse(req)
			if (typeof res !== "object") res = {value:res}
			res.status = req.status
			if (!req.error && res.status !== 200) req.error = "Status: "+res.status
      
      // Call back
      callback(res)
		}

		// Send request
		req.send(data)
	}

}


// httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// httpRequest.send(null);