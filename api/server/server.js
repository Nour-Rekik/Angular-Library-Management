// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

app.use(function(req,res,next){
	res.setHeader('Access-Control-Allow-Origin','*'); //http://localhost:3000,
	res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT,PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers','*');
	res.setHeader('Access-Control-Allow-Credentials','true');
	next();
});

app.get("/api/getUsers",function(req,res){
	console.log("in get");
	model.find({},function(err,data){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{res.send(data);}
	});
});

app.listen(3000,function(){
  console.log('listenting on port 3000');
})
