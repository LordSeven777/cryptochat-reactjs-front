// Sends a http request to API using XHR and formats response
const sendApiRequest = (url, method = "GET", body = null, headers) => {
  return new Promise((resolve, reject) => {
    // Creating the XHR object
    const xhr = new XMLHttpRequest();
    // Body to send
    let _body = body;

    // Converting the JSON response data to a javascript object
    // xhr.responseType = "text";

    // When the response from the server is ready
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        // Response data
        const responseData = this.response;

        // Error: status >= 400 -> Reject the promise with the response data
        if (this.status >= 400) {
          const error = { status: this.status, data: responseData };
          // Parsing the response data to a javascript object if it is in a JSON format
          if (/application\/json/.test(this.getResponseHeader("Content-Type")))
            error.data = JSON.parse(responseData);
          // Rejecting the error data response
          reject(error);
        }
        // Success: status < 400 -> Resolve the promise with the response data
        else {
          resolve(
            /application\/json/.test(this.getResponseHeader("Content-Type"))
              ? JSON.parse(responseData)
              : responseData
          );
        }
      }
    };

    // Opening the request
    xhr.open(method, url, true);

    // Body content-type
    if (body && !(body instanceof FormData)) {
      xhr.setRequestHeader("Content-Type", "application/json");
      _body = JSON.stringify(_body);
    }

    // Setting the headers if there's any headers configuration provided
    if (headers)
      headers.forEach(({ header, value }) =>
        xhr.setRequestHeader(header, value)
      );

    // Sending the request
    xhr.send(_body);
  });
};

// Writes an HTTP request's query params
const writeQueryParams = queries => {
  // URL encoded query string
  let output = "";
  queries.forEach(({ query, value }, i) => {
    return (output += `${i === 0 ? "?" : "&"}${query}=${
      /\s/.test(value) ? encodeURI(value) : value
    }`);
  });
  return output;
};

export default sendApiRequest;
export { writeQueryParams };
