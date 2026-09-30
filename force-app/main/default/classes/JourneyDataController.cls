public with sharing class JourneyDataController {
    @AuraEnabled(cacheable=true)
    public static List<JourneyPage_info__mdt> getJourneyData() {
        // ✅ Allow guest access by enabling permissions instead of annotation
        return [
            SELECT Id, Institution_c__c, Year_c__c, Medium_c__c, Place_c__c, Standard_c__c, Detail_c__c FROM JourneyPage_info__mdt ORDER BY Year_c__c ASC
        ];
    }
}


/*“Custom Metadata records cannot be created, updated, or deleted with Apex DML. Use Tooling API or Metadata API only.” */
