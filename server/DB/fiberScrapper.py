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
    def __init__(self, i_AddressToScrapeUrl, cityNameXpath, streetNameXpath,
                houserNumberXpath, submitBtnXpath, successHeaderXpath, successHeaderStr):
                # start the website session:
                self.startWebSession(i_AddressToScrapeUrl)
                self.successHeader = successHeaderStr
                self.successHeaderElement = successHeaderXpath

                # load the form elements:
                self.cityNameElement =  self.webDriver.find_element_by_xpath(cityNameXpath)
                self.streetNameElement =  self.webDriver.find_element_by_xpath(streetNameXpath)
                self.houserNumberElement =  self.webDriver.find_element_by_xpath(houserNumberXpath)
                self.submitBtnElement =  self.webDriver.find_element_by_xpath(submitBtnXpath)

    def startWebSession(self, i_AddressToScrapeUrl):
        self.webDriver = webdriver.Chrome()     
        self.webDriver.get(i_AddressToScrapeUrl)
        time.sleep(2)

    def checkIfAddressHasFibers(self, cityName, streetName, houseNumber):
        # fill the form inputs:
        self.fillElement(self.cityNameElement, cityName)
        self.fillElement(self.streetNameElement, streetName)
        self.fillElement(self.houserNumberElement, houseNumber)

        # submit:
        time.sleep(0.5)
        self.submitBtnElement.click()

        # check if the address search has succeed:
        time.sleep(1)
        return self.checkIfSearchSucceed()


    def fillElement(self, elementToFill, keys):
        elementToFill.send_keys(keys)
        elementToFill.send_keys(Keys.RETURN)
        elementToFill.send_keys(Keys.TAB)
        time.sleep(1)

    def checkIfSearchSucceed(self):
        try:
            success = False
            header = self.webDriver.find_element_by_xpath(self.successHeaderElement).text
            if header in self.successHeader:
                success = True
        except NoSuchElementException:
            return False
        
        return success

    def quitSession(self):
        self.webDriver.quit()    


# get control of the browser
# unlimitedWeb = webdriver.Chrome()
unlimitedRrl = 'https://www.unlimited.net.il/%D7%A4%D7%A8%D7%99%D7%A1%D7%AA-%D7%A1%D7%99%D7%91%D7%99%D7%9D-%D7%90%D7%95%D7%A4%D7%98%D7%99%D7%99%D7%9D/'
# unlimitedWeb.get(unlimitedRrl)

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
testObj.quitSession()





