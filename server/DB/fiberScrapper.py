from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


class FiberAddressScraper:
    def __init__(self, i_AddressToScrapeUrl, cityNameXpath, streetNameXpath,
                houserNumberXpath, submitBtnXpath, successHeaderXpath=0):
                # start the website session:
                self.webDriver = None
                self.startWebSession(i_AddressToScrapeUrl)
                self.successHeaderElement = successHeaderXpath

                # load the form elements:
                self.cityNameElement =  self.webDriver.find_element_by_xpath(cityNameXpath)
                self.streetNameElement =  self.webDriver.find_element_by_xpath(streetNameXpath)
                self.houserNumberElement =  self.webDriver.find_element_by_xpath(houserNumberXpath)
                self.submitBtnElement =  self.webDriver.find_element_by_xpath(submitBtnXpath)

    def startWebSession(self, i_AddressToScrapeUrl):
        self.webDriver = webdriver.Chrome()     
        self.webDriver.get(i_AddressToScrapeUrl)
        time.sleep(3)

    def checkIfAddressHasFibers(self, cityName, streetName, houseNumber):
        # fill the form inputs:
        self.fillElement(self.cityNameElement, cityName)
        self.fillElement(self.streetNameElement, streetName)
        self.fillElement(self.houserNumberElement, houseNumber)

        # submit:
        time.sleep(1)
        self.webDriver.find_element_by_xpath(self.submitBtnElement).click()


    def fillElement(elementToFill, keys):
        elementToFill.send_keys(keys)
        elementToFill.send_keys(Keys.TAB)
        time.sleep(0.5)
        
        

# get control of the browser
# unlimitedWeb = webdriver.Chrome()
unlimitedRrl = 'https://www.partner.co.il/globalassets/global/fiberinternet/index.html'
# unlimitedWeb.get(unlimitedRrl)

time.sleep(2)

# get the form input fields
cityName = 'תל אביב - יפו'
streetName = 'אבן גבירול'
houseNumber = 4

cityNameXpath = '//*[@id="AfibersLeadCity"]'
# cityNameFormInput = unlimitedWeb.find_element_by_xpath(cityNameXpath)

streetNameXpath = '//*[@id="installationStree"]'
# streetNameFormInput = unlimitedWeb.find_element_by_xpath(streetNameXpath)

houserNumberXpath = '//*[@id="houseNum"]'
# houserNumberFormInput = unlimitedWeb.find_element_by_xpath(houserNumberXpath)

testObj = FiberAddressScraper(unlimitedRrl,cityNameXpath, streetNameXpath, houserNumberXpath, '//*[@id="sendBtn"]')
testObj.checkIfAddressHasFibers(cityName, streetName, houseNumber)
# submit
# unlimitedWeb.find_element_by_xpath('//*[@id="sendBtn"]').click()




