


interface UserHeadingStrategy{
    getUserHeading(): void;
}

interface UserInitialHeadingStrategy extends UserHeadingStrategy{
    getUserHeading(): void;
}

interface RealtiveNorthHeadingStrategy{
    getUserHeading(): void;
}

class NorthHeadingStrategy implements UserInitialHeadingStrategy {
    getUserHeading(): void {
        throw new Error("Method not implemented.");
    }
}



class UserHeading{
    strategy: UserInitialHeadingStrategy

    constructor(strategy: UserInitialHeadingStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: UserHeadingStrategy): void {
        this.strategy = strategy;
    }


    getUserHeading(){

    }

}


