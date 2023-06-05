import axios from 'axios';

const RECORD_API_BASE_URL = "http://localhost:8081/records";
const TOPIC_API_BASE_URL = "http://localhost:8081/topics";


class RecordService{
    getRecords(){
        return axios.get(RECORD_API_BASE_URL);
    }
    createRecord(record) {
        return axios.post(RECORD_API_BASE_URL, record); 
      }
    getRecordsByTopic(topicId){
        return axios.get(TOPIC_API_BASE_URL + topicId); 
    }
    getRecordById(recordId) {
        return axios.get(RECORD_API_BASE_URL+recordId);
      }
    updateRecord(record, recordId){
        return axios.put(RECORD_API_BASE_URL + "/" + recordId, record); 
    }
    deleteRecord(recordId){
        return axios.delete(RECORD_API_BASE_URL + "/" + recordId); 
    }
    

}

export default new RecordService()