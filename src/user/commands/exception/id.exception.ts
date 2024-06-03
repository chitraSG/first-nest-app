export class IdException extends Error{
    constructor(message?: string){
        super(message || 'Id is not vaild abcd')
    }
}