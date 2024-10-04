from os import getenv

from flask import Flask, request, Response
from flask_mail import Mail, Message

app = Flask(__name__)
mail = Mail(app)


@app.post("/send-email")
def send_email():

    # TODO: Captcha Stuff

    user_info = request.json
    
    email = Message(
        subject = "Website Contact Form Submission",
        sender = getenv("VIH_EMAIL_FROM_ADDRESS"),
        recipients = [getenv("VIH_EMAIL_TO_ADDRESS")],
    )

    email.html = f"""
    <html>
        <body>
            <p></p>
            <p><strong>Name: </strong>{user_info.get("name", "N/A")}</p>
            <p><strong>Email: </strong>{user_info.get("email", "N/A")}</p>
            <p><strong>Phone Number: </strong>{user_info.get("phone-number", "N/A")}</p>
            <p><strong>Message: </strong>{user_info.get("inquiry", "N/A")}</p>
        </body>
    </html>
    """

    try:
        mail.send(email)
        print("Email sent with info:", user_info)
    except Exception as e:
        print("There was an issue sending email:", e)
        return Response(status=500)

    return Response(status=200)


if __name__ == "__main__":
    app.run(debug=True)