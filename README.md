# IP Insight API Documentation

## Introduction
Welcome to the documentation for IP Insight API. This documentation provides information on how to use the API endpoints, authentication, request and response formats, and examples.

## Authentication
To access the API, you will need to authenticate using an API key. You can obtain an API key by registering on our platform.

## API Endpoints

### /ip Endpoint
Retrieves the public IP address of the client making the request.
- **HTTP Method:** GET
- **Endpoint:** /ip
- **Example Request:**
    ```
    GET /ip
    Host: ip-insight-api.up.railway.app
    ```
- **Example Response:**
    ```
    HTTP/1.1 200 OK
    Content-Type: text/plain

    188.204.115.49
    ```

### /ip/:ipAddress Endpoint
Retrieves information about a specified IP address, including its location and timezone.
- **HTTP Method:** GET
- **Endpoint:** /ip/:ipAddress
- **Parameters:** ipAddress (string)
- **Example Request:**
    ```
    GET /ip/188.204.115.49
    Host: ip-insight-api.up.railway.app
    ```
- **Example Response:**
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "status":"success",
        "country":"Netherlands",
        "countryCode":"NL",
        "region":"GE",
        "regionName":"Gelderland",
        "city":"Doetinchem",
        "zip":"7001",
        "lat":51.9647,
        "lon":6.29377,
        "timezone":{
            "year":2023,
            "month":9,
            "day":10,
            "hour":9,
            "minute":16,
            "seconds":25,
            "milliSeconds":273,
            "dateTime":"2023-09-10T09:16:25.273857",
            "date":"09/10/2023",
            "time":"09:16",
            "timeZone":"Europe/Amsterdam",
            "dayOfWeek":"Sunday",
            "dstActive":true
        },
        "isp":"KPN B.V.",
        "org":"Le Petit Pain",
        "as":"AS1136 KPN B.V.",
        "query":"188.204.115.49",
        "countryFlagSrc":"http://flags.fmcdn.net/data/flags/normal/nl.png"
    }
    ```

### /scan-ports/:ipAddress/:startPort/:endPort Endpoint
Scans a range of ports on a specified IP address to check for open ports.
- **HTTP Method:** GET
- **Endpoint:** /scan-ports/:ipAddress/:startPort/:endPort
- **Parameters:** ipAddress (string), startPort (integer), endPort (integer)
- **Example Request:**
    ```
    GET /scan-ports/188.204.115.49/80/100
    Host: ip-insight-api.up.railway.app
    ```
- **Example Response:**
    ```
    HTTP/1.1 200 OK
    Content-Type: application/json

    {
        "openPorts": [80, 81, 82]
    }
    ```

### Errors
In case of errors, the API will return appropriate HTTP status codes and error messages in the response body. Here are some common error codes:
- **400 Bad Request:** Invalid request parameters.
- **401 Unauthorized:** Missing or invalid API key.
- **404 Not Found:** The requested resource does not exist.
- **500 Internal Server Error:** An unexpected error occurred on the server.

## Conclusion
This documentation provides an overview of your API's endpoints and how to use them. If you have any questions or need further assistance, please contact me at [me@tunahan.at](mailto:me@tunahan.at).
