import pickle
import datetime
import pandas as pd

from server_backend import get_stock_data


def test_api():
    with open("tests/test_data.pickle", "rb") as f:
        data: pd.DataFrame = pickle.load(f)
    start_date = datetime.date(2022, 1, 1)
    end_date = datetime.date(2022, 1, 31)
    assert data.equals(get_stock_data("20 Microns Limited", start_date, end_date))
