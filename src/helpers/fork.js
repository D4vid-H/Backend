const obj = {};

process.on('message', (msg) => {
    try{
        const min = 1;
        const max = 1000;
        if(msg.mensaje !== 0){
            for(let i=0; i < msg.mensaje; i++){
                const random = Math.floor((Math.random() * (max - min + 1)) + min);
                if(obj[random]){
                    obj[random] += 1
        
                }else{
                    obj[random] = 1
                }
            }
            process.send(obj);
            process.exit();
        }else {
            for(let i=0; i < 1e8; i++){
                const random = Math.floor((Math.random() * (max - min + 1)) + min);
                if(obj[random]){
                    obj[random] += 1
        
                }else{
                    obj[random] = 1
                }
            }        
            process.send(obj);
            process.exit();
       }
    }catch(error){
        console.log(`error salida del fork hijo: ${error}`);
    }
    process.exit();
});

process.send('ready');
