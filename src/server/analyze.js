const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";
const axios = require("axios");


const analyze = async (url, key) => {
    try {
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        const { code, msg } = response.data.status;

        if (code === 100) {
            return handleError(code, "Please enter a valid URL");
        } else if (code === 212) {
            return handleError(code, msg);
        }
        
        return createSuccessResult(response.data, code);

    } catch (error) {
        // Handle any errors that occur during the request
        console.error("An error occurred:", error);
        throw error; 
    }
};


const handleError = (code, msg) => ({
    code: code,
    msg: msg
});




const createSuccessResult = (data, code) => {
    const { score_tag, agreement, subjectivity, confidence, irony } = data;
    const sample = { score_tag, agreement, subjectivity, confidence, irony };
    return { sample, status: code };
};


module.exports = {
    analyze
}