"""Module with API"""

import warnings

import fastapi
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from translator.modules import EngRuTranslator

warnings.filterwarnings('ignore')

app = FastAPI()

eng_ru_translator = EngRuTranslator()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/query', response_class=JSONResponse)
def query(query_text: str) -> Response:
    translated_text = eng_ru_translator.translate(text=query_text)

    content = {'translated_text': translated_text}

    return JSONResponse(content=content, status_code=fastapi.status.HTTP_200_OK)
