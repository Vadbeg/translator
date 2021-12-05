"""Module with API"""

import os
import warnings
from pathlib import Path

import fastapi
from fastapi import FastAPI, Form, Request, Response
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from translator.modules import EngRuTranslator

warnings.filterwarnings('ignore')

app = FastAPI()
app.mount(
    path='/static',
    app=StaticFiles(directory='translator/web/static'),
    name='static',
)

templates = Jinja2Templates(directory='translator/web/templates')

eng_ru_translator = EngRuTranslator()


@app.get(path='/', response_class=RedirectResponse)
def root():
    return RedirectResponse(
        '/home',
    )


@app.get(path='/home', response_class=HTMLResponse)
def main_page(request: Request) -> Response:
    return templates.TemplateResponse('home.html', {'request': request})


@app.post(path='/home', response_class=RedirectResponse)
def redirect_search_query(
    query_text: str = Form(..., alias='query-text')
) -> RedirectResponse:
    url = (
        app.url_path_for(
            name='query',
        )
        + f'?query_text={query_text}'
    )

    return RedirectResponse(url=url, status_code=fastapi.status.HTTP_302_FOUND)


@app.get('/query', response_class=HTMLResponse)
def query(request: Request, query_text: str) -> Response:
    translated_text = eng_ru_translator.translate(text=query_text)

    print(translated_text)
    print(type(translated_text))

    return templates.TemplateResponse(
        'search_result.html', {'request': request, 'translated_text': translated_text}
    )
