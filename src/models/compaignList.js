import {
    createCampaign,
    listCompaigns
} from '../service/factory'
import {checkIfResValid} from "../service/util";
import {notification} from "antd";

export default {
    namespace: 'campaignList',
    state: {
        campaigns:[],
    },

    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        }
    },

    effects: {
        *queryCampaignList(_, {call, put}){
            const res = yield call(listCompaigns,{})
            if (checkIfResValid(res)){
                yield put(
                    {
                        type:'save',
                        payload:{
                            campaignList:res
                        }
                    }
                )
            }
        },
        *createNewCampaign({payload},{call,put,select}){
            const res = yield call(createCampaign,payload.minContribution)
            if (checkIfResValid(res)){
                notification.success({
                    message:"create Campaign Successfully"
                })
                yield put(
                    {
                        type:'queryCampaignList',
                        payload:{}
                    }
                )
            }
        }
    }
}