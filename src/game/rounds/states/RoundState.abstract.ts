import { BetAction, ErrorCode, RoundName } from "src/common/constants";
import { BetValidationWsException } from "src/exceptions/bet-validation-ws.exception";

export abstract class RoundStateAbstract {
    constructor() {}
    
    public abstract get name(): RoundName; 
    public abstract start(): Promise<void>;
    public abstract end(): Promise<void>;
    public abstract get nextRound(): RoundName;

    public abstract isCallGood(): Promise<boolean>;
    public abstract isBetGood(): Promise<boolean>;
    public abstract isRaiseGood(): Promise<boolean>;
    public abstract isBlindGood(): Promise<boolean>;
    public abstract isCheckGood(): Promise<boolean>;
    public abstract isFoldGood(): Promise<boolean>;

    public async getAvailableActions(): Promise<BetAction[]> {
        const actionsAvailable: BetAction[] = [];

        const isCallingGood = await this.isCallGood();
        const isBettingGood = await this.isBetGood();
        const isRaisingGood = await this.isRaiseGood();
        const isBlindGood = await this.isBlindGood();
        const isCheckingGood = await this.isCheckGood();
        const isFoldingGood = await this.isFoldGood();

        if (isCallingGood === true) {
            actionsAvailable.push(BetAction.CALL);
        }

        if (isBettingGood === true) {
            actionsAvailable.push(BetAction.BET);
        }

        if (isRaisingGood === true) {
            actionsAvailable.push(BetAction.RAISE);
        }

        if (isBlindGood === true) {
            actionsAvailable.push(BetAction.BLIND);
        }

        if (isCheckingGood === true) {
            actionsAvailable.push(BetAction.CHECK);
        }

        if (isFoldingGood === true) {
            actionsAvailable.push(BetAction.FOLD);
        }
        
        return actionsAvailable;
    }

    public abstract additionalRoundStateExclusiveValidation(): boolean;

    public async validateBet(
        action: BetAction,
        chips: number
    ): Promise<boolean> {
        const availableActions = await this.getAvailableActions();
        const isBetActionIncluded = availableActions.includes(action);

        if (isBetActionIncluded === false) {
            throw new BetValidationWsException(
                'Invalid betting action.', 
                ErrorCode.ACTION_UNAVAILABLE
            );
        }

        if (chips < 0 || chips === Infinity) {
            throw new BetValidationWsException(
                'Invalid chip amount.',
                ErrorCode.INVALID_CHIP_AMOUNT
            );
        }

        await this.additionalRoundStateExclusiveValidation();
        
        return true;
    }

    public call() {}

    public bet() {}

    public raise() {}

    public blind() {}

    public check() {}

    public fold() {}

    public getWinners() {}
}