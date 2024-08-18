export async function delayFunction (time, func, ...params){

   
    const random = Math.round(Math.random() * time);
    

    await new Promise((resolve) => setTimeout(resolve, random * 1000));
    func(params[0], params[1], params[2], params[3]);
      


}