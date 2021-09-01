var mongoose = require('mongoose'), Booking = mongoose.model('booking'), Session = mongoose.model('session');

module.exports={
    add: function(req, res){
        var info = req.body;

        if (typeof(info.rows) == 'string') var rowArray = info.rows.split(" ")
        else rowArray = info.rows
       
        if (typeof(info.seats) == 'string') var seatArray = info.seats.split(" ")
        else seatArray = info.seats

        for (var i=0; i< rowArray.length; i++){
            var row = parseInt(rowArray[i])-1;
            var seat = parseInt(seatArray[i])-1;
            var text = 'seats.'+row+'.'+seat
            var filter = '{"' + text + '": 1}';
            var filterJson = JSON.parse(filter);
            // Make the seats which were taken unavailable
            updateSeats(info.sessionId, filterJson)
           
        }
        // Add the new booking record
        Booking.create(info, function(err, result){
            if(err) {res.render("Error inserting data")}
            res.render('newbooking.ejs', {newBooking:result})
        })
        console.log("Booking has been created");
    },

    getBooking: function(req, res){
        var email = req.query.email;
        var number = parseInt(req.query.number);
        Booking.aggregate([{$match:{$and: [{bookingNumber: number}, {email: email}]}}, {$lookup:{from: "sessions", localField:"sessionId", foreignField:"session_id", as: "s_info"}}], function(err,result){
            if (err) throw err;
            if(result.length == 0){
                res.render('erbooking.ejs')
                console.log("No such booking")
            }
            else{
            res.render('mybooking.ejs', {booking:result})
            }
        })
    },

    delete: function(req, res){
        var info = req.body
        if (typeof(info.rows) == 'string') var rowArray = info.rows.split(" ")
        else rowArray = info.rows
       
        if (typeof(info.seats) == 'string') var seatArray = info.seats.split(" ")
        else seatArray = info.seats
       
        for (var i=0; i< rowArray.length; i++){
            var row=parseInt(rowArray[i])-1;
            var seat=parseInt(seatArray[i])-1;
            var text = 'seats.'+row+'.'+seat
            var filter = '{"' + text + '": 0}';
            var filterJson = JSON.parse(filter);
            // Make the seats which were deleted available for booking
            updateSeats(info.sessionId, filterJson)
        }

        var id = parseInt(info.id)
        Booking.deleteOne({bookingNumber: id}, function(err, result){
            if(err) throw err;
            res.redirect('/movies')
        })
    },

    changeSeats: function(req, res){
        var info = req.body;
        if (typeof(info.rows) == 'string') var rowArray = info.rows.split(" ")
        else rowArray = info.rows

        if (typeof(info.seats) == 'string') var seatArray = info.seats.split(" ")
        else seatArray = info.seats

        if (typeof(info.oldRows) == 'string') var oldRowArray = info.oldRows.split(" ")
        else oldRowArray = info.oldRows
  
        if (typeof(info.oldSeats) == 'string') var oldSeatArray = info.oldSeats.split(" ")
        else oldSeatArray = info.oldSeats

        for (var i=0; i< oldRowArray.length; i++){
            var oldRow=parseInt(oldRowArray[i])-1;
            var oldSeat=parseInt(oldSeatArray[i])-1;
            var text = 'seats.'+oldRow+'.'+oldSeat
            var filter = '{"' + text + '": 0}';
            var filterJson = JSON.parse(filter);
            // Make the previously booked seats available for booking
            updateSeats(info.sessionId, filterJson)
        }
        for (var i=0; i< rowArray.length; i++){
            var row=parseInt(rowArray[i])-1;
            var seat=parseInt(seatArray[i])-1;
            var text1 = 'seats.'+row+'.'+seat
            var filter1 = '{"' + text1 + '": 1}';
            var filterJson1 = JSON.parse(filter1);
            // Make the new selected seats unavailable for booking
           updateSeats(info.sessionId, filterJson1)
         
        }
        var id = parseInt(info.bookingNumber)
        Booking.findOneAndUpdate({bookingNumber: id}, {$set: {rows: info.rows, seats: info.seats}}, function(err, result){
            if (err) throw err;
            res.redirect('/movies')
            console.log("Booking has been updated")
        })
    } 
   
}

function updateSeats(id, filter){ 
    Session.findOneAndUpdate({session_id: id}, {$set: filter}, async function(err, result){
        if (err) throw err;
        await result;
    })
    console.log("Session has been updated");
}