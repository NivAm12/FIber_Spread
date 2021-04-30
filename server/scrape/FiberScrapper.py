from selenium import webdriver
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options


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
            success =  self.__checkIfSearchSucceed()

        except Exception as e:
            success = False
            print(e)

        finally:
            self.__quitSession()
            return success    
            
            

    def __fillElement(self, elementToFillXpath, searchQuery):
        element = self.webDriver.find_element_by_xpath(elementToFillXpath)
        time.sleep(0.5)
        element.send_keys(searchQuery)
        element.send_keys(Keys.RETURN)
        element.send_keys(Keys.TAB)
        time.sleep(1.5)


    def __checkIfSearchSucceed(self):
        success = False
        
        WebDriverWait(self.webDriver, 10).until(
            EC.presence_of_element_located((By.XPATH, self.successHeaderXpath)))
    
        header = self.webDriver.find_element_by_xpath(self.successHeaderXpath).get_attribute("innerHTML")
        
        if self.successHeader in header:
            success = True
            
        return success


    def __startWebSession(self):
        # set the web driver:
        op = Options()
        op.headless = True

        self.webDriver = webdriver.Firefox(executable_path='C:\Program Files\Mozilla Firefox\geckodriver.exe', options=op)     
        self.webDriver.get(self.addressToScrape)

        # wait for page to load:
        WebDriverWait(self.webDriver, 10).until(
            EC.presence_of_element_located((By.XPATH, self.cityNameXpath)))
        

    def __quitSession(self):
        self.webDriver.quit() 





