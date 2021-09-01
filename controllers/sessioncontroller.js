var mongoose = require('mongoose'), Session = mongoose.model('session'), Movie = mongoose.model('movie');;

module.exports={
    getAll: function(req, res){
        Session.aggregate([{$lookup:{from: "movies", localField:"movie_name", foreignField:"m_name", as: "m_info"}}, {$sort:{start_date:1}}], function(err, results){
            if(err) throw err;
            res.render("sessionlist.ejs", {allsessions:results});
        })
    },

    getSessionByMovie: function(req, res){
        var name = req.params.name;
        Session.aggregate([{$match:{movie_name: name}}, {$lookup:{from: "movies", localField:"movie_name", foreignField:"m_name", as: "m_info"}}, {$sort:{start_date:1}}], function(err,result){
            if (err) throw err;
            res.render('sessionlist.ejs', {allsessions:result})
        })
    },

    getSessionById: function(req, res){
        var id = req.query.session_id;
        Session.aggregate([{$match: {session_id: id}},{$lookup:{from: "movies", localField:"movie_name", foreignField:"m_name", as: "m_info"}}], function(err,result){
            if (err) throw err;
            res.render('session.ejs', {session:result})
        })
    },
        
    findSessions: function(req, res){
        var name = req.query.name;
        Session.aggregate([{$match:{movie_name: name}}, {$lookup:{from: "movies", localField:"movie_name", foreignField:"m_name", as: "m_info"}}, {$sort:{start_date:1}}], function(err,result){
            if (err) throw err;
            res.render('sessionlist.ejs', {allsessions:result})
        })
    }
}
