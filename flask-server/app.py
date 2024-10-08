from os import getenv

from flask import Flask, request, Response
from flask_mail import Mail, Message
import requests

app = Flask(__name__)
mail = Mail(app)


@app.post("/send-email")
def send_email():

    user_info = request.json
    
    try:
        r = requests.post(
            "https://www.google.com/recaptcha/api/siteverify", 
            data={
                "secret": getenv("RECAPTCHA_SECRET"),
                "response": user_info.get("captchaToken", ""),
                "remoteip": request.headers.get("X-Real-IP", "")
            }
        )
        captcha_response = r.json()
    except Exception as e:
        print(f"Failed to validated recpatcha for request: {user_info} --- The error: {e}")

    if captcha_response.get("success", False) and captcha_response.get("score", 0) >= 0.4:

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
            user_info.pop("captchaToken", None)
            print("Email sent with info:", user_info)
            print("Captcha Response:", captcha_response)
        except Exception as e:
            user_info.pop("captchaToken", None)
            print(f"There was an issue sending email for request: {user_info} -- The error: {e}")
            return Response(status=500)

        return Response(status=200)
    else:
        print(f"Captcha failed! --- Request Body: {user_info} --- Captcha Response: {captcha_response} --- Request IP: {request.headers.get('X-Real-IP', 'N/A')}")
        return Response(status=403)


if __name__ == "__main__":
    app.run(debug=True)