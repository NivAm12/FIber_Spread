from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import json

# TODO: fix the success search
# TODO: build algorithem 

class FiberAddressScraper:
    def __init__(self, addressToScrapeUrl, cityNameXpath, streetNameXpath,
                houserNumberXpath, submitBtnXpath, successHeaderXpath, successHeaderStr):
                self.addressToScrape = addressToScrapeUrl
                self.successHeader = successHeaderStr
                self.cityNameXpath = cityNameXpath
                self.streetNameXpath = streetNameXpath 
                self.houserNumberXpath = houserNumberXpath
                self.submitBtnElementXpath = submitBtnXpath
                self.successHeaderXpath = successHeaderXpath


    def checkIfAddressHasFibers(self, cityName, streetName, houseNumber):
        # start session:
        self.__startWebSession()
        
        # fill the form inputs:
        self.__fillElement(self.cityNameXpath, cityName)
        self.__fillElement(self.streetNameXpath, streetName)
        self.__fillElement(self.houserNumberXpath, houseNumber)

        # submit:
        time.sleep(0.5)
        self.webDriver.find_element_by_xpath(self.submitBtnElementXpath).click()

        # check if the address search has succeed:
        time.sleep(1)
        return self.__checkIfSearchSucceed()


    def __fillElement(self, elementToFillXpath, searchQuery):

        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(searchQuery)
        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(Keys.RETURN)
        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(Keys.TAB)
        time.sleep(1)


    def __checkIfSearchSucceed(self):
        try:
            success = False
            header = self.webDriver.find_element_by_xpath(self.successHeaderXpath).text
            if header in self.successHeader:
                success = True
            self.__quitSession()

        except NoSuchElementException:
            return False
        
        return success


    def __startWebSession(self):
        self.webDriver = webdriver.Chrome()     
        self.webDriver.get(self.addressToScrape)
        time.sleep(2)


    def __quitSession(self):
        self.webDriver.quit()    




unlimitedRrl = 'https://www.unlimited.net.il/%D7%A4%D7%A8%D7%99%D7%A1%D7%AA-%D7%A1%D7%99%D7%91%D7%99%D7%9D-%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%99%D7%9D/'

# get the form input fields
cityName = 'בת ים'
streetName = 'הרב מימון'
houseNumber = 4

cityNameXpath = '//*[@id="input_1_3"]'

streetNameXpath = '//*[@id="input_1_4"]'

houserNumberXpath = '//*[@id="input_1_6"]'

submitBtnXpath = '//*[@id="gform_submit_button_1"]'
successHeaderXpath = '//*[@id="be_in_touch"]/div/div/header/h2'
testObj = FiberAddressScraper(unlimitedRrl,cityNameXpath, streetNameXpath, houserNumberXpath, submitBtnXpath, successHeaderXpath, "איזה כיף הכתובת מחוברת")
print(testObj.checkIfAddressHasFibers(cityName, streetName, houseNumber))





