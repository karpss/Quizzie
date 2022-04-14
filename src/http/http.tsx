/* eslint-disable */
import axios from 'axios';

const url = "https://opentdb.com/api.php?amount="

export const getQuiz = async (
    amount: number,
    difficulty: string


): Promise <any> => {
    try{
        const res = await axios.get(`${url}+${amount}&difficulty=${difficulty}&type=boolean`);

    }catch(error){
        throw new Error(`Error fetching data ${error}`)

    }


};
