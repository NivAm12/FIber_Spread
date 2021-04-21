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
            if self.webDriver.find_elements_by_xpath(self.submitBtnElementXpath):
                self.webDriver.find_element_by_xpath(self.submitBtnElementXpath).click()

            # check if the address search has succeed:
            time.sleep(1)
            success =  self.__checkIfSearchSucceed()

        except Exception as e:
            success = False
            print(e)

        finally:
            self.__quitSession()
            return success    
            
            

    def __fillElement(self, elementToFillXpath, searchQuery):

        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(searchQuery)
        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(Keys.RETURN)
        self.webDriver.find_element_by_xpath(elementToFillXpath).send_keys(Keys.TAB)
        time.sleep(1)


    def __checkIfSearchSucceed(self):
        success = False
        header = self.webDriver.find_element_by_xpath(self.successHeaderXpath).text

        if self.successHeader in header:
            success = True
            
        return success


    def __startWebSession(self):
        op = webdriver.ChromeOptions()
        #op.add_argument('headless')
        op.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.webDriver = webdriver.Chrome(options=op)     
        self.webDriver.get(self.addressToScrape)
        time.sleep(4)


    def __quitSession(self):
        self.webDriver.quit()    


# tests:
####### pages scrape info



city = 'בת ים'
street = 'הרב מימון'
houserNumber = 50
testObj = FiberAddressScraper(unlimitedUrl, unlimitedCityNameXpath, unlimitedStreetNameXpath, unlimitedHouserNumberXpath,
                              unlimitedSubmitBtnXpath, unlimitedSuccessHeaderXpath, unlimitedSuccessHeader)
print(testObj.checkIfAddressHasFibers(city, street, houserNumber))




