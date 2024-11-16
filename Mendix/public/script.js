// document.addEventListener('DOMContentLoaded', () => {
//     const tableBody = document.getElementById('table-body');

//     // Fetch data from the server
//     fetch('/api/records')
//         .then(response => response.json())
//         .then(data => {
//             // Populate table rows dynamically
//             data.forEach(record => {
//                 const row = document.createElement('tr');
//                 row.classList.add('border-t', 'border-gray-600');

//                 row.innerHTML = `
//                     <td class="px-4 py-2">${record.T_ID}</td>
//                     <td class="px-4 py-2">${record.T_START}</td>
//                     <td class="px-4 py-2">${record.T_DESTINATION}</td>
//                     <td class="px-4 py-2">${record.T_DETIME}</td>
//                     <td class="px-4 py-2">${record.T_ARTIME}</td>
//                     <td class="px-4 py-2">${record.T_TICKETPRICE} Bath</td>
//                     <td class="px-10 py-2 text-right">
//                         <button>
//                             <img src="/Edit_blue.svg" alt="Edit Icon" class="h-6 w-6" />
//                         </button>
//                     </td>
//                 `;

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });


document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');

    fetch('/api/records')
        .then(response => response.json())
        .then(data => {
            data.forEach(record => {
                const row = document.createElement('tr');
                row.classList.add('border-t', 'border-gray-600');

                row.innerHTML = `
                    <td class="px-4 py-2">${record.T_ID}</td>
                    <td class="px-4 py-2">${record.T_START}</td>
                    <td class="px-4 py-2">${record.T_DESTINATION}</td>
                    <td class="px-4 py-2">${record.T_DETIME}</td>
                    <td class="px-4 py-2">${record.T_ARTIME}</td>
                    <td class="px-4 py-2">${record.T_TICKETPRICE} Bath</td>
                    <td class="px-4 py-2">${record.T_SEAT}</td>
                    <td class="px-10 py-2 text-right">
                        <button class="edit-btn" data-id="${record.T_ID}">
                            <img src="Edit_blue.svg" alt="Edit Icon" class="h-6 w-6" />
                        </button>
                    </td>
                `;

                tableBody.appendChild(row);
            });

            // Attach event listeners to all edit buttons
            const editButtons = document.querySelectorAll('.edit-btn');
            editButtons.forEach(button => {
                button.addEventListener('click', event => {
                    const trainId = event.target.closest('button').getAttribute('data-id');
                    window.location.href = `/edit?id=${trainId}`;
                });
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});


document.addEventListener('DOMContentLoaded', () => {
    // Get the query parameters from the URL
    const params = new URLSearchParams(window.location.search);
    const trainId = params.get('id');
    console.log("hello");

    // If there's a valid train ID, fetch the corresponding train data
    if (trainId) {
        fetch(`/api/records/${trainId}`)
            .then(response => response.json())
            .then(data => {
                
                // Pre-fill the form fields with the fetched data
                document.getElementById('train-id').value = data.T_ID;
                document.getElementById('start-location').value = data.T_START;
                document.getElementById('destination').value = data.T_DESTINATION;
                document.getElementById('departure-time').value = data.T_DETIME;
                document.getElementById('arrival-time').value = data.T_ARTIME;
                document.getElementById('ticket-price').value = data.T_TICKETPRICE;
                document.getElementById('seat').value = data.T_SEAT;
            })
            .catch(error => console.error('Error fetching train data:', error));
    }
});
