var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema(
    {
        m_id:{type: String},
        m_name:{type: String},
        m_poster:{type: String},
        m_description:{type: String},
        m_timing: {type: String},
        m_type:{type:String}
    },
    
)
mongoose.model('movie', movieSchema);


