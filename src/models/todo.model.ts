//Definindo uma classe pública no Typescript

export class Todo{
    
    constructor(
        public id: number,
        public tarefa: string,
        public done: boolean
        
    ) 
    { }
}