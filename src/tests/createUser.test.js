import http from 'k6/http';
import { check, sleep } from 'k6';
import {User} from "../models/UserModel.js";
import Utils from "../config/utils.js";
import {group} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


export const options = {
  vus: 2,
  duration: '10s',
};

export default function(){
  const user = new User();
  group('Create User', () => {-
    user.createUser();
  });
  /*const user = new User();
    const createUserURL = `${Utils.getBaseUrl()}/user`;
    const payload = JSON.stringify(user);

    const params = Utils.getHeaders();

    let res = http.post(createUserURL, payload, params);
    check(res, {
        'is status 200': (r) => r.status === 200
    });*/
    sleep(1);
}

export function handleSummary(data) {
  return {
    "results.html": htmlReport(data),
  };
}