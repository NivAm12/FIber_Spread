from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException

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
        try:
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

        except:
            return False 
            
            


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
        op = webdriver.ChromeOptions()
        op.add_argument('headless')
        self.webDriver = webdriver.Chrome(options=op)     
        self.webDriver.get(self.addressToScrape)
        time.sleep(2)


    def __quitSession(self):
        self.webDriver.quit()    







