export default class Utils {
    static getBaseUrl(){
        switch (__ENV.ENV) {
            case 'dev_env':
              return 'https://petstore.swagger.io/v2';
            default:
              console.error('Url or env not defined');
          }
    };

    static getHeaders(){
        return {
            headers: {
              "Content-Type": "application/json",
            },
        };
    };
}