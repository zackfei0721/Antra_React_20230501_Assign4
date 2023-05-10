// GET: A GET request fetches data from a server. 
// It doesn't have a body, so you just need to initialize
//  the request and send it

// POST: A POST request sends data to a server. 
// It needs a body, which you pass to send()

// PUT: A PUT request also sends data to a server, 
// and it also needs a body. 
// It's used for updating existing resources, while POST 
// is usually used for creating new resources

// DELETE: A DELETE request asks the server to delete a resource. 
// It usually doesn't need a body

// XHR: xhr.open(method, url, async(default true));

function myFetch(url, method, body, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);

    // invoke onload() when request is completed,
    // whether succeeded or failed
    xhr.onload = function() {
        if(this.status >= 200 && this.status < 400) {
            //if code is 200~399, meaning the request is success
            var data = JSON.parse(this.response);// convert data into JSON format
            callback(null, data); //callback takes 2 args(error, data)
        }
        else {
            // if code is outside 200~399, meaning an error occured
            callback(new Error('Request failed: ' + this.status), null);
        }
    };

    // event listener for all error events
    xhr.onerror = function() {
        callback(new Error('Connection Error'), null);
    };

    if (method === 'POST' || method === 'PUT') {
        //XHR.setRequestHeader(header, value);
        // header: a string representing the header name:
        // 'Content-Type', 'Authorization', 'Accept', etc.
        // value: a string representing the header value, 
        // the value you want to set for the specified header field
        xhr.setRequestHeader('Content-type', 'application/json');
        // for PUT and POST, the JSON string is required for their body parameters
        xhr.send(JSON.stringify(body));
    }
    else {
        xhr.send();
    }

}

// GET using fetch():
// .then(resolved, rejected);
fetch('data.json')
.then(response => {
    if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
    }
    // if no error occured during the process, parse the body
    // as JSON and return its promise
    return response.json;
})
.then(data => {
    // If request is successful, execute functions here that handle data
    //  from previously returned response.JSON
    console.log('Data from fetch(): ', data);
})
.catch(error => {
    // functions that handle existing errors
    console.log('ERROR: ', error);
});

// GET using myFetch():
myFetch('data.json', 'GET', null, function(error, data) {
    if(error) {console.log(error); }
    else {console.log('Data from myFetch(): ', data); }
});
// The result indicates GET using both fetch() and myFetch() could work.
// However, I think the other methods(PUT, DELETE, POST) must be done
// in server`s end, and I dont have any access to a working url(I used a local
// JSON file for GET), but theoretically they should also work
