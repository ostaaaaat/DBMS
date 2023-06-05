import axios from 'axios';

const TOPIC_API_BASE_URL = "http://localhost:8081/topics";

class TopicService{
    getTopics(){
        return axios.get(TOPIC_API_BASE_URL);
    }
    getTopicById(topicId){
        return axios.get(TOPIC_API_BASE_URL + topicId); 
    }   
    deleteTopic(topicId){
        return axios.delete(TOPIC_API_BASE_URL + topicId);
    }
    createTopic(topic){
        return axios.post(TOPIC_API_BASE_URL, topic);
    }
    updateTopic(topic, topicId){
        return axios.put(TOPIC_API_BASE_URL + '/' + topicId, topic);
    }

}

export default new TopicService()