export const Config = { 
    baseurl:'http://dev.engyne.net',
    lanLatData:':8090/szgjj/lanLatData',
    bankdataJson:'/szgjj/bankdata.json',
    nodeUrl:'http://192.168.1.166:8090',
 
    xqLnglat:':8090/szgjj/xqLnglat',
    kylinBaseurl:'http://49.4.6.99:7070',
    query:'/kylin/api/query',
    kylinUsername:'admin',
    kylinPassword:'FRI!@#$passw0rd',
    kylinProject:'SZGJJ_PROJECT',
    //银行
    sqlNetdata:'select NAME,BANKNAME,REGION from BANKDATA ',

    netAnalysis:':8090/szgjj/netanalysis',
    register:'/szgjj/register',
    login:'/szgjj/login',
    changePassword:'/szgjj/changePass',

    preNode: ':8181/predict',
    scoreNode: ':8181/apriori',
}