# cinema-booking-system
Web app using node.js and MongoDB 

The app contains the list of movies and showtimes. Users can see the list of movies and details for the 
selected movie, open the list of available sessions for every movie, select the specific showtime and 
book seats. After users have reserved tickets, they get the booking number. Using this number and 
submitted email users can access their booking to change seats or delete the reservation.


## MongoDB Database Information 
Database Name: appdb

Collections:
- **movies** -
Each document contains the information about one movie

m_id: string – movie id

m_name: string – movie name

m_poster: string – link to the movie poster

m_description: string – movie synopsis

m_timing: string – movie duration

m_type: string – movie genre

- **sessions** - 
Each document contains the information about one showtime

session_id: string – showtime id

movie-name: string – movie of showtime

start_date: date – start date and time 

ticket_price: int – price of one seat

seats: 2D Array of int – represents the schema of the hall with the value of 0 for available seats and 1 for booked seats

- **bookings** - 
Each document contains the information about reserved seats. These documents should be created only via web app.

bookingNumber: int – auto incremented

booking id

sessionId: string – id of the showtime for which 

tickets have been reserved

email: string – user email

total: int – total price of the booked tickets

rows: Array of int – represents the numbers of booked rows

seats: Array of int – represents the numbers of booked seats in the booked rows (seats indexes correspond to rows indexes)

## NodeJS Service Informatio

**/movies** - get the list off all movies

**/movies/find** - find the movie in the list by its name - users go to this page from the list off all movies by typing the movie name in the search bar

**/movies/movie/:name** - get the information about the selected movie – users go to this page clicking on the poster of the movie

**/sessions** - get the list off all available showtimes

**/sessions/find** - get all showtimes for a specific movie (showtimes are showed in ascending order by date and time) – users go to this page from the list off all sessions by typing the movie name in the search bar

**/sessions/:name** - get all showtimes for a specific movie (showtimes are showed in ascending order by date and time) – users go this page from the movie page 

**/session** - get the info about the showtime, show the hall layout with the available and booked seats and the form for ticket reservation

**/booking/add** - post the info about the new booking to the database

**/mybooking** - show the form to access created booking

**/booking/check** - check if submitted data in the form on /mybooking is valid and if yes, get the info of the booking, show the form for editing and deleting the booking

**/booking/edit** - change the data in the booking document by its number

**/bookin/delete** - delete the booking document by its number
