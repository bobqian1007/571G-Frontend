import web3 from "../util/web3";
import CampaignFactory from "../util/CampaignFactory1.json";
import {errorHandler} from "./util";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x9cc7f3fD2DB7aC7278b3339c1aFeDDc4F9F0599b"
);
console.log(instance.methods)
export async function listCompaigns(){
    //console.log(instance)
    let res
    try{
        res = await instance.methods.getDeployedCampaigns().call();
    }catch (error){
        console.log(error)
        res = errorHandler(error)
    }
    console.log(res)
    return res
}
export async function createCampaign(minimumContribution){
    let res
    try {
        const accounts = await web3.eth.getAccounts();
        await instance.methods
            .createCampaign(minimumContribution)
            .send({
                from: accounts[0],
            });
    }catch (error){
        console.log(error)
        res = errorHandler(error)
    }
    console.log(res)
    return res
}
