public without sharing class PortfolioEmailService {

    public static void sendOwnerEmail(String name, String email, String message) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[]{ 'akgadhafi.developer01@gmail.com' });
        mail.setSubject('New Portfolio Contact: ' + name);

        mail.setPlainTextBody(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            'Message:\n' + message
        );

        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ mail });
    }

    public static void sendThankYouEmail(String name, String email, Boolean includeResume) {
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(new String[]{ email });
        mail.setSubject('Thank you for contacting me');

        String body =
            'Hi ' + name + ',\n\n' +
            'Thank you for visiting my portfolio.\n';

        if (includeResume) {
            body += '\nYou can download my resume here:\n' +
                    'https://yourdomain.my.salesforce.com/resource/MyResumePDF\n';
        }

        body += '\nBest regards,\nAbdul Kareem Gadhafi';

        mail.setPlainTextBody(body);

        Messaging.sendEmail(new Messaging.SingleEmailMessage[]{ mail });
    }
}
