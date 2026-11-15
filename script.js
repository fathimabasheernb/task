let selectedSeats = [];

let zoomLevel = 1;

const seatPrices = {
    recliner: 1280,
    premium: 640,
    executive: 620
};

function createSeats(containerId, rows, totalSeats, category) {

    const container = document.getElementById(containerId);

    rows.forEach((row, rowIndex) => {

        const rowDiv = document.createElement("div");

        rowDiv.className = "seat-row";

        const rowName = document.createElement("span");

        rowName.className = "row-name";

        rowName.innerText = row;

        rowDiv.appendChild(rowName);


        for (let i = 1; i <= totalSeats; i++) {

            const seat = document.createElement("button");

            seat.className = "seat";

            seat.innerText = i;

            seat.dataset.category = category;
            seat.dataset.row = row;
            seat.dataset.number = i;

            if (
                (rowIndex === 0 && i % 3 !== 0) ||
                (rowIndex === 1 && i === 2) ||
                (rowIndex === 2 && i === 5) ||
                (rowIndex === 3 && i === 8)
            ) {

                seat.classList.add("sold");

            }

            seat.addEventListener("click", function () {

                if (seat.classList.contains("sold")) {
                    return;
                }

                const seatId = category + "-" + row + "-" + i;


                if (seat.classList.contains("selected")) {

                    seat.classList.remove("selected");

                    selectedSeats = selectedSeats.filter(
                        item => item.id !== seatId
                    );

                }

                else {

                    if (selectedSeats.length >= 6) {

                        alert("You can select maximum 6 seats!");

                        return;

                    }

                    seat.classList.add("selected");

                    selectedSeats.push({

                        id: seatId,
                        category: category,
                        row: row,
                        number: i,
                        price: seatPrices[category]

                    });

                }

                updateBooking();

            });


            rowDiv.appendChild(seat);

        }

        container.appendChild(rowDiv);

    });

}

createSeats(
    "recliner",
    ["K"],
    14,
    "recliner"
);

createSeats(
    "premium",
    ["J", "I", "H", "G", "F"],
    18,
    "premium"
);

createSeats(
    "executive",
    ["E", "D", "C", "B", "A"],
    18,
    "executive"
);

function updateBooking() {

    let count = selectedSeats.length;

    let total = selectedSeats.reduce(
        (sum, seat) => sum + seat.price,
        0
    );


    document.getElementById("ticketCount").innerText =
        count + (count === 1 ? " Ticket" : " Tickets");


    const bookBtn = document.getElementById("bookBtn");


    if (count > 0) {

        bookBtn.disabled = false;

        bookBtn.innerText = "Pay ₹" + total;

    }

    else {

        bookBtn.disabled = true;

        bookBtn.innerText = "Select Seats";

    }

}

function bookTickets() {

    if (selectedSeats.length === 0) {

        alert("Please select your seats!");

        return;

    }


    let details = selectedSeats.map(seat =>
        seat.row + seat.number
    ).join(", ");


    let total = selectedSeats.reduce(
        (sum, seat) => sum + seat.price,
        0
    );


    alert(
        "Booking Successful!\n\n" +
        "Seats: " + details +
        "\nTickets: " + selectedSeats.length +
        "\nTotal Amount: ₹" + total
    );

}

const timeButtons = document.querySelectorAll(".time");

timeButtons.forEach(button => {

    button.addEventListener("click", function () {

        timeButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

    });

});

function zoomIn() {

    zoomLevel += 0.1;

    document.querySelectorAll(".category").forEach(category => {

        category.style.zoom = zoomLevel;

    });

}

function zoomOut() {

    zoomLevel = Math.max(0.7, zoomLevel - 0.1);

    document.querySelectorAll(".category").forEach(category => {

        category.style.zoom = zoomLevel;

    });

}
