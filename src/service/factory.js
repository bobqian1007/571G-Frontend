import web3 from "../util/web3";
import CampaignFactory from "../util/CampaignFactory.json";
import {errorHandler} from "./util";

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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
