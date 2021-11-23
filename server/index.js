const app = require('./server')
const {PORT} = require('./config')

// listening to server
app.listen(PORT,()=>{
    console.log(`server running @${PORT}`);
})