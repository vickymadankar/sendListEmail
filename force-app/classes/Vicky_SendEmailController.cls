public with sharing class Vicky_SendEmailController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(){
        List<Contact> fetchedContacts= [Select Id,Name,lastName,Email FROM Contact ];
        return fetchedContacts;
    }

    @AuraEnabled
    public static void sendEmail(List<String> toAddresses, String subject, String body) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(toAddresses);
        email.setSubject(subject);
        email.setPlainTextBody(body);

        try {
            Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email});
        } catch (Exception e) {
            System.debug('Error sending email: ' + e.getMessage());
            throw new AuraHandledException('Error sending email: ' + e.getMessage());
        }
    }
}
