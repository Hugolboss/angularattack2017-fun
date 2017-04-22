export class Player {
    constructor(public p: IPlayer, public i: number){
        Object.assign(this, p)
    }
}

interface IPlayer {
    displayName: string;
    uid: string;
}