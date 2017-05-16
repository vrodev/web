// helpers/api.js
// VRO Web
// 
// Created by Leonard Pauli, sep 2016
// Updated jan 2017

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
	this.payloadKey = 'data'

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
		return queryString }

	// Prepare a restfull request
	this.restRequest = function(method, url, parameters, headers) {
		if (parameters) url += '?'+this.jsonToQueryString(parameters);
		
		// Init request
		var httpRequest = new XMLHttpRequest()
		httpRequest.open(method, url, true)

		// Set headers
		headers = headers || {}
		Object.keys(headers).forEach(function(key){
			httpRequest.setRequestHeader(key, headers[key]);
		})
		
		return httpRequest }

	// 
	this.parsedResponse = function(res) {
		var response = res.responseText
		var contentType = res.getResponseHeader('Content-Type')
		if (contentType && contentType.indexOf('application/json')===0) {
			try {
				response = JSON.parse(response)
			} catch (e) {}
		}

		return response }


	// Send a restfull post request
	// opt = {parameters, [jsonData | formData | data], headers, method, endpoint, callback, domain, url, payloadKey, progress}
	this.post = function(endpoint, opt, callback, defaultMethod) {
		var me = this
		if (typeof opt == "function") callback = opt
		if (typeof endpoint == "object") opt = endpoint
		opt.endpoint = endpoint || opt.endpoint
		opt.callback = callback || opt.callback
		opt.domain = opt.domain || this.domain
		opt.url = opt.url || opt.domain + opt.endpoint
		opt.payloadKey = opt.payloadKey || me.payloadKey

		// Content-Type
		opt.headers = opt.headers || {}
		if (!opt.headers['Content-Type']) {
			if (opt.jsonData) opt.headers['Content-Type'] = 'application/json'
			// 'application/x-www-form-urlencoded'
		}

		defaultMethod = defaultMethod || 'POST'
		opt.method = opt.method || defaultMethod
		opt.parameters = opt.parameters || {}

		// Prepare request
		var req = this.restRequest(opt.method, opt.url, opt.parameters, opt.headers)
		if (opt.callback) req.onreadystatechange = function(res) {
			// Wait for it to finish
			if (req.readyState !== XMLHttpRequest.DONE) return;

			// Make sure res is JSON
			var res = me.parsedResponse(req)
			if (typeof res !== "object") {
				res = {textValue:req.responseText}
				res[opt.payloadKey] = req.response }
			res.status = req.status
			if (!req.error && res.status !== 200) res.error = "Status: "+res.status
			
			// Call back
			opt.callback(res.error, res[opt.payloadKey], res)
		}

		// Progress event
		if (opt.progress) req.addEventListener('progress', function(e) {
      if (!e.lengthComputable) return;
      var percent = e.loaded / e.total
      opt.progress(percent)
    }, false)

		// Send request
		var body = opt.data? opt.data:
			opt.jsonData? JSON.stringify(opt.jsonData):
			opt.formData? opt.formData: null
		req.send(body) }

	// Send a restfull get request
	this.get = function(endpoint, opt, callback) {
		this.post(endpoint, opt, callback, 'GET')}
	this.patch = function(endpoint, opt, callback) {
		this.post(endpoint, opt, callback, 'PATCH') }
	this.delete = function(endpoint, opt, callback) {
		this.post(endpoint, opt, callback, 'DELETE') }
}