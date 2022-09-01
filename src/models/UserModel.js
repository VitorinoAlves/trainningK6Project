import faker from "k6/x/faker";
import {check} from 'k6';
import http from 'k6/http';
import Utils from '../config/utils.js';

export class User {
    constructor() {
        this.id = 0;
        this.username = faker.username();
        this.firstName = faker.firstName();
        this.lastName = faker.lastName();
        this.email = faker.email();
        this.password = faker.password(true, true, true, true, 8);
        this.phone = faker.phoneFormatted();
        this.userStatus = 0;
    };

    createUser(){
        const user = new User();
        /*const user = {
            id: 0,
            username: faker.username(),
            firstName: faker.firstName(),
            lastName : faker.lastName(),
            email : faker.email(),
            password : faker.password(true, true, true, true, 8),
            phone : faker.phoneFormatted(),
            userStatus : 0
        };*/
        const createUserURL = `${Utils.getBaseUrl()}/user`;
        const payload = JSON.stringify(user);

        const params = Utils.getHeaders();

        let res = http.post(createUserURL, payload, params);
        check(res, {
            'is status 200': (r) => r.status === 200
        });
        return user.username;
    };

    getUser(username){
        const getUser = `${Utils.getBaseUrl()}/user/`;
        let res = http.get(getUser + username);
        check(res, {
            'is status 200': (r) => r.status === 200
        });
    };

    editUser(username){
        const getUser =`${Utils.getBaseUrl()}/user/`;

        let editedUser = new User();
        editedUser.username = username;

        const payload = JSON.stringify(editedUser);

        const params = Utils.getHeaders();

        let res = http.put(getUser + username, payload, params);
        
        check(res, {
            'is status 200': (r) => r.status === 200
        });
    };
}
