import axios from 'axios';

// actions
export const GET_APPROVAL = "getApproval";
export const GROUP_BY = "groupBy";

// mutations
export const SET_APPROVAL = "setApproval";
export const SET_SYSTEMS = "setSystems";

const state = {
    approvalList : [],
    systemsList : []
};

const getters = {
    getApprovalList(state){
        return state.approvalList;
    },
    getSystems(state) {
        return state.systemsList;
    }
};

const actions = {
    [GET_APPROVAL](context){
       return new Promise(resolve => {
            axios.get('api/pending/').then(response => {
                context.commit(SET_APPROVAL, response.data);
                context.commit(SET_SYSTEMS, response.data);
                resolve(response);
            }).catch(err => {
                console.log(err);
                resolve(err);
            });
        }); 
    },
};

const mutations = {
    [SET_APPROVAL](state, approvalList){
        state.approvalList = approvalList;
    },
    [SET_SYSTEMS](state, pending) {
        var groupBy = function (xs, key) {
            return xs.reduce(function (rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        };
        var systemList = [];
        var systemGrouped = groupBy(pending, 'system');
        const systems = Object.entries(systemGrouped);
        for (const [system, count] of systems) {
            systemList.push({
                system_name: system,
                count: count.length,
                variant: 'dark',
                icon: 'arrow-clockwise',
                text: 'white',
                display: true
            });
        }

        state.systemsList = systemList;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}