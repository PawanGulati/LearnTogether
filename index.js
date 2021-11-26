const app = require('./server')
const {PORT} = require('./config')

// listening to server
app.listen(PORT || 8080 , ()=>{
    console.log(`server running @${PORT}`);
})