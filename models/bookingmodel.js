var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose);

var bookingSchema = new mongoose.Schema(
    {
        sessionId:{type: String, ref: "session"},
        email:{type: String},
        rows:{type: Array},
        seats:{type: Array},
        total: {type: Number}
    },
    
)
bookingSchema.plugin(autoIncrement.plugin, {
    model: 'booking',
    field: 'bookingNumber',
    startAt: 100000,
});

mongoose.model('booking', bookingSchema);