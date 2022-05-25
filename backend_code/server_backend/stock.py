from nsetools import Nse
from nsepy import get_history
import datetime
import pandas as pd

nse = Nse()

all_stock_codes = nse.get_stock_codes()
all_stock_codes_values = list(nse.get_stock_codes().values())


def get_stock_data(
    code: str, start_date: datetime.date, end_date: datetime.date
) -> pd.DataFrame:
    """

    :param code: code of the scrip name
    :type code: str
    :param start_date: start time of the stock code history
    :type start_date:datetime.date
    :param end_date:date
    :type end_date: datetime.date
    :return: histoical data of stock
    :rtype: DataFrame
    """
    return get_history(symbol=code, start=start_date, end=end_date)


def get_stock_codes():
    all_stock_codes_values = list(nse.get_stock_codes().keys())
    return all_stock_codes_values[1:]

def get_stock_codes():
    return nse.get_stock_codes()