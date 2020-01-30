// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAJT1qKhwTCrjd_uWC4t4UWJoXf6S_dK2w',
        authDomain: 'inventurbo-f0eca.firebaseapp.com',
        databaseURL: 'https://inventurbo-f0eca.firebaseio.com',
        projectId: 'inventurbo-f0eca',
        storageBucket: 'inventurbo-f0eca.appspot.com',
        messagingSenderId: '216500507265',
        appId: '1:216500507265:web:ef43d619b4ac117655f380',
        measurementId: 'G-3FKLY60L44'
    },
    // api: 'https://inventurbo-api.herokuapp.com/api',
    api: 'http://localhost:8080/api',
    routes: {
        register: '/user/register',
        getOneProfile: uid => `/profile/${uid}`,

        getAllOrganization: `/organization`,
        getUserOrganizations: uid => `/profile/${uid}/organization`,
        getOrganizationProductStocks: oid => `/organization/${oid}/product`,
        getOneProductStock: (oid, pid) => `/organization/${oid}/product/${pid}`,
        updateOneProductStock: (oid, pid) => `/organization/${oid}/product/update/${pid}`,
        getOrganizationTransactions: oid => `/organization/${oid}/transaction`,
        getOneTransaction: tid => `/transaction/${tid}`,
        addSimpleTransaction: `/transaction/create`,
        orderTransaction: tid => `/transaction/update/${tid}`,
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
