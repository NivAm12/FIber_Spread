import unittest
from fiberScrapper import FiberAddressScraper
from joblib import Parallel, delayed
import json

unlimitedRrl = ['https://www.unlimited.net.il/%D7%A4%D7%A8%D7%99%D7%A1%D7%AA-%D7%A1%D7%99%D7%91%D7%99%D7%9D-%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%99%D7%9D/', 'https://www.unlimited.net.il/%D7%A4%D7%A8%D7%99%D7%A1%D7%AA-%D7%A1%D7%99%D7%91%D7%99%D7%9D-%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%99%D7%9D/', 'https://www.unlimited.net.il/%D7%A4%D7%A8%D7%99%D7%A1%D7%AA-%D7%A1%D7%99%D7%91%D7%99%D7%9D-%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%99%D7%9D/']
cityName = 'בת ים'
streetName = 'הרב מימון'
houseNumber = 4

cityNameXpath = '//*[@id="input_1_3"]'

streetNameXpath = '//*[@id="input_1_4"]'

houserNumberXpath = '//*[@id="input_1_6"]'

submitBtnXpath = '//*[@id="gform_submit_button_1"]'
successHeaderXpath = '//*[@id="be_in_touch"]/div/div/header/h2'
testObj = FiberAddressScraper(unlimitedRrl[0], cityNameXpath, streetNameXpath, houserNumberXpath, submitBtnXpath, successHeaderXpath, "איזה כיף הכתובת מחוברת")

results = Parallel(n_jobs=-1)(delayed(testObj.checkIfAddressHasFibers)(cityName, streetName, houseNumber) for url in unlimitedRrl)
print(results)

with open('server/DB/israelStreets.json', encoding="utf8") as f:
  data = json.load(f)  