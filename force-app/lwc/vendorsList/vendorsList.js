// VendorList.js
import { LightningElement, wire, track ,api} from 'lwc';
import getContacts from '@salesforce/apex/Vicky_SendEmailController.getContacts';
import SendEmailLWC  from 'c/sendEmailLWC';

export default class VendorsList extends LightningElement {
    @track selectedClients=[]; 
    @track vendors = [];
    @track isModalOpen=false;

    // Define the columns for the Lightning Datatable
    columns = [
        { label: 'Name', fieldName: 'Name', type: 'text' },
        { label: 'Email', fieldName: 'Email', type: 'email' }
    ];

    // Wire the getVendors Apex method to fetch vendor data
    @wire(getContacts)
    wiredVendors({ error, data }) {
        if (data) {
            this.vendors = data;
        } else if (error) {
            console.error('Error fetching vendors:', error);
        }
    }

    handleRowSelection(event) {
        this.selectedClients = event.detail.selectedRows;
         this.selectedClients.map(row => {
            console.log('SELECTED',row.Email);
        });
    }

    openEmailModal(){
        
        this.isModalOpen=true;
    }
}