export class Player {
    constructor(public p: IPlayer, public ind: number) {
        Object.assign(this, p);
    }
}

interface IPlayer {
    displayName: string;
    uid: string;
}
