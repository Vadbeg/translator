#!/bin/sh

uvicorn translator.api:app --reload --host 0.0.0.0 --port 8000
