public with sharing class PortfolioController {
    @AuraEnabled(cacheable=true)
    public static List<Portfolio_Detail__mdt> getPortfolioData() {
        return [
            SELECT Title_c__c, Description_c__c, Start_Year_c__c, End_Year_c__c, Category_c__c
            FROM Portfolio_Detail__mdt
        ];
    }
}
