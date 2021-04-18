const http = require('http');
const got = require('got');
var {google} = require('googleapis');
const {GoogleAuth} = require('google-auth-library');
const auth = new GoogleAuth();

const serviceUrl = 'https://backend-7tt2isxsdq-wl.a.run.app';

const server = http.createServer(function (req, res) {
  googAuthClient(req, res);
});

/**
 * Get tokenID using JWT which is signed by Service key that stored locally.
 */
function selfSignedJWT(req, res) {
  // The service account JSON key file to use to create the Identity Token
  const privatekey = require('./config/vmmi-pipeline-development-0f687b2df86e.json')

  // The audience that this ID token is intended for (example Google Cloud Run service URL)
  // Do not use a custom domain name, use the Assigned by Cloud Run url
  let audience = serviceUrl;

  let jwtClient = new google.auth.JWT(
    privatekey.client_email,
    null,
    privatekey.private_key,
    audience
  )

  jwtClient.authorize().then((token) => {
    const serviceRequestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${token.id_token}`,
      },
      timeout: 3000,
    };

    got(serviceUrl, serviceRequestOptions).then((serviceResponse) => {
      res.setHeader("Content-Type", "application/json");
      res.writeHead(200);
      res.end(serviceResponse.body);
    }).catch((error) => {
      res.writeHead(500);
      res.end(error.message);
    });
  });
}

/**
 * Get tokenID using Client `google-auth-library` library based on Service Key defined in GOOGLE_APPLICATION_CREDENTIALS env variable.
 */
function googAuthLibrary(req, res) {
  // The audience that this ID token is intended for (example Google Cloud Run service URL)
  // Do not use a custom domain name, use the Assigned by Cloud Run url
  let audience = serviceUrl;

  auth.getIdTokenClient(audience).then((idTokenClient) => {
    idTokenClient.idTokenProvider.fetchIdToken(audience).then((idToken) => {
      const serviceRequestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': `Bearer ${idToken}`,
        },
        timeout: 3000,
      };

      got(serviceUrl, serviceRequestOptions).then((serviceResponse) => {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(serviceResponse.body);
      }).catch((error) => {
        res.writeHead(500);
        res.end(error.message);
      });
    });
  });
}

function googAuthClient(req, res) {
  // The audience that this ID token is intended for (example Google Cloud Run service URL)
  // Do not use a custom domain name, use the Assigned by Cloud Run url
  let audience = serviceUrl;

  google.auth.getClient({
    scopes: audience
  }).then((jwtClient) => {
    jwtClient.authorize().then((token) => {
      const serviceRequestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': `Bearer ${token.id_token}`,
        },
        timeout: 3000,
      };

      got(serviceUrl, serviceRequestOptions).then((serviceResponse) => {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(serviceResponse.body);
      }).catch((error) => {
        res.writeHead(500);
        res.end(error.message);
      });
    });
  });
}

server.listen(5000);
console.log('Node.js web server at port 5000 is running..')
