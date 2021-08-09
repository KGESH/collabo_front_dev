import { Auth, Provider } from 'services/firebase/Firebase';

export const GoogleLogin = () => {
  Auth.signInWithPopup(Provider.google)
    .then((result) => {
      const { credential } = result;
      const token = (<any>result).credential.accessToken;
      const { user } = result;

      console.log(`user`);
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const { email } = error;
      const { credential } = error;
    });
};

export const GoogleLogOut = () => {
  Auth.signOut()
    .then(() => {
      console.log('SignOut Successful');
    })
    .catch((error) => {
      console.log(error);
    });
};
