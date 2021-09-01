var mongoose = require('mongoose');

var sessionSchema = new mongoose.Schema(
    {
        session_id:{type: String},
        movie_name:{type: String, ref:"Movie"},
        start_date:{type: Date},
        ticket_price:{type: Number},
        seats: {type: Array}
    }
    
)
mongoose.model('session', sessionSchema);