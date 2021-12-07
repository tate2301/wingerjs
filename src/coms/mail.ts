export const sendMail = (mail: Mail) => {};

type Mail = {
  to: string;
  from: string;
  subject: string;
  text: string;
};
