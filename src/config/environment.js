let SERVER_URL = "http://localhost:3300"
if (process.env.REACT_APP_ENV==='development'){
  SERVER_URL = 'https://ad609692.ngrok.io'
}
process.env.SEVER_URL = SERVER_URL;
export { SERVER_URL };