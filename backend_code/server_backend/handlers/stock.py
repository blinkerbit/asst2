from tornado.web import RequestHandler
try:
    from server_backend.stock import get_stock_data,get_stock_codes
except:
    from stock import get_stock_data,get_stock_codes

from dateutil import parser
import numpy as np
import json
import logging
import datetime
from typing import AnyStr
data_format = lambda x: x.strftime("%d-%m-%Y")


class StockHandler(RequestHandler):
    """
    GET
    /history/{stock_code} to return historical Open,Close,High, Low and Volume of stock

    """

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')


    def get(self, scrip_code: str) -> str:
        """

        :param scrip_code: code of stock
        :type scrip_code: str
        :return: Open,Close,High,Low,Volume
        :rtype:Arr[[float,float,float,float,int]]
        """
        start_date = self.get_argument("startDate", "2022-01-01")
        end_date = self.get_argument("endDate", "2022-01-31")
        logging.info(f"{start_date} {end_date}")
        start_date = parser.parse(start_date)
        end_date = parser.parse(end_date)
        data = get_stock_data(scrip_code, start_date, end_date)
        dates = [data_format(i) for i in data.index]
        self.finish(
            json.dumps(
                {
                    "stockHistory": [dates]
                    + [
                        i.values.tolist()
                        for i in [
                            data.Open,
                            data.Close,
                            data.High,
                            data.Low,
                            data.Volume,
                        ]
                    ],
                }
            )
        )



class CodesHandler(RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    def get(self) -> str:
        self.finish(json.dumps(get_stock_codes()))
