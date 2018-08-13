// JavaScript Document
(function($) {
	"use strict"; // Start of use strict

	$(document).ready( function() {
		
		// Get and Assign the form
		var form = $('#contact-form');
		
		// Validate the form
		$(form).validator();
		
		// Processes the Submitted Form after it has been Validated
		$(form).submit(function(event) {
			
			 // if the validator does not prevent form submit
			if (!event.isDefaultPrevented()) {
				$.ajax({
					type: 'POST', // Defines the type of HTTP verb we want to use (POST for our form)
					url: $(form).attr('action'), // Uses the url for the PHP script found in the form
					data: $(this).serialize(), // Defines the form data and serializes it
					dataType: 'json', // Defines what type of data do we expect back from the server
					encode: true,
				})
				.done(function(data) {
					// defines the type and message (success or failure) 
					var messageAlert = 'alert-' + data.type;
					var messageText = data.message;

					// If we have messageAlert and messageText

					if (messageAlert && messageText) {

						// Creates a Bootstrap Alert
						var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissible fade show" role="alert">' + messageText + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

						// Injects the Alert into the submission div in our form
						$('#submission').append(alertBox);

						// Reset the form
						$(form)[0].reset();
					}
					else {

						// If we are missing part or all of the contact form information
						var alertError = 'Something went wrong with the form. Please try again later.';
						var alertFail = '<div class="alert alert-warning alert-dismissible fade show">' + alertError + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';

						// Injects the Alert into the submission div in our form
						$('#submission').append(alertFail);	
					}
				});
			}
			
			// Stops the Form from submitting normally and refreshing the page
			event.preventDefault();
			
		});
	});
})(jQuery); // End of use strict