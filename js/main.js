$(document).ready(function() {


	sendRequest();	

	function sendRequest() {
		var dateList = $("#date-list");
		var dateForm = $('#date-form');
		var inputStartDate = $("#date-start");
		var inputEndDate = $("#date-end");
		var submitButton = $("#submit-button");
		var alertMessage = $('<p class="alert-text">Введите начальную и конечную дату</p>');
		var startDate;
		var endDate;

		inputStartDate.on('input', function() {
			startDate = $(this).val();
			console.log(startDate);
		});

		inputEndDate.on('input', function() {
			endDate = $(this).val();
			console.log(endDate);
		});


		submitButton.click(function(e) {
			e.preventDefault();

			if (!startDate || !endDate) {
				dateForm.append(alertMessage);
				return;
			}

			alertMessage.remove();

			// https://www.coindesk.com/api/
			// var currentprice = "https://api.coindesk.com/v1/bpi/currentprice.json";
			// var datePeriod = "https://api.coindesk.com/v1/bpi/historical/close.json";
			
			$.ajax({
				url: "https://api.coindesk.com/v1/bpi/historical/close.json?start=" + startDate + "&end=" + endDate + "",
				dataType: "json",
				success: function(data) {
					var list = data.bpi;
					/*console.log(data);
					console.log(list);*/
					
					console.log(list)
					dateList.empty();

					var datesArray = []; // array for the dates
					var courseValues = []; // array for the course price value

					for (var value in list) {
						dateList.removeClass('hide');
						dateList.append('<li class="list__item">' + value + ':<strong class="list__price">' + list[value] + ' $</strong></li>');
						datesArray.push(value);
						courseValues.push(list[value]);
					}

					console.log(datesArray);
					console.log(courseValues);


					// Create chart with data from coindesk
					var ctx = document.getElementById('myChart').getContext('2d');
					var chart = new Chart(ctx, {
						// The type of chart we want to create
						type: 'line',

						// The data for our dataset
						data: {
							labels: datesArray,
							datasets: [{
								label: "Bitcoin course $USD",
								backgroundColor: 'rgb(255, 99, 132)',
								borderColor: 'rgb(0, 0, 0)',
								pointRadius: 4,
								data: courseValues,
							}]
						},

						// Configuration options go here
						options: {
							title: {
								display: true,
								text: 'Bitcoin course chart'
							}
						}
					});

				}
			});
		})
	}


	function createChart() {
// 		var ctx = document.getElementById('myChart').getContext('2d');
// 		var chart = new Chart(ctx, {
// 	// The type of chart we want to create
// 	type: 'line',

// 	// The data for our dataset
// 	data: {
// 		labels: ["January", "February", "March", "April", "May", "June", "July"],
// 		datasets: [{
// 			label: "My First dataset",
// 			backgroundColor: 'rgb(255, 99, 132)',
// 			borderColor: 'rgb(0, 0, 0)',
// 			pointRadius: 4,
// 			data: [0, 10, 5, 2, 20, 30, 45],
// 		}]
// 	},

// 	// Configuration options go here
// 	options: {
// 		title: {
// 			display: true,
// 			text: 'Custom Chart Title'
// 		}
// 	}
// });
}

});