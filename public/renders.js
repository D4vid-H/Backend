
export const renderTemplateProducts = async (product) => {
    try{
        const datos = await fetch('./products.hbs');
        const plantilla = await datos.text();
        const template = Handlebars.compile(plantilla);
        const html = template(product);
        document.querySelector('#prodContainer').innerHTML += html;                
    }catch(error){
        console.log(`Hay error: ${error}`);
    }
}

export const renderTemplateMessages = async (message) => {
    try{
        const datos = await fetch('./post.hbs');
        const plantilla = await datos.text();
        const template = Handlebars.compile(plantilla);
        const html = template(message);
        document.querySelector('#messageContainer').innerHTML += html;                
    }catch(error){
        console.log(`Hay error: ${error}`);
    }
}