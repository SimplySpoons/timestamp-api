// enable 'strict mode'
'use strict';
// MomentJs
var moment = require('moment');

module.exports = function(app) {
    app.route("/")
        .get(function(req, res) {
        res.sendFile(process.cwd() + '/public/index.html');
    });

    app.route("/:query").get(function(req, res) {
        var query = req.params.query;
        var unix = null;
        var natural = null;
        
        // nat time check
        if (isNaN(+query) && moment(query, "MMMM D, YYYY").isValid()) {
            unix = +natToUnix(query);
            natural = unixToNat(unix);
        }
        
        // unix time check
        if (+query >= 0) {
            unix = +query;
            natural = unixToNat(unix);
        } 
        
        res.send({'unix': unix, 'natural': natural});
    
    });
    
    // unix ---> nat date
    function unixToNat(unix) {
        return moment.unix(unix).format("MMMM D, YYYY");
    }
    
    // nat date ---> unix
    function natToUnix(query) {
        return moment(query, "MMMM D, YYYY").format("X");
    }
    
};