import web3 from "../util/web3";
import Campaign from "../util/Campaign.json";
import {errorHandler} from "./util"

const campaign = (address) => {
    return new web3.eth.Contract(Campaign.abi, address);
};
export async function getCompaignDetail(address){
    let res
    try{
        const campaignObject = campaign(address);
        res = await campaignObject.methods.getSummary().call();
    }catch (error){
        res = errorHandler(error)
    }
    return res
}
export async function getRequestCount (address){
    let res
    try{
        const campaignObject = campaign(address);
        res = await campaignObject.methods.getRequestsCount().call();
    }catch (error){
        res = errorHandler(error)
    }
    return res
}
export async function getapproversCount (address){
    let res
    try{
        const campaignObject = campaign(address);
        res = await campaignObject.methods.approversCount().call();
    }catch (error){
        res = errorHandler(error)
    }
    return res
}
export async function getAllRequests(params){
    let res
    try {
        const campaignObject = campaign(params.address);
        res = await Promise.all(
            Array(parseInt(params.requestCount))
                .fill()
                .map((element, index) => {
                    return campaignObject.methods.requests(index).call();
                })
        )
    }catch (error){
        res = errorHandler(error)
    }
    return res
}
export async function createRequest(createRequestParam){
    let res
    try {
        const campaignObject = campaign(createRequestParam.address);
        const accounts = await web3.eth.getAccounts();
        res = await campaignObject.methods
            .createRequest(createRequestParam.description, web3.utils.toWei(createRequestParam.value, "ether"), createRequestParam.recipient)
            .send({ from: accounts[0] });
    } catch (err) {
        res = errorHandler(err)
    }
    return res
}
export async function approveRequest(approveRequestParam){
    let res
    try {
        const campaignObject = campaign(approveRequestParam.address);
        const accounts = await web3.eth.getAccounts();
        res = await campaignObject.methods
            .approveRequest(approveRequestParam.id)
            .send({ from: accounts[0] });
    } catch (err) {
        res = errorHandler(err)
    }
    return res
}
export async function finalizeRequest(finalizeRequestParam){
    let res
    try {
        const campaignObject = campaign(finalizeRequestParam.address);
        const accounts = await web3.eth.getAccounts();
        res = await campaignObject.methods
            .finalizeRequest(finalizeRequestParam.id)
            .send({ from: accounts[0] });
    } catch (err) {
        res = errorHandler(err)
    }
    return res
}
export async function contributeMoney(param){
    let res
    try {
        const campaignObject = campaign(param.address);
        const accounts = await web3.eth.getAccounts();
        res = await campaignObject.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei(param.value, "ether"),
        });
    } catch (err) {
        res = errorHandler(err)
    }
    return res
}


