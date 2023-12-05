import json
import time
import typing

import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, JSONResponse, PlainTextResponse

import pandas as pd
from io import BytesIO
from urllib.request import urlopen

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

godaddy_email = "info@waslintl.com"
godaddy_password = "Hello@2023"
EMAIL_ID = "waslinternl@gmail.com"
sheet_url = 'https://docs.google.com/spreadsheets/d/1l2Zug9NZKU_7rmaTYeJIUjIS19JH_Kv509ybyukpPn4/export?format=xlsx'
VIST_COUNT = 0



def make_contact_us_msg(json_input):
    # try:
        msg = MIMEMultipart()
        msg['From'] = godaddy_email
        msg['Subject'] = "contact request"
        
        text  = json_input.pop('message')
        table_html = pd.DataFrame({k:[v] for k,v in json_input.items()},).to_html(index=False,)
        msg.attach(MIMEText(f'<p>{table_html}</p>', 'html'))
        msg.attach(MIMEText(text, 'plain'))
        return msg
    
def send_email(subject=None, body=None, mime_object=None):
    try:
        if mime_object:
            mime_object['To'] = EMAIL_ID

        with smtplib.SMTP('smtpout.secureserver.net', 587) as server:
            # Start TLS for security
            server.starttls()

            # Login to your GoDaddy email account
            server.login(godaddy_email, godaddy_password)

            # Send the email
            server.sendmail(godaddy_email, EMAIL_ID, mime_object.as_string())
        print('worked')
        return True
    except:
        return False




def get_products():
    # Read the CSV data from the Google Sheet
    response = urlopen(sheet_url)
    data = response.read()

    # Convert the CSV data to a Pandas DataFrame
    df = pd.read_excel(BytesIO(data))

    # Print the DataFrame
    json_data = df.to_dict(orient='records')
    
    for data in json_data:
        data['singleProduct']=data['singleProduct'].split('\n')
    return json_data

class PrettyJSONResponse(Response):
    media_type = "application/json"

    def render(self, content: typing.Any) -> bytes:
        return json.dumps(
            content,
            ensure_ascii=False,
            allow_nan=False,
            indent=4,
            separators=(",", ":"),
        ).encode("utf-8")


apm_config = {
    'SERVICE_NAME': 'WASL_API_PYTHON',
    'SERVER_URL': 'http://localhost:7575',
    'ENVIRONMENT': 'staging',
    'GLOBAL_LABELS': 'platform=Ubuntu, application=WebServer'
}

app = FastAPI(title="WASLWebServer",
              description="Contains an endpoint for product page and email customer details",
              version="1.5.0"
              )
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex='http.?://.*',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# This gets called once the app is shutting down.
@app.on_event("shutdown")
async def app_shutdown():
    pass


# This gets called once the app is starting up.
@app.on_event("startup")
async def app_startup():
    pass


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content='error: exception raised due to internal server error',
    )


@app.get("/versionInfo")
async def health_check():
    # logger.info("request received for the version info")
    request_time = time.time()
    return {"version": "1.0.1",
            "status": "I am up and running",
            "requestTimestamp": str(request_time),
            "responseTimestamp": str(time.time())}


@app.get("/wasl/products", response_model=dict, response_class=PrettyJSONResponse)
async def serve_products():
    try:
        # VIST_COUNT += 1
        return JSONResponse(PRODUCTS)
    except Exception as e:
        # logger.exception(e)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))
    finally:
        pass

@app.post("/wasl/contact_us", response_model=dict)
async def contact_us_mailer(json_data: dict):
    try:
        if send_email(mime_object = make_contact_us_msg(json_data)):
            return JSONResponse({'status':True})
        else:
            return JSONResponse({'status':False})
        
    except Exception as e:
        # logger.exception(e)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))  
    finally:
        pass







if __name__ == "__main__":



    PRODUCTS = get_products()

    uvicorn.run(app, host="0.0.0.0", port=7575, ssl_keyfile="ssl/privkey.pem", ssl_certfile="ssl/fullchain.pem")
