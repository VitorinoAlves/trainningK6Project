import { check, sleep } from 'k6';
import {User} from "../models/UserModel.js";
import {group} from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
    stages: [
      { duration: '30s', target: 5 }, // simulate ramp-up of traffic from 1 to 20 users over 10 seconds.
      { duration: '1m', target: 10 }, // stay at 100 users for 10 minutes
      { duration: '30s', target: 0 }, // ramp-down to 0 users
    ],
    thresholds: {
      http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
    },
  };

/*export const options = {
    vus: 2,
    duration: '10s',
};*/

export function setup(){
    const user = new User();
    return user.createUser();
};

export default function (data){
    const user = new User();
    group('Create User', () => {-
        user.createUser();
    });

    group('Get User', () => {-
        user.getUser(data);
    });

    group('Edit User', () => {-
        user.editUser(data);
    });

    sleep(1);
}

export function handleSummary(data) {
    return {
        "results.html": htmlReport(data),
    };
}