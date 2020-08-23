import React, { Component } from 'react';
class termsandCondn extends Component {
    goBack =()=> {
        this.props.history.push('/register');

    }
    render() { 
        return ( 
            <div className="well">
                <p> Terms to use
                    

you give your consent to Capgemini to process
 (which includes in particular collecting, recording, storing, utilizing, 
 sharing or transferring) any Personal Identifiable Information (defined 
 as information associated with your name or personal identity including 
 your date of birth, address/e-mail address, telephone number, unique government
 issued number, passport details, driving license number) and any Sensitive
 Personal Data or Information (namely, password, financial information
 such as bank account, physical, physiological and mental health condition,
 sexual orientation, medical records and history, biometric information) 
 which may be in the possession of Capgemini or obtained in future.  Such 
 information shall be processed by Capgemini strictly on a need to know 
 basis and retained till required for business purposes including statutory 
 requirements pertaining to compensation and benefits.

You acknowledge and agree that such information may be transferred, 
on a business need to know basis, to Capgemini’ s subsidiary / affiliated 
companies, business partners, external consultants, vendors and its customers
 (where specifically requested) with obligations to maintain similar level of protection.

You will have full rights to access and review your data, update it and the right to withdraw this consent, if necessary.

Your records and information will be kept secure and handled strictly in accordance with the Capgemini Data Classification Guidelines and Data Privacy Policy.
                </p>
               
            </div>
         );
    }
}
 
export default termsandCondn;