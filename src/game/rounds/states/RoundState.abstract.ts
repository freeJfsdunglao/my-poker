import { BetAction, RoundName } from "src/common/constants";

export abstract class RoundStateAbstract {
    constructor() {}
    
    public abstract get name(): RoundName; 
    public abstract start(): Promise<void>;
    public abstract end(): Promise<void>;
    public abstract get nextRound(): RoundName;

    public availableActions(): BetAction[] {
        const actionsAvailable: BetAction[] = [];
        
        return actionsAvailable;
    }

    public call() {}

    public bet() {}

    public raise() {}

    public blind() {}

    public check() {}

    public fold() {}

    public getWinners() {}
}