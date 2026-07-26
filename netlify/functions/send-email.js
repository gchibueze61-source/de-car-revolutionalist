const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  const { name, email, message } = JSON.parse(event.body);

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "decarrevolutionalist@gmail.com",
      subject: "customer message",
      html: `
        <h2>New Message</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>${message}</p>
      `
    });

    return {
      statusCode: 200,
      body: JSON.stringify({success:true})
    };

  } catch(error) {
    return {
      statusCode:500,
      body:JSON.stringify({error:error.message})
    };
  }
};