public with sharing class JourneyFilesController {
    @AuraEnabled(cacheable=true)
    public static Map<String, String> getJourneyFiles() {
        List<ContentVersion> files = [
            SELECT Id, Title
            FROM ContentVersion
            WHERE Title IN ('lightVideo','lightCloud','darkCloud')
            AND IsLatest = true
        ];

        Map<String, String> fileUrls = new Map<String,String>();
        for(ContentVersion cv : files){
            fileUrls.put(cv.Title, '/sfc/servlet.shepherd/version/download/' + cv.Id);
        }

        System.debug('File URLs: ' + fileUrls);
        return fileUrls;
    }

}
