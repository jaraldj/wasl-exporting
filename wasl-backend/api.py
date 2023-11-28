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


sheet_url = 'https://docs.google.com/spreadsheets/d/1l2Zug9NZKU_7rmaTYeJIUjIS19JH_Kv509ybyukpPn4/export?format=xlsx'


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
async def columnizedExtraction():
    try:
        return JSONResponse(PRODUCTS)
    except Exception as e:
        # logger.exception(e)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))
    finally:
        pass
    
    
# @app.post("/wasl/sendmail", response_model=str, response_class=PlainTextResponse)
# async def columnizedExtraction(file: UploadFile = File(...)):
#     """
#         COlumnaR Text EXtractor, when given a PDF file, the service converts to plain text based columnized content\n
#     """
#     # logger.info("columnar text extractor process started")
#     print(f"pdf to text conversion - {file.filename}")
#     file_location = f"{file.filename}"
#     try:
#         pdf_bytes = await file.read()
#         await file.close()
#         return await run_in_threadpool(col_txt_ext, pdf_bytes)
#     except Exception as e:
#         # logger.exception(e)
#         return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content=str(e))
#     finally:
#         pass






if __name__ == "__main__":



    PRODUCTS = get_products()

    uvicorn.run(app, host="0.0.0.0", port=7575)
