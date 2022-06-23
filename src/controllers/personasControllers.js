const personas = [];

const getPersonas = (req, res) => {
    console.log(personas);
    res.render('main.ejs', { personas })
}

const addPersona = (req, res) => {
    personas.push(req.body)
    res.redirect('/personas')
}

module.exports = {
    getPersonas,
    addPersona,
}