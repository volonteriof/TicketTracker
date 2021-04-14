document.querySelector(".form").addEventListener("submit", saveTicket);

function saveTicket(e) {
  let ticketDesc = document.querySelector(".ticket__desc").value;
  let ticketPriority = document.querySelector(".ticket__priority").value;
  let ticketAssign = document.querySelector(".ticket__assign").value;
  //Generate a random GUID using chance.js
  let ticketId = chance.guid();
  let ticketStatus = "Aperto";

  let ticket = {
    id: ticketId,
    description: ticketDesc,
    priority: ticketPriority,
    assign: ticketAssign,
    status: ticketStatus,
  };

  if (localStorage.getItem("tickets") == null) {
    let tickets = [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
  } else {
    let tickets = JSON.parse(localStorage.getItem("tickets"));
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }

  document.querySelector(".form").reset();

  fetchTickets();

  e.preventDefault();
}

function setStatusClosed(id) {
  let tickets = JSON.parse(localStorage.getItem("tickets"));

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      tickets[i].status = "Chiuso";
    }
  }

  localStorage.setItem("tickets", JSON.stringify(tickets));

  fetchTickets();
}

function deleteTicket(id) {
  let tickets = JSON.parse(localStorage.getItem("tickets"));

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      tickets.splice(i, 1);
    }
  }

  localStorage.setItem("tickets", JSON.stringify(tickets));

  fetchTickets();
}

function fetchTickets() {
  let tickets = JSON.parse(localStorage.getItem("tickets"));
  let ticket__list = document.querySelector(".ticket__list");

  ticket__list.innerHTML = "";

  for (let i = 0; i < tickets.length; i++) {
    let id = tickets[i].id;
    let desc = tickets[i].description;
    let priority = tickets[i].priority;
    let assign = tickets[i].assign;
    let status = tickets[i].status;

    ticket__list.innerHTML += ` 
    <div class="ticket">
      <h6>Ticket ID: ${id}</h6>
      <p><span class="label label-info">${status}</span></p>
      <h3>${desc}</h3>
      <div>
        <span><img src="svg/clock.svg" alt="Priority"> ${priority}</span>
        <span><img src="svg/person.svg" alt="Person">${assign}<span>
      </div>
      <div onclick="setStatusClosed('${id}')" class="button button--close">Chiudi</div>
      <div onclick="deleteTicket('${id}')" class="button button--delete">Cancella</div>
    </div>
    `;
  }
}
