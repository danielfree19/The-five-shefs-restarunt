

export class User {
    constructor(private uid: string,private email: string,private photoURL?: string,private displayName?: string){
        this.uid = uid;
        this.email = email;
        if(!photoURL){

        }
        else{
            this.photoURL = photoURL;
        }
        if(!displayName){
            this.displayName=email;
        }     
        else{
            this.displayName = displayName;
        }
    }

    

}
