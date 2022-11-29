// Client ID and API key from the Developer Console
var CLIENT_ID = '40892146586-0hlvn8ugb7a2s644ek1ighfmue8r0mri.apps.googleusercontent.com';
var API_KEY = 'AIzaSyC2ZegEbR7wq-EcNGLBKR_2GX7WmwlyarI';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/spreadsheets";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

/**
 *  On load, called to load the auth2 library and API client library.
 */
async function handleClientLoad() {
  await gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  }, function(error) {
    appendPre(JSON.stringify(error, null, 2));
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    // listMajors();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  var pre = document.getElementById('content');
  var textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

function createNewSpreadsheet(title) {
  gapi.client.sheets.spreadsheets.create({
    properties: {
      title: title
    }
  }).then((response) => {
  });
}


/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listValues(spreadhseetID) {
  var request = gapi.client.sheets.spreadsheets.values.get(
      {spreadsheetId: spreadhseetID, range: ['Raw!A1:A5']}
    );
      request.then(function(response) {
        // TODO: Change code below to process the `response` object:
        if (response.result.values.length > 0) {
          for (i = 0; i < response.result.values.length; i++) {
            var row = response.result.values[i];
            console.log(row);
          }
        } else {
          console.log('No data found.');
      }
    });
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadhseetID,
    range: 'Raw',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      // appendPre('Value');
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        return row;
        // Print columns A and E, which correspond to indices 0 and 4.
        appendPre(row[0] + ', ' + row[4]);
      }
    } else {
      console.log('No data found.');
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

function addRow(spreadhsheetID, description, date, cb) {
  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: spreadhsheetID, 

    // The A1 notation of a range to search for a logical table of data.
    // Values will be appended after the last row of the table.
    range: 'A2:O2', 

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',  

    // How the input data should be inserted.
    insertDataOption: 'INSERT_ROWS',
  };

  var valueRangeBody = {
      values: [[date, "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", description]]
  };

  var request =  gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody)
  .then(function(response) {
    cb(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    alert(error.message);
  });
}

/** Update row(s) in the spreadsheet */
function updateRow(spreadhsheetID, range, valuesArray, cb) {

  var params = {
    // The ID of the spreadsheet to update.
    spreadsheetId: spreadhsheetID, 

    // The A1 notation of the values to update.
    range: range,  // TODO: Update placeholder value.

    // How the input data should be interpreted.
    valueInputOption: 'USER_ENTERED',
  };

  var values = [
    valuesArray
  ];
  var body = {
    values: values
  };

  var valueRangeBody = {
    resource: body
  };

  var request = gapi.client.sheets.spreadsheets.values.update(params, body);
  request.then(function(response) {
    // TODO: Change code below to process the `response` object:
    console.log(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
    alert(error.message);
  });
}