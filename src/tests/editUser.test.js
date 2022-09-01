import http from 'k6/http';
import {check, sleep} from 'k6';
import {User} from "../models/UserModel.js";
import Utils from "../config/utils.js";
import {group} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 2,
    duration: '10s',
};

export function setup(){
    const user = new User();
    /*const createUserURL = `${Utils.getBaseUrl()}/user`;
    const payload = JSON.stringify(user);

    const params = Utils.getHeaders();

    let res = http.post(createUserURL, payload, params);;
    check(res, {
        'is status 200': (r) => r.status === 200
    });

    return user.username;*/
    return user.createUser();
};

export default function (data){
    const user = new User();
    group('Edit User', () => {-
        user.editUser(data);
    });
    /*const getUser =`${Utils.getBaseUrl()}/user/`;

    let editedUser = new User();
    editedUser.username = data;

    const payload = JSON.stringify(editedUser);

    const params = Utils.getHeaders();

    let res = http.put(getUser + data, payload, params);*/
    sleep(1);
}

export function handleSummary(data) {
    return {
        "results.html": htmlReport(data),
    };
}

//.\k6.exe run -e ENV=dev_env .\src\tests\editUser.test.js