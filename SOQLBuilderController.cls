/**
 * @Author : Makovskaya Kristina
 * @Date : 25/10/2021
 * @description : This class displays the number of contacts for accounts.
 */
public with sharing class SOQLBuilderController {
    /**
     * Returns a list of object names.
     * @return
     */
    @AuraEnabled
    public static List<String> getObjects() {
        Map<String, Schema.SObjectType> mapObjectNames = Schema.getGlobalDescribe();
        List<String> listObjectNames = new List<String>();
        for (Schema.SObjectType item : mapObjectNames.values()) {
            listObjectNames.add(String.valueOf(item.getDescribe().SObjectType));
        }
        return listObjectNames;
    }
    /**
     * Returns a list of object fields.
     * @param sObjectName object name
     * @return returns a list of fields
     */
    @AuraEnabled
    public static List<String> getFields(String sObjectName) {
        List<String> fieldNames = new List<String>();
        Map<String, Schema.SObjectField> fields = Schema.getGlobalDescribe().get(sObjectName).getDescribe().fields.getMap();
        for (Schema.SObjectField field : fields.values()) {
            fieldNames.add(String.valueOf(field));
        }
        return fieldNames;
    }
    /**
     * Checks the existence of fields in the object. Returns true if there are otherwise false.
     * @param sObjectName
     * @param selectedfieldsName
     * @return true or false
     */
    @AuraEnabled
    public static Boolean getMatches(String sObjectName, String selectedfieldsName) {
        Map<String, Schema.SObjectField> fields = Schema.getGlobalDescribe().get(sObjectName).getDescribe().fields.getMap() ;
        List<String> fieldNames = new List<String>();
        for (Schema.SObjectField field : fields.values()) {
            fieldNames.add(String.valueOf(field));
        }
        Integer count = 0;
        List<String> fieldsNameList = selectedfieldsName.split(';');
        for (String fieldsNameItem : fieldsNameList) {
            if (fieldNames.indexOf(fieldsNameItem) > -1) {
                count++;
            }
        }
        return (fieldsNameList.size() == count) ? true : false;
    }
    /**
     * Executes a query to the database. Returns a list of records.
     * @param query
     * @return list of entries
     */
    @AuraEnabled
    public static List<Object> getTable(String query) {
        List<Object> objects = Database.query(query);
        if (objects.size() == 0) {
            throw new AuraHandledException('Sorry, no records returned.');
        }
        return objects;
    }
}