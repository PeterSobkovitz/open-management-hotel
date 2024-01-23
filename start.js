const app=require('./server');

console.log('not test')
const port = process.env.PORT || 3000;
app.listen(3001,()=>{
    console.log(`Server running on port ${port}`);

});
