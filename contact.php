<?php
	// Only process POST reqeusts.
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		// email address assigned to the FROM field of an email
		$from = 'Contact form <contact@example.com>';

		// email address that will receive the output from the Contact form
		$to = 'JSebastian@example.com';

		// sanitized subject of the email
		$subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);

		// Translating form fields into an array
		// varaible name => text to appear in the email
		$fields = array(
		'name' => 'Name',
		'email' => 'Email',
		'message' => 'Message'
		);

		// Message displayed when form is successfully sent
		$ok = 'Your message was successfully sent! Thank you, I will get back to you soon!';

		// Message displayed when sending the form is unsuccessful
		$error = 'Something went wrong! Please try again later!';

		// To turn on debugging, replace with error_reporting(E_ALL);
		error_reporting(0);

		try {

			if (count ($_POST) == 0) {
				throw new Exception ('Form is empty.');
			}

			$_POST['name'] = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
			$_POST['email'] = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
			$_POST['message'] = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

			$body = "You have a new message from your contact form\n=============================\n";

			foreach ($_POST as $key => $value) {
				// Checks for a field in $fields array and then includes it in the email body

				if (isset($fields[$key])) {
					$body .= "$fields[$key]: $value\n";
				}
			}

			// Headers for the email.
			$headers = array('Content-Type: text/plain; charset="UTF-8";',
			'From: ' . $from,
			'Reply-To: ' . $from,
			'Return-Path: ' . $from,
			);

			// Sends email
			mail($to, $subject, $body, implode("\n", $headers));

			$response = array('type' => 'success', 'message' => $ok);
		}
		catch (Exception $e) {

			$response = array('type' => 'danger', 'message' => $error);
		}

		$encoded = json_encode($response);

		echo $encoded;
	}
	else {
		// Not a POST request, set a 403 (forbidden) response code.
		http_response_code(403);
		echo "There was a problem with your submission, please try again.";
	}
?>
