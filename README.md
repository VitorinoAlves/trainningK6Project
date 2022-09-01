#K6 POC
This project was developed in order to have a first contact with K6. The API tested in this project is the Pet store: https://petstore.swagger.io/

##Setting the environtment
Intall K6 following the instructions here: https://k6.io/docs/getting-started/installation/

##Running tests
###Testing only one API
1. Test create user:
  ```bash
  $ .\k6.exe run -e ENV=dev_env .\src\tests\createUser.test.js
  ```
2. Test get user:
  ```bash
  $ .\k6.exe run -e ENV=dev_env .\src\tests\getUser.test.js
  ```
3. Test edit user:
  ```bash
  $ .\k6.exe run -e ENV=dev_env .\src\tests\editUser.test.js
  ```

###Testing all the APIs
1. Load test:
  ```bash
  $ .\k6.exe run -e ENV=dev_env .\src\tests\mainLoad.test.js
  ```
2. Stress test:
  ```bash
  $ .\k6.exe run -e ENV=dev_env .\src\tests\mainStress.test.js
  ```