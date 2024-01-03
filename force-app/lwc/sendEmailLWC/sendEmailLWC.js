import { LightningElement,track,wire,api } from 'lwc';
import sendEmail from '@salesforce/apex/Vicky_SendEmailController.sendEmail';

export default class SendEmailLWC extends LightningElement {

   // @api selectedClients = [];
    @api isModalOpen;
    @track toAddress = '';
    @track subject = '';
    @track emailBody = '';
    _selectedClients = [];

    @api
    get selectedClients() {
        return this._selectedClients;
    }

    set selectedClients(value) {
        this._selectedClients = value;
        this.toAddress = value.map(client => client.Email).join(';');
    }

    connectedCallback() {  
        console.log('CLIENTS 1',this.selectedClients);
        if(this.selectedClients && Array.isArray(this.selectedClients) && this.selectedClients.length >0){
            this.toAddress = this.selectedClients.map(client => client.Email).join(';');
            console.log('ADDRESS',this.toAddress);
            console.log('CLIENTS',this.selectedClients);
        }
           
    }

    closeModal() {
        this.isModalOpen = false;
        this.resetFields();
    }

    resetFields() {
        this.toAddress = '';
        this.subject = '';
        this.emailBody = '';
    }

    handleSubjectChange(event) {
        this.subject = event.target.value;
        console.log('SUB',this.subject);
    }

    handleBodyChange(event) {
        this.emailBody = event.target.value;
    }

    handleSubmit() {
        // Split the sendTo string into an array of email addresses
        if(this.subject && this.emailBody){
            console.log('there is subject,body present');
            this.sendEmailToClients();

        }else{
            console.error('Fill subject and body:');
        }
        
    }

    sendEmailToClients() {  
        if (this.toAddress && this.subject && this.emailBody) {
            // Extract email addresses from selectedClients
            const toAddresses = this.selectedClients.map(client => client.Email);
            console.log('ADDRESSes',this.toAddresses);
            sendEmail({ toAddresses, subject: this.subject, body: this.emailBody })
                .then(result => {
                    console.log('Email sent successfully:', result);
                    this.closeModal();
                })
                .catch(error => {
                    // Handle error, e.g., show an error message
                    console.error('Error sending email:', error);
                });
        } else {
            // Handle error or show a message to the user
            console.error('Please fill out all fields.');
        }
    }
}