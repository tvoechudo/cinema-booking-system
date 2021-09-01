var mongoose = require('mongoose'), Movie = mongoose.model('movie');

module.exports={
    getAll: function(req, res){
        Movie.find({}, function(err, results){
            if(err) throw err;
            res.render("movieslist.ejs", {allthemovies:results});
        })
    },
    getByName: function(req, res){
        var {m_name} = req.query;
        Movie.find({m_name}, function(err,result){
            if (err) throw err;
            res.render('movieslist.ejs', {allthemovies:result})
        })
    },

    getMovie: function(req, res){
        var name = req.params.name;
        Movie.findOne({m_name: name}, function(err,result){
            if (err) throw err;
            res.render('movie.ejs', {movie:result})
        })
    }
}