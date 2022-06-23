/* const meterController = (req, res) => {
try{
    console.log(req.query);
    res.render('data.pug', req.query)
}
catch(e){
    console.log('Error: ', e);
    res.sendStatus(500);
}} */


meterController = (req, res) => {
    try{
        const {min, value, max} = req.query;
        console.log(req.query);
        res.render('meters.ejs', req.query)
    }
    catch(e){
        console.log('Error: ', e);
        res.sendStatus(500);
    }}

module.exports = {
    meterController,
}