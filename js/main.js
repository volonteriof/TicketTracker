document.querySelector(".form").addEventListener("submit", saveTicket);

function saveTicket(e) {
  const ticketDesc = document.querySelector(".form__desc").value;
  const ticketPriority = document.querySelector(".form__priority").value;
  const ticketAssign = document.querySelector(".form__assign").value;
  //Generate a random GUID using chance.js
  const ticketId = chance.guid();
  const ticketStatus = "Aperto";

  const ticket = {
    id: ticketId,
    description: ticketDesc,
    priority: ticketPriority,
    assign: ticketAssign,
    status: ticketStatus,
  };

  if (localStorage.getItem("tickets") == null) {
    const tickets = [];
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
  } else {
    const tickets = JSON.parse(localStorage.getItem("tickets"));
    tickets.push(ticket);
    localStorage.setItem("tickets", JSON.stringify(tickets));
  }

  document.querySelector(".form").reset();

  fetchTickets();

  e.preventDefault();
}

function setStatusClosed(id) {
  const tickets = JSON.parse(localStorage.getItem("tickets"));

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      tickets[i].status = "Chiuso";
    }
  }

  localStorage.setItem("tickets", JSON.stringify(tickets));

  fetchTickets();
}

function deconsteTicket(id) {
  const tickets = JSON.parse(localStorage.getItem("tickets"));

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i].id == id) {
      tickets.splice(i, 1);
    }
  }

  localStorage.setItem("tickets", JSON.stringify(tickets));

  fetchTickets();
}

function fetchTickets() {
  const tickets = JSON.parse(localStorage.getItem("tickets"));
  const ticket__list = document.querySelector(".ticket__list");

  ticket__list.innerHTML = "";

  for (let i = 0; i < tickets.length; i++) {
    const id = tickets[i].id;
    const desc = tickets[i].description;
    const priority = tickets[i].priority;
    const assign = tickets[i].assign;
    const status = tickets[i].status;

    ticket__list.innerHTML += ` 
    <div class="ticket">
      <p class="ticket__id">Ticket ID: ${id}</p>
      <p class="ticket__status">${status}</p>
      <h3 class="ticket__desc">${desc}</h3>
      <div class="ticket__info"><img src="svg/clock.svg" alt="Priority">${priority}</div>
      <div class="ticket__info"><img src="svg/person.svg" alt="Person">${assign}</div>
      <div class="ticket__buttons">
        <button type="button" onclick="setStatusClosed('${id}')" class="button button--close">Chiudi</button>
        <button type="button" onclick="deconsteTicket('${id}')" class="button button--delete">Cancella</button>
      </div>
    </div>
    `;
  }
}
