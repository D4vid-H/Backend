/* const routeContollers = (req, res) =>{
try{
    res.render('main.pug', {title: 'Hola MINIONS', nombre: 'david', apellido: 'wilson', estilos: 'color:red'})

}
catch(e){
    console.log('el error es: ', e ); 
    res.sendStatus(500);
}} */

const routeContollers = (req, res) =>{
    try{
        res.render('plantilla.ejs', {titulo: 'Hola Mundo', tituloDos: 'Chau Mundo', titulotres: '<h1>esto es otra plantilla</h1>', message: '<p>Aqui se renderiza lat cual se pasa el valor</p>', messageDos: '<p>Aqui se renderiza el HTML</p>', render: true})
    
    }
    catch(e){
        console.log('el error es: ', e ); 
        res.sendStatus(500);
    }} 

module.exports = {
    routeContollers,
}