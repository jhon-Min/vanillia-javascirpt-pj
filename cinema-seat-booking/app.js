const list = document.getElementById('movie-list');
const therater = document.querySelector('.therater');
const selectMovie = document.getElementById('current-movie');
const seatNum = document.getElementById('seat-num');
const seats = document.querySelectorAll('.seat-row .seat');
const addBooking = document.getElementById('add-booking');
const details = document.getElementById('details');


const updateSeatsNum = () => {
    let selected = document.querySelectorAll('.seat-row .seat.selected');
    // let currentQt = Array.from(selected).map(x => Array.from(seats).includes(x));
    seatNum.innerText = Array.from(selected).length;
    
};

//Select Movie
list.addEventListener('change', e=> {
    selectMovie.textContent = e.target.value;
    updateSeatsNum();
})

// Select Seat
therater.addEventListener('click', e => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
       e.target.classList.toggle('selected')      
    }
    updateSeatsNum();
});



// ====================== Add To Booking Proecss ==========================
const createUi = (movie, seats, total) =>  {
    let tp = 
        `
            <tr>
                <th>${seats}</th>
                <td>${movie}</td>
                <td>${total} Kyats</td>
            </tr>
        `;
    details.innerHTML = tp;
}

addBooking.addEventListener('submit', e=> {
    e.preventDefault();
    let selected = Array.from(document.querySelectorAll('.seat-row .seat.selected')); 
   
    if(list.value !== 'Movie'){
        let selectedSeats = selected.map(seat => seat.innerText);        
        let selectedTotal = selected.map(seat => seat.value).reduce((x, y) => x + y);
        selected.map(seat => {
            seat.classList.remove('selected');
            seat.classList.add('occupied');
        });

        createUi(list.value, selectedSeats, selectedTotal);
        addBooking.reset();
        seatNum.innerText = '0';
        selectMovie.innerText = list.value;
        
    }else{
        alert('Please Select Movie');
    }
});

