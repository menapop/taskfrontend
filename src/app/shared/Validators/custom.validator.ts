import { AbstractControl, FormGroup} from '@angular/forms';

export class CustomValidators {


    static url (c: AbstractControl) :  {[key : string] : boolean} | null 
    {
     
        const urlRegexExpression = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
        
      if (!c.value || urlRegexExpression.test(c.value)) {
  
            return null;
          }
           else
            {
                return { 'url': true };
            }
        };

     
      
}
