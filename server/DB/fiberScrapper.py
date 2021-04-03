from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException



class FiberAddressScraper:
    def __init__(self, i_AddressToScrapeUrl, cityNameXpath, streetNameXpath,
                houserNumberXpath, submitBtnXpath, successHeaderXpath):
                self.successHeaders = {
                    "partner": "הבניין שלך מחובר",
                    "cellcom": "יש לכם תשתית"}
                # start the website session:
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
        time.sleep(4)

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
            successHeader = self.webDriver.find_element_by_xpath(self.successHeaderElement)
        except NoSuchElementException:
            return False
        return True
        
# get control of the browser
# unlimitedWeb = webdriver.Chrome()
unlimitedRrl = 'https://www.partner.co.il/globalassets/global/fiberinternet/index.html'
# unlimitedWeb.get(unlimitedRrl)

# get the form input fields
cityName = 'דימונה'
streetName = 'סחלבן החורש'
houseNumber = 19

cityNameXpath = '//*[@id="AfibersLeadCity"]'
# cityNameFormInput = unlimitedWeb.find_element_by_xpath(cityNameXpath)

streetNameXpath = '//*[@id="installationStree"]'
# streetNameFormInput = unlimitedWeb.find_element_by_xpath(streetNameXpath)

houserNumberXpath = '//*[@id="houseNum"]'
# houserNumberFormInput = unlimitedWeb.find_element_by_xpath(houserNumberXpath)

submitBtnXpath = '//*[@id="sendBtn"]'
successHeaderXpath = '//*[@id="AfibersSectionLead"]/div[2]/div/div[1]/h3'
testObj = FiberAddressScraper(unlimitedRrl,cityNameXpath, streetNameXpath, houserNumberXpath, submitBtnXpath, successHeaderXpath)
print(testObj.checkIfAddressHasFibers(cityName, streetName, houseNumber))
# submit
# unlimitedWeb.find_element_by_xpath('//*[@id="sendBtn"]').click()




