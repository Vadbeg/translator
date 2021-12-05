"""Module with translation of string"""


from googletrans import Translator
from googletrans.models import Translated


class EngRuTranslator:
    def __init__(self):
        self._translator = Translator()

        self._src_language = 'en'
        self._dst_language = 'ru'

    def translate(self, text: str) -> str:
        translation_result: Translated = self._translator.translate(
            text=text, src=self._src_language, dest=self._dst_language
        )

        return translation_result.text
