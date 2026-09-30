public with sharing class PortfolioContactController {

    @AuraEnabled
    public static void handleContact(
        String name,
        String email,
        String message,
        Boolean includeResume
    ) {
        try {
            Case c = new Case(
                Subject = 'Portfolio Contact - ' + name,
                SuppliedName = name,
                SuppliedEmail = email,
                Description = message,
                Origin = 'Web'
            );
            insert c;
        } catch (Exception e) {
            throw new AuraHandledException('Unable to submit request.');
        }
    }
}
