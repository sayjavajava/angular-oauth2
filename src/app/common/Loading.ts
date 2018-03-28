export class Loading {
    private _isLoading:boolean = true;
    
constructor(){} 
    
    get isLoading():boolean {
        return this._isLoading;
    }
    set isLoading(theBar:boolean) {
        this._isLoading = theBar;
    }
}